import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FAQAccordionPage.css';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface Settings {
  title: string;
  faqs: FAQItem[];
  accentColor: string;
  bgColor: string;
  textColor: string;
  questionColor: string;
  borderRadius: number;
  showIcon: boolean;
  allowMultipleOpen: boolean;
  defaultOpen: boolean;
}

interface Template {
  name: string;
  accentColor: string;
  bgColor: string;
  textColor: string;
  questionColor: string;
  borderRadius: number;
}

const templates: Template[] = [
  {
    name: 'Classic Blue',
    accentColor: '#3498db',
    bgColor: '#ffffff',
    textColor: '#333333',
    questionColor: '#2c3e50',
    borderRadius: 8
  },
  {
    name: 'Frontend Mentor',
    accentColor: '#a729f5',
    bgColor: '#ffffff',
    textColor: '#6b6b6b',
    questionColor: '#1a1a1a',
    borderRadius: 8
  },
  {
    name: 'Clean Minimal',
    accentColor: '#2c2c2c',
    bgColor: '#fafafa',
    textColor: '#6c6c6c',
    questionColor: '#1f1f1f',
    borderRadius: 12
  },
  {
    name: 'Soft Purple',
    accentColor: '#8b7fb8',
    bgColor: '#f5f3ff',
    textColor: '#5f5f5f',
    questionColor: '#2d2d2d',
    borderRadius: 8
  },
  {
    name: 'Professional Blue',
    accentColor: '#4361ee',
    bgColor: '#f8f9fa',
    textColor: '#6c757d',
    questionColor: '#333333',
    borderRadius: 8
  },
  {
    name: 'Modern Purple',
    accentColor: '#9b59b6',
    bgColor: '#f8f9fa',
    textColor: '#4a5568',
    questionColor: '#6b46c1',
    borderRadius: 12
  },
  {
    name: 'Soft Green',
    accentColor: '#27ae60',
    bgColor: '#ffffff',
    textColor: '#2d3748',
    questionColor: '#2f855a',
    borderRadius: 16
  },
  {
    name: 'Elegant Dark',
    accentColor: '#f39c12',
    bgColor: '#2d3748',
    textColor: '#e2e8f0',
    questionColor: '#f7fafc',
    borderRadius: 10
  },
  {
    name: 'Ocean Breeze',
    accentColor: '#16a085',
    bgColor: '#ecf8f8',
    textColor: '#1a5f5f',
    questionColor: '#0e4e4e',
    borderRadius: 14
  },
  {
    name: 'Sunset Orange',
    accentColor: '#e74c3c',
    bgColor: '#fff5f5',
    textColor: '#742a2a',
    questionColor: '#c53030',
    borderRadius: 8
  }
];

const FAQAccordionPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'content' | 'style'>('content');
  const [openFAQs, setOpenFAQs] = useState<Set<string>>(new Set());

  const applyTemplate = (template: Template) => {
    setSettings({
      ...settings,
      accentColor: template.accentColor,
      bgColor: template.bgColor,
      textColor: template.textColor,
      questionColor: template.questionColor,
      borderRadius: template.borderRadius
    });
  };

  const [settings, setSettings] = useState<Settings>({
    title: 'Frequently Asked Questions',
    faqs: [
      {
        id: '1',
        question: 'What is your return policy?',
        answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with your purchase, you can return it for a full refund within 30 days of delivery.'
      },
      {
        id: '2',
        question: 'How long does shipping take?',
        answer: 'Standard shipping typically takes 5-7 business days. Express shipping options are available at checkout for 2-3 day delivery.'
      },
      {
        id: '3',
        question: 'Do you ship internationally?',
        answer: 'Yes! We ship to over 100 countries worldwide. International shipping times vary by location but typically range from 7-14 business days.'
      },
      {
        id: '4',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay.'
      }
    ],
    accentColor: '#3498db',
    bgColor: '#ffffff',
    textColor: '#333333',
    questionColor: '#2c3e50',
    borderRadius: 8,
    showIcon: true,
    allowMultipleOpen: false,
    defaultOpen: false
  });

  const addFAQ = () => {
    const newFAQ: FAQItem = {
      id: Date.now().toString(),
      question: 'New Question',
      answer: 'Answer goes here...'
    };
    setSettings({
      ...settings,
      faqs: [...settings.faqs, newFAQ]
    });
  };

  const removeFAQ = (id: string) => {
    if (settings.faqs.length <= 1) {
      alert('You must have at least one FAQ item');
      return;
    }
    setSettings({
      ...settings,
      faqs: settings.faqs.filter(faq => faq.id !== id)
    });
  };

  const updateFAQ = (id: string, field: keyof FAQItem, value: string) => {
    setSettings({
      ...settings,
      faqs: settings.faqs.map(faq =>
        faq.id === id ? { ...faq, [field]: value } : faq
      )
    });
  };

  const toggleFAQ = (id: string) => {
    const newOpenFAQs = new Set(openFAQs);

    if (settings.allowMultipleOpen) {
      if (newOpenFAQs.has(id)) {
        newOpenFAQs.delete(id);
      } else {
        newOpenFAQs.add(id);
      }
    } else {
      if (newOpenFAQs.has(id)) {
        newOpenFAQs.clear();
      } else {
        newOpenFAQs.clear();
        newOpenFAQs.add(id);
      }
    }

    setOpenFAQs(newOpenFAQs);
  };

  const generateEmbedCode = (): string => {
    const faqsData = settings.faqs.map(faq => ({
      question: faq.question,
      answer: faq.answer
    }));

    const scriptContent = `(function() {
    const config = {
        title: '${settings.title}',
        faqs: ${JSON.stringify(faqsData)},
        accentColor: '${settings.accentColor}',
        bgColor: '${settings.bgColor}',
        textColor: '${settings.textColor}',
        questionColor: '${settings.questionColor}',
        borderRadius: ${settings.borderRadius},
        showIcon: ${settings.showIcon},
        allowMultipleOpen: ${settings.allowMultipleOpen},
        defaultOpen: ${settings.defaultOpen}
    };

    const container = document.getElementById('faq-accordion-container');
    const widget = document.createElement('div');
    widget.style.cssText = 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;';

    if (config.title) {
        const title = document.createElement('h2');
        title.textContent = config.title;
        title.style.cssText = 'color: ' + config.questionColor + '; margin: 0 0 30px; font-size: 32px; font-weight: 700; text-align: center;';
        widget.appendChild(title);
    }

    const accordion = document.createElement('div');
    accordion.style.cssText = 'display: flex; flex-direction: column; gap: 12px;';

    let openItems = new Set();
    if (config.defaultOpen && config.faqs.length > 0) {
        openItems.add(0);
    }

    config.faqs.forEach((faq, index) => {
        const item = document.createElement('div');
        item.style.cssText = 'background: ' + config.bgColor + '; border: 2px solid #e0e0e0; border-radius: ' + config.borderRadius + 'px; overflow: hidden; transition: all 0.3s;';

        const question = document.createElement('button');
        question.style.cssText = 'width: 100%; padding: 20px; background: transparent; border: none; text-align: left; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 15px; font-size: 18px; font-weight: 600; color: ' + config.questionColor + '; transition: all 0.3s;';
        question.textContent = faq.question;

        if (config.showIcon) {
            const icon = document.createElement('span');
            icon.style.cssText = 'flex-shrink: 0; font-size: 24px; font-weight: bold; color: ' + config.accentColor + '; transition: transform 0.3s;';
            icon.textContent = openItems.has(index) ? '−' : '+';
            icon.setAttribute('data-icon', 'true');
            question.appendChild(icon);
        }

        const answer = document.createElement('div');
        answer.style.cssText = 'max-height: ' + (openItems.has(index) ? '1000px' : '0') + '; overflow: hidden; transition: max-height 0.3s ease-out;';

        const answerContent = document.createElement('div');
        answerContent.style.cssText = 'padding: 0 20px 20px; color: ' + config.textColor + '; font-size: 16px; line-height: 1.6;';
        answerContent.textContent = faq.answer;
        answer.appendChild(answerContent);

        question.onclick = function() {
            const isOpen = openItems.has(index);

            if (config.allowMultipleOpen) {
                if (isOpen) {
                    openItems.delete(index);
                    answer.style.maxHeight = '0';
                    if (config.showIcon) {
                        const iconEl = this.querySelector('[data-icon]');
                        if (iconEl) {
                            iconEl.textContent = '+';
                            iconEl.style.transform = 'rotate(0deg)';
                        }
                    }
                    item.style.borderColor = '#e0e0e0';
                } else {
                    openItems.add(index);
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    if (config.showIcon) {
                        const iconEl = this.querySelector('[data-icon]');
                        if (iconEl) {
                            iconEl.textContent = '−';
                            iconEl.style.transform = 'rotate(180deg)';
                        }
                    }
                    item.style.borderColor = config.accentColor;
                }
            } else {
                // Close all others
                accordion.querySelectorAll('[data-faq-item]').forEach((otherItem, otherIndex) => {
                    if (otherIndex !== index) {
                        const otherAnswer = otherItem.querySelector('[data-answer]');
                        const otherQuestion = otherItem.querySelector('button');
                        if (otherAnswer) otherAnswer.style.maxHeight = '0';
                        if (otherItem) otherItem.style.borderColor = '#e0e0e0';
                        if (config.showIcon && otherQuestion) {
                            const otherIcon = otherQuestion.querySelector('[data-icon]');
                            if (otherIcon) {
                                otherIcon.textContent = '+';
                                otherIcon.style.transform = 'rotate(0deg)';
                            }
                        }
                        openItems.delete(otherIndex);
                    }
                });

                if (isOpen) {
                    openItems.delete(index);
                    answer.style.maxHeight = '0';
                    if (config.showIcon) {
                        const iconEl = this.querySelector('[data-icon]');
                        if (iconEl) {
                            iconEl.textContent = '+';
                            iconEl.style.transform = 'rotate(0deg)';
                        }
                    }
                    item.style.borderColor = '#e0e0e0';
                } else {
                    openItems.add(index);
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    if (config.showIcon) {
                        const iconEl = this.querySelector('[data-icon]');
                        if (iconEl) {
                            iconEl.textContent = '−';
                            iconEl.style.transform = 'rotate(180deg)';
                        }
                    }
                    item.style.borderColor = config.accentColor;
                }
            }
        };

        question.onmouseenter = function() {
            this.style.backgroundColor = 'rgba(0,0,0,0.02)';
        };
        question.onmouseleave = function() {
            this.style.backgroundColor = 'transparent';
        };

        answer.setAttribute('data-answer', 'true');
        item.setAttribute('data-faq-item', 'true');
        item.appendChild(question);
        item.appendChild(answer);
        accordion.appendChild(item);

        if (openItems.has(index)) {
            item.style.borderColor = config.accentColor;
        }
    });

    widget.appendChild(accordion);
    container.appendChild(widget);
})();`;

    return '<!-- FAQ Accordion Widget -->\n<div id="faq-accordion-container"></div>\n<script>\n' + scriptContent + '\n</script>';
  };

  const copyEmbedCode = () => {
    const code = generateEmbedCode();
    navigator.clipboard.writeText(code).then(() => {
      alert('Embed code copied to clipboard!');
    });
  };

  return (
    <div className="faq-accordion-page">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>FAQ Accordion</h1>
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
                <h3 className="section-title">Section Title</h3>
                <div className="control-group">
                  <label htmlFor="title">Title (optional)</label>
                  <input
                    type="text"
                    id="title"
                    value={settings.title}
                    onChange={(e) => setSettings({...settings, title: e.target.value})}
                    placeholder="Frequently Asked Questions"
                  />
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">FAQ Items</h3>
                {settings.faqs.map((faq, index) => (
                  <div key={faq.id} className="faq-item-card">
                    <div className="faq-item-header">
                      <span className="faq-number">FAQ {index + 1}</span>
                      {settings.faqs.length > 1 && (
                        <button className="remove-faq" onClick={() => removeFAQ(faq.id)}>×</button>
                      )}
                    </div>

                    <div className="control-group">
                      <label>Question</label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => updateFAQ(faq.id, 'question', e.target.value)}
                        placeholder="Enter your question..."
                      />
                    </div>

                    <div className="control-group">
                      <label>Answer</label>
                      <textarea
                        value={faq.answer}
                        onChange={(e) => updateFAQ(faq.id, 'answer', e.target.value)}
                        placeholder="Enter your answer..."
                        rows={4}
                      />
                    </div>
                  </div>
                ))}

                <button className="add-faq-btn" onClick={addFAQ}>
                  + Add FAQ
                </button>
              </div>
            </div>
          )}

          {activeTab === 'style' && (
            <div className="tab-pane active">
              <div className="content-section">
                <h3 className="section-title">Templates</h3>
                <div className="control-group">
                  <label htmlFor="template">Choose a Style Template</label>
                  <div className="template-grid">
                    {templates.map((template, index) => (
                      <button
                        key={index}
                        className="template-btn"
                        onClick={() => applyTemplate(template)}
                        title={`Apply ${template.name} theme`}
                      >
                        <div className="template-preview" style={{ background: template.bgColor, border: `2px solid ${template.accentColor}` }}>
                          <span style={{ color: template.questionColor, fontSize: '11px', fontWeight: '600' }}>
                            {template.name}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">Behavior</h3>
                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.allowMultipleOpen}
                      onChange={(e) => setSettings({...settings, allowMultipleOpen: e.target.checked})}
                    />
                    <span>Allow Multiple Items Open</span>
                  </label>
                </div>

                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.defaultOpen}
                      onChange={(e) => setSettings({...settings, defaultOpen: e.target.checked})}
                    />
                    <span>First Item Open by Default</span>
                  </label>
                </div>

                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.showIcon}
                      onChange={(e) => setSettings({...settings, showIcon: e.target.checked})}
                    />
                    <span>Show +/- Icons</span>
                  </label>
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">Appearance</h3>
                <div className="control-group">
                  <label htmlFor="borderRadius">
                    <span className="control-label-text">Border Radius</span>
                    <span className="control-value">{settings.borderRadius}px</span>
                  </label>
                  <input
                    type="range"
                    id="borderRadius"
                    min="0"
                    max="30"
                    value={settings.borderRadius}
                    onChange={(e) => setSettings({...settings, borderRadius: parseInt(e.target.value)})}
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
                  <label htmlFor="questionColor">Question Color</label>
                  <input
                    type="color"
                    id="questionColor"
                    value={settings.questionColor}
                    onChange={(e) => setSettings({...settings, questionColor: e.target.value})}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="textColor">Answer Text Color</label>
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
          <div className="faq-widget-preview">
            {settings.title && (
              <h2 style={{ color: settings.questionColor }}>{settings.title}</h2>
            )}
            <div className="faq-accordion">
              {settings.faqs.map((faq) => {
                const isOpen = openFAQs.has(faq.id);

                return (
                  <div
                    key={faq.id}
                    className={`faq-item ${isOpen ? 'open' : ''}`}
                    style={{
                      background: settings.bgColor,
                      borderRadius: `${settings.borderRadius}px`,
                      borderColor: isOpen ? settings.accentColor : '#e0e0e0'
                    }}
                  >
                    <button
                      className="faq-question"
                      onClick={() => toggleFAQ(faq.id)}
                      style={{ color: settings.questionColor }}
                    >
                      <span>{faq.question}</span>
                      {settings.showIcon && (
                        <span
                          className="faq-icon"
                          style={{
                            color: settings.accentColor,
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                          }}
                        >
                          {isOpen ? '−' : '+'}
                        </span>
                      )}
                    </button>
                    <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                      <div className="faq-answer-content" style={{ color: settings.textColor }}>
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="export-section">
            <h2>Embed Code</h2>
            <p>Copy and paste this code into your website to display your FAQ accordion.</p>
            <div className="code-box">{generateEmbedCode()}</div>
            <button className="copy-btn" onClick={copyEmbedCode}>Copy to Clipboard</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQAccordionPage;
