import type { User } from '../../types';

export function isSuperAdmin(user: User | null | undefined): boolean {
  return user?.role === 'superadmin';
}

export function isUser(user: User | null | undefined): boolean {
  return user?.role === 'user';
}

export function canEditEvents(user: User | null | undefined): boolean {
  return isSuperAdmin(user);
}

export function canDeleteEvents(user: User | null | undefined): boolean {
  return isSuperAdmin(user);
}

export function canManageCalendar(user: User | null | undefined): boolean {
  return isSuperAdmin(user);
}

export function getRoleBadgeColor(role: string): string {
  switch (role) {
    case 'superadmin':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'user':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

export function getRoleDisplayName(role: string): string {
  switch (role) {
    case 'superadmin':
      return 'Super Administrador';
    case 'user':
      return 'Usuario';
    default:
      return role;
  }
}
