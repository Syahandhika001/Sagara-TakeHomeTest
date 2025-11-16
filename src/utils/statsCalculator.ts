import { User, DashboardStats } from '../types';


export function calculateDashboardStats(users: User[]): DashboardStats {
  const now = new Date();

  //Total employees
  const totalEmployees = users.length;

  //Attendance rate 
  const attendanceRate = Math.floor(Math.random() * 9) + 88;

  //Department count
  const departments = new Set(
    users
      .map(u => u.department)
      .filter(d => d !== undefined && d !== null)
  );
  const departmentCount = departments.size;

  //Average tenure 
  const totalTenure = users.reduce((sum, user) => {
    const createdDate = new Date(user.createdAt);
    const tenureInDays = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
    const tenureInYears = tenureInDays / 365;
    return sum + tenureInYears;
  }, 0);
  
  const averageTenure = users.length > 0 
    ? parseFloat((totalTenure / users.length).toFixed(1))
    : 0;

  return {
    totalEmployees,
    attendanceRate,
    departmentCount,
    averageTenure,
  };
}


export function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}


export function formatPercentage(value: number, decimals: number = 0): string {
  const percent = value < 1 ? value * 100 : value;
  return `${percent.toFixed(decimals)}%`;
}


export function formatTenure(years: number): string {
  if (years >= 1) {
    return `${years.toFixed(1)} years`;
  } else {
    const months = Math.round(years * 12);
    return `${months} months`;
  }
}

//Determine tenure status
export function getTenureInsight(years: number): {
  status: 'excellent' | 'good' | 'concern' | 'critical';
  message: string;
  color: string;
} {
  if (years >= 3) {
    return {
      status: 'excellent',
      message: 'Strong retention',
      color: 'text-green-600'
    };
  } else if (years >= 2) {
    return {
      status: 'good',
      message: 'Healthy retention',
      color: 'text-blue-600'
    };
  } else if (years >= 1) {
    return {
      status: 'concern',
      message: 'Monitor turnover',
      color: 'text-yellow-600'
    };
  } else {
    return {
      status: 'critical',
      message: 'High turnover risk',
      color: 'text-red-600'
    };
  }
}