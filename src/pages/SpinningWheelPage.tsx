import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SpinningWheelPage.css';

interface Prize {
  id: string;
  name: string;
  heading: string;
  description: string;
  promoCode: string;
  probability: number;
  color: string;
}

interface Settings {
  prizes: Prize[];
  bgColor: string;
  textColor: string;
  accentColor: string;
  errorColor: string;
  enableClientNotification: boolean;
  enableOwnerNotification: boolean;
  ownerEmail: string;
  wheelTitle: string;
  wheelSubtitle: string;
  buttonText: string;
}

const SpinningWheelPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'content' | 'theme' | 'notifications'>('content');
  const [email, setEmail] = useState('');
  const [hasSpun, setHasSpun] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [emailError, setEmailError] = useState('');
  const wheelRef = useRef<HTMLDivElement>(null);

  const [settings, setSettings] = useState<Settings>({
    prizes: [
      {
        id: '1',
        name: '10% Off',
        heading: '10% Off Your Next Purchase',
        description: 'Enjoy 10% discount on your next order',
        promoCode: 'SAVE10',
        probability: 30,
        color: '#3b82f6'
      },
      {
        id: '2',
        name: '$5 Off',
        heading: '$5 Off Your Order',
        description: 'Get $5 off your next purchase',
        promoCode: 'FIVE5',
        probability: 25,
        color: '#8b5cf6'
      },
      {
        id: '3',
        name: 'Free Shipping',
        heading: 'Free Shipping',
        description: 'Enjoy free shipping on your next order',
        promoCode: 'SHIP0',
        probability: 20,
        color: '#10b981'
      },
      {
        id: '4',
        name: '15% Off',
        heading: '15% Off Your Purchase',
        description: 'Save 15% on your next order',
        promoCode: 'SAVE15',
        probability: 15,
        color: '#f59e0b'
      },
      {
        id: '5',
        name: '$10 Off',
        heading: '$10 Off Your Order',
        description: 'Get $10 off your next purchase',
        promoCode: 'TEN10',
        probability: 5,
        color: '#ef4444'
      },
      {
        id: '6',
        name: 'Better Luck',
        heading: 'Better Luck Next Time!',
        description: 'Thanks for playing! Sign up to try again.',
        promoCode: '',
        probability: 5,
        color: '#6b7280'
      }
    ],
    bgColor: '#ffffff',
    textColor: '#1f2937',
    accentColor: '#3b82f6',
    errorColor: '#ef4444',
    enableClientNotification: true,
    enableOwnerNotification: true,
    ownerEmail: 'owner@example.com',
    wheelTitle: 'Spin to Win!',
    wheelSubtitle: 'Enter your email for a chance to win exclusive discounts',
    buttonText: 'Spin the Wheel'
  });

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const selectPrize = (): Prize => {
    const totalProbability = settings.prizes.reduce((sum, prize) => sum + prize.probability, 0);
    let random = Math.random() * totalProbability;

    for (const prize of settings.prizes) {
      random -= prize.probability;
      if (random <= 0) {
        return prize;
      }
    }

    return settings.prizes[0];
  };

  const handleSpin = () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setEmailError('');
    setIsSpinning(true);
    setHasSpun(true);

    const prize = selectPrize();
    const prizeIndex = settings.prizes.findIndex(p => p.id === prize.id);
    const segmentAngle = 360 / settings.prizes.length;
    const baseRotation = 360 * 5; // 5 full spins
    const prizeRotation = segmentAngle * prizeIndex;
    const finalRotation = baseRotation + (360 - prizeRotation) + (segmentAngle / 2);

    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(${finalRotation}deg)`;
    }

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(prize);
      setShowResult(true);
    }, 4000);
  };

  const resetWheel = () => {
    setEmail('');
    setHasSpun(false);
    setShowResult(false);
    setWonPrize(null);
    if (wheelRef.current) {
      wheelRef.current.style.transform = 'rotate(0deg)';
    }
  };

  const copyPromoCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      alert('Promo code copied to clipboard!');
    });
  };

  const updatePrize = (id: string, field: keyof Prize, value: any) => {
    setSettings({
      ...settings,
      prizes: settings.prizes.map(prize =>
        prize.id === id ? { ...prize, [field]: value } : prize
      )
    });
  };

  const addPrize = () => {
    const newPrize: Prize = {
      id: Date.now().toString(),
      name: 'New Prize',
      heading: 'Prize Heading',
      description: 'Prize description',
      promoCode: 'CODE',
      probability: 10,
      color: '#3b82f6'
    };
    setSettings({
      ...settings,
      prizes: [...settings.prizes, newPrize]
    });
  };

  const removePrize = (id: string) => {
    if (settings.prizes.length <= 2) {
      alert('You must have at least 2 prizes');
      return;
    }
    setSettings({
      ...settings,
      prizes: settings.prizes.filter(prize => prize.id !== id)
    });
  };

  const totalProbability = settings.prizes.reduce((sum, prize) => sum + prize.probability, 0);

  const generateEmbedCode = (): string => {
    const prizesData = JSON.stringify(settings.prizes);

    return `<!-- Spinning Wheel Widget -->
