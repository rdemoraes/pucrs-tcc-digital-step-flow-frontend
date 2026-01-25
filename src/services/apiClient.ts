import axios from 'axios'

const envUrl = import.meta.env.VITE_API_BASE_URL
const API_BASE_URL = (envUrl !== undefined && envUrl !== '') ? envUrl : 'http://localhost:8080/api'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token !== null && token !== '') {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  async (error) => {
    return await Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return await Promise.reject(error)
  }
)
