import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';
import classNames from 'classnames';

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const InputContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  
  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `}
`;

const Label = styled.label`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text};
  line-height: 1.2;
`;

const InputWrapper = styled.div<{ hasError?: boolean; hasLeftIcon?: boolean; hasRightIcon?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  
  input {
    width: 100%;
    height: 40px;
    padding: 0 ${theme.spacing.md};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.radius.md};
    font-size: ${theme.fontSize.md};
    color: ${theme.colors.text};
    background: ${theme.colors.white};
    transition: all 0.2s ease;
    
    ${({ hasLeftIcon }) => hasLeftIcon && css`
      padding-left: 40px;
    `}
    
    ${({ hasRightIcon }) => hasRightIcon && css`
      padding-right: 40px;
    `}
    
    &::placeholder {
      color: ${theme.colors.textLight};
    }
    
    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 2px rgba(238, 77, 139, 0.1);
    }
    
    &:disabled {
      background: #F9FAFB;
      color: ${theme.colors.textGray};
      cursor: not-allowed;
    }
    
    ${({ hasError }) => hasError && css`
      border-color: ${theme.colors.danger};
      
      &:focus {
        border-color: ${theme.colors.danger};
        box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.1);
      }
    `}
  }
`;

const IconWrapper = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: ${theme.colors.textGray};
  pointer-events: none;
  
  ${({ position }) => position === 'left' ? css`
    left: ${theme.spacing.md};
  ` : css`
    right: ${theme.spacing.md};
  `}
`;

const HintText = styled.div`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textGray};
  line-height: 1.3;
`;

const ErrorText = styled.div`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.danger};
  line-height: 1.3;
`;

export const TextInput: React.FC<TextInputProps> = ({
  label,
  hint,
  error,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  ...props
}) => {
  return (
    <InputContainer fullWidth={fullWidth} className={classNames(className)}>
      {label && <Label>{label}</Label>}
      <InputWrapper 
        hasError={!!error}
        hasLeftIcon={!!leftIcon}
        hasRightIcon={!!rightIcon}
      >
        {leftIcon && <IconWrapper position="left">{leftIcon}</IconWrapper>}
        <input {...props} />
        {rightIcon && <IconWrapper position="right">{rightIcon}</IconWrapper>}
      </InputWrapper>
      {error && <ErrorText>{error}</ErrorText>}
      {!error && hint && <HintText>{hint}</HintText>}
    </InputContainer>
  );
};
