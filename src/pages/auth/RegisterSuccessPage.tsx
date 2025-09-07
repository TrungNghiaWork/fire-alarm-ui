import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { Button } from '@/components/common/Button';
import { LinkButton } from '@/components/common/LinkButton';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.pageBG};
  padding: ${theme.spacing.xxl};
`;

const ContentCard = styled.div`
  max-width: 500px;
  width: 100%;
  padding: ${theme.spacing.xxxl};
  background: ${theme.colors.cardBG};
  border-radius: ${theme.radius.lg};
  box-shadow: ${theme.shadow.md};
  text-align: center;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto ${theme.spacing.xxl} auto;
  background: ${theme.colors.success};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
`;

const Title = styled.h1`
  font-size: ${theme.fontSize.xxxl};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing.lg} 0;
`;

const Description = styled.p`
  font-size: ${theme.fontSize.lg};
  color: ${theme.colors.textGray};
  line-height: 1.6;
  margin: 0 0 ${theme.spacing.xxl} 0;
`;

const CountdownText = styled.div`
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.textGray};
  margin: ${theme.spacing.lg} 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  align-items: center;
`;

const CheckIcon: React.FC = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20,6 9,17 4,12" />
  </svg>
);

export const RegisterSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <PageContainer>
      <ContentCard>
        <SuccessIcon>
          <CheckIcon />
        </SuccessIcon>
        
        <Title>{t('auth.register.successTitle')}</Title>
        
        <Description>
          {t('auth.register.successDesc', {
            login: t('auth.register.loginLink'),
            sec: countdown,
          })}
        </Description>

        <CountdownText>
          Tự động chuyển hướng sau {countdown} giây...
        </CountdownText>

        <ButtonGroup>
          <Button onClick={handleLoginClick}>
            {t('auth.register.loginLink')}
          </Button>
          
          <LinkButton onClick={() => navigate('/')}>
            Về trang chủ
          </LinkButton>
        </ButtonGroup>
      </ContentCard>
    </PageContainer>
  );
};
