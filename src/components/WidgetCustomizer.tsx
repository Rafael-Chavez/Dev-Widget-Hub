import React, { useState } from 'react';
import { Widget, CustomizationOption, CreatedWidget } from '../types';

interface WidgetCustomizerProps {
  widget: Widget;
  onClose: () => void;
  onSave: (customizedWidget: CreatedWidget) => void;
}

const WidgetCustomizer: React.FC<WidgetCustomizerProps> = ({
  widget,
  onClose,
  onSave,
}) => {
  const [settings, setSettings] = useState<Record<string, any>>(() => {
    const initialSettings: Record<string, any> = {};
    widget.customizationOptions?.forEach((option) => {
      initialSettings[option.id] = option.defaultValue;
    });
    return initialSettings;
  });

  const [widgetName, setWidgetName] = useState(`My ${widget.name}`);

  const handleSettingChange = (optionId: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [optionId]: value,
    }));
  };

  const generateEmbedCode = () => {
    const embedCode = `<!-- ${widgetName} -->
<div id="widget-${Date.now()}" class="widget-container">
  ${generateWidgetHTML()}
</div>
<style>
  ${generateWidgetCSS()}
</style>
<script>
  ${generateWidgetJS()}
</script>`;
    return embedCode;
  };

  const generateWidgetHTML = () => {
    switch (widget.id) {
      case 'logo-ticker':
        return `<div id="logo-ticker-container"></div>`;
      case 'instagram-feed':
        return `<div class="instagram-feed" data-username="${settings.username}" data-columns="${settings.columns}"></div>`;
      case 'countdown-timer':
        return `<div class="countdown-timer" data-end-date="${settings.endDate}">
          <h3>${settings.title}</h3>
          <div class="timer-display"></div>
        </div>`;
      case 'whatsapp-chat':
        return `<div class="whatsapp-chat" data-position="${settings.position}">
          <a href="https://wa.me/${settings.phoneNumber}?text=${encodeURIComponent(settings.message)}"
             class="whatsapp-button" target="_blank">
            💚 Chat with us
          </a>
        </div>`;
      case 'popup-notification':
        return `<div id="popup-notification" class="popup-notification"
          data-delay="${settings.delay}"
          data-position="${settings.position}"
          data-auto-close="${settings.autoClose}"
          data-show-close="${settings.showCloseButton}">
          <div class="popup-content">
            <div class="popup-header">
              <h3 class="popup-title">${settings.title}</h3>
              ${settings.showCloseButton ? '<button class="popup-close" onclick="closePopup()">&times;</button>' : ''}
            </div>
            <div class="popup-body">
              <p class="popup-message">${settings.message}</p>
              <a href="${settings.buttonUrl}" class="popup-button" onclick="closePopup()">${settings.buttonText}</a>
            </div>
          </div>
        </div>`;
      default:
        return `<div class="${widget.id}-widget">${widget.name} Widget</div>`;
    }
  };

  const generateWidgetCSS = () => {
    const baseCSS = `.widget-container { margin: 20px 0; }`;

    switch (widget.id) {
      case 'logo-ticker':
        return `${baseCSS}
          #logo-ticker-container { width: 100%; }`;
      case 'instagram-feed':
        return `${baseCSS}
          .instagram-feed { display: grid; grid-template-columns: repeat(${settings.columns}, 1fr); gap: 10px; }`;
      case 'countdown-timer':
        return `${baseCSS}
          .countdown-timer { text-align: center; padding: 20px; border: 2px solid #ddd; border-radius: 10px; }
          .timer-display { font-size: 24px; font-weight: bold; color: #e74c3c; }`;
      case 'whatsapp-chat':
        return `${baseCSS}
          .whatsapp-chat { position: fixed; ${settings.position.includes('bottom') ? 'bottom: 20px' : 'top: 20px'}; ${settings.position.includes('right') ? 'right: 20px' : 'left: 20px'}; z-index: 1000; }
          .whatsapp-button { background: #25d366; color: white; padding: 12px 20px; border-radius: 25px; text-decoration: none; }`;
      case 'popup-notification':
        return `${baseCSS}
          .popup-notification {
            display: none;
            position: fixed;
            ${settings.position === 'center' ? 'top: 50%; left: 50%; transform: translate(-50%, -50%);' :
              settings.position === 'top' ? 'top: 20px; left: 50%; transform: translateX(-50%);' :
              'bottom: 20px; left: 50%; transform: translateX(-50%);'}
            z-index: 10000;
            background: rgba(0, 0, 0, 0.8);
            ${settings.position === 'center' ? 'width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;' : ''}
          }
          .popup-notification.show { display: ${settings.position === 'center' ? 'flex' : 'block'}; }
          .popup-content {
            background: ${settings.backgroundColor};
            color: ${settings.textColor};
            padding: 24px;
            border-radius: 12px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: popupSlideIn 0.3s ease-out;
          }
          .popup-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
          .popup-title { margin: 0; font-size: 20px; font-weight: bold; }
          .popup-close { background: none; border: none; color: ${settings.textColor}; font-size: 24px; cursor: pointer; padding: 0; width: 24px; height: 24px; }
          .popup-message { margin: 0 0 20px 0; line-height: 1.5; }
          .popup-button {
            display: inline-block;
            background: rgba(255, 255, 255, 0.2);
            color: ${settings.textColor};
            padding: 12px 24px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: bold;
            transition: background-color 0.2s;
          }
          .popup-button:hover { background: rgba(255, 255, 255, 0.3); }
          @keyframes popupSlideIn {
            from { opacity: 0; transform: ${settings.position === 'center' ? 'translate(-50%, -50%) scale(0.8)' : settings.position === 'top' ? 'translateX(-50%) translateY(-20px)' : 'translateX(-50%) translateY(20px)'}; }
            to { opacity: 1; transform: ${settings.position === 'center' ? 'translate(-50%, -50%) scale(1)' : 'translateX(-50%) translateY(0)'}; }
          }`;
      default:
        return baseCSS;
    }
  };

  const generateWidgetJS = () => {
    switch (widget.id) {
      case 'logo-ticker':
        const logoUrls = settings.logos ? settings.logos.split('\n').filter((url: string) => url.trim()) : [];
        const background = settings.bgType === 'gradient'
          ? `linear-gradient(${settings.gradientDirection}deg, ${settings.gradientColor1}, ${settings.gradientColor2})`
          : settings.bgColor;

        return `
          (function() {
            const config = {
              logos: ${JSON.stringify(logoUrls)},
              speed: ${settings.speed},
              logoSize: ${settings.logoSize},
              logoSizeMobile: ${settings.logoSizeMobile},
              spacing: ${settings.spacing},
              spacingMobile: ${settings.spacingMobile},
              background: '${background.replace(/'/g, "\\'")}',
              cornerRadius: ${settings.cornerRadius}
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
          })();
        `;
      case 'countdown-timer':
        return `
          const timer = document.querySelector('.timer-display');
          const endDate = new Date('${settings.endDate}').getTime();

          function updateTimer() {
            const now = new Date().getTime();
            const distance = endDate - now;

            if (distance < 0) {
              timer.innerHTML = "EXPIRED";
              return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            timer.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
          }

          updateTimer();
          setInterval(updateTimer, 1000);
        `;
      case 'popup-notification':
        return `
          const popup = document.getElementById('popup-notification');
          const delay = parseInt(popup.dataset.delay) * 1000;
          const autoClose = parseInt(popup.dataset.autoClose) * 1000;

          function showPopup() {
            popup.classList.add('show');

            if (autoClose > 0) {
              setTimeout(closePopup, autoClose);
            }
          }

          function closePopup() {
            popup.classList.remove('show');
          }

          // Show popup after delay
          setTimeout(showPopup, delay);

          // Close popup when clicking outside (for center position)
          if (popup.dataset.position === 'center') {
            popup.addEventListener('click', function(e) {
              if (e.target === popup) {
                closePopup();
              }
            });
          }

          // Global function for close button
          window.closePopup = closePopup;
        `;
      default:
        return '// Widget JavaScript';
    }
  };

  const handleSave = () => {
    const customizedWidget: CreatedWidget = {
      id: Date.now().toString(),
      widgetId: widget.id,
      name: widgetName,
      settings,
      embedCode: generateEmbedCode(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(customizedWidget);
  };

  const renderFormField = (option: CustomizationOption) => {
    const value = settings[option.id];

    switch (option.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handleSettingChange(option.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder={option.description}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => handleSettingChange(option.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows={3}
            placeholder={option.description}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => handleSettingChange(option.id, parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        );

      case 'color':
        return (
          <input
            type="color"
            value={value || '#3b82f6'}
            onChange={(e) => handleSettingChange(option.id, e.target.value)}
            className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        );

      case 'boolean':
        return (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => handleSettingChange(option.id, e.target.checked)}
              className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-600">Enable</span>
          </label>
        );

      case 'select':
        return (
          <select
            value={value || option.defaultValue}
            onChange={(e) => handleSettingChange(option.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {option.options?.map((optionValue) => (
              <option key={optionValue} value={optionValue}>
                {optionValue.charAt(0).toUpperCase() + optionValue.slice(1)}
              </option>
            ))}
          </select>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex">
          {/* Customization Panel */}
          <div className="w-1/2 p-6 border-r border-gray-200 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Customize Widget</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Widget Name
              </label>
              <input
                type="text"
                value={widgetName}
                onChange={(e) => setWidgetName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="space-y-6">
              {widget.customizationOptions?.map((option) => (
                <div key={option.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {option.name}
                  </label>
                  {renderFormField(option)}
                  {option.description && (
                    <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 flex space-x-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Generate Embed Code
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="w-1/2 p-6 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
            <div className="bg-white p-4 rounded-lg border border-gray-200 min-h-[300px]">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">{widget.icon}</span>
                <div>
                  <h4 className="font-semibold text-gray-900">{widget.name}</h4>
                  <p className="text-sm text-gray-600">{widget.description}</p>
                </div>
              </div>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500"
                dangerouslySetInnerHTML={{ __html: generateWidgetHTML() }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetCustomizer;