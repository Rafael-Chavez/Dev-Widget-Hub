import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmailTemplatesPage.css';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: string;
}

const EmailTemplatesPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const templates: Template[] = [
    {
      id: 'production-worksheet',
      name: 'Production Worksheet',
      description: 'Professional DecoNetwork production template with barcode support',
      category: 'Production',
      preview: '📋'
    },
    {
      id: 'order-confirmation',
      name: 'Order Confirmation',
      description: 'Clean order confirmation email with product details',
      category: 'Transactional',
      preview: '✅'
    },
    {
      id: 'local-pickup',
      name: 'Local Pickup',
      description: 'Order ready for pickup notification with location details',
      category: 'Transactional',
      preview: '📦'
    },
    {
      id: 'welcome-email',
      name: 'Welcome Email',
      description: 'Warm welcome template for new customers',
      category: 'Marketing',
      preview: '👋'
    }
  ];

  const categories = ['all', 'Production', 'Transactional', 'Marketing'];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (templateId: string) => {
    const templateCode = generateTemplateCode(templateId);
    navigator.clipboard.writeText(templateCode);
    setCopiedId(templateId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const generateTemplateCode = (templateId: string): string => {
    if (templateId === 'local-pickup') {
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Ready for Pickup</title>
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .header {
            border-bottom: 2px solid #2c3e50;
            padding-bottom: 15px;
            margin-bottom: 20px;
        }
        .company-name {
            font-size: 24px;
            font-weight: bold;
            color: #2c3e50;
        }
        .content {
            padding: 15px 0;
        }
        h3 {
            color: #2c3e50;
            font-size: 16px;
            margin-top: 25px;
            margin-bottom: 15px;
        }
        .pickup-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
        }
        .pickup-table th {
            background-color: #2c3e50;
            color: #ffffff;
            text-align: left;
            padding: 10px;
            font-size: 13px;
        }
        .pickup-table td {
            border-bottom: 1px solid #eeeeee;
            padding: 10px;
            text-align: left;
            font-size: 13px;
        }
        .pickup-table tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        .pickup-section {
            background-color: #f0fff0;
            border-left: 4px solid #27ae60;
            padding: 15px;
            margin: 20px 0;
            border-radius: 3px;
        }
        .address-box {
            background-color: #f9f9f9;
            border-left: 4px solid #2c3e50;
            padding: 15px;
            margin: 20px 0;
        }
        .footer {
            border-top: 1px solid #eeeeee;
            padding-top: 15px;
            margin-top: 30px;
            font-size: 14px;
            color: #666666;
        }
        .contact-info {
            margin-top: 10px;
        }
        a {
            color: #3498db;
            text-decoration: none;
        }
        .invoice-notice {
            font-weight: bold;
            color: #2c3e50;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo-container">
                {% logo 200 200 %}
            </div>
            <div class="company-name">{{site.name}}</div>
        </div>

        <div class="content">
            <h3>Hello {{ customer.first_name }},</h3>

            <p>Good news! Your order is ready for pickup.</p>

            <div class="pickup-section">
                <h3>Pickup Information</h3>
                <p>Your order is now available for collection. Please reference your invoice number when you arrive:</p>
                <p class="invoice-notice">Invoice #: <strong>{{ order.invoice_number }}</strong>
                {% if order.po_number != blank %}<br>PO #: <strong>{{ order.po_number }}</strong>{% endif %}</p>
            </div>
            <div class="address-box">
                <h3>Pickup Location & Hours</h3>
                <p><strong>Address:</strong>Suwanee, GA 30005</p>
                <p><strong>Business Hours:</strong></p>
                <ul style="margin-top: 0; padding-left: 20px;">
                    <li>Monday - Friday: 9:00 AM - 5:00 PM</li>
                    <li>Saturday: 9:00 AM - 2:00 PM</li>
                    <li>Sunday: Closed</li>
                </ul>
            </div>

            <p>Thank you for your business,</p>
            <p><strong>{{ site.name }}</strong></p>
        </div>

        <div class="footer">
            <div class="contact-info">
                <p>Website: <a href="http://{{ site.primary_domain }}">{{ site.primary_domain }}</a></p>
                {{ message_html }}
            </div>
        </div>
    </div>
</body>
</html>`;
    }

    // Default template
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${templateId}</title>
</head>
<body>
    <!-- Template: ${templateId} -->
</body>
</html>`;
  };

  return (
    <div className="email-templates-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-content">
          <div className="sidebar-header-section">
            <div className="logo-section">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1>Email Templates</h1>
                <p className="version">v2.0.0 • Pro Edition</p>
              </div>
            </div>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-item active">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span>All Templates</span>
            </div>
            <div className="nav-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Production</span>
            </div>
            <div className="nav-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Transactional</span>
            </div>
            <div className="nav-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
              <span>Marketing</span>
            </div>

            <div className="nav-divider">
              <span className="nav-divider-text">Customization</span>
            </div>

            <div className="nav-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              <span>Color Palette</span>
            </div>
          </nav>
        </div>

        <button className="home-button" onClick={() => navigate('/')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Home</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Header */}
        <header className="top-header">
          <div className="header-left">
            <h2 className="page-title">Email Templates</h2>
            <div className="search-container">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search templates by name, category, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="header-right">
            <button className="icon-button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
            <button className="icon-button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <div className="divider"></div>
            <button className="profile-button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Profile</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="content-wrapper">
          <div className="content-header">
            <h3 className="content-title">Professional Email Templates</h3>
            <p className="content-description">Copy-paste ready, fully responsive email templates for all your business needs.</p>
          </div>

          {/* Category Filter */}
          <div className="category-tabs">
            {categories.map(category => (
              <label key={category} className="category-tab">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
                <div className="category-tab-content">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </div>
              </label>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="templates-grid">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="template-card">
                <div className="template-preview">
                  <div className="preview-emoji">{template.preview}</div>
                </div>
                <div className="template-content">
                  <div className="template-header">
                    <div>
                      <h4 className="template-name">{template.name}</h4>
                      <p className="template-description">{template.description}</p>
                    </div>
                  </div>
                  <div className="code-block">
                    <div className="code-content">
                      {generateTemplateCode(template.id).substring(0, 200)}...
                    </div>
                    <button
                      className={`copy-button ${copiedId === template.id ? 'copied' : ''}`}
                      onClick={() => handleCopy(template.id)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        {copiedId === template.id ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
};

export default EmailTemplatesPage;