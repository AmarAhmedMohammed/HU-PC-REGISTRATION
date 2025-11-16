const ADMIN_STORAGE_KEY = 'hu_admin_credentials';

interface AdminCredentials {
  username: string;
  password: string;
}

const DEFAULT_ADMIN: AdminCredentials = {
  username: 'admin',
  password: 'admin123',
};

export const getAdminCredentials = (): AdminCredentials => {
  const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
  return stored ? JSON.parse(stored) : DEFAULT_ADMIN;
};

export const validateAdminLogin = (username: string, password: string): boolean => {
  const admin = getAdminCredentials();
  return username === admin.username && password === admin.password;
};

export const changeAdminPassword = (
  currentPassword: string,
  newPassword: string
): { success: boolean; message: string } => {
  const admin = getAdminCredentials();
  
  if (admin.password !== currentPassword) {
    return { success: false, message: 'Current password is incorrect' };
  }
  
  if (newPassword.length < 6) {
    return { success: false, message: 'New password must be at least 6 characters' };
  }
  
  const updatedAdmin = { ...admin, password: newPassword };
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(updatedAdmin));
  
  return { success: true, message: 'Password changed successfully' };
};

export const changeAdminUsername = (
  password: string,
  newUsername: string
): { success: boolean; message: string } => {
  const admin = getAdminCredentials();
  
  if (admin.password !== password) {
    return { success: false, message: 'Password is incorrect' };
  }
  
  if (newUsername.length < 3) {
    return { success: false, message: 'Username must be at least 3 characters' };
  }
  
  const updatedAdmin = { ...admin, username: newUsername };
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(updatedAdmin));
  
  return { success: true, message: 'Username changed successfully' };
};

export const resetToDefaultCredentials = (): void => {
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(DEFAULT_ADMIN));
};
