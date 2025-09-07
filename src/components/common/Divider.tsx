import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

export interface DividerProps {
  text?: string;
  margin?: string;
}

const DividerContainer = styled.div<{ margin?: string }>`
  display: flex;
  align-items: center;
  margin: ${({ margin }) => margin || `${theme.spacing.lg} 0`};
`;

const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background: ${theme.colors.border};
`;

const DividerText = styled.span`
  padding: 0 ${theme.spacing.lg};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textGray};
  background: ${theme.colors.white};
`;

export const Divider: React.FC<DividerProps> = ({ text, margin }) => {
  if (text) {
    return (
      <DividerContainer margin={margin}>
        <DividerLine />
        <DividerText>{text}</DividerText>
        <DividerLine />
      </DividerContainer>
    );
  }

  return (
    <DividerContainer margin={margin}>
      <DividerLine />
    </DividerContainer>
  );
};
