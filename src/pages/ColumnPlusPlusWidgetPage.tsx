import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ColumnPlusPlusWidgetPage.css';

interface ColumnData {
  id: string;
  width: number; // pixels
  headerText?: string;
  imageUrl?: string;
  videoUrl?: string;
  altText?: string;
  linkUrl?: string;
}

interface Settings {
  // Global header settings (optional main widget header)
  showGlobalHeader: boolean;
  globalHeaderPosition: 'top' | 'bottom';
  globalHeaderText: string;
  globalHeaderAlignment: 'left' | 'center' | 'right';

  // Column settings
  columns: ColumnData[];

  // Style settings
  accentColor: string;
  bgColor: string;
  textColor: string;
  columnHeaderBgColor: string;
  borderRadius: number;
  spacing: number;

  // Layout settings
  maxWidth: number;
  padding: number;
  showBorders: boolean;
  borderColor: string;

  // Mobile settings
  mobileStackColumns: boolean;
  mobileColumnWidth: number; // pixels for mobile
}

const ColumnPlusPlusWidgetPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'layout'>('content');
  const [settings, setSettings] = useState<Settings>({
    showGlobalHeader: false,
    globalHeaderPosition: 'top',
    globalHeaderText: 'Column++ Widget',
    globalHeaderAlignment: 'center',
    columns: [
      { id: '1', width: 300, headerText: 'T-SHIRTS' },
      { id: '2', width: 300, headerText: 'WOMENS' },
      { id: '3', width: 300, headerText: 'ACTIVEWEAR' },
      { id: '4', width: 300, headerText: 'HOODIES' }
    ],
    accentColor: '#3498db',
    bgColor: '#ffffff',
    textColor: '#333333',
    columnHeaderBgColor: '#00bcd4',
    borderRadius: 0,
    spacing: 2,
    maxWidth: 10000,
    padding: 0,
    showBorders: true,
    borderColor: '#00bcd4',
    mobileStackColumns: false,
    mobileColumnWidth: 300
  });

  const addColumn = () => {
    const newColumn: ColumnData = {
      id: Date.now().toString(),
      width: 300
    };

    setSettings({
      ...settings,
      columns: [...settings.columns, newColumn]
    });
  };

  const removeColumn = (id: string) => {
    if (settings.columns.length <= 1) {
      alert('You must have at least one column');
      return;
    }

    const remainingColumns = settings.columns.filter(col => col.id !== id);
    const newWidth = 100 / remainingColumns.length;
    const adjustedColumns = remainingColumns.map(col => ({
      ...col,
      width: newWidth
    }));

    setSettings({
      ...settings,
      columns: adjustedColumns
    });
  };

  const updateColumn = (id: string, field: keyof ColumnData, value: any) => {
    setSettings({
      ...settings,
      columns: settings.columns.map(col =>
        col.id === id ? { ...col, [field]: value } : col
      )
    });
  };

  const handleMediaUpload = (id: string, file: File, type: 'image' | 'video') => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setSettings({
        ...settings,
        columns: settings.columns.map(col =>
          col.id === id
            ? {
                ...col,
                imageUrl: type === 'image' ? url : undefined,
                videoUrl: type === 'video' ? url : undefined
              }
            : col
        )
      });
    };
    reader.readAsDataURL(file);
  };

  const resetToEqualWidths = () => {
    const equalWidth = 300;
    const equalColumns = settings.columns.map(col => ({
      ...col,
      width: equalWidth
    }));
    setSettings({ ...settings, columns: equalColumns });
  };

  const generateEmbedCode = (): string => {
    const configData = {
      showGlobalHeader: settings.showGlobalHeader,
      globalHeaderPosition: settings.globalHeaderPosition,
      globalHeaderText: settings.globalHeaderText,
      globalHeaderAlignment: settings.globalHeaderAlignment,
      columns: settings.columns.map(col => ({
        width: col.width,
        headerText: col.headerText || '',
        imageUrl: col.imageUrl,
        videoUrl: col.videoUrl,
        altText: col.altText || '',
        linkUrl: col.linkUrl || ''
      })),
      accentColor: settings.accentColor,
      bgColor: settings.bgColor,
      textColor: settings.textColor,
      columnHeaderBgColor: settings.columnHeaderBgColor,
      borderRadius: settings.borderRadius,
      spacing: settings.spacing,
      maxWidth: settings.maxWidth,
      padding: settings.padding,
      showBorders: settings.showBorders,
      borderColor: settings.borderColor,
      mobileStackColumns: settings.mobileStackColumns,
      mobileColumnWidth: settings.mobileColumnWidth
    };

    const scriptContent = `(function() {
  const config = ${JSON.stringify(configData, null, 2)};

  const container = document.getElementById('column-plus-plus-container');
  if (!container) return;

  const widget = document.createElement('div');
  widget.style.cssText = 'width: 100%; padding: ' + config.padding + 'px; background: ' + config.bgColor + '; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;';

  const createGlobalHeader = () => {
    const header = document.createElement('div');
    header.style.cssText = 'text-align: ' + config.globalHeaderAlignment + '; margin-bottom: ' + (config.globalHeaderPosition === 'top' ? config.spacing : 0) + 'px; margin-top: ' + (config.globalHeaderPosition === 'bottom' ? config.spacing : 0) + 'px;';
    const h2 = document.createElement('h2');
    h2.textContent = config.globalHeaderText;
    h2.style.cssText = 'color: ' + config.textColor + '; margin: 0; font-size: 1.8rem; font-weight: 600;';
    header.appendChild(h2);
    return header;
  };

  const columnsContainer = document.createElement('div');
  columnsContainer.style.cssText = 'display: flex; gap: ' + config.spacing + 'px; flex-wrap: nowrap;';

  config.columns.forEach((col, index) => {
    const columnWrapper = col.linkUrl ? document.createElement('a') : document.createElement('div');
    if (col.linkUrl) {
      columnWrapper.href = col.linkUrl;
      columnWrapper.style.cssText = 'text-decoration: none; color: inherit; display: block; flex: 0 0 ' + col.width + 'px; width: ' + col.width + 'px; transition: transform 0.2s; cursor: pointer;';
      columnWrapper.addEventListener('mouseenter', function() { this.style.transform = 'translateY(-5px)'; });
      columnWrapper.addEventListener('mouseleave', function() { this.style.transform = 'translateY(0)'; });
    } else {
      columnWrapper.style.cssText = 'flex: 0 0 ' + col.width + 'px; width: ' + col.width + 'px;';
    }

    const columnDiv = document.createElement('div');
    columnDiv.style.cssText = 'display: flex; flex-direction: column; height: 100%; ' + (config.showBorders ? 'border: 1px solid ' + config.borderColor + '; ' : '') + 'border-radius: ' + config.borderRadius + 'px; overflow: hidden; background: #fff;';

    // Column header at top
    if (col.headerText) {
      const colHeader = document.createElement('div');
      colHeader.style.cssText = 'background: ' + config.columnHeaderBgColor + '; color: #fff; padding: 12px 8px; text-align: center; font-weight: 600; font-size: 0.9rem; letter-spacing: 0.5px; word-wrap: break-word; overflow-wrap: break-word;';
      colHeader.textContent = col.headerText;
      columnDiv.appendChild(colHeader);
    }

    // Image/video/placeholder at bottom
    if (col.imageUrl) {
      const img = document.createElement('img');
      img.src = col.imageUrl;
      img.alt = col.altText || col.headerText || 'Column ' + (index + 1);
      img.style.cssText = 'width: 100%; height: 100%; object-fit: cover; display: block; flex: 1;';
      columnDiv.appendChild(img);
    } else if (col.videoUrl) {
      const video = document.createElement('video');
      video.src = col.videoUrl;
      video.controls = true;
      video.style.cssText = 'width: 100%; height: 100%; display: block; flex: 1;';
      columnDiv.appendChild(video);
    } else {
      const placeholder = document.createElement('div');
      placeholder.style.cssText = 'width: 100%; min-height: 300px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, ' + config.accentColor + '20, ' + config.accentColor + '40); color: ' + config.textColor + '; font-size: 1rem; flex: 1;';
      placeholder.textContent = col.headerText || 'Column ' + (index + 1);
      columnDiv.appendChild(placeholder);
    }

    columnWrapper.appendChild(columnDiv);
    columnsContainer.appendChild(columnWrapper);
  });

  if (config.showGlobalHeader && config.globalHeaderPosition === 'top') {
    widget.appendChild(createGlobalHeader());
  }

  widget.appendChild(columnsContainer);

  if (config.showGlobalHeader && config.globalHeaderPosition === 'bottom') {
    widget.appendChild(createGlobalHeader());
  }

  container.appendChild(widget);

  if (!document.getElementById('column-plus-plus-styles')) {
    const style = document.createElement('style');
    style.id = 'column-plus-plus-styles';
    const mobileStyles = config.mobileStackColumns
      ? '@media (max-width: 768px) { #column-plus-plus-container [style*="flex"] { flex: 0 0 100% !important; width: 100% !important; max-width: 100% !important; } #column-plus-plus-container > div > div { flex-direction: column !important; } }'
      : '@media (max-width: 768px) { #column-plus-plus-container [style*="flex"] { flex: 0 0 ' + config.mobileColumnWidth + 'px !important; width: ' + config.mobileColumnWidth + 'px !important; } #column-plus-plus-container > div > div { overflow-x: auto !important; } }';
    style.textContent = '#column-plus-plus-container div[style*="flex"] { flex-shrink: 0; } ' + mobileStyles;
    document.head.appendChild(style);
  }
})();`;

    return `<!-- Column++ Widget -->\n<div id="column-plus-plus-container"></div>\n\n<script>\n${scriptContent}\n</script>`;
  };

  const copyToClipboard = () => {
    const code = generateEmbedCode();
    navigator.clipboard.writeText(code).then(() => {
      alert('Embed code copied to clipboard!');
    });
  };

  return (
    <div className="column-plus-plus-page">
      <div className="sidebar">
        <div className="sidebar-header">
          <button className="home-btn" onClick={() => navigate('/')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </button>
          <h2>Column++ Widget</h2>
        </div>

        <div className="tab-navigation">
          <button
            className={`tab-nav-btn ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            Content
          </button>
          <button
            className={`tab-nav-btn ${activeTab === 'style' ? 'active' : ''}`}
            onClick={() => setActiveTab('style')}
          >
            Style
          </button>
          <button
            className={`tab-nav-btn ${activeTab === 'layout' ? 'active' : ''}`}
            onClick={() => setActiveTab('layout')}
          >
            Layout
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'content' && (
            <>
              <div className="control-section">
                <h3>Global Widget Header (Optional)</h3>

                <div className="control-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={settings.showGlobalHeader}
                      onChange={(e) => setSettings({ ...settings, showGlobalHeader: e.target.checked })}
                    />
                    <span>Show Global Header</span>
                  </label>
                </div>

                {settings.showGlobalHeader && (
                  <>
                    <div className="control-group">
                      <label htmlFor="globalHeaderText">Header Text</label>
                      <input
                        type="text"
                        id="globalHeaderText"
                        value={settings.globalHeaderText}
                        onChange={(e) => setSettings({ ...settings, globalHeaderText: e.target.value })}
                      />
                    </div>

                    <div className="control-group">
                      <label>Header Position</label>
                      <div className="button-group">
                        <button
                          className={settings.globalHeaderPosition === 'top' ? 'active' : ''}
                          onClick={() => setSettings({ ...settings, globalHeaderPosition: 'top' })}
                        >
                          Top
                        </button>
                        <button
                          className={settings.globalHeaderPosition === 'bottom' ? 'active' : ''}
                          onClick={() => setSettings({ ...settings, globalHeaderPosition: 'bottom' })}
                        >
                          Bottom
                        </button>
                      </div>
                    </div>

                    <div className="control-group">
                      <label>Header Alignment</label>
                      <div className="button-group">
                        <button
                          className={settings.globalHeaderAlignment === 'left' ? 'active' : ''}
                          onClick={() => setSettings({ ...settings, globalHeaderAlignment: 'left' })}
                        >
                          Left
                        </button>
                        <button
                          className={settings.globalHeaderAlignment === 'center' ? 'active' : ''}
                          onClick={() => setSettings({ ...settings, globalHeaderAlignment: 'center' })}
                        >
                          Center
                        </button>
                        <button
                          className={settings.globalHeaderAlignment === 'right' ? 'active' : ''}
                          onClick={() => setSettings({ ...settings, globalHeaderAlignment: 'right' })}
                        >
                          Right
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="control-section">
                <div className="section-header">
                  <h3>Columns ({settings.columns.length})</h3>
                  <button className="add-column-btn" onClick={addColumn}>
                    + Add Column
                  </button>
                </div>

                <div className="columns-list">
                  {settings.columns.map((column, index) => (
                    <div key={column.id} className="column-card">
                      <div className="column-header">
                        <span className="column-number">Column {index + 1}</span>
                        {settings.columns.length > 1 && (
                          <button
                            className="remove-column-btn"
                            onClick={() => removeColumn(column.id)}
                          >
                            ×
                          </button>
                        )}
                      </div>

                      <div className="control-group">
                        <label htmlFor={`header-${column.id}`}>Column Header Text</label>
                        <input
                          type="text"
                          id={`header-${column.id}`}
                          value={column.headerText || ''}
                          onChange={(e) => updateColumn(column.id, 'headerText', e.target.value)}
                          placeholder={`Column ${index + 1} Header`}
                        />
                      </div>

                      <div className="control-group">
                        <label htmlFor={`width-${column.id}`}>
                          Width: {column.width}px
                        </label>
                        <input
                          type="range"
                          id={`width-${column.id}`}
                          min="100"
                          max="1000"
                          step="10"
                          value={column.width}
                          onChange={(e) => updateColumn(column.id, 'width', parseInt(e.target.value))}
                        />
                      </div>

                      <div className="control-group">
                        <label htmlFor={`image-${column.id}`}>Upload Image</label>
                        <input
                          type="file"
                          id={`image-${column.id}`}
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleMediaUpload(column.id, file, 'image');
                          }}
                        />
                        {column.imageUrl && (
                          <button
                            className="clear-media-btn"
                            onClick={() => updateColumn(column.id, 'imageUrl', undefined)}
                          >
                            Clear Image
                          </button>
                        )}
                      </div>

                      <div className="control-group">
                        <label htmlFor={`video-${column.id}`}>Upload Video</label>
                        <input
                          type="file"
                          id={`video-${column.id}`}
                          accept="video/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleMediaUpload(column.id, file, 'video');
                          }}
                        />
                        {column.videoUrl && (
                          <button
                            className="clear-media-btn"
                            onClick={() => updateColumn(column.id, 'videoUrl', undefined)}
                          >
                            Clear Video
                          </button>
                        )}
                      </div>

                      {(column.imageUrl || column.videoUrl) && (
                        <div className="control-group">
                          <label htmlFor={`alt-${column.id}`}>Alt Text / Description</label>
                          <input
                            type="text"
                            id={`alt-${column.id}`}
                            value={column.altText || ''}
                            onChange={(e) => updateColumn(column.id, 'altText', e.target.value)}
                            placeholder={`Column ${index + 1}`}
                          />
                        </div>
                      )}

                      <div className="control-group">
                        <label htmlFor={`link-${column.id}`}>Link URL (Optional)</label>
                        <input
                          type="url"
                          id={`link-${column.id}`}
                          value={column.linkUrl || ''}
                          onChange={(e) => updateColumn(column.id, 'linkUrl', e.target.value)}
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'style' && (
            <>
              <div className="control-section">
                <h3>Colors</h3>

                <div className="control-group">
                  <label htmlFor="accentColor">Accent Color</label>
                  <input
                    type="color"
                    id="accentColor"
                    value={settings.accentColor}
                    onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="bgColor">Background Color</label>
                  <input
                    type="color"
                    id="bgColor"
                    value={settings.bgColor}
                    onChange={(e) => setSettings({ ...settings, bgColor: e.target.value })}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="textColor">Text Color</label>
                  <input
                    type="color"
                    id="textColor"
                    value={settings.textColor}
                    onChange={(e) => setSettings({ ...settings, textColor: e.target.value })}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="columnHeaderBgColor">Column Header Background</label>
                  <input
                    type="color"
                    id="columnHeaderBgColor"
                    value={settings.columnHeaderBgColor}
                    onChange={(e) => setSettings({ ...settings, columnHeaderBgColor: e.target.value })}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="borderColor">Border Color</label>
                  <input
                    type="color"
                    id="borderColor"
                    value={settings.borderColor}
                    onChange={(e) => setSettings({ ...settings, borderColor: e.target.value })}
                  />
                </div>
              </div>

              <div className="control-section">
                <h3>Borders</h3>

                <div className="control-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={settings.showBorders}
                      onChange={(e) => setSettings({ ...settings, showBorders: e.target.checked })}
                    />
                    <span>Show Column Borders</span>
                  </label>
                </div>

                <div className="control-group">
                  <label htmlFor="borderRadius">
                    Border Radius: {settings.borderRadius}px
                  </label>
                  <input
                    type="range"
                    id="borderRadius"
                    min="0"
                    max="50"
                    value={settings.borderRadius}
                    onChange={(e) => setSettings({ ...settings, borderRadius: parseInt(e.target.value) })}
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === 'layout' && (
            <>
              <div className="control-section">
                <h3>Spacing</h3>

                <div className="control-group">
                  <label htmlFor="spacing">
                    Column Gap: {settings.spacing}px
                  </label>
                  <input
                    type="range"
                    id="spacing"
                    min="0"
                    max="50"
                    value={settings.spacing}
                    onChange={(e) => setSettings({ ...settings, spacing: parseInt(e.target.value) })}
                  />
                </div>

                <div className="control-group">
                  <label htmlFor="padding">
                    Widget Padding: {settings.padding}px
                  </label>
                  <input
                    type="range"
                    id="padding"
                    min="0"
                    max="100"
                    value={settings.padding}
                    onChange={(e) => setSettings({ ...settings, padding: parseInt(e.target.value) })}
                  />
                </div>
              </div>


              <div className="control-section">
                <h3>Mobile Settings</h3>

                <div className="control-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={settings.mobileStackColumns}
                      onChange={(e) => setSettings({ ...settings, mobileStackColumns: e.target.checked })}
                    />
                    <span>Stack Columns on Mobile</span>
                  </label>
                </div>

                {!settings.mobileStackColumns && (
                  <div className="control-group">
                    <label htmlFor="mobileColumnWidth">
                      Mobile Column Width: {settings.mobileColumnWidth}px
                    </label>
                    <input
                      type="range"
                      id="mobileColumnWidth"
                      min="150"
                      max="500"
                      step="10"
                      value={settings.mobileColumnWidth}
                      onChange={(e) => setSettings({ ...settings, mobileColumnWidth: parseInt(e.target.value) })}
                    />
                  </div>
                )}
              </div>

              <div className="control-section">
                <h3>Column Width Reset</h3>
                <button
                  className="reset-widths-btn"
                  onClick={resetToEqualWidths}
                >
                  Reset to 300px Each
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="main-content">
        <div className="preview-section">
          <h3>Live Preview</h3>
          <div className="preview-container">
            <div
              className="widget-preview"
              style={{
                width: '100%',
                padding: `${settings.padding}px`,
                background: settings.bgColor
              }}
            >
              {settings.showGlobalHeader && settings.globalHeaderPosition === 'top' && (
                <div
                  className="header-preview"
                  style={{
                    textAlign: settings.globalHeaderAlignment,
                    marginBottom: `${settings.spacing}px`
                  }}
                >
                  <h2 style={{ color: settings.textColor, margin: 0, fontSize: '1.8rem', fontWeight: 600 }}>
                    {settings.globalHeaderText}
                  </h2>
                </div>
              )}

              <div
                className="columns-preview"
                style={{
                  display: 'flex',
                  gap: `${settings.spacing}px`,
                  flexWrap: 'nowrap'
                }}
              >
                {settings.columns.map((column, index) => {
                  const columnContent = (
                    <div
                      className="column-preview"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        border: settings.showBorders ? `1px solid ${settings.borderColor}` : 'none',
                        borderRadius: `${settings.borderRadius}px`,
                        overflow: 'hidden',
                        background: '#fff'
                      }}
                    >
                      {column.headerText && (
                        <div
                          style={{
                            background: settings.columnHeaderBgColor,
                            color: '#fff',
                            padding: '12px 8px',
                            textAlign: 'center',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            letterSpacing: '0.5px',
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word'
                          }}
                        >
                          {column.headerText}
                        </div>
                      )}

                      {column.imageUrl ? (
                        <img
                          src={column.imageUrl}
                          alt={column.altText || column.headerText || `Column ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            flex: 1
                          }}
                        />
                      ) : column.videoUrl ? (
                        <video
                          src={column.videoUrl}
                          controls
                          style={{
                            width: '100%',
                            height: '100%',
                            display: 'block',
                            flex: 1
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '100%',
                            minHeight: '300px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: `linear-gradient(135deg, ${settings.accentColor}20, ${settings.accentColor}40)`,
                            color: settings.textColor,
                            fontSize: '1rem',
                            flex: 1
                          }}
                        >
                          {column.headerText || `Column ${index + 1}`}
                        </div>
                      )}
                    </div>
                  );

                  return column.linkUrl ? (
                    <a
                      key={column.id}
                      href={column.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'block',
                        flex: `0 0 ${column.width}px`,
                        width: `${column.width}px`,
                        transition: 'transform 0.2s',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {columnContent}
                    </a>
                  ) : (
                    <div
                      key={column.id}
                      style={{
                        flex: `0 0 ${column.width}px`,
                        width: `${column.width}px`
                      }}
                    >
                      {columnContent}
                    </div>
                  );
                })}
              </div>

              {settings.showGlobalHeader && settings.globalHeaderPosition === 'bottom' && (
                <div
                  className="header-preview"
                  style={{
                    textAlign: settings.globalHeaderAlignment,
                    marginTop: `${settings.spacing}px`
                  }}
                >
                  <h2 style={{ color: settings.textColor, margin: 0, fontSize: '1.8rem', fontWeight: 600 }}>
                    {settings.globalHeaderText}
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="export-section">
          <h3>Embed Code</h3>
          <div className="export-actions">
            <button className="copy-btn" onClick={copyToClipboard}>
              Copy to Clipboard
            </button>
          </div>
          <pre className="code-block">
            <code>{generateEmbedCode()}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ColumnPlusPlusWidgetPage;
