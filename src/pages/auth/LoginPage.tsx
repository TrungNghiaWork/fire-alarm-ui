import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { LoginForm } from '@/components/auth/LoginForm';
import { ForgotPasswordModal } from '@/components/auth/ForgotPasswordModal';
import { useAppSelector } from '@/app/hooks';

const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;


const FormSection = styled.div`
  /* 1/3 chiều rộng */
  flex: 0 0 35%;
  max-width: 35%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xxl};
  background: ${theme.colors.pageBG};

  /* Responsive */
  @media (max-width: 992px) {
    flex-basis: 40%;
    max-width: 40%;
  }
  @media (max-width: 768px) {
    flex-basis: 100%;
    max-width: 100%;
  }
`;

const FormCard = styled.div`
  width: 100%;
  max-width: 85%;
  padding: ${theme.spacing.xxl};
  background: ${theme.colors.cardBG};
  border-radius: ${theme.radius.lg};
  box-shadow: ${theme.shadow.md};
`;

const HeroSection = styled.div`
  flex: 1;
  background-image: url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(238, 77, 139, 0.1) 0%, rgba(238, 77, 139, 0.05) 100%);
  }
`;


export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAppSelector((state) => state.auth);
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (token) {
      const from = location.state?.from?.pathname || '/home';
      navigate(from, { replace: true });
    }
  }, [token, navigate, location]);

  const handleForgotPassword = () => {
    setShowForgotModal(true);
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleCloseForgotModal = () => {
    setShowForgotModal(false);
  };

  return (
    <PageContainer>
      <FormSection>
        <FormCard>
          <LoginForm
            onForgotPassword={handleForgotPassword}
            onRegister={handleRegister}
          />
        </FormCard>
      </FormSection>
      
      <HeroSection />

      <ForgotPasswordModal
        isOpen={showForgotModal}
        onClose={handleCloseForgotModal}
      />
    </PageContainer>
  );
};
