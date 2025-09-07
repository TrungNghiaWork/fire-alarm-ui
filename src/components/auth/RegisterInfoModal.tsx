import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { TextInput } from '@/components/common/TextInput';
import { validateRequired } from '@/utils/validators';
import { useAppDispatch } from '@/app/hooks';
import { registerInfoThunk } from '@/features/auth/auth.thunks';
import type { RegisterInfoRequest, RegisterRequest } from '@/types/auth';

const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FileInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const FileInputLabel = styled.label`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text};
  line-height: 1.2;
`;

const FileInputContainer = styled.div`
  position: relative;
`;

const HiddenFileInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const FileInputButton = styled.button<{ hasFile?: boolean; hasError?: boolean }>`
  width: 100%;
  height: 40px;
  padding: 0 ${theme.spacing.md};
  border: 1px solid ${({ hasError }) => hasError ? theme.colors.danger : theme.colors.border};
  border-radius: ${theme.radius.md};
  background: ${theme.colors.white};
  color: ${({ hasFile }) => hasFile ? theme.colors.text : theme.colors.textLight};
  font-size: ${theme.fontSize.md};
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${({ hasError }) => hasError ? theme.colors.danger : theme.colors.primary};
  }
  
  &:focus {
    outline: none;
    border-color: ${({ hasError }) => hasError ? theme.colors.danger : theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(238, 77, 139, 0.1);
  }
`;

const FileHint = styled.div`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textGray};
  line-height: 1.3;
`;

const FileError = styled.div`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.danger};
  line-height: 1.3;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.danger};
  font-size: ${theme.fontSize.sm};
  text-align: center;
  padding: ${theme.spacing.sm};
  background: rgba(255, 77, 79, 0.1);
  border-radius: ${theme.radius.sm};
`;

interface FormData {
  fullName: string;
  orgName: string;
  orgAddress: string;
  avatar: File | null;
}

interface FormErrors {
  fullName?: string;
  orgName?: string;
  orgAddress?: string;
  avatar?: string;
}

export interface RegisterInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onSuccess: () => void;
  registerData: RegisterRequest;
}

export const RegisterInfoModal: React.FC<RegisterInfoModalProps> = ({
  isOpen,
  onClose,
  onBack,
  onSuccess,
  registerData,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    orgName: '',
    orgAddress: '',
    avatar: null,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string>('');

  const handleInputChange = (field: keyof Omit<FormData, 'avatar'>) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    // Clear submit error
    if (submitError) {
      setSubmitError('');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    
    // Validate file
    if (file) {
      const maxSize = 2 * 1024 * 1024; // 2MB
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, avatar: t('auth.register.error.avatar_size') }));
        return;
      }
      
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, avatar: t('auth.register.error.avatar_type') }));
        return;
      }
    }
    
    setFormData(prev => ({ ...prev, avatar: file }));
    
    // Clear avatar error
    if (errors.avatar) {
      setErrors(prev => ({ ...prev, avatar: undefined }));
    }
    
    // Clear submit error
    if (submitError) {
      setSubmitError('');
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    const fullNameError = validateRequired(formData.fullName, t('auth.register.fullName'));
    if (fullNameError) newErrors.fullName = fullNameError;
    
    const orgNameError = validateRequired(formData.orgName, t('auth.register.orgName'));
    if (orgNameError) newErrors.orgName = orgNameError;
    
    const orgAddressError = validateRequired(formData.orgAddress, t('auth.register.orgAddress'));
    if (orgAddressError) newErrors.orgAddress = orgAddressError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      const requestData: RegisterInfoRequest = {
        fullName: formData.fullName,
        phone: registerData.phone,
        orgName: formData.orgName,
        orgAddress: formData.orgAddress,
        avatar: formData.avatar,
      };
      
      await dispatch(registerInfoThunk(requestData)).unwrap();
      onSuccess();
    } catch (error) {
      setSubmitError(error as string);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('auth.register.infoTitle')}
      width="600px"
    >
      <form onSubmit={handleSubmit}>
        <FormFields>
          <TextInput
            label={t('auth.register.fullName')}
            placeholder={t('auth.register.fullNamePlaceholder')}
            value={formData.fullName}
            onChange={handleInputChange('fullName')}
            error={errors.fullName}
            fullWidth
          />
          
          <TextInput
            type="email"
            label={t('auth.register.email')}
            value={registerData.email}
            disabled
            fullWidth
          />
          
          <TextInput
            type="tel"
            label={t('auth.register.phone')}
            value={registerData.phone}
            disabled
            fullWidth
          />
          
          <TextInput
            label={t('auth.register.orgName')}
            placeholder={t('auth.register.orgNamePlaceholder')}
            value={formData.orgName}
            onChange={handleInputChange('orgName')}
            error={errors.orgName}
            fullWidth
          />
          
          <TextInput
            label={t('auth.register.orgAddress')}
            placeholder={t('auth.register.orgAddressPlaceholder')}
            value={formData.orgAddress}
            onChange={handleInputChange('orgAddress')}
            error={errors.orgAddress}
            fullWidth
          />

          <FileInputWrapper>
            <FileInputLabel>{t('auth.register.avatar')}</FileInputLabel>
            <FileInputContainer>
              <HiddenFileInput
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleFileChange}
                id="avatar-input"
              />
              <FileInputButton
                type="button"
                hasFile={!!formData.avatar}
                hasError={!!errors.avatar}
                onClick={() => document.getElementById('avatar-input')?.click()}
              >
                {formData.avatar ? formData.avatar.name : 'Chọn file...'}
              </FileInputButton>
            </FileInputContainer>
            {errors.avatar && <FileError>{errors.avatar}</FileError>}
            {!errors.avatar && <FileHint>{t('auth.register.avatarHint')}</FileHint>}
          </FileInputWrapper>

          {submitError && (
            <ErrorMessage>{submitError}</ErrorMessage>
          )}

          <ButtonGroup>
            <Button type="button" variant="ghost" onClick={onBack}>
              {t('auth.register.back')}
            </Button>
            <Button type="submit" style={{ flex: 1 }}>
              {t('auth.register.confirmBtn')}
            </Button>
          </ButtonGroup>
        </FormFields>
      </form>
    </Modal>
  );
};
