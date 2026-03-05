import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LocalPickupTemplatePage.css';

interface CodeSection {
  id: string;
  name: string;
  description: string;
  code: string;
}

const WelcomeEmailTemplatePage: React.FC = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const codeSections: CodeSection[] = [
    {
      id: 'full-template',
      name: 'Welcome Email Template',
      description: 'Complete HTML email template for new customer welcome',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f0f4f8;
            color: #334155;
            -webkit-font-smoothing: antialiased;
        }
        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
            overflow: hidden;
        }
        .header {
            background-color: #0052CC;
            padding: 40px 30px;
            text-align: center;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 26px;
            font-weight: 600;
            letter-spacing: -0.5px;
        }
        .content {
            padding: 40px 30px;
        }
        .welcome-text {
            font-size: 18px;
            color: #1e293b;
            margin-bottom: 24px;
            font-weight: 500;
        }
        .credentials-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-left: 4px solid #0052CC;
            padding: 24px;
            margin: 32px 0;
            border-radius: 4px;
        }
        .credentials-box strong {
            color: #1e293b;
            font-weight: 600;
        }
        .credentials-box p {
            margin: 8px 0;
            font-size: 15px;
            color: #475569;
        }
        .btn {
            display: inline-block;
            padding: 14px 32px;
            background-color: #0052CC;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            margin: 16px 0 32px 0;
            text-align: center;
        }
        .feature-section {
            background-color: #ffffff;
            padding: 0;
            margin: 32px 0;
        }
        .feature-section h2 {
            color: #0052CC;
            font-size: 18px;
            margin: 0 0 16px 0;
            font-weight: 600;
        }
        .feature-section p {
            color: #475569;
            margin: 10px 0;
            padding-left: 24px;
            position: relative;
        }
        .feature-section p::before {
            content: "•";
            color: #0052CC;
            font-weight: bold;
            position: absolute;
            left: 8px;
        }
        .footer {
            background-color: #f8fafc;
            border-top: 1px solid #e2e8f0;
            color: #64748b;
            padding: 30px;
            text-align: center;
            font-size: 14px;
        }
        .footer a {
            color: #0052CC;
            text-decoration: none;
            font-weight: 500;
        }
        .divider {
            height: 1px;
            background-color: #e2e8f0;
            margin: 32px 0;
        }
        p {
            line-height: 1.6;
            margin: 12px 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Welcome to {{ site.name }}! 🎉</h1>
        </div>

        <div class="content">
            <p class="welcome-text">Hi {{customer.full_name}},</p>

            <p>We're thrilled to have you join us! Your account has been successfully created, and you're all set to explore everything we have to offer.</p>

            <div class="credentials-box">
                <p style="margin-top: 0;"><strong>Your Login Details:</strong></p>
                <p><strong>Username:</strong> {{ customer.login }}</p>
                {% if is_system_generated_password %}
                <p><strong>Temporary Password:</strong> {{ password }}</p>
                <p style="font-size: 13px; color: #0052CC; margin-top: 16px; margin-bottom: 0;">
                    For security, please change your password after your first login.
                </p>
                {% endif %}
            </div>

            <a href="http://{{ site.primary_domain }}" class="btn">Access Your Account</a>

            <div class="feature-section">
                <h2>What You Can Do</h2>
                {% if customer.is_account_holder %}
                <p>View your orders, statements, and payment history</p>
                {% if customer.credit_limit > 0 %}
                <p>Create new orders and add them to your account</p>
                <p>Manage your account settings and preferences</p>
                {% endif %}
                {% else %}
                <p>View your complete order history</p>
                <p>Access and manage your saved orders</p>
                <p>Track your current orders in real-time</p>
                {% endif %}
            </div>

            {% unless site.account_only? %}
            <div class="divider"></div>

            <div class="feature-section">
                <h2>Design Your Own Custom Products</h2>
                <p style="padding-left: 0; margin-bottom: 16px; color: #334155;">Take advantage of our cutting-edge online design tools to create something truly unique:</p>
                <p>Choose from our extensive clipart library</p>
                <p>Upload your own designs and artwork</p>
                <p>Preview in real-time before ordering</p>
                <p>Save your designs and come back anytime</p>
            </div>
            {% endunless %}

            <div class="divider"></div>

            <p>If you have any questions or need assistance, our team is here to help. Don't hesitate to reach out!</p>

            {{ message_html }}
        </div>

        <div class="footer">
            <p style="color: #334155; margin-bottom: 4px;"><strong>{{ site.name }}</strong></p>
            <p style="margin-top: 0;"><a href="http://{{ site.primary_domain }}">{{ site.primary_domain }}</a></p>
            <p style="margin-top: 24px; font-size: 12px; color: #94a3b8;">You're receiving this email because an account was created for you.</p>
        </div>
    </div>
</body>
</html>`
    }
  ];

  // Always show the full template
  const activeCodeSection = codeSections[0];

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
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
            </div>
            <h1>Welcome Email</h1>
          </div>
          <p className="version">Email Template</p>
        </div>
      </div>

      <div className="main-content">
        <div className="top-header">
          <div className="header-left">
            <button className="back-btn" onClick={() => navigate('/email-templates')}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
              </svg>
              <span>Back to Templates</span>
            </button>
            <h2 className="page-title">Professional Email Templates</h2>
          </div>
          <button className="home-btn" onClick={() => navigate('/')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"/>
            </svg>
            <span>Home</span>
          </button>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeEmailTemplatePage;
