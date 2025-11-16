import React, { useMemo } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useEmployees } from '../context/EmployeeContext';

export function Reports() {
  const { employees } = useEmployees();

  // Calculate statistics
  const stats = useMemo(() => {
    const total = employees.length;
    const active = employees.filter(e => e.status === 'active').length;
    const inactive = employees.filter(e => e.status === 'inactive').length;

    const adminCount = employees.filter(e => e.role === 'Admin').length;
    const userCount = employees.filter(e => e.role === 'User').length;
    const guestCount = employees.filter(e => e.role === 'Guest').length;

    // Department statistics
    const deptMap = new Map<string, number>();
    employees.forEach(emp => {
      if (emp.department) {
        deptMap.set(emp.department, (deptMap.get(emp.department) || 0) + 1);
      }
    });

    const topDepartments = Array.from(deptMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    // Growth calculation (mock data for demo)
    const currentMonth = new Date().getMonth();
    const growthRate = 8.5; // Mock growth rate

    // Average tenure calculation
    const now = new Date();
    const avgTenureMonths = employees.reduce((acc, emp) => {
      const created = new Date(emp.createdAt);
      const months = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24 * 30);
      return acc + months;
    }, 0) / employees.length;

    return {
      total,
      active,
      inactive,
      activePercentage: total > 0 ? ((active / total) * 100).toFixed(1) : '0',
      inactivePercentage: total > 0 ? ((inactive / total) * 100).toFixed(1) : '0',
      adminCount,
      userCount,
      guestCount,
      adminPercentage: total > 0 ? ((adminCount / total) * 100).toFixed(1) : '0',
      userPercentage: total > 0 ? ((userCount / total) * 100).toFixed(1) : '0',
      guestPercentage: total > 0 ? ((guestCount / total) * 100).toFixed(1) : '0',
      topDepartments,
      growthRate: growthRate.toFixed(1),
      avgTenure: avgTenureMonths.toFixed(1),
    };
  }, [employees]);

  return (
    <DashboardLayout>
      <div>
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Reports & Analytics</h1>
          <p className="text-gray-600">
            Comprehensive insights into your workforce data and trends
          </p>
        </div>

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Employees */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">👥</span>
              <span className="text-sm bg-white/20 px-2 py-1 rounded-full">Total</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.total}</h3>
            <p className="text-blue-100 text-sm">Total Employees</p>
          </div>

          {/* Active Employees */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">✅</span>
              <span className="text-sm bg-white/20 px-2 py-1 rounded-full">{stats.activePercentage}%</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.active}</h3>
            <p className="text-green-100 text-sm">Active Employees</p>
          </div>

          {/* Inactive Employees */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">❌</span>
              <span className="text-sm bg-white/20 px-2 py-1 rounded-full">{stats.inactivePercentage}%</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.inactive}</h3>
            <p className="text-red-100 text-sm">Inactive Employees</p>
          </div>

          {/* Growth Rate */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">📈</span>
              <span className="text-sm bg-white/20 px-2 py-1 rounded-full">Monthly</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">+{stats.growthRate}%</h3>
            <p className="text-purple-100 text-sm">Growth Rate</p>
          </div>
        </div>

        {/* Role Distribution */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Role Distribution</h2>
          
          <div className="space-y-4">
            {/* Admin */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">👑</span>
                  <span className="text-sm font-medium text-gray-700">Admin</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{stats.adminCount}</span>
                  <span className="text-xs text-gray-500">({stats.adminPercentage}%)</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-purple-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${stats.adminPercentage}%` }}
                />
              </div>
            </div>

            {/* User */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">👤</span>
                  <span className="text-sm font-medium text-gray-700">User</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{stats.userCount}</span>
                  <span className="text-xs text-gray-500">({stats.userPercentage}%)</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${stats.userPercentage}%` }}
                />
              </div>
            </div>

            {/* Guest */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">👥</span>
                  <span className="text-sm font-medium text-gray-700">Guest</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{stats.guestCount}</span>
                  <span className="text-xs text-gray-500">({stats.guestPercentage}%)</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gray-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${stats.guestPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Status Overview */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Status Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Active */}
            <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-medium text-gray-800">Active</span>
                </div>
                <span className="text-2xl font-bold text-green-600">{stats.active}</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${stats.activePercentage}%` }}
                />
              </div>
              <p className="text-xs text-green-700 mt-2">{stats.activePercentage}% of total employees</p>
            </div>

            {/* Inactive */}
            <div className="bg-red-50 rounded-lg p-4 border-2 border-red-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="font-medium text-gray-800">Inactive</span>
                </div>
                <span className="text-2xl font-bold text-red-600">{stats.inactive}</span>
              </div>
              <div className="w-full bg-red-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${stats.inactivePercentage}%` }}
                />
              </div>
              <p className="text-xs text-red-700 mt-2">{stats.inactivePercentage}% of total employees</p>
            </div>
          </div>
        </div>

        {/* Top Departments */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Top 5 Departments</h2>
          
          {stats.topDepartments.length > 0 ? (
            <div className="space-y-4">
              {stats.topDepartments.map((dept, index) => {
                const percentage = ((dept.count / stats.total) * 100).toFixed(1);
                const colors = [
                  'bg-amber-500',
                  'bg-blue-500',
                  'bg-green-500',
                  'bg-purple-500',
                  'bg-pink-500'
                ];
                
                return (
                  <div key={dept.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
                        <span className="text-sm font-medium text-gray-700">{dept.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-800">{dept.count}</span>
                        <span className="text-xs text-gray-500">({percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`${colors[index]} h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No department data available</p>
            </div>
          )}
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Average Tenure */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-2xl">
                ⏱️
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Average Tenure</h3>
                <p className="text-sm text-gray-600">Employee retention</p>
              </div>
            </div>
            <div className="text-center py-4">
              <p className="text-4xl font-bold text-amber-600">{stats.avgTenure}</p>
              <p className="text-sm text-gray-600 mt-1">months average</p>
            </div>
          </div>

          {/* Growth Trend */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
                📈
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Growth Rate</h3>
                <p className="text-sm text-gray-600">Monthly increase</p>
              </div>
            </div>
            <div className="text-center py-4">
              <p className="text-4xl font-bold text-green-600">+{stats.growthRate}%</p>
              <p className="text-sm text-gray-600 mt-1">this month</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}