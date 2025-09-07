import React, { useState } from 'react';
import { TextInput } from './TextInput';
import type { TextInputProps } from './TextInput';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

const EyeButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${theme.colors.textGray};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  pointer-events: auto;
  
  &:hover {
    color: ${theme.colors.text};
  }
  
  &:focus {
    outline: none;
    color: ${theme.colors.primary};
  }
`;

const EyeIcon: React.FC<{ visible: boolean }> = ({ visible }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {visible ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

export interface PasswordInputProps extends Omit<TextInputProps, 'type' | 'rightIcon'> {
  showToggle?: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  showToggle = true,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const rightIcon = showToggle ? (
    <EyeButton
      type="button"
      onClick={togglePasswordVisibility}
      tabIndex={-1}
      aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
    >
      <EyeIcon visible={showPassword} />
    </EyeButton>
  ) : undefined;

  return (
    <TextInput
      {...props}
      type={showPassword ? 'text' : 'password'}
      rightIcon={rightIcon}
    />
  );
};
