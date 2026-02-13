import React, { useState, useEffect } from 'react';

const WEATHER_CONDITIONS = {
    sunny: { icon: '☀️', temp: 72, desc: 'Sunny' },
    cloudy: { icon: '☁️', temp: 65, desc: 'Cloudy' },
    rainy: { icon: '🌧️', temp: 58, desc: 'Rainy' },
    stormy: { icon: '⛈️', temp: 55, desc: 'Stormy' },
    snowy: { icon: '❄️', temp: 32, desc: 'Snowy' },
    partlyCloudy: { icon: '⛅', temp: 68, desc: 'Partly Cloudy' },
};

const HOURLY_FORECAST = [
    { hour: '9AM', temp: 62, icon: '⛅' },
    { hour: '10AM', temp: 66, icon: '⛅' },
    { hour: '11AM', temp: 70, icon: '☀️' },
    { hour: '12PM', temp: 74, icon: '☀️' },
    { hour: '1PM', temp: 76, icon: '☀️' },
    { hour: '2PM', temp: 75, icon: '☀️' },
    { hour: '3PM', temp: 73, icon: '⛅' },
    { hour: '4PM', temp: 70, icon: '⛅' },
    { hour: '5PM', temp: 66, icon: '☁️' },
];

const WEEKLY_FORECAST = [
    { day: 'Mon', high: 75, low: 58, icon: '☀️' },
    { day: 'Tue', high: 72, low: 56, icon: '⛅' },
    { day: 'Wed', high: 68, low: 54, icon: '🌧️' },
    { day: 'Thu', high: 65, low: 52, icon: '⛈️' },
    { day: 'Fri', high: 70, low: 55, icon: '⛅' },
    { day: 'Sat', high: 73, low: 57, icon: '☀️' },
    { day: 'Sun', high: 76, low: 59, icon: '☀️' },
];

export default function Weather() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [location, setLocation] = useState('San Francisco, CA');
    const [condition, setCondition] = useState('sunny');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
    };

    const current = WEATHER_CONDITIONS[condition];

    return (
        <div style={{ height: '100%', padding: '16px', overflow: 'auto' }}>
            {/* Current Weather */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    {location}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    {formatDate(currentTime)}
                </div>
                <div style={{ fontSize: '64px', marginBottom: '8px' }}>
                    {current.icon}
                </div>
                <div style={{ fontSize: '48px', fontWeight: '300', color: 'var(--text-primary)', marginBottom: '8px' }}>
                    {current.temp}°
                </div>
                <div style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
                    {current.desc}
                </div>
            </div>

            {/* Hourly Forecast */}
            <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    HOURLY FORECAST
                </h3>
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    overflowX: 'auto',
                    paddingBottom: '8px',
                }}>
                    {HOURLY_FORECAST.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                minWidth: '60px',
                                padding: '12px 8px',
                                background: 'var(--bg-card)',
                                borderRadius: '8px',
                                textAlign: 'center',
                            }}
                        >
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                                {item.hour}
                            </div>
                            <div style={{ fontSize: '20px', marginBottom: '4px' }}>
                                {item.icon}
                            </div>
                            <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                                {item.temp}°
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Weekly Forecast */}
            <div>
                <h3 style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    7-DAY FORECAST
                </h3>
                {WEEKLY_FORECAST.map((day, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '10px 0',
                            borderBottom: index < WEEKLY_FORECAST.length - 1 ? '1px solid var(--border-light)' : 'none',
                        }}
                    >
                        <div style={{ width: '50px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                            {day.day}
                        </div>
                        <div style={{ fontSize: '20px', marginRight: '12px' }}>
                            {day.icon}
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                                flex: 1,
                                height: '4px',
                                background: 'var(--bg-hover)',
                                borderRadius: '2px',
                                position: 'relative',
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    left: `${((day.low - 30) / 50) * 100}%`,
                                    right: `${100 - ((day.high - 30) / 50) * 100}%`,
                                    top: 0,
                                    bottom: 0,
                                    background: 'var(--accent-primary)',
                                    borderRadius: '2px',
                                }} />
                            </div>
                        </div>
                        <div style={{ width: '60px', textAlign: 'right' }}>
                            <span style={{ color: 'var(--text-primary)', marginRight: '8px' }}>{day.high}°</span>
                            <span style={{ color: 'var(--text-muted)' }}>{day.low}°</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Weather condition buttons */}
            <div style={{ marginTop: '24px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    CHANGE WEATHER (Demo)
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {Object.entries(WEATHER_CONDITIONS).map(([key, value]) => (
                        <button
                            key={key}
                            onClick={() => setCondition(key)}
                            style={{
                                padding: '8px 12px',
                                borderRadius: '6px',
                                border: 'none',
                                background: condition === key ? 'var(--accent-primary)' : 'var(--bg-card)',
                                color: 'var(--text-primary)',
                                cursor: 'pointer',
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                            }}
                        >
                            {value.icon} {value.desc}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
