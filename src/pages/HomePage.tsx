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

  const getWidgetIcon = (id: string) => {
    const icons: { [key: string]: JSX.Element } = {
      'logo-ticker': (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7H21M3 12H21M3 17H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M7 7V17M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      'pricing-table': (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M3 10H21M8 14H16M10 17H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      'faq-accordion': (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 17V17.01M12 14C12 13 13 12.5 13 11.5C13 10.5 12.5 10 11.5 10C10.5 10 10 10.5 10 11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      'announcement-bar': (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M15 5H9L3 8V16L9 19H15M15 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      'instagram-feed': (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
        </svg>
      ),
      'email-templates': (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M3 7L12 13L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      'countdown-timer': (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="13" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 9V13L15 15M9 3H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      'google-reviews': (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      'popup-widget': (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 2V5M16 2V5M8 19V22M16 19V22M2 8H5M19 8H22M2 16H5M19 16H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      'spinning-wheel': (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 3V12L17 17M12 3L7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      'column-plus-plus': (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="7" height="16" rx="1" stroke="currentColor" strokeWidth="2"/>
          <rect x="14" y="4" width="7" height="16" rx="1" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    };
    return icons[id] || icons['faq-accordion'];
  };

  const widgets = [
    {
      id: 'logo-ticker',
      route: '/logo-ticker',
      title: 'Logo Ticker',
      description: 'Create an animated logo carousel with customizable speed, spacing, and styling',
      badge: 'Popular',
      available: true
    },
    {
      id: 'pricing-table',
      route: '/pricing-table',
      title: 'Pricing Table',
      description: 'Quantity-based pricing with automatic savings calculation and discounts',
      badge: null,
      available: true
    },
    {
      id: 'faq-accordion',
      route: '/faq-accordion',
      title: 'FAQ Accordion',
      description: 'Organize frequently asked questions in an expandable accordion layout',
      badge: 'New',
      available: true
    },
    {
      id: 'announcement-bar',
      route: '/announcement-bar',
      title: 'Announcement Bar',
      description: 'Sticky announcement banner for promotions, alerts, and important messages',
      badge: 'New',
      available: true
    },
    {
      id: 'instagram-feed',
      route: '/instagram-feed',
      title: 'Instagram Feed',
      description: 'Display your Instagram profile and posts with a customizable feed widget',
      badge: null,
      available: true
    },
    {
      id: 'email-templates',
      route: '/email-templates',
      title: 'Email Templates',
      description: 'Pre-built email templates ready to copy and customize for your software',
      badge: null,
      available: true
    },
    {
      id: 'countdown-timer',
      route: '/countdown-timer',
      title: 'Countdown Timer +',
      description: 'Create urgency with a customizable countdown timer for events or offers',
      badge: 'New',
      available: true
    },
    {
      id: 'google-reviews',
      route: '/google-reviews',
      title: 'Google Reviews',
      description: 'Display Google business reviews with star ratings and customer testimonials',
      badge: 'New',
      available: true
    },
    {
      id: 'popup-widget',
      route: '/popup-widget',
      title: 'Pop-up Widget',
      description: 'Create customizable pop-up modals for promotions, announcements, and lead capture',
      badge: 'New',
      available: true
    },
    {
      id: 'spinning-wheel',
      route: '/spinning-wheel',
      title: 'Spinning Wheel',
      description: 'Gamified email capture with customizable prizes, probabilities, and notifications',
      badge: 'New',
      available: true
    },
    {
      id: 'column-plus-plus',
      route: '/column-plus-plus',
      title: 'Column++',
      description: 'Create unlimited columns with adjustable widths, headers, and media content',
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
                  <div className="widget-icon">{getWidgetIcon(widget.id)}</div>
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
