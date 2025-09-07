import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { Button } from '@/components/common/Button';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { logoutThunk } from '@/features/auth/auth.thunks';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.pageBG};
`;

const Header = styled.header`
  background: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.border};
  padding: ${theme.spacing.lg} ${theme.spacing.xxl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${theme.shadow.sm};
`;

const Logo = styled.h1`
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.primary};
  margin: 0;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
`;

const UserName = styled.span`
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.text};
`;

const UserRole = styled.span`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textGray};
  background: rgba(238, 77, 139, 0.1);
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.radius.sm};
`;

const MainContent = styled.main`
  padding: ${theme.spacing.xxxl};
  max-width: 1200px;
  margin: 0 auto;
`;

const WelcomeCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.xxxl};
  box-shadow: ${theme.shadow.md};
  text-align: center;
`;

const WelcomeTitle = styled.h2`
  font-size: ${theme.fontSize.xxxl};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing.lg} 0;
`;

const WelcomeDescription = styled.p`
  font-size: ${theme.fontSize.lg};
  color: ${theme.colors.textGray};
  line-height: 1.6;
  margin: 0 0 ${theme.spacing.xxl} 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing.xxxl};
`;

const StatCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.xxl};
  box-shadow: ${theme.shadow.md};
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: ${theme.fontSize.xxxl};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const StatLabel = styled.div`
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.textGray};
`;

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  return (
    <PageContainer>
      <Header>
        <Logo>{t('app.title')}</Logo>
        <UserInfo>
          <div>
            <UserName>{user?.fullName}</UserName>
            <UserRole>{user?.role}</UserRole>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </UserInfo>
      </Header>

      <MainContent>
        <WelcomeCard>
          <WelcomeTitle>{t('home.title')}</WelcomeTitle>
          <WelcomeDescription>
            {t('home.welcome')}
          </WelcomeDescription>
          <p>
            Chào mừng <strong>{user?.fullName}</strong> ({user?.email}) đến với hệ thống!
          </p>
        </WelcomeCard>

        <StatsGrid>
          <StatCard>
            <StatNumber>24/7</StatNumber>
            <StatLabel>Giám sát liên tục</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatNumber>99.9%</StatNumber>
            <StatLabel>Độ tin cậy</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatNumber>&lt; 30s</StatNumber>
            <StatLabel>Thời gian phản hồi</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatNumber>1000+</StatNumber>
            <StatLabel>Thiết bị được kết nối</StatLabel>
          </StatCard>
        </StatsGrid>
      </MainContent>
    </PageContainer>
  );
};
