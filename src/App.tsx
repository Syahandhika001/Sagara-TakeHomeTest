import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { AttendanceProvider } from './context/AttendanceContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Employees } from './pages/Employees';
import { Departments } from './pages/Departments';
import { Reports } from './pages/Reports';
import { Attendance } from './pages/Attendance';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <EmployeeProvider>
        <AttendanceProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Route: Login */}
              <Route path="/login" element={<Login />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/employees"
                element={
                  <ProtectedRoute>
                    <Employees />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/departments"
                element={
                  <ProtectedRoute>
                    <Departments />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/reports"
                element={
                  <ProtectedRoute>
                    <Reports />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/attendance"
                element={
                  <ProtectedRoute>
                    <Attendance />
                  </ProtectedRoute>
                }
              />

              {/* Root redirect */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AttendanceProvider>
      </EmployeeProvider>
    </AuthProvider>
  );
}

export default App;