import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@/api/auth.service';
import { showLoading, hideLoading } from '@/features/ui/ui.slice';
import { setCredentials, logout } from './auth.slice';
import type { 
  LoginRequest, 
  RegisterRequest, 
  RegisterInfoRequest, 
  ForgotRequest 
} from '@/types/auth';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (data: LoginRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoading());
      const response = await authService.login(data);
      dispatch(setCredentials(response));
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Đăng nhập thất bại';
      return rejectWithValue(message);
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (data: RegisterRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoading());
      const response = await authService.register(data);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Đăng ký thất bại';
      return rejectWithValue(message);
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const registerInfoThunk = createAsyncThunk(
  'auth/registerInfo',
  async (data: RegisterInfoRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoading());
      const response = await authService.registerInfo(data);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Cập nhật thông tin thất bại';
      return rejectWithValue(message);
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const forgotPasswordThunk = createAsyncThunk(
  'auth/forgotPassword',
  async (data: ForgotRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoading());
      const response = await authService.forgotPassword(data);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Gửi yêu cầu thất bại';
      return rejectWithValue(message);
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const fetchMeThunk = createAsyncThunk(
  'auth/fetchMe',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await authService.getMe();
      return response.user;
    } catch (error: any) {
      // If unauthorized, logout user
      if (error.response?.status === 401) {
        dispatch(logout());
      }
      const message = error.response?.data?.message || 'Lấy thông tin người dùng thất bại';
      return rejectWithValue(message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    try {
      await authService.logout();
      dispatch(logout());
    } catch (error) {
      // Even if logout fails, clear local state
      dispatch(logout());
    }
  }
);
