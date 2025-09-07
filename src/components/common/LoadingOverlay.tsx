import React from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { theme } from '@/styles/theme';
import { useTranslation } from 'react-i18next';

export interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${theme.colors.loadingOverlay};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: ${theme.zIndex.overlay};
  animation: ${fadeIn} 0.2s ease-out;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(238, 77, 139, 0.2);
  border-top: 3px solid ${theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: ${theme.spacing.lg};
`;

const LoadingText = styled.div`
  font-size: ${theme.fontSize.xxl};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.text};
  text-align: center;
`;

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  message,
}) => {
  const { t } = useTranslation();

  if (!isVisible) return null;

  const overlayContent = (
    <Overlay>
      <Spinner />
      <LoadingText>
        {message || t('common.loading')}
      </LoadingText>
    </Overlay>
  );

  return createPortal(overlayContent, document.body);
};
