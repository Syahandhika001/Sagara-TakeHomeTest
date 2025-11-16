import React, { useMemo } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { User } from '../types';
import usersData from '../data/users.json';

export function Departments() {
  const users = usersData as User[];

  // Group users by department
  const departmentData = useMemo(() => {
    const departments: Record<string, User[]> = {};

    users.forEach(user => {
      if (user.department) {
        if (!departments[user.department]) {
          departments[user.department] = [];
        }
        departments[user.department].push(user);
      }
    });

    return Object.entries(departments)
      .map(([name, employees]) => ({
        name,
        employees,
        count: employees.length,
        activeCount: employees.filter(e => e.status === 'active').length,
      }))
      .sort((a, b) => b.count - a.count);
  }, [users]);

  return (
    <DashboardLayout>
      <div>
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Departments</h1>
          <p className="text-gray-600">
            Overview of all departments and their employees
          </p>
        </div>

        {/* Department Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🏢</span>
              <h3 className="text-lg font-semibold text-gray-800">Total Departments</h3>
            </div>
            <p className="text-4xl font-bold text-blue-600">{departmentData.length}</p>
          </div>

          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">👥</span>
              <h3 className="text-lg font-semibold text-gray-800">Total Employees</h3>
            </div>
            <p className="text-4xl font-bold text-green-600">{users.length}</p>
          </div>

          <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">📊</span>
              <h3 className="text-lg font-semibold text-gray-800">Avg per Department</h3>
            </div>
            <p className="text-4xl font-bold text-purple-600">
              {Math.round(users.length / departmentData.length)}
            </p>
          </div>
        </div>

        {/* Department List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {departmentData.map((dept) => (
            <div
              key={dept.name}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              {/* Department Header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {dept.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {dept.count} {dept.count === 1 ? 'employee' : 'employees'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-amber-600">{dept.count}</div>
                  <div className="text-xs text-gray-500">Total</div>
                </div>
              </div>

              {/* Department Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Active</p>
                  <p className="text-xl font-bold text-green-600">{dept.activeCount}</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Inactive</p>
                  <p className="text-xl font-bold text-red-600">
                    {dept.count - dept.activeCount}
                  </p>
                </div>
              </div>

              {/* Employee Preview */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Team Members:</p>
                <div className="flex flex-wrap gap-2">
                  {dept.employees.slice(0, 5).map((employee) => (
                    <div
                      key={employee.id}
                      className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2"
                      title={employee.email}
                    >
                      <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 text-xs font-semibold">
                        {employee.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm text-gray-700">{employee.name}</span>
                    </div>
                  ))}
                  {dept.employees.length > 5 && (
                    <div className="flex items-center px-3 py-2 text-sm text-gray-500">
                      +{dept.employees.length - 5} more
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}