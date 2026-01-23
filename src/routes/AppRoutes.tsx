import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { OnboardingPage } from '@/pages/onboarding/OnboardingPage'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { SubscriptionPage } from '@/pages/subscription/SubscriptionPage'

export function AppRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {isAuthenticated ? (
        <>
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </>
      ) : (
        <Route path="/" element={<Navigate to="/login" replace />} />
      )}
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

