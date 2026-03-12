import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LocalPickupTemplatePage.css';

interface CodeSection {
  id: string;
  name: string;
  description: string;
  code: string;
}

const AccountStatementTemplatePage: React.FC = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const codeSections: CodeSection[] = [
    {
      id: 'full-template',
      name: 'Account Statement Template',
      description: 'Complete customer account statement with aging and envelope window',
      code: `{% set_title 'Account Statement' %}

<style>
  /* =============================================
     RESET & BASE
  ============================================= */
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Arial Narrow', Arial, sans-serif;
    font-size: 11px;
    color: #1a1a1a;
    background: #e8e8e8;
  }

  /* =============================================
     PAGE WRAPPER — letter-size sheet
  ============================================= */
  #in_container {
    width: 8.5in;
    min-height: 11in;
    margin: 0 auto;
    background: #fff;
    position: relative;
    padding: 0.35in 0.4in 0.3in;
  }

  /* =============================================
     TOP HEADER BAR
  ============================================= */
  #in_header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    border-bottom: 2px solid #1a1a1a;
    padding-bottom: 8px;
    margin-bottom: 10px;
  }

  /* Left: logo + company block */
  .header-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .header-logo img { max-height: 70px; max-width: 120px; }

  .company-info h1 {
    font-size: 15px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: 0.02em;
  }
  .company-info span,
  .company-info a {
    display: block;
    font-size: 10px;
    color: #444;
    text-decoration: none;
  }

  /* Center: contact box */
  .contact-box {
    border: 1px solid #999;
    padding: 6px 12px;
    text-align: center;
    font-size: 10px;
    line-height: 1.6;
    align-self: center;
  }

  /* Right: title + date */
  .header-right {
    text-align: right;
  }
  .header-right h2 {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .date-box {
    display: inline-block;
    border: 1px solid #999;
    min-width: 130px;
  }
  .date-box .date-label {
    background: #f0f0f0;
    border-bottom: 1px solid #999;
    padding: 2px 8px;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .date-box .date-value {
    padding: 3px 8px;
    font-size: 11px;
    font-weight: 600;
  }

  /* =============================================
     CUSTOMER / SUMMARY ROW
  ============================================= */
  #in_customer {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
    gap: 20px;
  }

  /* "To:" address block — positioned for envelope window */
  .billing {
    border: 1px solid #999;
    padding: 8px 12px;
    min-width: 280px;
    min-height: 90px;
  }
  .billing .to-label {
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #555;
    border-bottom: 1px solid #ddd;
    padding-bottom: 3px;
    margin-bottom: 6px;
  }
  .billing h4 {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 2px;
  }
  .billing span {
    font-size: 10px;
    line-height: 1.55;
    color: #333;
  }

  /* Account Summary table */
  .summary { min-width: 300px; }
  .summary table {
    width: 100%;
    border-collapse: collapse;
    font-size: 10px;
  }
  .summary table td {
    padding: 3px 6px;
    border: 1px solid #ccc;
  }
  .summary table td.heading { font-weight: 600; background: #f7f7f7; }
  .summary table td.qty { text-align: right; }
  .summary table tfoot td {
    font-weight: 700;
    font-size: 11px;
    background: #1a1a1a;
    color: #fff;
    border-color: #1a1a1a;
  }
  .summary table tfoot td:last-child { text-align: right; }

  /* Amount Due header */
  .amount-header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 4px;
  }
  .amount-header table {
    border-collapse: collapse;
    font-size: 10px;
    min-width: 300px;
  }
  .amount-header table th {
    border: 1px solid #999;
    padding: 3px 12px;
    text-align: center;
    background: #f0f0f0;
    font-weight: 700;
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .amount-header table td {
    border: 1px solid #999;
    padding: 3px 12px;
    text-align: center;
    font-weight: 700;
    font-size: 12px;
  }

  /* =============================================
     MAIN TRANSACTION TABLE
  ============================================= */
  #in_body {
    margin-bottom: 14px;
  }
  #in_body table {
    width: 100%;
    border-collapse: collapse;
    font-size: 10px;
  }
  #in_body table thead tr {
    background: #1a1a1a;
    color: #fff;
  }
  #in_body table thead th {
    padding: 5px 6px;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 9px;
    letter-spacing: 0.04em;
    border: 1px solid #1a1a1a;
    color: #fff;
  }
  #in_body table tbody td {
    padding: 3px 6px;
    border: 1px solid #ccc;
    vertical-align: top;
  }
  #in_body table tbody tr:nth-child(even) td { background: #fafafa; }
  #in_body table tbody td.qty { text-align: right; font-weight: 600; }
  #in_body table tbody td.text_right { text-align: right; }

  /* =============================================
     OUTSTANDING AGING TABLE
  ============================================= */
  #outstanding_wrap { margin-bottom: 16px; }
  #outstanding_wrap h3 {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 4px;
    color: #444;
  }
  #outstanding {
    width: 100%;
    border-collapse: collapse;
    font-size: 10px;
  }
  #outstanding thead tr { background: #1a1a1a; color: #fff; }
  #outstanding thead th {
    padding: 5px 6px;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    text-align: center;
    border: 1px solid #1a1a1a;
    color: #fff;
  }
  /* Last column: Amount Due highlight */
  #outstanding thead th:last-child { background: #444; color: #fff; }
  #outstanding tbody td {
    padding: 4px 6px;
    border: 1px solid #ccc;
    text-align: center;
    font-weight: 600;
  }
  #outstanding tbody #amount_row td:last-child {
    background: #f0f0f0;
    font-weight: 700;
    font-size: 12px;
    border: 2px solid #1a1a1a;
  }
  #outstanding_notice td {
    padding: 6px 10px;
    font-size: 10px;
    font-style: italic;
  }
  .calm   { background: #e8f4e8; }
  .neutral  { background: #fff8e1; }
  .irate  { background: #fdecea; }
  .furious  { background: #fde0dc; }

  b.arrow::after {
    content: '▲';
    color: #c00;
    font-size: 10px;
    margin-left: 4px;
  }

  /* =============================================
     ENVELOPE FOLD WINDOW AREA
     ============================================
     Standard #10 envelope: fold letter in thirds.
     The BOTTOM third faces out through window.
     This dashed box shows printers / users
     where the address will appear.
     Print: dashed guide lines hide; address stays.
  ============================================= */
  .fold-guide {
    position: absolute;
    left: 0;
    right: 0;
    /* 11in page - 0.35in top pad = 10.65in usable.
       Bottom third starts at ~7.1in from top of container */
    top: 7.1in;
    height: 3.55in;
    border-top: 1px dashed #bbb;
    pointer-events: none;
  }
  .fold-guide::before {
    content: '✂ fold here';
    position: absolute;
    top: -10px;
    left: 10px;
    font-size: 9px;
    color: #bbb;
    letter-spacing: 0.04em;
    background: #fff;
    padding: 0 4px;
  }

  /* The envelope window address — bottom third, left side */
  /* Positioned so it shows through a standard #10 window:
     ~1in from left edge of envelope = ~1.25in from page edge
     ~2in from bottom of envelope  = auto-positioned  */
  .envelope-address {
    position: absolute;
    left: 1in;
    top: 7.6in;    /* inside the bottom fold */
    width: 3.5in;
    min-height: 1in;
    /* Visible dashed outline — hides on print */
    border: 1.5px dashed #aaa;
    padding: 8px 12px;
    background: #fff;
  }
  .envelope-address .env-from {
    font-size: 8px;
    color: #888;
    margin-bottom: 6px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .envelope-address .env-to-name {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 1.3;
  }
  .envelope-address .env-to-address {
    font-size: 11px;
    line-height: 1.55;
    color: #333;
    margin-top: 2px;
  }
  .envelope-address-label {
    position: absolute;
    left: 1in;
    top: 7.46in;
    font-size: 8px;
    color: #bbb;
    letter-spacing: 0.04em;
    background: #fff;
    padding: 0 3px;
  }

  /* Second fold line */
  .fold-guide-2 {
    position: absolute;
    left: 0; right: 0;
    top: 3.9in;
    border-top: 1px dashed #ddd;
    pointer-events: none;
  }
  .fold-guide-2::before {
    content: '✂ fold here';
    position: absolute;
    top: -10px;
    left: 10px;
    font-size: 9px;
    color: #ddd;
    letter-spacing: 0.04em;
    background: #fff;
    padding: 0 4px;
  }

  /* =============================================
     PRINT STYLES
  ============================================= */
  @media print {
    body { background: #fff; }
    #in_container { margin: 0; padding: 0.35in 0.4in 0.3in; }
    /* Hide the dashed guides on print — address stays */
    .fold-guide,
    .fold-guide-2,
    .fold-guide::before,
    .fold-guide-2::before,
    .envelope-address-label { display: none; }
    .envelope-address { border: none; }
  }

  /* =============================================
     UTILITIES
  ============================================= */
  .hundred { width: 100%; }
  .text_right { text-align: right; }
</style>

<div id="in_container">

  <!-- ════════════ FOLD GUIDES (screen only) ════════════ -->
  <div class="fold-guide-2"></div>
  <div class="fold-guide"></div>

  <!-- ════════════ HEADER ════════════ -->
  <div id="in_header">

    <div class="header-left">
      <div class="header-logo">{% logo 90 90 %}</div>
      <div class="company-info">
        <h1>
          {% if fulfillment_system.account.company %}{{ fulfillment_system.account.company }}{% endif %}
        </h1>
        {% if fulfillment_system.account.has_address? %}
        <span>{{ fulfillment_system.account.full_address }}</span>
        {% endif %}
        <a href="http://{{ fulfillment_system.primary_domain }}">{{ fulfillment_system.primary_domain }}</a>
      </div>
    </div>

    <div class="contact-box">
      For invoice questions<br>
      call <strong>{{ fulfillment_system.account.phone }}</strong>
    </div>

    <div class="header-right">
      <h2>Statement</h2>
      <div class="date-box">
        <div class="date-label">Date</div>
        <div class="date-value">
{% unless statement.is_cart_based? %}
          {{ statement.date | date: "%m/%d/%Y" }}
{% else %}
          {{ statement.from_date | date: "%m/%d/%Y" }} – {{ statement.to_date | date: "%m/%d/%Y" }}
{% endunless %}
        </div>
      </div>
    </div>

  </div><!-- /in_header -->

  <!-- ════════════ CUSTOMER + AMOUNT DUE ════════════ -->
  <div id="in_customer">

    <!-- Bill To -->
    <div class="billing">
      <div class="to-label">To:</div>
      <h4>{{ customer.full_name }}</h4>
      <span>{{ customer.full_address }}</span>
    </div>

    <!-- Right side: Amount Due bar + Account Summary -->
    <div>
      <div class="amount-header">
        <table>
          <thead>
            <tr>
              <th>Amount Due</th>
              <th>Amount Enc.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ statement.end_balance | format_currency }}</td>
              <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div><!-- /in_customer -->

  <!-- ════════════ MAIN TABLE ════════════ -->
  <div id="in_body">
    <table class="hundred">

{% unless statement.is_cart_based? %}
      <thead>
        <tr>
          <th width="80">Date</th>
          <th>Transaction</th>
          <th width="90">Amount</th>
          <th width="90">Balance</th>
        </tr>
      </thead>
{% else %}
      <thead>
        <tr>
          <th width="80">Invoice Date</th>
          <th width="70">Invoice #</th>
{% if statement.has_any_po_numbers? %}
          <th>PO #</th>
{% endif %}
{% if statement.is_company_statement? %}
          <th>Customer</th>
{% endif %}
          <th>Description</th>
          <th width="80">Total</th>
          <th width="90">Opening Balance</th>
          <th width="80">Payments</th>
          <th width="80">Refunds</th>
          <th width="90">Closing Balance</th>
        </tr>
      </thead>
{% endunless %}

{% unless statement.is_cart_based? %}
{% assign balance = statement.start_balance %}
{% assign row_count = 1 %}
      <tbody>
        <tr>
          <td>{{ statement.from_date | date: "%m/%d/%Y" }}</td>
          <td>Balance forward</td>
          <td class="text_right">&nbsp;</td>
          <td class="text_right qty">{{ balance | format_currency }}</td>
        </tr>
{% for item in statement.items %}
{% assign row_count = row_count | plus:1 %}
        <tr>
          <td>{{ item.date | date: "%m/%d/%Y" }}</td>
          <td>
{% if item.item_type == 'invoice' %}
INV #{{ item.invoice.order_number }}{% if item.invoice.due_date %}, Due {{ item.invoice.due_date | date: "%m/%d/%Y" }}.{% endif %}
{% for line in item.invoice.line_items %}
<br>&nbsp;&nbsp;--- {{ line.description }}
{% endfor %}
{% elsif item.item_type == 'payment' %}
Payment Received ({{ item.invoice_numbers }})
{% elsif item.item_type == 'refund' %}
Payment Refunded
{% elsif item.item_type == 'credit' %}
Credit for invoice {{ item.credit.invoice.order_number }}
{% endif %}
          </td>
          <td class="text_right">{% if item.increases_balance? %}{{ item.amount | format_currency }}{% assign balance = balance | plus: item.amount %}{% endif %}</td>
          <td class="text_right qty">
{% if item.decreases_balance? %}{% assign balance = balance | minus: item.amount %}{% endif %}
{{ balance | format_currency }}
          </td>
        </tr>
{% endfor %}
{% for i in (row_count..18) %}
        <tr>
          <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td class="qty">&nbsp;</td>
        </tr>
{% endfor %}
      </tbody>

{% else %}
{% assign row_count = 1 %}
      <tbody>
        <tr><td colspan="9"><b>--- Outstanding Invoices Brought Forward ---</b></td></tr>
{% for invoice in statement.outstanding_invoices %}
{% assign row_count = row_count | plus:1 %}
        <tr>
          <td>{{ invoice.invoice_date | date: "%m/%d/%Y" }}</td>
          <td>{{ invoice.invoice_id }}</td>
{% if statement.has_any_po_numbers? %}<td>{{ invoice.po_number }}</td>{% endif %}
{% if statement.is_company_statement? %}<td>{{ invoice.customer.full_name }}</td>{% endif %}
          <td>Charges for invoice (brought forward)</td>
          <td style="border-right:2px solid #999;">{{ invoice.invoice_total }}</td>
          <td>{{ invoice.previous_outstanding }}</td>
          <td>{{ invoice.paid_this_period }}</td>
          <td>{{ invoice.refunded_this_period }}</td>
          <td class="text_right qty">{{ invoice.outstanding }}</td>
        </tr>
{% endfor %}
{% for invoice in statement.outstanding_invoices_with_new_payment %}
{% assign row_count = row_count | plus:1 %}
        <tr>
          <td>{{ invoice.invoice_date | date: "%m/%d/%Y" }}</td>
          <td>{{ invoice.invoice_id }}</td>
{% if statement.has_any_po_numbers? %}<td>{{ invoice.po_number }}</td>{% endif %}
{% if statement.is_company_statement? %}<td>{{ invoice.customer.full_name }}</td>{% endif %}
          <td>Charges for invoice (brought forward)</td>
          <td style="border-right:2px solid #999;">{{ invoice.invoice_total }}</td>
          <td>{{ invoice.previous_outstanding }}</td>
          <td>{{ invoice.paid_this_period }}</td>
          <td>{{ invoice.refunded_this_period }}</td>
          <td class="text_right qty">{{ invoice.outstanding }}</td>
        </tr>
{% endfor %}
{% assign row_count = row_count | plus:1 %}
        <tr><td colspan="9"><b>--- New Invoices ---</b></td></tr>
{% for invoice in statement.new_invoices %}
{% assign row_count = row_count | plus:1 %}
        <tr>
          <td>{{ invoice.invoice_date | date: "%m/%d/%Y" }}</td>
          <td>{{ invoice.invoice_id }}</td>
{% if statement.has_any_po_numbers? %}<td>{{ invoice.po_number }}</td>{% endif %}
{% if statement.is_company_statement? %}<td>{{ invoice.customer.full_name }}</td>{% endif %}
          <td>Charges for invoice</td>
          <td style="border-right:2px solid #999;">{{ invoice.invoice_total }}</td>
          <td>{{ invoice.previous_outstanding }}</td>
          <td>{{ invoice.paid_this_period }}</td>
          <td>{{ invoice.refunded_this_period }}</td>
          <td class="text_right qty">{{ invoice.outstanding }}</td>
        </tr>
{% endfor %}
{% for i in (row_count..18) %}
        <tr>
          <td>&nbsp;</td><td>&nbsp;</td>
{% if statement.has_any_po_numbers? %}<td>&nbsp;</td>{% endif %}
{% if statement.is_company_statement? %}<td>&nbsp;</td>{% endif %}
          <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
          <td class="qty">&nbsp;</td>
        </tr>
{% endfor %}
      </tbody>
{% endunless %}

    </table>
  </div><!-- /in_body -->

  <!-- ════════════ AGING TABLE ════════════ -->
  <div id="outstanding_wrap">
    <table id="outstanding">
      <thead>
        <tr>
          <th>Current</th>
          <th>1-30 Days Past Due</th>
          <th>31-60 Days Past Due</th>
          <th>61-90 Days Past Due</th>
          <th>Over 90 Days Past Due</th>
          <th>Amount Due</th>
        </tr>
      </thead>
      <tbody>
        <tr id="amount_row">
          <td>{{ statement.end_balance | format_currency }}</td>
          <td>{{ statement.due | format_currency }}{% if statement.is_1_day_overdue %}<b class="arrow">&nbsp;</b>{% endif %}</td>
          <td>{{ statement.due_30 | format_currency }}{% if statement.is_30_days_overdue %}<b class="arrow">&nbsp;</b>{% endif %}</td>
          <td>{{ statement.due_60 | format_currency }}{% if statement.is_60_days_overdue %}<b class="arrow">&nbsp;</b>{% endif %}</td>
          <td>{{ statement.due_90 | format_currency }}{% if statement.is_90_days_overdue %}<b class="arrow">&nbsp;</b>{% endif %}</td>
          <td>{{ statement.end_balance | format_currency }}</td>
        </tr>
        {% if statement.is_1_day_overdue %}
        <tr><td colspan="6" id="outstanding_notice" class="calm"><p>{{ fulfillment_system.fc_settings.account_statement_overdue }}</p></td></tr>
        {% elsif statement.is_30_days_overdue %}
        <tr><td colspan="6" id="outstanding_notice" class="neutral"><p>{{ fulfillment_system.fc_settings.account_statement_30_days_overdue }}</p></td></tr>
        {% elsif statement.is_60_days_overdue %}
        <tr><td colspan="6" id="outstanding_notice" class="irate"><p>{{ fulfillment_system.fc_settings.account_statement_60_days_overdue }}</p></td></tr>
        {% elsif statement.is_90_days_overdue %}
        <tr><td colspan="6" id="outstanding_notice" class="furious"><p>{{ fulfillment_system.fc_settings.account_statement_90_days_overdue }}</p></td></tr>
        {% endif %}
      </tbody>
    </table>
  </div>

  <!-- ════════════ ENVELOPE WINDOW AREA (bottom fold) ════════════ -->
  <!-- This block sits in the bottom ⅓ of the page.
       When the letter is folded in thirds (bottom fold comes up first),
       this address block aligns with the window of a standard #10 envelope.
       The dashed border is screen-only and hides on print. -->
  <span class="envelope-address-label">[ envelope window — shows when folded ]</span>
  <div class="envelope-address">
    <div class="env-from">
      {% if fulfillment_system.account.company %}{{ fulfillment_system.account.company }}{% endif %} &bull;
      {% if fulfillment_system.account.has_address? %}{{ fulfillment_system.account.full_address }}{% endif %}
    </div>
    <div class="env-to-name">{{ customer.full_name }}</div>
    <div class="env-to-address">{{ customer.full_address }}</div>
  </div>

</div><!-- /in_container -->`
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
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
            </div>
            <h1>Account Statement</h1>
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

export default AccountStatementTemplatePage;
