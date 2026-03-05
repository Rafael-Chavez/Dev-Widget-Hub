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
      id: 'local-pickup',
      name: 'Local Pickup',
      description: 'Order ready for pickup notification with location details',
      category: 'Local Pickup',
      preview: '📦'
    },
    {
      id: 'production-worksheet',
      name: 'Production Worksheet',
      description: 'Professional DecoNetwork production template with barcode support',
      category: 'Production',
      preview: '📋'
    },
    {
      id: 'welcome-email',
      name: 'Welcome Email',
      description: 'Warm welcome template for new customers',
      category: 'Welcome',
      preview: '👋'
    }
  ];

  const categories = ['All Templates', 'Production', 'Local Pickup', 'Welcome'];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'All Templates' || template.category === selectedCategory;
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
            <button className="nav-item" onClick={() => navigate('/')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </button>

            {categories.map((category) => (
              <div
                key={category}
                className={`nav-item ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  {category === 'All Templates' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  )}
                  {category === 'Production' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  )}
                  {category === 'Local Pickup' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  )}
                  {category === 'Welcome' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  )}
                </svg>
                <span>{category}</span>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Header */}
        <header className="top-header">
          <div className="header-left">
            <h2 className="page-title" style={{ color: '#111827' }}>Email Templates</h2>
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
        </header>

        {/* Page Content */}
        <div className="content-wrapper">
          <div className="content-header">
            <h3 className="content-title">Professional Email Templates</h3>
            <p className="content-description">Copy-paste ready, fully responsive email templates for all your business needs.</p>
          </div>

          {/* Templates Grid */}
          <div className="templates-grid-large">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="template-card-large"
                onClick={() => navigate('/local-pickup-template')}
              >
                <div className="template-icon-large">
                  {template.preview}
                </div>
                <div className="template-info-large">
                  <h3 className="template-name-large">{template.name}</h3>
                  <p className="template-description-large">{template.description}</p>
                  <button className="view-template-btn">
                    View Template
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                    </svg>
                  </button>
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