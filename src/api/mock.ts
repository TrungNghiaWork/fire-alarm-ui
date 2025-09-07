import MockAdapter from 'axios-mock-adapter';
import { axiosClient } from './axiosClient';
import type { LoginRequest, RegisterRequest, RegisterInfoRequest, ForgotRequest } from '@/types/auth';

// Create mock adapter
const mock = new MockAdapter(axiosClient.getInstance(), { delayResponse: 1000 });

// Mock user data
const mockUser = {
  id: 'u1',
  username: 'admin@demo.com',
  fullName: 'Trần Tú Hoan',
  role: 'ADMIN' as const,
  email: 'admin@demo.com',
  phone: '0901234567',
};

const mockToken = 'demo-token-' + Date.now();

// POST /auth/login
mock.onPost('/auth/login').reply((config) => {
  const data: LoginRequest = JSON.parse(config.data);
  const { username, password } = data;

  // Simple validation - accept any email/phone with password "123456"
  if (password === '123456') {
    return [200, {
      token: mockToken,
      user: {
        ...mockUser,
        username: username,
        email: username.includes('@') ? username : mockUser.email,
        phone: username.includes('@') ? mockUser.phone : username,
      }
    }];
  }

  return [401, { message: 'Sai tên đăng nhập hoặc mật khẩu' }];
});

// POST /auth/register
mock.onPost('/auth/register').reply((config) => {
  const data: RegisterRequest = JSON.parse(config.data);
  
  // Simulate validation
  if (!data.email || !data.phone || !data.password) {
    return [400, { message: 'Thiếu thông tin bắt buộc' }];
  }

  // Simulate email already exists
  if (data.email === 'existing@demo.com') {
    return [409, { message: 'Email đã được sử dụng' }];
  }

  return [200, { id: 'u2' }];
});

// POST /auth/register/info
mock.onPost('/auth/register/info').reply((config) => {
  const data: RegisterInfoRequest = JSON.parse(config.data);
  
  // Simulate validation
  if (!data.fullName || !data.orgName || !data.orgAddress) {
    return [400, { message: 'Thiếu thông tin bắt buộc' }];
  }

  return [200, { ok: true }];
});

// POST /auth/forgot
mock.onPost('/auth/forgot').reply((config) => {
  const data: ForgotRequest = JSON.parse(config.data);
  
  // Simulate validation
  if (!data.email || !data.phone) {
    return [400, { message: 'Thiếu thông tin bắt buộc' }];
  }

  return [200, { 
    ok: true, 
    message: 'Đã gửi OTP/đường dẫn đặt lại mật khẩu' 
  }];
});

// GET /auth/me
mock.onGet('/auth/me').reply((config) => {
  const authHeader = config.headers?.Authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return [401, { message: 'Token không hợp lệ' }];
  }

  return [200, { user: mockUser }];
});

// Fallback for unmatched requests
mock.onAny().passThrough();

export default mock;
