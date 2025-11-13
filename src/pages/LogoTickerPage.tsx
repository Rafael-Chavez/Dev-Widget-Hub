import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoTickerPage.css';

interface Logo {
  id: string;
  url: string;
}

interface Settings {
  speed: number;
  logoSize: number;
  spacing: number;
  logoSizeMobile: number;
  spacingMobile: number;
  bgColor: string;
  bgType: 'solid' | 'gradient';
  gradientColor1: string;
  gradientColor2: string;
  gradientDirection: number;
  cornerStyle: string;
  cornerRadius: number;
}

const LogoTickerPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'content' | 'layout' | 'style'>('content');
  const [logos, setLogos] = useState<Logo[]>([]);
  const [settings, setSettings] = useState<Settings>({
    speed: 20,
    logoSize: 60,
    spacing: 60,
    logoSizeMobile: 40,
    spacingMobile: 40,
    bgColor: '#ffffff',
    bgType: 'solid',
    gradientColor1: '#3498db',
    gradientColor2: '#9b59b6',
    gradientDirection: 90,
    cornerStyle: '0',
    cornerRadius: 0
  });

  const gradientPresets = [
    { angle: 248, color1: '#3d48e4', color2: '#ee4975' },
    { angle: 248, color1: '#ff4f4f', color2: '#cb6cff' },
    { angle: 248, color1: '#ffb100', color2: '#ffef91' },
    { angle: 248, color1: '#198a3f', color2: '#669945' },
    { angle: 292, color1: '#526ecb', color2: '#32418d' },
    { angle: 248, color1: '#08747f', color2: '#27a590' },
    { angle: 248, color1: '#2bb1b2', color2: '#2553b3' },
    { angle: 248, color1: '#d9354d', color2: '#d99717' },
    { angle: 248, color1: '#f7f9fc', color2: '#e4e5ea' },
    { angle: 248, color1: '#707b8c', color2: '#4e5565' },
    { angle: 248, color1: '#52545a', color2: '#111111' }
  ];

  useEffect(() => {
    // Load default logos
    const defaultLogos: Logo[] = [
      { id: '1', url: createPlaceholderLogo('LOGO 1', '#3498db') },
      { id: '2', url: createPlaceholderLogo('LOGO 2', '#e74c3c') },
      { id: '3', url: createPlaceholderLogo('LOGO 3', '#2ecc71') },
      { id: '4', url: createPlaceholderLogo('LOGO 4', '#f39c12') },
      { id: '5', url: createPlaceholderLogo('LOGO 5', '#9b59b6') },
      { id: '6', url: createPlaceholderLogo('LOGO 6', '#1abc9c') }
    ];
    setLogos(defaultLogos);
  }, []);

  const createPlaceholderLogo = (text: string, color: string): string => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 80;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 200, 80);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 100, 40);

    return canvas.toDataURL();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newLogo: Logo = {
            id: Date.now().toString() + Math.random(),
            url: event.target?.result as string
          };
          setLogos(prev => [...prev, newLogo]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeLogo = (id: string) => {
    setLogos(prev => prev.filter(logo => logo.id !== id));
  };

  const resetToDefaults = () => {
    if (window.confirm('Reset to default logos and settings?')) {
      const defaultLogos: Logo[] = [
        { id: '1', url: createPlaceholderLogo('LOGO 1', '#3498db') },
        { id: '2', url: createPlaceholderLogo('LOGO 2', '#e74c3c') },
        { id: '3', url: createPlaceholderLogo('LOGO 3', '#2ecc71') },
        { id: '4', url: createPlaceholderLogo('LOGO 4', '#f39c12') },
        { id: '5', url: createPlaceholderLogo('LOGO 5', '#9b59b6') },
        { id: '6', url: createPlaceholderLogo('LOGO 6', '#1abc9c') }
      ];
      setLogos(defaultLogos);
      setSettings({
        speed: 20,
        logoSize: 60,
        spacing: 60,
        logoSizeMobile: 40,
        spacingMobile: 40,
        bgColor: '#ffffff',
        bgType: 'solid',
        gradientColor1: '#3498db',
        gradientColor2: '#9b59b6',
        gradientDirection: 90,
        cornerStyle: '0',
        cornerRadius: 0
      });
    }
  };

  const generateEmbedCode = (): string => {
    const cornerRadius = settings.cornerStyle === 'custom' ? settings.cornerRadius : settings.cornerStyle;
    const logoUrls = logos.map(logo => logo.url);
    const background = settings.bgType === 'gradient'
      ? `linear-gradient(${settings.gradientDirection}deg, ${settings.gradientColor1}, ${settings.gradientColor2})`
      : settings.bgColor;

    const scriptContent = `(function() {
    const config = {
        logos: ${JSON.stringify(logoUrls)},
        speed: ${settings.speed},
        logoSize: ${settings.logoSize},
        logoSizeMobile: ${settings.logoSizeMobile},
        spacing: ${settings.spacing},
        spacingMobile: ${settings.spacingMobile},
        background: '${background.replace(/'/g, "\\'")}',
        cornerRadius: ${cornerRadius}
    };

    const container = document.getElementById('logo-ticker-container');
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'background: ' + config.background + '; border-radius: ' + config.cornerRadius + 'px; overflow: hidden; position: relative; width: 100%;';

    const track = document.createElement('div');
    track.style.cssText = 'display: flex; width: max-content; animation: ticker-scroll ' + config.speed + 's linear infinite; padding: 40px 0;';

    const logos = [...config.logos, ...config.logos];
    logos.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Logo';
        img.style.cssText = 'height: ' + config.logoSize + 'px; width: auto; object-fit: contain; margin-right: ' + config.spacing + 'px; filter: grayscale(100%); opacity: 0.7; transition: all 0.3s;';
        img.onmouseenter = function() {
            this.style.filter = 'grayscale(0%)';
            this.style.opacity = '1';
            this.style.transform = 'scale(1.1)';
        };
        img.onmouseleave = function() {
            this.style.filter = 'grayscale(100%)';
            this.style.opacity = '0.7';
            this.style.transform = 'scale(1)';
        };
        track.appendChild(img);
    });

    track.onmouseenter = function() { this.style.animationPlayState = 'paused'; };
    track.onmouseleave = function() { this.style.animationPlayState = 'running'; };

    wrapper.appendChild(track);
    container.appendChild(wrapper);

    if (!document.getElementById('logo-ticker-styles')) {
        const style = document.createElement('style');
        style.id = 'logo-ticker-styles';
        style.textContent = '@keyframes ticker-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } @media (max-width: 768px) { #logo-ticker-container img { height: ' + config.logoSizeMobile + 'px !important; margin-right: ' + config.spacingMobile + 'px !important; } }';
        document.head.appendChild(style);
    }
})();`;

    return '<!-- Logo Ticker Widget -->\n<div id="logo-ticker-container"></div>\n<script>\n' + scriptContent + '\n</script>';
  };

  const copyEmbedCode = () => {
    const code = generateEmbedCode();
    navigator.clipboard.writeText(code).then(() => {
      alert('Embed code copied to clipboard!');
    });
  };

  const getBackground = () => {
    if (settings.bgType === 'gradient') {
      return `linear-gradient(${settings.gradientDirection}deg, ${settings.gradientColor1}, ${settings.gradientColor2})`;
    }
    return settings.bgColor;
  };

  const getBorderRadius = () => {
    if (settings.cornerStyle === 'custom') {
      return settings.cornerRadius + 'px';
    }
    return settings.cornerStyle + 'px';
  };

  return (
    <div className="logo-ticker-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>Logo Ticker</h1>
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
            className={`tab-nav-btn ${activeTab === 'layout' ? 'active' : ''}`}
            onClick={() => setActiveTab('layout')}
          >
            Layout
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
              <button className="add-logo-btn" onClick={() => document.getElementById('fileInput')?.click()}>
                <span>+ Add Logo</span>
              </button>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                multiple
                style={{display: 'none'}}
                onChange={handleFileUpload}
              />

              <div className="content-section">
                <h3 className="section-title">Your Logos</h3>
                <div className="logo-grid">
                  {logos.length === 0 ? (
                    <div className="empty-state"><p>No logos added yet</p></div>
                  ) : (
                    logos.map(logo => (
                      <div key={logo.id} className="logo-grid-item">
                        <img src={logo.url} alt="Logo" />
                        <button className="remove-logo" onClick={() => removeLogo(logo.id)}>×</button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <button className="reset-btn" onClick={resetToDefaults}>Reset to Default</button>
            </div>
          )}

          {activeTab === 'layout' && (
            <div className="tab-pane active">
              <div className="content-section">
                <h3 className="section-title">Animation</h3>
                <div className="control-group">
                  <label htmlFor="speed">
                    <span className="control-label-text">Transition Speed</span>
                    <span className="control-value">{settings.speed}s</span>
                  </label>
                  <input
                    type="range"
                    id="speed"
                    min="5"
                    max="60"
                    value={settings.speed}
                    onChange={(e) => setSettings({...settings, speed: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">Logo Size</h3>
                <div className="control-group">
                  <label htmlFor="logoSize">
                    <span className="control-label-text">Desktop Height</span>
                    <span className="control-value">{settings.logoSize}px</span>
                  </label>
                  <input
                    type="range"
                    id="logoSize"
                    min="20"
                    max="200"
                    value={settings.logoSize}
                    onChange={(e) => setSettings({...settings, logoSize: parseInt(e.target.value)})}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="logoSizeMobile">
                    <span className="control-label-text">Mobile Height</span>
                    <span className="control-value">{settings.logoSizeMobile}px</span>
                  </label>
                  <input
                    type="range"
                    id="logoSizeMobile"
                    min="20"
                    max="150"
                    value={settings.logoSizeMobile}
                    onChange={(e) => setSettings({...settings, logoSizeMobile: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">Spacing</h3>
                <div className="control-group">
                  <label htmlFor="spacing">
                    <span className="control-label-text">Desktop Spacing</span>
                    <span className="control-value">{settings.spacing}px</span>
                  </label>
                  <input
                    type="range"
                    id="spacing"
                    min="10"
                    max="200"
                    value={settings.spacing}
                    onChange={(e) => setSettings({...settings, spacing: parseInt(e.target.value)})}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="spacingMobile">
                    <span className="control-label-text">Mobile Spacing</span>
                    <span className="control-value">{settings.spacingMobile}px</span>
                  </label>
                  <input
                    type="range"
                    id="spacingMobile"
                    min="10"
                    max="150"
                    value={settings.spacingMobile}
                    onChange={(e) => setSettings({...settings, spacingMobile: parseInt(e.target.value)})}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'style' && (
            <div className="tab-pane active">
              <div className="content-section">
                <h3 className="section-title">Background</h3>
                <div className="segmented-control">
                  <div className="segmented-option">
                    <input
                      type="radio"
                      id="bgTypeSolid"
                      name="bgType"
                      checked={settings.bgType === 'solid'}
                      onChange={() => setSettings({...settings, bgType: 'solid'})}
                    />
                    <label htmlFor="bgTypeSolid">Color</label>
                  </div>
                  <div className="segmented-option">
                    <input
                      type="radio"
                      id="bgTypeGradient"
                      name="bgType"
                      checked={settings.bgType === 'gradient'}
                      onChange={() => setSettings({...settings, bgType: 'gradient'})}
                    />
                    <label htmlFor="bgTypeGradient">Gradient</label>
                  </div>
                </div>
              </div>

              {settings.bgType === 'solid' ? (
                <div className="content-section">
                  <div className="control-group">
                    <input
                      type="color"
                      id="bgColor"
                      value={settings.bgColor}
                      onChange={(e) => setSettings({...settings, bgColor: e.target.value})}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="content-section">
                    <div className="gradient-presets">
                      {gradientPresets.map((preset, index) => (
                        <div
                          key={index}
                          className="gradient-preset"
                          style={{background: `linear-gradient(${preset.angle}deg, ${preset.color1}, ${preset.color2})`}}
                          onClick={() => setSettings({
                            ...settings,
                            gradientColor1: preset.color1,
                            gradientColor2: preset.color2,
                            gradientDirection: preset.angle
                          })}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="content-section">
                    <div className="control-group">
                      <label>
                        <span className="control-label-text">Colors</span>
                        <div className="color-handler-group">
                          <div className="color-handler" style={{backgroundColor: settings.gradientColor1}}>
                            <input
                              type="color"
                              value={settings.gradientColor1}
                              onChange={(e) => setSettings({...settings, gradientColor1: e.target.value})}
                            />
                          </div>
                          <span className="color-divider">—</span>
                          <div className="color-handler" style={{backgroundColor: settings.gradientColor2}}>
                            <input
                              type="color"
                              value={settings.gradientColor2}
                              onChange={(e) => setSettings({...settings, gradientColor2: e.target.value})}
                            />
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="content-section">
                    <div className="control-group">
                      <label htmlFor="gradientDirection">
                        <span className="control-label-text">Direction</span>
                        <span className="control-value">{settings.gradientDirection}°</span>
                      </label>
                      <input
                        type="range"
                        id="gradientDirection"
                        min="0"
                        max="360"
                        step="15"
                        value={settings.gradientDirection}
                        onChange={(e) => setSettings({...settings, gradientDirection: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="content-section">
                <div className="control-group">
                  <label>
                    <span className="control-label-text">Corner Radius</span>
                    <div className="corner-icons">
                      <div className="corner-icon-option">
                        <input
                          type="radio"
                          id="cornerSquare"
                          name="cornerStyle"
                          checked={settings.cornerStyle === '0'}
                          onChange={() => setSettings({...settings, cornerStyle: '0'})}
                        />
                        <label htmlFor="cornerSquare">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M15.833 4.167V17.5h-1.568V5.735H2.5V4.167z"></path>
                          </svg>
                        </label>
                      </div>
                      <div className="corner-icon-option">
                        <input
                          type="radio"
                          id="cornerRounded"
                          name="cornerStyle"
                          checked={settings.cornerStyle === '8'}
                          onChange={() => setSettings({...settings, cornerStyle: '8'})}
                        />
                        <label htmlFor="cornerRounded">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9.82 4.167a6.013 6.013 0 0 1 6.01 5.839l.003.174v7.32h-1.568v-7.32a4.445 4.445 0 0 0-4.289-4.442l-.156-.003H2.5V4.167h7.32Z"></path>
                          </svg>
                        </label>
                      </div>
                      <div className="corner-icon-option">
                        <input
                          type="radio"
                          id="cornerCircular"
                          name="cornerStyle"
                          checked={settings.cornerStyle === '50'}
                          onChange={() => setSettings({...settings, cornerStyle: '50'})}
                        />
                        <label htmlFor="cornerCircular">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.284 4.167c6.856 0 12.428 5.498 12.547 12.326l.002.223v.784h-1.568v-.784c0-5.994-4.803-10.866-10.77-10.979l-.21-.002H2.5V4.167h.784Z"></path>
                          </svg>
                        </label>
                      </div>
                      <div className="corner-icon-option">
                        <input
                          type="radio"
                          id="cornerCustom"
                          name="cornerStyle"
                          checked={settings.cornerStyle === 'custom'}
                          onChange={() => setSettings({...settings, cornerStyle: 'custom'})}
                        />
                        <label htmlFor="cornerCustom">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.864 8.333a1.363 1.363 0 1 1 0 2.726 1.363 1.363 0 0 1 0-2.726Zm6.136 0a1.363 1.363 0 1 1 .001 2.726A1.363 1.363 0 0 1 10 8.333Zm6.136 0a1.363 1.363 0 1 1 .001 2.726 1.363 1.363 0 0 1 0-2.726Z"></path>
                          </svg>
                        </label>
                      </div>
                    </div>
                  </label>
                </div>

                {settings.cornerStyle === 'custom' && (
                  <div className="corner-custom-slider active">
                    <div className="control-group">
                      <label htmlFor="cornerRadius">
                        <span className="control-label-text">Custom Radius</span>
                        <span className="control-value">{settings.cornerRadius}px</span>
                      </label>
                      <input
                        type="range"
                        id="cornerRadius"
                        min="0"
                        max="100"
                        value={settings.cornerRadius}
                        onChange={(e) => setSettings({...settings, cornerRadius: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="main-content">
        <div className="preview-area">
          <div className="ticker-container">
            <div
              className="ticker-wrapper"
              style={{
                background: getBackground(),
                borderRadius: getBorderRadius()
              }}
            >
              <div
                className="ticker-track"
                style={{
                  animationDuration: `${settings.speed}s`
                }}
              >
                {[...logos, ...logos].map((logo, index) => (
                  <div
                    key={index}
                    className="ticker-item"
                    style={{marginRight: `${settings.spacing}px`}}
                  >
                    <img
                      src={logo.url}
                      alt="Logo"
                      style={{height: `${settings.logoSize}px`}}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="export-section">
            <h2>Embed Code</h2>
            <p>Copy the code below and paste it into your website where you want the logo ticker to appear. It's completely self-contained and ready to use!</p>
            <div className="code-box">{generateEmbedCode()}</div>
            <button className="copy-btn" onClick={copyEmbedCode}>Copy to Clipboard</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoTickerPage;
