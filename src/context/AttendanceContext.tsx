import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AttendanceRecord {
  id: string;
  employeeId: number | string;
  employeeName: string;
  date: string; // YYYY-MM-DD
  checkIn: string; // HH:mm
  checkOut?: string; // HH:mm
  status: 'present' | 'late' | 'absent' | 'leave';
  notes?: string;
}

interface AttendanceContextType {
  records: AttendanceRecord[];
  addAttendance: (record: Omit<AttendanceRecord, 'id'>) => void;
  updateAttendance: (id: string, record: Partial<AttendanceRecord>) => void;
  deleteAttendance: (id: string) => void;
  getAttendanceByDate: (date: string) => AttendanceRecord[];
  getAttendanceByEmployee: (employeeId: number | string) => AttendanceRecord[];
  getTodayAttendance: () => AttendanceRecord[];
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export function AttendanceProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<AttendanceRecord[]>(() => {
    const stored = localStorage.getItem('attendance');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('attendance', JSON.stringify(records));
  }, [records]);

  const addAttendance = (recordData: Omit<AttendanceRecord, 'id'>) => {
    const newRecord: AttendanceRecord = {
      ...recordData,
      id: `att_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    setRecords(prev => [...prev, newRecord]);
  };

  const updateAttendance = (id: string, recordData: Partial<AttendanceRecord>) => {
    setRecords(prev =>
      prev.map(record => (record.id === id ? { ...record, ...recordData } : record))
    );
  };

  const deleteAttendance = (id: string) => {
    setRecords(prev => prev.filter(record => record.id !== id));
  };

  const getAttendanceByDate = (date: string) => {
    return records.filter(record => record.date === date);
  };

  const getAttendanceByEmployee = (employeeId: number | string) => {
    return records.filter(record => record.employeeId === employeeId);
  };

  const getTodayAttendance = () => {
    const today = new Date().toISOString().split('T')[0];
    return getAttendanceByDate(today);
  };

  return (
    <AttendanceContext.Provider
      value={{
        records,
        addAttendance,
        updateAttendance,
        deleteAttendance,
        getAttendanceByDate,
        getAttendanceByEmployee,
        getTodayAttendance,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
}

export function useAttendance() {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error('useAttendance must be used within AttendanceProvider');
  }
  return context;
}