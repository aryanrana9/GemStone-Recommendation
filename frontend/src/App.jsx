import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';

// Layout elements
import ProtectedRoute from './components/Layout/ProtectedRoute';
import DashboardLayout from './components/Layout/DashboardLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

// Dashboard Pages
import DashboardHome from './pages/DashboardHome';
import GemstoneRecommendation from './pages/GemstoneRecommendation';
import RecommendationHistory from './pages/RecommendationHistory';
import Horoscope from './pages/Horoscope';
import ZodiacProfile from './pages/ZodiacProfile';
import GemstoneLibrary from './pages/GemstoneLibrary';
import SubscriptionPlans from './pages/SubscriptionPlans';
import ProfileSettings from './pages/ProfileSettings';
import HelpSupport from './pages/HelpSupport';

// Admin Dashboard
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <Router>
            <Routes>
              
              {/* Public Guest Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Protected User Dashboard Routes */}
              <Route path="/dashboard" element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                  <Route index element={<DashboardHome />} />
                  <Route path="recommend" element={<GemstoneRecommendation />} />
                  <Route path="history" element={<RecommendationHistory />} />
                  <Route path="horoscope" element={<Horoscope />} />
                  <Route path="zodiac" element={<ZodiacProfile />} />
                  <Route path="library" element={<GemstoneLibrary />} />
                  <Route path="subscriptions" element={<SubscriptionPlans />} />
                  <Route path="settings" element={<ProfileSettings />} />
                  <Route path="support" element={<HelpSupport />} />
                </Route>
              </Route>

              {/* Protected Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute adminOnly={true} />}>
                <Route element={<DashboardLayout />}>
                  <Route index element={<AdminDashboard />} />
                </Route>
              </Route>

              {/* Catch-all Redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
          </Router>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
