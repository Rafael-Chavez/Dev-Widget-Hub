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

  // Production template - DecoNetwork Production Worksheet
  const productionTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Production Worksheet</title>
    <link rel="stylesheet" href="/barcode/fre3of9x.css">
    <style>
        /* Note: This template uses Liquid template syntax for DecoNetwork */
        /* Color customization variables */
        :root {
            --header-gradient-start: {{primaryColor}};
            --header-gradient-end: {{textColor}};
            --accent-color: {{accentColor}};
            --text-color: {{textColor}};
            --light-text: {{lightText}};
            --border-color: {{borderColor}};
            --success-color: {{successColor}};
            --danger-color: {{dangerColor}};
            --light-bg: {{lightBg}};
        }

        /* Reset and Base Styles */
        * {
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: var(--text-color);
            margin: 0;
            padding: 20px;
            background-color: #f8f9fa;
        }

        /* Main Container */
        #worksheet-container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
        }

        /* Header Styles */
        .header {
            background: linear-gradient(135deg, var(--header-gradient-start) 0%, var(--header-gradient-end) 100%);
            padding: 20px;
            color: white;
        }

        .header-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }

        .header-logo {
            flex: 0 0 220px;
        }

        .header-barcode {
            flex: 1;
            text-align: center;
            font-family: Free3of9ExtendedRegular;
            font-size: 42px;
            color: white;
        }

        .header-status {
            flex: 0 0 200px;
            text-align: center;
        }

        .status-badge {
            padding: 12px 20px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .status-red {
            background: var(--danger-color);
            color: white;
        }

        .status-green {
            background: var(--success-color);
            color: white;
        }

        .order-info {
            background: rgba(255, 255, 255, 0.1);
            padding: 15px 20px;
            border-radius: 6px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .customer-name {
            font-size: 18px;
            font-weight: 600;
        }

        .order-number {
            font-size: 16px;
            opacity: 0.9;
        }

        /* Order Details Section */
        .order-details {
            padding: 30px;
            background: var(--light-bg);
            border-bottom: 1px solid var(--border-color);
        }

        .details-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 40px;
        }

        .detail-section h3 {
            color: var(--text-color);
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin: 0 0 15px 0;
            border-bottom: 2px solid var(--accent-color);
            padding-bottom: 5px;
            display: inline-block;
        }

        .detail-section ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .detail-section li {
            margin: 8px 0;
            padding: 5px 0;
            color: var(--text-color);
        }

        .detail-label {
            font-weight: 600;
            color: var(--text-color);
            min-width: 80px;
            display: inline-block;
        }

        .highlight {
            background: #fff3cd;
            padding: 3px 6px;
            border-radius: 3px;
            font-weight: 600;
        }

        /* Notes Section */
        .notes-section {
            padding: 20px 30px;
            background: #fff;
            border-left: 4px solid var(--accent-color);
            margin: 20px 30px;
            border-radius: 0 6px 6px 0;
        }

        .notes-section h3 {
            color: var(--accent-color);
            margin: 0 0 15px 0;
            font-size: 16px;
        }

        /* Line Items */
        .line-item {
            margin: 30px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .line-item-header {
            background: linear-gradient(135deg, var(--header-gradient-start) 0%, var(--header-gradient-end) 100%);
            color: white;
            padding: 15px 20px;
            font-size: 16px;
            font-weight: 600;
        }

        .line-item-header.divider {
            background: linear-gradient(135deg, #adb5bd 0%, #ced4da 100%);
            color: #495057;
        }

        .line-item-content {
            padding: 25px;
        }

        /* Item Summary Grid */
        .item-summary {
            display: grid;
            grid-template-columns: 150px 200px 1fr;
            gap: 30px;
            margin-bottom: 30px;
        }

        .color-section h4,
        .size-section h4,
        .preview-section h4 {
            margin: 0 0 15px 0;
            font-size: 14px;
            font-weight: 600;
            color: var(--text-color);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        /* Color Display */
        .color-display {
            text-align: center;
            margin-bottom: 15px;
        }

        .color-swatch {
            width: 80px;
            height: 80px;
            border: 2px solid var(--border-color);
            border-radius: 8px;
            margin: 0 auto 10px;
            position: relative;
            overflow: hidden;
        }

        .color-swatch img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .color-name {
            font-size: 12px;
            font-weight: 500;
            color: var(--light-text);
        }

        /* Size Table */
        .size-table {
            width: 100%;
        }

        .size-table th {
            background: var(--light-bg);
            padding: 8px 12px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            border-bottom: 2px solid var(--border-color);
        }

        .size-table td {
            padding: 8px 12px;
            border-bottom: 1px solid var(--border-color);
            font-size: 14px;
        }

        .size-total {
            background: #fff3cd;
            font-weight: 600;
        }

        /* Product Images */
        .product-images {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 20px;
        }

        .product-view {
            text-align: center;
            background: var(--light-bg);
            padding: 15px;
            border-radius: 8px;
            border: 1px solid var(--border-color);
        }

        .product-view h5 {
            margin: 0 0 15px 0;
            font-size: 14px;
            font-weight: 600;
            color: var(--text-color);
        }

        .product-view img {
            max-width: 160px;
            max-height: 160px;
            border-radius: 6px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s ease;
        }

        .product-view img:hover {
            transform: scale(1.05);
        }

        /* Barcode */
        .item-barcode {
            font-family: Free3of9ExtendedRegular;
            font-size: 42px;
            text-align: center;
            margin: 15px 0;
            color: var(--text-color);
        }

        /* Team Names Table */
        .team-table {
            width: 100%;
            margin-top: 20px;
            border-collapse: collapse;
        }

        .team-table th {
            background: var(--header-gradient-start);
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: 600;
        }

        .team-table td {
            padding: 10px 12px;
            border-bottom: 1px solid var(--border-color);
        }

        .team-table tr:nth-child(even) {
            background: var(--light-bg);
        }

        /* Design Details */
        .design-section {
            margin-top: 30px;
            border-top: 1px solid var(--border-color);
            padding-top: 25px;
        }

        .design-header {
            background: var(--border-color);
            color: var(--text-color);
            padding: 12px 20px;
            text-align: center;
            font-weight: 600;
            margin-bottom: 20px;
            border-radius: 6px;
        }

        .design-details {
            display: grid;
            grid-template-columns: 200px 300px 1fr;
            gap: 30px;
            margin-bottom: 30px;
            padding: 20px;
            background: var(--light-bg);
            border-radius: 8px;
        }

        .design-preview img {
            max-width: 160px;
            max-height: 160px;
            border-radius: 6px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        /* Extra Options */
        .extra-options {
            background: var(--light-bg);
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
        }

        .extra-options h4 {
            color: var(--text-color);
            margin: 0 0 15px 0;
            font-size: 16px;
            font-weight: 600;
        }

        .extra-options ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .extra-options li {
            margin: 8px 0;
            padding: 8px 0;
            border-bottom: 1px solid var(--border-color);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .header-row {
                flex-direction: column;
                gap: 15px;
            }

            .details-grid {
                grid-template-columns: 1fr;
                gap: 20px;
            }

            .item-summary {
                grid-template-columns: 1fr;
                gap: 20px;
            }

            .design-details {
                grid-template-columns: 1fr;
                gap: 20px;
            }

            .product-images {
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            }
        }
    </style>
</head>
<body>
    <div id="worksheet-container">
        <p style="text-align: center; padding: 20px; color: var(--light-text); font-size: 14px;">
            This is a DecoNetwork production worksheet template. The actual content uses Liquid template syntax and will be populated with order data from DecoNetwork.
        </p>
        <p style="text-align: center; padding: 0 20px 20px; color: var(--light-text); font-size: 14px;">
            Customize the colors using the sidebar to match your brand identity.
        </p>
    </div>
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
