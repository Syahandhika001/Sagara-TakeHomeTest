import React, { useMemo } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { SummaryCard } from '../components/common/SummaryCard';
import { DepartmentChart } from '../components/charts/DepartmentChart';
import { GrowthChart } from '../components/charts/GrowthChart';
import { SummaryCardData, User } from '../types';
import { calculateDashboardStats, formatTenure, formatPercentage } from '../utils/statsCalculator';
import usersData from '../data/users.json';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const navigate = useNavigate();
  const users = usersData as User[];
  const stats = useMemo(() => calculateDashboardStats(users), [users]);

  const summaryCards: SummaryCardData[] = useMemo(() => [
    {
      id: 'total-employees',
      title: 'Total Employees',
      value: stats.totalEmployees,
      icon: '👥',
      bgColor: 'bg-blue-50',
      iconBgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      description: 'Active workforce',
      trend: {
        value: 5,
        isPositive: true,
        label: 'from last month'
      }
    },
    {
      id: 'attendance-rate',
      title: 'Attendance Rate',
      value: formatPercentage(stats.attendanceRate),
      icon: '✅',
      bgColor: 'bg-green-50',
      iconBgColor: 'bg-green-100',
      textColor: 'text-green-600',
      description: "Today's attendance",
      trend: {
        value: 3,
        isPositive: true,
        label: 'from yesterday'
      }
    },
    {
      id: 'department-count',
      title: 'Departments',
      value: stats.departmentCount,
      icon: '📊',
      bgColor: 'bg-purple-50',
      iconBgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
      description: 'Active departments',
    },
    {
      id: 'average-tenure',
      title: 'Average Tenure',
      value: formatTenure(stats.averageTenure),
      icon: '⏱️',
      bgColor: 'bg-amber-50',
      iconBgColor: 'bg-amber-100',
      textColor: 'text-amber-600',
      description: 'Employee retention',
      trend: {
        value: 0.5,
        isPositive: true,
        label: 'year increase'
      }
    }
  ], [stats]);

  return (
    <DashboardLayout>
      <div>
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
          <p className="text-gray-600">Monitor your workforce statistics and performance</p>
        </div>

        {/* Summary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {summaryCards.map((card) => (
            <SummaryCard key={card.id} data={card} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DepartmentChart users={users} />
          <GrowthChart users={users} />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Action Card 1 */}
          <button
            onClick={() => navigate('/employees')}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:border-amber-500 text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                📋
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  View All Employees
                </h3>
                <p className="text-sm text-gray-600">
                  Manage {users.length} employees
                </p>
              </div>
            </div>
          </button>

          {/* Quick Action Card 2 */}
          <button
            onClick={() => navigate('/departments')}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:border-amber-500 text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                🏢
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  View Departments
                </h3>
                <p className="text-sm text-gray-600">
                  {stats.departmentCount} active departments
                </p>
              </div>
            </div>
          </button>

          {/* Quick Action Card 3 */}
          <button
            onClick={() => navigate('/reports')}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:border-amber-500 text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                📈
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  View Reports
                </h3>
                <p className="text-sm text-gray-600">
                  Analytics & insights
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Recent Activity Preview */}
        <div className="mt-8 bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
            <button
              onClick={() => navigate('/employees')}
              className="text-sm text-amber-600 hover:text-amber-700 font-medium"
            >
              View All →
            </button>
          </div>
          
          <div className="space-y-3">
            {users.slice(0, 3).map((user) => (
              <div key={user.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.department} • {user.role}</p>
                </div>
                <span className={`
                  text-xs px-2 py-1 rounded-full
                  ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}
                `}>
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}