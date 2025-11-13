import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PricingTablePage.css';

interface PricingTier {
  id: string;
  quantity: number;
  pricePerUnit: number;
  popular?: boolean;
}

interface Settings {
  productName: string;
  basePrice: number;
  currency: string;
  tiers: PricingTier[];
  showSavings: boolean;
  accentColor: string;
  bgColor: string;
  textColor: string;
  buttonText: string;
  buttonColor: string;
  showPopularBadge: boolean;
}

const PricingTablePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'content' | 'style'>('content');

  const [settings, setSettings] = useState<Settings>({
    productName: 'Product Units',
    basePrice: 10.00,
    currency: '$',
    tiers: [
      { id: '1', quantity: 12, pricePerUnit: 10.00 },
      { id: '2', quantity: 24, pricePerUnit: 9.50, popular: true },
      { id: '3', quantity: 48, pricePerUnit: 8.50 },
      { id: '4', quantity: 96, pricePerUnit: 7.50 }
    ],
    showSavings: true,
    accentColor: '#3498db',
    bgColor: '#ffffff',
    textColor: '#2c3e50',
    buttonText: 'Order Now',
    buttonColor: '#3498db',
    showPopularBadge: true
  });

  const calculateTotal = (quantity: number, pricePerUnit: number): number => {
    return quantity * pricePerUnit;
  };

  const calculateSavings = (quantity: number, pricePerUnit: number): number => {
    const baseTotal = quantity * settings.basePrice;
    const discountedTotal = quantity * pricePerUnit;
    return baseTotal - discountedTotal;
  };

  const calculateSavingsPercent = (quantity: number, pricePerUnit: number): number => {
    const savings = calculateSavings(quantity, pricePerUnit);
    const baseTotal = quantity * settings.basePrice;
    return (savings / baseTotal) * 100;
  };

  const addTier = () => {
    const newTier: PricingTier = {
      id: Date.now().toString(),
      quantity: 100,
      pricePerUnit: settings.basePrice
    };
    setSettings({
      ...settings,
      tiers: [...settings.tiers, newTier]
    });
  };

  const removeTier = (id: string) => {
    if (settings.tiers.length <= 1) {
      alert('You must have at least one pricing tier');
      return;
    }
    setSettings({
      ...settings,
      tiers: settings.tiers.filter(tier => tier.id !== id)
    });
  };

  const updateTier = (id: string, field: keyof PricingTier, value: any) => {
    setSettings({
      ...settings,
      tiers: settings.tiers.map(tier =>
        tier.id === id ? { ...tier, [field]: value } : tier
      )
    });
  };

  const togglePopular = (id: string) => {
    setSettings({
      ...settings,
      tiers: settings.tiers.map(tier => ({
        ...tier,
        popular: tier.id === id ? !tier.popular : false
      }))
    });
  };

  const generateEmbedCode = (): string => {
    const tiersData = settings.tiers.map(tier => ({
      quantity: tier.quantity,
      pricePerUnit: tier.pricePerUnit,
      popular: tier.popular || false
    }));

    const scriptContent = `(function() {
    const config = {
        productName: '${settings.productName}',
        basePrice: ${settings.basePrice},
        currency: '${settings.currency}',
        tiers: ${JSON.stringify(tiersData)},
        showSavings: ${settings.showSavings},
        accentColor: '${settings.accentColor}',
        bgColor: '${settings.bgColor}',
        textColor: '${settings.textColor}',
        buttonText: '${settings.buttonText}',
        buttonColor: '${settings.buttonColor}',
        showPopularBadge: ${settings.showPopularBadge}
    };

    const container = document.getElementById('pricing-table-container');
    const widget = document.createElement('div');
    widget.style.cssText = 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px 20px; background: ' + config.bgColor + ';';

    const title = document.createElement('h2');
    title.textContent = config.productName;
    title.style.cssText = 'text-align: center; color: ' + config.textColor + '; margin: 0 0 40px; font-size: 32px;';
    widget.appendChild(title);

    const tiersContainer = document.createElement('div');
    tiersContainer.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; max-width: 1200px; margin: 0 auto;';

    config.tiers.forEach(tier => {
        const total = tier.quantity * tier.pricePerUnit;
        const savings = tier.quantity * config.basePrice - total;
        const savingsPercent = (savings / (tier.quantity * config.basePrice)) * 100;

        const card = document.createElement('div');
        card.style.cssText = 'background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); position: relative; transition: transform 0.3s, box-shadow 0.3s; border: ' + (tier.popular ? '3px solid ' + config.accentColor : '1px solid #e0e0e0') + ';';
        card.onmouseenter = function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        };
        card.onmouseleave = function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        };

        if (tier.popular && config.showPopularBadge) {
            const badge = document.createElement('div');
            badge.textContent = 'MOST POPULAR';
            badge.style.cssText = 'position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: ' + config.accentColor + '; color: white; padding: 6px 20px; border-radius: 20px; font-size: 12px; font-weight: 700; letter-spacing: 0.5px;';
            card.appendChild(badge);
        }

        const quantityEl = document.createElement('div');
        quantityEl.textContent = tier.quantity + ' Units';
        quantityEl.style.cssText = 'font-size: 24px; font-weight: 700; color: ' + config.textColor + '; margin-bottom: 15px; text-align: center;';
        card.appendChild(quantityEl);

        const priceEl = document.createElement('div');
        priceEl.style.cssText = 'text-align: center; margin-bottom: 20px;';

        const totalPrice = document.createElement('div');
        totalPrice.innerHTML = '<span style="font-size: 48px; font-weight: 700; color: ' + config.accentColor + ';">' + config.currency + total.toFixed(2) + '</span>';
        priceEl.appendChild(totalPrice);

        const perUnit = document.createElement('div');
        perUnit.textContent = config.currency + tier.pricePerUnit.toFixed(2) + ' per unit';
        perUnit.style.cssText = 'color: #666; font-size: 14px; margin-top: 8px;';
        priceEl.appendChild(perUnit);

        card.appendChild(priceEl);

        if (config.showSavings && savings > 0) {
            const savingsEl = document.createElement('div');
            savingsEl.style.cssText = 'background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%); color: white; padding: 12px; border-radius: 8px; text-align: center; margin-bottom: 20px; font-weight: 600;';
            savingsEl.innerHTML = 'Save ' + config.currency + savings.toFixed(2) + '<br><span style="font-size: 12px; opacity: 0.9;">(' + savingsPercent.toFixed(0) + '% off)</span>';
            card.appendChild(savingsEl);
        }

        const detailsEl = document.createElement('div');
        detailsEl.style.cssText = 'border-top: 1px solid #e0e0e0; padding-top: 20px; margin-bottom: 20px;';

        const details = [
            { label: 'Quantity', value: tier.quantity + ' units' },
            { label: 'Unit Price', value: config.currency + tier.pricePerUnit.toFixed(2) },
            { label: 'Total', value: config.currency + total.toFixed(2) }
        ];

        details.forEach(detail => {
            const row = document.createElement('div');
            row.style.cssText = 'display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; color: ' + config.textColor + ';';
            row.innerHTML = '<span style="color: #666;">' + detail.label + '</span><strong>' + detail.value + '</strong>';
            detailsEl.appendChild(row);
        });

        card.appendChild(detailsEl);

        const button = document.createElement('button');
        button.textContent = config.buttonText;
        button.style.cssText = 'width: 100%; background: ' + config.buttonColor + '; color: white; border: none; padding: 14px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s;';
        button.onmouseenter = function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
        };
        button.onmouseleave = function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        };
        button.onclick = function() {
            alert('Order ' + tier.quantity + ' units for ' + config.currency + total.toFixed(2));
        };
        card.appendChild(button);

        tiersContainer.appendChild(card);
    });

    widget.appendChild(tiersContainer);
    container.appendChild(widget);

    // Add responsive styles
    if (!document.getElementById('pricing-table-styles')) {
        const style = document.createElement('style');
        style.id = 'pricing-table-styles';
        style.textContent = '@media (max-width: 768px) { #pricing-table-container > div > div { grid-template-columns: 1fr !important; } }';
        document.head.appendChild(style);
    }
})();`;

    return '<!-- Pricing Table Widget -->\n<div id="pricing-table-container"></div>\n<script>\n' + scriptContent + '\n</script>';
  };

  const copyEmbedCode = () => {
    const code = generateEmbedCode();
    navigator.clipboard.writeText(code).then(() => {
      alert('Embed code copied to clipboard!');
    });
  };

  return (
    <div className="pricing-table-page">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>Pricing Table</h1>
          <button className="home-btn" onClick={() => navigate('/')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"/>
            </svg>
            Home
          </button>
        </div>

        <div className="tab-navigation">
          <button
            className={`tab-nav-btn ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            Content
          </button>
          <button
            className={`tab-nav-btn ${activeTab === 'style' ? 'active' : ''}`}
            onClick={() => setActiveTab('style')}
          >
            Style
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'content' && (
            <div className="tab-pane active">
              <div className="content-section">
                <h3 className="section-title">Product Info</h3>
                <div className="control-group">
                  <label htmlFor="productName">Product Name</label>
                  <input
                    type="text"
                    id="productName"
                    value={settings.productName}
                    onChange={(e) => setSettings({...settings, productName: e.target.value})}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="basePrice">Base Price (per unit)</label>
                  <input
                    type="number"
                    id="basePrice"
                    step="0.01"
                    min="0"
                    value={settings.basePrice}
                    onChange={(e) => setSettings({...settings, basePrice: parseFloat(e.target.value)})}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="currency">Currency Symbol</label>
                  <input
                    type="text"
                    id="currency"
                    value={settings.currency}
                    onChange={(e) => setSettings({...settings, currency: e.target.value})}
                    maxLength={3}
                  />
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">Pricing Tiers</h3>
                {settings.tiers.map((tier, index) => (
                  <div key={tier.id} className="tier-card">
                    <div className="tier-header">
                      <span className="tier-number">Tier {index + 1}</span>
                      {settings.tiers.length > 1 && (
                        <button className="remove-tier" onClick={() => removeTier(tier.id)}>×</button>
                      )}
                    </div>

                    <div className="control-group">
                      <label>Quantity</label>
                      <input
                        type="number"
                        value={tier.quantity}
                        onChange={(e) => updateTier(tier.id, 'quantity', parseInt(e.target.value))}
                        min="1"
                      />
                    </div>

                    <div className="control-group">
                      <label>Price per Unit</label>
                      <input
                        type="number"
                        step="0.01"
                        value={tier.pricePerUnit}
                        onChange={(e) => updateTier(tier.id, 'pricePerUnit', parseFloat(e.target.value))}
                        min="0"
                      />
                    </div>

                    <div className="tier-info">
                      <div className="info-row">
                        <span>Total:</span>
                        <strong>{settings.currency}{calculateTotal(tier.quantity, tier.pricePerUnit).toFixed(2)}</strong>
                      </div>
                      {calculateSavings(tier.quantity, tier.pricePerUnit) > 0 && (
                        <div className="info-row savings">
                          <span>Savings:</span>
                          <strong>
                            {settings.currency}{calculateSavings(tier.quantity, tier.pricePerUnit).toFixed(2)}
                            ({calculateSavingsPercent(tier.quantity, tier.pricePerUnit).toFixed(0)}%)
                          </strong>
                        </div>
                      )}
                    </div>

                    <div className="control-group">
                      <label>
                        <input
                          type="checkbox"
                          checked={tier.popular || false}
                          onChange={() => togglePopular(tier.id)}
                        />
                        <span>Mark as Popular</span>
                      </label>
                    </div>
                  </div>
                ))}

                <button className="add-tier-btn" onClick={addTier}>
                  + Add Pricing Tier
                </button>
              </div>
            </div>
          )}

          {activeTab === 'style' && (
            <div className="tab-pane active">
              <div className="content-section">
                <h3 className="section-title">Display Options</h3>
                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.showSavings}
                      onChange={(e) => setSettings({...settings, showSavings: e.target.checked})}
                    />
                    <span>Show Savings</span>
                  </label>
                </div>

                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.showPopularBadge}
                      onChange={(e) => setSettings({...settings, showPopularBadge: e.target.checked})}
                    />
                    <span>Show Popular Badge</span>
                  </label>
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">Button Settings</h3>
                <div className="control-group">
                  <label htmlFor="buttonText">Button Text</label>
                  <input
                    type="text"
                    id="buttonText"
                    value={settings.buttonText}
                    onChange={(e) => setSettings({...settings, buttonText: e.target.value})}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="buttonColor">Button Color</label>
                  <input
                    type="color"
                    id="buttonColor"
                    value={settings.buttonColor}
                    onChange={(e) => setSettings({...settings, buttonColor: e.target.value})}
                  />
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">Colors</h3>
                <div className="control-group">
                  <label htmlFor="accentColor">Accent Color</label>
                  <input
                    type="color"
                    id="accentColor"
                    value={settings.accentColor}
                    onChange={(e) => setSettings({...settings, accentColor: e.target.value})}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="bgColor">Background Color</label>
                  <input
                    type="color"
                    id="bgColor"
                    value={settings.bgColor}
                    onChange={(e) => setSettings({...settings, bgColor: e.target.value})}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="textColor">Text Color</label>
                  <input
                    type="color"
                    id="textColor"
                    value={settings.textColor}
                    onChange={(e) => setSettings({...settings, textColor: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="main-content">
        <div className="preview-area">
          <div className="pricing-widget-preview" style={{ background: settings.bgColor }}>
            <h2 style={{ color: settings.textColor }}>{settings.productName}</h2>
            <div className="tiers-container">
              {settings.tiers.map(tier => {
                const total = calculateTotal(tier.quantity, tier.pricePerUnit);
                const savings = calculateSavings(tier.quantity, tier.pricePerUnit);
                const savingsPercent = calculateSavingsPercent(tier.quantity, tier.pricePerUnit);

                return (
                  <div
                    key={tier.id}
                    className={`pricing-card ${tier.popular ? 'popular' : ''}`}
                    style={{
                      borderColor: tier.popular ? settings.accentColor : '#e0e0e0',
                      borderWidth: tier.popular ? '3px' : '1px'
                    }}
                  >
                    {tier.popular && settings.showPopularBadge && (
                      <div className="popular-badge" style={{ background: settings.accentColor }}>
                        MOST POPULAR
                      </div>
                    )}

                    <div className="tier-quantity" style={{ color: settings.textColor }}>
                      {tier.quantity} Units
                    </div>

                    <div className="tier-price">
                      <span className="price-amount" style={{ color: settings.accentColor }}>
                        {settings.currency}{total.toFixed(2)}
                      </span>
                      <div className="price-per-unit">
                        {settings.currency}{tier.pricePerUnit.toFixed(2)} per unit
                      </div>
                    </div>

                    {settings.showSavings && savings > 0 && (
                      <div className="savings-badge">
                        Save {settings.currency}{savings.toFixed(2)}
                        <br />
                        <span>({savingsPercent.toFixed(0)}% off)</span>
                      </div>
                    )}

                    <div className="tier-details">
                      <div className="detail-row">
                        <span>Quantity</span>
                        <strong>{tier.quantity} units</strong>
                      </div>
                      <div className="detail-row">
                        <span>Unit Price</span>
                        <strong>{settings.currency}{tier.pricePerUnit.toFixed(2)}</strong>
                      </div>
                      <div className="detail-row">
                        <span>Total</span>
                        <strong>{settings.currency}{total.toFixed(2)}</strong>
                      </div>
                    </div>

                    <button
                      className="order-button"
                      style={{ background: settings.buttonColor }}
                    >
                      {settings.buttonText}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="export-section">
            <h2>Embed Code</h2>
            <p>Copy and paste this code into your website to display your pricing table.</p>
            <div className="code-box">{generateEmbedCode()}</div>
            <button className="copy-btn" onClick={copyEmbedCode}>Copy to Clipboard</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTablePage;
