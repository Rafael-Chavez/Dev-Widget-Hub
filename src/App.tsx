import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LogoTickerPage from './pages/LogoTickerPage';
import EmailTemplatesPage from './pages/EmailTemplatesPage';
import InstagramFeedPage from './pages/InstagramFeedPage';
import PricingTablePage from './pages/PricingTablePage';
import FAQAccordionPage from './pages/FAQAccordionPage';
import AnnouncementBarPage from './pages/AnnouncementBarPage';
import CountdownTimerPage from './pages/CountdownTimerPage';
import GoogleReviewsPage from './pages/GoogleReviewsPage';
import PopupWidgetPage from './pages/PopupWidgetPage';
import LocalPickupTemplatePage from './pages/LocalPickupTemplatePage';
import QuoteSentTemplatePage from './pages/QuoteSentTemplatePage';
import WelcomeEmailTemplatePage from './pages/WelcomeEmailTemplatePage';
import AccountStatementTemplatePage from './pages/AccountStatementTemplatePage';
import SpinningWheelPage from './pages/SpinningWheelPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logo-ticker" element={<LogoTickerPage />} />
        <Route path="/email-templates" element={<EmailTemplatesPage />} />
        <Route path="/instagram-feed" element={<InstagramFeedPage />} />
        <Route path="/pricing-table" element={<PricingTablePage />} />
        <Route path="/faq-accordion" element={<FAQAccordionPage />} />
        <Route path="/announcement-bar" element={<AnnouncementBarPage />} />
        <Route path="/countdown-timer" element={<CountdownTimerPage />} />
        <Route path="/google-reviews" element={<GoogleReviewsPage />} />
        <Route path="/popup-widget" element={<PopupWidgetPage />} />
        <Route path="/local-pickup-template" element={<LocalPickupTemplatePage />} />
        <Route path="/quote-sent-template" element={<QuoteSentTemplatePage />} />
        <Route path="/welcome-email-template" element={<WelcomeEmailTemplatePage />} />
        <Route path="/account-statement-template" element={<AccountStatementTemplatePage />} />
        <Route path="/spinning-wheel" element={<SpinningWheelPage />} />
      </Routes>
    </Router>
  );
}

export default App;
