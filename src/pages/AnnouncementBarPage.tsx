import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Countdown Timer Component
interface CountdownTimerProps {
  endDate: string;
  bgColor: string;
  textColor: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endDate, bgColor, textColor }) => {
  const [timeLeft, setTimeLeft] = useState('00:00:00:00');

  useEffect(() => {
    const updateCountdown = () => {
      const end = new Date(`${endDate}T23:59:59`).getTime();
      const now = new Date().getTime();
      const distance = end - now;

      if (distance < 0) {
        setTimeLeft('EXPIRED');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(
        String(days).padStart(2, '0') + ':' +
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0')
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <span
      className="px-3 py-1 rounded-md text-xs font-bold font-mono"
      style={{
        backgroundColor: bgColor,
        color: textColor
      }}
    >
      {timeLeft}
    </span>
  );
};

interface Settings {
  message: string;
  buttonText: string;
  buttonUrl: string;
  showButton: boolean;
  buttonPosition: 'left' | 'right';
  showCloseButton: boolean;
  position: 'top' | 'bottom';
  bgColor: string;
  bgType: 'solid' | 'gradient' | 'image';
  bgGradientStart: string;
  bgGradientEnd: string;
  bgImageUrl: string;
  textColor: string;
  buttonBgColor: string;
  buttonTextColor: string;
  fontSize: number;
  padding: number;
  animation: 'none' | 'slide' | 'fade';
  closeable: boolean;
  fontFamily: string;
  actionType: 'none' | 'link' | 'button' | 'form';
  actionUrl: string;
  actionButtonText: string;
  formPlaceholder: string;
  formButtonText: string;
  visualElement: 'none' | 'badge' | 'icon' | 'image' | 'countdown';
  visualBadgeText: string;
  visualIcon: string;
  visualImageUrl: string;
  countdownDate: string;
  displaySchedule: 'always' | 'first-visit' | 'time-limited';
  scheduleDays: number;
  barLinkType: 'none' | 'url' | 'email' | 'phone';
  barLinkValue: string;
}

interface Template {
  name: string;
  message: string;
  buttonText: string;
  buttonUrl: string;
  bgColor: string;
  textColor: string;
  buttonBgColor: string;
  buttonTextColor: string;
}

const templates: Template[] = [
  {
    name: 'Sale Promo',
    message: 'FLASH SALE: 50% OFF SITEWIDE! USE CODE: SUMMER50',
    buttonText: 'Shop Now',
    buttonUrl: '#',
    bgColor: '#ec5b13',
    textColor: '#ffffff',
    buttonBgColor: '#ffffff',
    buttonTextColor: '#ec5b13'
  },
  {
    name: 'Free Shipping',
    message: '🚚 Free Shipping on Orders Over $50 - Limited Time Only!',
    buttonText: 'Shop Now',
    buttonUrl: '#',
    bgColor: '#27ae60',
    textColor: '#ffffff',
    buttonBgColor: '#ffffff',
    buttonTextColor: '#27ae60'
  },
  {
    name: 'New Arrival',
    message: '✨ New Collection Just Dropped! Check Out The Latest Styles',
    buttonText: 'Explore Now',
    buttonUrl: '#',
    bgColor: '#8e44ad',
    textColor: '#ffffff',
    buttonBgColor: '#ffffff',
    buttonTextColor: '#8e44ad'
  },
  {
    name: 'Countdown',
    message: '⏰ Sale Ends in 24 Hours - Don\'t Miss Out!',
    buttonText: 'Shop Now',
    buttonUrl: '#',
    bgColor: '#e74c3c',
    textColor: '#ffffff',
    buttonBgColor: '#ffffff',
    buttonTextColor: '#e74c3c'
  }
];

const AnnouncementBarPage: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(0);

  const [settings, setSettings] = useState<Settings>({
    message: templates[0].message,
    buttonText: templates[0].buttonText,
    buttonUrl: templates[0].buttonUrl,
    showButton: true,
    buttonPosition: 'right',
    showCloseButton: true,
    position: 'top',
    bgColor: templates[0].bgColor,
    bgType: 'solid',
    bgGradientStart: '#ec5b13',
    bgGradientEnd: '#f95959',
    bgImageUrl: '',
    textColor: templates[0].textColor,
    buttonBgColor: templates[0].buttonBgColor,
    buttonTextColor: templates[0].buttonTextColor,
    fontSize: 14,
    padding: 12,
    animation: 'slide',
    closeable: true,
    fontFamily: 'system-ui',
    actionType: 'button',
    actionUrl: '#',
    actionButtonText: 'Shop Now',
    formPlaceholder: 'Enter your email...',
    formButtonText: 'Submit',
    visualElement: 'icon',
    visualBadgeText: 'NEW',
    visualIcon: '🔥',
    visualImageUrl: '',
    countdownDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
    displaySchedule: 'always',
    scheduleDays: 7,
    barLinkType: 'none',
    barLinkValue: ''
  });

  const applyTemplate = (template: Template, index: number) => {
    setSelectedTemplate(index);
    setSettings({
      ...settings,
      message: template.message,
      buttonText: template.buttonText,
      buttonUrl: template.buttonUrl,
      bgColor: template.bgColor,
      textColor: template.textColor,
      buttonBgColor: template.buttonBgColor,
      buttonTextColor: template.buttonTextColor,
      actionButtonText: template.buttonText
    });
    setIsVisible(true);
  };

  const generateEmbedCode = (): string => {
    // Background style based on type
    let backgroundStyle = '';
    if (settings.bgType === 'solid') {
      backgroundStyle = `background-color: ${settings.bgColor};`;
    } else if (settings.bgType === 'gradient') {
      backgroundStyle = `background: linear-gradient(135deg, ${settings.bgGradientStart}, ${settings.bgGradientEnd});`;
    } else if (settings.bgType === 'image' && settings.bgImageUrl) {
      backgroundStyle = `background-image: url('${settings.bgImageUrl}'); background-size: cover; background-position: center;`;
    } else {
      backgroundStyle = `background-color: ${settings.bgColor};`;
    }

    const visualIconHtml = settings.visualElement === 'icon' ? `<span style="font-size: 20px; margin-right: 8px;">${settings.visualIcon}</span>` : '';
    const visualBadgeHtml = settings.visualElement === 'badge' ? `<span style="background-color: ${settings.buttonBgColor}; color: ${settings.buttonTextColor}; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: bold; text-transform: uppercase; margin-right: 8px;">${settings.visualBadgeText}</span>` : '';
    const visualImageHtml = settings.visualElement === 'image' && settings.visualImageUrl ? `<img src="${settings.visualImageUrl}" alt="" style="height: 30px; margin-right: 8px;">` : '';
    const visualCountdownHtml = settings.visualElement === 'countdown' ? `<span id="countdown-timer" style="background-color: ${settings.buttonBgColor}; color: ${settings.buttonTextColor}; padding: 4px 12px; border-radius: 6px; font-size: 11px; font-weight: bold; margin-right: 8px; font-family: monospace;">00:00:00:00</span>` : '';

    let actionHtml = '';
    if (settings.actionType === 'button') {
      actionHtml = `<a href="${settings.actionUrl}" style="background-color: ${settings.buttonBgColor}; color: ${settings.buttonTextColor}; padding: 6px 16px; border-radius: 9999px; font-size: 11px; font-weight: bold; text-transform: uppercase; text-decoration: none; margin-left: 16px; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">${settings.actionButtonText}</a>`;
    } else if (settings.actionType === 'form') {
      actionHtml = `<form onsubmit="alert('Email submitted!'); return false;" style="display: flex; gap: 8px; margin-left: 16px;"><input type="email" placeholder="${settings.formPlaceholder}" required style="padding: 6px 12px; border-radius: 6px; border: none; font-size: 12px; min-width: 200px;"><button type="submit" style="background-color: ${settings.buttonBgColor}; color: ${settings.buttonTextColor}; padding: 6px 16px; border-radius: 6px; font-size: 11px; font-weight: bold; text-transform: uppercase; border: none; cursor: pointer; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">${settings.formButtonText}</button></form>`;
    }

    const closeButtonHtml = settings.showCloseButton ? `<button onclick="document.getElementById('announcement-bar').style.display='none'; localStorage.setItem('announcementBarClosed', 'true');" style="position: absolute; right: 16px; background: none; border: none; color: ${settings.textColor}; font-size: 24px; cursor: pointer; opacity: 0.7; padding: 0; line-height: 1;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.7'">×</button>` : '';
    const positionStyle = settings.position === 'top' ? 'top: 0;' : 'bottom: 0;';

    // Countdown timer script
    const countdownScript = settings.visualElement === 'countdown' ? `
  // Countdown Timer
  function updateCountdown() {
    const endDate = new Date('${settings.countdownDate}T23:59:59').getTime();
    const now = new Date().getTime();
    const distance = endDate - now;

    if (distance < 0) {
      document.getElementById('countdown-timer').textContent = 'EXPIRED';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('countdown-timer').textContent =
      String(days).padStart(2, '0') + ':' +
      String(hours).padStart(2, '0') + ':' +
      String(minutes).padStart(2, '0') + ':' +
      String(seconds).padStart(2, '0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);` : '';

    // Display schedule script
    let scheduleScript = '';
    if (settings.displaySchedule === 'first-visit') {
      scheduleScript = `
  // First visit only
  if (localStorage.getItem('announcementBarSeen') === 'true') {
    document.getElementById('announcement-bar').style.display = 'none';
  } else {
    localStorage.setItem('announcementBarSeen', 'true');
  }`;
    } else if (settings.displaySchedule === 'time-limited') {
      scheduleScript = `
  // Time-limited display
  const firstSeen = localStorage.getItem('announcementBarFirstSeen');
  const now = new Date().getTime();

  if (!firstSeen) {
    localStorage.setItem('announcementBarFirstSeen', now);
  } else {
    const daysPassed = (now - parseInt(firstSeen)) / (1000 * 60 * 60 * 24);
    if (daysPassed > ${settings.scheduleDays}) {
      document.getElementById('announcement-bar').style.display = 'none';
    }
  }`;
    }

    return `<!-- Announcement Bar Widget -->
<div id="announcement-bar" style="${backgroundStyle} color: ${settings.textColor}; padding: 12px 24px; display: flex; align-items: center; justify-content: center; gap: 12px; position: relative; width: 100%; ${positionStyle} left: 0; z-index: 1000; font-family: system-ui, -apple-system, sans-serif;">
  ${visualIconHtml}${visualBadgeHtml}${visualImageHtml}${visualCountdownHtml}<p style="margin: 0; font-size: ${settings.fontSize}px; font-weight: bold; letter-spacing: 0.025em;">${settings.message}</p>${actionHtml}${closeButtonHtml}
</div>
<script>
  if (localStorage.getItem('announcementBarClosed') === 'true') {
    document.getElementById('announcement-bar').style.display = 'none';
  }${countdownScript}${scheduleScript}
</script>`;
  };

  const copyEmbedCode = () => {
    const code = generateEmbedCode();
    navigator.clipboard.writeText(code).then(() => {
      alert('Code copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy:', err);
      alert('Failed to copy code. Please try again.');
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-[#ec5b13] p-1.5 rounded-lg text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">BarStudio</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </button>
          <div className="h-6 w-[1px] bg-slate-200"></div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-[#ec5b13] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Guides
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-80 border-r border-slate-200 bg-white flex flex-col overflow-y-auto">
          <div className="p-6 space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Configuration</h3>
              <div className="space-y-6">
                {/* Template Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2 text-slate-900">
                    <svg className="w-5 h-5 text-[#ec5b13]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                    </svg>
                    Choose Template
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {templates.map((template, index) => (
                      <button
                        key={index}
                        onClick={() => applyTemplate(template, index)}
                        className={`px-3 py-2 text-xs font-semibold rounded-lg border-2 transition-all ${
                          selectedTemplate === index
                            ? 'border-[#ec5b13] bg-[#ec5b13]/10 text-[#ec5b13]'
                            : 'border-slate-100 hover:border-slate-200 text-slate-900'
                        }`}
                      >
                        {template.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Announcement Text */}
                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2 text-slate-900">
                    <svg className="w-5 h-5 text-[#ec5b13]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Announcement Text
                  </label>
                  <textarea
                    className="w-full rounded-xl border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-[#ec5b13] focus:border-[#ec5b13]"
                    placeholder="Enter your message here..."
                    rows={3}
                    value={settings.message}
                    onChange={(e) => setSettings({...settings, message: e.target.value})}
                  />
                </div>

                {/* Background Type */}
                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2 text-slate-900">
                    <svg className="w-5 h-5 text-[#ec5b13]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    Background Type
                  </label>
                  <select
                    className="w-full rounded-xl border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-[#ec5b13] focus:border-[#ec5b13]"
                    value={settings.bgType}
                    onChange={(e) => setSettings({...settings, bgType: e.target.value as any})}
                  >
                    <option value="solid">Solid Color</option>
                    <option value="gradient">Gradient</option>
                    <option value="image">Background Image</option>
                  </select>

                  {settings.bgType === 'gradient' && (
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="color"
                        className="w-full h-10 rounded-xl border-slate-200 cursor-pointer"
                        value={settings.bgGradientStart}
                        onChange={(e) => setSettings({...settings, bgGradientStart: e.target.value})}
                        title="Start Color"
                      />
                      <input
                        type="color"
                        className="w-full h-10 rounded-xl border-slate-200 cursor-pointer"
                        value={settings.bgGradientEnd}
                        onChange={(e) => setSettings({...settings, bgGradientEnd: e.target.value})}
                        title="End Color"
                      />
                    </div>
                  )}

                  {settings.bgType === 'image' && (
                    <input
                      type="url"
                      className="w-full rounded-xl border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-[#ec5b13] focus:border-[#ec5b13] px-3 py-2"
                      placeholder="Enter background image URL..."
                      value={settings.bgImageUrl}
                      onChange={(e) => setSettings({...settings, bgImageUrl: e.target.value})}
                    />
                  )}
                </div>

                {/* Visual Element */}
                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2 text-slate-900">
                    <svg className="w-5 h-5 text-[#ec5b13]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Visual Element
                  </label>
                  <select
                    className="w-full rounded-xl border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-[#ec5b13] focus:border-[#ec5b13]"
                    value={settings.visualElement}
                    onChange={(e) => setSettings({...settings, visualElement: e.target.value as any})}
                  >
                    <option value="icon">Fire Icon (Hot Sale)</option>
                    <option value="badge">Badge</option>
                    <option value="image">Image</option>
                    <option value="countdown">Countdown Timer</option>
                    <option value="none">None</option>
                  </select>

                  {settings.visualElement === 'image' && (
                    <input
                      type="url"
                      className="w-full rounded-xl border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-[#ec5b13] focus:border-[#ec5b13] px-3 py-2"
                      placeholder="Enter image URL..."
                      value={settings.visualImageUrl}
                      onChange={(e) => setSettings({...settings, visualImageUrl: e.target.value})}
                    />
                  )}

                  {settings.visualElement === 'countdown' && (
                    <div className="space-y-2">
                      <label className="text-xs text-slate-600">Countdown End Date</label>
                      <input
                        type="date"
                        className="w-full rounded-xl border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-[#ec5b13] focus:border-[#ec5b13] px-3 py-2"
                        value={settings.countdownDate}
                        onChange={(e) => setSettings({...settings, countdownDate: e.target.value})}
                      />
                    </div>
                  )}
                </div>

                {/* Action Element */}
                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2 text-slate-900">
                    <svg className="w-5 h-5 text-[#ec5b13]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                    Action Element
                  </label>
                  <select
                    className="w-full rounded-xl border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-[#ec5b13] focus:border-[#ec5b13]"
                    value={settings.actionType}
                    onChange={(e) => setSettings({...settings, actionType: e.target.value as any})}
                  >
                    <option value="button">Primary Button (Shop Now)</option>
                    <option value="link">Secondary Link</option>
                    <option value="form">Email Input Field</option>
                    <option value="none">No Action</option>
                  </select>

                  {settings.actionType === 'form' && (
                    <>
                      <input
                        type="text"
                        className="w-full rounded-xl border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-[#ec5b13] focus:border-[#ec5b13] px-3 py-2"
                        placeholder="Email placeholder..."
                        value={settings.formPlaceholder}
                        onChange={(e) => setSettings({...settings, formPlaceholder: e.target.value})}
                      />
                      <input
                        type="text"
                        className="w-full rounded-xl border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-[#ec5b13] focus:border-[#ec5b13] px-3 py-2"
                        placeholder="Button text..."
                        value={settings.formButtonText}
                        onChange={(e) => setSettings({...settings, formButtonText: e.target.value})}
                      />
                    </>
                  )}
                </div>

                {/* Additional Settings */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Additional Settings</h4>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between cursor-pointer group">
                      <span className="text-sm text-slate-900">Show Close Button</span>
                      <div className="relative inline-flex items-center">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={settings.showCloseButton}
                          onChange={(e) => setSettings({...settings, showCloseButton: e.target.checked})}
                        />
                        <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#ec5b13]"></div>
                      </div>
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group">
                      <span className="text-sm text-slate-900">Sticky Position</span>
                      <div className="relative inline-flex items-center">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={settings.position === 'top'}
                          onChange={(e) => setSettings({...settings, position: e.target.checked ? 'top' : 'bottom'})}
                        />
                        <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#ec5b13]"></div>
                      </div>
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group">
                      <span className="text-sm text-slate-900">Remember Dismissal</span>
                      <div className="relative inline-flex items-center">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={settings.closeable}
                          onChange={(e) => setSettings({...settings, closeable: e.target.checked})}
                        />
                        <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#ec5b13]"></div>
                      </div>
                    </label>
                  </div>

                  {/* Display Schedule */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <label className="text-sm font-medium flex items-center gap-2 text-slate-900">
                      <svg className="w-5 h-5 text-[#ec5b13]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Display Schedule
                    </label>
                    <select
                      className="w-full rounded-xl border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-[#ec5b13] focus:border-[#ec5b13]"
                      value={settings.displaySchedule}
                      onChange={(e) => setSettings({...settings, displaySchedule: e.target.value as any})}
                    >
                      <option value="always">Always Show</option>
                      <option value="first-visit">First Visit Only</option>
                      <option value="time-limited">Time Limited</option>
                    </select>

                    {settings.displaySchedule === 'time-limited' && (
                      <div className="space-y-2">
                        <label className="text-xs text-slate-600">Show for (days)</label>
                        <input
                          type="number"
                          min="1"
                          className="w-full rounded-xl border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-[#ec5b13] focus:border-[#ec5b13] px-3 py-2"
                          value={settings.scheduleDays}
                          onChange={(e) => setSettings({...settings, scheduleDays: parseInt(e.target.value) || 7})}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-8">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Live Preview Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                  <svg className="w-5 h-5 text-[#ec5b13]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Live Preview
                </h2>
                <div className="flex gap-2">
                  <button className="p-1.5 rounded-lg bg-white shadow-sm border border-slate-200 text-[#ec5b13]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button className="p-1.5 rounded-lg bg-white shadow-sm border border-slate-200 text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden aspect-video relative">
                <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <div className="mx-auto bg-white rounded-md px-3 py-1 text-[10px] text-slate-400 w-64 text-center border border-slate-200">yourstore.com</div>
                </div>
                <div className="relative h-full overflow-y-auto">
                  {isVisible && (
                    <div
                      className="py-3 px-6 flex items-center justify-center gap-3 relative"
                      style={{
                        background: settings.bgType === 'gradient'
                          ? `linear-gradient(135deg, ${settings.bgGradientStart}, ${settings.bgGradientEnd})`
                          : settings.bgType === 'image' && settings.bgImageUrl
                          ? `url('${settings.bgImageUrl}')`
                          : settings.bgColor,
                        backgroundSize: settings.bgType === 'image' ? 'cover' : undefined,
                        backgroundPosition: settings.bgType === 'image' ? 'center' : undefined,
                        color: settings.textColor,
                        fontSize: `${settings.fontSize}px`
                      }}
                    >
                      {settings.visualElement === 'icon' && (
                        <span className="text-xl">{settings.visualIcon}</span>
                      )}
                      {settings.visualElement === 'badge' && (
                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold uppercase"
                          style={{
                            backgroundColor: settings.buttonBgColor,
                            color: settings.buttonTextColor
                          }}
                        >
                          {settings.visualBadgeText}
                        </span>
                      )}
                      {settings.visualElement === 'image' && settings.visualImageUrl && (
                        <img src={settings.visualImageUrl} alt="" className="h-8" />
                      )}
                      {settings.visualElement === 'countdown' && (
                        <CountdownTimer
                          endDate={settings.countdownDate}
                          bgColor={settings.buttonBgColor}
                          textColor={settings.buttonTextColor}
                        />
                      )}
                      <p className="text-sm font-bold tracking-wide">{settings.message}</p>
                      {settings.actionType === 'button' && (
                        <button
                          className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ml-4 hover:opacity-90 transition-opacity"
                          style={{
                            backgroundColor: settings.buttonBgColor,
                            color: settings.buttonTextColor
                          }}
                        >
                          {settings.actionButtonText}
                        </button>
                      )}
                      {settings.actionType === 'form' && (
                        <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 ml-4">
                          <input
                            type="email"
                            placeholder={settings.formPlaceholder}
                            className="px-3 py-1.5 rounded-md border-none text-xs min-w-[200px]"
                            style={{ color: '#000' }}
                          />
                          <button
                            type="submit"
                            className="px-4 py-1.5 rounded-md text-xs font-bold uppercase hover:opacity-90 transition-opacity"
                            style={{
                              backgroundColor: settings.buttonBgColor,
                              color: settings.buttonTextColor
                            }}
                          >
                            {settings.formButtonText}
                          </button>
                        </form>
                      )}
                      {settings.showCloseButton && (
                        <button
                          onClick={() => setIsVisible(false)}
                          className="absolute right-4 cursor-pointer opacity-70 hover:opacity-100 text-lg"
                          style={{ color: settings.textColor }}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  )}
                  <div className="p-8 space-y-6 opacity-40">
                    <div className="h-12 w-48 bg-slate-200 rounded-lg"></div>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="h-64 bg-slate-100 rounded-xl border border-dashed border-slate-300"></div>
                      <div className="h-64 bg-slate-100 rounded-xl border border-dashed border-slate-300"></div>
                      <div className="h-64 bg-slate-100 rounded-xl border border-dashed border-slate-300"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 w-full bg-slate-200 rounded"></div>
                      <div className="h-4 w-5/6 bg-slate-200 rounded"></div>
                      <div className="h-4 w-4/6 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Installation Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                  <svg className="w-5 h-5 text-[#ec5b13]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Installation
                </h2>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-900 p-6 relative group">
                <div className="absolute right-4 top-4">
                  <button
                    onClick={copyEmbedCode}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Snippet
                  </button>
                </div>
                <code className="block text-slate-300 text-sm font-mono leading-relaxed">
                  <span className="text-blue-400">&lt;!-- BarStudio Widget Snippet --&gt;</span><br/>
                  <span className="text-pink-400">&lt;script</span> <span className="text-yellow-400">async</span> <span className="text-yellow-400">src</span>=<span className="text-green-400">"https://cdn.barstudio.io/widget.js?id=bs_928374"</span><span className="text-pink-400">&gt;&lt;/script&gt;</span><br/>
                  <span className="text-pink-400">&lt;div</span> <span className="text-yellow-400">id</span>=<span className="text-green-400">"barstudio-announcement-bar"</span><span className="text-pink-400">&gt;&lt;/div&gt;</span>
                </code>
              </div>
              <p className="mt-4 text-sm text-slate-500 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Paste this code at the beginning of the &lt;body&gt; tag of your website.
              </p>
            </section>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="h-20 border-t border-slate-200 bg-white px-8 flex items-center justify-between sticky bottom-0 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-600 rounded-full text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Draft Saved 2m ago
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors">
            Save Draft
          </button>
          <button className="px-8 py-2.5 rounded-xl bg-[#ec5b13] text-white font-bold text-sm shadow-lg shadow-[#ec5b13]/20 hover:scale-[1.02] active:scale-95 transition-all">
            Publish Widget
          </button>
        </div>
      </footer>
    </div>
  );
};

export default AnnouncementBarPage;
