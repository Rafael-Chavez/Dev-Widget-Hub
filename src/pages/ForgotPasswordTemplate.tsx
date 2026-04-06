import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LocalPickupTemplatePage.css';

const ForgotPasswordTemplate: React.FC = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const templateHTML = `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333333; line-height: 1.6;">

  <p>Hi {{ customer.full_name }},</p>

  <p>We received a request to reset the password for your account at <a href="http://{{ site.primary_domain }}/" style="color: #2563eb; text-decoration: none; font-weight: 500;">{{ site.primary_domain }}</a>.</p>

  <p>If you made this request, simply click the button below to set a new password:</p>

  <div style="margin: 30px 0;">
    <a href="{{ reset_password_url }}" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">Reset Password</a>
  </div>

  <p style="font-size: 14px; color: #6b7280; margin-bottom: 30px;">
    If you didn't request a password reset, you can safely ignore this email. Your account is secure and your password will not be changed.
  </p>

  <p>
    Best regards,<br/>
    <strong>The {{ fulfillment_system.name }} Team</strong>
  </p>

  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />

  <div style="font-size: 12px; color: #9ca3af;">
    {{ message_html }}
  </div>

</div>`;

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
          <div className="template-icon">🔐</div>
          <div>
            <h1 className="template-title">Forgot Password Email</h1>
            <p className="template-subtitle">Password reset email with secure reset link</p>
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
            <div className="email-preview" dangerouslySetInnerHTML={{ __html: templateHTML.replace(/\{\{/g, '&#123;&#123;').replace(/\}\}/g, '&#125;&#125;') }} />
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
                <code>{'{{ customer.full_name }}'}</code>
                <span>Customer's full name</span>
              </li>
              <li>
                <code>{'{{ site.primary_domain }}'}</code>
                <span>Your website domain</span>
              </li>
              <li>
                <code>{'{{ reset_password_url }}'}</code>
                <span>Secure password reset link</span>
              </li>
              <li>
                <code>{'{{ fulfillment_system.name }}'}</code>
                <span>Your business name</span>
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
                Secure password reset flow
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Clear call-to-action button
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Security reminder for users
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
                Professional branding
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordTemplate;
