import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { Button } from "@/components/common/Button";
import { TextInput } from "@/components/common/TextInput";
import { PasswordInput } from "@/components/common/PasswordInput";
import { Checkbox } from "@/components/common/Checkbox";
import { LinkButton } from "@/components/common/LinkButton";
import { Divider } from "@/components/common/Divider";
import { validateUsername, validatePassword } from "@/utils/validators";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setRemember } from "@/features/auth/auth.slice";
import { loginThunk } from "@/features/auth/auth.thunks";
import type { LoginRequest } from "@/types/auth";

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

const ForgotPasswordWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -${theme.spacing.sm};
`;

const CheckboxWrapper = styled.div`
  margin: ${theme.spacing.sm} 0;
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.danger};
  font-size: ${theme.fontSize.sm};
  text-align: center;
  padding: ${theme.spacing.sm};
  background: rgba(255, 77, 79, 0.1);
  border-radius: ${theme.radius.sm};
`;

const Actions = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export interface LoginFormProps {
  onForgotPassword: () => void;
  onRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onForgotPassword,
  onRegister,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { remember } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState<LoginRequest>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginRequest>>({});
  const [submitError, setSubmitError] = useState<string>("");

  const handleInputChange =
    (field: keyof LoginRequest) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
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

  const handleRememberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRemember(event.target.checked));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginRequest> = {};

    const usernameError = validateUsername(formData.username);
    if (usernameError) newErrors.username = usernameError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      await dispatch(loginThunk(formData)).unwrap();
      // Navigation will be handled by the parent component
    } catch (error) {
      setSubmitError(error as string);
    }
  };

  return (
    <FormContainer>
      <FormHeader>
        <Title>{t("auth.login.title")}</Title>
        <Subtitle>{t("app.title")}</Subtitle>
      </FormHeader>

      <form onSubmit={handleSubmit}>
        <FormFields>
          <TextInput
            label={t("auth.login.username")}
            placeholder={t("auth.login.usernamePlaceholder")}
            value={formData.username}
            onChange={handleInputChange("username")}
            error={errors.username}
            fullWidth
          />

          <PasswordInput
            label={t("auth.login.password")}
            placeholder={t("auth.login.passwordPlaceholder")}
            value={formData.password}
            onChange={handleInputChange("password")}
            error={errors.password}
            fullWidth
          />
          <ForgotPasswordWrapper>
            <LinkButton type="button" onClick={onForgotPassword}>
              {t("auth.login.forgot")}
            </LinkButton>
          </ForgotPasswordWrapper>

          <Actions>
            <CheckboxWrapper>
              <Checkbox
                label={t("auth.login.remember")}
                checked={remember}
                onChange={handleRememberChange}
              />
            </CheckboxWrapper>

            {submitError && <ErrorMessage>{submitError}</ErrorMessage>}

            <Button type="submit" fullWidth>
              {t("auth.login.submit")}
            </Button>

            <Divider text={t("auth.login.or")} />

            <Button
              type="button"
              variant="ghost"
              fullWidth
              onClick={onRegister}
            >
              {t("auth.login.register")}
            </Button>
          </Actions>
        </FormFields>
      </form>
    </FormContainer>
  );
};
