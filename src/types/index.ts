//USER
export interface User {
  id: number | string;
  name: string;
  email: string;
  role: "Admin" | "User" | "Guest";
  createdAt: string; 
  department?: string; 
  status?: 'active' | 'inactive';
}

//AUTH
export interface AuthContextType {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
  } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

//Dashboard Stats
export interface DashboardStats {
  totalEmployees: number;           
  attendanceRate: number;           
  departmentCount: number;          
  averageTenure: number;            
}

//Table Filters
export interface TableFilters {
  searchQuery: string;
  selectedRole: 'all' | User['role'];
  selectedDepartment?: 'all' | string; 
}

//Pagination
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

//Sorting
export type SortDirection = 'asc' | 'desc';

export interface TableState {
  searchQuery: string;
  selectedRole: 'all' | User['role'];
  sortColumn: keyof User | null;
  sortDirection: SortDirection;
  currentPage: number;
  itemsPerPage: number;
}

//Summary Card
export interface SummaryCardData {
  id: string;
  title: string;
  value: string | number;
  icon: string;
  bgColor: string;
  iconBgColor: string;
  textColor: string;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
    label: string;
  };
}