import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LocalPickupTemplatePage.css';

const ProductionWorksheetTemplate: React.FC = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const templateHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Production Worksheet</title>
    <link rel="stylesheet" href="/barcode/fre3of9x.css">
    <style>
        /* Reset and Base Styles */
        * {
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
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
            background: linear-gradient(135deg, #dadada 0%, #7b7b7b 100%);
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
            background: #dc3545;
            color: white;
        }

        .status-green {
            background: #28a745;
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
            background: #f8f9fa;
            border-bottom: 1px solid #e9ecef;
        }

        .details-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 40px;
        }

        .detail-section h3 {
            color: #495057;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin: 0 0 15px 0;
            border-bottom: 2px solid #007bff;
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
        }

        .detail-label {
            font-weight: 600;
            color: #495057;
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
            border-left: 4px solid #007bff;
            margin: 20px 30px;
            border-radius: 0 6px 6px 0;
        }

        .notes-section h3 {
            color: #007bff;
            margin: 0 0 15px 0;
            font-size: 16px;
        }

        /* Line Items */
        .line-item {
            margin: 30px;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .line-item-header {
            background: linear-gradient(135deg, #495057 0%, #6c757d 100%);
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
            color: #495057;
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
            border: 2px solid #dee2e6;
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
            color: #6c757d;
        }

        /* Size Table */
        .size-table {
            width: 100%;
        }

        .size-table th {
            background: #f8f9fa;
            padding: 8px 12px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            border-bottom: 2px solid #dee2e6;
        }

        .size-table td {
            padding: 8px 12px;
            border-bottom: 1px solid #e9ecef;
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
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #e9ecef;
        }

        .product-view h5 {
            margin: 0 0 15px 0;
            font-size: 14px;
            font-weight: 600;
            color: #495057;
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
            color: #495057;
        }

        /* Team Names Table */
        .team-table {
            width: 100%;
            margin-top: 20px;
            border-collapse: collapse;
        }

        .team-table th {
            background: #495057;
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: 600;
        }

        .team-table td {
            padding: 10px 12px;
            border-bottom: 1px solid #e9ecef;
        }

        .team-table tr:nth-child(even) {
            background: #f8f9fa;
        }

        /* Design Details */
        .design-section {
            margin-top: 30px;
            border-top: 1px solid #e9ecef;
            padding-top: 25px;
        }

        .design-header {
            background: #e9ecef;
            color: #495057;
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
            background: #f8f9fa;
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
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
        }

        .extra-options h4 {
            color: #495057;
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
            border-bottom: 1px solid #e9ecef;
        }

        /* File Attachments */
        .attachments {
            margin-top: 30px;
        }

        .attachment-item {
            display: flex;
            align-items: center;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            margin-bottom: 15px;
        }

        .attachment-preview {
            flex: 0 0 120px;
            margin-right: 20px;
        }

        .attachment-preview img {
            max-width: 100px;
            max-height: 100px;
            border-radius: 6px;
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

        /* Print Styles - Condensed */
        @media print {
            body {
                background: white;
                padding: 0;
                font-size: 9px;
                line-height: 1.1;
                margin: 0;
            }

            #worksheet-container {
                box-shadow: none;
                border-radius: 0;
                max-width: none;
            }

            .header {
                padding: 5px;
                background: #f0f0f0 !important;
                color: #333 !important;
            }

            .notes-section:empty,
            .notes-section:has(p:empty) {
                display: none !important;
            }
        }
    </style>
</head>
<body>
    <div id="worksheet-container">
        <div class="header">
            <div class="header-row">
                <div class="header-logo">
                    {% logo 200 200 %}
                </div>
                {% if order.show_barcode_on_worksheet? %}
                <div class="header-barcode">
                    *{{ order.invoice_barcode }}*
                </div>
                {% endif %}
                <div class="header-status">
                    {% if order.cancelled? %}
                        <div class="status-badge status-red">Cancelled</div>
                    {% elsif is_quote %}
                        {% if order.rejected? %}
                            <div class="status-badge status-red">Rejected</div>
                        {% elsif order.expired? %}
                            <div class="status-badge status-red">Expired</div>
                        {% else %}
                            <div class="status-badge status-green">Awaiting Approval</div>
                        {% endif %}
                    {% else %}
                        {% if order.get_approval_amount_balance > 0 %}
                            <div class="status-badge status-red">{% if order.approval_requires_deposit? %}Deposit{% else %}Payment{% endif %} required: {{ order.get_approval_amount_balance | simple_price_format }}</div>
                        {% elsif order.awaiting_cod_payment? %}
                            <div class="status-badge status-red">C.O.D</div>
                        {% elsif order.get_approval_amount_balance_without_unconfirmed > 0 %}
                            <div class="status-badge status-red">Awaiting Deposit Confirmation</div>
                        {% elsif order.balance > 0 %}
                            {% if order.is_invoiced? %}
                                <div class="status-badge status-red">Balance Due: {{ order.balance | simple_price_format }}</div>
                            {% else %}
                                <div class="status-badge status-red">Balance: {{ order.balance | simple_price_format }}</div>
                            {% endif %}
                        {% elsif order.confirmed_balance > 0 %}
                            <div class="status-badge status-red">Awaiting Payment Confirmation</div>
                        {% else %}
                            <div class="status-badge status-green">Paid In Full</div>
                        {% endif %}
                    {% endif %}
                </div>
            </div>

            <div class="order-info">
                <span class="customer-name">{{ customer.full_name }} | {{ customer.company }}</span>
                <span class="order-number">Production Order #: {{ order.order_number }}</span>
            </div>
        </div>

        <div class="order-details">
            <div class="details-grid">
                <div class="detail-section">
                    <h3>Contact Details</h3>
                    <ul>
                        <li>Tel: {{ customer.phone_number }}</li>
                        <li>Email: {{ customer.email }}</li>
                    </ul>

                    <h3>Shipping Address</h3>
                    <ul>
                        {% unless order.ship_to_billing_address? %}
                            <li>{{ ship_to.full_name }}{% if ship_to.company %}<br>{{ ship_to.company }}{% endif %}</li>
                            <li>{{ ship_to.full_address }}</li>
                        {% else %}
                            <li>{{ ship_to.full_address }}</li>
                        {% endunless %}
                    </ul>
                </div>

                <div class="detail-section">
                    <ul>
                        <li><span class="detail-label">Order date:</span> {{ order.date_ordered | date: "%b %d, %Y" }}</li>
                        <li><span class="detail-label">Due date:</span> <span class="highlight">{{ order.date_due | date: "%b %d, %Y"}}</span></li>
                        <li><span class="detail-label">Ship by:</span> <span class="highlight">{{ order.shipping_method_name }}</span></li>
                    </ul>
                </div>
            </div>
        </div>

        {% if order.show_notes_on_worksheet %}
            {% if order.production_notes.size > 0 %}
                {% assign has_production_notes = false %}
                {% for note in order.production_notes %}
                    {% if note.note_cat == "history" and note.message != blank %}
                        {% assign has_production_notes = true %}
                        {% break %}
                    {% elsif note.content != blank %}
                        {% assign has_production_notes = true %}
                        {% break %}
                    {% endif %}
                {% endfor %}

                {% if has_production_notes %}
                    <div class="notes-section">
                        <h3>Customer Notes</h3>
                        {% for note in order.production_notes %}
                            {% if note.note_cat == "history" && note.message != blank %}
                                <p>{{ note.created_at | date: "%b %d, %Y %I:%M %p"}} - {{ note.user_name }} - {{ note.message }}</p>
                            {% elsif note.content != blank %}
                                <p>{{ note.created_at | date: "%b %d, %Y %I:%M %p"}} - {{ note.user_name }} - {{ note.content }}</p>
                            {% endif %}
                        {% endfor %}
                    </div>
                {% endif %}
            {% endif %}
        {% endif %}

        {% if order.invoice_note and order.invoice_note != blank %}
            <div class="notes-section">
                <h3>Order Notes</h3>
                <p>{{ order.formatted_invoice_note }}</p>
            </div>
        {% endif %}

        {% for item in order.main_items %}
            {% if item.is_divider? %}
                <div class="line-item">
                    <h2 class="line-item-header divider">{{ item.product_name }}</h2>
                </div>
            {% else %}
                <div class="line-item">
                    <h2 class="line-item-header">
                        ITEM: {{ item.number }}
                        {% if item.supplier_product and item.is_not_freeform? %}({{ item.supplier_product.product_code }}){% endif %}
                        {{ item.product_name }}
                    </h2>

                    <div class="line-item-content">
                        <div class="item-summary">
                            <div class="color-section">
                                <h4>Color</h4>
                                {% if item.is_freeform? %}
                                    <div class="color-display">
                                        <span>{{ item.free_form_color }}</span>
                                    </div>
                                {% else %}
                                    {% for color in item.chosen_colors %}
                                        <div class="color-display">
                                            <div class="color-swatch" style="background: {{color.color}};">
                                                {% if color.swatch_image_20 %}
                                                    <img src="{{ color.swatch_image_20 }}" alt="{{ color.color_name }}">
                                                {% endif %}
                                            </div>
                                            <div class="color-name">{{ color.color_name }}</div>
                                        </div>
                                    {% endfor %}
                                {% endif %}
                            </div>

                            <div class="size-section">
                                <h4>Size & Quantity</h4>
                                <table class="size-table">
                                    <thead>
                                        <tr>
                                            <th>Size</th>
                                            <th>Qty</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {% if item.free_form_size %}
                                            <tr>
                                                <td>{{ item.free_form_size }}</td>
                                                <td>-</td>
                                            </tr>
                                        {% else %}
                                            {% for selected_option in item.size_field.selected_options_sorted_by_size %}
                                                <tr>
                                                    <td>{{ selected_option.option_name }}</td>
                                                    <td>{{ selected_option.option_qty }}</td>
                                                </tr>
                                            {% endfor %}
                                        {% endif %}
                                        <tr class="size-total">
                                            <td><strong>Total:</strong></td>
                                            <td><strong>{{ item.qty }}</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="preview-section">
                                {% if order.show_barcode_on_worksheet? %}
                                    <div class="item-barcode">*{{ item.worksheet_barcode }}*</div>
                                {% endif %}

                                <div class="product-images">
                                    {% for view in item.views %}
                                        <div class="product-view">
                                            <h5>{{ view.name }}</h5>
                                            <img src="{{ view.image_url_300}}" alt="{{ view.name }}" />
                                        </div>
                                    {% endfor %}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {% endif %}
        {% endfor %}
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
    <div className="local-pickup-page">
      <div className="sidebar">
        <div className="sidebar-header-section">
          <div className="logo-section">
            <div className="logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <h1>Production Worksheet</h1>
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
                  <h3>Full Template</h3>
                  <p>Professional DecoNetwork production template with barcode support</p>
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
                <pre><code>{templateHTML}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionWorksheetTemplate;
