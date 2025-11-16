import { useState, useMemo, useCallback } from 'react';
import { User } from '../types';


interface UseTableReturn {
  // Data yang sudah diproses
  data: User[];
  filteredCount: number;
  totalCount: number;
  
  // Pagination state
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  
  // Search & Filter state
  searchQuery: string;
  selectedRole: 'all' | User['role'];
  
  // Sort state
  sortColumn: keyof User | null;
  sortDirection: 'asc' | 'desc';
  
  // Functions
  handleSearch: (query: string) => void;
  handleRoleFilter: (role: 'all' | User['role']) => void;
  handleSort: (column: keyof User) => void;
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  resetFilters: () => void;
}

// Custom hook untuk mengelola tabel dengan fitur search, filter, sort, dan pagination
export function useTable(
  initialData: User[],
  itemsPerPage: number = 10
): UseTableReturn {
  
  // state untuk search, filter, sort, dan pagination
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<'all' | User['role']>('all');
  const [sortColumn, setSortColumn] = useState<keyof User | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // filteredData, sortedData, paginatedData akan dihitung ulang hanya jika dependencies berubah
  // useMemo = cache hasil, hanya re-calculate jika dependency berubah
  const filteredData = useMemo(() => {
    let result = initialData;

    // Filter by search query (name OR email)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
    }

    // Filter by role
    if (selectedRole !== 'all') {
      result = result.filter((user) => user.role === selectedRole);
    }

    return result;
  }, [initialData, searchQuery, selectedRole]);

  // sortData berdasarkan sortColumn dan sortDirection
  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      // Handle string comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortDirection === 'asc' ? comparison : -comparison;
      }

      // Handle number comparison
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // Handle date comparison
      if (sortColumn === 'createdAt') {
        const dateA = new Date(aValue as string).getTime();
        const dateB = new Date(bValue as string).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }

      return 0;
    });

    return sorted;
  }, [filteredData, sortColumn, sortDirection]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(sortedData.length / itemsPerPage));

  // Reset to page 1 jika current page > total pages
  // Ini handle case: user di page 5, tapi setelah filter hanya 1 page
  const safePage = useMemo(() => {
    return Math.min(currentPage, totalPages);
  }, [currentPage, totalPages]);

  // Auto-adjust current page jika melebihi total pages
  useMemo(() => {
    if (safePage !== currentPage) {
      setCurrentPage(safePage);
    }
  }, [safePage, currentPage]);

  const paginatedData = useMemo(() => {
    const startIndex = (safePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, safePage, itemsPerPage]);

  // Pagination helpers
  const hasNextPage = safePage < totalPages;
  const hasPreviousPage = safePage > 1;

  // Handlers untuk search, filter, sort, dan pagination
  
  // useCallback = memoize function, prevent unnecessary re-creation
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // 
  }, []);

  const handleRoleFilter = useCallback((role: 'all' | User['role']) => {
    setSelectedRole(role);
    setCurrentPage(1); // 
  }, []);

  const handleSort = useCallback((column: keyof User) => {
    if (sortColumn === column) {
      // Toggle direction jika column yang sama
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // Set column baru, default asc
      setSortColumn(column);
      setSortDirection('asc');
    }
    setCurrentPage(1); 
  }, [sortColumn]);

  const goToPage = useCallback((page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  }, [totalPages]);

  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  }, [hasNextPage]);

  const previousPage = useCallback(() => {
    if (hasPreviousPage) {
      setCurrentPage(prev => prev - 1);
    }
  }, [hasPreviousPage]);

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedRole('all');
    setSortColumn(null);
    setSortDirection('asc');
    setCurrentPage(1);
  }, []);

  // return semua state dan handler yang dibutuhkan
  return {
    // Data
    data: paginatedData,
    filteredCount: sortedData.length,
    totalCount: initialData.length,
    
    // Pagination
    currentPage: safePage,
    totalPages,
    itemsPerPage,
    hasNextPage,
    hasPreviousPage,
    
    // Search & Filter
    searchQuery,
    selectedRole,
    
    // Sort
    sortColumn,
    sortDirection,
    
    // Functions
    handleSearch,
    handleRoleFilter,
    handleSort,
    goToPage,
    nextPage,
    previousPage,
    resetFilters,
  };
}