import React, { useMemo } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { User } from '../types';
import usersData from '../data/users.json';

export function Reports() {
  const users = usersData as User[];

  // Calculate various statistics
  const stats = useMemo(() => {
    // Role distribution
    const roleStats = {
      Admin: users.filter(u => u.role === 'Admin').length,
      User: users.filter(u => u.role === 'User').length,
      Guest: users.filter(u => u.role === 'Guest').length,
    };

    // Status distribution
    const statusStats = {
      active: users.filter(u => u.status === 'active').length,
      inactive: users.filter(u => u.status === 'inactive').length,
    };

    // Department distribution
    const deptCounts: Record<string, number> = {};
    users.forEach(user => {
      if (user.department) {
        deptCounts[user.department] = (deptCounts[user.department] || 0) + 1;
      }
    });

    // Monthly growth
    const monthlyGrowth: Record<string, number> = {};
    users.forEach(user => {
      const date = new Date(user.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyGrowth[monthKey] = (monthlyGrowth[monthKey] || 0) + 1;
    });

    // Latest month growth
    const sortedMonths = Object.keys(monthlyGrowth).sort();
    const latestMonth = sortedMonths[sortedMonths.length - 1];
    const previousMonth = sortedMonths[sortedMonths.length - 2];
    const latestGrowth = monthlyGrowth[latestMonth] || 0;
    const previousGrowth = monthlyGrowth[previousMonth] || 0;

    // Average tenure calculation
    const now = new Date();
    const tenures = users.map(user => {
      const joinDate = new Date(user.createdAt);
      const years = (now.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
      return years;
    });
    const avgTenure = tenures.reduce((a, b) => a + b, 0) / tenures.length;

    return {
      roleStats,
      statusStats,
      deptCounts,
      latestGrowth,
      previousGrowth,
      avgTenure,
      topDepartments: Object.entries(deptCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5),
    };
  }, [users]);

  const growthPercentage = stats.previousGrowth > 0
    ? ((stats.latestGrowth - stats.previousGrowth) / stats.previousGrowth * 100).toFixed(1)
    : 0;

  return (
    <DashboardLayout>
      <div>
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Reports & Analytics</h1>
          <p className="text-gray-600">
            Comprehensive overview of workforce data and trends
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Employees */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                👥
              </div>
              <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                Total
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-2">{users.length}</h3>
            <p className="text-blue-100 text-sm">Total Employees</p>
          </div>

          {/* Active Rate */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                ✅
              </div>
              <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                Status
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-2">
              {Math.round((stats.statusStats.active / users.length) * 100)}%
            </h3>
            <p className="text-green-100 text-sm">Active Rate</p>
          </div>

          {/* Departments */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                🏢
              </div>
              <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                Units
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-2">
              {Object.keys(stats.deptCounts).length}
            </h3>
            <p className="text-purple-100 text-sm">Total Departments</p>
          </div>

          {/* Average Tenure */}
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                ⏱️
              </div>
              <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                Avg
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-2">
              {stats.avgTenure.toFixed(1)} yrs
            </h3>
            <p className="text-amber-100 text-sm">Average Tenure</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Role Distribution */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              📊 Role Distribution
            </h3>
            <div className="space-y-4">
              {Object.entries(stats.roleStats).map(([role, count]) => {
                const percentage = (count / users.length) * 100;
                return (
                  <div key={role}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{role}</span>
                      <span className="text-sm font-bold text-gray-800">
                        {count} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                          role === 'Admin' ? 'bg-purple-500' :
                          role === 'User' ? 'bg-blue-500' : 'bg-gray-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Status Distribution */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              📈 Status Overview
            </h3>
            <div className="space-y-4">
              {Object.entries(stats.statusStats).map(([status, count]) => {
                const percentage = (count / users.length) * 100;
                return (
                  <div key={status}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {status}
                      </span>
                      <span className="text-sm font-bold text-gray-800">
                        {count} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                          status === 'active' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Departments */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            🏆 Top 5 Departments by Employee Count
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {stats.topDepartments.map(([dept, count], index) => (
              <div
                key={dept}
                className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-amber-600">#{index + 1}</span>
                  <span className="text-xl">🏢</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-1 truncate" title={dept}>
                  {dept}
                </h4>
                <p className="text-2xl font-bold text-amber-600">{count}</p>
                <p className="text-xs text-gray-600">employees</p>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Summary */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            📅 Recent Growth Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* This Month */}
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Latest Month</p>
              <p className="text-4xl font-bold text-blue-600 mb-2">
                {stats.latestGrowth}
              </p>
              <p className="text-xs text-gray-500">new employees</p>
            </div>

            {/* Previous Month */}
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Previous Month</p>
              <p className="text-4xl font-bold text-gray-600 mb-2">
                {stats.previousGrowth}
              </p>
              <p className="text-xs text-gray-500">new employees</p>
            </div>

            {/* Growth Rate */}
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Growth Rate</p>
              <p className={`text-4xl font-bold mb-2 ${
                Number(growthPercentage) >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {Number(growthPercentage) >= 0 ? '+' : ''}{growthPercentage}%
              </p>
              <p className="text-xs text-gray-500">month-over-month</p>
            </div>
          </div>
        </div>

        {/* Export Actions */}
        <div className="mt-8 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg border border-amber-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                📥 Export Reports
              </h3>
              <p className="text-sm text-gray-600">
                Download reports in various formats for further analysis
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => alert('Export to CSV feature coming soon!')}
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm"
              >
                📊 Export CSV
              </button>
              <button
                onClick={() => alert('Export to PDF feature coming soon!')}
                className="px-6 py-3 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors shadow-sm"
              >
                📄 Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}