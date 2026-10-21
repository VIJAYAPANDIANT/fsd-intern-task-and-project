import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Medicines from './pages/Medicines';
import MedicationHistory from './pages/MedicationHistory';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [backendHealth, setBackendHealth] = useState(null);
  const [backendStatus, setBackendStatus] = useState('checking');

  // Verify REST API communication with the backend
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
        // Backend might not be running yet when testing frontend in isolation
        setBackendStatus('offline');
      }
    };

    checkApiHealth();
    // Re-check every 30 seconds
    const interval = setInterval(checkApiHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        backendStatus={backendStatus}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activePage === 'dashboard' && (
          <Dashboard
            setActivePage={setActivePage}
            backendHealth={backendHealth}
          />
        )}
        {activePage === 'medicines' && <Medicines />}
        {activePage === 'history' && <MedicationHistory />}
        {activePage === 'login' && (
          <Login onSwitchToRegister={() => setActivePage('register')} />
        )}
        {activePage === 'register' && (
          <Register onSwitchToLogin={() => setActivePage('login')} />
        )}
      </main>

      <Footer />
    </div>
  );
}
