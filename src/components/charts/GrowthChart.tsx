import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User } from '../../types';

interface GrowthChartProps {
  users: User[];
}

export function GrowthChart({ users }: GrowthChartProps) {
  // Transform data: cumulative employee count by month
  const chartData = useMemo(() => {
    // Sort users by createdAt
    const sortedUsers = [...users].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    // Group by month
    const monthlyData: Record<string, number> = {};
    let cumulativeCount = 0;

    sortedUsers.forEach(user => {
      const date = new Date(user.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      cumulativeCount++;
      monthlyData[monthKey] = cumulativeCount;
    });

    // Convert to array for chart
    return Object.entries(monthlyData).map(([month, count]) => {
      const [year, monthNum] = month.split('-');
      const monthName = new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleDateString('en-US', { 
        month: 'short',
        year: 'numeric'
      });

      return {
        month: monthName,
        employees: count,
      };
    });
  }, [users]);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          📈 Employee Growth Over Time
        </h2>
        <p className="text-sm text-gray-600">
          Cumulative employee count from {chartData[0]?.month} to {chartData[chartData.length - 1]?.month}
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            style={{ fontSize: '12px' }}
          />
          <YAxis />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px'
            }}
            formatter={(value: number) => [`${value} employees`, 'Total']}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="employees" 
            stroke="#3B82F6" 
            strokeWidth={2}
            dot={{ fill: '#3B82F6', r: 4 }}
            activeDot={{ r: 6 }}
            name="Total Employees"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}