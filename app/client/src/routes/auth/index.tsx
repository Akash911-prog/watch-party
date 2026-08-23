import AuthCard from '@/components/auth/auth-card';
import LoginForm from '@/components/auth/login';
import SignupForm from '@/components/auth/signup';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/auth/')({
  beforeLoad: ({ context }) => {
    console.log(context);
    if (context.isAuthenticated) throw Route.redirect({ to: '/' });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative w-full max-w-sm mx-auto top-1/2 translate-y-1/2 perspective-distant">
      <div
        className="relative w-full transition-transform duration-500 transform-3d"
        style={{ transform: isLogin ? 'rotateY(0deg)' : 'rotateY(180deg)' }}
      >
        {/* Front — Login */}
        <div className="backface-hidden">
          <AuthCard
            title="Login"
            description="Enter your username below to login to your account"
            footer={
              <span>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="underline underline-offset-4 cursor-pointer"
                >
                  Sign up
                </button>
              </span>
            }
          >
            <LoginForm />
          </AuthCard>
        </div>

        {/* Back — Signup */}
        <div className="absolute inset-0 backface-hidden transform-[rotateY(180deg)]">
          <AuthCard
            title="Sign Up"
            description="Enter a username and password to create your account"
            footer={
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="underline underline-offset-4 cursor-pointer"
                >
                  Login
                </button>
              </span>
            }
          >
            <SignupForm />
          </AuthCard>
        </div>
      </div>
    </div>
  );
}
