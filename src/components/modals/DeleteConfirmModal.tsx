import React from 'react';
import { User } from '../../types';
import { Button } from '../common/Button';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  employee: User | null;
}

export function DeleteConfirmModal({ isOpen, onClose, onConfirm, employee }: DeleteConfirmModalProps) {
  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="bg-red-50 border-b border-red-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-xl font-bold text-red-800">
              Delete Employee
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-4">
            Are you sure you want to delete this employee? This action cannot be undone.
          </p>

          {/* Employee Info */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-700 font-bold text-lg">
                {employee.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{employee.name}</p>
                <p className="text-sm text-gray-600">{employee.email}</p>
              </div>
            </div>
            <div className="flex gap-2 text-sm">
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                {employee.role}
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                {employee.department}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-gray-50 px-6 py-4 flex gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            fullWidth
            className="!bg-red-600 hover:!bg-red-700"
          >
            🗑️ Delete Employee
          </Button>
        </div>
      </div>
    </div>
  );
}