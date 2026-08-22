import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  signupFormSchema,
  type SignupFormValues,
} from '@watchparty/shared/schemas';
import type { User } from '@watchparty/shared/types';
import { api } from '@/lib/api-client';

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(signupFormSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    const { confirmPassword: _, ...reqBody } = data;
    try {
      // TODO: Add toasts
      const newUser = await api.post<User>('/user', reqBody);
      console.log(newUser);
    } catch (error) {
      console.error(error);
    }
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
          <Label className="text-destructive">{errors.username.message}</Label>
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
          <Label className="text-destructive">{errors.password.message}</Label>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder=""
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <Label className="text-destructive">
            {errors.confirmPassword.message}
          </Label>
        )}
      </div>
      <Button type="submit" className="w-full cursor-pointer">
        Sign Up
      </Button>
    </form>
  );
};

export default SignupForm;
