/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    user?: {
      _id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: 'user' | 'superadmin';
      profileImage?: string;
      provider: 'local' | 'google';
      isActive: boolean;
    };
  }
}
