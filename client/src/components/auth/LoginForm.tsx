import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocation } from 'wouter';

interface LoginFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export default function LoginForm({ onSuccess, redirectTo = '/account' }: LoginFormProps) {
  const { login } = useAuth();
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const success = await login(formData);
      
      if (success) {
        if (onSuccess) {
          onSuccess();
        } else if (redirectTo) {
          setLocation(redirectTo);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{t('Sign In')}</CardTitle>
        <CardDescription>
          {t('Enter your credentials to access your account')}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t('Email')}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{t('Password')}</Label>
              <a href="#" className="text-sm text-accent hover:underline">
                {t('Forgot Password?')}
              </a>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? t('Signing In...') : t('Sign In')}
          </Button>
          
          <p className="text-center text-sm text-neutral-600">
            {t("Don't have an account?")}{' '}
            <a href="/register" className="text-accent hover:underline font-medium">
              {t('Create Account')}
            </a>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}