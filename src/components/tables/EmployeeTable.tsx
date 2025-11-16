import React, { useState } from 'react';
import { User } from '../../types';
import { useTable } from '../../hooks/useTable';
import { EmployeeModal } from '../modals/EmployeeModal';
import { DeleteConfirmModal } from '../modals/DeleteConfirmModal';

interface EmployeeTableProps {
  users: User[];
  onAdd: (employee: Omit<User, 'id' | 'createdAt'>) => void;
  onEdit: (id: number | string, employee: Partial<User>) => void; // ← Fix type
  onDelete: (id: number | string) => void; // ← Fix type
}

export function EmployeeTable({ users, onAdd, onEdit, onDelete }: EmployeeTableProps) {
  const {
    data,
    filteredCount,
    totalCount,
    currentPage,
    totalPages,
    itemsPerPage,
    hasNextPage,
    hasPreviousPage,
    searchQuery,
    selectedRole,
    sortColumn,
    sortDirection,
    handleSearch,
    handleRoleFilter,
    handleSort,
    goToPage,
    nextPage,
    previousPage,
    resetFilters,
  } = useTable(users, 10);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null);

  // Handlers
  const handleAddClick = () => {
    setModalMode('create');
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (employee: User) => {
    setModalMode('edit');
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (employee: User) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const handleSave = (employeeData: Omit<User, 'id' | 'createdAt'>) => {
    if (modalMode === 'create') {
      onAdd(employeeData);
    } else if (selectedEmployee) {
      onEdit(selectedEmployee.id, employeeData);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedEmployee) {
      onDelete(selectedEmployee.id);
    }
  };

  // Helper: Get sort icon
  const getSortIcon = (column: keyof User) => {
    if (sortColumn !== column) {
      return <span className="text-gray-400">⇅</span>;
    }
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  // Calculate showing range
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, filteredCount);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Employee Management</h2>
              <p className="text-sm text-gray-600 mt-1">
                Total {totalCount} employees in database
              </p>
            </div>
            <button
              onClick={handleAddClick}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
            >
              <span className="text-lg">➕</span>
              Add Employee
            </button>
          </div>

          {/* Search & Filter Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Role Filter */}
            <div className="sm:w-48">
              <select
                value={selectedRole}
                onChange={(e) => handleRoleFilter(e.target.value as 'all' | User['role'])}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Guest">Guest</option>
              </select>
            </div>

            {/* Reset Button */}
            {(searchQuery || selectedRole !== 'all') && (
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Reset
              </button>
            )}
          </div>

          {/* Results Info */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <p>
              {filteredCount > 0 ? (
                <>
                  Showing <span className="font-semibold text-gray-800">{startIndex}-{endIndex}</span> of{' '}
                  <span className="font-semibold text-gray-800">{filteredCount}</span> results
                  {filteredCount !== totalCount && (
                    <span className="text-gray-500"> (filtered from {totalCount} total)</span>
                  )}
                </>
              ) : (
                <span className="text-red-600">No results found</span>
              )}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {/* Name Column */}
                  <th
                    className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-2">
                      <span>Name</span>
                      <span className="text-base">{getSortIcon('name')}</span>
                    </div>
                  </th>

                  {/* Email Column */}
                  <th
                    className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('email')}
                  >
                    <div className="flex items-center gap-2">
                      <span>Email</span>
                      <span className="text-base">{getSortIcon('email')}</span>
                    </div>
                  </th>

                  {/* Role Column */}
                  <th
                    className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('role')}
                  >
                    <div className="flex items-center gap-2">
                      <span>Role</span>
                      <span className="text-base">{getSortIcon('role')}</span>
                    </div>
                  </th>

                  {/* Department Column */}
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                    Department
                  </th>

                  {/* Created Date Column */}
                  <th
                    className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('createdAt')}
                  >
                    <div className="flex items-center gap-2">
                      <span>Joined Date</span>
                      <span className="text-base">{getSortIcon('createdAt')}</span>
                    </div>
                  </th>

                  {/* Status Column */}
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                    Status
                  </th>

                  {/* Actions Column */}
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {data.length === 0 ? (
                  // Empty State
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="text-6xl">🔍</div>
                        <p className="text-lg font-medium text-gray-800">No employees found</p>
                        <p className="text-sm text-gray-500">
                          Try adjusting your search or filter criteria
                        </p>
                        {(searchQuery || selectedRole !== 'all') && (
                          <button
                            onClick={resetFilters}
                            className="mt-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors"
                          >
                            Clear Filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  // Data Rows
                  data.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      {/* Name */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-semibold">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-gray-800">
                            {user.name}
                          </span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {user.email}
                      </td>

                      {/* Role */}
                      <td className="px-4 py-3">
                        <span
                          className={`
                            inline-flex px-2 py-1 text-xs font-medium rounded-full
                            ${user.role === 'Admin' ? 'bg-purple-100 text-purple-700' : ''}
                            ${user.role === 'User' ? 'bg-blue-100 text-blue-700' : ''}
                            ${user.role === 'Guest' ? 'bg-gray-100 text-gray-700' : ''}
                          `}
                        >
                          {user.role}
                        </span>
                      </td>

                      {/* Department */}
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {user.department || '-'}
                      </td>

                      {/* Created Date */}
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {formatDate(user.createdAt)}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <span
                          className={`
                            inline-flex px-2 py-1 text-xs font-medium rounded-full
                            ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                          `}
                        >
                          {user.status === 'active' ? '● Active' : '● Inactive'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEditClick(user)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteClick(user)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {filteredCount > 0 && (
          <div className="mt-6 flex items-center justify-between">
            {/* Page Info */}
            <div className="text-sm text-gray-600">
              Page <span className="font-semibold text-gray-800">{currentPage}</span> of{' '}
              <span className="font-semibold text-gray-800">{totalPages}</span>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={previousPage}
                disabled={!hasPreviousPage}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-colors
                  ${hasPreviousPage
                    ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                ← Previous
              </button>

              {/* Page Numbers */}
              <div className="hidden sm:flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const showPage =
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 1;

                  const showEllipsis =
                    (page === 2 && currentPage > 3) ||
                    (page === totalPages - 1 && currentPage < totalPages - 2);

                  if (showEllipsis) {
                    return (
                      <span key={page} className="px-2 text-gray-400">
                        ...
                      </span>
                    );
                  }

                  if (!showPage) {
                    return null;
                  }

                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`
                        px-3 py-2 rounded-lg font-medium transition-colors
                        ${page === currentPage
                          ? 'bg-amber-500 text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={nextPage}
                disabled={!hasNextPage}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-colors
                  ${hasNextPage
                    ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        employee={selectedEmployee || undefined}
        mode={modalMode}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        employee={selectedEmployee}
      />
    </>
  );
}