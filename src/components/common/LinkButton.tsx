import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import classNames from 'classnames';

export interface LinkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

const StyledLinkButton = styled.button<{ variant?: string }>`
  background: none;
  border: none;
  padding: 0;
  font-size: inherit;
  font-family: inherit;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s ease;
  
  color: ${({ variant }) => {
    switch (variant) {
      case 'danger':
        return theme.colors.danger;
      case 'secondary':
        return theme.colors.textGray;
      default:
        return theme.colors.primary;
    }
  }};
  
  &:hover:not(:disabled) {
    color: ${({ variant }) => {
      switch (variant) {
        case 'danger':
          return '#E53E3E';
        case 'secondary':
          return theme.colors.text;
        default:
          return theme.colors.primaryHover;
      }
    }};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(238, 77, 139, 0.2);
    border-radius: 2px;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const LinkButton: React.FC<LinkButtonProps> = ({
  variant = 'primary',
  children,
  className,
  ...props
}) => {
  return (
    <StyledLinkButton
      variant={variant}
      className={classNames(className)}
      {...props}
    >
      {children}
    </StyledLinkButton>
  );
};
