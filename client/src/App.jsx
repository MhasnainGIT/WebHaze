import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import Home from './pages/Home';
import PremiumNavbar from './components/premium/PremiumNavbar';
import Footer from './components/Footer';
import StructuredData from './components/StructuredData';
import ServicePage from './pages/services/ServicePage';
import WebHosting from './pages/services/WebHosting';
import WebsiteDevelopment from './pages/services/WebsiteDevelopment';
import AppDevelopment from './pages/services/AppDevelopment';
import Contact from './pages/Contact';
import Account from './pages/Account';
import About from './pages/About';
import Pricing from './pages/Pricing';
import CreateWebsite from './pages/CreateWebsite';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import './styles/main.css';
import './styles/design-system.css';
import './styles/black-white.css';
import './styles/liquid-glass.css';
import CookieConsent from './components/CookieConsent';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  
  return null;
};

export default function App() {
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <CurrencyProvider>
            <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
              <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 -z-50" />
              <StructuredData />
              <ScrollToTop />
              <PremiumNavbar />
              <main className="relative z-10">
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services/:slug" element={<ServicePage />} />
                    <Route path="/services/web-hosting" element={<WebHosting />} />
                    <Route path="/services/website-development" element={<WebsiteDevelopment />} />
                    <Route path="/services/app-development" element={<AppDevelopment />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/create-website" element={<CreateWebsite />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <CookieConsent />
              <Toaster 
                position="top-center"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: 'rgba(0, 0, 0, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    borderRadius: '12px',
                    fontSize: '14px',
                    maxWidth: '90vw',
                    margin: '0 auto',
                  },
                  success: {
                    iconTheme: {
                      primary: '#10B981',
                      secondary: 'white',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#EF4444',
                      secondary: 'white',
                    },
                  },
                }}
              />
            </div>
          </CurrencyProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}