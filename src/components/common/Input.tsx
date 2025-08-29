import React, { useState } from 'react';
import './Input.css';

interface InputProps {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'date' | 'tel';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  maxLength?: number;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = '',
  maxLength,
}) => {
  const [focused, setFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const inputClass = [
    'input',
    error ? 'input-error' : '',
    focused ? 'input-focused' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="input-group">
      {label && (
        <label className="label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        type={type}
        className={inputClass}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
};
