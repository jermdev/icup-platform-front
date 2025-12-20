import { api } from './api';

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  profileImage?: string;
  provider: string;
  isActive: boolean;
}

export async function checkAuth() {
  try {
    const response = await api.getCurrentUser();
    return response;
  } catch (error) {
    return null;
  }
}

export function isAuthenticated(user: any): boolean {
  return user !== null && user !== undefined;
}

export function isSuperAdmin(user: any): boolean {
  return user?.role === 'superadmin';
}

export function redirectToLogin() {
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}

export function redirectToDashboard() {
  if (typeof window !== 'undefined') {
    window.location.href = '/dashboard';
  }
}

export function saveUserToLocalStorage(user: User) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
}

export function getUserFromLocalStorage(): User | null {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
}

export function clearUserFromLocalStorage() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
}
