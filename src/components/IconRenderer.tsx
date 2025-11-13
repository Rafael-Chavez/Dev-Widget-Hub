import React from 'react';
import * as Icons from './Icons';

interface IconRendererProps {
  iconName: string;
  className?: string;
  size?: number;
}

const iconMap: { [key: string]: React.FC<{ className?: string; size?: number }> } = {
  'target': Icons.TargetIcon,
  'palette': Icons.PaletteIcon,
  'smartphone': Icons.SmartphoneIcon,
  'star': Icons.StarIcon,
  'shopping-cart': Icons.ShoppingCartIcon,
  'message': Icons.MessageIcon,
  'film': Icons.FilmIcon,
  'camera': Icons.CameraIcon,
  'users': Icons.UsersIcon,
  'tv': Icons.TvIcon,
  'clock': Icons.ClockIcon,
  'bell': Icons.BellIcon,
  'shopping-bag': Icons.ShoppingBagIcon,
  'dollar': Icons.DollarIcon,
  'phone': Icons.PhoneIcon,
  'file-text': Icons.FileTextIcon,
  'message-circle': Icons.MessageCircleIcon,
  'rocket': Icons.RocketIcon,
  'megaphone': Icons.MegaphoneIcon,
  'message-square': Icons.MessageSquareIcon,
  'flame': Icons.FlameIcon,
};

export const IconRenderer: React.FC<IconRendererProps> = ({ iconName, className = '', size = 24 }) => {
  const IconComponent = iconMap[iconName];

  if (!IconComponent) {
    // Fallback to a default icon or return null
    return <Icons.TargetIcon className={className} size={size} />;
  }

  return <IconComponent className={className} size={size} />;
};
