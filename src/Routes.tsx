// src/routes.tsx
import { HashRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import type { JSX } from 'react';

export default function RoutesApp(): JSX.Element {
  return (
    <HashRouter basename="/jarvis-ts">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
}
