import React, { useState, useRef, useEffect } from 'react';
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
        name: '10% OFF',
        heading: '10% Off Your Next Purchase',
        description: 'Enjoy 10% discount on your next order',
        promoCode: 'SAVE10',
        probability: 40,
        color: '#6366f1'
      },
      {
        id: '2',
        name: 'FREE SHIPPING',
        heading: 'Free Shipping',
        description: 'Enjoy free shipping on your next order',
        promoCode: 'SHIP0',
        probability: 30,
        color: '#4338ca'
      },
      {
        id: '3',
        name: '$50 GIFT CARD',
        heading: '$50 Gift Card',
        description: 'Get a $50 gift card for your next purchase',
        promoCode: 'GIFT50',
        probability: 5,
        color: '#6366f1'
      },
      {
        id: '4',
        name: '15% OFF',
        heading: '15% Off Your Purchase',
        description: 'Save 15% on your next order',
        promoCode: 'SAVE15',
        probability: 15,
        color: '#4338ca'
      },
      {
        id: '5',
        name: '20% OFF',
        heading: '20% Off Your Order',
        description: 'Get 20% off your next purchase',
        promoCode: 'SAVE20',
        probability: 5,
        color: '#6366f1'
      },
      {
        id: '6',
        name: 'TRY AGAIN',
        heading: 'Better Luck Next Time!',
        description: 'Thanks for playing! Sign up to try again.',
        promoCode: '',
        probability: 5,
        color: '#4338ca'
      }
    ],
    bgColor: '#1e1b4b',
    textColor: '#e0e7ff',
    accentColor: '#6366f1',
    errorColor: '#ef4444',
    enableClientNotification: true,
    enableOwnerNotification: true,
    ownerEmail: 'owner@example.com',
    wheelTitle: 'SPIN & WIN!',
    wheelSubtitle: 'Enter your email and test your luck today.',
    buttonText: 'SPIN NOW'
  });

  // Auto-spin effect for preview
  useEffect(() => {
    if (!isSpinning && !showResult && wheelRef.current) {
      let rotation = 0;
      const animate = () => {
        rotation += 0.2;
        if (wheelRef.current) {
          wheelRef.current.style.transform = `rotate(${rotation}deg)`;
        }
        requestAnimationFrame(animate);
      };
      const animationId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationId);
    }
  }, [isSpinning, showResult]);

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
    const baseRotation = 360 * 5;
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
      name: 'NEW PRIZE',
      heading: 'Prize Heading',
      description: 'Prize description',
      promoCode: 'CODE',
      probability: 10,
      color: '#6366f1'
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
    return `<script src="https://cdn.spinbuilder.com/v1/widget.js" data-id="sb_${Date.now()}"></script>`;
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
    <div className="h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Navbar */}
      <nav className="h-14 border-b border-slate-800 px-6 flex items-center justify-between bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight">Spin<span className="text-indigo-400">Builder</span></span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
            Home
          </button>
          <button onClick={resetWheel} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20">
            Reset Preview
          </button>
        </div>
      </nav>

      {/* Main Content Grid */}
      <main className="h-[calc(100vh-3.5rem)] flex overflow-hidden">
        {/* Left: Configuration Panel */}
        <div className="w-1/2 flex flex-col border-r border-slate-800 bg-slate-900/30">
          {/* Tabs Header */}
          <div className="flex border-b border-slate-800 bg-slate-900/50 px-6 shrink-0">
            <button
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'content' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
              onClick={() => setActiveTab('content')}
            >
              Prizes & Probabilities
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'theme' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
              onClick={() => setActiveTab('theme')}
            >
              Style
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'notifications' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
              onClick={() => setActiveTab('notifications')}
            >
              Settings
            </button>
          </div>

          {/* Tab Content (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-6" style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255,255,255,0.2) rgba(255,255,255,0.05)'
          }}>
            {/* Content Tab */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                {/* Prizes Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Active Prizes</h3>
                    <button
                      onClick={addPrize}
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Prize
                    </button>
                  </div>

                  <div className="text-xs text-slate-400 bg-slate-800/50 p-3 rounded-lg mb-4 border border-slate-700/50">
                    Total Probability: <span className={totalProbability === 100 ? 'text-green-400 font-bold' : 'text-orange-400 font-bold'}>{totalProbability}%</span>
                    {totalProbability !== 100 && ' (Recommended: 100%)'}
                  </div>

                  <div className="space-y-2">
                    {settings.prizes.map((prize) => (
                      <div key={prize.id} className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 group">
                        <svg className="w-5 h-5 text-slate-500 cursor-move" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                        </svg>
                        <input
                          className="flex-1 bg-transparent border-none p-0 text-sm focus:ring-0 text-white"
                          type="text"
                          value={prize.name}
                          onChange={(e) => updatePrize(prize.id, 'name', e.target.value)}
                        />
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-500 font-bold">CHANCE</span>
                          <input
                            className="w-12 bg-slate-900 border-slate-700 rounded text-[11px] text-center p-1 text-white"
                            type="text"
                            value={`${prize.probability}%`}
                            onChange={(e) => updatePrize(prize.id, 'probability', parseInt(e.target.value.replace('%', '')) || 0)}
                          />
                        </div>
                        <input
                          type="color"
                          className="w-8 h-8 rounded cursor-pointer border border-slate-700"
                          value={prize.color}
                          onChange={(e) => updatePrize(prize.id, 'color', e.target.value)}
                        />
                        {settings.prizes.length > 2 && (
                          <button
                            onClick={() => removePrize(prize.id)}
                            className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Expanded Prize Details */}
                  <div className="mt-6 space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Prize Details</h4>
                    {settings.prizes.map((prize) => (
                      <div key={`detail-${prize.id}`} className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/30 space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: prize.color }}></div>
                          <span className="text-sm font-bold text-white">{prize.name}</span>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1">Result Heading</label>
                          <input
                            type="text"
                            className="w-full bg-slate-800 border-slate-700 rounded-lg text-sm p-2 text-white focus:ring-indigo-500 focus:border-indigo-500"
                            value={prize.heading}
                            onChange={(e) => updatePrize(prize.id, 'heading', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1">Description</label>
                          <textarea
                            className="w-full bg-slate-800 border-slate-700 rounded-lg text-sm p-2 text-white focus:ring-indigo-500 focus:border-indigo-500"
                            rows={2}
                            value={prize.description}
                            onChange={(e) => updatePrize(prize.id, 'description', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1">Promo Code</label>
                          <input
                            type="text"
                            className="w-full bg-slate-800 border-slate-700 rounded-lg text-sm p-2 text-white font-mono focus:ring-indigo-500 focus:border-indigo-500"
                            value={prize.promoCode}
                            onChange={(e) => updatePrize(prize.id, 'promoCode', e.target.value.toUpperCase())}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Theme Tab */}
            {activeTab === 'theme' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Wheel Text</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Main Title</label>
                      <input
                        type="text"
                        className="w-full bg-slate-800 border-slate-700 rounded-lg text-white focus:ring-indigo-500 focus:border-indigo-500 p-3"
                        value={settings.wheelTitle}
                        onChange={(e) => setSettings({...settings, wheelTitle: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Subtitle</label>
                      <input
                        type="text"
                        className="w-full bg-slate-800 border-slate-700 rounded-lg text-white focus:ring-indigo-500 focus:border-indigo-500 p-3"
                        value={settings.wheelSubtitle}
                        onChange={(e) => setSettings({...settings, wheelSubtitle: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Button Text</label>
                      <input
                        type="text"
                        className="w-full bg-slate-800 border-slate-700 rounded-lg text-white focus:ring-indigo-500 focus:border-indigo-500 p-3"
                        value={settings.buttonText}
                        onChange={(e) => setSettings({...settings, buttonText: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Color Theme</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Background Color</label>
                      <input
                        type="color"
                        className="w-full h-12 bg-slate-800 border-slate-700 rounded-lg cursor-pointer"
                        value={settings.bgColor}
                        onChange={(e) => setSettings({...settings, bgColor: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Text Color</label>
                      <input
                        type="color"
                        className="w-full h-12 bg-slate-800 border-slate-700 rounded-lg cursor-pointer"
                        value={settings.textColor}
                        onChange={(e) => setSettings({...settings, textColor: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Accent Color</label>
                      <input
                        type="color"
                        className="w-full h-12 bg-slate-800 border-slate-700 rounded-lg cursor-pointer"
                        value={settings.accentColor}
                        onChange={(e) => setSettings({...settings, accentColor: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Email Notifications</h3>

                <div className="bg-slate-800/50 rounded-lg p-4 space-y-4 border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-white">Client Notification</h4>
                      <p className="text-xs text-slate-400 mt-1">Send prize details to customer</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={settings.enableClientNotification}
                        onChange={(e) => setSettings({...settings, enableClientNotification: e.target.checked})}
                      />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 space-y-4 border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-white">Owner Notification</h4>
                      <p className="text-xs text-slate-400 mt-1">Notify business owner of new spin</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={settings.enableOwnerNotification}
                        onChange={(e) => setSettings({...settings, enableOwnerNotification: e.target.checked})}
                      />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  {settings.enableOwnerNotification && (
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-2">Owner Email Address</label>
                      <input
                        type="email"
                        className="w-full bg-slate-900 border-slate-700 rounded-lg text-sm p-3 text-white focus:ring-indigo-500 focus:border-indigo-500"
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

          {/* Footer: Embed Code */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 shrink-0">
            <div className="flex items-center justify-between mb-2 px-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Embed Snippet</span>
              <button
                onClick={copyEmbedCode}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
            </div>
            <code className="block w-full bg-slate-900 p-3 rounded-lg text-[10px] text-indigo-300 font-mono break-all border border-slate-800">
              {generateEmbedCode()}
            </code>
          </div>
        </div>

        {/* Right: Preview Area */}
        <div className="w-1/2 bg-slate-950 relative overflow-hidden flex flex-col">
          {/* Preview Header */}
          <div className="absolute top-6 left-6 z-20">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 backdrop-blur rounded-full border border-slate-700 shadow-xl">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[11px] font-bold text-slate-200 tracking-wide uppercase">Live Preview</span>
            </div>
          </div>

          {/* Visual Content */}
          <div className="flex-1 flex flex-col items-center justify-center p-12" style={{
            background: `linear-gradient(135deg, ${settings.bgColor} 0%, ${settings.bgColor}dd 100%)`
          }}>
            {!showResult ? (
              <>
                <div className="max-w-md w-full text-center mb-8">
                  <h2 className="text-3xl font-black mb-2 drop-shadow-lg" style={{ color: settings.textColor }}>
                    {settings.wheelTitle}
                  </h2>
                  <p className="text-sm opacity-70" style={{ color: settings.textColor }}>
                    {settings.wheelSubtitle}
                  </p>
                </div>

                {/* The Wheel */}
                <div className="relative w-72 h-72 mb-10">
                  {/* Pointer */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-rose-500 drop-shadow-lg"></div>
                  </div>

                  {/* Wheel Container */}
                  <div
                    ref={wheelRef}
                    className="w-full h-full rounded-full border-8 border-white/10 shadow-[0_0_40px_rgba(99,102,241,0.3)] relative"
                    style={{
                      background: `conic-gradient(${settings.prizes.map((prize, idx) => {
                        const segmentAngle = 360 / settings.prizes.length;
                        const startAngle = idx * segmentAngle;
                        const endAngle = (idx + 1) * segmentAngle;
                        return `${prize.color} ${startAngle}deg ${endAngle}deg`;
                      }).join(', ')})`,
                      transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none'
                    }}
                  >
                    {/* Prize Labels */}
                    {settings.prizes.map((prize, index) => {
                      const segmentAngle = 360 / settings.prizes.length;
                      const rotation = segmentAngle * index + segmentAngle / 2;

                      return (
                        <div
                          key={prize.id}
                          className="absolute top-1/2 left-1/2 origin-left"
                          style={{
                            transform: `rotate(${rotation}deg) translateX(60px)`,
                            width: '80px'
                          }}
                        >
                          <span className="block text-white text-[10px] font-bold text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight">
                            {prize.name}
                          </span>
                        </div>
                      );
                    })}

                    {/* Center Hub */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] flex items-center justify-center">
                        <svg className="w-8 h-8 text-indigo-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email Input */}
                <div className="w-full max-w-sm space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg bg-white/90 backdrop-blur border-2 border-white/20 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={hasSpun}
                  />
                  {emailError && (
                    <p className="text-xs text-rose-300 font-medium">{emailError}</p>
                  )}
                  <button
                    onClick={handleSpin}
                    disabled={hasSpun || isSpinning}
                    className="w-full px-10 py-4 bg-white text-indigo-900 rounded-full font-black text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSpinning ? 'SPINNING...' : hasSpun ? 'SPUN' : settings.buttonText}
                  </button>
                </div>
              </>
            ) : (
              /* Result Display */
              <div className="max-w-lg text-center">
                <div className="mb-6">
                  <div
                    className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 shadow-2xl"
                    style={{ backgroundColor: wonPrize?.color }}
                  >
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-4xl font-black mb-3 drop-shadow-lg" style={{ color: settings.textColor }}>
                    {wonPrize?.heading}
                  </h2>
                  <p className="text-lg opacity-80 mb-6" style={{ color: settings.textColor }}>
                    {wonPrize?.description}
                  </p>
                </div>

                {wonPrize?.promoCode && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20">
                    <p className="text-sm font-medium mb-3 opacity-80" style={{ color: settings.textColor }}>
                      Your Promo Code:
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <code
                        className="text-2xl font-black px-6 py-3 rounded-lg shadow-xl"
                        style={{ backgroundColor: settings.accentColor, color: 'white' }}
                      >
                        {wonPrize.promoCode}
                      </code>
                      <button
                        onClick={() => copyPromoCode(wonPrize.promoCode)}
                        className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                        title="Copy code"
                      >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      </main>
    </div>
  );
};

export default SpinningWheelPage;
