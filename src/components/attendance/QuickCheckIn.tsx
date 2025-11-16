import React, { useState } from 'react';
import { useEmployees } from '../../context/EmployeeContext';
import { useAttendance } from '../../context/AttendanceContext';
import { Button } from '../common/Button';

export function QuickCheckIn() {
  const { employees } = useEmployees();
  const { addAttendance, getTodayAttendance } = useAttendance();
  
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
  const [status, setStatus] = useState<'present' | 'late' | 'absent' | 'leave'>('present');
  const [notes, setNotes] = useState('');

  const todayAttendance = getTodayAttendance();
  const checkedInIds = new Set(todayAttendance.map(a => a.employeeId.toString()));

  const availableEmployees = employees.filter(
    emp => !checkedInIds.has(emp.id.toString())
  );

  const handleCheckIn = () => {
    if (!selectedEmployeeId) {
      alert('Please select an employee');
      return;
    }

    const employee = employees.find(e => e.id.toString() === selectedEmployeeId);
    if (!employee) return;

    const now = new Date();
    const checkInTime = now.toTimeString().split(' ')[0].substring(0, 5); // HH:mm

    addAttendance({
      employeeId: employee.id,
      employeeName: employee.name,
      date: now.toISOString().split('T')[0],
      checkIn: checkInTime,
      status,
      notes: notes || undefined,
    });

    // Reset form
    setSelectedEmployeeId('');
    setStatus('present');
    setNotes('');

    alert(`✅ ${employee.name} checked in successfully!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">✅</span>
        Quick Check-In
      </h3>

      <div className="space-y-4">
        {/* Employee Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Employee *
          </label>
          <select
            value={selectedEmployeeId}
            onChange={(e) => setSelectedEmployeeId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="">-- Choose Employee --</option>
            {availableEmployees.map((emp) => (
              <option key={emp.id} value={emp.id.toString()}>
                {emp.name} ({emp.department})
              </option>
            ))}
          </select>
          {availableEmployees.length === 0 && (
            <p className="mt-2 text-sm text-green-600">
              ✅ All employees have checked in today!
            </p>
          )}
        </div>

        {/* Status Radio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status *
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: 'present', label: '✅ Present', color: 'green' },
              { value: 'late', label: '⏰ Late', color: 'yellow' },
              { value: 'absent', label: '❌ Absent', color: 'red' },
              { value: 'leave', label: '🏖️ Leave', color: 'blue' },
            ].map((option) => (
              <label
                key={option.value}
                className={`
                  flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-all
                  ${status === option.value
                    ? `border-${option.color}-500 bg-${option.color}-50`
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <input
                  type="radio"
                  name="status"
                  value={option.value}
                  checked={status === option.value}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes..."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
          />
        </div>

        {/* Check-In Button */}
        <Button
          onClick={handleCheckIn}
          variant="primary"
          fullWidth
          disabled={!selectedEmployeeId}
        >
          ✅ Check In Employee
        </Button>

        {/* Today's Stats */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-2">Today's Summary:</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-green-50 p-2 rounded">
              <span className="text-green-700 font-semibold">
                {todayAttendance.filter(a => a.status === 'present').length}
              </span>
              <span className="text-gray-600"> Present</span>
            </div>
            <div className="bg-yellow-50 p-2 rounded">
              <span className="text-yellow-700 font-semibold">
                {todayAttendance.filter(a => a.status === 'late').length}
              </span>
              <span className="text-gray-600"> Late</span>
            </div>
            <div className="bg-red-50 p-2 rounded">
              <span className="text-red-700 font-semibold">
                {todayAttendance.filter(a => a.status === 'absent').length}
              </span>
              <span className="text-gray-600"> Absent</span>
            </div>
            <div className="bg-blue-50 p-2 rounded">
              <span className="text-blue-700 font-semibold">
                {todayAttendance.filter(a => a.status === 'leave').length}
              </span>
              <span className="text-gray-600"> Leave</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}