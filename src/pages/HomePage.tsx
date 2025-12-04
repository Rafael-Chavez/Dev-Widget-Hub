import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportForm, setReportForm] = useState({
    issueType: 'bug',
    widget: '',
    description: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const widgets = [
    {
      id: 'logo-ticker',
      route: '/logo-ticker',
      icon: '🎞️',
      title: 'Logo Ticker',
      description: 'Create an animated logo carousel with customizable speed, spacing, and styling',
      badge: 'Popular',
      available: true
    },
    {
      id: 'pricing-table',
      route: '/pricing-table',
      icon: '💰',
      title: 'Pricing Table',
      description: 'Quantity-based pricing with automatic savings calculation and discounts',
      badge: null,
      available: true
    },
    {
      id: 'faq-accordion',
      route: '/faq-accordion',
      icon: '❓',
      title: 'FAQ Accordion',
      description: 'Organize frequently asked questions in an expandable accordion layout',
      badge: 'New',
      available: true
    },
    {
      id: 'announcement-bar',
      route: '/announcement-bar',
      icon: '📢',
      title: 'Announcement Bar',
      description: 'Sticky announcement banner for promotions, alerts, and important messages',
      badge: 'New',
      available: true
    },
    {
      id: 'instagram-feed',
      route: '/instagram-feed',
      icon: '📷',
      title: 'Instagram Feed',
      description: 'Display your Instagram profile and posts with a customizable feed widget',
      badge: null,
      available: true
    },
    {
      id: 'email-templates',
      route: '/email-templates',
      icon: '📧',
      title: 'Email Templates',
      description: 'Pre-built email templates ready to copy and customize for your software',
      badge: null,
      available: true
    },
    {
      id: 'countdown-timer',
      route: '/countdown-timer',
      icon: '⏰',
      title: 'Countdown Timer +',
      description: 'Create urgency with a customizable countdown timer for events or offers',
      badge: 'New',
      available: true
    },
    {
      id: 'google-reviews',
      route: '/google-reviews',
      icon: '⭐',
      title: 'Google Reviews',
      description: 'Display Google business reviews with star ratings and customer testimonials',
      badge: 'New',
      available: true
    },
    {
      id: 'popup-widget',
      route: '/popup-widget',
      icon: '🪟',
      title: 'Pop-up Widget',
      description: 'Create customizable pop-up modals for promotions, announcements, and lead capture',
      badge: 'New',
      available: true
    }
  ];

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Create email body
      const emailBody = `
Issue Type: ${reportForm.issueType === 'bug' ? 'Bug' : reportForm.issueType === 'responsive' ? 'Responsive Issue' : 'Suggestion'}
Widget: ${reportForm.widget || 'Not specified'}
User Email: ${reportForm.email || 'Not provided'}

Description:
${reportForm.description}
      `.trim();

      // Using mailto for simplicity - this will open the user's email client
      const mailtoLink = `mailto:info@detailatl.com?subject=Widget Hub Issue Report - ${reportForm.issueType === 'bug' ? 'Bug' : reportForm.issueType === 'responsive' ? 'Responsive Issue' : 'Suggestion'}&body=${encodeURIComponent(emailBody)}`;

      window.location.href = mailtoLink;

      setSubmitMessage('Opening your email client...');
      setTimeout(() => {
        setShowReportModal(false);
        setReportForm({
          issueType: 'bug',
          widget: '',
          description: '',
          email: ''
        });
        setSubmitMessage('');
      }, 2000);
    } catch (error) {
      setSubmitMessage('Error opening email client. Please email us directly at info@detailatl.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <div className="badge-pill">
              <span className="badge-dot"></span>
              Auto-Generate Code Instantly
            </div>
            <h1 className="hero-title">
              Build Beautiful Widgets
              <br />
              <span className="gradient-text">Without Writing Code</span>
            </h1>
            <p className="hero-description">
              Create stunning, customizable widgets for your website in minutes.
              From pricing tables to announcement bars, we've got you covered.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => document.getElementById('widgets-grid')?.scrollIntoView({ behavior: 'smooth' })}>
                <span>Start Generating</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="btn-secondary" onClick={() => document.getElementById('widgets-grid')?.scrollIntoView({ behavior: 'smooth' })}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 3V17M10 17L15 12M10 17L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Explore Widgets</span>
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">{widgets.filter(w => w.available).length}+</div>
                <div className="stat-label">Active Widgets</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">0</div>
                <div className="stat-label">Code Required</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">∞</div>
                <div className="stat-label">Customization</div>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="dashboard-illustration">
              <div className="dashboard-header">
                <div className="dashboard-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="dashboard-title">Widget Builder</div>
              </div>
              <div className="dashboard-content">
                <div className="code-line"></div>
                <div className="code-line short"></div>
                <div className="code-line medium"></div>
                <div className="code-line"></div>
                <div className="code-line short"></div>
                <div className="preview-box">
                  <div className="preview-header">Live Preview</div>
                  <div className="preview-content">
                    <div className="preview-element"></div>
                    <div className="preview-element small"></div>
                    <div className="preview-element medium"></div>
                  </div>
                </div>
              </div>
              <div className="floating-icon icon-1">⚡</div>
              <div className="floating-icon icon-2">🎨</div>
              <div className="floating-icon icon-3">🚀</div>
            </div>
          </div>
        </div>
      </section>

      {/* Widgets Grid Section */}
      <section className="widgets-section" id="widgets-grid">
        <div className="section-header">
          <h2 className="section-title">Available Widgets</h2>
          <p className="section-description">
            Choose from our collection of professionally designed widgets
          </p>
        </div>
        <div className="widgets-grid">
          {widgets.map((widget) => (
            <div
              key={widget.id}
              className={`widget-card ${!widget.available ? 'widget-card-disabled' : ''}`}
              onClick={() => widget.available && widget.route && navigate(widget.route)}
            >
              <div className="widget-card-inner">
                {widget.badge && (
                  <div className={`widget-badge badge-${widget.badge.toLowerCase()}`}>
                    {widget.badge}
                  </div>
                )}
                <div className="widget-icon-wrapper">
                  <div className="widget-icon">{widget.icon}</div>
                  <div className="icon-glow"></div>
                </div>
                <h3 className="widget-title">{widget.title}</h3>
                <p className="widget-description">{widget.description}</p>
                {widget.available ? (
                  <button className="widget-button">
                    <span>Build Widget</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                ) : (
                  <span className="coming-soon-label">Coming Soon</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Report Issue Button */}
      <button
        className="report-issue-btn"
        onClick={() => setShowReportModal(true)}
        aria-label="Report an issue"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 6V10M10 14H10.01M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Report Issue
      </button>

      {/* Report Issue Modal */}
      {showReportModal && (
        <div className="modal-overlay" onClick={() => setShowReportModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Report an Issue</h2>
              <button
                className="modal-close"
                onClick={() => setShowReportModal(false)}
                aria-label="Close modal"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <form onSubmit={handleReportSubmit} className="report-form">
              <div className="form-group">
                <label htmlFor="issueType">Issue Type</label>
                <select
                  id="issueType"
                  value={reportForm.issueType}
                  onChange={(e) => setReportForm({ ...reportForm, issueType: e.target.value })}
                  required
                >
                  <option value="bug">Bug</option>
                  <option value="responsive">Responsive Issue</option>
                  <option value="suggestion">Suggestion</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="widget">Which Widget?</label>
                <select
                  id="widget"
                  value={reportForm.widget}
                  onChange={(e) => setReportForm({ ...reportForm, widget: e.target.value })}
                  required
                >
                  <option value="">Select a widget...</option>
                  {widgets.filter(w => w.available).map((widget) => (
                    <option key={widget.id} value={widget.title}>
                      {widget.title}
                    </option>
                  ))}
                  <option value="general">General / Multiple Widgets</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email (Optional)</label>
                <input
                  type="email"
                  id="email"
                  value={reportForm.email}
                  onChange={(e) => setReportForm({ ...reportForm, email: e.target.value })}
                  placeholder="your@email.com"
                />
                <small>We'll only use this to follow up on your report</small>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={reportForm.description}
                  onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                  placeholder="Please describe the issue or suggestion in detail..."
                  rows={5}
                  required
                />
              </div>

              {submitMessage && (
                <div className={`submit-message ${submitMessage.includes('Error') ? 'error' : 'success'}`}>
                  {submitMessage}
                </div>
              )}

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowReportModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Widget Hub</h3>
            <p>Build beautiful widgets without code</p>
          </div>
          <div className="footer-links">
            <a href="#widgets-grid">Widgets</a>
            <a href="#features">Features</a>
            <a href="#docs">Documentation</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Widget Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
