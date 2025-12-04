import React, { useState } from 'react';
import './PopupWidgetPage.css';

interface Block {
  id: string;
  type: 'heading' | 'text' | 'button' | 'link' | 'badge' | 'coupon' | 'timer' | 'form' | 'image' | 'video' | 'spacing' | 'separator' | 'iframe' | 'html';
  content: string;
  settings: any;
}

interface LayoutSettings {
  position: 'modal' | 'left-pane' | 'right-pane' | 'left-slide' | 'right-slide' | 'top-bar' | 'bottom-bar';
  width: number;
}

interface PopupSettings {
  backgroundColor: string;
  overlay: boolean;
  overlayColor: string;
  showCloseButton: boolean;
  autoShow: boolean;
  delaySeconds: number;
  triggerScroll: boolean;
  scrollPercent: number;
}

const PopupWidgetPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'builder' | 'layout' | 'settings'>('builder');
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [layoutSettings, setLayoutSettings] = useState<LayoutSettings>({
    position: 'modal',
    width: 500
  });
  const [popupSettings, setPopupSettings] = useState<PopupSettings>({
    backgroundColor: '#ffffff',
    overlay: true,
    overlayColor: 'rgba(0, 0, 0, 0.5)',
    showCloseButton: true,
    autoShow: true,
    delaySeconds: 3,
    triggerScroll: false,
    scrollPercent: 50
  });

  const blockTypes = [
    { type: 'heading', icon: '📝', label: 'Heading' },
    { type: 'text', icon: '📄', label: 'Text' },
    { type: 'button', icon: '🔘', label: 'Button' },
    { type: 'link', icon: '🔗', label: 'Link' },
    { type: 'badge', icon: '🏷️', label: 'Badge' },
    { type: 'coupon', icon: '🎟️', label: 'Coupon' },
    { type: 'timer', icon: '⏱️', label: 'Timer' },
    { type: 'form', icon: '📋', label: 'Form' },
    { type: 'image', icon: '🖼️', label: 'Image' },
    { type: 'video', icon: '🎥', label: 'Video' },
    { type: 'spacing', icon: '↕️', label: 'Spacing' },
    { type: 'separator', icon: '➖', label: 'Separator' },
    { type: 'iframe', icon: '🪟', label: 'iFrame' },
    { type: 'html', icon: '💻', label: 'HTML' }
  ];

  const addBlock = (type: Block['type']) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      settings: getDefaultSettings(type)
    };
    setBlocks([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
  };

  const getDefaultContent = (type: Block['type']): string => {
    const defaults: Record<Block['type'], string> = {
      heading: 'Your Heading Here',
      text: 'Your text content goes here.',
      button: 'Click Me',
      link: 'Learn More',
      badge: 'NEW',
      coupon: 'SAVE20',
      timer: '2025-12-31T23:59:59',
      form: 'Email',
      image: 'https://via.placeholder.com/400x300',
      video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      spacing: '20',
      separator: '',
      iframe: 'https://example.com',
      html: '<div>Custom HTML</div>'
    };
    return defaults[type];
  };

  const getDefaultSettings = (type: Block['type']): any => {
    const baseSettings = {
      heading: { level: 'h2', color: '#333333', fontSize: 32, align: 'center', fontWeight: 'bold' },
      text: { color: '#666666', fontSize: 16, align: 'left', lineHeight: 1.5 },
      button: { bgColor: '#3498db', textColor: '#ffffff', url: '#', fontSize: 16, borderRadius: 8, padding: '12px 24px' },
      link: { color: '#3498db', url: '#', fontSize: 16, underline: true },
      badge: { bgColor: '#e74c3c', textColor: '#ffffff', fontSize: 12, borderRadius: 4 },
      coupon: { bgColor: '#2ecc71', textColor: '#ffffff', fontSize: 20, borderStyle: 'dashed' },
      timer: { format: 'days-hours-minutes-seconds', color: '#333333', fontSize: 24 },
      form: { placeholder: 'Enter your email', buttonText: 'Submit', buttonColor: '#3498db' },
      image: { width: '100%', align: 'center', borderRadius: 0 },
      video: { width: '100%', height: 315, autoplay: false },
      spacing: { height: 20 },
      separator: { color: '#dddddd', thickness: 1, style: 'solid' },
      iframe: { width: '100%', height: 400 },
      html: { customCSS: '' }
    };
    return baseSettings[type];
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
    if (selectedBlockId === id) {
      setSelectedBlockId(null);
    }
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex(block => block.id === id);
    if (
      (direction === 'up' && index > 0) ||
      (direction === 'down' && index < blocks.length - 1)
    ) {
      const newBlocks = [...blocks];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];
      setBlocks(newBlocks);
    }
  };

  const updateBlockContent = (id: string, content: string) => {
    setBlocks(blocks.map(block =>
      block.id === id ? { ...block, content } : block
    ));
  };

  const updateBlockSettings = (id: string, settings: any) => {
    setBlocks(blocks.map(block =>
      block.id === id ? { ...block, settings: { ...block.settings, ...settings } } : block
    ));
  };

  const selectedBlock = blocks.find(block => block.id === selectedBlockId);

  const generateEmbedCode = () => {
    const config = {
      blocks,
      layout: layoutSettings,
      settings: popupSettings
    };

    return `<!-- Widget Hub Popup Widget -->
<div id="widget-hub-popup"></div>
<script>
(function() {
  const config = ${JSON.stringify(config, null, 2)};

  const createPopup = () => {
    const container = document.createElement('div');
    container.id = 'widget-hub-popup-container';
    container.style.cssText = \`
      position: fixed;
      z-index: 9999;
      \${getPositionStyles(config.layout.position, config.layout.width)}
      background: \${config.settings.backgroundColor};
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      border-radius: 8px;
      max-height: 90vh;
      overflow-y: auto;
      transition: all 0.3s ease;
    \`;

    if (config.settings.overlay) {
      const overlay = document.createElement('div');
      overlay.style.cssText = \`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: \${config.settings.overlayColor};
        z-index: 9998;
      \`;
      document.body.appendChild(overlay);
      overlay.addEventListener('click', () => closePopup());
    }

    if (config.settings.showCloseButton) {
      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '&times;';
      closeBtn.style.cssText = \`
        position: absolute;
        top: 10px;
        right: 10px;
        background: transparent;
        border: none;
        font-size: 32px;
        cursor: pointer;
        color: #666;
        line-height: 1;
        padding: 0;
        width: 32px;
        height: 32px;
      \`;
      closeBtn.addEventListener('click', () => closePopup());
      container.appendChild(closeBtn);
    }

    const content = document.createElement('div');
    content.style.cssText = 'padding: 40px 30px 30px 30px;';

    config.blocks.forEach(block => {
      const element = createBlockElement(block);
      content.appendChild(element);
    });

    container.appendChild(content);
    document.body.appendChild(container);
  };

  const getPositionStyles = (position, width) => {
    const styles = {
      'modal': \`top: 50%; left: 50%; transform: translate(-50%, -50%); width: \${width}px;\`,
      'left-pane': \`top: 0; left: 0; height: 100%; width: \${width}px;\`,
      'right-pane': \`top: 0; right: 0; height: 100%; width: \${width}px;\`,
      'left-slide': \`top: 50%; left: 20px; transform: translateY(-50%); width: \${width}px;\`,
      'right-slide': \`top: 50%; right: 20px; transform: translateY(-50%); width: \${width}px;\`,
      'top-bar': \`top: 0; left: 0; width: 100%; border-radius: 0;\`,
      'bottom-bar': \`bottom: 0; left: 0; width: 100%; border-radius: 0;\`
    };
    return styles[position];
  };

  const createBlockElement = (block) => {
    const element = document.createElement('div');
    element.style.marginBottom = '15px';

    switch(block.type) {
      case 'heading':
        const heading = document.createElement(block.settings.level);
        heading.textContent = block.content;
        heading.style.cssText = \`
          color: \${block.settings.color};
          font-size: \${block.settings.fontSize}px;
          text-align: \${block.settings.align};
          font-weight: \${block.settings.fontWeight};
          margin: 0;
        \`;
        element.appendChild(heading);
        break;

      case 'text':
        const text = document.createElement('p');
        text.textContent = block.content;
        text.style.cssText = \`
          color: \${block.settings.color};
          font-size: \${block.settings.fontSize}px;
          text-align: \${block.settings.align};
          line-height: \${block.settings.lineHeight};
          margin: 0;
        \`;
        element.appendChild(text);
        break;

      case 'button':
        const button = document.createElement('a');
        button.href = block.settings.url;
        button.textContent = block.content;
        button.style.cssText = \`
          display: inline-block;
          background: \${block.settings.bgColor};
          color: \${block.settings.textColor};
          padding: \${block.settings.padding};
          font-size: \${block.settings.fontSize}px;
          border-radius: \${block.settings.borderRadius}px;
          text-decoration: none;
          cursor: pointer;
        \`;
        element.appendChild(button);
        break;

      case 'link':
        const link = document.createElement('a');
        link.href = block.settings.url;
        link.textContent = block.content;
        link.style.cssText = \`
          color: \${block.settings.color};
          font-size: \${block.settings.fontSize}px;
          text-decoration: \${block.settings.underline ? 'underline' : 'none'};
        \`;
        element.appendChild(link);
        break;

      case 'badge':
        const badge = document.createElement('span');
        badge.textContent = block.content;
        badge.style.cssText = \`
          display: inline-block;
          background: \${block.settings.bgColor};
          color: \${block.settings.textColor};
          padding: 4px 12px;
          font-size: \${block.settings.fontSize}px;
          border-radius: \${block.settings.borderRadius}px;
          font-weight: bold;
        \`;
        element.appendChild(badge);
        break;

      case 'coupon':
        const coupon = document.createElement('div');
        coupon.textContent = block.content;
        coupon.style.cssText = \`
          background: \${block.settings.bgColor};
          color: \${block.settings.textColor};
          padding: 15px;
          font-size: \${block.settings.fontSize}px;
          border: 2px \${block.settings.borderStyle} currentColor;
          text-align: center;
          font-weight: bold;
          letter-spacing: 2px;
        \`;
        element.appendChild(coupon);
        break;

      case 'spacing':
        element.style.height = block.content + 'px';
        break;

      case 'separator':
        const separator = document.createElement('hr');
        separator.style.cssText = \`
          border: none;
          border-top: \${block.settings.thickness}px \${block.settings.style} \${block.settings.color};
          margin: 0;
        \`;
        element.appendChild(separator);
        break;

      case 'image':
        const img = document.createElement('img');
        img.src = block.content;
        img.style.cssText = \`
          width: \${block.settings.width};
          border-radius: \${block.settings.borderRadius}px;
          display: block;
          margin: 0 auto;
        \`;
        element.appendChild(img);
        break;

      case 'video':
        const video = document.createElement('iframe');
        video.src = block.content + (block.settings.autoplay ? '?autoplay=1' : '');
        video.style.cssText = \`
          width: \${block.settings.width};
          height: \${block.settings.height}px;
          border: none;
        \`;
        element.appendChild(video);
        break;

      case 'iframe':
        const iframe = document.createElement('iframe');
        iframe.src = block.content;
        iframe.style.cssText = \`
          width: \${block.settings.width};
          height: \${block.settings.height}px;
          border: none;
        \`;
        element.appendChild(iframe);
        break;

      case 'html':
        element.innerHTML = block.content;
        if (block.settings.customCSS) {
          const style = document.createElement('style');
          style.textContent = block.settings.customCSS;
          element.appendChild(style);
        }
        break;

      case 'timer':
        const timer = document.createElement('div');
        timer.style.cssText = \`
          color: \${block.settings.color};
          font-size: \${block.settings.fontSize}px;
          text-align: center;
          font-weight: bold;
        \`;

        const updateTimer = () => {
          const now = new Date().getTime();
          const target = new Date(block.content).getTime();
          const distance = target - now;

          if (distance < 0) {
            timer.textContent = 'EXPIRED';
            return;
          }

          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          timer.textContent = \`\${days}d \${hours}h \${minutes}m \${seconds}s\`;
        };

        updateTimer();
        setInterval(updateTimer, 1000);
        element.appendChild(timer);
        break;

      case 'form':
        const form = document.createElement('form');
        const input = document.createElement('input');
        input.type = 'email';
        input.placeholder = block.content;
        input.style.cssText = \`
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-bottom: 10px;
          font-size: 14px;
        \`;

        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.textContent = block.settings.buttonText;
        submitBtn.style.cssText = \`
          width: 100%;
          padding: 12px;
          background: \${block.settings.buttonColor};
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
        \`;

        form.appendChild(input);
        form.appendChild(submitBtn);
        element.appendChild(form);
        break;
    }

    return element;
  };

  const closePopup = () => {
    const container = document.getElementById('widget-hub-popup-container');
    const overlay = document.querySelector('[style*="z-index: 9998"]');
    if (container) container.remove();
    if (overlay) overlay.remove();
  };

  // Show popup based on settings
  if (config.settings.autoShow) {
    setTimeout(() => createPopup(), config.settings.delaySeconds * 1000);
  }

  if (config.settings.triggerScroll) {
    window.addEventListener('scroll', () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent >= config.settings.scrollPercent) {
        createPopup();
      }
    });
  }
})();
</script>`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateEmbedCode());
    alert('Embed code copied to clipboard!');
  };

  return (
    <div className="popup-widget-page">
      <div className="page-header">
        <h1>Pop-up Widget Builder</h1>
        <p>Create customizable pop-up modals for promotions, announcements, and lead capture</p>
      </div>

      <div className="widget-container">
        <div className="editor-section">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'builder' ? 'active' : ''}`}
              onClick={() => setActiveTab('builder')}
            >
              Builder
            </button>
            <button
              className={`tab ${activeTab === 'layout' ? 'active' : ''}`}
              onClick={() => setActiveTab('layout')}
            >
              Layout
            </button>
            <button
              className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'builder' && (
              <div className="builder-tab">
                <div className="builder-layout">
                  <div className="block-palette">
                    <h3>Add Blocks</h3>
                    <div className="block-types-grid">
                      {blockTypes.map(({ type, icon, label }) => (
                        <button
                          key={type}
                          className="block-type-btn"
                          onClick={() => addBlock(type as Block['type'])}
                          title={`Add ${label}`}
                        >
                          <span className="block-icon">{icon}</span>
                          <span className="block-label">{label}</span>
                        </button>
                      ))}
                    </div>

                    <div className="background-settings">
                      <h3>Background</h3>
                      <div className="control-group">
                        <label htmlFor="backgroundColor">Background Color</label>
                        <input
                          type="color"
                          id="backgroundColor"
                          value={popupSettings.backgroundColor}
                          onChange={(e) => setPopupSettings({ ...popupSettings, backgroundColor: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="blocks-list">
                    <h3>Popup Blocks ({blocks.length})</h3>
                    {blocks.length === 0 ? (
                      <div className="empty-state">
                        <p>No blocks yet. Add blocks from the palette on the left.</p>
                      </div>
                    ) : (
                      <div className="blocks">
                        {blocks.map((block, index) => (
                          <div
                            key={block.id}
                            className={`block-item ${selectedBlockId === block.id ? 'selected' : ''}`}
                            onClick={() => setSelectedBlockId(block.id)}
                          >
                            <div className="block-header">
                              <span className="block-type">{blockTypes.find(t => t.type === block.type)?.icon} {blockTypes.find(t => t.type === block.type)?.label}</span>
                              <div className="block-actions">
                                <button onClick={() => moveBlock(block.id, 'up')} disabled={index === 0}>↑</button>
                                <button onClick={() => moveBlock(block.id, 'down')} disabled={index === blocks.length - 1}>↓</button>
                                <button onClick={() => removeBlock(block.id)}>×</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {selectedBlock && (
                    <div className="block-editor">
                      <h3>Edit Block</h3>
                      <div className="control-group">
                        <label>Content</label>
                        {selectedBlock.type === 'spacing' ? (
                          <input
                            type="number"
                            value={selectedBlock.content}
                            onChange={(e) => updateBlockContent(selectedBlock.id, e.target.value)}
                            placeholder="Height in pixels"
                          />
                        ) : selectedBlock.type === 'html' ? (
                          <textarea
                            value={selectedBlock.content}
                            onChange={(e) => updateBlockContent(selectedBlock.id, e.target.value)}
                            rows={6}
                            placeholder="Enter HTML content"
                          />
                        ) : (
                          <input
                            type="text"
                            value={selectedBlock.content}
                            onChange={(e) => updateBlockContent(selectedBlock.id, e.target.value)}
                          />
                        )}
                      </div>

                      {renderBlockSettings(selectedBlock)}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'layout' && (
              <div className="layout-tab">
                <div className="control-group">
                  <label htmlFor="position">Position</label>
                  <select
                    id="position"
                    value={layoutSettings.position}
                    onChange={(e) => setLayoutSettings({ ...layoutSettings, position: e.target.value as LayoutSettings['position'] })}
                  >
                    <option value="modal">Modal (Center)</option>
                    <option value="left-pane">Left Pane (Full Height)</option>
                    <option value="right-pane">Right Pane (Full Height)</option>
                    <option value="left-slide">Left Slide In</option>
                    <option value="right-slide">Right Slide In</option>
                    <option value="top-bar">Top Bar</option>
                    <option value="bottom-bar">Bottom Bar</option>
                  </select>
                </div>

                {!['top-bar', 'bottom-bar'].includes(layoutSettings.position) && (
                  <div className="control-group">
                    <label htmlFor="width">Width (px)</label>
                    <input
                      type="range"
                      id="width"
                      min="300"
                      max="800"
                      value={layoutSettings.width}
                      onChange={(e) => setLayoutSettings({ ...layoutSettings, width: parseInt(e.target.value) })}
                    />
                    <span className="range-value">{layoutSettings.width}px</span>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="settings-tab">
                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={popupSettings.overlay}
                      onChange={(e) => setPopupSettings({ ...popupSettings, overlay: e.target.checked })}
                    />
                    Show Overlay
                  </label>
                </div>

                {popupSettings.overlay && (
                  <div className="control-group">
                    <label htmlFor="overlayColor">Overlay Color</label>
                    <input
                      type="text"
                      id="overlayColor"
                      value={popupSettings.overlayColor}
                      onChange={(e) => setPopupSettings({ ...popupSettings, overlayColor: e.target.value })}
                      placeholder="rgba(0, 0, 0, 0.5)"
                    />
                  </div>
                )}

                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={popupSettings.showCloseButton}
                      onChange={(e) => setPopupSettings({ ...popupSettings, showCloseButton: e.target.checked })}
                    />
                    Show Close Button
                  </label>
                </div>

                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={popupSettings.autoShow}
                      onChange={(e) => setPopupSettings({ ...popupSettings, autoShow: e.target.checked })}
                    />
                    Auto Show
                  </label>
                </div>

                {popupSettings.autoShow && (
                  <div className="control-group">
                    <label htmlFor="delaySeconds">Delay (seconds)</label>
                    <input
                      type="number"
                      id="delaySeconds"
                      value={popupSettings.delaySeconds}
                      onChange={(e) => setPopupSettings({ ...popupSettings, delaySeconds: parseInt(e.target.value) })}
                      min="0"
                    />
                  </div>
                )}

                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={popupSettings.triggerScroll}
                      onChange={(e) => setPopupSettings({ ...popupSettings, triggerScroll: e.target.checked })}
                    />
                    Trigger on Scroll
                  </label>
                </div>

                {popupSettings.triggerScroll && (
                  <div className="control-group">
                    <label htmlFor="scrollPercent">Scroll Percentage</label>
                    <input
                      type="range"
                      id="scrollPercent"
                      min="0"
                      max="100"
                      value={popupSettings.scrollPercent}
                      onChange={(e) => setPopupSettings({ ...popupSettings, scrollPercent: parseInt(e.target.value) })}
                    />
                    <span className="range-value">{popupSettings.scrollPercent}%</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="preview-section">
          <h3>Preview</h3>
          <div className="preview-container">
            <PopupPreview
              blocks={blocks}
              layout={layoutSettings}
              settings={popupSettings}
            />
          </div>

          <div className="embed-section">
            <h3>Embed Code</h3>
            <button className="copy-btn" onClick={copyToClipboard}>
              Copy Code
            </button>
            <pre className="embed-code">{generateEmbedCode()}</pre>
          </div>
        </div>
      </div>
    </div>
  );

  function renderBlockSettings(block: Block) {
    switch (block.type) {
      case 'heading':
        return (
          <>
            <div className="control-group">
              <label>Heading Level</label>
              <select
                value={block.settings.level}
                onChange={(e) => updateBlockSettings(block.id, { level: e.target.value })}
              >
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
                <option value="h4">H4</option>
              </select>
            </div>
            <div className="control-group">
              <label>Color</label>
              <input
                type="color"
                value={block.settings.color}
                onChange={(e) => updateBlockSettings(block.id, { color: e.target.value })}
              />
            </div>
            <div className="control-group">
              <label>Font Size</label>
              <input
                type="number"
                value={block.settings.fontSize}
                onChange={(e) => updateBlockSettings(block.id, { fontSize: parseInt(e.target.value) })}
              />
            </div>
            <div className="control-group">
              <label>Align</label>
              <select
                value={block.settings.align}
                onChange={(e) => updateBlockSettings(block.id, { align: e.target.value })}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </>
        );

      case 'text':
        return (
          <>
            <div className="control-group">
              <label>Color</label>
              <input
                type="color"
                value={block.settings.color}
                onChange={(e) => updateBlockSettings(block.id, { color: e.target.value })}
              />
            </div>
            <div className="control-group">
              <label>Font Size</label>
              <input
                type="number"
                value={block.settings.fontSize}
                onChange={(e) => updateBlockSettings(block.id, { fontSize: parseInt(e.target.value) })}
              />
            </div>
            <div className="control-group">
              <label>Align</label>
              <select
                value={block.settings.align}
                onChange={(e) => updateBlockSettings(block.id, { align: e.target.value })}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </>
        );

      case 'button':
        return (
          <>
            <div className="control-group">
              <label>URL</label>
              <input
                type="text"
                value={block.settings.url}
                onChange={(e) => updateBlockSettings(block.id, { url: e.target.value })}
              />
            </div>
            <div className="control-group">
              <label>Background Color</label>
              <input
                type="color"
                value={block.settings.bgColor}
                onChange={(e) => updateBlockSettings(block.id, { bgColor: e.target.value })}
              />
            </div>
            <div className="control-group">
              <label>Text Color</label>
              <input
                type="color"
                value={block.settings.textColor}
                onChange={(e) => updateBlockSettings(block.id, { textColor: e.target.value })}
              />
            </div>
            <div className="control-group">
              <label>Border Radius</label>
              <input
                type="number"
                value={block.settings.borderRadius}
                onChange={(e) => updateBlockSettings(block.id, { borderRadius: parseInt(e.target.value) })}
              />
            </div>
          </>
        );

      case 'link':
        return (
          <>
            <div className="control-group">
              <label>URL</label>
              <input
                type="text"
                value={block.settings.url}
                onChange={(e) => updateBlockSettings(block.id, { url: e.target.value })}
              />
            </div>
            <div className="control-group">
              <label>Color</label>
              <input
                type="color"
                value={block.settings.color}
                onChange={(e) => updateBlockSettings(block.id, { color: e.target.value })}
              />
            </div>
            <div className="control-group">
              <label>
                <input
                  type="checkbox"
                  checked={block.settings.underline}
                  onChange={(e) => updateBlockSettings(block.id, { underline: e.target.checked })}
                />
                Underline
              </label>
            </div>
          </>
        );

      case 'badge':
        return (
          <>
            <div className="control-group">
              <label>Background Color</label>
              <input
                type="color"
                value={block.settings.bgColor}
                onChange={(e) => updateBlockSettings(block.id, { bgColor: e.target.value })}
              />
            </div>
            <div className="control-group">
              <label>Text Color</label>
              <input
                type="color"
                value={block.settings.textColor}
                onChange={(e) => updateBlockSettings(block.id, { textColor: e.target.value })}
              />
            </div>
          </>
        );

      case 'coupon':
        return (
          <>
            <div className="control-group">
              <label>Background Color</label>
              <input
                type="color"
                value={block.settings.bgColor}
                onChange={(e) => updateBlockSettings(block.id, { bgColor: e.target.value })}
              />
            </div>
            <div className="control-group">
              <label>Text Color</label>
              <input
                type="color"
                value={block.settings.textColor}
                onChange={(e) => updateBlockSettings(block.id, { textColor: e.target.value })}
              />
            </div>
            <div className="control-group">
              <label>Border Style</label>
              <select
                value={block.settings.borderStyle}
                onChange={(e) => updateBlockSettings(block.id, { borderStyle: e.target.value })}
              >
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
              </select>
            </div>
          </>
        );

      case 'image':
        return (
          <>
            <div className="control-group">
              <label>Width</label>
              <input
                type="text"
                value={block.settings.width}
                onChange={(e) => updateBlockSettings(block.id, { width: e.target.value })}
                placeholder="100% or 400px"
              />
            </div>
            <div className="control-group">
              <label>Border Radius</label>
              <input
                type="number"
                value={block.settings.borderRadius}
                onChange={(e) => updateBlockSettings(block.id, { borderRadius: parseInt(e.target.value) })}
              />
            </div>
          </>
        );

      case 'video':
        return (
          <>
            <div className="control-group">
              <label>Width</label>
              <input
                type="text"
                value={block.settings.width}
                onChange={(e) => updateBlockSettings(block.id, { width: e.target.value })}
              />
            </div>
            <div className="control-group">
              <label>Height</label>
              <input
                type="number"
                value={block.settings.height}
                onChange={(e) => updateBlockSettings(block.id, { height: parseInt(e.target.value) })}
              />
            </div>
            <div className="control-group">
              <label>
                <input
                  type="checkbox"
                  checked={block.settings.autoplay}
                  onChange={(e) => updateBlockSettings(block.id, { autoplay: e.target.checked })}
                />
                Autoplay
              </label>
            </div>
          </>
        );

      case 'form':
        return (
          <>
            <div className="control-group">
              <label>Button Text</label>
              <input
                type="text"
                value={block.settings.buttonText}
                onChange={(e) => updateBlockSettings(block.id, { buttonText: e.target.value })}
              />
            </div>
            <div className="control-group">
              <label>Button Color</label>
              <input
                type="color"
                value={block.settings.buttonColor}
                onChange={(e) => updateBlockSettings(block.id, { buttonColor: e.target.value })}
              />
            </div>
          </>
        );

      case 'timer':
        return (
          <>
            <div className="control-group">
              <label>Color</label>
              <input
                type="color"
                value={block.settings.color}
                onChange={(e) => updateBlockSettings(block.id, { color: e.target.value })}
              />
            </div>
            <div className="control-group">
              <label>Font Size</label>
              <input
                type="number"
                value={block.settings.fontSize}
                onChange={(e) => updateBlockSettings(block.id, { fontSize: parseInt(e.target.value) })}
              />
            </div>
          </>
        );

      case 'separator':
        return (
          <>
            <div className="control-group">
              <label>Color</label>
              <input
                type="color"
                value={block.settings.color}
                onChange={(e) => updateBlockSettings(block.id, { color: e.target.value })}
              />
            </div>
            <div className="control-group">
              <label>Thickness</label>
              <input
                type="number"
                value={block.settings.thickness}
                onChange={(e) => updateBlockSettings(block.id, { thickness: parseInt(e.target.value) })}
              />
            </div>
            <div className="control-group">
              <label>Style</label>
              <select
                value={block.settings.style}
                onChange={(e) => updateBlockSettings(block.id, { style: e.target.value })}
              >
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
              </select>
            </div>
          </>
        );

      case 'iframe':
        return (
          <>
            <div className="control-group">
              <label>Width</label>
              <input
                type="text"
                value={block.settings.width}
                onChange={(e) => updateBlockSettings(block.id, { width: e.target.value })}
              />
            </div>
            <div className="control-group">
              <label>Height</label>
              <input
                type="number"
                value={block.settings.height}
                onChange={(e) => updateBlockSettings(block.id, { height: parseInt(e.target.value) })}
              />
            </div>
          </>
        );

      case 'html':
        return (
          <div className="control-group">
            <label>Custom CSS</label>
            <textarea
              value={block.settings.customCSS}
              onChange={(e) => updateBlockSettings(block.id, { customCSS: e.target.value })}
              rows={4}
              placeholder="Enter custom CSS..."
            />
          </div>
        );

      default:
        return null;
    }
  }
};

interface PopupPreviewProps {
  blocks: Block[];
  layout: LayoutSettings;
  settings: PopupSettings;
}

const PopupPreview: React.FC<PopupPreviewProps> = ({ blocks, layout, settings }) => {
  const getPositionStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      backgroundColor: settings.backgroundColor,
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      borderRadius: '8px',
      maxHeight: '80%',
      overflowY: 'auto'
    };

    switch (layout.position) {
      case 'modal':
        return { ...base, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: layout.width };
      case 'left-pane':
        return { ...base, top: 0, left: 0, height: '100%', width: layout.width, borderRadius: 0 };
      case 'right-pane':
        return { ...base, top: 0, right: 0, height: '100%', width: layout.width, borderRadius: 0 };
      case 'left-slide':
        return { ...base, top: '50%', left: '20px', transform: 'translateY(-50%)', width: layout.width };
      case 'right-slide':
        return { ...base, top: '50%', right: '20px', transform: 'translateY(-50%)', width: layout.width };
      case 'top-bar':
        return { ...base, top: 0, left: 0, width: '100%', borderRadius: 0 };
      case 'bottom-bar':
        return { ...base, bottom: 0, left: 0, width: '100%', borderRadius: 0 };
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '600px', background: '#f5f5f5', overflow: 'hidden' }}>
      {settings.overlay && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: settings.overlayColor
        }} />
      )}
      <div style={getPositionStyles()}>
        {settings.showCloseButton && (
          <button style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            border: 'none',
            fontSize: '32px',
            cursor: 'pointer',
            color: '#666',
            lineHeight: 1
          }}>×</button>
        )}
        <div style={{ padding: '40px 30px 30px 30px' }}>
          {blocks.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#999' }}>Add blocks to see preview</p>
          ) : (
            blocks.map(block => <BlockPreview key={block.id} block={block} />)
          )}
        </div>
      </div>
    </div>
  );
};

const BlockPreview: React.FC<{ block: Block }> = ({ block }) => {
  const renderBlock = () => {
    switch (block.type) {
      case 'heading':
        const HeadingTag = block.settings.level as 'h1' | 'h2' | 'h3' | 'h4';
        return React.createElement(HeadingTag, {
          style: {
            color: block.settings.color,
            fontSize: block.settings.fontSize,
            textAlign: block.settings.align,
            fontWeight: block.settings.fontWeight,
            margin: 0
          }
        }, block.content);

      case 'text':
        return (
          <p style={{
            color: block.settings.color,
            fontSize: block.settings.fontSize,
            textAlign: block.settings.align,
            lineHeight: block.settings.lineHeight,
            margin: 0
          }}>
            {block.content}
          </p>
        );

      case 'button':
        return (
          <a href={block.settings.url} style={{
            display: 'inline-block',
            background: block.settings.bgColor,
            color: block.settings.textColor,
            padding: block.settings.padding,
            fontSize: block.settings.fontSize,
            borderRadius: block.settings.borderRadius,
            textDecoration: 'none',
            cursor: 'pointer'
          }}>
            {block.content}
          </a>
        );

      case 'link':
        return (
          <a href={block.settings.url} style={{
            color: block.settings.color,
            fontSize: block.settings.fontSize,
            textDecoration: block.settings.underline ? 'underline' : 'none'
          }}>
            {block.content}
          </a>
        );

      case 'badge':
        return (
          <span style={{
            display: 'inline-block',
            background: block.settings.bgColor,
            color: block.settings.textColor,
            padding: '4px 12px',
            fontSize: block.settings.fontSize,
            borderRadius: block.settings.borderRadius,
            fontWeight: 'bold'
          }}>
            {block.content}
          </span>
        );

      case 'coupon':
        return (
          <div style={{
            background: block.settings.bgColor,
            color: block.settings.textColor,
            padding: '15px',
            fontSize: block.settings.fontSize,
            border: `2px ${block.settings.borderStyle} currentColor`,
            textAlign: 'center',
            fontWeight: 'bold',
            letterSpacing: '2px'
          }}>
            {block.content}
          </div>
        );

      case 'spacing':
        return <div style={{ height: block.content + 'px' }} />;

      case 'separator':
        return <hr style={{
          border: 'none',
          borderTop: `${block.settings.thickness}px ${block.settings.style} ${block.settings.color}`,
          margin: 0
        }} />;

      case 'image':
        return <img src={block.content} alt="" style={{
          width: block.settings.width,
          borderRadius: block.settings.borderRadius,
          display: 'block',
          margin: '0 auto'
        }} />;

      case 'video':
        return <iframe
          src={block.content}
          style={{
            width: block.settings.width,
            height: block.settings.height,
            border: 'none'
          }}
        />;

      case 'iframe':
        return <iframe
          src={block.content}
          style={{
            width: block.settings.width,
            height: block.settings.height,
            border: 'none'
          }}
        />;

      case 'html':
        return <div dangerouslySetInnerHTML={{ __html: block.content }} />;

      case 'timer':
        return <div style={{
          color: block.settings.color,
          fontSize: block.settings.fontSize,
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          {block.content}
        </div>;

      case 'form':
        return (
          <form>
            <input
              type="email"
              placeholder={block.content}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                marginBottom: '10px',
                fontSize: '14px'
              }}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                background: block.settings.buttonColor,
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              {block.settings.buttonText}
            </button>
          </form>
        );

      default:
        return null;
    }
  };

  return <div style={{ marginBottom: '15px' }}>{renderBlock()}</div>;
};

export default PopupWidgetPage;
