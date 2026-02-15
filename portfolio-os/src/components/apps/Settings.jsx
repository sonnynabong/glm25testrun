import React, { useState, useEffect } from 'react';

const WALLPAPERS = [
    { id: 'gradient-1', name: 'Aurora', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { id: 'gradient-2', name: 'Sunset', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { id: 'gradient-3', name: 'Ocean', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { id: 'gradient-4', name: 'Forest', gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
    { id: 'gradient-5', name: 'Night', gradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' },
    { id: 'gradient-6', name: 'Warmth', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)' },
    { id: 'gradient-7', name: 'Purple Haze', gradient: 'linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)' },
    { id: 'gradient-8', name: 'Midnight', gradient: 'linear-gradient(135deg, #200122 0%, #6f0000 100%)' },
    { id: 'prismatic', name: 'Prismatic', gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' },
];

export default function Settings() {
    const [activeTab, setActiveTab] = useState('appearance');
    const [wallpaper, setWallpaper] = useState('gradient-1');
    const [darkMode, setDarkMode] = useState(true);
    const [accentColor, setAccentColor] = useState('#3584e4');
    const [fontSize, setFontSize] = useState('14');

    useEffect(() => {
        const saved = localStorage.getItem('os-settings');
        if (saved) {
            try {
                const settings = JSON.parse(saved);
                setWallpaper(settings.wallpaper || 'gradient-1');
                setDarkMode(settings.darkMode ?? true);
                setAccentColor(settings.accentColor || '#3584e4');
                setFontSize(settings.fontSize || '14');
            } catch (e) {
                console.error('Failed to load settings:', e);
            }
        }
    }, []);

    useEffect(() => {
        const settings = { wallpaper, darkMode, accentColor, fontSize };
        localStorage.setItem('os-settings', JSON.stringify(settings));

        // Apply wallpaper to desktop
        const desktop = document.querySelector('.desktop');
        if (desktop) {
            const wp = WALLPAPERS.find(w => w.id === wallpaper);
            if (wp) {
                desktop.style.background = wp.gradient;
            }
        }

        // Auto-enable PrismaticBurst when prismatic wallpaper is selected
        if (wallpaper === 'prismatic') {
            const savedSettings = localStorage.getItem('os-settings');
            let settings = {};
            if (savedSettings) {
                try {
                    settings = JSON.parse(savedSettings);
                } catch (e) {
                    console.error('Failed to load settings:', e);
                }
            }
            if (!settings.prismaticBurstSettings) {
                settings.prismaticBurstSettings = {
                    enabled: true,
                    intensity: 2,
                    speed: 0.5,
                    animationType: 'rotate3d',
                    colors: ['#ff007a', '#4d3dff', '#ffffff'],
                    distort: 0,
                    hoverDampness: 0.25,
                    rayCount: 0,
                    mixBlendMode: 'lighten',
                };
            } else if (!settings.prismaticBurstSettings.enabled) {
                settings.prismaticBurstSettings.enabled = true;
            }
            localStorage.setItem('os-settings', JSON.stringify(settings));
            // Trigger a custom event to notify OS.jsx to reload settings
            window.dispatchEvent(new Event('prismatic-enabled'));
        }

        // Apply accent color
        document.documentElement.style.setProperty('--accent-primary', accentColor);
        document.documentElement.style.setProperty('--accent-hover', adjustColor(accentColor, 20));
        document.documentElement.style.setProperty('--accent-active', adjustColor(accentColor, -20));

        // Apply font size
        document.documentElement.style.setProperty('--font-body', `14px`);
    }, [wallpaper, darkMode, accentColor, fontSize]);

    const adjustColor = (color, amount) => {
        const hex = color.replace('#', '');
        const num = parseInt(hex, 16);
        const r = Math.min(255, Math.max(0, (num >> 16) + amount));
        const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
        const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
        return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
    };

    const tabs = [
        { id: 'appearance', label: 'Appearance' },
        { id: 'wallpaper', label: 'Wallpaper' },
        { id: 'about', label: 'About' },
    ];

    return (
        <div style={{ height: '100%', display: 'flex' }}>
            {/* Sidebar */}
            <div style={{
                width: '180px',
                borderRight: '1px solid var(--border-light)',
                padding: '12px',
                background: 'var(--bg-surface)',
            }}>
                {tabs.map(tab => (
                    <div
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '10px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            background: activeTab === tab.id ? 'var(--bg-hover)' : 'transparent',
                            color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                            fontWeight: activeTab === tab.id ? '500' : '400',
                            marginBottom: '4px',
                        }}
                    >
                        {tab.label}
                    </div>
                ))}
            </div>

            {/* Content */}
            <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
                {activeTab === 'appearance' && (
                    <div>
                        <h3 style={{ marginBottom: '20px', color: 'var(--text-primary)' }}>Appearance</h3>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                                Accent Color
                            </label>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {['#3584e4', '#e01b24', '#33d17a', '#f6d32d', '#ff7800', '#9141ac', '#1c71d8', '#26a269'].map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setAccentColor(color)}
                                        style={{
                                            width: '36px',
                                            height: '36px',
                                            borderRadius: '8px',
                                            border: accentColor === color ? '3px solid var(--text-primary)' : 'none',
                                            background: color,
                                            cursor: 'pointer',
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                                Font Size
                            </label>
                            <select
                                value={fontSize}
                                onChange={(e) => setFontSize(e.target.value)}
                                style={{
                                    padding: '8px 12px',
                                    borderRadius: '6px',
                                    border: '1px solid var(--border-light)',
                                    background: 'var(--bg-card)',
                                    color: 'var(--text-primary)',
                                    cursor: 'pointer',
                                }}
                            >
                                <option value="12">Small</option>
                                <option value="14">Medium</option>
                                <option value="16">Large</option>
                            </select>
                        </div>
                    </div>
                )}

                {activeTab === 'wallpaper' && (
                    <div>
                        <h3 style={{ marginBottom: '20px', color: 'var(--text-primary)' }}>Wallpaper</h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                            gap: '12px',
                        }}>
                            {WALLPAPERS.map(wp => (
                                <div
                                    key={wp.id}
                                    onClick={() => setWallpaper(wp.id)}
                                    style={{
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        border: wallpaper === wp.id ? '3px solid var(--accent-primary)' : '3px solid transparent',
                                        transition: 'border-color 0.15s ease',
                                    }}
                                >
                                    <div style={{
                                        height: '80px',
                                        background: wp.gradient,
                                    }} />
                                    <div style={{
                                        padding: '8px',
                                        background: 'var(--bg-card)',
                                        textAlign: 'center',
                                        fontSize: '12px',
                                        color: 'var(--text-primary)',
                                    }}>
                                        {wp.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'about' && (
                    <div>
                        <h3 style={{ marginBottom: '20px', color: 'var(--text-primary)' }}>About</h3>
                        <div style={{ background: 'var(--bg-card)', borderRadius: '12px', padding: '20px' }}>
                            <div style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
                                Portfolio OS
                            </div>
                            <div style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                Version 1.0.0
                            </div>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                An interactive desktop portfolio experience built with React and Tailwind CSS.
                                Explore the desktop environment, open apps, play games, and learn more about me!
                            </p>
                            <div style={{ marginTop: '20px', padding: '12px', background: 'var(--bg-surface)', borderRadius: '8px' }}>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                    Built with React, Tailwind CSS, Astro
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
