import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import ErrorBoundary from './components/ErrorBoundary';
import PremiumNavbar from './components/premium/PremiumNavbar';
import Footer from './components/Footer';
import StructuredData from './components/StructuredData';
import CookieConsent from './components/CookieConsent';
import SmoothScroll from './components/SmoothScroll';

const Home = React.lazy(() => import('./pages/Home'));
const ServicePage = React.lazy(() => import('./pages/services/ServicePage'));
const WebHosting = React.lazy(() => import('./pages/services/WebHosting'));
const WebsiteDevelopment = React.lazy(() => import('./pages/services/WebsiteDevelopment'));
const AppDevelopment = React.lazy(() => import('./pages/services/AppDevelopment'));
const CloudServers = React.lazy(() => import('./pages/services/CloudServers'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Account = React.lazy(() => import('./pages/Account'));
const About = React.lazy(() => import('./pages/About'));
const Pricing = React.lazy(() => import('./pages/Pricing'));
const CreateWebsite = React.lazy(() => import('./pages/CreateWebsite'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const AdminNexus = React.lazy(() => import('./pages/AdminNexus'));
const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./pages/ResetPassword'));
const AuthCallback = React.lazy(() => import('./pages/AuthCallback'));
const Careers = React.lazy(() => import('./pages/Careers'));
const JobDetail = React.lazy(() => import('./pages/JobDetail'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const Terms = React.lazy(() => import('./pages/Terms'));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-black">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
  </div>
);

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <CurrencyProvider>
            <SmoothScroll>
              <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
                <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 -z-50" />
                <StructuredData />
                <ScrollToTop />
                <PremiumNavbar />
                <main className="relative z-10">
                  <ErrorBoundary>
                    <Suspense fallback={<LoadingSpinner />}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/services/:slug" element={<ServicePage />} />
                        <Route path="/services/web-hosting" element={<WebHosting />} />
                        <Route path="/services/website-development" element={<WebsiteDevelopment />} />
                        <Route path="/services/app-development" element={<AppDevelopment />} />
                        <Route path="/services/cloud-servers" element={<CloudServers />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/admin-nexus" element={<AdminNexus />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/create-website" element={<CreateWebsite />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password/:token" element={<ResetPassword />} />
                        <Route path="/auth/callback" element={<AuthCallback />} />
                        <Route path="/careers" element={<Careers />} />
                        <Route path="/careers/:slug" element={<JobDetail />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                      </Routes>
                    </Suspense>
                  </ErrorBoundary>
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
            </SmoothScroll>
          </CurrencyProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}
