import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PopupWidgetPage.css';

interface Block {
  id: string;
  type: 'heading' | 'text' | 'button' | 'image' | 'form' | 'spacing' | 'separator';
  content: string;
  settings: any;
}

interface PopupSettings {
  position: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-bar' | 'bottom-bar';
  width: number;
  backgroundColor: string;
  borderRadius: number;
  padding: number;
  overlay: boolean;
  overlayOpacity: number;
  showCloseButton: boolean;
  closeButtonPosition: 'inside' | 'outside';
  trigger: 'immediate' | 'delay' | 'scroll' | 'exit';
  delaySeconds: number;
  scrollPercent: number;
  animation: 'fade' | 'slide' | 'zoom' | 'bounce';
}

const PopupWidgetPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'behavior'>('content');
  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: 'default-heading',
      type: 'heading',
      content: 'Special Offer! 🎉',
      settings: { fontSize: 32, color: '#1f2937', align: 'center', fontWeight: 'bold' }
    },
    {
      id: 'default-text',
      type: 'text',
      content: 'Get 20% off your first order when you sign up today!',
      settings: { fontSize: 16, color: '#6b7280', align: 'center', lineHeight: 1.5 }
    },
    {
      id: 'default-form',
      type: 'form',
      content: 'Enter your email',
      settings: { buttonText: 'Claim Offer', buttonColor: '#4285f4', inputPlaceholder: 'your@email.com' }
    }
  ]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>('default-heading');

  const [settings, setSettings] = useState<PopupSettings>({
    position: 'center',
    width: 500,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 40,
    overlay: true,
    overlayOpacity: 50,
    showCloseButton: true,
    closeButtonPosition: 'inside',
    trigger: 'delay',
    delaySeconds: 3,
    scrollPercent: 50,
    animation: 'fade'
  });

  const blockTypes = [
    { type: 'heading', icon: '📝', label: 'Heading', description: 'Add a title' },
    { type: 'text', icon: '📄', label: 'Text', description: 'Add paragraph text' },
    { type: 'button', icon: '🔘', label: 'Button', description: 'Add a CTA button' },
    { type: 'image', icon: '🖼️', label: 'Image', description: 'Add an image' },
    { type: 'form', icon: '📧', label: 'Email Form', description: 'Collect emails' },
    { type: 'spacing', icon: '↕️', label: 'Spacing', description: 'Add vertical space' },
    { type: 'separator', icon: '➖', label: 'Divider', description: 'Add a line' }
  ];

  const addBlock = (type: Block['type']) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      settings: getDefaultSettings(type)
    };
    setBlocks([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
  };

  const getDefaultContent = (type: Block['type']): string => {
    const defaults = {
      heading: 'Your Heading',
      text: 'Your text content goes here.',
      button: 'Click Me',
      image: 'https://via.placeholder.com/400x200',
      form: 'Enter your email',
      spacing: '20',
      separator: ''
    };
    return defaults[type];
  };

  const getDefaultSettings = (type: Block['type']): any => {
    const baseSettings = {
      heading: { fontSize: 28, color: '#1f2937', align: 'center', fontWeight: 'bold' },
      text: { fontSize: 16, color: '#6b7280', align: 'left', lineHeight: 1.5 },
      button: { bgColor: '#4285f4', textColor: '#ffffff', url: '#', fontSize: 16, borderRadius: 8, padding: '14px 32px', align: 'center' },
      image: { width: '100%', borderRadius: 8 },
      form: { buttonText: 'Submit', buttonColor: '#4285f4', inputPlaceholder: 'your@email.com' },
      spacing: { height: 20 },
      separator: { color: '#e5e7eb', thickness: 1 }
    };
    return baseSettings[type];
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
    if (selectedBlockId === id) {
      setSelectedBlockId(blocks[0]?.id || null);
    }
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex(block => block.id === id);
    if (
      (direction === 'up' && index > 0) ||
      (direction === 'down' && index < blocks.length - 1)
    ) {
      const newBlocks = [...blocks];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];
      setBlocks(newBlocks);
    }
  };

  const updateBlockContent = (id: string, content: string) => {
    setBlocks(blocks.map(block =>
      block.id === id ? { ...block, content } : block
    ));
  };

  const updateBlockSettings = (id: string, updatedSettings: any) => {
    setBlocks(blocks.map(block =>
      block.id === id ? { ...block, settings: { ...block.settings, ...updatedSettings } } : block
    ));
  };

  const selectedBlock = blocks.find(block => block.id === selectedBlockId);

  const generateEmbedCode = (): string => {
    const config = {
      blocks,
      settings
    };

    return `<!-- Widget Hub Popup -->
<div id="widget-hub-popup"></div>
<script>
(function() {
  const config = ${JSON.stringify(config, null, 2)};

  // Popup code implementation here
  console.log('Widget Hub Popup loaded', config);
})();
</script>`;
  };

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(generateEmbedCode());
    alert('Embed code copied to clipboard!');
  };

  return (
    <div className="popup-widget-page">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>Popup Builder</h1>
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
            className={`tab-nav-btn ${activeTab === 'design' ? 'active' : ''}`}
            onClick={() => setActiveTab('design')}
          >
            Design
          </button>
          <button
            className={`tab-nav-btn ${activeTab === 'behavior' ? 'active' : ''}`}
            onClick={() => setActiveTab('behavior')}
          >
            Behavior
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'content' && (
            <div className="tab-pane active">
              <div className="content-section">
                <h3 className="section-title">Add Blocks</h3>
                <div className="block-types-grid">
                  {blockTypes.map(({ type, icon, label, description }) => (
                    <button
                      key={type}
                      className="block-type-card"
                      onClick={() => addBlock(type as Block['type'])}
                    >
                      <span className="block-icon">{icon}</span>
                      <div className="block-info">
                        <span className="block-label">{label}</span>
                        <span className="block-description">{description}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">Blocks ({blocks.length})</h3>
                <div className="blocks-list">
                  {blocks.map((block, index) => (
                    <div
                      key={block.id}
                      className={`block-item ${selectedBlockId === block.id ? 'selected' : ''}`}
                      onClick={() => setSelectedBlockId(block.id)}
                    >
                      <div className="block-item-content">
                        <span className="block-item-icon">
                          {blockTypes.find(t => t.type === block.type)?.icon}
                        </span>
                        <span className="block-item-label">
                          {blockTypes.find(t => t.type === block.type)?.label}
                        </span>
                      </div>
                      <div className="block-item-actions">
                        <button
                          className="block-action-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            moveBlock(block.id, 'up');
                          }}
                          disabled={index === 0}
                          title="Move up"
                        >
                          ↑
                        </button>
                        <button
                          className="block-action-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            moveBlock(block.id, 'down');
                          }}
                          disabled={index === blocks.length - 1}
                          title="Move down"
                        >
                          ↓
                        </button>
                        <button
                          className="block-action-btn delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeBlock(block.id);
                          }}
                          title="Delete"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedBlock && (
                <div className="content-section">
                  <h3 className="section-title">Edit Block</h3>
                  <div className="control-group">
                    <label>Content</label>
                    {selectedBlock.type === 'spacing' ? (
                      <input
                        type="number"
                        value={selectedBlock.content}
                        onChange={(e) => updateBlockContent(selectedBlock.id, e.target.value)}
                        placeholder="Height in pixels"
                      />
                    ) : selectedBlock.type === 'separator' ? (
                      <p className="helper-text">This block has no editable content</p>
                    ) : (
                      <textarea
                        value={selectedBlock.content}
                        onChange={(e) => updateBlockContent(selectedBlock.id, e.target.value)}
                        rows={3}
                      />
                    )}
                  </div>

                  {renderBlockSettings(selectedBlock)}
                </div>
              )}
            </div>
          )}

          {activeTab === 'design' && (
            <div className="tab-pane active">
              <div className="content-section">
                <h3 className="section-title">Position</h3>
                <div className="position-grid">
                  {[
                    { value: 'top-left', label: 'Top Left', icon: '↖' },
                    { value: 'center', label: 'Center', icon: '⊙' },
                    { value: 'top-right', label: 'Top Right', icon: '↗' },
                    { value: 'bottom-left', label: 'Bottom Left', icon: '↙' },
                    { value: 'bottom-right', label: 'Bottom Right', icon: '↘' }
                  ].map(pos => (
                    <button
                      key={pos.value}
                      className={`position-btn ${settings.position === pos.value ? 'active' : ''}`}
                      onClick={() => setSettings({ ...settings, position: pos.value as any })}
                    >
                      <span className="position-icon">{pos.icon}</span>
                      <span className="position-label">{pos.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">Size</h3>
                <div className="control-group">
                  <label htmlFor="width">
                    <span>Width</span>
                    <span className="control-value">{settings.width}px</span>
                  </label>
                  <input
                    type="range"
                    id="width"
                    min="300"
                    max="800"
                    value={settings.width}
                    onChange={(e) => setSettings({ ...settings, width: parseInt(e.target.value) })}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="padding">
                    <span>Padding</span>
                    <span className="control-value">{settings.padding}px</span>
                  </label>
                  <input
                    type="range"
                    id="padding"
                    min="20"
                    max="60"
                    value={settings.padding}
                    onChange={(e) => setSettings({ ...settings, padding: parseInt(e.target.value) })}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="borderRadius">
                    <span>Border Radius</span>
                    <span className="control-value">{settings.borderRadius}px</span>
                  </label>
                  <input
                    type="range"
                    id="borderRadius"
                    min="0"
                    max="30"
                    value={settings.borderRadius}
                    onChange={(e) => setSettings({ ...settings, borderRadius: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">Colors</h3>
                <div className="control-group">
                  <label htmlFor="backgroundColor">Background Color</label>
                  <input
                    type="color"
                    id="backgroundColor"
                    value={settings.backgroundColor}
                    onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
                  />
                </div>
              </div>

              <div className="content-section">
                <h3 className="section-title">Overlay</h3>
                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.overlay}
                      onChange={(e) => setSettings({ ...settings, overlay: e.target.checked })}
                    />
                    <span>Show Overlay</span>
                  </label>
                </div>

                {settings.overlay && (
                  <div className="control-group">
                    <label htmlFor="overlayOpacity">
                      <span>Overlay Opacity</span>
                      <span className="control-value">{settings.overlayOpacity}%</span>
                    </label>
                    <input
                      type="range"
                      id="overlayOpacity"
                      min="0"
                      max="100"
                      value={settings.overlayOpacity}
                      onChange={(e) => setSettings({ ...settings, overlayOpacity: parseInt(e.target.value) })}
                    />
                  </div>
                )}
              </div>

              <div className="content-section">
                <h3 className="section-title">Close Button</h3>
                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.showCloseButton}
                      onChange={(e) => setSettings({ ...settings, showCloseButton: e.target.checked })}
                    />
                    <span>Show Close Button</span>
                  </label>
                </div>

                {settings.showCloseButton && (
                  <div className="control-group">
                    <label htmlFor="closeButtonPosition">Position</label>
                    <select
                      id="closeButtonPosition"
                      value={settings.closeButtonPosition}
                      onChange={(e) => setSettings({ ...settings, closeButtonPosition: e.target.value as any })}
                    >
                      <option value="inside">Inside</option>
                      <option value="outside">Outside</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'behavior' && (
            <div className="tab-pane active">
              <div className="content-section">
                <h3 className="section-title">Display Trigger</h3>
                <div className="trigger-options">
                  {[
                    { value: 'immediate', label: 'Immediately', description: 'Show as soon as page loads' },
                    { value: 'delay', label: 'Time Delay', description: 'Show after X seconds' },
                    { value: 'scroll', label: 'Scroll Depth', description: 'Show after scrolling X%' },
                    { value: 'exit', label: 'Exit Intent', description: 'Show when leaving page' }
                  ].map(trigger => (
                    <button
                      key={trigger.value}
                      className={`trigger-option ${settings.trigger === trigger.value ? 'active' : ''}`}
                      onClick={() => setSettings({ ...settings, trigger: trigger.value as any })}
                    >
                      <span className="trigger-label">{trigger.label}</span>
                      <span className="trigger-description">{trigger.description}</span>
                    </button>
                  ))}
                </div>

                {settings.trigger === 'delay' && (
                  <div className="control-group">
                    <label htmlFor="delaySeconds">Delay (seconds)</label>
                    <input
                      type="number"
                      id="delaySeconds"
                      min="0"
                      max="60"
                      value={settings.delaySeconds}
                      onChange={(e) => setSettings({ ...settings, delaySeconds: parseInt(e.target.value) })}
                    />
                  </div>
                )}

                {settings.trigger === 'scroll' && (
                  <div className="control-group">
                    <label htmlFor="scrollPercent">
                      <span>Scroll Percentage</span>
                      <span className="control-value">{settings.scrollPercent}%</span>
                    </label>
                    <input
                      type="range"
                      id="scrollPercent"
                      min="0"
                      max="100"
                      value={settings.scrollPercent}
                      onChange={(e) => setSettings({ ...settings, scrollPercent: parseInt(e.target.value) })}
                    />
                  </div>
                )}
              </div>

              <div className="content-section">
                <h3 className="section-title">Animation</h3>
                <div className="control-group">
                  <label htmlFor="animation">Entry Animation</label>
                  <select
                    id="animation"
                    value={settings.animation}
                    onChange={(e) => setSettings({ ...settings, animation: e.target.value as any })}
                  >
                    <option value="fade">Fade In</option>
                    <option value="slide">Slide In</option>
                    <option value="zoom">Zoom In</option>
                    <option value="bounce">Bounce In</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="main-content">
        <div className="preview-area">
          <div className="preview-container">
            <PopupPreview blocks={blocks} settings={settings} />
          </div>

          <div className="export-section">
            <h2>Embed Code</h2>
            <p>Copy and paste this code into your website's HTML</p>
            <div className="code-box">{generateEmbedCode()}</div>
            <button className="copy-btn" onClick={copyEmbedCode}>
              Copy to Clipboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  function renderBlockSettings(block: Block) {
    switch (block.type) {
      case 'heading':
        return (
          <>
            <div className="control-group">
              <label htmlFor="fontSize">Font Size</label>
              <input
                type="number"
                id="fontSize"
                value={block.settings.fontSize}
                onChange={(e) => updateBlockSettings(block.id, { fontSize: parseInt(e.target.value) })}
              />
            </div>
            <div className="control-group">
              <label htmlFor="color">Color</label>
              <input
                type="color"
                id="color"
                value={block.settings.color}
                onChange={(e) => updateBlockSettings(block.id, { color: e.target.value })}
              />
            </div>
            <div className="control-group">
              <label htmlFor="align">Alignment</label>
              <select
                id="align"
                value={block.settings.align}
                onChange={(e) => updateBlockSettings(block.id, { align: e.target.value })}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </>
        );

      case 'text':
        return (
          <>
            <div className="control-group">
              <label htmlFor="fontSize">Font Size</label>
              <input
                type="number"
                id="fontSize"
                value={block.settings.fontSize}
                onChange={(e) => updateBlockSettings(block.id, { fontSize: parseInt(e.target.value) })}
              />
            </div>
            <div className="control-group">
              <label htmlFor="color">Color</label>
              <input
                type="color"
                id="color"
                value={block.settings.color}
                onChange={(e) => updateBlockSettings(block.id, { color: e.target.value })}
              />
            </div>
            <div className="control-group">
              <label htmlFor="align">Alignment</label>
              <select
                id="align"
                value={block.settings.align}
                onChange={(e) => updateBlockSettings(block.id, { align: e.target.value })}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </>
        );

      case 'button':
        return (
          <>
            <div className="control-group">
              <label htmlFor="url">URL</label>
              <input
                type="text"
                id="url"
                value={block.settings.url}
                onChange={(e) => updateBlockSettings(block.id, { url: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
            <div className="control-group">
              <label htmlFor="bgColor">Background Color</label>
              <input
                type="color"
                id="bgColor"
                value={block.settings.bgColor}
                onChange={(e) => updateBlockSettings(block.id, { bgColor: e.target.value })}
              />
            </div>
            <div className="control-group">
              <label htmlFor="textColor">Text Color</label>
              <input
                type="color"
                id="textColor"
                value={block.settings.textColor}
                onChange={(e) => updateBlockSettings(block.id, { textColor: e.target.value })}
              />
            </div>
            <div className="control-group">
              <label htmlFor="align">Alignment</label>
              <select
                id="align"
                value={block.settings.align}
                onChange={(e) => updateBlockSettings(block.id, { align: e.target.value })}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </>
        );

      case 'image':
        return (
          <>
            <div className="control-group">
              <label htmlFor="width">Width</label>
              <input
                type="text"
                id="width"
                value={block.settings.width}
                onChange={(e) => updateBlockSettings(block.id, { width: e.target.value })}
                placeholder="100% or 400px"
              />
            </div>
            <div className="control-group">
              <label htmlFor="borderRadius">Border Radius</label>
              <input
                type="number"
                id="borderRadius"
                value={block.settings.borderRadius}
                onChange={(e) => updateBlockSettings(block.id, { borderRadius: parseInt(e.target.value) })}
              />
            </div>
          </>
        );

      case 'form':
        return (
          <>
            <div className="control-group">
              <label htmlFor="inputPlaceholder">Input Placeholder</label>
              <input
                type="text"
                id="inputPlaceholder"
                value={block.settings.inputPlaceholder}
                onChange={(e) => updateBlockSettings(block.id, { inputPlaceholder: e.target.value })}
              />
            </div>
            <div className="control-group">
              <label htmlFor="buttonText">Button Text</label>
              <input
                type="text"
                id="buttonText"
                value={block.settings.buttonText}
                onChange={(e) => updateBlockSettings(block.id, { buttonText: e.target.value })}
              />
            </div>
            <div className="control-group">
              <label htmlFor="buttonColor">Button Color</label>
              <input
                type="color"
                id="buttonColor"
                value={block.settings.buttonColor}
                onChange={(e) => updateBlockSettings(block.id, { buttonColor: e.target.value })}
              />
            </div>
          </>
        );

      case 'spacing':
        return (
          <div className="control-group">
            <label htmlFor="height">
              <span>Height</span>
              <span className="control-value">{block.content}px</span>
            </label>
            <input
              type="range"
              id="height"
              min="10"
              max="100"
              value={block.content}
              onChange={(e) => updateBlockContent(block.id, e.target.value)}
            />
          </div>
        );

      case 'separator':
        return (
          <>
            <div className="control-group">
              <label htmlFor="color">Color</label>
              <input
                type="color"
                id="color"
                value={block.settings.color}
                onChange={(e) => updateBlockSettings(block.id, { color: e.target.value })}
              />
            </div>
            <div className="control-group">
              <label htmlFor="thickness">Thickness</label>
              <input
                type="number"
                id="thickness"
                min="1"
                max="10"
                value={block.settings.thickness}
                onChange={(e) => updateBlockSettings(block.id, { thickness: parseInt(e.target.value) })}
              />
            </div>
          </>
        );

      default:
        return null;
    }
  }
};

interface PopupPreviewProps {
  blocks: Block[];
  settings: PopupSettings;
}

const PopupPreview: React.FC<PopupPreviewProps> = ({ blocks, settings }) => {
  const getPositionStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      backgroundColor: settings.backgroundColor,
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
      borderRadius: `${settings.borderRadius}px`,
      width: `${settings.width}px`,
      maxHeight: '80%',
      overflowY: 'auto',
      padding: `${settings.padding}px`
    };

    switch (settings.position) {
      case 'center':
        return { ...base, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
      case 'top-left':
        return { ...base, top: '20px', left: '20px' };
      case 'top-right':
        return { ...base, top: '20px', right: '20px' };
      case 'bottom-left':
        return { ...base, bottom: '20px', left: '20px' };
      case 'bottom-right':
        return { ...base, bottom: '20px', right: '20px' };
      case 'top-bar':
        return { ...base, top: 0, left: 0, width: '100%', borderRadius: 0 };
      case 'bottom-bar':
        return { ...base, bottom: 0, left: 0, width: '100%', borderRadius: 0 };
      default:
        return base;
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#f5f7fa', borderRadius: '12px', overflow: 'hidden' }}>
      {settings.overlay && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `rgba(0, 0, 0, ${settings.overlayOpacity / 100})`
        }} />
      )}

      <div style={getPositionStyles()}>
        {settings.showCloseButton && (
          <button style={{
            position: 'absolute',
            top: settings.closeButtonPosition === 'inside' ? '10px' : '-40px',
            right: settings.closeButtonPosition === 'inside' ? '10px' : '10px',
            background: settings.closeButtonPosition === 'inside' ? 'transparent' : '#ffffff',
            border: 'none',
            fontSize: '28px',
            cursor: 'pointer',
            color: settings.closeButtonPosition === 'inside' ? '#9ca3af' : '#6b7280',
            lineHeight: 1,
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: settings.closeButtonPosition === 'outside' ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none'
          }}>
            ×
          </button>
        )}

        {blocks.map((block, index) => (
          <BlockPreview key={block.id} block={block} isLast={index === blocks.length - 1} />
        ))}
      </div>
    </div>
  );
};

const BlockPreview: React.FC<{ block: Block; isLast: boolean }> = ({ block, isLast }) => {
  const marginBottom = isLast ? 0 : 20;

  switch (block.type) {
    case 'heading':
      return (
        <h2 style={{
          color: block.settings.color,
          fontSize: `${block.settings.fontSize}px`,
          textAlign: block.settings.align,
          fontWeight: block.settings.fontWeight,
          margin: 0,
          marginBottom
        }}>
          {block.content}
        </h2>
      );

    case 'text':
      return (
        <p style={{
          color: block.settings.color,
          fontSize: `${block.settings.fontSize}px`,
          textAlign: block.settings.align,
          lineHeight: block.settings.lineHeight,
          margin: 0,
          marginBottom
        }}>
          {block.content}
        </p>
      );

    case 'button':
      return (
        <div style={{ textAlign: block.settings.align, marginBottom }}>
          <a
            href={block.settings.url}
            style={{
              display: 'inline-block',
              background: block.settings.bgColor,
              color: block.settings.textColor,
              padding: block.settings.padding,
              fontSize: `${block.settings.fontSize}px`,
              borderRadius: `${block.settings.borderRadius}px`,
              textDecoration: 'none',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            {block.content}
          </a>
        </div>
      );

    case 'image':
      return (
        <img
          src={block.content}
          alt=""
          style={{
            width: block.settings.width,
            borderRadius: `${block.settings.borderRadius}px`,
            display: 'block',
            margin: '0 auto',
            marginBottom
          }}
        />
      );

    case 'form':
      return (
        <form style={{ marginBottom }}>
          <input
            type="email"
            placeholder={block.settings.inputPlaceholder}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              marginBottom: '12px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px 16px',
              background: block.settings.buttonColor,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            {block.settings.buttonText}
          </button>
        </form>
      );

    case 'spacing':
      return <div style={{ height: `${block.content}px` }} />;

    case 'separator':
      return (
        <hr style={{
          border: 'none',
          borderTop: `${block.settings.thickness}px solid ${block.settings.color}`,
          margin: `${marginBottom}px 0`
        }} />
      );

    default:
      return null;
  }
};

export default PopupWidgetPage;
