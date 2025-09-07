import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { TextInput } from '@/components/common/TextInput';
import { LinkButton } from '@/components/common/LinkButton';
import { validateEmail, validatePhone } from '@/utils/validators';
import { useAppDispatch } from '@/app/hooks';
import { forgotPasswordThunk } from '@/features/auth/auth.thunks';
import type { ForgotRequest } from '@/types/auth';

const ModalDescription = styled.p`
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.textGray};
  line-height: 1.5;
  margin: 0 0 ${theme.spacing.xxl} 0;
  text-align: center;
`;

const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xxl};
`;

const BackLinkWrapper = styled.div`
  text-align: center;
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.danger};
  font-size: ${theme.fontSize.sm};
  text-align: center;
  padding: ${theme.spacing.sm};
  background: rgba(255, 77, 79, 0.1);
  border-radius: ${theme.radius.sm};
`;

const SuccessMessage = styled.div`
  color: ${theme.colors.success};
  font-size: ${theme.fontSize.sm};
  text-align: center;
  padding: ${theme.spacing.sm};
  background: rgba(82, 196, 26, 0.1);
  border-radius: ${theme.radius.sm};
`;

export interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  
  const [formData, setFormData] = useState<ForgotRequest>({
    email: '',
    phone: '',
  });
  
  const [errors, setErrors] = useState<Partial<ForgotRequest>>({});
  const [submitError, setSubmitError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const handleInputChange = (field: keyof ForgotRequest) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    // Clear submit error and success
    if (submitError) {
      setSubmitError('');
    }
    if (success) {
      setSuccess(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ForgotRequest> = {};
    
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await dispatch(forgotPasswordThunk(formData)).unwrap();
      setSuccess(true);
      setSubmitError('');
      
      // Auto close after 3 seconds
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({ email: '', phone: '' });
        setErrors({});
      }, 3000);
    } catch (error) {
      setSubmitError(error as string);
      setSuccess(false);
    }
  };

  const handleClose = () => {
    onClose();
    setFormData({ email: '', phone: '' });
    setErrors({});
    setSubmitError('');
    setSuccess(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={t('auth.forgot.title')}
      width="500px"
    >
      <ModalDescription>
        {t('auth.forgot.desc')}
      </ModalDescription>

      {success ? (
        <SuccessMessage>
          {t('auth.forgot.success')}
        </SuccessMessage>
      ) : (
        <form onSubmit={handleSubmit}>
          <FormFields>
            <TextInput
              type="email"
              label={t('auth.forgot.email')}
              placeholder={t('auth.forgot.emailPlaceholder')}
              value={formData.email}
              onChange={handleInputChange('email')}
              error={errors.email}
              fullWidth
            />
            
            <TextInput
              type="tel"
              label={t('auth.forgot.phone')}
              placeholder={t('auth.forgot.phonePlaceholder')}
              value={formData.phone}
              onChange={handleInputChange('phone')}
              error={errors.phone}
              fullWidth
            />

            {submitError && (
              <ErrorMessage>{submitError}</ErrorMessage>
            )}

            <ButtonGroup>
              <Button type="submit" fullWidth>
                {t('auth.forgot.submit')}
              </Button>
              
              <BackLinkWrapper>
                <LinkButton type="button" onClick={handleClose}>
                  {t('auth.forgot.back')}
                </LinkButton>
              </BackLinkWrapper>
            </ButtonGroup>
          </FormFields>
        </form>
      )}
    </Modal>
  );
};
