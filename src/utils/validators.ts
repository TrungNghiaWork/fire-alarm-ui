export const isEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isVNPhone = (phone: string): boolean => {
  const phoneRegex = /^0\d{9}$/;
  return phoneRegex.test(phone);
};

export const strongPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 number
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  return hasMinLength && hasUppercase && hasNumber;
};

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim() === '') {
    return `Vui lòng nhập ${fieldName}`;
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  if (!email || email.trim() === '') {
    return 'Vui lòng nhập Email';
  }
  if (!isEmail(email)) {
    return 'Email không hợp lệ';
  }
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone || phone.trim() === '') {
    return 'Vui lòng nhập Số điện thoại';
  }
  if (!isVNPhone(phone)) {
    return 'Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)';
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password || password.trim() === '') {
    return 'Vui lòng nhập Mật khẩu';
  }
  if (password.length < 6) {
    return 'Mật khẩu phải có ít nhất 6 ký tự';
  }
  return null;
};

export const validateStrongPassword = (password: string): string | null => {
  if (!password || password.trim() === '') {
    return 'Vui lòng nhập Mật khẩu';
  }
  if (!strongPassword(password)) {
    return 'Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa và 1 số';
  }
  return null;
};

export const validateUsername = (username: string): string | null => {
  if (!username || username.trim() === '') {
    return 'Vui lòng nhập Tên đăng nhập';
  }
  if (!isEmail(username) && !isVNPhone(username)) {
    return 'Tên đăng nhập phải là email hoặc số điện thoại hợp lệ';
  }
  return null;
};
