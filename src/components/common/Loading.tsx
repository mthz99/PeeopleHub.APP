import React from 'react';
import './Loading.css';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  text,
  fullScreen = false
}) => {
  const content = (
    <div className={`loading-container ${fullScreen ? 'loading-fullscreen' : ''}`}>
      <div className={`spinner spinner-${size}`}></div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );

  return content;
};
