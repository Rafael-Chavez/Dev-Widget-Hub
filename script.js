class SnippetHub {
    constructor() {
        this.snippets = this.loadSnippets();
        this.currentSnippet = null;
        this.currentTab = 'html';
        this.initializeEventListeners();
        this.renderSnippetsList();
    }

    initializeEventListeners() {
        // New snippet button
        document.getElementById('newSnippetBtn').addEventListener('click', () => {
            this.createNewSnippet();
        });

        // Save button
        document.getElementById('saveBtn').addEventListener('click', () => {
            this.saveCurrentSnippet();
        });

        // Delete button
        document.getElementById('deleteBtn').addEventListener('click', () => {
            this.deleteCurrentSnippet();
        });

        // Preview button
        document.getElementById('previewBtn').addEventListener('click', () => {
            this.showPreview();
        });

        // Close preview
        document.getElementById('closePreview').addEventListener('click', () => {
            this.hidePreview();
        });

        // Copy embed code
        document.getElementById('copyEmbedBtn').addEventListener('click', () => {
            this.copyEmbedCode();
        });

        // Editor tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                if (tab) {
                    this.switchEditorTab(tab);
                }
            });
        });

        // Preview tabs
        document.querySelectorAll('[data-preview]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const preview = e.target.dataset.preview;
                if (preview) {
                    this.switchPreviewTab(preview);
                }
            });
        });

        // Auto-save on input
        ['htmlEditor', 'cssEditor', 'jsEditor', 'snippetName'].forEach(id => {
            const element = document.getElementById(id);
            element.addEventListener('input', () => {
                if (this.currentSnippet) {
                    this.autoSave();
                }
            });
        });

        // Close modal on outside click
        document.getElementById('previewModal').addEventListener('click', (e) => {
            if (e.target.id === 'previewModal') {
                this.hidePreview();
            }
        });
    }

    loadSnippets() {
        const saved = localStorage.getItem('snippetHub');
        return saved ? JSON.parse(saved) : [];
    }

    saveSnippets() {
        localStorage.setItem('snippetHub', JSON.stringify(this.snippets));
    }

    createNewSnippet() {
        const snippet = {
            id: Date.now().toString(),
            name: 'Untitled Snippet',
            html: '',
            css: '',
            js: '',
            created: new Date().toISOString(),
            modified: new Date().toISOString()
        };

        this.snippets.unshift(snippet);
        this.saveSnippets();
        this.renderSnippetsList();
        this.selectSnippet(snippet.id);
    }

    selectSnippet(id) {
        this.currentSnippet = this.snippets.find(s => s.id === id);
        if (this.currentSnippet) {
            this.showEditor();
            this.loadSnippetIntoEditor();
            this.updateSnippetSelection();
        }
    }

    loadSnippetIntoEditor() {
        if (!this.currentSnippet) return;

        document.getElementById('snippetName').value = this.currentSnippet.name;
        document.getElementById('htmlEditor').value = this.currentSnippet.html;
        document.getElementById('cssEditor').value = this.currentSnippet.css;
        document.getElementById('jsEditor').value = this.currentSnippet.js;
    }

    saveCurrentSnippet() {
        if (!this.currentSnippet) return;

        this.currentSnippet.name = document.getElementById('snippetName').value || 'Untitled Snippet';
        this.currentSnippet.html = document.getElementById('htmlEditor').value;
        this.currentSnippet.css = document.getElementById('cssEditor').value;
        this.currentSnippet.js = document.getElementById('jsEditor').value;
        this.currentSnippet.modified = new Date().toISOString();

        this.saveSnippets();
        this.renderSnippetsList();
        this.updateSnippetSelection();

        // Show save feedback
        const saveBtn = document.getElementById('saveBtn');
        const originalText = saveBtn.textContent;
        saveBtn.textContent = 'Saved!';
        setTimeout(() => {
            saveBtn.textContent = originalText;
        }, 1000);
    }

    autoSave() {
        clearTimeout(this.autoSaveTimeout);
        this.autoSaveTimeout = setTimeout(() => {
            this.saveCurrentSnippet();
        }, 1000);
    }

    deleteCurrentSnippet() {
        if (!this.currentSnippet) return;

        if (confirm('Are you sure you want to delete this snippet?')) {
            this.snippets = this.snippets.filter(s => s.id !== this.currentSnippet.id);
            this.saveSnippets();
            this.renderSnippetsList();
            this.currentSnippet = null;
            this.hideEditor();
        }
    }

    renderSnippetsList() {
        const container = document.getElementById('snippetsList');

        if (this.snippets.length === 0) {
            container.innerHTML = '<p style="color: #666; text-align: center; margin-top: 1rem;">No snippets yet</p>';
            return;
        }

        container.innerHTML = this.snippets.map(snippet => `
            <div class="snippet-item" data-id="${snippet.id}">
                <h4>${this.escapeHtml(snippet.name)}</h4>
                <p>Modified ${this.formatDate(snippet.modified)}</p>
            </div>
        `).join('');

        // Add click listeners
        container.querySelectorAll('.snippet-item').forEach(item => {
            item.addEventListener('click', () => {
                this.selectSnippet(item.dataset.id);
            });
        });
    }

    updateSnippetSelection() {
        document.querySelectorAll('.snippet-item').forEach(item => {
            item.classList.toggle('active', item.dataset.id === this.currentSnippet?.id);
        });
    }

    showEditor() {
        document.getElementById('welcomeScreen').style.display = 'none';
        document.getElementById('snippetEditor').style.display = 'flex';
    }

    hideEditor() {
        document.getElementById('welcomeScreen').style.display = 'flex';
        document.getElementById('snippetEditor').style.display = 'none';
    }

    switchEditorTab(tab) {
        this.currentTab = tab;

        // Update tab buttons
        document.querySelectorAll('.editor-tabs .tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });

        // Update editors
        document.querySelectorAll('.code-editor').forEach(editor => {
            editor.classList.toggle('active', editor.id === `${tab}Editor`);
        });
    }

    showPreview() {
        if (!this.currentSnippet) return;

        this.updatePreview();
        this.generateEmbedCode();
        document.getElementById('previewModal').style.display = 'flex';
    }

    hidePreview() {
        document.getElementById('previewModal').style.display = 'none';
    }

    switchPreviewTab(tab) {
        document.querySelectorAll('.preview-tabs .tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.preview === tab);
        });

        document.querySelectorAll('.preview-pane').forEach(pane => {
            pane.classList.toggle('active', pane.id === `${tab}Preview`);
        });
    }

    updatePreview() {
        const html = document.getElementById('htmlEditor').value;
        const css = document.getElementById('cssEditor').value;
        const js = document.getElementById('jsEditor').value;

        const previewContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script>${js}</script>
            </body>
            </html>
        `;

        const iframe = document.getElementById('previewFrame');
        iframe.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(previewContent);
    }

    generateEmbedCode() {
        const html = document.getElementById('htmlEditor').value;
        const css = document.getElementById('cssEditor').value;
        const js = document.getElementById('jsEditor').value;

        const embedCode = `<!-- ${this.currentSnippet.name} -->
<div id="snippet-${this.currentSnippet.id}">
${html}
</div>
<style>
#snippet-${this.currentSnippet.id} {
    /* Container styles */
}
${css}
</style>
<script>
(function() {
    ${js}
})();
</script>`;

        document.getElementById('embedCode').value = embedCode;
    }

    copyEmbedCode() {
        const embedCode = document.getElementById('embedCode');
        embedCode.select();
        document.execCommand('copy');

        const copyBtn = document.getElementById('copyEmbedBtn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 1000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = (now - date) / (1000 * 60 * 60);

        if (diffInHours < 1) {
            return 'just now';
        } else if (diffInHours < 24) {
            return `${Math.floor(diffInHours)} hours ago`;
        } else if (diffInHours < 48) {
            return 'yesterday';
        } else {
            return date.toLocaleDateString();
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new SnippetHub();
});