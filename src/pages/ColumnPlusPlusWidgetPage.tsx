import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ColumnPlusPlusWidgetPage.css';

interface ColumnData {
  id: string;
  width: number; // percentage
  imageUrl?: string;
  videoUrl?: string;
  altText?: string;
}

interface Settings {
  // Header settings
  showHeader: boolean;
  headerPosition: 'top' | 'bottom';
  headerText: string;
  headerAlignment: 'left' | 'center' | 'right';

  // Column settings
  columns: ColumnData[];

  // Style settings
  accentColor: string;
  bgColor: string;
  textColor: string;
  borderRadius: number;
  spacing: number;

  // Layout settings
  maxWidth: number;
  padding: number;
  showBorders: boolean;
  borderColor: string;
}

const ColumnPlusPlusWidgetPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'layout'>('content');
  const [settings, setSettings] = useState<Settings>({
    showHeader: true,
    headerPosition: 'top',
    headerText: 'Column++ Widget',
    headerAlignment: 'center',
    columns: [
      { id: '1', width: 33.33 },
      { id: '2', width: 33.33 },
      { id: '3', width: 33.34 }
    ],
    accentColor: '#3498db',
    bgColor: '#ffffff',
    textColor: '#333333',
    borderRadius: 8,
    spacing: 16,
    maxWidth: 1200,
    padding: 20,
    showBorders: true,
    borderColor: '#e0e0e0'
  });

  const addColumn = () => {
    const newColumnWidth = 100 / (settings.columns.length + 1);
    const adjustedColumns = settings.columns.map(col => ({
      ...col,
      width: newColumnWidth
    }));

    const newColumn: ColumnData = {
      id: Date.now().toString(),
      width: newColumnWidth
    };

    setSettings({
      ...settings,
      columns: [...adjustedColumns, newColumn]
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
      if (type === 'image') {
        updateColumn(id, 'imageUrl', url);
        updateColumn(id, 'videoUrl', undefined);
      } else {
        updateColumn(id, 'videoUrl', url);
        updateColumn(id, 'imageUrl', undefined);
      }
    };
    reader.readAsDataURL(file);
  };

  const normalizeColumnWidths = () => {
    const totalWidth = settings.columns.reduce((sum, col) => sum + col.width, 0);
    if (Math.abs(totalWidth - 100) > 0.01) {
      const factor = 100 / totalWidth;
      const normalizedColumns = settings.columns.map(col => ({
        ...col,
        width: col.width * factor
      }));
      setSettings({
        ...settings,
        columns: normalizedColumns
      });
    }
  };

  const generateEmbedCode = (): string => {
    const configData = {
      showHeader: settings.showHeader,
      headerPosition: settings.headerPosition,
      headerText: settings.headerText,
      headerAlignment: settings.headerAlignment,
      columns: settings.columns.map(col => ({
        width: col.width,
        imageUrl: col.imageUrl,
        videoUrl: col.videoUrl,
        altText: col.altText || ''
      })),
      accentColor: settings.accentColor,
      bgColor: settings.bgColor,
      textColor: settings.textColor,
      borderRadius: settings.borderRadius,
      spacing: settings.spacing,
      maxWidth: settings.maxWidth,
      padding: settings.padding,
      showBorders: settings.showBorders,
      borderColor: settings.borderColor
    };

    const scriptContent = `(function() {
  const config = ${JSON.stringify(configData, null, 2)};

  const container = document.getElementById('column-plus-plus-container');
  if (!container) return;

  const widget = document.createElement('div');
  widget.style.cssText = 'max-width: ' + config.maxWidth + 'px; margin: 0 auto; padding: ' + config.padding + 'px; background: ' + config.bgColor + '; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;';

  const createHeader = () => {
    const header = document.createElement('div');
    header.style.cssText = 'text-align: ' + config.headerAlignment + '; margin-bottom: ' + (config.headerPosition === 'top' ? config.spacing : 0) + 'px; margin-top: ' + (config.headerPosition === 'bottom' ? config.spacing : 0) + 'px;';
    const h2 = document.createElement('h2');
    h2.textContent = config.headerText;
    h2.style.cssText = 'color: ' + config.textColor + '; margin: 0; font-size: 1.8rem; font-weight: 600;';
    header.appendChild(h2);
    return header;
  };

  const columnsContainer = document.createElement('div');
  columnsContainer.style.cssText = 'display: flex; gap: ' + config.spacing + 'px; flex-wrap: wrap;';

  config.columns.forEach((col, index) => {
    const columnDiv = document.createElement('div');
    columnDiv.style.cssText = 'flex: 0 0 calc(' + col.width + '% - ' + (config.spacing * (config.columns.length - 1) / config.columns.length) + 'px); min-width: 200px; ' + (config.showBorders ? 'border: 1px solid ' + config.borderColor + '; ' : '') + 'border-radius: ' + config.borderRadius + 'px; overflow: hidden; background: #fff;';

    if (col.imageUrl) {
      const img = document.createElement('img');
      img.src = col.imageUrl;
      img.alt = col.altText || 'Column ' + (index + 1);
      img.style.cssText = 'width: 100%; height: 100%; object-fit: cover; display: block;';
      columnDiv.appendChild(img);
    } else if (col.videoUrl) {
      const video = document.createElement('video');
      video.src = col.videoUrl;
      video.controls = true;
      video.style.cssText = 'width: 100%; height: 100%; display: block;';
      columnDiv.appendChild(video);
    } else {
      const placeholder = document.createElement('div');
      placeholder.style.cssText = 'width: 100%; min-height: 200px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, ' + config.accentColor + '20, ' + config.accentColor + '40); color: ' + config.textColor + '; font-size: 1rem;';
      placeholder.textContent = 'Column ' + (index + 1);
      columnDiv.appendChild(placeholder);
    }

    columnsContainer.appendChild(columnDiv);
  });

  if (config.showHeader && config.headerPosition === 'top') {
    widget.appendChild(createHeader());
  }

  widget.appendChild(columnsContainer);

  if (config.showHeader && config.headerPosition === 'bottom') {
    widget.appendChild(createHeader());
  }

  container.appendChild(widget);

  if (!document.getElementById('column-plus-plus-styles')) {
    const style = document.createElement('style');
    style.id = 'column-plus-plus-styles';
    style.textContent = '@media (max-width: 768px) { #column-plus-plus-container > div > div > div { flex: 0 0 100% !important; min-width: 100% !important; } }';
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
                <h3>Header Settings</h3>

                <div className="control-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={settings.showHeader}
                      onChange={(e) => setSettings({ ...settings, showHeader: e.target.checked })}
                    />
                    <span>Show Header</span>
                  </label>
                </div>

                {settings.showHeader && (
                  <>
                    <div className="control-group">
                      <label htmlFor="headerText">Header Text</label>
                      <input
                        type="text"
                        id="headerText"
                        value={settings.headerText}
                        onChange={(e) => setSettings({ ...settings, headerText: e.target.value })}
                      />
                    </div>

                    <div className="control-group">
                      <label>Header Position</label>
                      <div className="button-group">
                        <button
                          className={settings.headerPosition === 'top' ? 'active' : ''}
                          onClick={() => setSettings({ ...settings, headerPosition: 'top' })}
                        >
                          Top
                        </button>
                        <button
                          className={settings.headerPosition === 'bottom' ? 'active' : ''}
                          onClick={() => setSettings({ ...settings, headerPosition: 'bottom' })}
                        >
                          Bottom
                        </button>
                      </div>
                    </div>

                    <div className="control-group">
                      <label>Header Alignment</label>
                      <div className="button-group">
                        <button
                          className={settings.headerAlignment === 'left' ? 'active' : ''}
                          onClick={() => setSettings({ ...settings, headerAlignment: 'left' })}
                        >
                          Left
                        </button>
                        <button
                          className={settings.headerAlignment === 'center' ? 'active' : ''}
                          onClick={() => setSettings({ ...settings, headerAlignment: 'center' })}
                        >
                          Center
                        </button>
                        <button
                          className={settings.headerAlignment === 'right' ? 'active' : ''}
                          onClick={() => setSettings({ ...settings, headerAlignment: 'right' })}
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
                        <label htmlFor={`width-${column.id}`}>
                          Width: {column.width.toFixed(1)}%
                        </label>
                        <input
                          type="range"
                          id={`width-${column.id}`}
                          min="10"
                          max="90"
                          step="0.1"
                          value={column.width}
                          onChange={(e) => updateColumn(column.id, 'width', parseFloat(e.target.value))}
                          onMouseUp={normalizeColumnWidths}
                          onTouchEnd={normalizeColumnWidths}
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
                <h3>Dimensions</h3>

                <div className="control-group">
                  <label htmlFor="maxWidth">
                    Max Width: {settings.maxWidth}px
                  </label>
                  <input
                    type="range"
                    id="maxWidth"
                    min="600"
                    max="1600"
                    step="50"
                    value={settings.maxWidth}
                    onChange={(e) => setSettings({ ...settings, maxWidth: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="control-section">
                <h3>Column Width Reset</h3>
                <button
                  className="reset-widths-btn"
                  onClick={() => {
                    const equalWidth = 100 / settings.columns.length;
                    const equalColumns = settings.columns.map(col => ({
                      ...col,
                      width: equalWidth
                    }));
                    setSettings({ ...settings, columns: equalColumns });
                  }}
                >
                  Reset to Equal Widths
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
                maxWidth: `${settings.maxWidth}px`,
                margin: '0 auto',
                padding: `${settings.padding}px`,
                background: settings.bgColor
              }}
            >
              {settings.showHeader && settings.headerPosition === 'top' && (
                <div
                  className="header-preview"
                  style={{
                    textAlign: settings.headerAlignment,
                    marginBottom: `${settings.spacing}px`
                  }}
                >
                  <h2 style={{ color: settings.textColor, margin: 0, fontSize: '1.8rem', fontWeight: 600 }}>
                    {settings.headerText}
                  </h2>
                </div>
              )}

              <div
                className="columns-preview"
                style={{
                  display: 'flex',
                  gap: `${settings.spacing}px`,
                  flexWrap: 'wrap'
                }}
              >
                {settings.columns.map((column, index) => (
                  <div
                    key={column.id}
                    className="column-preview"
                    style={{
                      flex: `0 0 calc(${column.width}% - ${(settings.spacing * (settings.columns.length - 1)) / settings.columns.length}px)`,
                      minWidth: '200px',
                      border: settings.showBorders ? `1px solid ${settings.borderColor}` : 'none',
                      borderRadius: `${settings.borderRadius}px`,
                      overflow: 'hidden',
                      background: '#fff'
                    }}
                  >
                    {column.imageUrl ? (
                      <img
                        src={column.imageUrl}
                        alt={column.altText || `Column ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />
                    ) : column.videoUrl ? (
                      <video
                        src={column.videoUrl}
                        controls
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'block'
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          minHeight: '200px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: `linear-gradient(135deg, ${settings.accentColor}20, ${settings.accentColor}40)`,
                          color: settings.textColor,
                          fontSize: '1rem'
                        }}
                      >
                        Column {index + 1}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {settings.showHeader && settings.headerPosition === 'bottom' && (
                <div
                  className="header-preview"
                  style={{
                    textAlign: settings.headerAlignment,
                    marginTop: `${settings.spacing}px`
                  }}
                >
                  <h2 style={{ color: settings.textColor, margin: 0, fontSize: '1.8rem', fontWeight: 600 }}>
                    {settings.headerText}
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
