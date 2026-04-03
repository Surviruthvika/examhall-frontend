import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/auth/AdminLogin';
import AdminSignup from './pages/auth/AdminSignup';
import StudentLogin from './pages/auth/StudentLogin';
import StudentSignup from './pages/auth/StudentSignup';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminStudents from './pages/admin/AdminStudents';
import AdminAllocate from './pages/admin/AdminAllocate';
import AdminAllocations from './pages/admin/AdminAllocations';
import AdminNotify from './pages/admin/AdminNotify';
import AdminNotifications from './pages/admin/AdminNotifications';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentHall from './pages/student/StudentHall';
import StudentNotifications from './pages/student/StudentNotifications';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#1a237e',
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: '500',
              borderRadius: '10px',
              padding: '12px 18px',
            },
            success: {
              style: { background: '#2e7d32' },
              iconTheme: { primary: '#fff', secondary: '#2e7d32' },
            },
            error: {
              style: { background: '#c62828' },
              iconTheme: { primary: '#fff', secondary: '#c62828' },
            },
          }}
        />
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/signup" element={<StudentSignup />} />

          {/* Admin Protected */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>
          } />
          <Route path="/admin/students" element={
            <ProtectedRoute role="ADMIN"><AdminStudents /></ProtectedRoute>
          } />
          <Route path="/admin/allocate" element={
            <ProtectedRoute role="ADMIN"><AdminAllocate /></ProtectedRoute>
          } />
          <Route path="/admin/allocations" element={
            <ProtectedRoute role="ADMIN"><AdminAllocations /></ProtectedRoute>
          } />
          <Route path="/admin/notify" element={
            <ProtectedRoute role="ADMIN"><AdminNotify /></ProtectedRoute>
          } />
          <Route path="/admin/notifications" element={
            <ProtectedRoute role="ADMIN"><AdminNotifications /></ProtectedRoute>
          } />

          {/* Student Protected */}
          <Route path="/student/dashboard" element={
            <ProtectedRoute role="STUDENT"><StudentDashboard /></ProtectedRoute>
          } />
          <Route path="/student/hall" element={
            <ProtectedRoute role="STUDENT"><StudentHall /></ProtectedRoute>
          } />
          <Route path="/student/notifications" element={
            <ProtectedRoute role="STUDENT"><StudentNotifications /></ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
