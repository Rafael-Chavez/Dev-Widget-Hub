import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LocalPickupTemplatePage.css';

interface CodeSection {
  id: string;
  name: string;
  description: string;
  code: string;
}

const QuoteSentTemplatePage: React.FC = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const codeSections: CodeSection[] = [
    {
      id: 'full-template',
      name: 'Quote Sent Template',
      description: 'Complete HTML email template for quote notifications',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quote Available</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #233142; color: #e3e3e3;">

    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #233142;">
        <tr>
            <td style="padding: 40px 20px;">

                <!-- Main Container -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #455d7a; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">

                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid rgba(227, 227, 227, 0.1);">
                            <h1 style="margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 2px; color: #e3e3e3; text-transform: uppercase;">Quote Available</h1>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px; background-color: #233142;">

                            <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; font-weight: 300; color: #e3e3e3;">
                                Dear {{customer.full_name}},
                            </p>

                            <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; font-weight: 300; color: #e3e3e3;">
                                A quote has been produced based on your requirements and is now available online for your approval.
                            </p>

                            <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; font-weight: 300; color: #e3e3e3;">
                                Please visit the quote by clicking the button below to approve or reject this quote:
                            </p>

                            <!-- CTA Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="text-align: center; padding: 0 0 30px;">
                                        <a href="{{ quote_url }}" style="display: inline-block; padding: 16px 40px; background-color: #f95959; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 400; letter-spacing: 1px; text-transform: uppercase; border-radius: 4px; box-shadow: 0 2px 10px rgba(249, 89, 89, 0.3);">
                                            View Quote
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            {% if quote.get_approval_amount > 0 %}
                            <div style="padding: 20px; background-color: rgba(69, 93, 122, 0.3); border-left: 3px solid #f95959; border-radius: 4px; margin: 0 0 30px;">
                                <p style="margin: 0; font-size: 15px; line-height: 1.6; font-weight: 300; color: #e3e3e3;">
                                    {% if quote.approval_requires_deposit? %}
                                    You will also be able to pay the deposit required online at the same time so we can commence production immediately!
                                    {% else %}
                                    You will also be able to pay the quoted amount at the same time so we can commence production immediately!
                                    {% endif %}
                                </p>
                            </div>
                            {% endif %}

                            {% if quote_is_attached %}
                            <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.6; font-weight: 300; color: #e3e3e3;">
                                The quote has also been attached to this email for your convenience.
                            </p>
                            {% endif %}

                            {% if quote_has_message %}
                            <div style="padding: 20px; background-color: rgba(69, 93, 122, 0.3); border-radius: 4px; margin: 30px 0;">
                                <p style="margin: 0; font-size: 15px; line-height: 1.6; font-weight: 300; color: #e3e3e3;">
                                    {{ quote_message }}
                                </p>
                            </div>
                            {% endif %}

                            <p style="margin: 30px 0 10px; font-size: 16px; line-height: 1.6; font-weight: 300; color: #e3e3e3;">
                                Thank you
                            </p>

                            <p style="margin: 0; font-size: 15px; line-height: 1.6; font-weight: 400; color: #e3e3e3;">
                                {{ site.name }}
                            </p>

                            <p style="margin: 5px 0 0; font-size: 14px; line-height: 1.6; font-weight: 300; color: #e3e3e3; opacity: 0.7;">
                                <a href="http://{{ site.primary_domain }}" style="color: #f95959; text-decoration: none;">{{ site.primary_domain }}</a>
                            </p>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; background-color: rgba(35, 49, 66, 0.5); text-align: center; border-top: 1px solid rgba(227, 227, 227, 0.1);">
                            <div style="font-size: 13px; line-height: 1.6; font-weight: 300; color: #e3e3e3; opacity: 0.6;">
                                {{ message_html }}
                            </div>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

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
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
              </svg>
            </div>
            <h1>Quote Sent</h1>
          </div>
          <p className="version">Email Template</p>
        </div>
      </div>

      <div className="main-content">
        <div className="top-header">
          <div className="header-left">
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

export default QuoteSentTemplatePage;
