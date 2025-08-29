import React from 'react';
import './Avatar.css';
import { getInitials } from '../../utils/helpers';

interface AvatarProps {
  name: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  size = 'medium',
  className = ''
}) => {
  const initials = getInitials(name);
  const avatarClass = [
    'avatar',
    `avatar-${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={avatarClass}>
      {initials}
    </div>
  );
};
