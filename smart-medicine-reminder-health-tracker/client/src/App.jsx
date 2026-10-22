import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Medicines from './pages/Medicines';
import MedicationHistory from './pages/MedicationHistory';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  const initialToken = sessionStorage.getItem('meditrack_token');
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(Boolean(initialToken));
  const [activePage, setActivePage] = useState(initialToken ? 'dashboard' : 'login');
  const [backendHealth, setBackendHealth] = useState(null);
  const [backendStatus, setBackendStatus] = useState('checking');

  // Verify backend API health
  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/health');
        if (response.ok) {
          const data = await response.json();
          setBackendHealth(data);
          setBackendStatus('online');
        } else {
          setBackendStatus('error');
        }
      } catch (err) {
        setBackendStatus('offline');
      }
    };

    checkApiHealth();
    const interval = setInterval(checkApiHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  // Validate existing session token on application startup or restoration
  useEffect(() => {
    const validateSession = async () => {
      const storedToken = sessionStorage.getItem('meditrack_token');
      if (!storedToken) {
        setIsAuthLoading(false);
        if (['dashboard', 'medicines', 'history'].includes(activePage)) {
          setActivePage('login');
        }
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });

        if (response.ok) {
          const result = await response.json();
          setUser(result.data.user);
          setToken(storedToken);
        } else {
          // Token is expired, invalid, or user was deleted
          sessionStorage.removeItem('meditrack_token');
          setToken(null);
          setUser(null);
          setActivePage('login');
        }
      } catch (err) {
        // If server is unreachable during startup validation
        console.warn('Unable to validate token with server:', err.message);
        sessionStorage.removeItem('meditrack_token');
        setToken(null);
        setUser(null);
        setActivePage('login');
      } finally {
        setIsAuthLoading(false);
      }
    };

    validateSession();
  }, []);

  // Navigation guard: Prevent unauthenticated navigation to protected pages
  const handlePageChange = (page) => {
    const isProtected = ['dashboard', 'medicines', 'history'].includes(page);
    if (isProtected && (!token || !user)) {
      setActivePage('login');
    } else {
      setActivePage(page);
    }
  };

  // Auth Handlers
  const handleLoginSuccess = (newToken, newUser) => {
    sessionStorage.setItem('meditrack_token', newToken);
    setToken(newToken);
    setUser(newUser);
    setActivePage('dashboard');
  };

  const handleRegisterSuccess = (newToken, newUser) => {
    sessionStorage.setItem('meditrack_token', newToken);
    setToken(newToken);
    setUser(newUser);
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('meditrack_token');
    setToken(null);
    setUser(null);
    setActivePage('login');
  };

  const isAuthenticated = Boolean(token && user);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar
        activePage={activePage}
        setActivePage={handlePageChange}
        backendStatus={backendStatus}
        user={user}
        onLogout={handleLogout}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Protected Dashboard Route */}
        {activePage === 'dashboard' && (
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            isLoading={isAuthLoading}
            onRedirectToLogin={() => setActivePage('login')}
          >
            <Dashboard
              setActivePage={handlePageChange}
              backendHealth={backendHealth}
              user={user}
            />
          </ProtectedRoute>
        )}

        {/* Protected Medicines Route */}
        {activePage === 'medicines' && (
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            isLoading={isAuthLoading}
            onRedirectToLogin={() => setActivePage('login')}
          >
            <Medicines />
          </ProtectedRoute>
        )}

        {/* Protected History Route */}
        {activePage === 'history' && (
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            isLoading={isAuthLoading}
            onRedirectToLogin={() => setActivePage('login')}
          >
            <MedicationHistory />
          </ProtectedRoute>
        )}

        {/* Public Login Route */}
        {activePage === 'login' && (
          <Login
            onSwitchToRegister={() => setActivePage('register')}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {/* Public Register Route */}
        {activePage === 'register' && (
          <Register
            onSwitchToLogin={() => setActivePage('login')}
            onRegisterSuccess={handleRegisterSuccess}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
