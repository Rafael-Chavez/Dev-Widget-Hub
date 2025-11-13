import React from 'react';
import { Widget } from '../types';
import { IconRenderer } from './IconRenderer';

interface WidgetCardProps {
  widget: Widget;
  onSelect: (widget: Widget) => void;
}

const WidgetCard: React.FC<WidgetCardProps> = ({ widget, onSelect }) => {
  return (
    <div
      className="bg-deepsea-dark rounded-xl shadow-sm border-2 border-deepsea-medium hover:shadow-lg hover:border-deepsea-light transition-all duration-200 cursor-pointer group"
      onClick={() => onSelect(widget)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-deepsea-medium to-deepsea-light">
            <IconRenderer iconName={widget.icon} className="text-deepsea-lightest" size={28} />
          </div>
          <div className="flex gap-2">
            {widget.isNew && (
              <span className="bg-gradient-to-r from-deepsea-light to-deepsea-lightest text-deepsea-darkest text-xs font-medium px-2 py-1 rounded-full">
                New
              </span>
            )}
            {widget.isBestSeller && (
              <span className="bg-gradient-to-r from-deepsea-medium to-deepsea-light text-deepsea-lightest text-xs font-medium px-2 py-1 rounded-full">
                Best Seller
              </span>
            )}
            {widget.isPro && (
              <span className="bg-gradient-to-r from-deepsea-dark to-deepsea-medium text-deepsea-lightest text-xs font-medium px-2 py-1 rounded-full">
                Pro
              </span>
            )}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-deepsea-lightest mb-2 group-hover:text-deepsea-light transition-colors">
          {widget.name}
        </h3>
        <p className="text-deepsea-light text-sm mb-4 line-clamp-2">
          {widget.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {widget.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-deepsea-darkest text-deepsea-light text-xs px-2 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <button className="text-deepsea-light hover:text-deepsea-lightest text-sm font-medium transition-colors">
            View Details →
          </button>
          <button className="bg-gradient-to-r from-deepsea-medium to-deepsea-light hover:from-deepsea-light hover:to-deepsea-lightest text-deepsea-lightest px-3 py-1 rounded-md text-sm font-medium transition-all">
            Customize
          </button>
        </div>
      </div>
    </div>
  );
};

export default WidgetCard;