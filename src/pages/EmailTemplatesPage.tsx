import React, { useState } from 'react';
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

const EmailTemplatesPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const templates: EmailTemplate[] = [
    {
      id: 'welcome',
      name: 'Welcome Email',
      description: 'A friendly welcome email for new customers',
      category: 'customer',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px;">Welcome to [Your Company]!</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #333333; margin: 0 0 20px;">Hi [Name],</h2>
              <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                We're thrilled to have you on board! Your account has been successfully created.
              </p>
              <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                Get started by exploring our features and customizing your experience.
              </p>
              <!-- Button -->
              <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                <tr>
                  <td align="center" style="background-color: #667eea; border-radius: 4px; padding: 14px 30px;">
                    <a href="[YOUR_LINK]" style="color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px; display: block;">
                      Get Started
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center;">
              <p style="color: #999999; font-size: 14px; margin: 0;">
                Questions? Contact us at <a href="mailto:support@yourcompany.com" style="color: #667eea;">support@yourcompany.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
    },
    {
      id: 'order',
      name: 'Order Confirmation',
      description: 'Professional order confirmation email with order details',
      category: 'order',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #0d1b2a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0d1b2a; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1b263b; border-radius: 8px; overflow: hidden; border: 2px solid #415a77;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #415a77 0%, #778da9 100%); padding: 40px; text-align: center;">
              <h1 style="color: #e0e1dd; margin: 0 0 10px; font-size: 32px;">Order Confirmed!</h1>
              <p style="color: #e0e1dd; margin: 0; font-size: 16px;">Thank you for your purchase</p>
            </td>
          </tr>
          <!-- Order Details -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #e0e1dd; margin: 0 0 20px; font-size: 24px;">Hi [Customer Name],</h2>
              <p style="color: #778da9; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                Your order has been confirmed and will be shipped soon.
              </p>

              <table width="100%" cellpadding="10" cellspacing="0" style="border: 1px solid #415a77; margin-bottom: 30px;">
                <tr style="background-color: #415a77;">
                  <td colspan="2" style="padding: 15px; border-bottom: 1px solid #778da9;">
                    <strong style="color: #e0e1dd;">Order #[ORDER_NUMBER]</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #415a77; color: #778da9;">
                    [Product Name]
                  </td>
                  <td align="right" style="padding: 15px; border-bottom: 1px solid #415a77; color: #778da9;">
                    $[PRICE]
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #415a77; color: #778da9;">
                    Shipping
                  </td>
                  <td align="right" style="padding: 15px; border-bottom: 1px solid #415a77; color: #778da9;">
                    $[SHIPPING]
                  </td>
                </tr>
                <tr style="background-color: #415a77;">
                  <td style="padding: 15px;">
                    <strong style="color: #e0e1dd;">Total</strong>
                  </td>
                  <td align="right" style="padding: 15px;">
                    <strong style="color: #e0e1dd;">$[TOTAL]</strong>
                  </td>
                </tr>
              </table>

              <!-- Button -->
              <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                <tr>
                  <td align="center" style="background: linear-gradient(135deg, #415a77 0%, #778da9 100%); border-radius: 4px; padding: 14px 30px;">
                    <a href="[TRACKING_LINK]" style="color: #e0e1dd; text-decoration: none; font-weight: bold; font-size: 16px; display: block;">
                      Track Your Order
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #0d1b2a; padding: 30px; text-align: center;">
              <p style="color: #778da9; font-size: 14px; margin: 0;">
                Need help? <a href="mailto:support@yourcompany.com" style="color: #778da9;">Contact Support</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
    },
    {
      id: 'worksheet',
      name: 'Worksheet Email',
      description: 'Send worksheet or checklist information to customers',
      category: 'worksheet',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Worksheet</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #0d1b2a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0d1b2a; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1b263b; border-radius: 8px; overflow: hidden; border: 2px solid #415a77;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #415a77 0%, #778da9 100%); padding: 40px; text-align: center;">
              <h1 style="color: #e0e1dd; margin: 0; font-size: 32px;">Your Worksheet</h1>
              <p style="color: #e0e1dd; margin: 10px 0 0; font-size: 16px;">Complete these items</p>
            </td>
          </tr>
          <!-- Checklist -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #e0e1dd; margin: 0 0 20px; font-size: 24px;">Hi [Customer Name],</h2>
              <p style="color: #778da9; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                Please review and complete the items below. Check off each item as you finish.
              </p>

              <table width="100%" cellpadding="15" cellspacing="0" style="border: 1px solid #415a77; margin-bottom: 20px;">
                <tr style="background-color: #415a77;">
                  <td style="padding: 15px; border-bottom: 1px solid #778da9;">
                    <strong style="color: #e0e1dd;">Checklist Items</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #415a77;">
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td width="30" style="color: #778da9; font-size: 18px;">☐</td>
                        <td style="color: #778da9; font-size: 16px;">[Task Item 1]</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #415a77;">
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td width="30" style="color: #778da9; font-size: 18px;">☐</td>
                        <td style="color: #778da9; font-size: 16px;">[Task Item 2]</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #415a77;">
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td width="30" style="color: #778da9; font-size: 18px;">☐</td>
                        <td style="color: #778da9; font-size: 16px;">[Task Item 3]</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px;">
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td width="30" style="color: #778da9; font-size: 18px;">☐</td>
                        <td style="color: #778da9; font-size: 16px;">[Task Item 4]</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="color: #778da9; font-size: 14px; line-height: 1.6; margin: 0 0 30px;">
                <strong style="color: #e0e1dd;">Due Date:</strong> [DUE_DATE]
              </p>

              <!-- Button -->
              <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                <tr>
                  <td align="center" style="background: linear-gradient(135deg, #415a77 0%, #778da9 100%); border-radius: 4px; padding: 14px 30px;">
                    <a href="[WORKSHEET_LINK]" style="color: #e0e1dd; text-decoration: none; font-weight: bold; font-size: 16px; display: block;">
                      View Full Worksheet
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #0d1b2a; padding: 30px; text-align: center;">
              <p style="color: #778da9; font-size: 14px; margin: 0;">
                Questions? <a href="mailto:support@yourcompany.com" style="color: #778da9;">Contact Support</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
    },
    {
      id: 'local-pickup',
      name: 'Local Pickup Ready',
      description: 'Notify customers their order is ready for pickup',
      category: 'pickup',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Ready for Pickup</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #0d1b2a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0d1b2a; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1b263b; border-radius: 8px; overflow: hidden; border: 2px solid #415a77;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #415a77 0%, #778da9 100%); padding: 40px; text-align: center;">
              <h1 style="color: #e0e1dd; margin: 0 0 10px; font-size: 32px;">Order Ready for Pickup!</h1>
              <p style="color: #e0e1dd; margin: 0; font-size: 16px;">Your order is waiting for you</p>
            </td>
          </tr>
          <!-- Pickup Details -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #e0e1dd; margin: 0 0 20px; font-size: 24px;">Hi [Customer Name],</h2>
              <p style="color: #778da9; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                Great news! Your order is ready for pickup at our location.
              </p>

              <table width="100%" cellpadding="15" cellspacing="0" style="border: 1px solid #415a77; margin-bottom: 30px; background-color: #415a77;">
                <tr>
                  <td style="padding: 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom: 15px;">
                          <strong style="color: #e0e1dd; font-size: 16px;">Order Number:</strong>
                          <p style="color: #778da9; margin: 5px 0 0; font-size: 18px;">#[ORDER_NUMBER]</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 15px; border-top: 1px solid #778da9; padding-top: 15px;">
                          <strong style="color: #e0e1dd; font-size: 16px;">Pickup Location:</strong>
                          <p style="color: #778da9; margin: 5px 0 0; font-size: 14px; line-height: 1.6;">
                            [Store Name]<br>
                            [Street Address]<br>
                            [City, State ZIP]
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 15px; border-top: 1px solid #778da9; padding-top: 15px;">
                          <strong style="color: #e0e1dd; font-size: 16px;">Store Hours:</strong>
                          <p style="color: #778da9; margin: 5px 0 0; font-size: 14px;">
                            [STORE_HOURS]
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="border-top: 1px solid #778da9; padding-top: 15px;">
                          <strong style="color: #e0e1dd; font-size: 16px;">Pickup By:</strong>
                          <p style="color: #778da9; margin: 5px 0 0; font-size: 14px;">
                            [PICKUP_DEADLINE]
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <div style="background-color: #415a77; padding: 20px; border-radius: 4px; margin-bottom: 30px;">
                <p style="color: #e0e1dd; font-size: 14px; line-height: 1.6; margin: 0;">
                  <strong>What to Bring:</strong><br>
                  • Valid photo ID<br>
                  • This email or order number<br>
                  • Payment method (if applicable)
                </p>
              </div>

              <!-- Button -->
              <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                <tr>
                  <td align="center" style="background: linear-gradient(135deg, #415a77 0%, #778da9 100%); border-radius: 4px; padding: 14px 30px;">
                    <a href="[DIRECTIONS_LINK]" style="color: #e0e1dd; text-decoration: none; font-weight: bold; font-size: 16px; display: block;">
                      Get Directions
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #0d1b2a; padding: 30px; text-align: center;">
              <p style="color: #778da9; font-size: 14px; margin: 0;">
                Questions? <a href="mailto:support@yourcompany.com" style="color: #778da9;">Contact Us</a> or call [PHONE_NUMBER]
              </p>
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

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'customer', name: 'Customer' },
    { id: 'order', name: 'Order' },
    { id: 'worksheet', name: 'Worksheet' },
    { id: 'pickup', name: 'Pickup' }
  ];

  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedId(id);
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
          <h1>Email Templates</h1>
          <p>Ready-to-use email templates for your software. Copy and customize!</p>
        </div>
      </div>

      <div className="category-filter">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="templates-grid">
        {filteredTemplates.map(template => (
          <div key={template.id} className="template-card">
            <div className="template-header">
              <h3>{template.name}</h3>
              <span className="category-badge">{template.category}</span>
            </div>
            <p className="template-description">{template.description}</p>

            <div className="template-content">
              {/* Visual Preview Section */}
              <div className="visual-preview">
                <div className="preview-label">Visual Preview</div>
                {template.previewImage ? (
                  <img src={template.previewImage} alt={`${template.name} preview`} className="preview-image" />
                ) : (
                  <div className="preview-iframe-container">
                    <iframe
                      srcDoc={template.code}
                      title={`${template.name} preview`}
                      className="preview-iframe"
                      sandbox="allow-same-origin"
                    />
                  </div>
                )}
              </div>

              {/* Code Section */}
              <div className="code-section">
                <div className="code-label">HTML Code</div>
                <div className="code-preview">
                  <pre><code>{template.code}</code></pre>
                </div>
              </div>
            </div>

            <button
              className={`copy-button ${copiedId === template.id ? 'copied' : ''}`}
              onClick={() => copyToClipboard(template.code, template.id)}
            >
              {copiedId === template.id ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                  Copy Code
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailTemplatesPage;
