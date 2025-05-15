import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from 'wouter';
import RegisterForm from '@/components/auth/RegisterForm';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

export default function RegisterPage() {
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
        <title>{t('Create Account')} | Dr. Abdul PHS</title>
        <meta 
          name="description" 
          content={t('Create an account to enjoy a personalized shopping experience, track orders, and receive exclusive offers.')} 
        />
      </Helmet>
      
      <div className="bg-neutral-50 min-h-[80vh] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">{t('Create a New Account')}</h1>
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
}