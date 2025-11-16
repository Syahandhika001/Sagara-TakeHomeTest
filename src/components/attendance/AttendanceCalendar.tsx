import React from 'react';
import { AttendanceRecord } from '../../context/AttendanceContext';

interface AttendanceCalendarProps {
  records: AttendanceRecord[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export function AttendanceCalendar({ records, selectedDate, onDateSelect }: AttendanceCalendarProps) {
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();

  // Get days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Get attendance stats for a date
  const getDateStats = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayRecords = records.filter(r => r.date === dateStr);
    
    const present = dayRecords.filter(r => r.status === 'present').length;
    const late = dayRecords.filter(r => r.status === 'late').length;
    const absent = dayRecords.filter(r => r.status === 'absent').length;

    return { present, late, absent, total: dayRecords.length };
  };

  // Check if date is today
  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  // Check if date is selected
  const isSelected = (day: number) => {
    return (
      day === selectedDate.getDate() &&
      currentMonth === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear()
    );
  };

  // Navigate month
  const prevMonth = () => {
    onDateSelect(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    onDateSelect(new Date(currentYear, currentMonth + 1, 1));
  };

  // Days array
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          {monthNames[currentMonth]} {currentYear}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Day names */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}

        {/* Empty cells */}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} />
        ))}

        {/* Day cells */}
        {days.map((day) => {
          const stats = getDateStats(day);
          const hasAttendance = stats.total > 0;

          return (
            <button
              key={day}
              onClick={() => onDateSelect(new Date(currentYear, currentMonth, day))}
              className={`
                relative p-2 rounded-lg border transition-all
                ${isToday(day) ? 'border-amber-500 bg-amber-50' : 'border-gray-200'}
                ${isSelected(day) ? 'ring-2 ring-amber-500 bg-amber-100' : ''}
                hover:bg-gray-50
              `}
            >
              <div className="text-center">
                <span className={`
                  text-sm font-medium
                  ${isToday(day) ? 'text-amber-600' : 'text-gray-800'}
                `}>
                  {day}
                </span>
                
                {hasAttendance && (
                  <div className="mt-1 flex gap-1 justify-center">
                    {stats.present > 0 && (
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full" title={`${stats.present} present`} />
                    )}
                    {stats.late > 0 && (
                      <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" title={`${stats.late} late`} />
                    )}
                    {stats.absent > 0 && (
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full" title={`${stats.absent} absent`} />
                    )}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs font-medium text-gray-600 mb-2">Legend:</p>
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-gray-600">Present</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-yellow-500 rounded-full" />
            <span className="text-gray-600">Late</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-red-500 rounded-full" />
            <span className="text-gray-600">Absent</span>
          </div>
        </div>
      </div>
    </div>
  );
}