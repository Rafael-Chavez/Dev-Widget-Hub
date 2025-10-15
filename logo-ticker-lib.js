/**
 * Logo Ticker Library
 * Automatically initializes logo tickers on page load
 */
(function() {
    'use strict';

    class LogoTickerWidget {
        constructor(element) {
            this.element = element;
            this.config = this.getConfig();
            this.render();
        }

        getConfig() {
            // Get configuration from data attributes
            return {
                logos: JSON.parse(this.element.dataset.logos || '[]'),
                speed: parseInt(this.element.dataset.speed) || 20,
                logoSize: parseInt(this.element.dataset.logoSize) || 60,
                logoSizeMobile: parseInt(this.element.dataset.logoSizeMobile) || 40,
                spacing: parseInt(this.element.dataset.spacing) || 60,
                spacingMobile: parseInt(this.element.dataset.spacingMobile) || 40,
                bgType: this.element.dataset.bgType || 'solid',
                bgColor: this.element.dataset.bgColor || '#ffffff',
                gradientColor1: this.element.dataset.gradientColor1 || '#3498db',
                gradientColor2: this.element.dataset.gradientColor2 || '#9b59b6',
                gradientDirection: parseInt(this.element.dataset.gradientDirection) || 90,
                cornerRadius: parseInt(this.element.dataset.cornerRadius) || 8
            };
        }

        getBackground() {
            if (this.config.bgType === 'gradient') {
                return `linear-gradient(${this.config.gradientDirection}deg, ${this.config.gradientColor1}, ${this.config.gradientColor2})`;
            }
            return this.config.bgColor;
        }

        render() {
            // Create wrapper
            const wrapper = document.createElement('div');
            wrapper.className = 'logo-ticker-wrapper';
            wrapper.style.cssText = `
                background: ${this.getBackground()};
                border-radius: ${this.config.cornerRadius}px;
                overflow: hidden;
                position: relative;
                width: 100%;
            `;

            // Create track
            const track = document.createElement('div');
            track.className = 'logo-ticker-track';
            track.style.cssText = `
                display: flex;
                width: max-content;
                animation: ticker-scroll ${this.config.speed}s linear infinite;
                padding: 40px 0;
            `;

            // Add logos (duplicate for seamless loop)
            const logos = [...this.config.logos, ...this.config.logos];
            logos.forEach(logoUrl => {
                const img = document.createElement('img');
                img.src = logoUrl;
                img.alt = 'Logo';
                img.className = 'logo-ticker-img';
                track.appendChild(img);
            });

            wrapper.appendChild(track);
            this.element.appendChild(wrapper);

            // Inject styles
            this.injectStyles();
        }

        injectStyles() {
            // Check if styles already exist
            if (document.getElementById('logo-ticker-styles')) return;

            const style = document.createElement('style');
            style.id = 'logo-ticker-styles';
            style.textContent = `
                .logo-ticker-img {
                    height: ${this.config.logoSize}px;
                    width: auto;
                    object-fit: contain;
                    margin-right: ${this.config.spacing}px;
                    filter: grayscale(100%);
                    opacity: 0.7;
                    transition: all 0.3s;
                }

                .logo-ticker-img:hover {
                    filter: grayscale(0%);
                    opacity: 1;
                    transform: scale(1.1);
                }

                .logo-ticker-track:hover {
                    animation-play-state: paused;
                }

                @keyframes ticker-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                @media (max-width: 768px) {
                    .logo-ticker-img {
                        height: ${this.config.logoSizeMobile}px !important;
                        margin-right: ${this.config.spacingMobile}px !important;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Auto-initialize on DOM ready
    function init() {
        const tickers = document.querySelectorAll('[data-logo-ticker]');
        tickers.forEach(ticker => {
            new LogoTickerWidget(ticker);
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose for manual initialization
    window.LogoTickerWidget = LogoTickerWidget;
})();
