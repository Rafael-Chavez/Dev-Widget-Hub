export interface Widget {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  isPro?: boolean;
  tags: string[];
  preview?: string;
  customizationOptions?: CustomizationOption[];
}

export interface CustomizationOption {
  id: string;
  name: string;
  type: 'text' | 'color' | 'number' | 'select' | 'boolean' | 'textarea';
  defaultValue: any;
  options?: string[];
  description?: string;
}

export interface WidgetCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;
}

export interface CreatedWidget {
  id: string;
  widgetId: string;
  name: string;
  settings: Record<string, any>;
  embedCode: string;
  createdAt: string;
  updatedAt: string;
}