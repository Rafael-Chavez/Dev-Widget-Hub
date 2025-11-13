import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnnouncementBarPage.css';

interface Settings {
  message: string;
  buttonText: string;
  buttonUrl: string;
  showButton: boolean;
  showCloseButton: boolean;
  position: 'top' | 'bottom';
  bgColor: string;
  textColor: string;
  buttonBgColor: string;
  buttonTextColor: string;
  fontSize: number;
  padding: number;
  animation: 'none' | 'slide' | 'fade';
  closeable: boolean;
}

const AnnouncementBarPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'content' | 'style'>('content');
  const [isVisible, setIsVisible] = useState(true);

  const [settings, setSettings] = useState<Settings>({
    message: '🎉 Special Offer: Get 20% off your first order! Use code: WELCOME20',
    buttonText: 'Shop Now',
    buttonUrl: '#',
    showButton: true,
    showCloseButton: true,
    position: 'top',
    bgColor: '#3498db',
    textColor: '#ffffff',
    buttonBgColor: '#ffffff',
    buttonTextColor: '#3498db',
    fontSize: 16,
    padding: 12,
    animation: 'slide',
    closeable: true
  });

  const generateEmbedCode = (): string => {
    const scriptContent = `(function() {
    const config = {
        message: '${settings.message.replace(/'/g, "\\'")}',
        buttonText: '${settings.buttonText.replace(/'/g, "\\'")}',
        buttonUrl: '${settings.buttonUrl}',
        showButton: ${settings.showButton},
        showCloseButton: ${settings.showCloseButton},
        position: '${settings.position}',
        bgColor: '${settings.bgColor}',
        textColor: '${settings.textColor}',
        buttonBgColor: '${settings.buttonBgColor}',
        buttonTextColor: '${settings.buttonTextColor}',
        fontSize: ${settings.fontSize},
        padding: ${settings.padding},
        animation: '${settings.animation}',
        closeable: ${settings.closeable}
    };

    // Check if already dismissed
    const storageKey = 'announcement-bar-dismissed';
    if (config.closeable && localStorage.getItem(storageKey) === 'true') {
        return;
    }

    const bar = document.createElement('div');
    bar.id = 'announcement-bar-widget';
    bar.style.cssText = 'position: fixed; ' + (config.position === 'top' ? 'top: 0;' : 'bottom: 0;') + ' left: 0; right: 0; background: ' + config.bgColor + '; color: ' + config.textColor + '; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; z-index: 9999; display: flex; align-items: center; justify-content: center; padding: ' + config.padding + 'px 20px; gap: 15px; font-size: ' + config.fontSize + 'px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);';

    // Animation
    if (config.animation === 'slide') {
        bar.style.transform = config.position === 'top' ? 'translateY(-100%)' : 'translateY(100%)';
        bar.style.transition = 'transform 0.4s ease-out';
        setTimeout(() => {
            bar.style.transform = 'translateY(0)';
        }, 100);
    } else if (config.animation === 'fade') {
        bar.style.opacity = '0';
        bar.style.transition = 'opacity 0.4s ease-out';
        setTimeout(() => {
            bar.style.opacity = '1';
        }, 100);
    }

    const container = document.createElement('div');
    container.style.cssText = 'display: flex; align-items: center; justify-content: center; gap: 15px; flex-wrap: wrap; max-width: 1200px; margin: 0 auto; width: 100%;';

    const message = document.createElement('span');
    message.textContent = config.message;
    message.style.cssText = 'text-align: center; line-height: 1.5;';
    container.appendChild(message);

    if (config.showButton) {
        const button = document.createElement('a');
        button.href = config.buttonUrl;
        button.textContent = config.buttonText;
        button.style.cssText = 'background: ' + config.buttonBgColor + '; color: ' + config.buttonTextColor + '; padding: 8px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; white-space: nowrap; transition: all 0.2s; border: 2px solid transparent;';
        button.onmouseenter = function() {
            this.style.transform = 'scale(1.05)';
            this.style.borderColor = config.buttonBgColor;
            this.style.background = 'transparent';
            this.style.color = config.buttonBgColor;
        };
        button.onmouseleave = function() {
            this.style.transform = 'scale(1)';
            this.style.borderColor = 'transparent';
            this.style.background = config.buttonBgColor;
            this.style.color = config.buttonTextColor;
        };
        container.appendChild(button);
    }

    bar.appendChild(container);

    if (config.showCloseButton) {
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = 'background: transparent; border: none; color: ' + config.textColor + '; font-size: 24px; cursor: pointer; padding: 0; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; position: absolute; right: 10px; transition: all 0.2s; border-radius: 4px;';
        closeBtn.onmouseenter = function() {
            this.style.background = 'rgba(0,0,0,0.1)';
        };
        closeBtn.onmouseleave = function() {
            this.style.background = 'transparent';
        };
        closeBtn.onclick = function() {
            if (config.animation === 'slide') {
                bar.style.transform = config.position === 'top' ? 'translateY(-100%)' : 'translateY(100%)';
            } else if (config.animation === 'fade') {
                bar.style.opacity = '0';
            } else {
                bar.style.display = 'none';
            }

            setTimeout(() => {
                bar.remove();
            }, 400);

            if (config.closeable) {
                localStorage.setItem(storageKey, 'true');
            }
        };
        bar.appendChild(closeBtn);
    }

    document.body.insertBefore(bar, document.body.firstChild);

    // Add body padding to prevent content overlap
    if (config.position === 'top') {
        document.body.style.paddingTop = bar.offsetHeight + 'px';
    } else {
        document.body.style.paddingBottom = bar.offsetHeight + 'px';
    }
})();`;

    return '<!-- Announcement Bar Widget -->\n<script>\n' + scriptContent + '\n</script>';
  };

  const copyEmbedCode = () => {
    const code = generateEmbedCode();
    navigator.clipboard.writeText(code).then(() => {
      alert('Embed code copied to clipboard!');
    });
  };

  return (
    <div className="announcement-bar-page">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>Announcement Bar</h1>
          <button className="home-btn" onClick={() => navigate('/')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"/>
            </svg>
            Home
          </button>
        </div>

        <div className="tab-navigation">
          <button
            className={`tab-nav-btn ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            Content
          </button>
          <button
            className={`tab-nav-btn ${activeTab === 'style' ? 'active' : ''}`}
            onClick={() => setActiveTab('style')}
          >
            Style
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'content' && (
            <div className="tab-pane active">
              <div className="content-section">
                <h3 className="section-title">Message</h3>
                <div className="control-group">
                  <label htmlFor="message">Announcement Text</label>
                  <textarea
                    id="message"
                    value={settings.message}
                    onChange={(e) => setSettings({...settings, message: e.target.value})}
                    placeholder="Enter your announcement message..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">Call to Action</h3>
                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.showButton}
                      onChange={(e) => setSettings({...settings, showButton: e.target.checked})}
                    />
                    <span>Show Button</span>
                  </label>
                </div>

                {settings.showButton && (
                  <>
                    <div className="control-group">
                      <label htmlFor="buttonText">Button Text</label>
                      <input
                        type="text"
                        id="buttonText"
                        value={settings.buttonText}
                        onChange={(e) => setSettings({...settings, buttonText: e.target.value})}
                        placeholder="Shop Now"
                      />
                    </div>

                    <div className="control-group">
                      <label htmlFor="buttonUrl">Button URL</label>
                      <input
                        type="text"
                        id="buttonUrl"
                        value={settings.buttonUrl}
                        onChange={(e) => setSettings({...settings, buttonUrl: e.target.value})}
                        placeholder="https://example.com"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="content-section">
                <h3 className="section-title">Behavior</h3>
                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.showCloseButton}
                      onChange={(e) => setSettings({...settings, showCloseButton: e.target.checked})}
                    />
                    <span>Show Close Button</span>
                  </label>
                </div>

                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.closeable}
                      onChange={(e) => setSettings({...settings, closeable: e.target.checked})}
                    />
                    <span>Remember When Dismissed</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'style' && (
            <div className="tab-pane active">
              <div className="content-section">
                <h3 className="section-title">Position & Layout</h3>
                <div className="control-group">
                  <label htmlFor="position">Position</label>
                  <select
                    id="position"
                    value={settings.position}
                    onChange={(e) => setSettings({...settings, position: e.target.value as 'top' | 'bottom'})}
                  >
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                  </select>
                </div>

                <div className="control-group">
                  <label htmlFor="animation">Animation</label>
                  <select
                    id="animation"
                    value={settings.animation}
                    onChange={(e) => setSettings({...settings, animation: e.target.value as 'none' | 'slide' | 'fade'})}
                  >
                    <option value="none">None</option>
                    <option value="slide">Slide</option>
                    <option value="fade">Fade</option>
                  </select>
                </div>

                <div className="control-group">
                  <label htmlFor="fontSize">
                    <span className="control-label-text">Font Size</span>
                    <span className="control-value">{settings.fontSize}px</span>
                  </label>
                  <input
                    type="range"
                    id="fontSize"
                    min="12"
                    max="24"
                    value={settings.fontSize}
                    onChange={(e) => setSettings({...settings, fontSize: parseInt(e.target.value)})}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="padding">
                    <span className="control-label-text">Padding</span>
                    <span className="control-value">{settings.padding}px</span>
                  </label>
                  <input
                    type="range"
                    id="padding"
                    min="8"
                    max="30"
                    value={settings.padding}
                    onChange={(e) => setSettings({...settings, padding: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">Bar Colors</h3>
                <div className="control-group">
                  <label htmlFor="bgColor">Background Color</label>
                  <input
                    type="color"
                    id="bgColor"
                    value={settings.bgColor}
                    onChange={(e) => setSettings({...settings, bgColor: e.target.value})}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="textColor">Text Color</label>
                  <input
                    type="color"
                    id="textColor"
                    value={settings.textColor}
                    onChange={(e) => setSettings({...settings, textColor: e.target.value})}
                  />
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">Button Colors</h3>
                <div className="control-group">
                  <label htmlFor="buttonBgColor">Button Background</label>
                  <input
                    type="color"
                    id="buttonBgColor"
                    value={settings.buttonBgColor}
                    onChange={(e) => setSettings({...settings, buttonBgColor: e.target.value})}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="buttonTextColor">Button Text Color</label>
                  <input
                    type="color"
                    id="buttonTextColor"
                    value={settings.buttonTextColor}
                    onChange={(e) => setSettings({...settings, buttonTextColor: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="main-content">
        <div className="preview-area">
          <div className="preview-container">
            <div className="preview-info">
              <h2>Live Preview</h2>
              <p>Position: <strong>{settings.position === 'top' ? 'Top' : 'Bottom'}</strong></p>
              {!isVisible && (
                <button className="show-bar-btn" onClick={() => setIsVisible(true)}>
                  Show Announcement Bar
                </button>
              )}
            </div>

            <div className="preview-frame">
              {isVisible && (
                <div
                  className={`announcement-bar-preview ${settings.position}`}
                  style={{
                    background: settings.bgColor,
                    color: settings.textColor,
                    fontSize: `${settings.fontSize}px`,
                    padding: `${settings.padding}px 20px`
                  }}
                >
                  <div className="bar-content">
                    <span>{settings.message}</span>
                    {settings.showButton && (
                      <a
                        href={settings.buttonUrl}
                        className="bar-button"
                        style={{
                          background: settings.buttonBgColor,
                          color: settings.buttonTextColor
                        }}
                        onClick={(e) => e.preventDefault()}
                      >
                        {settings.buttonText}
                      </a>
                    )}
                  </div>
                  {settings.showCloseButton && (
                    <button
                      className="close-button"
                      onClick={() => setIsVisible(false)}
                      style={{ color: settings.textColor }}
                    >
                      ×
                    </button>
                  )}
                </div>
              )}

              <div className="preview-page-content">
                <h1>Your Website Content</h1>
                <p>This is how your announcement bar will appear on your website.</p>
                <p>The announcement bar is {settings.position === 'top' ? 'above' : 'below'} this content.</p>
              </div>
            </div>
          </div>

          <div className="export-section">
            <h2>Embed Code</h2>
            <p>Copy and paste this code into your website's HTML, preferably right after the opening &lt;body&gt; tag.</p>
            <div className="code-box">{generateEmbedCode()}</div>
            <button className="copy-btn" onClick={copyEmbedCode}>Copy to Clipboard</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBarPage;
