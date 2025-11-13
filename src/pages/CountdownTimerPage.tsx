import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CountdownTimerPage.css';

interface Settings {
  title: string;
  targetDate: string;
  targetTime: string;
  showDays: boolean;
  showHours: boolean;
  showMinutes: boolean;
  showSeconds: boolean;
  layout: 'horizontal' | 'vertical' | 'grid';
  style: 'modern' | 'classic' | 'minimal' | 'neon';
  bgColor: string;
  textColor: string;
  accentColor: string;
  numberSize: number;
  labelSize: number;
  showLabels: boolean;
  completionMessage: string;
  autoHide: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimerPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'content' | 'style'>('content');

  const [settings, setSettings] = useState<Settings>({
    title: 'Special Launch Event',
    targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    targetTime: '12:00',
    showDays: true,
    showHours: true,
    showMinutes: true,
    showSeconds: true,
    layout: 'horizontal',
    style: 'modern',
    bgColor: '#1a1a2e',
    textColor: '#ffffff',
    accentColor: '#ff6b6b',
    numberSize: 48,
    labelSize: 14,
    showLabels: true,
    completionMessage: '🎉 Event Has Started!',
    autoHide: false
  });

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(`${settings.targetDate}T${settings.targetTime}`).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setIsExpired(false);
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [settings.targetDate, settings.targetTime]);

  const generateEmbedCode = (): string => {
    const scriptContent = `(function() {
    const config = {
        title: '${settings.title.replace(/'/g, "\\'")}',
        targetDate: '${settings.targetDate}',
        targetTime: '${settings.targetTime}',
        showDays: ${settings.showDays},
        showHours: ${settings.showHours},
        showMinutes: ${settings.showMinutes},
        showSeconds: ${settings.showSeconds},
        layout: '${settings.layout}',
        style: '${settings.style}',
        bgColor: '${settings.bgColor}',
        textColor: '${settings.textColor}',
        accentColor: '${settings.accentColor}',
        numberSize: ${settings.numberSize},
        labelSize: ${settings.labelSize},
        showLabels: ${settings.showLabels},
        completionMessage: '${settings.completionMessage.replace(/'/g, "\\'")}',
        autoHide: ${settings.autoHide}
    };

    const container = document.getElementById('countdown-timer-container');
    const widget = document.createElement('div');

    const styles = {
        modern: 'background: linear-gradient(135deg, ' + config.bgColor + ' 0%, #16213e 100%); padding: 40px; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);',
        classic: 'background: ' + config.bgColor + '; padding: 30px; border: 3px solid ' + config.accentColor + '; border-radius: 10px;',
        minimal: 'background: transparent; padding: 20px;',
        neon: 'background: #000; padding: 40px; border-radius: 20px; box-shadow: 0 0 30px ' + config.accentColor + ', inset 0 0 30px rgba(0,0,0,0.5);'
    };

    widget.style.cssText = 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; text-align: center; color: ' + config.textColor + '; ' + styles[config.style];

    if (config.title) {
        const title = document.createElement('h2');
        title.textContent = config.title;
        title.style.cssText = 'margin: 0 0 30px; font-size: 32px; font-weight: 700; color: ' + config.textColor + ';';
        widget.appendChild(title);
    }

    const timerContainer = document.createElement('div');
    const layoutStyles = {
        horizontal: 'display: flex; justify-content: center; align-items: center; gap: 20px; flex-wrap: wrap;',
        vertical: 'display: flex; flex-direction: column; align-items: center; gap: 20px;',
        grid: 'display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 20px; max-width: 600px; margin: 0 auto;'
    };
    timerContainer.style.cssText = layoutStyles[config.layout];

    const completionDiv = document.createElement('div');
    completionDiv.style.cssText = 'font-size: 36px; font-weight: 700; color: ' + config.accentColor + '; display: none;';
    completionDiv.textContent = config.completionMessage;

    function updateCountdown() {
        const target = new Date(config.targetDate + 'T' + config.targetTime).getTime();
        const now = new Date().getTime();
        const difference = target - now;

        if (difference <= 0) {
            timerContainer.style.display = 'none';
            completionDiv.style.display = 'block';
            if (config.autoHide) {
                widget.style.display = 'none';
            }
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        const units = [
            { value: days, label: 'Days', show: config.showDays },
            { value: hours, label: 'Hours', show: config.showHours },
            { value: minutes, label: 'Minutes', show: config.showMinutes },
            { value: seconds, label: 'Seconds', show: config.showSeconds }
        ];

        timerContainer.innerHTML = '';
        units.forEach(unit => {
            if (!unit.show) return;

            const unitDiv = document.createElement('div');
            unitDiv.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 8px;';

            const numberDiv = document.createElement('div');
            const numberStyles = config.style === 'neon'
                ? 'background: transparent; color: ' + config.accentColor + '; border: 2px solid ' + config.accentColor + '; box-shadow: 0 0 20px ' + config.accentColor + ', inset 0 0 20px rgba(0,0,0,0.5);'
                : 'background: ' + config.accentColor + '; color: white; box-shadow: 0 4px 15px rgba(0,0,0,0.2);';

            numberDiv.style.cssText = numberStyles + ' font-size: ' + config.numberSize + 'px; font-weight: 700; padding: 20px; border-radius: 12px; min-width: 100px; display: flex; align-items: center; justify-content: center;';
            numberDiv.textContent = String(unit.value).padStart(2, '0');

            unitDiv.appendChild(numberDiv);

            if (config.showLabels) {
                const labelDiv = document.createElement('div');
                labelDiv.textContent = unit.label;
                labelDiv.style.cssText = 'font-size: ' + config.labelSize + 'px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px; opacity: 0.8;';
                unitDiv.appendChild(labelDiv);
            }

            timerContainer.appendChild(unitDiv);
        });
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    widget.appendChild(timerContainer);
    widget.appendChild(completionDiv);
    container.appendChild(widget);

    // Add responsive styles
    if (!document.getElementById('countdown-timer-styles')) {
        const style = document.createElement('style');
        style.id = 'countdown-timer-styles';
        style.textContent = '@media (max-width: 768px) { #countdown-timer-container > div { padding: 20px !important; } #countdown-timer-container > div > div > div > div { min-width: 70px !important; font-size: 32px !important; padding: 12px !important; } }';
        document.head.appendChild(style);
    }
})();`;

    return '<!-- Countdown Timer Widget -->\n<div id="countdown-timer-container"></div>\n<script>\n' + scriptContent + '\n</script>';
  };

  const copyEmbedCode = () => {
    const code = generateEmbedCode();
    navigator.clipboard.writeText(code).then(() => {
      alert('Embed code copied to clipboard!');
    });
  };

  return (
    <div className="countdown-timer-page">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>Countdown Timer +</h1>
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
                <h3 className="section-title">Timer Title</h3>
                <div className="control-group">
                  <label htmlFor="title">Title (optional)</label>
                  <input
                    type="text"
                    id="title"
                    value={settings.title}
                    onChange={(e) => setSettings({...settings, title: e.target.value})}
                    placeholder="Special Launch Event"
                  />
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">Target Date & Time</h3>
                <div className="control-group">
                  <label htmlFor="targetDate">Target Date</label>
                  <input
                    type="date"
                    id="targetDate"
                    value={settings.targetDate}
                    onChange={(e) => setSettings({...settings, targetDate: e.target.value})}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="targetTime">Target Time</label>
                  <input
                    type="time"
                    id="targetTime"
                    value={settings.targetTime}
                    onChange={(e) => setSettings({...settings, targetTime: e.target.value})}
                  />
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">Display Units</h3>
                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.showDays}
                      onChange={(e) => setSettings({...settings, showDays: e.target.checked})}
                    />
                    <span>Show Days</span>
                  </label>
                </div>

                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.showHours}
                      onChange={(e) => setSettings({...settings, showHours: e.target.checked})}
                    />
                    <span>Show Hours</span>
                  </label>
                </div>

                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.showMinutes}
                      onChange={(e) => setSettings({...settings, showMinutes: e.target.checked})}
                    />
                    <span>Show Minutes</span>
                  </label>
                </div>

                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.showSeconds}
                      onChange={(e) => setSettings({...settings, showSeconds: e.target.checked})}
                    />
                    <span>Show Seconds</span>
                  </label>
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">Completion Settings</h3>
                <div className="control-group">
                  <label htmlFor="completionMessage">Completion Message</label>
                  <input
                    type="text"
                    id="completionMessage"
                    value={settings.completionMessage}
                    onChange={(e) => setSettings({...settings, completionMessage: e.target.value})}
                    placeholder="🎉 Event Has Started!"
                  />
                </div>

                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.autoHide}
                      onChange={(e) => setSettings({...settings, autoHide: e.target.checked})}
                    />
                    <span>Auto-hide After Completion</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'style' && (
            <div className="tab-pane active">
              <div className="content-section">
                <h3 className="section-title">Layout & Style</h3>
                <div className="control-group">
                  <label htmlFor="layout">Layout</label>
                  <select
                    id="layout"
                    value={settings.layout}
                    onChange={(e) => setSettings({...settings, layout: e.target.value as 'horizontal' | 'vertical' | 'grid'})}
                  >
                    <option value="horizontal">Horizontal</option>
                    <option value="vertical">Vertical</option>
                    <option value="grid">Grid</option>
                  </select>
                </div>

                <div className="control-group">
                  <label htmlFor="style">Visual Style</label>
                  <select
                    id="style"
                    value={settings.style}
                    onChange={(e) => setSettings({...settings, style: e.target.value as 'modern' | 'classic' | 'minimal' | 'neon'})}
                  >
                    <option value="modern">Modern</option>
                    <option value="classic">Classic</option>
                    <option value="minimal">Minimal</option>
                    <option value="neon">Neon</option>
                  </select>
                </div>

                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.showLabels}
                      onChange={(e) => setSettings({...settings, showLabels: e.target.checked})}
                    />
                    <span>Show Unit Labels</span>
                  </label>
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">Font Sizes</h3>
                <div className="control-group">
                  <label htmlFor="numberSize">
                    <span className="control-label-text">Number Size</span>
                    <span className="control-value">{settings.numberSize}px</span>
                  </label>
                  <input
                    type="range"
                    id="numberSize"
                    min="24"
                    max="72"
                    value={settings.numberSize}
                    onChange={(e) => setSettings({...settings, numberSize: parseInt(e.target.value)})}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="labelSize">
                    <span className="control-label-text">Label Size</span>
                    <span className="control-value">{settings.labelSize}px</span>
                  </label>
                  <input
                    type="range"
                    id="labelSize"
                    min="10"
                    max="24"
                    value={settings.labelSize}
                    onChange={(e) => setSettings({...settings, labelSize: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">Colors</h3>
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

                <div className="control-group">
                  <label htmlFor="accentColor">Accent Color</label>
                  <input
                    type="color"
                    id="accentColor"
                    value={settings.accentColor}
                    onChange={(e) => setSettings({...settings, accentColor: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="main-content">
        <div className="preview-area">
          <div className={`countdown-preview style-${settings.style}`} style={{ background: settings.bgColor, color: settings.textColor }}>
            {settings.title && <h2 style={{ color: settings.textColor }}>{settings.title}</h2>}

            {!isExpired ? (
              <div className={`timer-display layout-${settings.layout}`}>
                {settings.showDays && (
                  <div className="timer-unit">
                    <div className="timer-number" style={{
                      background: settings.style === 'neon' ? 'transparent' : settings.accentColor,
                      color: settings.style === 'neon' ? settings.accentColor : 'white',
                      border: settings.style === 'neon' ? `2px solid ${settings.accentColor}` : 'none',
                      boxShadow: settings.style === 'neon' ? `0 0 20px ${settings.accentColor}` : '0 4px 15px rgba(0,0,0,0.2)',
                      fontSize: `${settings.numberSize}px`
                    }}>
                      {String(timeLeft.days).padStart(2, '0')}
                    </div>
                    {settings.showLabels && <div className="timer-label" style={{ fontSize: `${settings.labelSize}px` }}>Days</div>}
                  </div>
                )}
                {settings.showHours && (
                  <div className="timer-unit">
                    <div className="timer-number" style={{
                      background: settings.style === 'neon' ? 'transparent' : settings.accentColor,
                      color: settings.style === 'neon' ? settings.accentColor : 'white',
                      border: settings.style === 'neon' ? `2px solid ${settings.accentColor}` : 'none',
                      boxShadow: settings.style === 'neon' ? `0 0 20px ${settings.accentColor}` : '0 4px 15px rgba(0,0,0,0.2)',
                      fontSize: `${settings.numberSize}px`
                    }}>
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    {settings.showLabels && <div className="timer-label" style={{ fontSize: `${settings.labelSize}px` }}>Hours</div>}
                  </div>
                )}
                {settings.showMinutes && (
                  <div className="timer-unit">
                    <div className="timer-number" style={{
                      background: settings.style === 'neon' ? 'transparent' : settings.accentColor,
                      color: settings.style === 'neon' ? settings.accentColor : 'white',
                      border: settings.style === 'neon' ? `2px solid ${settings.accentColor}` : 'none',
                      boxShadow: settings.style === 'neon' ? `0 0 20px ${settings.accentColor}` : '0 4px 15px rgba(0,0,0,0.2)',
                      fontSize: `${settings.numberSize}px`
                    }}>
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    {settings.showLabels && <div className="timer-label" style={{ fontSize: `${settings.labelSize}px` }}>Minutes</div>}
                  </div>
                )}
                {settings.showSeconds && (
                  <div className="timer-unit">
                    <div className="timer-number" style={{
                      background: settings.style === 'neon' ? 'transparent' : settings.accentColor,
                      color: settings.style === 'neon' ? settings.accentColor : 'white',
                      border: settings.style === 'neon' ? `2px solid ${settings.accentColor}` : 'none',
                      boxShadow: settings.style === 'neon' ? `0 0 20px ${settings.accentColor}` : '0 4px 15px rgba(0,0,0,0.2)',
                      fontSize: `${settings.numberSize}px`
                    }}>
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    {settings.showLabels && <div className="timer-label" style={{ fontSize: `${settings.labelSize}px` }}>Seconds</div>}
                  </div>
                )}
              </div>
            ) : (
              <div className="completion-message" style={{ color: settings.accentColor }}>
                {settings.completionMessage}
              </div>
            )}
          </div>

          <div className="export-section">
            <h2>Embed Code</h2>
            <p>Copy and paste this code into your website to display your countdown timer.</p>
            <div className="code-box">{generateEmbedCode()}</div>
            <button className="copy-btn" onClick={copyEmbedCode}>Copy to Clipboard</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimerPage;
