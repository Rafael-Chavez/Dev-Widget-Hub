import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FAQAccordionPage.css';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  categoryId?: string;
}

interface FAQCategory {
  id: string;
  name: string;
  faqs: FAQItem[];
}

interface Settings {
  title: string;
  titleTag: 'h1' | 'h2' | 'h3' | 'p';
  faqs: FAQItem[];
  categories: FAQCategory[];
  useCategories: boolean;
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
    name: 'Modern',
    accentColor: '#3498db',
    bgColor: '#ffffff',
    textColor: '#333333',
    questionColor: '#2c3e50',
    borderRadius: 8
  },
  {
    name: 'Minimal',
    accentColor: '#2c2c2c',
    bgColor: '#fafafa',
    textColor: '#6c6c6c',
    questionColor: '#1f1f1f',
    borderRadius: 16
  },
  {
    name: 'Dark',
    accentColor: '#f39c12',
    bgColor: '#2d3748',
    textColor: '#e2e8f0',
    questionColor: '#f7fafc',
    borderRadius: 10
  }
];

const FAQAccordionPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'content' | 'style'>('content');
  const [openFAQs, setOpenFAQs] = useState<Set<string>>(new Set());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<'question' | 'answer' | null>(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());

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
    titleTag: 'h2',
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
    categories: [],
    useCategories: false,
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

  const insertLink = () => {
    if (editingId && editingField === 'answer' && linkText && linkUrl) {
      const faq = settings.faqs.find(f => f.id === editingId);
      if (faq) {
        const linkHtml = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
        updateFAQ(editingId, 'answer', faq.answer + ' ' + linkHtml);
        setShowLinkModal(false);
        setLinkText('');
        setLinkUrl('');
      }
    }
  };

  const addCategory = () => {
    const newCategory: FAQCategory = {
      id: Date.now().toString(),
      name: 'New Category',
      faqs: []
    };
    setSettings({
      ...settings,
      categories: [...settings.categories, newCategory]
    });
  };

  const updateCategory = (id: string, name: string) => {
    setSettings({
      ...settings,
      categories: settings.categories.map(cat =>
        cat.id === id ? { ...cat, name } : cat
      )
    });
  };

  const removeCategory = (id: string) => {
    setSettings({
      ...settings,
      categories: settings.categories.filter(cat => cat.id !== id)
    });
  };

  const addFAQToCategory = (categoryId: string) => {
    const newFAQ: FAQItem = {
      id: Date.now().toString(),
      question: 'New Question',
      answer: 'Answer goes here...',
      categoryId
    };
    setSettings({
      ...settings,
      categories: settings.categories.map(cat =>
        cat.id === categoryId ? { ...cat, faqs: [...cat.faqs, newFAQ] } : cat
      )
    });
  };

  const updateCategoryFAQ = (categoryId: string, faqId: string, field: keyof FAQItem, value: string) => {
    setSettings({
      ...settings,
      categories: settings.categories.map(cat =>
        cat.id === categoryId
          ? { ...cat, faqs: cat.faqs.map(faq => faq.id === faqId ? { ...faq, [field]: value } : faq) }
          : cat
      )
    });
  };

  const removeCategoryFAQ = (categoryId: string, faqId: string) => {
    setSettings({
      ...settings,
      categories: settings.categories.map(cat =>
        cat.id === categoryId
          ? { ...cat, faqs: cat.faqs.filter(faq => faq.id !== faqId) }
          : cat
      )
    });
  };

  const toggleCategory = (id: string) => {
    const newOpenCategories = new Set(openCategories);
    if (newOpenCategories.has(id)) {
      newOpenCategories.delete(id);
    } else {
      newOpenCategories.add(id);
    }
    setOpenCategories(newOpenCategories);
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
    const titleHtml = settings.title
      ? `<${settings.titleTag} style="color: ${settings.questionColor}; margin: 0 0 30px; font-size: 32px; font-weight: 700; text-align: center;">${settings.title}</${settings.titleTag}>`
      : '';

    const faqsHtml = settings.faqs.map((faq, index) => {
      const isDefaultOpen = settings.defaultOpen && index === 0;
      const iconHtml = settings.showIcon
        ? `<span data-icon style="flex-shrink: 0; font-size: 24px; font-weight: bold; color: ${settings.accentColor}; transition: transform 0.3s;">${isDefaultOpen ? '−' : '+'}</span>`
        : '';

      return `<div data-faq-item style="background: ${settings.bgColor}; border: 2px solid ${isDefaultOpen ? settings.accentColor : '#e0e0e0'}; border-radius: ${settings.borderRadius}px; overflow: hidden; transition: all 0.3s;">
      <button onclick="toggleFAQ(this, ${index})" onmouseenter="this.style.backgroundColor='rgba(0,0,0,0.02)'" onmouseleave="this.style.backgroundColor='transparent'" style="width: 100%; padding: 20px; background: transparent; border: none; text-align: left; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 15px; font-size: 18px; font-weight: 600; color: ${settings.questionColor}; transition: all 0.3s;">
        <span>${faq.question}</span>${iconHtml}
      </button>
      <div data-answer style="max-height: ${isDefaultOpen ? '1000px' : '0'}; overflow: hidden; transition: max-height 0.3s ease-out;">
        <div style="padding: 0 20px 20px; color: ${settings.textColor}; font-size: 16px; line-height: 1.6;">${faq.answer}</div>
      </div>
    </div>`;
    }).join('');

    return `<!-- FAQ Accordion Widget -->
<div id="faq-accordion-container" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
  ${titleHtml}
  <div style="display: flex; flex-direction: column; gap: 12px;">
    ${faqsHtml}
  </div>
</div>
<script>
  const openItems = new Set(${settings.defaultOpen ? '[0]' : '[]'});
  function toggleFAQ(btn, index) {
    const item = btn.parentElement;
    const answer = item.querySelector('[data-answer]');
    const icon = btn.querySelector('[data-icon]');
    const isOpen = openItems.has(index);

    if (!${settings.allowMultipleOpen}) {
      document.querySelectorAll('[data-faq-item]').forEach((otherItem, otherIndex) => {
        if (otherIndex !== index) {
          const otherAnswer = otherItem.querySelector('[data-answer]');
          const otherIcon = otherItem.querySelector('[data-icon]');
          if (otherAnswer) otherAnswer.style.maxHeight = '0';
          otherItem.style.borderColor = '#e0e0e0';
          if (otherIcon) { otherIcon.textContent = '+'; otherIcon.style.transform = 'rotate(0deg)'; }
          openItems.delete(otherIndex);
        }
      });
    }

    if (isOpen) {
      openItems.delete(index);
      answer.style.maxHeight = '0';
      if (icon) { icon.textContent = '+'; icon.style.transform = 'rotate(0deg)'; }
      item.style.borderColor = '#e0e0e0';
    } else {
      openItems.add(index);
      answer.style.maxHeight = answer.scrollHeight + 'px';
      if (icon) { icon.textContent = '−'; icon.style.transform = 'rotate(180deg)'; }
      item.style.borderColor = '${settings.accentColor}';
    }
  }
</script>`;
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
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={settings.title}
                    onChange={(e) => setSettings({...settings, title: e.target.value})}
                    placeholder="Frequently Asked Questions"
                  />
                </div>
                <div className="control-group">
                  <label htmlFor="titleTag">Title Tag</label>
                  <div className="segmented-control">
                    {(['h1', 'h2', 'h3', 'p'] as const).map(tag => (
                      <div key={tag} className="segmented-option">
                        <input
                          type="radio"
                          id={`title-${tag}`}
                          name="titleTag"
                          checked={settings.titleTag === tag}
                          onChange={() => setSettings({...settings, titleTag: tag})}
                        />
                        <label htmlFor={`title-${tag}`}>{tag.toUpperCase()}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">FAQ Organization</h3>
                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.useCategories}
                      onChange={(e) => setSettings({...settings, useCategories: e.target.checked})}
                    />
                    <span>Use Categories (Collapsible Sections)</span>
                  </label>
                </div>
              </div>

              {settings.useCategories ? (
                <div className="content-section">
                  <h3 className="section-title">Manage Categories</h3>
                  <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '12px' }}>
                    Create categories to organize your FAQs. Click on text in the preview to edit inline.
                  </p>
                  <button className="add-faq-btn" onClick={addCategory}>
                    + Add Category
                  </button>
                </div>
              ) : (
                <div className="content-section">
                  <h3 className="section-title">Manage FAQs</h3>
                  <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '12px' }}>
                    Click on questions or answers in the preview to edit them inline. Use the button below to add more FAQs.
                  </p>
                  <button className="add-faq-btn" onClick={addFAQ}>
                    + Add FAQ
                  </button>
                </div>
              )}
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
            {settings.title && React.createElement(
              settings.titleTag,
              { style: { color: settings.questionColor, margin: '0 0 40px', fontSize: '36px', fontWeight: '700', textAlign: 'center' as const } },
              settings.title
            )}
            {settings.useCategories ? (
              <div className="faq-categories">
                {settings.categories.map((category) => {
                  const isCategoryOpen = openCategories.has(category.id);
                  return (
                    <div key={category.id} className="faq-category">
                      <div className="faq-category-header" onClick={() => toggleCategory(category.id)}>
                        <h3
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => updateCategory(category.id, e.currentTarget.textContent || '')}
                          style={{ color: settings.questionColor }}
                        >
                          {category.name}
                        </h3>
                        <div className="category-actions">
                          {settings.categories.length > 1 && (
                            <button
                              className="remove-faq-icon"
                              onClick={(e) => { e.stopPropagation(); removeCategory(category.id); }}
                              title="Remove Category"
                            >
                              ×
                            </button>
                          )}
                          <button
                            className="toggle-faq-icon"
                            style={{ color: settings.accentColor }}
                          >
                            {isCategoryOpen ? '−' : '+'}
                          </button>
                        </div>
                      </div>
                      {isCategoryOpen && (
                        <div className="category-faqs">
                          <div className="faq-grid">
                            {category.faqs.map((faq) => {
                              const isOpen = openFAQs.has(faq.id);
                              const isEditingQuestion = editingId === faq.id && editingField === 'question';
                              const isEditingAnswer = editingId === faq.id && editingField === 'answer';

                              return (
                                <div
                                  key={faq.id}
                                  className={`faq-card ${isOpen ? 'open' : ''}`}
                                  style={{
                                    background: settings.bgColor,
                                    borderRadius: `${settings.borderRadius}px`,
                                    borderColor: isOpen ? settings.accentColor : '#e0e0e0'
                                  }}
                                >
                                  <div className="faq-card-header">
                                    <div
                                      className="faq-question-editable"
                                      onClick={() => {
                                        setEditingId(faq.id);
                                        setEditingField('question');
                                      }}
                                      style={{ color: settings.questionColor }}
                                    >
                                      {isEditingQuestion ? (
                                        <input
                                          type="text"
                                          value={faq.question}
                                          onChange={(e) => updateCategoryFAQ(category.id, faq.id, 'question', e.target.value)}
                                          onBlur={() => {
                                            setEditingId(null);
                                            setEditingField(null);
                                          }}
                                          onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                              setEditingId(null);
                                              setEditingField(null);
                                            }
                                          }}
                                          autoFocus
                                          className="inline-edit-input"
                                        />
                                      ) : (
                                        <span>{faq.question}</span>
                                      )}
                                    </div>
                                    <div className="faq-card-actions">
                                      {category.faqs.length > 0 && (
                                        <button
                                          className="remove-faq-icon"
                                          onClick={() => removeCategoryFAQ(category.id, faq.id)}
                                          title="Remove FAQ"
                                        >
                                          ×
                                        </button>
                                      )}
                                      <button
                                        className="toggle-faq-icon"
                                        onClick={() => toggleFAQ(faq.id)}
                                        style={{ color: settings.accentColor }}
                                      >
                                        {isOpen ? '−' : '+'}
                                      </button>
                                    </div>
                                  </div>
                                  {isOpen && (
                                    <div className="faq-answer-editable">
                                      {isEditingAnswer ? (
                                        <div>
                                          <textarea
                                            value={faq.answer}
                                            onChange={(e) => updateCategoryFAQ(category.id, faq.id, 'answer', e.target.value)}
                                            onBlur={() => {
                                              setEditingId(null);
                                              setEditingField(null);
                                            }}
                                            autoFocus
                                            className="inline-edit-textarea"
                                            style={{ color: settings.textColor }}
                                          />
                                          <button
                                            className="add-link-btn"
                                            onClick={() => setShowLinkModal(true)}
                                            onMouseDown={(e) => e.preventDefault()}
                                          >
                                            + Add Link
                                          </button>
                                        </div>
                                      ) : (
                                        <div
                                          onClick={() => {
                                            setEditingId(faq.id);
                                            setEditingField('answer');
                                          }}
                                          style={{ color: settings.textColor }}
                                          className="answer-text"
                                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                                        />
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          <button className="add-faq-to-category-btn" onClick={() => addFAQToCategory(category.id)}>
                            + Add FAQ to {category.name}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
            <div className="faq-grid">
              {settings.faqs.map((faq) => {
                const isOpen = openFAQs.has(faq.id);
                const isEditingQuestion = editingId === faq.id && editingField === 'question';
                const isEditingAnswer = editingId === faq.id && editingField === 'answer';

                return (
                  <div
                    key={faq.id}
                    className={`faq-card ${isOpen ? 'open' : ''}`}
                    style={{
                      background: settings.bgColor,
                      borderRadius: `${settings.borderRadius}px`,
                      borderColor: isOpen ? settings.accentColor : '#e0e0e0'
                    }}
                  >
                    <div className="faq-card-header">
                      <div
                        className="faq-question-editable"
                        onClick={() => {
                          setEditingId(faq.id);
                          setEditingField('question');
                        }}
                        style={{ color: settings.questionColor }}
                      >
                        {isEditingQuestion ? (
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => updateFAQ(faq.id, 'question', e.target.value)}
                            onBlur={() => {
                              setEditingId(null);
                              setEditingField(null);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                setEditingId(null);
                                setEditingField(null);
                              }
                            }}
                            autoFocus
                            className="inline-edit-input"
                          />
                        ) : (
                          <span>{faq.question}</span>
                        )}
                      </div>
                      <div className="faq-card-actions">
                        {settings.faqs.length > 1 && (
                          <button
                            className="remove-faq-icon"
                            onClick={() => removeFAQ(faq.id)}
                            title="Remove FAQ"
                          >
                            ×
                          </button>
                        )}
                        <button
                          className="toggle-faq-icon"
                          onClick={() => toggleFAQ(faq.id)}
                          style={{ color: settings.accentColor }}
                        >
                          {isOpen ? '−' : '+'}
                        </button>
                      </div>
                    </div>
                    {isOpen && (
                      <div className="faq-answer-editable">
                        {isEditingAnswer ? (
                          <div>
                            <textarea
                              value={faq.answer}
                              onChange={(e) => updateFAQ(faq.id, 'answer', e.target.value)}
                              onBlur={() => {
                                setEditingId(null);
                                setEditingField(null);
                              }}
                              autoFocus
                              className="inline-edit-textarea"
                              style={{ color: settings.textColor }}
                            />
                            <button
                              className="add-link-btn"
                              onClick={() => setShowLinkModal(true)}
                              onMouseDown={(e) => e.preventDefault()}
                            >
                              + Add Link
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              setEditingId(faq.id);
                              setEditingField('answer');
                            }}
                            style={{ color: settings.textColor }}
                            className="answer-text"
                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            )}
          </div>

          <div className="export-section">
            <h2>Embed Code</h2>
            <p>Copy and paste this code into your website to display your FAQ accordion.</p>
            <div className="code-box">{generateEmbedCode()}</div>
            <button className="copy-btn" onClick={copyEmbedCode}>Copy to Clipboard</button>
          </div>
        </div>
      </div>

      {showLinkModal && (
        <div className="modal-overlay" onClick={() => setShowLinkModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Add Link</h3>
            <div className="control-group">
              <label>Link Text</label>
              <input
                type="text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="Click here"
                autoFocus
              />
            </div>
            <div className="control-group">
              <label>URL</label>
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowLinkModal(false)}>Cancel</button>
              <button className="insert-btn" onClick={insertLink}>Insert Link</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQAccordionPage;
