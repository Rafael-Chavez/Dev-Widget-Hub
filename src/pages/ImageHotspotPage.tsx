import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ImageHotspotPage.css';
import hotspotBg from '../images/hotspot_bg.jpg';

interface Hotspot {
  id: string;
  name: string;
  link: string;
  offsetLeft: number;
  offsetTop: number;
  display: 'pin' | 'button' | 'image';
  buttonLabel: string;
  imageUrl: string;
}

interface VideoSettings {
  autoplay: boolean;
  controls: boolean;
  loop: boolean;
  mute: boolean;
  showIcon: boolean;
  iconImage: string;
  iconSize: number;
  iconColor: string;
}

interface Settings {
  mediaType: 'image' | 'video';
  imageUrl: string;
  videoUrl: string;
  videoSettings: VideoSettings;
  hotspots: Hotspot[];
  maxWidth: number;
  maxHeight: number;
  showOn: 'hover' | 'click';
  hideOnMobile: boolean;
  openInNewTab: boolean;
}

const ImageHotspotPage: React.FC = () => {
  const navigate = useNavigate();
  const [showTemplates, setShowTemplates] = useState(true);
  const [activeTab, setActiveTab] = useState<'source' | 'hotspots' | 'settings' | 'css'>('source');
  const [expandedSections, setExpandedSections] = useState<string[]>(['view', 'image']);
  const [settings, setSettings] = useState<Settings>({
    mediaType: 'image',
    imageUrl: '',
    videoUrl: '',
    videoSettings: {
      autoplay: false,
      controls: true,
      loop: false,
      mute: false,
      showIcon: true,
      iconImage: '',
      iconSize: 60,
      iconColor: '#ffffff'
    },
    hotspots: [],
    maxWidth: 800,
    maxHeight: 600,
    showOn: 'hover',
    hideOnMobile: false,
    openInNewTab: true
  });

  const applyTemplate = (templateId: string) => {
    if (templateId === 'template1') {
      setSettings({
        ...settings,
        mediaType: 'image',
        imageUrl: hotspotBg,
        hotspots: [
          {
            id: '1',
            name: 'Product Feature 1',
            link: 'https://example.com',
            offsetLeft: 25,
            offsetTop: 35,
            display: 'pin',
            buttonLabel: 'Learn More',
            imageUrl: ''
          },
          {
            id: '2',
            name: 'Product Feature 2',
            link: 'https://example.com',
            offsetLeft: 75,
            offsetTop: 35,
            display: 'pin',
            buttonLabel: 'Learn More',
            imageUrl: ''
          },
          {
            id: '3',
            name: 'Product Feature 3',
            link: 'https://example.com',
            offsetLeft: 50,
            offsetTop: 70,
            display: 'button',
            buttonLabel: 'Shop Now',
            imageUrl: ''
          }
        ],
        maxWidth: 800,
        maxHeight: 600
      });
    }
    setShowTemplates(false);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const addHotspot = () => {
    const newHotspot: Hotspot = {
      id: Date.now().toString(),
      name: 'New Hotspot',
      link: '',
      offsetLeft: 50,
      offsetTop: 50,
      display: 'pin',
      buttonLabel: 'Click Here',
      imageUrl: ''
    };
    setSettings({
      ...settings,
      hotspots: [...settings.hotspots, newHotspot]
    });
  };

  const updateHotspot = (id: string, field: keyof Hotspot, value: any) => {
    setSettings({
      ...settings,
      hotspots: settings.hotspots.map(h =>
        h.id === id ? { ...h, [field]: value } : h
      )
    });
  };

  const removeHotspot = (id: string) => {
    setSettings({
      ...settings,
      hotspots: settings.hotspots.filter(h => h.id !== id)
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSettings({ ...settings, imageUrl: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHotspotImageUpload = (hotspotId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateHotspot(hotspotId, 'imageUrl', event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSettings({
          ...settings,
          videoSettings: {
            ...settings.videoSettings,
            iconImage: event.target?.result as string
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const generateEmbedCode = (): string => {
    const hotspotsHtml = settings.hotspots.map(hotspot => {
      let hotspotContent = '';

      if (hotspot.display === 'pin') {
        hotspotContent = `<div class="hotspot-pin" style="position: absolute; left: ${hotspot.offsetLeft}%; top: ${hotspot.offsetTop}%; transform: translate(-50%, -50%); width: 24px; height: 24px; background: #3498db; border: 3px solid white; border-radius: 50%; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.3); transition: all 0.3s;" data-link="${hotspot.link}" data-name="${hotspot.name}"></div>`;
      } else if (hotspot.display === 'button') {
        hotspotContent = `<button class="hotspot-button" style="position: absolute; left: ${hotspot.offsetLeft}%; top: ${hotspot.offsetTop}%; transform: translate(-50%, -50%); padding: 8px 16px; background: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 600; box-shadow: 0 2px 8px rgba(0,0,0,0.3); transition: all 0.3s;" data-link="${hotspot.link}">${hotspot.buttonLabel}</button>`;
      } else if (hotspot.display === 'image' && hotspot.imageUrl) {
        hotspotContent = `<img class="hotspot-image" src="${hotspot.imageUrl}" alt="${hotspot.name}" style="position: absolute; left: ${hotspot.offsetLeft}%; top: ${hotspot.offsetTop}%; transform: translate(-50%, -50%); max-width: 60px; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.3); border-radius: 4px; transition: all 0.3s;" data-link="${hotspot.link}">`;
      }

      return hotspotContent;
    }).join('');

    let mediaHtml = '';
    if (settings.mediaType === 'image' && settings.imageUrl) {
      mediaHtml = `<img src="${settings.imageUrl}" alt="Hotspot Image" style="width: 100%; height: 100%; object-fit: contain; display: block;">`;
    } else if (settings.mediaType === 'video' && settings.videoUrl) {
      const videoSrc = settings.videoUrl.includes('youtube.com') || settings.videoUrl.includes('youtu.be')
        ? settings.videoUrl.replace('watch?v=', 'embed/')
        : settings.videoUrl.includes('vimeo.com')
        ? settings.videoUrl.replace('vimeo.com/', 'player.vimeo.com/video/')
        : settings.videoUrl;

      const isExternal = videoSrc.includes('youtube') || videoSrc.includes('vimeo');

      if (isExternal) {
        mediaHtml = `<iframe src="${videoSrc}?autoplay=${settings.videoSettings.autoplay ? 1 : 0}&controls=${settings.videoSettings.controls ? 1 : 0}&loop=${settings.videoSettings.loop ? 1 : 0}&mute=${settings.videoSettings.mute ? 1 : 0}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen style="width: 100%; height: 100%; display: block;"></iframe>`;
      } else {
        mediaHtml = `<video ${settings.videoSettings.autoplay ? 'autoplay' : ''} ${settings.videoSettings.controls ? 'controls' : ''} ${settings.videoSettings.loop ? 'loop' : ''} ${settings.videoSettings.mute ? 'muted' : ''} style="width: 100%; height: 100%; object-fit: contain; display: block;">
          <source src="${videoSrc}" type="video/mp4">
        </video>`;
      }
    }

    const mobileStyles = settings.hideOnMobile ? `
  @media (max-width: 768px) {
    .hotspot-pin, .hotspot-button, .hotspot-image { display: none !important; }
  }` : '';

    return `<!-- Image Hotspot Widget -->
<div id="image-hotspot-container" style="position: relative; max-width: ${settings.maxWidth}px; max-height: ${settings.maxHeight}px; margin: 0 auto; overflow: hidden;">
  ${mediaHtml}
  ${hotspotsHtml}
</div>
<style>
  #image-hotspot-container .hotspot-pin:hover,
  #image-hotspot-container .hotspot-button:hover,
  #image-hotspot-container .hotspot-image:hover {
    transform: translate(-50%, -50%) scale(1.1);
  }${mobileStyles}
</style>
<script>
  document.querySelectorAll('#image-hotspot-container [data-link]').forEach(el => {
    el.addEventListener('${settings.showOn}', () => {
      const link = el.getAttribute('data-link');
      if (link) {
        window.open(link, '${settings.openInNewTab ? '_blank' : '_self'}');
      }
    });
  });
</script>`;
  };

  const copyEmbedCode = () => {
    const code = generateEmbedCode();
    navigator.clipboard.writeText(code).then(() => {
      alert('Embed code copied to clipboard!');
    });
  };

  if (showTemplates) {
    return (
      <div className="templates-page">
        <div className="templates-header">
          <button className="back-btn-templates" onClick={() => navigate('/')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
          </button>
          <h1>Choose a Template</h1>
          <p>Select a pre-designed template to get started quickly</p>
        </div>

        <div className="templates-grid">
          <div className="template-card" onClick={() => applyTemplate('template1')}>
            <div className="template-preview">
              <img src={hotspotBg} alt="Product Showcase Template" />
              <div className="template-overlay">
                <button className="template-select-btn">Use Template</button>
              </div>
            </div>
            <div className="template-info">
              <h3>Product Showcase</h3>
              <p>Highlight multiple features with interactive hotspots</p>
            </div>
          </div>

          <div className="template-card" onClick={() => setShowTemplates(false)}>
            <div className="template-preview blank-template">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4"/>
                <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div className="template-overlay">
                <button className="template-select-btn">Start Blank</button>
              </div>
            </div>
            <div className="template-info">
              <h3>Blank Canvas</h3>
              <p>Start from scratch with a blank template</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="image-hotspot-page">
      <div className="sidebar">
        <div className="sidebar-layout">
          {/* Icon Navigation */}
          <div className="icon-nav">
            <div
              className={`icon-nav-item ${activeTab === 'source' ? 'active' : ''}`}
              onClick={() => setActiveTab('source')}
            >
              <div className="icon-nav-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="icon-nav-label">Source</div>
            </div>
            <div
              className={`icon-nav-item ${activeTab === 'hotspots' ? 'active' : ''}`}
              onClick={() => setActiveTab('hotspots')}
            >
              <div className="icon-nav-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="1" fill="currentColor"/>
                </svg>
              </div>
              <div className="icon-nav-label">Hotspots</div>
            </div>
            <div
              className={`icon-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <div className="icon-nav-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 1v6m0 6v10M1 12h6m6 0h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M4.22 4.22l4.24 4.24m7.08 0l4.24-4.24M4.22 19.78l4.24-4.24m7.08 0l4.24 4.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="icon-nav-label">Settings</div>
            </div>
            <div
              className={`icon-nav-item ${activeTab === 'css' ? 'active' : ''}`}
              onClick={() => setActiveTab('css')}
            >
              <div className="icon-nav-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 3l4 4-4 4M8 3l-4 4 4 4M12 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="icon-nav-label">CSS</div>
            </div>
          </div>

          {/* Content Area */}
          <div className="sidebar-content-new">
            {activeTab === 'source' && (
              <>
                {/* View Section */}
                <div className="collapsible-section">
                  <div
                    className="collapsible-header"
                    onClick={() => toggleSection('view')}
                  >
                    <span className="chevron">{expandedSections.includes('view') ? '▼' : '▶'}</span>
                    <span>View</span>
                  </div>
                  {expandedSections.includes('view') && (
                    <div className="collapsible-content">
                      <div className="toggle-buttons">
                        <button
                          className={`toggle-btn ${settings.mediaType === 'image' ? 'active' : ''}`}
                          onClick={() => setSettings({ ...settings, mediaType: 'image' })}
                        >
                          Image
                        </button>
                        <button
                          className={`toggle-btn ${settings.mediaType === 'video' ? 'active' : ''}`}
                          onClick={() => setSettings({ ...settings, mediaType: 'video' })}
                        >
                          Video
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Image Section */}
                <div className="collapsible-section">
                  <div
                    className="collapsible-header"
                    onClick={() => toggleSection('image')}
                  >
                    <span className="chevron">{expandedSections.includes('image') ? '▼' : '▶'}</span>
                    <span>Image</span>
                  </div>
                  {expandedSections.includes('image') && (
                    <div className="collapsible-content">
                      <div className="upload-box">
                        <input
                          type="file"
                          id="imageUpload"
                          accept="image/*"
                          onChange={handleImageUpload}
                          style={{ display: 'none' }}
                        />
                        <div className="upload-button-container">
                          <button
                            className="upload-button"
                            onClick={() => document.getElementById('imageUpload')?.click()}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                                <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span>Update Source</span>
                            </div>
                            {settings.imageUrl && (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </button>
                        </div>
                        {settings.imageUrl && (
                          <div className="upload-preview">
                            <img src={settings.imageUrl} alt="Preview" />
                          </div>
                        )}
                      </div>
                      <div className="helper-text">
                        This image will be used as video(mp4 file) poster
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Section */}
                <div className="collapsible-section">
                  <div
                    className="collapsible-header"
                    onClick={() => toggleSection('video')}
                  >
                    <span className="chevron">{expandedSections.includes('video') ? '▼' : '▶'}</span>
                    <span>Video</span>
                  </div>
                  {expandedSections.includes('video') && (
                    <div className="collapsible-content">
                      <div className="upload-box">
                        <div className="upload-button-container">
                          <button className="upload-button">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23 7l-7 5 7 5V7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <rect x="1" y="5" width="15" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                              <span>Upload Video</span>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                        <input
                          type="text"
                          className="url-input"
                          placeholder="Or Type Video URL"
                          value={settings.videoUrl}
                          onChange={(e) => setSettings({ ...settings, videoUrl: e.target.value })}
                        />
                        <div className="helper-text">
                          Enter YOUTUBE, VIMEO or MP4 Links
                        </div>
                      </div>

                      <div className="settings-grid">
                        <div className="setting-row">
                          <span>Autoplay</span>
                          <label className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={settings.videoSettings.autoplay}
                              onChange={(e) => setSettings({
                                ...settings,
                                videoSettings: { ...settings.videoSettings, autoplay: e.target.checked }
                              })}
                            />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>

                        <div className="setting-row">
                          <span>Controls</span>
                          <label className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={settings.videoSettings.controls}
                              onChange={(e) => setSettings({
                                ...settings,
                                videoSettings: { ...settings.videoSettings, controls: e.target.checked }
                              })}
                            />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>

                        <div className="setting-row">
                          <span>Loop</span>
                          <label className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={settings.videoSettings.loop}
                              onChange={(e) => setSettings({
                                ...settings,
                                videoSettings: { ...settings.videoSettings, loop: e.target.checked }
                              })}
                            />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>

                        <div className="setting-row">
                          <span>Mute</span>
                          <label className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={settings.videoSettings.mute}
                              onChange={(e) => setSettings({
                                ...settings,
                                videoSettings: { ...settings.videoSettings, mute: e.target.checked }
                              })}
                            />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>

                        <div className="setting-row">
                          <span>Icon</span>
                          <label className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={settings.videoSettings.showIcon}
                              onChange={(e) => setSettings({
                                ...settings,
                                videoSettings: { ...settings.videoSettings, showIcon: e.target.checked }
                              })}
                            />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>

                        {settings.videoSettings.showIcon && (
                          <>
                            <div className="setting-row full-width">
                              <span>Icon</span>
                              <div className="upload-button-container">
                                <input
                                  type="file"
                                  id="iconUpload"
                                  accept="image/*"
                                  onChange={handleIconUpload}
                                  style={{ display: 'none' }}
                                />
                                <button
                                  className="upload-button"
                                  onClick={() => document.getElementById('iconUpload')?.click()}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                      <path d="M10 8l6 4-6 4V8z" fill="currentColor"/>
                                    </svg>
                                    <span>Icon</span>
                                  </div>
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </button>
                              </div>
                            </div>

                            <div className="setting-row">
                              <span>Icon size</span>
                              <div className="input-with-unit">
                                <input
                                  type="number"
                                  value={settings.videoSettings.iconSize}
                                  onChange={(e) => setSettings({
                                    ...settings,
                                    videoSettings: { ...settings.videoSettings, iconSize: Number(e.target.value) }
                                  })}
                                />
                                <span>px</span>
                              </div>
                            </div>

                            <div className="setting-row">
                              <span>Icon color</span>
                              <input
                                type="color"
                                className="color-input"
                                value={settings.videoSettings.iconColor}
                                onChange={(e) => setSettings({
                                  ...settings,
                                  videoSettings: { ...settings.videoSettings, iconColor: e.target.value }
                                })}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === 'hotspots' && (
              <div className="hotspots-tab">
                <button className="add-hotspot-btn-new" onClick={addHotspot}>
                  + Add Hotspot
                </button>
                <div className="hotspots-list-new">
                  {settings.hotspots.map((hotspot) => (
                    <div key={hotspot.id} className="hotspot-card">
                      <div className="hotspot-card-header">
                        <h4>{hotspot.name}</h4>
                        <button
                          className="remove-btn"
                          onClick={() => removeHotspot(hotspot.id)}
                        >
                          ×
                        </button>
                      </div>

                      <div className="form-field">
                        <label>Name</label>
                        <input
                          type="text"
                          value={hotspot.name}
                          onChange={(e) => updateHotspot(hotspot.id, 'name', e.target.value)}
                        />
                      </div>

                      <div className="form-field">
                        <label>Link</label>
                        <input
                          type="url"
                          value={hotspot.link}
                          onChange={(e) => updateHotspot(hotspot.id, 'link', e.target.value)}
                          placeholder="https://example.com"
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-field">
                          <label>Offset Left (%)</label>
                          <div className="slider-container">
                            <input
                              type="range"
                              value={hotspot.offsetLeft}
                              onChange={(e) => updateHotspot(hotspot.id, 'offsetLeft', Number(e.target.value))}
                              min="0"
                              max="100"
                              className="range-slider"
                            />
                            <span className="slider-value">{hotspot.offsetLeft}%</span>
                          </div>
                        </div>
                        <div className="form-field">
                          <label>Offset Top (%)</label>
                          <div className="slider-container">
                            <input
                              type="range"
                              value={hotspot.offsetTop}
                              onChange={(e) => updateHotspot(hotspot.id, 'offsetTop', Number(e.target.value))}
                              min="0"
                              max="100"
                              className="range-slider"
                            />
                            <span className="slider-value">{hotspot.offsetTop}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="form-field">
                        <label>Display Type</label>
                        <select
                          value={hotspot.display}
                          onChange={(e) => updateHotspot(hotspot.id, 'display', e.target.value as 'pin' | 'button' | 'image')}
                        >
                          <option value="pin">Pin</option>
                          <option value="button">Button</option>
                          <option value="image">Image</option>
                        </select>
                      </div>

                      {hotspot.display === 'button' && (
                        <div className="form-field">
                          <label>Button Label</label>
                          <input
                            type="text"
                            value={hotspot.buttonLabel}
                            onChange={(e) => updateHotspot(hotspot.id, 'buttonLabel', e.target.value)}
                          />
                        </div>
                      )}

                      {hotspot.display === 'image' && (
                        <div className="form-field">
                          <label>Hotspot Image</label>
                          <input
                            type="file"
                            id={`hotspotImage-${hotspot.id}`}
                            accept="image/*"
                            onChange={(e) => handleHotspotImageUpload(hotspot.id, e)}
                            style={{ display: 'none' }}
                          />
                          <button
                            className="upload-btn-small"
                            onClick={() => document.getElementById(`hotspotImage-${hotspot.id}`)?.click()}
                          >
                            Upload Image
                          </button>
                          {hotspot.imageUrl && (
                            <img src={hotspot.imageUrl} alt="Hotspot" className="preview-small" />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="settings-tab">
                <h3>Container Options</h3>
                <div className="form-field">
                  <label>Max Width (px)</label>
                  <input
                    type="number"
                    value={settings.maxWidth}
                    onChange={(e) => setSettings({ ...settings, maxWidth: Number(e.target.value) })}
                  />
                </div>
                <div className="form-field">
                  <label>Max Height (px)</label>
                  <input
                    type="number"
                    value={settings.maxHeight}
                    onChange={(e) => setSettings({ ...settings, maxHeight: Number(e.target.value) })}
                  />
                </div>

                <h3 style={{ marginTop: '20px' }}>Hotspot Behavior</h3>
                <div className="form-field">
                  <label>Show On</label>
                  <select
                    value={settings.showOn}
                    onChange={(e) => setSettings({ ...settings, showOn: e.target.value as 'hover' | 'click' })}
                  >
                    <option value="hover">Hover</option>
                    <option value="click">Click</option>
                  </select>
                </div>

                <div className="setting-row">
                  <span>Hide on Mobile</span>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.hideOnMobile}
                      onChange={(e) => setSettings({ ...settings, hideOnMobile: e.target.checked })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="setting-row">
                  <span>Open Links in New Tab</span>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.openInNewTab}
                      onChange={(e) => setSettings({ ...settings, openInNewTab: e.target.checked })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'css' && (
              <div className="css-tab">
                <div className="code-box-small">{generateEmbedCode()}</div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="sidebar-footer">
          <button className="footer-btn secondary" onClick={() => setShowTemplates(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Templates</span>
          </button>
          <button className="footer-btn primary" onClick={copyEmbedCode}>
            Create widget
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="preview-area">
          <div className="preview-container">
            <div
              className="hotspot-preview"
              style={{
                maxWidth: `${settings.maxWidth}px`,
                maxHeight: `${settings.maxHeight}px`,
                position: 'relative',
                margin: '0 auto'
              }}
            >
              {settings.mediaType === 'image' && settings.imageUrl && (
                <img
                  src={settings.imageUrl}
                  alt="Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                />
              )}

              {settings.mediaType === 'video' && settings.videoUrl && (
                <div style={{ width: '100%', height: '100%', background: '#000' }}>
                  <p style={{ color: 'white', textAlign: 'center', padding: '40px' }}>
                    Video Preview: {settings.videoUrl}
                  </p>
                </div>
              )}

              {settings.hotspots.map((hotspot) => (
                <div
                  key={hotspot.id}
                  style={{
                    position: 'absolute',
                    left: `${hotspot.offsetLeft}%`,
                    top: `${hotspot.offsetTop}%`,
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  title={hotspot.name}
                >
                  {hotspot.display === 'pin' && (
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        background: '#3498db',
                        border: '3px solid white',
                        borderRadius: '50%',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                      }}
                    />
                  )}
                  {hotspot.display === 'button' && (
                    <button
                      style={{
                        padding: '8px 16px',
                        background: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '600',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        cursor: 'pointer'
                      }}
                    >
                      {hotspot.buttonLabel}
                    </button>
                  )}
                  {hotspot.display === 'image' && hotspot.imageUrl && (
                    <img
                      src={hotspot.imageUrl}
                      alt={hotspot.name}
                      style={{
                        maxWidth: '60px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        borderRadius: '4px'
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="export-section">
            <h2>Embed Code</h2>
            <p>Copy and paste this code into your website to display your image hotspot widget.</p>
            <div className="code-box">{generateEmbedCode()}</div>
            <button className="copy-btn" onClick={copyEmbedCode}>Copy to Clipboard</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageHotspotPage;
