import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User } from '../../types';

interface DepartmentChartProps {
  users: User[];
}

export function DepartmentChart({ users }: DepartmentChartProps) {
  // Transform data untuk chart
  const chartData = useMemo(() => {
    // Count employees by department
    const departmentCounts: Record<string, number> = {};

    users.forEach(user => {
      if (user.department) {
        departmentCounts[user.department] = (departmentCounts[user.department] || 0) + 1;
      }
    });

    // Convert to array format untuk recharts
    return Object.entries(departmentCounts)
      .map(([department, count]) => ({
        department: department.length > 15 ? department.substring(0, 15) + '...' : department,
        fullName: department,
        employees: count,
      }))
      .sort((a, b) => b.employees - a.employees); // Sort descending
  }, [users]);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          📊 Employee Distribution by Department
        </h2>
        <p className="text-sm text-gray-600">
          Total departments: {chartData.length}
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="department" 
            angle={-45}
            textAnchor="end"
            height={80}
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
            formatter={(value: number, name: string, props: any) => [
              `${value} employees`,
              props.payload.fullName
            ]}
          />
          <Legend />
          <Bar 
            dataKey="employees" 
            fill="#F59E0B" 
            name="Employees"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}