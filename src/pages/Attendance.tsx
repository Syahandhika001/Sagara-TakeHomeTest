import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { AttendanceCalendar } from '../components/attendance/AttendanceCalendar';
import { QuickCheckIn } from '../components/attendance/QuickCheckIn';
import { useAttendance } from '../context/AttendanceContext';
import { useEmployees } from '../context/EmployeeContext';

export function Attendance() {
  const { records } = useAttendance();
  const { employees } = useEmployees();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Calculate statistics
  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayRecords = records.filter(r => r.date === today);

    const thisMonth = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}`;
    const monthRecords = records.filter(r => r.date.startsWith(thisMonth));

    return {
      today: {
        present: todayRecords.filter(r => r.status === 'present').length,
        late: todayRecords.filter(r => r.status === 'late').length,
        absent: todayRecords.filter(r => r.status === 'absent').length,
        leave: todayRecords.filter(r => r.status === 'leave').length,
        total: todayRecords.length,
      },
      month: {
        totalDays: monthRecords.length,
        averagePresent: monthRecords.length > 0
          ? (monthRecords.filter(r => r.status === 'present').length / monthRecords.length * 100).toFixed(1)
          : 0,
      },
    };
  }, [records, selectedDate]);

  // Get selected date records
  const selectedDateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
  const selectedDateRecords = records.filter(r => r.date === selectedDateStr);

  return (
    <DashboardLayout>
      <div>
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Attendance Management</h1>
          <p className="text-gray-600">
            Track and manage employee attendance records
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">✅</span>
              <span className="text-sm bg-white/20 px-2 py-1 rounded-full">Today</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.today.present}</h3>
            <p className="text-green-100 text-sm">Present</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">⏰</span>
              <span className="text-sm bg-white/20 px-2 py-1 rounded-full">Today</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.today.late}</h3>
            <p className="text-yellow-100 text-sm">Late</p>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">❌</span>
              <span className="text-sm bg-white/20 px-2 py-1 rounded-full">Today</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.today.absent}</h3>
            <p className="text-red-100 text-sm">Absent</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">📊</span>
              <span className="text-sm bg-white/20 px-2 py-1 rounded-full">Month</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.month.averagePresent}%</h3>
            <p className="text-blue-100 text-sm">Avg Attendance</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Calendar (2/3 width) */}
          <div className="lg:col-span-2">
            <AttendanceCalendar
              records={records}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </div>

          {/* Quick Check-In (1/3 width) */}
          <div>
            <QuickCheckIn />
          </div>
        </div>

        {/* Selected Date Details */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Attendance Records for {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h3>
            <span className="text-sm text-gray-600">
              {selectedDateRecords.length} / {employees.length} employees
            </span>
          </div>

          {selectedDateRecords.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <p className="text-gray-600">No attendance records for this date</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Employee</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Check In</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Check Out</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedDateRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-semibold text-sm">
                            {record.employeeName.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-gray-800">
                            {record.employeeName}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{record.checkIn}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{record.checkOut || '-'}</td>
                      <td className="px-4 py-3">
                        <span className={`
                          inline-flex px-2 py-1 text-xs font-medium rounded-full
                          ${record.status === 'present' ? 'bg-green-100 text-green-700' : ''}
                          ${record.status === 'late' ? 'bg-yellow-100 text-yellow-700' : ''}
                          ${record.status === 'absent' ? 'bg-red-100 text-red-700' : ''}
                          ${record.status === 'leave' ? 'bg-blue-100 text-blue-700' : ''}
                        `}>
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{record.notes || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}