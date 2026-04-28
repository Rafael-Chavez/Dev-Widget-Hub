import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LocalPickupTemplatePage.css';

const UserRegistrationTemplate: React.FC = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const templateHTML = `<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* Base Styles */
        body {
            margin: 0;
            padding: 0;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f4f7f9;
            color: #333333;
            -webkit-font-smoothing: antialiased;
        }
        .wrapper {
            width: 100%;
            table-layout: fixed;
            background-color: #f4f7f9;
            padding-bottom: 40px;
        }
        .main-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            margin-top: 40px;
        }
        /* Content Sections */
        .header {
            padding: 30px;
            text-align: center;
            background-color: #ffffff;
            border-bottom: 1px solid #eeeeee;
        }
        .content {
            padding: 30px;
            line-height: 1.6;
        }
        .credential-box {
            background-color: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 6px;
            padding: 20px;
            margin: 20px 0;
        }
        .credential-item {
            margin-bottom: 8px;
            font-size: 14px;
        }
        .credential-label {
            font-weight: bold;
            color: #666;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 0.5px;
        }
        /* Button */
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        .button {
            background-color: #007bff;
            color: #ffffff !important;
            padding: 14px 28px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            display: inline-block;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #888888;
        }
        h1 {
            margin: 0;
            font-size: 22px;
            color: #111111;
        }
        p {
            margin: 0 0 15px 0;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="main-container">
            <div class="header">
                <h1>Welcome to {{ site.name }}</h1>
            </div>

            <div class="content">
                <p>Hello {{ customer.full_name }},</p>
                <p>Your account is ready. You can now access your dashboard using the credentials below:</p>

                <div class="credential-box">
                    <div class="credential-item">
                        <span class="credential-label">Username:</span><br>
                        <strong>{{ customer.login }}</strong>
                    </div>
                    {% if is_system_generated_password %}
                    <div class="credential-item" style="margin-top: 15px;">
                        <span class="credential-label">Temporary Password:</span><br>
                        <strong>{{ password }}</strong>
                    </div>
                    {% endif %}
                </div>

                <div class="button-container">
                    <a href="http://{{ site.primary_domain }}" class="button">Log In to My Account</a>
                </div>

                <p>
                    {% if customer.is_account_holder %}
                        You can use your account to view <strong>orders, statements, and payment history</strong>.
                        {% if customer.credit_limit > 0 %}
                            You are also authorized to create new orders directly on your account.
                        {% endif %}
                    {% else %}
                        Use your login to track <strong>order history and manage your working copies</strong>.
                    {% endif %}
                </p>

                <div style="margin-top: 30px; border-top: 1px solid #eeeeee; padding-top: 20px;">
                    {{ message_html }}
                </div>
            </div>

            <div class="footer">
                &copy; {{ site.name }} | <a href="http://{{ site.primary_domain }}" style="color: #888;">{{ site.primary_domain }}</a><br>
                If you have any questions, simply reply to this email.
            </div>
        </div>
    </div>
</body>
</html>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(templateHTML).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="template-detail-page">
      {/* Header */}
      <header className="template-header">
        <button className="back-button" onClick={() => navigate('/email-templates')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
          </svg>
          Back to Templates
        </button>
        <div className="template-title-section">
          <div className="template-icon">👤</div>
          <div>
            <h1 className="template-title">User Registration Email</h1>
            <p className="template-subtitle">Welcome email with account credentials and login details</p>
          </div>
        </div>
      </header>

      <div className="template-content">
        {/* Left Panel - Preview */}
        <div className="preview-panel">
          <div className="panel-header">
            <h2>Live Preview</h2>
            <p>See how your email will look to recipients</p>
          </div>
          <div className="preview-container">
            <div className="email-preview" dangerouslySetInnerHTML={{ __html: templateHTML.replace(/\{\{/g, '&#123;&#123;').replace(/\}\}/g, '&#125;&#125;').replace(/\{%/g, '&#123;%').replace(/%\}/g, '%&#125;') }} />
          </div>
        </div>

        {/* Right Panel - Code */}
        <div className="code-panel">
          <div className="panel-header">
            <h2>Template Code</h2>
            <button className={`copy-button ${copied ? 'copied' : ''}`} onClick={copyToClipboard}>
              {copied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                  </svg>
                  Copy Code
                </>
              )}
            </button>
          </div>
          <div className="code-container">
            <pre className="code-block">
              <code>{templateHTML}</code>
            </pre>
          </div>

          {/* Info Section */}
          <div className="info-section">
            <h3>Template Variables</h3>
            <ul className="variable-list">
              <li>
                <code>{'{{ site.name }}'}</code>
                <span>Your business/site name</span>
              </li>
              <li>
                <code>{'{{ customer.full_name }}'}</code>
                <span>Customer's full name</span>
              </li>
              <li>
                <code>{'{{ customer.login }}'}</code>
                <span>Customer's username/login</span>
              </li>
              <li>
                <code>{'{{ password }}'}</code>
                <span>Temporary password (if system-generated)</span>
              </li>
              <li>
                <code>{'{{ site.primary_domain }}'}</code>
                <span>Your website domain</span>
              </li>
              <li>
                <code>{'{{ customer.is_account_holder }}'}</code>
                <span>Whether user is an account holder</span>
              </li>
              <li>
                <code>{'{{ customer.credit_limit }}'}</code>
                <span>Customer's credit limit</span>
              </li>
              <li>
                <code>{'{{ message_html }}'}</code>
                <span>Footer message/legal text</span>
              </li>
            </ul>
          </div>

          <div className="info-section">
            <h3>Features</h3>
            <ul className="features-list">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Professional credential display
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Conditional password display
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Account-specific messaging
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Fully responsive design
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Clear call-to-action button
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationTemplate;
