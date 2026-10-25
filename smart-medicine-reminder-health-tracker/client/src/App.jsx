import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Medicines from './pages/Medicines';
import MedicationHistory from './pages/MedicationHistory';
import Login from './pages/Login';
import Register from './pages/Register';
import { checkHealth, getMe } from './services/authService';
import { getAuthToken, setAuthToken, clearAuthToken } from './services/apiClient';

export default function App() {
  const initialToken = getAuthToken();
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(Boolean(initialToken));
  const [activePage, setActivePage] = useState('home');
  const [backendHealth, setBackendHealth] = useState(null);
  const [backendStatus, setBackendStatus] = useState('checking');

  // Verify backend API health
  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const data = await checkHealth();
        setBackendHealth(data);
        setBackendStatus('online');
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
      const storedToken = getAuthToken();
      if (!storedToken) {
        setIsAuthLoading(false);
        if (['dashboard', 'medicines', 'history'].includes(activePage)) {
          setActivePage('login');
        }
        return;
      }

      try {
        const data = await getMe();
        if (data?.user) {
          setUser(data.user);
          setToken(storedToken);
        } else {
          clearAuthToken();
          setToken(null);
          setUser(null);
          setActivePage('login');
        }
      } catch (err) {
        // If server is unreachable or token is invalid/expired
        console.warn('Unable to validate token with server:', err.message);
        clearAuthToken();
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
    setAuthToken(newToken);
    setToken(newToken);
    setUser(newUser);
    setActivePage('dashboard');
  };

  const handleRegisterSuccess = (newToken, newUser) => {
    setAuthToken(newToken);
    setToken(newToken);
    setUser(newUser);
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    clearAuthToken();
    setToken(null);
    setUser(null);
    setActivePage('home');
  };

  // Listen for global auth expiration events from API client
  useEffect(() => {
    const handleAuthExpired = () => {
      handleLogout();
    };
    window.addEventListener('meditrack:auth-expired', handleAuthExpired);
    return () => window.removeEventListener('meditrack:auth-expired', handleAuthExpired);
  }, []);

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
        {/* Public Home Route (Default) */}
        {activePage === 'home' && (
          <Home
            setActivePage={handlePageChange}
            user={user}
            backendStatus={backendStatus}
          />
        )}

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
