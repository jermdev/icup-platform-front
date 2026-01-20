export type UserRole = 'user' | 'superadmin';

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  profileImage?: string;
  provider: 'local' | 'google';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface MiembroPastoral {
  id: string;
  nombre: string;
  rol: string;
  descripcion: string;
  fotoUrl?: string;
}

// TODO: Defenir espesificamente, la estructura de informacion que porpocionara el la api para semones
export interface Sermon {
  _id: string;
  title: string;
  date: string;
  content : string
  description: string;
  imgUrl?: string;
  thumbnailUrl: string;
  pastor: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  bibleVerse: string;

}

export type EventCategory =
  | 'worship'
  | 'bible-study'
  | 'prayer'
  | 'youth'
  | 'special'
  | 'cell-group'
  | 'training'
  | 'teaching';

export type EventType = 'activity' | 'event';

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location?: string;
  imageUrl?: string;
  category?: EventCategory;
  eventType?: EventType;
  isActive: boolean;
  tags?: string[];
  interestedUsers: string[];
  attendingUsers: string[];
  createdAt: string;
  updatedAt: string;
}

export interface EventsResponse {
  events: Event[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface LoginResponse {
  user: User;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginData {
  email: string;
  password: string;
}
