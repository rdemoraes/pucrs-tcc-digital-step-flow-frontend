import { apiClient } from './apiClient'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
  }
}

export const authService = {
  async login (email: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', {
      email,
      password
    })
    return response.data
  },

  async register (email: string, password: string, name: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', {
      email,
      password,
      name
    })
    return response.data
  },

  async validateToken (token: string) {
    const response = await apiClient.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  }
}
