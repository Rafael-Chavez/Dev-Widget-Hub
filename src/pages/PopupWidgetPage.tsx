import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PopupWidgetPage.css';

interface PopupSettings {
  layoutStyle: 'modal' | 'left-pane' | 'right-pane' | 'sticky-bar';
  width: number;
  enableExitIntent: boolean;
  enableOverlayBlur: boolean;
  backgroundColor: string;
  primaryColor: string;
  textColor: string;
  title: string;
  subtitle: string;
  couponCode: string;
  buttonText: string;
  disclaimerText: string;
  imageUrl: string;
  badgeText: string;
}

const PopupWidgetPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'builder' | 'layout' | 'settings'>('layout');

  const [settings, setSettings] = useState<PopupSettings>({
    layoutStyle: 'modal',
    width: 480,
    enableExitIntent: true,
    enableOverlayBlur: true,
    backgroundColor: '#ffffff',
    primaryColor: '#e040a0',
    textColor: '#2e1a28',
    title: 'LEAVING\nSO SOON?',
    subtitle: "Wait! Don't go empty-handed. Take this code for your next treat.",
    couponCode: 'SWEET15',
    buttonText: 'CONTINUE SHOPPING',
    disclaimerText: "No thanks, I'll pay full price",
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop',
    badgeText: 'Exclusive Offer'
  });

  const generateEmbedCode = (): string => {
    const config = JSON.stringify(settings, null, 2);

    return `<!-- CandyPop Exit Intent Popup Widget -->
<div id="candypop-popup-widget"></div>
<script>
(function() {
  const config = ${config};

  function createPopup() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'candypop-overlay';
    overlay.style.cssText = \`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, \${config.enableOverlayBlur ? '0.4' : '0.6'});
      \${config.enableOverlayBlur ? 'backdrop-filter: blur(4px);' : ''}
      z-index: 999999;
      display: none;
    \`;

    // Create popup container
    const popup = document.createElement('div');
    popup.id = 'candypop-popup';
    popup.style.cssText = \`
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      border-radius: 2.5rem;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      z-index: 1000000;
      max-width: \${config.width}px;
      width: 90%;
      display: none;
    \`;

    popup.innerHTML = \`
      <div style="display: flex; flex-direction: row;">
        <div style="width: 42%; position: relative; min-height: 200px;">
          <img src="\${config.imageUrl}" alt="Popup" style="width: 100%; height: 100%; object-fit: cover;">
          <div style="position: absolute; inset: 0; background: linear-gradient(to top, \${config.primaryColor}66, transparent);"></div>
          <div style="position: absolute; bottom: 1rem; left: 1rem; right: 1rem;">
            <div style="background: rgba(255,255,255,0.9); backdrop-filter: blur(4px); padding: 0.25rem 0.75rem; border-radius: 9999px; display: inline-block;">
              <span style="font-size: 10px; font-weight: 900; color: \${config.primaryColor}; text-transform: uppercase; letter-spacing: 0.1em;">\${config.badgeText}</span>
            </div>
          </div>
        </div>
        <div style="width: 58%; padding: 2rem; display: flex; flex-direction: column; align-items: center; text-align: center; justify-content: center;">
          <h2 style="font-size: 1.875rem; font-weight: 900; line-height: 1.2; margin-bottom: 0.5rem; letter-spacing: -0.025em; color: \${config.textColor};">
            \${config.title.replace(/\\n/g, '<br>')}
          </h2>
          <p style="font-size: 0.875rem; color: #64748b; margin-bottom: 1.5rem; font-weight: 500;">\${config.subtitle}</p>

          <div style="width: 100%; background: #fdf2f8; border: 2px dashed #fbcfe8; border-radius: 1rem; padding: 1rem; margin-bottom: 1.5rem; position: relative; overflow: hidden;">
            <div style="font-size: 10px; color: #f9a8d4; font-weight: 700; text-transform: uppercase; margin-bottom: 0.25rem;">Your Coupon</div>
            <div style="font-size: 1.5rem; font-weight: 900; letter-spacing: 0.1em; color: \${config.primaryColor};">\${config.couponCode}</div>
            <div style="position: absolute; top: 50%; left: -0.5rem; width: 1rem; height: 1rem; background: white; border-radius: 50%; transform: translateY(-50%);"></div>
            <div style="position: absolute; top: 50%; right: -0.5rem; width: 1rem; height: 1rem; background: white; border-radius: 50%; transform: translateY(-50%);"></div>
          </div>

          <button onclick="document.getElementById('candypop-overlay').style.display='none'; document.getElementById('candypop-popup').style.display='none';" style="width: 100%; padding: 1rem; border-radius: 9999px; background: \${config.primaryColor}; color: white; font-weight: 900; font-size: 0.875rem; border: none; cursor: pointer; box-shadow: 0 8px 20px \${config.primaryColor}4d; margin-bottom: 1rem; transition: transform 0.2s;">
            \${config.buttonText}
          </button>

          <button onclick="document.getElementById('candypop-overlay').style.display='none'; document.getElementById('candypop-popup').style.display='none';" style="font-size: 0.75rem; font-weight: 700; color: #94a3b8; background: none; border: none; cursor: pointer;">
            \${config.disclaimerText}
          </button>
        </div>

        <button onclick="document.getElementById('candypop-overlay').style.display='none'; document.getElementById('candypop-popup').style.display='none';" style="position: absolute; top: 1rem; right: 1rem; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: rgba(255,255,255,0.2); backdrop-filter: blur(4px); color: white; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
          ×
        </button>
      </div>
    \`;

    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    // Show popup function
    function showPopup() {
      overlay.style.display = 'block';
      popup.style.display = 'block';
    }

    // Exit intent detection
    if (config.enableExitIntent) {
      let hasShown = false;
      document.addEventListener('mouseleave', function(e) {
        if (!hasShown && e.clientY <= 0) {
          showPopup();
          hasShown = true;
        }
      });
    }

    // For demo: show after 2 seconds
    setTimeout(showPopup, 2000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createPopup);
  } else {
    createPopup();
  }
})();
</script>`;
  };

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(generateEmbedCode()).then(() => {
      alert('Embed code copied to clipboard!');
    });
  };

  return (
    <div className="h-screen overflow-hidden bg-surface text-on-surface">
      {/* Top NavBar */}
      <nav className="fixed top-0 w-full border-b border-pink-100 bg-white shadow-[0_4px_16px_rgba(224,64,160,0.1)] flex justify-between items-center px-6 h-16 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-slate-500 hover:text-pink-400 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="text-2xl font-black text-pink-600 tracking-tight">CandyPop Builder</div>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-5 py-2 rounded-full border border-pink-200 text-pink-600 font-bold hover:scale-105 transition-all active:scale-95">
            Save Draft
          </button>
          <button className="px-6 py-2 rounded-full bg-primary text-white font-bold shadow-[0_4px_16px_rgba(224,64,160,0.2)] hover:scale-105 transition-all active:scale-95">
            Publish
          </button>
        </div>
      </nav>

      {/* Side NavBar */}
      <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 border-r border-slate-200 bg-white flex flex-col p-4 gap-2 z-40">
        <div className="flex items-center gap-3 px-2 py-4 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
            P
          </div>
          <div>
            <div className="font-bold text-sm text-on-surface">Project Alpha</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-black">Editing Popup</div>
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          <button
            className={`flex items-center gap-3 px-4 py-3 rounded-full font-medium text-sm transition-transform duration-200 hover:scale-[1.03] ${
              activeSection === 'builder'
                ? 'bg-pink-500 text-white shadow-[0_4px_12px_rgba(224,64,160,0.3)]'
                : 'text-slate-600 hover:bg-pink-100'
            }`}
            onClick={() => setActiveSection('builder')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            Builder
          </button>

          <button
            className={`flex items-center gap-3 px-4 py-3 rounded-full font-medium text-sm transition-transform duration-200 hover:scale-[1.03] ${
              activeSection === 'layout'
                ? 'bg-pink-500 text-white shadow-[0_4px_12px_rgba(224,64,160,0.3)]'
                : 'text-slate-600 hover:bg-pink-100'
            }`}
            onClick={() => setActiveSection('layout')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
            </svg>
            Layout
          </button>

          <button
            className={`flex items-center gap-3 px-4 py-3 rounded-full font-medium text-sm transition-transform duration-200 hover:scale-[1.03] ${
              activeSection === 'settings'
                ? 'bg-pink-500 text-white shadow-[0_4px_12px_rgba(224,64,160,0.3)]'
                : 'text-slate-600 hover:bg-pink-100'
            }`}
            onClick={() => setActiveSection('settings')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </button>
        </nav>

        <div className="mt-auto pt-4 border-t border-pink-100/50">
          <button
            onClick={copyEmbedCode}
            className="w-full py-4 rounded-2xl bg-[#4ade80] text-[#064e3b] font-bold text-sm shadow-[0_4px_12px_rgba(74,222,128,0.2)] flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-95 transition-all"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
            Add to website for free
          </button>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="ml-64 mt-16 p-8 h-[calc(100vh-64px)] overflow-y-auto grid grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {activeSection === 'layout' && (
            <>
              <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-50">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                  </svg>
                  Popup Styles
                </h3>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  <button
                    onClick={() => setSettings({ ...settings, layoutStyle: 'modal' })}
                    className={`group p-4 border-2 rounded-2xl text-center hover:scale-[1.03] active:scale-95 transition-all ${
                      settings.layoutStyle === 'modal' ? 'border-pink-500 bg-pink-50' : 'border-slate-100 bg-white hover:border-pink-200'
                    }`}
                  >
                    <div className="w-12 h-8 bg-pink-200 mx-auto mb-2 rounded border border-pink-400 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-4 bg-primary rounded-sm"></div>
                      </div>
                    </div>
                    <span className={`text-xs font-bold ${settings.layoutStyle === 'modal' ? 'text-pink-600' : 'text-slate-500'}`}>Modal</span>
                  </button>

                  <button
                    onClick={() => setSettings({ ...settings, layoutStyle: 'left-pane' })}
                    className={`group p-4 border-2 rounded-2xl text-center hover:scale-[1.03] active:scale-95 transition-all ${
                      settings.layoutStyle === 'left-pane' ? 'border-pink-500 bg-pink-50' : 'border-slate-100 bg-white hover:border-pink-200'
                    }`}
                  >
                    <div className="w-12 h-8 bg-slate-100 mx-auto mb-2 rounded border border-slate-200 relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 w-4 bg-slate-300"></div>
                    </div>
                    <span className={`text-xs font-bold ${settings.layoutStyle === 'left-pane' ? 'text-pink-600' : 'text-slate-500'}`}>Left Pane</span>
                  </button>

                  <button
                    onClick={() => setSettings({ ...settings, layoutStyle: 'right-pane' })}
                    className={`group p-4 border-2 rounded-2xl text-center hover:scale-[1.03] active:scale-95 transition-all ${
                      settings.layoutStyle === 'right-pane' ? 'border-pink-500 bg-pink-50' : 'border-slate-100 bg-white hover:border-pink-200'
                    }`}
                  >
                    <div className="w-12 h-8 bg-slate-100 mx-auto mb-2 rounded border border-slate-200 relative overflow-hidden">
                      <div className="absolute inset-y-0 right-0 w-4 bg-slate-300"></div>
                    </div>
                    <span className={`text-xs font-bold ${settings.layoutStyle === 'right-pane' ? 'text-pink-600' : 'text-slate-500'}`}>Right Pane</span>
                  </button>

                  <button
                    onClick={() => setSettings({ ...settings, layoutStyle: 'sticky-bar' })}
                    className={`group p-4 border-2 rounded-2xl text-center hover:scale-[1.03] active:scale-95 transition-all ${
                      settings.layoutStyle === 'sticky-bar' ? 'border-pink-500 bg-pink-50' : 'border-slate-100 bg-white hover:border-pink-200'
                    }`}
                  >
                    <div className="w-12 h-8 bg-slate-100 mx-auto mb-2 rounded border border-slate-200 relative overflow-hidden">
                      <div className="absolute bottom-0 inset-x-0 h-3 bg-slate-300"></div>
                    </div>
                    <span className={`text-xs font-bold ${settings.layoutStyle === 'sticky-bar' ? 'text-pink-600' : 'text-slate-500'}`}>Sticky Bar</span>
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-bold text-slate-600">Popup Width</label>
                      <span className="text-xs font-black text-primary px-2 py-1 bg-pink-50 rounded-lg">{settings.width}px</span>
                    </div>
                    <input
                      type="range"
                      min="300"
                      max="800"
                      value={settings.width}
                      onChange={(e) => setSettings({ ...settings, width: parseInt(e.target.value) })}
                      className="w-full h-2 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  <button className="w-full py-4 rounded-full bg-white border-2 border-slate-900 text-slate-900 font-black text-sm hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    Customize Colors &amp; Fonts
                  </button>
                </div>
              </div>

              <div className="bg-purple-100 rounded-2xl p-6 border border-purple-200">
                <h4 className="font-bold text-purple-900 mb-4">Quick Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xs font-bold text-slate-900">Exit Intent</span>
                    </div>
                    <button
                      onClick={() => setSettings({ ...settings, enableExitIntent: !settings.enableExitIntent })}
                      className={`w-11 h-6 rounded-full relative transition-colors ${
                        settings.enableExitIntent ? 'bg-purple-600' : 'bg-slate-400'
                      }`}
                    >
                      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                        settings.enableExitIntent ? 'right-0.5' : 'left-0.5'
                      }`}></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white/50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className="text-xs font-bold text-slate-900">Overlay Blur</span>
                    </div>
                    <button
                      onClick={() => setSettings({ ...settings, enableOverlayBlur: !settings.enableOverlayBlur })}
                      className={`w-11 h-6 rounded-full relative transition-colors ${
                        settings.enableOverlayBlur ? 'bg-purple-600' : 'bg-slate-400'
                      }`}
                    >
                      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                        settings.enableOverlayBlur ? 'right-0.5' : 'left-0.5'
                      }`}></div>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeSection === 'builder' && (
            <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-50">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Content Editor</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-slate-600 mb-2 block">Title</label>
                  <textarea
                    className="w-full bg-slate-50 border-slate-200 rounded-lg text-sm p-3 text-slate-900 focus:ring-pink-500 focus:border-pink-500"
                    rows={2}
                    value={settings.title}
                    onChange={(e) => setSettings({ ...settings, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-600 mb-2 block">Subtitle</label>
                  <textarea
                    className="w-full bg-slate-50 border-slate-200 rounded-lg text-sm p-3 text-slate-900 focus:ring-pink-500 focus:border-pink-500"
                    rows={2}
                    value={settings.subtitle}
                    onChange={(e) => setSettings({ ...settings, subtitle: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-600 mb-2 block">Coupon Code</label>
                  <input
                    type="text"
                    className="w-full bg-slate-50 border-slate-200 rounded-lg text-sm p-3 text-slate-900 font-mono focus:ring-pink-500 focus:border-pink-500"
                    value={settings.couponCode}
                    onChange={(e) => setSettings({ ...settings, couponCode: e.target.value.toUpperCase() })}
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-600 mb-2 block">Button Text</label>
                  <input
                    type="text"
                    className="w-full bg-slate-50 border-slate-200 rounded-lg text-sm p-3 text-slate-900 focus:ring-pink-500 focus:border-pink-500"
                    value={settings.buttonText}
                    onChange={(e) => setSettings({ ...settings, buttonText: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-600 mb-2 block">Badge Text</label>
                  <input
                    type="text"
                    className="w-full bg-slate-50 border-slate-200 rounded-lg text-sm p-3 text-slate-900 focus:ring-pink-500 focus:border-pink-500"
                    value={settings.badgeText}
                    onChange={(e) => setSettings({ ...settings, badgeText: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-600 mb-2 block">Image URL</label>
                  <input
                    type="text"
                    className="w-full bg-slate-50 border-slate-200 rounded-lg text-sm p-3 text-slate-900 focus:ring-pink-500 focus:border-pink-500"
                    value={settings.imageUrl}
                    onChange={(e) => setSettings({ ...settings, imageUrl: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-50">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Color Settings</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-slate-600 mb-2 block">Primary Color</label>
                  <input
                    type="color"
                    className="w-full h-12 rounded-lg cursor-pointer"
                    value={settings.primaryColor}
                    onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-600 mb-2 block">Background Color</label>
                  <input
                    type="color"
                    className="w-full h-12 rounded-lg cursor-pointer"
                    value={settings.backgroundColor}
                    onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-600 mb-2 block">Text Color</label>
                  <input
                    type="color"
                    className="w-full h-12 rounded-lg cursor-pointer"
                    value={settings.textColor}
                    onChange={(e) => setSettings({ ...settings, textColor: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Live Preview Stage */}
        <div className="col-span-12 lg:col-span-8 flex flex-col h-full">
          <div className="flex-1 rounded-3xl overflow-hidden relative border-4 border-pink-50 shadow-2xl">
            {/* Mockup Background */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop"
                alt="Preview Background"
                className="w-full h-full object-cover scale-105 blur-sm brightness-75"
              />
            </div>

            {/* Dark Overlay */}
            <div className={`absolute inset-0 z-10 ${settings.enableOverlayBlur ? 'bg-on-surface/40 backdrop-blur-sm' : 'bg-on-surface/60'}`}></div>

            {/* Popup Preview */}
            <div className="absolute inset-0 flex items-center justify-center z-20 p-6">
              <div
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] flex flex-col md:flex-row transform transition-all duration-500"
                style={{ maxWidth: `${settings.width}px`, width: '100%' }}
              >
                {/* Left Side Image */}
                <div className="md:w-5/12 relative min-h-[200px]">
                  <img
                    src={settings.imageUrl}
                    alt="Popup visual"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full inline-block">
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest">{settings.badgeText}</span>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="md:w-7/12 p-8 flex flex-col items-center text-center justify-center">
                  <h2 className="text-3xl font-black leading-tight mb-2 tracking-tighter" style={{ color: settings.textColor }}>
                    {settings.title.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < settings.title.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </h2>
                  <p className="text-sm text-slate-500 mb-6 font-medium">{settings.subtitle}</p>

                  {/* Coupon Box */}
                  <div className="w-full bg-pink-50 border-2 border-dashed border-pink-300 rounded-2xl p-4 mb-6 relative overflow-hidden">
                    <div className="text-[10px] text-pink-400 font-bold uppercase mb-1">Your Coupon</div>
                    <div className="text-2xl font-black tracking-widest" style={{ color: settings.primaryColor }}>
                      {settings.couponCode}
                    </div>
                    {/* Punched holes effect */}
                    <div className="absolute top-1/2 -left-2 w-4 h-4 bg-white rounded-full -translate-y-1/2"></div>
                    <div className="absolute top-1/2 -right-2 w-4 h-4 bg-white rounded-full -translate-y-1/2"></div>
                  </div>

                  <button
                    className="w-full py-4 rounded-full text-white font-black text-sm shadow-[0_8px_20px_rgba(224,64,160,0.3)] hover:scale-105 active:scale-95 transition-all mb-4"
                    style={{ backgroundColor: settings.primaryColor }}
                  >
                    {settings.buttonText}
                  </button>

                  <button className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">
                    {settings.disclaimerText}
                  </button>
                </div>

                {/* Close button */}
                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur flex items-center justify-center transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Preview Status Indicators */}
            <div className="absolute bottom-6 left-6 z-30 flex gap-2">
              <div className="bg-white/90 backdrop-blur rounded-full px-4 py-2 flex items-center gap-2 text-xs font-bold text-on-surface shadow-lg">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Live Preview Mode
              </div>
              <div className="bg-on-surface/80 backdrop-blur rounded-full px-4 py-2 flex items-center gap-2 text-xs font-bold text-white shadow-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Preview Toolbar */}
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center hover:bg-pink-100 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center hover:bg-pink-100 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6-6m6 6l-6 6" />
                </svg>
              </button>
              <span className="h-6 w-px bg-slate-200 mx-2"></span>
              <p className="text-xs font-bold text-slate-400 italic">Last autosave 2 mins ago</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Version History
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PopupWidgetPage;
