import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

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
      id: 'testimonials',
      route: null,
      icon: '⭐',
      title: 'Testimonial Carousel',
      description: 'Display customer testimonials in an elegant sliding carousel',
      badge: 'Soon',
      available: false
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
      id: 'social-proof',
      route: null,
      icon: '🔔',
      title: 'Social Proof',
      description: 'Show recent activity notifications to build trust and credibility',
      badge: 'Soon',
      available: false
    }
  ];

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
