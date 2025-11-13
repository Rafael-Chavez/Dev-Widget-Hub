import React, { useState } from 'react';
import { CreatedWidget } from '../types';

interface EmbedCodeModalProps {
  widget: CreatedWidget;
  onClose: () => void;
}

const EmbedCodeModal: React.FC<EmbedCodeModalProps> = ({ widget, onClose }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(widget.embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = widget.embedCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Embed Code Ready!</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <div className="text-green-600 mr-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-green-800 font-medium">Widget "{widget.name}" is ready!</p>
                  <p className="text-green-700 text-sm">Copy the code below and paste it into your website.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Embed Code
              </label>
              <textarea
                value={widget.embedCode}
                readOnly
                className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                onClick={copyToClipboard}
                className={`absolute top-8 right-2 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  copied
                    ? 'bg-green-100 text-green-800'
                    : 'bg-primary-100 text-primary-800 hover:bg-primary-200'
                }`}
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-900 mb-2">Installation Instructions:</h3>
            <ol className="text-blue-800 text-sm space-y-1">
              <li>1. Copy the embed code above</li>
              <li>2. Paste it into your website's HTML where you want the widget to appear</li>
              <li>3. Save and publish your changes</li>
              <li>4. The widget will automatically load on your website</li>
            </ol>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">🚀</div>
              <div className="font-medium text-gray-900">Works Everywhere</div>
              <div className="text-sm text-gray-600">WordPress, Shopify, Wix, and more</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">📱</div>
              <div className="font-medium text-gray-900">Mobile Friendly</div>
              <div className="text-sm text-gray-600">Responsive design for all devices</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-medium text-gray-900">Fast Loading</div>
              <div className="text-sm text-gray-600">Optimized for performance</div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={copyToClipboard}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              {copied ? '✓ Copied to Clipboard' : 'Copy Embed Code'}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbedCodeModal;