
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { mockEvents } from '../pages/Events';

interface CustomCalendarProps {
  value: string; // YYYY-MM-DD
  onChange: (date: string) => void;
  className?: string;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ value, onChange, className }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  // Parse value or default to today
  const selectedDate = value ? new Date(value) : new Date();

  // On mount, if a value exists, set the view to that month
  useEffect(() => {
     if(value) {
         const d = new Date(value);
         if(!isNaN(d.getTime())) setCurrentDate(d);
     }
  }, []);

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const startDay = getFirstDayOfMonth(year, month); // 0 = Sunday

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day: number) => {
    if (isDateDisabled(day)) return;
    
    const selected = new Date(year, month, day);
    // Format YYYY-MM-DD manually to avoid timezone shifts
    const y = selected.getFullYear();
    const m = String(selected.getMonth() + 1).padStart(2, '0');
    const d = String(selected.getDate()).padStart(2, '0');
    
    onChange(`${y}-${m}-${d}`);
    setIsOpen(false);
  };

  // Generate grid cells
  const blanks = Array(startDay).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const isSelected = (day: number) => {
     return selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
  }
  
  const isToday = (day: number) => {
      const today = new Date();
      return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
  }

  const isDateDisabled = (day: number) => {
    const dateToCheck = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 1. Block past dates
    if (dateToCheck < today) return true;

    // 2. Block dates that coincide with mockEvents
    const yStr = year;
    const mStr = String(month + 1).padStart(2, '0');
    const dStr = String(day).padStart(2, '0');
    const dateString = `${yStr}-${mStr}-${dStr}`;

    return mockEvents.some(event => event.date === dateString);
  }

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Input */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-2 rounded border flex items-center justify-between cursor-pointer transition-all bg-white relative z-10
            ${isOpen ? 'border-brand-green ring-1 ring-brand-green' : 'border-gray-200 hover:border-brand-green'}
        `}
      >
        <span className={value ? 'text-gray-900 font-bold text-sm' : 'text-gray-400 text-sm'}>
            {value ? new Date(value).toLocaleDateString('en-KE', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }) : 'Select Date'}
        </span>
        <CalendarIcon size={16} className="text-brand-gold" />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
            <div className="absolute top-full left-0 z-50 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 w-72 animate-fade-in-up">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded-full transition-colors"><ChevronLeft size={20} className="text-brand-green" /></button>
                <span className="font-bold text-brand-green font-serif text-lg">{months[month]} {year}</span>
                <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded-full transition-colors"><ChevronRight size={20} className="text-brand-green" /></button>
            </div>

            {/* Grid Headers */}
            <div className="grid grid-cols-7 mb-2 text-center">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                    <span key={d} className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{d}</span>
                ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-1">
                {blanks.map((_, i) => <div key={`blank-${i}`} />)}
                {days.map(day => {
                    const disabled = isDateDisabled(day);
                    return (
                        <button
                            key={day}
                            disabled={disabled}
                            onClick={() => handleDateClick(day)}
                            className={`h-8 w-8 rounded-full flex items-center justify-center text-sm transition-all relative group
                                ${isSelected(day) ? 'bg-brand-green text-white font-bold shadow-md transform scale-105' : 'hover:bg-brand-gold/20 text-gray-700 hover:text-brand-green'}
                                ${isToday(day) && !isSelected(day) ? 'border border-brand-gold text-brand-green font-bold' : ''}
                                ${disabled ? 'opacity-20 cursor-not-allowed bg-gray-50 text-gray-300' : ''}
                            `}
                        >
                            {day}
                            {/* Hover info for disabled event dates */}
                            {disabled && (
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-brand-green text-white text-[8px] px-2 py-1 rounded whitespace-nowrap z-50">
                                Unavailable
                              </div>
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100">
                <button 
                    onClick={() => {
                        const today = new Date();
                        const y = today.getFullYear();
                        const m = String(today.getMonth() + 1).padStart(2, '0');
                        const d = String(today.getDate()).padStart(2, '0');
                        
                        // Only auto-select if today is not disabled
                        const day = today.getDate();
                        if (!isDateDisabled(day)) {
                            onChange(`${y}-${m}-${d}`);
                            setCurrentDate(today);
                            setIsOpen(false);
                        } else {
                            // Just jump to today's month
                            setCurrentDate(today);
                        }
                    }}
                    className="w-full py-2 bg-brand-cream text-brand-green text-xs font-bold uppercase tracking-widest rounded hover:bg-brand-gold hover:text-white transition-colors"
                >
                    Jump to Today
                </button>
            </div>
            </div>
        </>
      )}
    </div>
  );
};

export default CustomCalendar;
