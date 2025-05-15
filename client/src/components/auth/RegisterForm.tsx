import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useLocation } from 'wouter';

interface RegisterFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export default function RegisterForm({ onSuccess, redirectTo = '/account' }: RegisterFormProps) {
  const { register } = useAuth();
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    
    if (!acceptedTerms) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      const success = await register(formData);
      
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
        <CardTitle>{t('Create Account')}</CardTitle>
        <CardDescription>
          {t('Enter your details to create a new account')}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">{t('First Name')}</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder={t('John')}
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">{t('Last Name')}</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder={t('Doe')}
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
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
            <Label htmlFor="password">{t('Password')}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t('Confirm Password')}</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={8}
            />
          </div>
          
          <div className="flex items-start space-x-2 pt-2">
            <Checkbox 
              id="terms" 
              checked={acceptedTerms}
              onCheckedChange={(checked) => {
                setAcceptedTerms(checked as boolean);
              }}
              required
            />
            <div className="grid gap-1.5 leading-none">
              <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t('I agree to the')}
                <a href="/terms" className="mx-1 text-accent hover:underline">
                  {t('Terms of Service')}
                </a>
                {t('and')}
                <a href="/privacy" className="ml-1 text-accent hover:underline">
                  {t('Privacy Policy')}
                </a>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting || !acceptedTerms}
          >
            {isSubmitting ? t('Creating Account...') : t('Create Account')}
          </Button>
          
          <p className="text-center text-sm text-neutral-600">
            {t('Already have an account?')}{' '}
            <a href="/login" className="text-accent hover:underline font-medium">
              {t('Sign In')}
            </a>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}