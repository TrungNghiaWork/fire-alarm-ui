export type LoginRequest = {
  username: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  phone: string;
  password: string;
};

export type RegisterInfoRequest = {
  fullName: string;
  phone: string;
  orgName: string;
  orgAddress: string;
  avatar?: File | null;
};

export type ForgotRequest = {
  email: string;
  phone: string;
};

export type User = {
  id: string;
  username: string;
  fullName: string;
  role: 'ADMIN' | 'USER';
  email: string;
  phone: string;
};

export type AuthState = {
  token?: string;
  user?: User;
  remember: boolean;
};

export type LoginResponse = {
  token: string;
  user: User;
};

export type RegisterResponse = {
  id: string;
};

export type RegisterInfoResponse = {
  ok: boolean;
};

export type ForgotResponse = {
  ok: boolean;
  message: string;
};

export type ApiError = {
  message: string;
  code?: string;
};
