import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LocalPickupTemplatePage.css';

interface CodeSection {
  id: string;
  name: string;
  description: string;
  code: string;
}

const LocalPickupTemplatePage: React.FC = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('full-template');
  const [isExpanded, setIsExpanded] = useState(false);

  const codeSections: CodeSection[] = [
    {
      id: 'full-template',
      name: 'Full Template',
      description: 'Complete HTML email template with all sections',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Ready for Pickup</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        .header {
            background-color: #4CAF50;
            padding: 30px;
            text-align: center;
        }
        .company-name {
            color: #ffffff;
            font-size: 24px;
            font-weight: bold;
            margin-top: 15px;
        }
        .content {
            padding: 40px 30px;
        }
        h3 {
            color: #333333;
            margin-top: 0;
        }
        p {
            color: #666666;
            line-height: 1.6;
            margin: 15px 0;
        }
        .pickup-section {
            background-color: #f9f9f9;
            border-left: 4px solid #4CAF50;
            padding: 20px;
            margin: 25px 0;
        }
        .invoice-notice {
            font-size: 16px;
            color: #333333;
            margin: 0 0 15px 0;
        }
        .address {
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 5px;
            padding: 15px;
            margin: 15px 0;
        }
        .address strong {
            color: #4CAF50;
            display: block;
            margin-bottom: 8px;
        }
        .hours {
            margin-top: 15px;
        }
        .button {
            display: inline-block;
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 30px;
            border-radius: 5px;
            margin: 20px 0;
            font-weight: bold;
        }
        .footer {
            background-color: #333333;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            font-size: 12px;
        }
        .footer p {
            color: #cccccc;
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            {% logo 200 200 %}
            <div class="company-name">{{site.name}}</div>
        </div>

        <div class="content">
            <h3>Hello {{ customer.first_name }},</h3>

            <p>Good news! Your order is ready for pickup.</p>

            <div class="pickup-section">
                <p class="invoice-notice">Invoice #: <strong>{{ order.invoice_number }}</strong></p>

                <div class="address">
                    <strong>Pickup Location:</strong>
                    123 Main Street<br>
                    Suite 100<br>
                    City, State 12345
                </div>

                <div class="hours">
                    <strong>Pickup Hours:</strong><br>
                    Monday - Friday: 9:00 AM - 6:00 PM<br>
                    Saturday: 10:00 AM - 4:00 PM<br>
                    Sunday: Closed
                </div>
            </div>

            <p>Please bring a valid photo ID and your order confirmation when picking up your items.</p>

            <p>If you have any questions or need to arrange an alternative pickup time, please don't hesitate to contact us.</p>

            <center>
                <a href="mailto:support@yourstore.com" class="button">Contact Us</a>
            </center>
        </div>

        <div class="footer">
            <p>&copy; {{ "now" | date: "%Y" }} {{site.name}}. All rights reserved.</p>
            <p>{{site.address}}</p>
        </div>
    </div>
</body>
</html>`
    },
    {
      id: 'header-section',
      name: 'Header Section',
      description: 'Email header with logo and company name',
      code: `<div class="header">
    {% logo 200 200 %}
    <div class="company-name">{{site.name}}</div>
</div>`
    },
    {
      id: 'pickup-notice',
      name: 'Pickup Notice',
      description: 'Main pickup notification content',
      code: `<h3>Hello {{ customer.first_name }},</h3>

<p>Good news! Your order is ready for pickup.</p>

<div class="pickup-section">
    <p class="invoice-notice">Invoice #: <strong>{{ order.invoice_number }}</strong></p>

    <div class="address">
        <strong>Pickup Location:</strong>
        123 Main Street<br>
        Suite 100<br>
        City, State 12345
    </div>

    <div class="hours">
        <strong>Pickup Hours:</strong><br>
        Monday - Friday: 9:00 AM - 6:00 PM<br>
        Saturday: 10:00 AM - 4:00 PM<br>
        Sunday: Closed
    </div>
</div>`
    },
    {
      id: 'footer-section',
      name: 'Footer Section',
      description: 'Email footer with copyright and address',
      code: `<div class="footer">
    <p>&copy; {{ "now" | date: "%Y" }} {{site.name}}. All rights reserved.</p>
    <p>{{site.address}}</p>
</div>`
    },
    {
      id: 'styles',
      name: 'CSS Styles',
      description: 'Complete stylesheet for the email template',
      code: `<style>
    body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
    }
    .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
    }
    .header {
        background-color: #4CAF50;
        padding: 30px;
        text-align: center;
    }
    .company-name {
        color: #ffffff;
        font-size: 24px;
        font-weight: bold;
        margin-top: 15px;
    }
    .content {
        padding: 40px 30px;
    }
    h3 {
        color: #333333;
        margin-top: 0;
    }
    p {
        color: #666666;
        line-height: 1.6;
        margin: 15px 0;
    }
    .pickup-section {
        background-color: #f9f9f9;
        border-left: 4px solid #4CAF50;
        padding: 20px;
        margin: 25px 0;
    }
    .invoice-notice {
        font-size: 16px;
        color: #333333;
        margin: 0 0 15px 0;
    }
    .address {
        background-color: #ffffff;
        border: 1px solid #dddddd;
        border-radius: 5px;
        padding: 15px;
        margin: 15px 0;
    }
    .address strong {
        color: #4CAF50;
        display: block;
        margin-bottom: 8px;
    }
    .hours {
        margin-top: 15px;
    }
    .button {
        display: inline-block;
        background-color: #4CAF50;
        color: #ffffff;
        text-decoration: none;
        padding: 12px 30px;
        border-radius: 5px;
        margin: 20px 0;
        font-weight: bold;
    }
    .footer {
        background-color: #333333;
        color: #ffffff;
        padding: 20px;
        text-align: center;
        font-size: 12px;
    }
    .footer p {
        color: #cccccc;
        margin: 5px 0;
    }
</style>`
    }
  ];

  const activeCodeSection = codeSections.find(section => section.id === activeSection) || codeSections[0];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(activeCodeSection.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="local-pickup-page">
      <div className="sidebar">
        <div className="sidebar-header-section">
          <div className="logo-section">
            <div className="logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/>
              </svg>
            </div>
            <h1>Local Pickup</h1>
          </div>
          <p className="version">Email Template</p>
        </div>

        <div className="sidebar-nav">
          <button className="nav-item" onClick={() => navigate('/')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"/>
            </svg>
            <span>Home</span>
          </button>
        </div>

        <div className="template-sections">
          <div className="sections-header">
            <h3>Template Sections</h3>
            <p>Click to view code snippets</p>
          </div>
          <div className="section-list">
            {codeSections.map((section) => (
              <button
                key={section.id}
                className={`section-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="section-name">{section.name}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="top-header">
          <div className="header-left">
            <h2 className="page-title">Professional Email Templates</h2>
          </div>
        </div>

        <div className="content-wrapper">
          <div className="template-section">
            <div className="code-section">
              <div className="code-header">
                <div className="code-header-info">
                  <h3>{activeCodeSection.name}</h3>
                  <p>{activeCodeSection.description}</p>
                </div>
                <div className="code-header-actions">
                  <button
                    className="expand-btn"
                    onClick={() => setIsExpanded(!isExpanded)}
                    title={isExpanded ? 'Collapse code' : 'Expand code'}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      {isExpanded ? (
                        <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd"/>
                      ) : (
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd"/>
                      )}
                    </svg>
                    {isExpanded ? 'Collapse' : 'Expand'}
                  </button>
                  <button className="copy-btn" onClick={copyToClipboard}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                    </svg>
                    {copied ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
              </div>
              <div className={`code-box ${isExpanded ? 'expanded' : ''}`}>
                <pre><code>{activeCodeSection.code}</code></pre>
              </div>
            </div>

            {activeSection === 'full-template' && (
              <div className="preview-section">
                <h3>Preview</h3>
                <div className="preview-iframe-container">
                  <iframe
                    srcDoc={activeCodeSection.code.replace(/\{\{[^}]+\}\}/g, (match) => {
                      const replacements: { [key: string]: string } = {
                        '{{site.name}}': 'Your Store Name',
                        '{{ customer.first_name }}': 'John',
                        '{{ order.invoice_number }}': 'INV-2024-001',
                        '{{site.address}}': '123 Main Street, City, State 12345',
                        '{{ "now" | date: "%Y" }}': new Date().getFullYear().toString()
                      };
                      return replacements[match] || match;
                    }).replace('{% logo 200 200 %}', '<div style="width:200px;height:200px;background:#2e7d32;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;color:white;font-size:60px;font-weight:bold;">LOGO</div>')}
                    title="Email Template Preview"
                    className="preview-iframe"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalPickupTemplatePage;
