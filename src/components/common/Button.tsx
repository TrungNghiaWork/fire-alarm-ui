import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';
import classNames from 'classnames';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  border: none;
  border-radius: ${theme.radius.md};
  font-weight: ${theme.fontWeight.medium};
  font-size: ${theme.fontSize.md};
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  white-space: nowrap;
  
  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `}
  
  ${({ size }) => {
    switch (size) {
      case 'sm':
        return css`
          height: 32px;
          padding: 0 ${theme.spacing.lg};
          font-size: ${theme.fontSize.sm};
        `;
      case 'lg':
        return css`
          height: 48px;
          padding: 0 ${theme.spacing.xxl};
          font-size: ${theme.fontSize.lg};
        `;
      default:
        return css`
          height: 40px;
          padding: 0 ${theme.spacing.xl};
        `;
    }
  }}
  
  ${({ variant }) => {
    switch (variant) {
      case 'ghost':
        return css`
          background: transparent;
          color: ${theme.colors.primary};
          border: 1px solid #F8BACF;
          
          &:hover:not(:disabled) {
            background: rgba(238, 77, 139, 0.05);
            border-color: ${theme.colors.primary};
          }
          
          &:active:not(:disabled) {
            background: rgba(238, 77, 139, 0.1);
          }
        `;
      case 'danger':
        return css`
          background: ${theme.colors.danger};
          color: ${theme.colors.white};
          
          &:hover:not(:disabled) {
            background: #E53E3E;
          }
          
          &:active:not(:disabled) {
            background: #C53030;
          }
        `;
      default:
        return css`
          background: ${theme.colors.primary};
          color: ${theme.colors.white};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.primaryHover};
          }
          
          &:active:not(:disabled) {
            background: #D02E6B;
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(238, 77, 139, 0.2);
  }
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  children,
  className,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      className={classNames(className)}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </StyledButton>
  );
};
