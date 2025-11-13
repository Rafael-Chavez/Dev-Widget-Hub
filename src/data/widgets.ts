import { Widget, WidgetCategory } from '../types';

export const categories: WidgetCategory[] = [
  {
    id: 'all',
    name: 'All Widgets',
    icon: 'target',
    description: 'Browse all available widgets',
    count: 25
  },
  {
    id: 'branding',
    name: 'Branding',
    icon: 'palette',
    description: 'Logo displays and brand elements',
    count: 1
  },
  {
    id: 'social',
    name: 'Social',
    icon: 'smartphone',
    description: 'Social media integration widgets',
    count: 8
  },
  {
    id: 'reviews',
    name: 'Reviews',
    icon: 'star',
    description: 'Customer reviews and testimonials',
    count: 5
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    icon: 'shopping-cart',
    description: 'Shopping and sales widgets',
    count: 6
  },
  {
    id: 'communication',
    name: 'Communication',
    icon: 'message',
    description: 'Chat and contact widgets',
    count: 5
  }
];

export const widgets: Widget[] = [
  // Branding Widgets
  {
    id: 'logo-ticker',
    name: 'Logo Ticker',
    description: 'Animated logo carousel with customizable speed, spacing, and styling',
    category: 'branding',
    icon: 'film',
    isBestSeller: true,
    isNew: true,
    tags: ['logo', 'carousel', 'ticker', 'animation', 'branding'],
    customizationOptions: [
      { id: 'logos', name: 'Logo URLs', type: 'textarea', defaultValue: '', description: 'Enter logo image URLs (one per line)' },
      { id: 'speed', name: 'Animation Speed (seconds)', type: 'number', defaultValue: 20 },
      { id: 'logoSize', name: 'Logo Height (px)', type: 'number', defaultValue: 60 },
      { id: 'logoSizeMobile', name: 'Mobile Logo Height (px)', type: 'number', defaultValue: 40 },
      { id: 'spacing', name: 'Logo Spacing (px)', type: 'number', defaultValue: 60 },
      { id: 'spacingMobile', name: 'Mobile Spacing (px)', type: 'number', defaultValue: 40 },
      { id: 'bgType', name: 'Background Type', type: 'select', defaultValue: 'solid', options: ['solid', 'gradient'] },
      { id: 'bgColor', name: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'gradientColor1', name: 'Gradient Color 1', type: 'color', defaultValue: '#3498db' },
      { id: 'gradientColor2', name: 'Gradient Color 2', type: 'color', defaultValue: '#9b59b6' },
      { id: 'gradientDirection', name: 'Gradient Direction (degrees)', type: 'number', defaultValue: 90 },
      { id: 'cornerRadius', name: 'Corner Radius (px)', type: 'number', defaultValue: 8 }
    ]
  },
  // Social Widgets
  {
    id: 'instagram-feed',
    name: 'Instagram Feed',
    description: 'Display your Instagram photos in a beautiful grid layout',
    category: 'social',
    icon: 'camera',
    isBestSeller: true,
    tags: ['instagram', 'photos', 'social media'],
    customizationOptions: [
      { id: 'username', name: 'Instagram Username', type: 'text', defaultValue: '' },
      { id: 'columns', name: 'Number of Columns', type: 'number', defaultValue: 3 },
      { id: 'showCaptions', name: 'Show Captions', type: 'boolean', defaultValue: true }
    ]
  },
  {
    id: 'facebook-feed',
    name: 'Facebook Feed',
    description: 'Embed your Facebook page posts and updates',
    category: 'social',
    icon: 'users',
    tags: ['facebook', 'posts', 'social media'],
    customizationOptions: [
      { id: 'pageId', name: 'Facebook Page ID', type: 'text', defaultValue: '' },
      { id: 'postLimit', name: 'Number of Posts', type: 'number', defaultValue: 5 }
    ]
  },
  {
    id: 'twitter-timeline',
    name: 'Twitter Timeline',
    description: 'Show your latest tweets in a timeline format',
    category: 'social',
    icon: 'message-square',
    isNew: true,
    tags: ['twitter', 'timeline', 'social media'],
    customizationOptions: [
      { id: 'username', name: 'Twitter Username', type: 'text', defaultValue: '' },
      { id: 'theme', name: 'Theme', type: 'select', defaultValue: 'light', options: ['light', 'dark'] }
    ]
  },
  {
    id: 'youtube-gallery',
    name: 'YouTube Gallery',
    description: 'Display YouTube videos in an elegant gallery',
    category: 'social',
    icon: 'tv',
    tags: ['youtube', 'videos', 'gallery'],
    customizationOptions: [
      { id: 'channelId', name: 'YouTube Channel ID', type: 'text', defaultValue: '' },
      { id: 'videoCount', name: 'Number of Videos', type: 'number', defaultValue: 6 }
    ]
  },

  // Review Widgets
  {
    id: 'google-reviews',
    name: 'Google Reviews',
    description: 'Display Google My Business reviews to build trust',
    category: 'reviews',
    icon: 'star',
    isBestSeller: true,
    tags: ['google', 'reviews', 'testimonials'],
    customizationOptions: [
      { id: 'placeId', name: 'Google Place ID', type: 'text', defaultValue: '' },
      { id: 'reviewCount', name: 'Number of Reviews', type: 'number', defaultValue: 5 },
      { id: 'showRating', name: 'Show Star Rating', type: 'boolean', defaultValue: true }
    ]
  },
  {
    id: 'yelp-reviews',
    name: 'Yelp Reviews',
    description: 'Showcase Yelp reviews to attract more customers',
    category: 'reviews',
    icon: 'flame',
    tags: ['yelp', 'reviews', 'business'],
    customizationOptions: [
      { id: 'businessId', name: 'Yelp Business ID', type: 'text', defaultValue: '' },
      { id: 'layout', name: 'Layout Style', type: 'select', defaultValue: 'grid', options: ['grid', 'list'] }
    ]
  },
  {
    id: 'testimonials',
    name: 'Testimonials Slider',
    description: 'Create a beautiful testimonials carousel',
    category: 'reviews',
    icon: 'message-circle',
    tags: ['testimonials', 'slider', 'carousel'],
    customizationOptions: [
      { id: 'autoplay', name: 'Auto Play', type: 'boolean', defaultValue: true },
      { id: 'speed', name: 'Slide Speed (seconds)', type: 'number', defaultValue: 5 }
    ]
  },

  // E-commerce Widgets
  {
    id: 'countdown-timer',
    name: 'Countdown Timer',
    description: 'Create urgency with countdown timers for sales',
    category: 'ecommerce',
    icon: 'clock',
    isBestSeller: true,
    tags: ['countdown', 'timer', 'urgency', 'sales'],
    customizationOptions: [
      { id: 'endDate', name: 'End Date', type: 'text', defaultValue: '' },
      { id: 'title', name: 'Timer Title', type: 'text', defaultValue: 'Limited Time Offer!' },
      { id: 'style', name: 'Style', type: 'select', defaultValue: 'modern', options: ['modern', 'classic', 'minimal'] }
    ]
  },
  {
    id: 'sales-notification',
    name: 'Sales Notification',
    description: 'Show recent purchases to create social proof',
    category: 'ecommerce',
    icon: 'shopping-bag',
    isNew: true,
    tags: ['sales', 'notification', 'social proof'],
    customizationOptions: [
      { id: 'productName', name: 'Product Name', type: 'text', defaultValue: 'Amazing Product' },
      { id: 'customerName', name: 'Customer Name', type: 'text', defaultValue: 'John D.' },
      { id: 'frequency', name: 'Display Frequency (seconds)', type: 'number', defaultValue: 10 }
    ]
  },
  {
    id: 'price-table',
    name: 'Pricing Table',
    description: 'Beautiful pricing tables for your products or services',
    category: 'ecommerce',
    icon: 'dollar',
    tags: ['pricing', 'table', 'plans'],
    customizationOptions: [
      { id: 'currency', name: 'Currency Symbol', type: 'text', defaultValue: '$' },
      { id: 'highlightPlan', name: 'Highlight Plan', type: 'select', defaultValue: 'middle', options: ['first', 'middle', 'last'] }
    ]
  },

  // Communication Widgets
  {
    id: 'whatsapp-chat',
    name: 'WhatsApp Chat',
    description: 'Add WhatsApp chat button for instant customer support',
    category: 'communication',
    icon: 'phone',
    isBestSeller: true,
    tags: ['whatsapp', 'chat', 'support'],
    customizationOptions: [
      { id: 'phoneNumber', name: 'WhatsApp Number', type: 'text', defaultValue: '' },
      { id: 'message', name: 'Default Message', type: 'textarea', defaultValue: 'Hello! I need help with...' },
      { id: 'position', name: 'Button Position', type: 'select', defaultValue: 'bottom-right', options: ['bottom-right', 'bottom-left', 'top-right', 'top-left'] }
    ]
  },
  {
    id: 'contact-form',
    name: 'Contact Form',
    description: 'Responsive contact form with customizable fields',
    category: 'communication',
    icon: 'file-text',
    tags: ['contact', 'form', 'email'],
    customizationOptions: [
      { id: 'email', name: 'Recipient Email', type: 'text', defaultValue: '' },
      { id: 'fields', name: 'Form Fields', type: 'text', defaultValue: 'name,email,message' },
      { id: 'buttonColor', name: 'Button Color', type: 'color', defaultValue: '#3b82f6' }
    ]
  },
  {
    id: 'live-chat',
    name: 'Live Chat',
    description: 'Real-time chat widget for customer support',
    category: 'communication',
    icon: 'message-circle',
    isPro: true,
    tags: ['chat', 'live', 'support'],
    customizationOptions: [
      { id: 'welcomeMessage', name: 'Welcome Message', type: 'text', defaultValue: 'How can we help you?' },
      { id: 'theme', name: 'Chat Theme', type: 'select', defaultValue: 'blue', options: ['blue', 'green', 'purple', 'orange'] }
    ]
  },
  {
    id: 'popup-notification',
    name: 'Popup Notification',
    description: 'Customizable popup notifications for announcements, offers, and alerts',
    category: 'communication',
    icon: 'rocket',
    isNew: true,
    tags: ['popup', 'notification', 'announcement', 'modal'],
    customizationOptions: [
      { id: 'title', name: 'Popup Title', type: 'text', defaultValue: 'Important Announcement!' },
      { id: 'message', name: 'Popup Message', type: 'textarea', defaultValue: 'Don\'t miss out on our special offer!' },
      { id: 'buttonText', name: 'Button Text', type: 'text', defaultValue: 'Learn More' },
      { id: 'buttonUrl', name: 'Button URL', type: 'text', defaultValue: '#' },
      { id: 'backgroundColor', name: 'Background Color', type: 'color', defaultValue: '#3b82f6' },
      { id: 'textColor', name: 'Text Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'delay', name: 'Show After (seconds)', type: 'number', defaultValue: 3 },
      { id: 'position', name: 'Position', type: 'select', defaultValue: 'center', options: ['center', 'top', 'bottom'] },
      { id: 'showCloseButton', name: 'Show Close Button', type: 'boolean', defaultValue: true },
      { id: 'autoClose', name: 'Auto Close After (seconds)', type: 'number', defaultValue: 0 }
    ]
  },
  {
    id: 'announcement-bar',
    name: 'Announcement Bar',
    description: 'Sticky announcement banner for promotions, alerts, and important messages',
    category: 'communication',
    icon: 'megaphone',
    isNew: true,
    tags: ['announcement', 'banner', 'sticky', 'promo', 'notification'],
    customizationOptions: [
      { id: 'message', name: 'Message', type: 'textarea', defaultValue: '🎉 Special Offer: Get 20% off your first order!' },
      { id: 'buttonText', name: 'Button Text', type: 'text', defaultValue: 'Shop Now' },
      { id: 'buttonUrl', name: 'Button URL', type: 'text', defaultValue: '#' },
      { id: 'position', name: 'Position', type: 'select', defaultValue: 'top', options: ['top', 'bottom'] },
      { id: 'bgColor', name: 'Background Color', type: 'color', defaultValue: '#3498db' },
      { id: 'textColor', name: 'Text Color', type: 'color', defaultValue: '#ffffff' }
    ]
  }
];