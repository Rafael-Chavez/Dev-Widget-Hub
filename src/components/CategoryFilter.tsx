import React from 'react';
import { WidgetCategory } from '../types';
import { IconRenderer } from './IconRenderer';

interface CategoryFilterProps {
  categories: WidgetCategory[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-deepsea-lightest mb-6 text-center">
        Choose Your Widget Category
      </h2>

      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`
              flex items-center space-x-3 px-6 py-3 rounded-xl border-2 transition-all duration-200
              ${
                selectedCategory === category.id
                  ? 'border-deepsea-light bg-deepsea-medium text-deepsea-lightest'
                  : 'border-deepsea-medium bg-deepsea-dark text-deepsea-lightest hover:border-deepsea-light hover:bg-deepsea-medium'
              }
            `}
          >
            <IconRenderer iconName={category.icon} size={24} className="text-deepsea-lightest" />
            <div className="text-left">
              <div className="font-semibold">{category.name}</div>
              <div className="text-sm opacity-70">{category.count} widgets</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;