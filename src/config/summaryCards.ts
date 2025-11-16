import { SummaryCardData } from '../types';


export const summaryCardsConfig: SummaryCardData[] = [
  {
    id: 'total-employees',
    title: 'Total Employees',
    value: 0, 
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
    value: '0%', 
    icon: '✅',
    bgColor: 'bg-green-50',
    iconBgColor: 'bg-green-100',
    textColor: 'text-green-600',
    description: 'Today\'s attendance',
    trend: {
      value: 3,
      isPositive: true,
      label: 'from yesterday'
    }
  },
  {
    id: 'department-count',
    title: 'Departments',
    value: 0, 
    icon: '📊',
    bgColor: 'bg-purple-50',
    iconBgColor: 'bg-purple-100',
    textColor: 'text-purple-600',
    description: 'Active departments',
  },
  {
    id: 'average-tenure',
    title: 'Average Tenure',
    value: '0 years', 
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
];