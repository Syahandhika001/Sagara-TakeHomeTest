import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { EmployeeTable } from '../components/tables/EmployeeTable';
import { useEmployees } from '../context/EmployeeContext';

export function Employees() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployees();

  return (
    <DashboardLayout>
      <div>
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Employee Management</h1>
          <p className="text-gray-600">
            Manage and monitor all employees in your organization
          </p>
        </div>

        {/* Employee Table with CRUD */}
        <EmployeeTable
          users={employees}
          onAdd={addEmployee}
          onEdit={updateEmployee}
          onDelete={deleteEmployee}
        />
      </div>
    </DashboardLayout>
  );
}