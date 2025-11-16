import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import usersDataJson from '../data/users.json';

interface EmployeeContextType {
  employees: User[];
  addEmployee: (employee: Omit<User, 'id' | 'createdAt'>) => void;
  updateEmployee: (id: number | string, employee: Partial<User>) => void;
  deleteEmployee: (id: number | string) => void;
  getEmployeeById: (id: number | string) => User | undefined;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export function EmployeeProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage or use default data
  const [employees, setEmployees] = useState<User[]>(() => {
    const stored = localStorage.getItem('employees');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return usersDataJson as User[];
      }
    }
    return usersDataJson as User[];
  });

  // Persist to localStorage whenever employees change
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  // CREATE
  const addEmployee = (employeeData: Omit<User, 'id' | 'createdAt'>) => {
    const newEmployee: User = {
      ...employeeData,
      id: `emp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    setEmployees(prev => [...prev, newEmployee]);
  };

  // UPDATE
  const updateEmployee = (id: number | string, employeeData: Partial<User>) => {
    setEmployees(prev =>
      prev.map(emp => (emp.id === id ? { ...emp, ...employeeData } : emp))
    );
  };

  // DELETE
  const deleteEmployee = (id: number | string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  // READ single employee
  const getEmployeeById = (id: number | string) => {
    return employees.find(emp => emp.id === id);
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        getEmployeeById,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployees() {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within EmployeeProvider');
  }
  return context;
}