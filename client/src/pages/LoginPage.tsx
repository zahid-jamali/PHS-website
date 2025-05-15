import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from 'wouter';
import LoginForm from '@/components/auth/LoginForm';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

export default function LoginPage() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setLocation('/account');
    }
  }, [isAuthenticated, setLocation]);
  
  return (
    <>
      <Helmet>
        <title>{t('Sign In')} | Dr. Abdul PHS</title>
        <meta 
          name="description" 
          content={t('Sign in to your account to manage orders, update your information, and more.')} 
        />
      </Helmet>
      
      <div className="bg-neutral-50 min-h-[80vh] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">{t('Sign In to Your Account')}</h1>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}