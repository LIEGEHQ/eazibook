import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { Login } from './dashboard/auth/Login';
import { Signup } from './dashboard/auth/Signup';
import { DashboardApp } from './dashboard/DashboardApp';
import { Toaster } from './components/ui/sonner';
import { AuthProvider, useAuth } from './utils/AuthContext';

function MainApp() {
  const [authView, setAuthView] = useState<'login' | 'signup' | null>(null);
  const { user, isLoading } = useAuth();

  useEffect(() => {
    document.title = 'EaziBook - Smart Business Management';
  }, []);

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl mb-2">EaziBook</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated, show dashboard
  if (user) {
    return <DashboardApp />;
  }

  // If user clicked to sign up, show signup
  if (authView === 'signup') {
    return <Signup onSwitchToLogin={() => setAuthView('login')} />;
  }

  // If user clicked to login, show login
  if (authView === 'login') {
    return <Login onSwitchToSignup={() => setAuthView('signup')} />;
  }

  // Otherwise show landing page
  return <LandingPage onGetStarted={() => setAuthView('signup')} />;
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
      <Toaster />
    </AuthProvider>
  );
}