import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authService } from '@/services/authService'

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  loading: boolean
}

interface User {
  id: string
  email: string
  name: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('token')
    if (token) {
      // Validate token with backend
      authService.validateToken(token)
        .then((userData) => {
          setUser(userData)
          setIsAuthenticated(true)
        })
        .catch(() => {
          localStorage.removeItem('token')
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    const response = await authService.login(email, password)
    localStorage.setItem('token', response.token)
    setUser(response.user)
    setIsAuthenticated(true)
  }

  const register = async (email: string, password: string, name: string) => {
    const response = await authService.register(email, password, name)
    localStorage.setItem('token', response.token)
    setUser(response.user)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

