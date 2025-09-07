import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';
import classNames from 'classnames';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const CheckboxWrapper = styled.label<{ hasError?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
  cursor: pointer;
  font-size: ${theme.fontSize.md};
  line-height: 1.4;
  
  ${({ hasError }) => hasError && css`
    color: ${theme.colors.danger};
  `}
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const StyledCheckbox = styled.div<{ checked?: boolean; hasError?: boolean }>`
  width: 16px;
  height: 16px;
  border: 1px solid ${({ hasError }) => hasError ? theme.colors.danger : theme.colors.border};
  border-radius: 3px;
  background: ${({ checked }) => checked ? theme.colors.primary : theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
  margin-top: 2px;
  
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 2px rgba(238, 77, 139, 0.2);
  }
  
  ${HiddenCheckbox}:disabled + & {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:hover {
    border-color: ${({ hasError }) => hasError ? theme.colors.danger : theme.colors.primary};
  }
`;

const CheckIcon = styled.svg<{ checked?: boolean }>`
  width: 10px;
  height: 10px;
  stroke: ${theme.colors.white};
  stroke-width: 2;
  opacity: ${({ checked }) => checked ? 1 : 0};
  transition: opacity 0.2s ease;
`;

const LabelText = styled.span`
  flex: 1;
`;

const ErrorText = styled.div`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.danger};
  line-height: 1.3;
  margin-left: 24px;
`;

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  checked,
  disabled,
  className,
  ...props
}) => {
  return (
    <CheckboxContainer className={classNames(className)}>
      <CheckboxWrapper hasError={!!error}>
        <HiddenCheckbox
          type="checkbox"
          checked={checked}
          disabled={disabled}
          {...props}
        />
        <StyledCheckbox checked={checked} hasError={!!error}>
          <CheckIcon
            checked={checked}
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20,6 9,17 4,12" />
          </CheckIcon>
        </StyledCheckbox>
        {label && <LabelText>{label}</LabelText>}
      </CheckboxWrapper>
      {error && <ErrorText>{error}</ErrorText>}
    </CheckboxContainer>
  );
};
