import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Loader2, UserPlus, MailCheck } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';

const schema = z
  .object({
    email: z.string().email('Enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, {
    path: ['confirm'],
    message: 'Passwords do not match',
  });

type FormValues = z.infer<typeof schema>;

const SignupPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });
    if (error) {
      setSubmitting(false);
      toast.error(error.message);
      return;
    }

    // Best-effort profile creation (a DB trigger may also handle this).
    if (data.session?.user) {
      await supabase
        .from('profiles')
        .upsert(
          { id: data.session.user.id, email: values.email, role: 'admin', status: 'pending' },
          { onConflict: 'id', ignoreDuplicates: true },
        );
      // Sign out so a pending user isn't left in a half-authenticated state.
      await supabase.auth.signOut();
    }

    setSubmitting(false);
    setDone(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        {done ? (
          <div className="text-center">
            <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <MailCheck className="h-5 w-5" />
            </span>
            <h1 className="mt-4 text-xl font-semibold text-gray-900">Account created</h1>
            <p className="mt-2 text-sm text-gray-500">
              Your account is <span className="font-medium text-amber-600">pending admin approval</span>.
              You&apos;ll be able to sign in once an administrator approves it.
            </p>
            <Link
              to="/admin/login"
              className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Back to Sign In
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600 text-white">
                <UserPlus className="h-5 w-5" />
              </span>
              <h1 className="mt-4 text-xl font-semibold text-gray-900">Create an account</h1>
              <p className="mt-1 text-sm text-gray-500">Request access to the Tire CMS</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="you@company.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  {...register('password')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirm" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirm"
                  type="password"
                  autoComplete="new-password"
                  {...register('confirm')}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="••••••••"
                />
                {errors.confirm && <p className="mt-1 text-xs text-red-600">{errors.confirm.message}</p>}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Sign Up
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/admin/login" className="font-medium text-blue-600 hover:text-blue-700">
                Sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
