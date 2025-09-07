import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { Button } from "@/components/common/Button";
import { TextInput } from "@/components/common/TextInput";
import { PasswordInput } from "@/components/common/PasswordInput";
import { Checkbox } from "@/components/common/Checkbox";
import {
  validateEmail,
  validatePhone,
  validateStrongPassword,
} from "@/utils/validators";
import { useAppDispatch } from "@/app/hooks";
import { registerThunk } from "@/features/auth/auth.thunks";
import type { RegisterRequest } from "@/types/auth";
import { Divider } from "../common/Divider";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.md};
`;

const Title = styled.h1`
  font-size: ${theme.fontSize.xxxl};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing.md} 0;
`;

const Subtitle = styled.p`
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.textLight};
  margin: 0;
`;

const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const ButtonGroup = styled.div`
  width: 70%;
  margin: 8px auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.danger};
  font-size: ${theme.fontSize.sm};
  text-align: center;
  padding: ${theme.spacing.sm};
  background: rgba(255, 77, 79, 0.1);
  border-radius: ${theme.radius.sm};
`;

interface FormData extends RegisterRequest {
  confirmPassword: string;
  agree: boolean;
}

interface FormErrors {
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  agree?: string;
}

export interface RegisterFormProps {
  onCancel: () => void;
  onSuccess: (data: RegisterRequest) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onCancel,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string>("");

  const handleInputChange =
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear field error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }

      // Clear submit error
      if (submitError) {
        setSubmitError("");
      }
    };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;

    const passwordError = validateStrongPassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t("auth.register.error.confirm_required");
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t("auth.register.error.password_mismatch");
    }

    if (!formData.agree) {
      newErrors.agree = t("auth.register.error.agree_required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      const registerData: RegisterRequest = {
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };

      await dispatch(registerThunk(registerData)).unwrap();
      onSuccess(registerData);
    } catch (error) {
      setSubmitError(error as string);
    }
  };

  return (
    <FormContainer>
      <FormHeader>
        <Title>{t("auth.register.title")}</Title>
        <Subtitle>{t("auth.register.subtitle")}</Subtitle>
      </FormHeader>

      <form onSubmit={handleSubmit}>
        <FormFields>
          <TextInput
            type="email"
            label={t("auth.register.email")}
            placeholder={t("auth.register.emailPlaceholder")}
            value={formData.email}
            onChange={handleInputChange("email")}
            error={errors.email}
            fullWidth
          />

          <TextInput
            type="tel"
            label={t("auth.register.phone")}
            placeholder={t("auth.register.phonePlaceholder")}
            value={formData.phone}
            onChange={handleInputChange("phone")}
            error={errors.phone}
            fullWidth
          />

          <PasswordInput
            label={t("auth.register.password")}
            placeholder={t("auth.register.passwordPlaceholder")}
            value={formData.password}
            onChange={handleInputChange("password")}
            error={errors.password}
            fullWidth
          />

          <PasswordInput
            label={t("auth.register.confirm")}
            placeholder={t("auth.register.confirmPlaceholder")}
            value={formData.confirmPassword}
            onChange={handleInputChange("confirmPassword")}
            error={errors.confirmPassword}
            fullWidth
          />

          <Checkbox
            label={t("auth.register.agree")}
            checked={formData.agree}
            onChange={handleInputChange("agree")}
            error={errors.agree}
          />

          {submitError && <ErrorMessage>{submitError}</ErrorMessage>}

          <ButtonGroup>
            <Button style={{marginBottom: '20px'}} type="submit" fullWidth>
              {t("auth.register.next")}
            </Button>

            <Button type="button" variant="ghost" onClick={onCancel}>
              {t("auth.register.cancel")}
            </Button>
          </ButtonGroup>
        </FormFields>
      </form>
    </FormContainer>
  );
};
