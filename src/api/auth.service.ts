import { axiosClient } from './axiosClient';
import type { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  RegisterResponse, 
  RegisterInfoRequest, 
  RegisterInfoResponse, 
  ForgotRequest, 
  ForgotResponse,
  User 
} from '@/types/auth';

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await axiosClient.post<LoginResponse>('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await axiosClient.post<RegisterResponse>('/auth/register', data);
    return response.data;
  },

  async registerInfo(data: RegisterInfoRequest): Promise<RegisterInfoResponse> {
    // Convert FormData if avatar is present
    const formData = new FormData();
    formData.append('fullName', data.fullName);
    formData.append('phone', data.phone);
    formData.append('orgName', data.orgName);
    formData.append('orgAddress', data.orgAddress);
    
    if (data.avatar) {
      formData.append('avatar', data.avatar);
    }

    const response = await axiosClient.post<RegisterInfoResponse>('/auth/register/info', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async forgotPassword(data: ForgotRequest): Promise<ForgotResponse> {
    const response = await axiosClient.post<ForgotResponse>('/auth/forgot', data);
    return response.data;
  },

  async getMe(): Promise<{ user: User }> {
    const response = await axiosClient.get<{ user: User }>('/auth/me');
    return response.data;
  },

  async logout(): Promise<void> {
    // Clear tokens from storage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_user');
  },
};
