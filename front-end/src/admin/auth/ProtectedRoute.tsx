import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2, Clock } from 'lucide-react';
import { useAuth } from './AuthProvider';

const FullScreen = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-500">
    {children}
  </div>
);

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { session, status, loading, signOut } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <FullScreen>
        <Loader2 className="h-6 w-6 animate-spin" />
      </FullScreen>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  if (status === 'pending') {
    return (
      <FullScreen>
        <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-8 text-center">
          <Clock className="mx-auto h-10 w-10 text-amber-500" />
          <h1 className="mt-4 text-lg font-semibold text-gray-900">Awaiting approval</h1>
          <p className="mt-2 text-sm text-gray-500">
            Your account has been created and is pending admin approval. You&apos;ll get access once an
            administrator approves it.
          </p>
          <button
            type="button"
            onClick={signOut}
            className="mt-6 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Sign out
          </button>
        </div>
      </FullScreen>
    );
  }

  // Any approved (or legacy, status-less) user has full admin access.
  return <>{children}</>;
};
