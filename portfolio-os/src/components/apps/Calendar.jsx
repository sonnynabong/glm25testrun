import React, { useState } from 'react';

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        const days = [];

        // Previous month's days
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = startingDay - 1; i >= 0; i--) {
            days.push({
                day: prevMonthLastDay - i,
                isCurrentMonth: false,
                date: new Date(year, month - 1, prevMonthLastDay - i)
            });
        }

        // Current month's days
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                day: i,
                isCurrentMonth: true,
                date: new Date(year, month, i)
            });
        }

        // Next month's days
        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                day: i,
                isCurrentMonth: false,
                date: new Date(year, month + 1, i)
            });
        }

        return days;
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const goToToday = () => {
        const today = new Date();
        setCurrentDate(today);
        setSelectedDate(today);
    };

    const isToday = (date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    const isSelected = (date) => {
        return date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear();
    };

    const days = getDaysInMonth(currentDate);

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '16px' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                        onClick={prevMonth}
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            border: 'none',
                            background: 'var(--bg-hover)',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        ‹
                    </button>
                    <span style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)', minWidth: '160px', textAlign: 'center' }}>
                        {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </span>
                    <button
                        onClick={nextMonth}
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            border: 'none',
                            background: 'var(--bg-hover)',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        ›
                    </button>
                </div>
                <button
                    onClick={goToToday}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: 'none',
                        background: 'var(--accent-primary)',
                        color: 'white',
                        cursor: 'pointer',
                        fontWeight: '500',
                    }}
                >
                    Today
                </button>
            </div>

            {/* Days of week header */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '4px',
                marginBottom: '8px',
            }}>
                {daysOfWeek.map(day => (
                    <div
                        key={day}
                        style={{
                            textAlign: 'center',
                            padding: '8px',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: 'var(--text-secondary)',
                        }}
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div style={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '4px',
            }}>
                {days.map((day, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedDate(day.date)}
                        style={{
                            aspectRatio: '1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: isToday(day.date) ? '600' : '400',
                            color: !day.isCurrentMonth
                                ? 'var(--text-muted)'
                                : isSelected(day.date)
                                    ? 'white'
                                    : isToday(day.date)
                                        ? 'var(--accent-primary)'
                                        : 'var(--text-primary)',
                            background: isSelected(day.date)
                                ? 'var(--accent-primary)'
                                : isToday(day.date)
                                    ? 'var(--bg-hover)'
                                    : 'transparent',
                            transition: 'background 0.15s ease',
                        }}
                    >
                        {day.day}
                    </div>
                ))}
            </div>

            {/* Selected date display */}
            <div style={{
                marginTop: '16px',
                padding: '12px',
                background: 'var(--bg-card)',
                borderRadius: '8px',
                textAlign: 'center',
            }}>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                    {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>
        </div>
    );
}
