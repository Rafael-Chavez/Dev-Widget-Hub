import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmailTemplatesPage.css';

interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  code: string;
  previewImage?: string;
}

interface ColorSettings {
  primaryColor: string;
  primaryLight: string;
  accentColor: string;
  textColor: string;
  lightText: string;
  borderColor: string;
  successColor: string;
  dangerColor: string;
  warningColor: string;
  lightBg: string;
}

const EmailTemplatesPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [colors, setColors] = useState<ColorSettings>({
    primaryColor: '#4F46E5',
    primaryLight: '#EEF2FF',
    accentColor: '#06B6D4',
    textColor: '#1F2937',
    lightText: '#6B7280',
    borderColor: '#E5E7EB',
    successColor: '#10B981',
    dangerColor: '#EF4444',
    warningColor: '#F59E0B',
    lightBg: '#F9FAFB'
  });

  // Production template with CSS variables for customization
  const productionTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Production Ready</title>
  <style>
    :root {
      --primary-color: {{primaryColor}};
      --primary-light: {{primaryLight}};
      --accent-color: {{accentColor}};
      --text-color: {{textColor}};
      --light-text: {{lightText}};
      --border-color: {{borderColor}};
      --success-color: {{successColor}};
      --danger-color: {{dangerColor}};
      --warning-color: {{warningColor}};
      --light-bg: {{lightBg}};
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background-color: var(--primary-color); padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0 0 8px; font-size: 28px; font-weight: 700;">Your Company Name</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 14px;">Production Ready Email Template</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: var(--text-color); margin: 0 0 16px; font-size: 24px; font-weight: 600;">Hello, [Customer Name]</h2>
              <p style="color: var(--light-text); font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                This is a production-ready email template with fully customizable colors. Adjust the color palette in the sidebar to match your brand.
              </p>

              <!-- Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: var(--primary-light); border-left: 4px solid var(--primary-color); border-radius: 6px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="color: var(--text-color); font-size: 14px; line-height: 1.6; margin: 0;">
                      <strong>💡 Pro Tip:</strong> Use this template as a starting point and customize it to match your brand identity.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" style="margin: 0 0 24px;">
                <tr>
                  <td align="center" style="background-color: var(--primary-color); border-radius: 6px; padding: 14px 32px;">
                    <a href="#" style="color: white; text-decoration: none; font-weight: 600; font-size: 16px; display: block;">
                      Get Started
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Stats Section -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid var(--border-color); border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 24px; border-right: 1px solid var(--border-color); text-align: center; width: 50%;">
                    <div style="color: var(--primary-color); font-size: 32px; font-weight: 700; margin-bottom: 8px;">99%</div>
                    <div style="color: var(--light-text); font-size: 14px;">Satisfaction Rate</div>
                  </td>
                  <td style="padding: 24px; text-align: center; width: 50%;">
                    <div style="color: var(--success-color); font-size: 32px; font-weight: 700; margin-bottom: 8px;">24/7</div>
                    <div style="color: var(--light-text); font-size: 14px;">Support Available</div>
                  </td>
                </tr>
              </table>

              <p style="color: var(--light-text); font-size: 14px; line-height: 1.6; margin: 0;">
                Best regards,<br>
                <strong style="color: var(--text-color);">The Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: var(--light-bg); padding: 30px; text-align: center; border-top: 1px solid var(--border-color);">
              <p style="color: var(--light-text); font-size: 13px; margin: 0 0 12px;">
                Questions? Email us at <a href="mailto:support@company.com" style="color: var(--primary-color); text-decoration: none;">support@company.com</a>
              </p>
              <p style="color: var(--light-text); font-size: 12px; margin: 0;">
                © 2025 Your Company. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  // Generate template code with current colors
  const generateTemplateCode = useMemo(() => {
    return productionTemplate
      .replace(/{{primaryColor}}/g, colors.primaryColor)
      .replace(/{{primaryLight}}/g, colors.primaryLight)
      .replace(/{{accentColor}}/g, colors.accentColor)
      .replace(/{{textColor}}/g, colors.textColor)
      .replace(/{{lightText}}/g, colors.lightText)
      .replace(/{{borderColor}}/g, colors.borderColor)
      .replace(/{{successColor}}/g, colors.successColor)
      .replace(/{{dangerColor}}/g, colors.dangerColor)
      .replace(/{{warningColor}}/g, colors.warningColor)
      .replace(/{{lightBg}}/g, colors.lightBg);
  }, [colors, productionTemplate]);

  const handleColorChange = (colorKey: keyof ColorSettings, value: string) => {
    setColors(prev => ({
      ...prev,
      [colorKey]: value
    }));
  };

  const resetColors = () => {
    setColors({
      primaryColor: '#4F46E5',
      primaryLight: '#EEF2FF',
      accentColor: '#06B6D4',
      textColor: '#1F2937',
      lightText: '#6B7280',
      borderColor: '#E5E7EB',
      successColor: '#10B981',
      dangerColor: '#EF4444',
      warningColor: '#F59E0B',
      lightBg: '#F9FAFB'
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateTemplateCode).then(() => {
      setCopiedId('production');
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="email-templates-container">
      <div className="email-templates-header">
        <button className="home-btn" onClick={() => navigate('/')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"/>
          </svg>
          Home
        </button>
        <div className="header-text">
          <h1>Production Email Template</h1>
          <p>Customize colors and preview your production-ready email template</p>
        </div>
      </div>

      <div className="templates-layout">
        {/* Color Editor Sidebar */}
        <div className="color-editor-sidebar">
          <div className="sidebar-header">
            <h3>🎨 Color Editor</h3>
            <p>Customize your template colors</p>
          </div>

          <div className="color-controls">
            <div className="color-control">
              <label htmlFor="primaryColor">
                <span className="color-label">Primary Color</span>
                <span className="color-value">{colors.primaryColor}</span>
              </label>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  id="primaryColor"
                  value={colors.primaryColor}
                  onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                />
                <input
                  type="text"
                  value={colors.primaryColor}
                  onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                  className="color-text-input"
                />
              </div>
            </div>

            <div className="color-control">
              <label htmlFor="primaryLight">
                <span className="color-label">Primary Light</span>
                <span className="color-value">{colors.primaryLight}</span>
              </label>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  id="primaryLight"
                  value={colors.primaryLight}
                  onChange={(e) => handleColorChange('primaryLight', e.target.value)}
                />
                <input
                  type="text"
                  value={colors.primaryLight}
                  onChange={(e) => handleColorChange('primaryLight', e.target.value)}
                  className="color-text-input"
                />
              </div>
            </div>

            <div className="color-control">
              <label htmlFor="accentColor">
                <span className="color-label">Accent Color</span>
                <span className="color-value">{colors.accentColor}</span>
              </label>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  id="accentColor"
                  value={colors.accentColor}
                  onChange={(e) => handleColorChange('accentColor', e.target.value)}
                />
                <input
                  type="text"
                  value={colors.accentColor}
                  onChange={(e) => handleColorChange('accentColor', e.target.value)}
                  className="color-text-input"
                />
              </div>
            </div>

            <div className="color-control">
              <label htmlFor="textColor">
                <span className="color-label">Text Color</span>
                <span className="color-value">{colors.textColor}</span>
              </label>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  id="textColor"
                  value={colors.textColor}
                  onChange={(e) => handleColorChange('textColor', e.target.value)}
                />
                <input
                  type="text"
                  value={colors.textColor}
                  onChange={(e) => handleColorChange('textColor', e.target.value)}
                  className="color-text-input"
                />
              </div>
            </div>

            <div className="color-control">
              <label htmlFor="lightText">
                <span className="color-label">Light Text</span>
                <span className="color-value">{colors.lightText}</span>
              </label>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  id="lightText"
                  value={colors.lightText}
                  onChange={(e) => handleColorChange('lightText', e.target.value)}
                />
                <input
                  type="text"
                  value={colors.lightText}
                  onChange={(e) => handleColorChange('lightText', e.target.value)}
                  className="color-text-input"
                />
              </div>
            </div>

            <div className="color-control">
              <label htmlFor="borderColor">
                <span className="color-label">Border Color</span>
                <span className="color-value">{colors.borderColor}</span>
              </label>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  id="borderColor"
                  value={colors.borderColor}
                  onChange={(e) => handleColorChange('borderColor', e.target.value)}
                />
                <input
                  type="text"
                  value={colors.borderColor}
                  onChange={(e) => handleColorChange('borderColor', e.target.value)}
                  className="color-text-input"
                />
              </div>
            </div>

            <div className="color-control">
              <label htmlFor="successColor">
                <span className="color-label">Success Color</span>
                <span className="color-value">{colors.successColor}</span>
              </label>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  id="successColor"
                  value={colors.successColor}
                  onChange={(e) => handleColorChange('successColor', e.target.value)}
                />
                <input
                  type="text"
                  value={colors.successColor}
                  onChange={(e) => handleColorChange('successColor', e.target.value)}
                  className="color-text-input"
                />
              </div>
            </div>

            <div className="color-control">
              <label htmlFor="dangerColor">
                <span className="color-label">Danger Color</span>
                <span className="color-value">{colors.dangerColor}</span>
              </label>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  id="dangerColor"
                  value={colors.dangerColor}
                  onChange={(e) => handleColorChange('dangerColor', e.target.value)}
                />
                <input
                  type="text"
                  value={colors.dangerColor}
                  onChange={(e) => handleColorChange('dangerColor', e.target.value)}
                  className="color-text-input"
                />
              </div>
            </div>

            <div className="color-control">
              <label htmlFor="warningColor">
                <span className="color-label">Warning Color</span>
                <span className="color-value">{colors.warningColor}</span>
              </label>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  id="warningColor"
                  value={colors.warningColor}
                  onChange={(e) => handleColorChange('warningColor', e.target.value)}
                />
                <input
                  type="text"
                  value={colors.warningColor}
                  onChange={(e) => handleColorChange('warningColor', e.target.value)}
                  className="color-text-input"
                />
              </div>
            </div>

            <div className="color-control">
              <label htmlFor="lightBg">
                <span className="color-label">Light Background</span>
                <span className="color-value">{colors.lightBg}</span>
              </label>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  id="lightBg"
                  value={colors.lightBg}
                  onChange={(e) => handleColorChange('lightBg', e.target.value)}
                />
                <input
                  type="text"
                  value={colors.lightBg}
                  onChange={(e) => handleColorChange('lightBg', e.target.value)}
                  className="color-text-input"
                />
              </div>
            </div>
          </div>

          <button className="reset-colors-btn" onClick={resetColors}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Reset Colors
          </button>
        </div>

        {/* Preview and Copy Section */}
        <div className="preview-section">
          <div className="preview-container">
            <h3 className="preview-title">Visual Preview</h3>
            <div className="preview-iframe-wrapper">
              <iframe
                srcDoc={generateTemplateCode}
                title="Production template preview"
                className="preview-iframe"
                sandbox="allow-same-origin"
                key={JSON.stringify(colors)}
              />
            </div>
          </div>

          <button
            className={`copy-code-btn ${copiedId === 'production' ? 'copied' : ''}`}
            onClick={copyToClipboard}
          >
            {copiedId === 'production' ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Copied to Clipboard!
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
                Copy HTML Code
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplatesPage;