<div id="spinning-wheel-widget"></div>
<script>
  (function() {
    const config = {
      prizes: ${prizesData},
      bgColor: '${settings.bgColor}',
      textColor: '${settings.textColor}',
      accentColor: '${settings.accentColor}',
      errorColor: '${settings.errorColor}',
      wheelTitle: '${settings.wheelTitle}',
      wheelSubtitle: '${settings.wheelSubtitle}',
      buttonText: '${settings.buttonText}',
      enableClientNotification: ${settings.enableClientNotification},
      enableOwnerNotification: ${settings.enableOwnerNotification},
      ownerEmail: '${settings.ownerEmail}'
    };

    // Widget initialization code
    const widget = document.getElementById('spinning-wheel-widget');
    // Add your widget rendering logic here
    console.log('Spinning Wheel Widget loaded with config:', config);
  })();
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
    <div className="spinning-wheel-page">
      {/* Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tight">SpinStudio</span>
        </div>
        <button onClick={() => navigate('/')} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Home
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-96 border-r border-slate-200 bg-white overflow-y-auto">
          <div className="p-6">
            {/* Tab Navigation */}
            <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
              <button
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'content' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'
                }`}
                onClick={() => setActiveTab('content')}
              >
                Content
              </button>
              <button
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'theme' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'
                }`}
                onClick={() => setActiveTab('theme')}
              >
                Theme
              </button>
              <button
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'notifications' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'
                }`}
                onClick={() => setActiveTab('notifications')}
              >
                Notifications
              </button>
            </div>

            {/* Content Tab */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                {/* Wheel Settings */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Wheel Settings</h3>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Wheel Title</label>
                    <input
                      type="text"
                      className="w-full border-slate-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                      value={settings.wheelTitle}
                      onChange={(e) => setSettings({...settings, wheelTitle: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Wheel Subtitle</label>
                    <input
                      type="text"
                      className="w-full border-slate-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                      value={settings.wheelSubtitle}
                      onChange={(e) => setSettings({...settings, wheelSubtitle: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Button Text</label>
                    <input
                      type="text"
                      className="w-full border-slate-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                      value={settings.buttonText}
                      onChange={(e) => setSettings({...settings, buttonText: e.target.value})}
                    />
                  </div>
                </div>

                {/* Prizes */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Prizes</h3>
                    <button
                      onClick={addPrize}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700"
                    >
                      + Add Prize
                    </button>
                  </div>

                  <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg">
                    Total Probability: <span className={totalProbability === 100 ? 'text-green-600 font-bold' : 'text-orange-600 font-bold'}>{totalProbability}%</span>
                    {totalProbability !== 100 && ' (Recommended: 100%)'}
                  </div>

                  {settings.prizes.map((prize, index) => (
                    <div key={prize.id} className="border border-slate-200 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-700">Prize {index + 1}</h4>
                        {settings.prizes.length > 2 && (
                          <button
                            onClick={() => removePrize(prize.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Prize Name (on wheel)</label>
                        <input
                          type="text"
                          className="w-full border-slate-200 rounded-lg text-sm p-2"
                          value={prize.name}
                          onChange={(e) => updatePrize(prize.id, 'name', e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Heading (result)</label>
                        <input
                          type="text"
                          className="w-full border-slate-200 rounded-lg text-sm p-2"
                          value={prize.heading}
                          onChange={(e) => updatePrize(prize.id, 'heading', e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Description</label>
                        <textarea
                          className="w-full border-slate-200 rounded-lg text-sm p-2"
                          rows={2}
                          value={prize.description}
                          onChange={(e) => updatePrize(prize.id, 'description', e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Promo Code</label>
                        <input
                          type="text"
                          className="w-full border-slate-200 rounded-lg text-sm p-2 font-mono"
                          value={prize.promoCode}
                          onChange={(e) => updatePrize(prize.id, 'promoCode', e.target.value.toUpperCase())}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">
                          Probability: {prize.probability}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          className="w-full"
                          value={prize.probability}
                          onChange={(e) => updatePrize(prize.id, 'probability', parseInt(e.target.value))}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Segment Color</label>
                        <input
                          type="color"
                          className="w-full h-10 border-slate-200 rounded-lg cursor-pointer"
                          value={prize.color}
                          onChange={(e) => updatePrize(prize.id, 'color', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Theme Tab */}
            {activeTab === 'theme' && (
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Color Settings</h3>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Background Color</label>
                  <input
                    type="color"
                    className="w-full h-12 border-slate-200 rounded-lg cursor-pointer"
                    value={settings.bgColor}
                    onChange={(e) => setSettings({...settings, bgColor: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Text Color</label>
                  <input
                    type="color"
                    className="w-full h-12 border-slate-200 rounded-lg cursor-pointer"
                    value={settings.textColor}
                    onChange={(e) => setSettings({...settings, textColor: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Accent Color</label>
                  <input
                    type="color"
                    className="w-full h-12 border-slate-200 rounded-lg cursor-pointer"
                    value={settings.accentColor}
                    onChange={(e) => setSettings({...settings, accentColor: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Error Color</label>
                  <input
                    type="color"
                    className="w-full h-12 border-slate-200 rounded-lg cursor-pointer"
                    value={settings.errorColor}
                    onChange={(e) => setSettings({...settings, errorColor: e.target.value})}
                  />
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Email Notifications</h3>

                <div className="border border-slate-200 rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700">Client Notification</h4>
                      <p className="text-xs text-slate-500 mt-1">Send prize details to customer</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={settings.enableClientNotification}
                        onChange={(e) => setSettings({...settings, enableClientNotification: e.target.checked})}
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700">Owner Notification</h4>
                      <p className="text-xs text-slate-500 mt-1">Notify business owner of new spin</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={settings.enableOwnerNotification}
                        onChange={(e) => setSettings({...settings, enableOwnerNotification: e.target.checked})}
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {settings.enableOwnerNotification && (
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-2">Owner Email Address</label>
                      <input
                        type="email"
                        className="w-full border-slate-200 rounded-lg text-sm p-3"
                        placeholder="owner@example.com"
                        value={settings.ownerEmail}
                        onChange={(e) => setSettings({...settings, ownerEmail: e.target.value})}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-8">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Live Preview */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Live Preview
                </h2>
                <button
                  onClick={resetWheel}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Reset Preview
                </button>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                {/* Browser Chrome */}
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Preview</span>
                </div>

                {/* Widget Preview */}
                <div className="p-8" style={{ backgroundColor: settings.bgColor, color: settings.textColor }}>
                  {!showResult ? (
                    <div className="max-w-5xl mx-auto">
                      {/* Horizontal Layout */}
                      <div className="flex items-center gap-8">
                        {/* Left Side - Spinning Wheel */}
                        <div className="flex-shrink-0 relative" style={{ width: '300px', height: '300px' }}>
                          {/* Pointer */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
                            <div
                              className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px]"
                              style={{ borderTopColor: settings.accentColor }}
                            ></div>
                          </div>

                          {/* Wheel */}
                          <div
                            ref={wheelRef}
                            className="wheel-container"
                            style={{
                              width: '100%',
                              height: '100%',
                              borderRadius: '50%',
                              border: `8px solid ${settings.accentColor}`,
                              position: 'relative',
                              transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
                              overflow: 'hidden'
                            }}
                          >
                            {settings.prizes.map((prize, index) => {
                              const segmentAngle = 360 / settings.prizes.length;
                              const rotation = segmentAngle * index;

                              return (
                                <div
                                  key={prize.id}
                                  className="wheel-segment"
                                  style={{
                                    position: 'absolute',
                                    width: '50%',
                                    height: '50%',
                                    left: '50%',
                                    top: '50%',
                                    transformOrigin: '0 0',
                                    transform: `rotate(${rotation}deg) skewY(${90 - segmentAngle}deg)`,
                                    backgroundColor: prize.color,
                                    clipPath: segmentAngle > 180 ? 'none' : 'polygon(0 0, 100% 0, 100% 100%)'
                                  }}
                                >
                                  <div
                                    style={{
                                      position: 'absolute',
                                      left: '60%',
                                      top: '20%',
                                      transform: `skewY(${-(90 - segmentAngle)}deg) rotate(${segmentAngle / 2}deg)`,
                                      color: 'white',
                                      fontWeight: 'bold',
                                      fontSize: '12px',
                                      width: '70px',
                                      textAlign: 'center',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis'
                                    }}
                                  >
                                    {prize.name}
                                  </div>
                                </div>
                              );
                            })}

                            {/* Center Circle */}
                            <div
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-white font-bold text-sm"
                              style={{
                                width: '60px',
                                height: '60px',
                                backgroundColor: settings.accentColor,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                              }}
                            >
                              SPIN
                            </div>
                          </div>
                        </div>

                        {/* Right Side - Content */}
                        <div className="flex-1">
                          <h1 className="text-2xl font-bold mb-2" style={{ color: settings.textColor }}>
                            {settings.wheelTitle}
                          </h1>
                          <p className="text-sm mb-6 opacity-80" style={{ color: settings.textColor }}>
                            {settings.wheelSubtitle}
                          </p>

                          {/* Email Input */}
                          <div className="space-y-3">
                            <div>
                              <input
                                type="email"
                                placeholder="Enter your email address"
                                className="w-full px-3 py-2 rounded-lg border-2 text-sm text-slate-900 focus:outline-none"
                                style={{
                                  borderColor: emailError ? settings.errorColor : settings.accentColor
                                }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={hasSpun}
                              />
                              {emailError && (
                                <p className="text-xs mt-1" style={{ color: settings.errorColor }}>
                                  {emailError}
                                </p>
                              )}
                            </div>

                            <button
                              onClick={handleSpin}
                              disabled={hasSpun || isSpinning}
                              className="w-full py-2.5 rounded-lg font-bold text-sm text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
                              style={{ backgroundColor: settings.accentColor }}
                            >
                              {isSpinning ? 'Spinning...' : hasSpun ? 'Already Spun' : settings.buttonText}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Result Display */
                    <div className="max-w-lg mx-auto text-center">
                      <div className="mb-6">
                        <div
                          className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4"
                          style={{ backgroundColor: wonPrize?.color }}
                        >
                          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h2 className="text-3xl font-bold mb-3" style={{ color: settings.textColor }}>
                          {wonPrize?.heading}
                        </h2>
                        <p className="text-lg opacity-80 mb-6" style={{ color: settings.textColor }}>
                          {wonPrize?.description}
                        </p>
                      </div>

                      {wonPrize?.promoCode && (
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
                          <p className="text-sm font-medium mb-2 opacity-80" style={{ color: settings.textColor }}>
                            Your Promo Code:
                          </p>
                          <div className="flex items-center justify-center gap-3">
                            <code
                              className="text-2xl font-bold px-6 py-3 rounded-lg"
                              style={{ backgroundColor: settings.accentColor, color: 'white' }}
                            >
                              {wonPrize.promoCode}
                            </code>
                            <button
                              onClick={() => copyPromoCode(wonPrize.promoCode)}
                              className="p-3 rounded-lg hover:bg-white/10 transition-colors"
                              title="Copy code"
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}

                      <p className="text-sm opacity-60" style={{ color: settings.textColor }}>
                        Check your email for details!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Embed Code */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Embed Code
                </h2>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-900 p-6 relative">
                <button
                  onClick={copyEmbedCode}
                  className="absolute right-4 top-4 flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Code
                </button>
                <pre className="text-slate-300 text-sm font-mono overflow-x-auto">
                  {generateEmbedCode()}
                </pre>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SpinningWheelPage;
