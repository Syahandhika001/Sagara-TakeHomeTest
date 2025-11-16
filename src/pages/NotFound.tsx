import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-amber-500">404</h1>
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="secondary"
          >
            ← Go Back
          </Button>
          <Button
            onClick={() => navigate('/dashboard')}
            variant="primary"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}