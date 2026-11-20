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
import FallingLeavesBackground from './components/FallingLeavesBackground';

const WhatsAppButton = () => {
  const { pathname } = useLocation();
  if (['/admin-nexus', '/dashboard'].some(p => pathname.startsWith(p))) return null;
  return (
    <a
      href="https://wa.me/918919019679"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      style={{ borderRadius: 0 }}
    >
      <svg viewBox="0 0 24 24" fill="white" width="28" height="28"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </a>
  );
};

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
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Portfolio = React.lazy(() => import('./pages/Portfolio'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));

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
                <FallingLeavesBackground />
                <StructuredData />
                <ScrollToTop />
                <PremiumNavbar />
                <main className="relative">
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
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogPost />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </ErrorBoundary>
                </main>
                <Footer />
                <CookieConsent />
                <WhatsAppButton />
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
