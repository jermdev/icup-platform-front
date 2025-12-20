const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';

interface RequestOptions extends RequestInit {
  body?: any;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    if (options.body && typeof options.body === 'object') {
      config.body = JSON.stringify(options.body);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: 'An error occurred' }));
      throw new Error(
        error.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  }

  // Auth endpoints
  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    return this.request('/auth/register', { method: 'POST', body: data });
  }

  async login(data: { email: string; password: string }) {
    return this.request('/auth/login', { method: 'POST', body: data });
  }

  async logout() {
    return this.request('/auth/logout', { method: 'POST' });
  }

  async getCurrentUser() {
    return this.request('/auth/me', { method: 'GET' });
  }

  // Event attendance methods
  async attendEvent(eventId: string) {
    return this.request(`/events/${eventId}/attend`, { method: 'POST' });
  }

  async unattendEvent(eventId: string) {
    return this.request(`/events/${eventId}/unattend`, { method: 'POST' });
  }

  async getAttendingEvents() {
    return this.request('/events/attending', { method: 'GET' });
  }

  // Events endpoints
  async getEvents(params?: { upcoming?: boolean; limit?: number }) {
    const query = new URLSearchParams();
    if (params?.upcoming) query.append('upcoming', 'true');
    if (params?.limit) query.append('limit', params.limit.toString());

    return this.request(`/events?${query.toString()}`, { method: 'GET' });
  }

  async getEvent(id: string) {
    return this.request(`/events/${id}`, { method: 'GET' });
  }

  async createEvent(data: any) {
    return this.request('/events', { method: 'POST', body: data });
  }

  async updateEvent(id: string, data: any) {
    return this.request(`/events/${id}`, { method: 'PATCH', body: data });
  }

  async deleteEvent(id: string) {
    return this.request(`/events/${id}`, { method: 'DELETE' });
  }

  // Sermons endpoints
  async getSermons(params?: { limit?: number; pastor?: string }) {
    const query = new URLSearchParams();
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.pastor) query.append('pastor', params.pastor);

    return this.request(`/sermons?${query.toString()}`, { method: 'GET' });
  }

  async getSermon(id: string) {
    return this.request(`/sermons/${id}`, { method: 'GET' });
  }

  async createSermon(data: any) {
    return this.request('/sermons', { method: 'POST', body: data });
  }

  async updateSermon(id: string, data: any) {
    return this.request(`/sermons/${id}`, { method: 'PATCH', body: data });
  }

  async deleteSermon(id: string) {
    return this.request(`/sermons/${id}`, { method: 'DELETE' });
  }

  // Blog endpoints
  async getBlogPosts(params?: { limit?: number; published?: boolean }) {
    const query = new URLSearchParams();
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.published !== undefined)
      query.append('published', params.published.toString());

    return this.request(`/blog?${query.toString()}`, { method: 'GET' });
  }

  async getBlogPost(id: string) {
    return this.request(`/blog/${id}`, { method: 'GET' });
  }

  async getBlogPostBySlug(slug: string) {
    return this.request(`/blog/slug/${slug}`, { method: 'GET' });
  }

  async createBlogPost(data: any) {
    return this.request('/blog', { method: 'POST', body: data });
  }

  async updateBlogPost(id: string, data: any) {
    return this.request(`/blog/${id}`, { method: 'PATCH', body: data });
  }

  async deleteBlogPost(id: string) {
    return this.request(`/blog/${id}`, { method: 'DELETE' });
  }

  // Gallery endpoints
  async getGalleryItems(params?: { album?: string; limit?: number }) {
    const query = new URLSearchParams();
    if (params?.album) query.append('album', params.album);
    if (params?.limit) query.append('limit', params.limit.toString());

    return this.request(`/gallery?${query.toString()}`, { method: 'GET' });
  }

  async getGalleryItem(id: string) {
    return this.request(`/gallery/${id}`, { method: 'GET' });
  }

  async getAlbums() {
    return this.request('/gallery/albums', { method: 'GET' });
  }

  async createGalleryItem(data: any) {
    return this.request('/gallery', { method: 'POST', body: data });
  }

  async updateGalleryItem(id: string, data: any) {
    return this.request(`/gallery/${id}`, { method: 'PATCH', body: data });
  }

  async deleteGalleryItem(id: string) {
    return this.request(`/gallery/${id}`, { method: 'DELETE' });
  }

  // Upload endpoints
  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseUrl}/uploads/image`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return response.json();
  }

  async uploadImages(files: File[]) {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    const response = await fetch(`${this.baseUrl}/uploads/images`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return response.json();
  }
}

export const api = new ApiClient(API_URL);
