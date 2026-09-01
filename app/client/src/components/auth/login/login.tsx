import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/hooks/useAuth';
import { api } from '@/lib/api-client';
import type { ApiError } from '@/lib/api-client/api-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import {
  loginFormSchema,
  type LoginFormValues,
} from '@watchparty/shared/schemas';
import type { User } from '@watchparty/shared/types';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(loginFormSchema),
  });

  const navigate = useNavigate();
  const authStore = useAuthStore();

  const onSubmit = (data: LoginFormValues) => {
    toast.promise(() => login(data), {
      loading: 'Logging in...',
      success: 'Logged in successfully',
      error: (err: ApiError) => {
        if (err.status === 401 || err.status === 404) {
          return err.data?.message;
        }
        return 'Something went wrong';
      },
    });
  };

  const login = async (data: LoginFormValues) => {
    await api.post('/auth/login', data);
    const user = await api.get<User>('/auth/verify');
    authStore.setUser(user);
    navigate({ to: '/home' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          placeholder=""
          {...register('username')}
        />
        {errors.username && (
          <p className="text-destructive">{errors.username.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder=""
          {...register('password')}
        />
        {errors.password && (
          <p className="text-destructive">{errors.password.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full cursor-pointer">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
