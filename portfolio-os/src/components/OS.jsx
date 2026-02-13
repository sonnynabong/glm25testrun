import React, { useState, useEffect, useCallback, useRef } from 'react';
import { User, FileText, Code, Layers, Briefcase, Grid3X3, RefreshCw } from 'lucide-react';
import Window from './Window';
import AboutMe from './apps/AboutMe';
import Resume from './apps/Resume';
import Skills from './apps/Skills';
import ProjectsGallery from './apps/ProjectsGallery';
import Portfolio from './apps/Portfolio';

const apps = [
    { id: 'about', title: 'About Me', icon: 'about', iconComponent: User },
    { id: 'resume', title: 'Resume', icon: 'resume', iconComponent: FileText },
    { id: 'skills', title: 'Skills', icon: 'skills', iconComponent: Code },
    { id: 'projects', title: 'Projects', icon: 'projects', iconComponent: Layers },
    { id: 'portfolio', title: 'Portfolio', icon: 'portfolio', iconComponent: Briefcase },
];

const appComponents = {
    about: AboutMe,
    resume: Resume,
    skills: Skills,
    projects: ProjectsGallery,
    portfolio: Portfolio,
};

const initialPositions = {
    about: { x: 50, y: 30 },
    resume: { x: 100, y: 60 },
    skills: { x: 150, y: 90 },
    projects: { x: 200, y: 120 },
    portfolio: { x: 250, y: 150 },
};

export default function OS() {
    const [windows, setWindows] = useState([]);
    const [activeWindow, setActiveWindow] = useState(null);
    const [zIndexCounter, setZIndexCounter] = useState(100);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [contextMenu, setContextMenu] = useState(null);
    const desktopRef = useRef(null);

    // Update clock
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Load saved windows from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('os-windows');
        if (saved) {
            try {
                const state = JSON.parse(saved);
                if (state.windows) {
                    setWindows(state.windows);
                }
            } catch (e) {
                console.error('Failed to load saved windows:', e);
            }
        }
    }, []);

    // Save windows state
    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem('os-windows', JSON.stringify({ windows }));
        }, 500);
        return () => clearTimeout(timeout);
    }, [windows]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Alt+F4 to close active window
            if (e.altKey && e.key === 'F4') {
                e.preventDefault();
                if (activeWindow) {
                    const window = windows.find(w => w.appId === activeWindow);
                    if (window) {
                        closeWindow(window.id);
                    }
                }
            }
            // Escape to close context menu
            if (e.key === 'Escape') {
                setContextMenu(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeWindow, windows]);

    // Close context menu on click outside
    useEffect(() => {
        const handleClick = () => setContextMenu(null);
        if (contextMenu) {
            document.addEventListener('click', handleClick);
            return () => document.removeEventListener('click', handleClick);
        }
    }, [contextMenu]);

    const openWindow = useCallback((appId) => {
        const existingWindow = windows.find(w => w.appId === appId);

        if (existingWindow) {
            if (existingWindow.minimized) {
                setWindows(prev => prev.map(w =>
                    w.appId === appId ? { ...w, minimized: false } : w
                ));
            }
            setActiveWindow(appId);
            setZIndexCounter(prev => prev + 1);
        } else {
            const app = apps.find(a => a.id === appId);
            const position = initialPositions[appId] || { x: 100, y: 100 };

            setWindows(prev => [...prev, {
                id: `${appId}-${Date.now()}`,
                appId,
                title: app.title,
                icon: app.icon,
                position,
                size: { width: 650, height: 550 },
                minimized: false,
                zIndex: zIndexCounter + 1
            }]);
            setActiveWindow(appId);
            setZIndexCounter(prev => prev + 1);
        }
    }, [windows, zIndexCounter]);

    const closeWindow = useCallback((windowId) => {
        setWindows(prev => prev.filter(w => w.id !== windowId));
        if (activeWindow === windows.find(w => w.id === windowId)?.appId) {
            setActiveWindow(null);
        }
    }, [activeWindow, windows]);

    const minimizeWindow = useCallback((windowId) => {
        setWindows(prev => prev.map(w =>
            w.id === windowId ? { ...w, minimized: true } : w
        ));
    }, []);

    const focusWindow = useCallback((windowId) => {
        const window = windows.find(w => w.id === windowId);
        if (window) {
            setActiveWindow(window.appId);
            setWindows(prev => prev.map(w =>
                w.id === windowId ? { ...w, zIndex: zIndexCounter + 1 } : w
            ));
            setZIndexCounter(prev => prev + 1);
        }
    }, [windows, zIndexCounter]);

    // Window snap to edge
    const snapWindow = useCallback((windowId, direction) => {
        const window = windows.find(w => w.id === windowId);
        if (!window) return;

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight - 48; // Account for taskbar

        let newPosition = { ...window.position };
        let newSize = { ...window.size };

        switch (direction) {
            case 'left':
                newPosition = { x: 0, y: 0 };
                newSize = { width: screenWidth / 2, height: screenHeight };
                break;
            case 'right':
                newPosition = { x: screenWidth / 2, y: 0 };
                newSize = { width: screenWidth / 2, height: screenHeight };
                break;
            case 'top':
                newPosition = { x: 0, y: 0 };
                newSize = { width: screenWidth, height: screenHeight };
                break;
            case 'maximize':
                newPosition = { x: 0, y: 0 };
                newSize = { width: screenWidth, height: screenHeight };
                break;
        }

        setWindows(prev => prev.map(w =>
            w.id === windowId ? { ...w, position: newPosition, size: newSize } : w
        ));
    }, [windows]);

    const handleContextMenu = (e) => {
        e.preventDefault();
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
        });
    };

    const handleTaskbarClick = (appId) => {
        const window = windows.find(w => w.appId === appId);
        if (window) {
            if (window.minimized) {
                setWindows(prev => prev.map(w =>
                    w.appId === appId ? { ...w, minimized: false } : w
                ));
                setActiveWindow(appId);
                setZIndexCounter(prev => prev + 1);
            } else if (activeWindow === appId) {
                setWindows(prev => prev.map(w =>
                    w.appId === appId ? { ...w, minimized: true } : w
                ));
            } else {
                setActiveWindow(appId);
                setWindows(prev => prev.map(w =>
                    w.appId === appId ? { ...w, zIndex: zIndexCounter + 1 } : w
                ));
                setZIndexCounter(prev => prev + 1);
            }
        } else {
            openWindow(appId);
        }
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    const refreshDesktop = () => {
        // Clear localStorage and reload
        localStorage.removeItem('os-windows');
        setWindows([]);
        setActiveWindow(null);
        setContextMenu(null);
    };

    return (
        <>
            {/* Desktop */}
            <div
                className="desktop"
                ref={desktopRef}
                onContextMenu={handleContextMenu}
            >
                {apps.map((app) => (
                    <div
                        key={app.id}
                        className="desktop-icon"
                        onClick={() => openWindow(app.id)}
                    >
                        <div className="icon-wrapper">
                            <app.iconComponent
                                size={36}
                                color="var(--text-primary)"
                                strokeWidth={1.5}
                            />
                        </div>
                        <span className="icon-label">{app.title}</span>
                    </div>
                ))}
            </div>

            {/* Windows */}
            {windows.map((window) => {
                const AppComponent = appComponents[window.appId];
                return (
                    <Window
                        key={window.id}
                        id={window.id}
                        title={window.title}
                        icon={window.icon}
                        initialPosition={window.position}
                        initialSize={window.size}
                        onClose={closeWindow}
                        onMinimize={minimizeWindow}
                        onFocus={focusWindow}
                        onSnap={snapWindow}
                        isActive={activeWindow === window.appId}
                        zIndex={window.zIndex}
                    >
                        <AppComponent />
                    </Window>
                );
            })}

            {/* Context Menu */}
            {contextMenu && (
                <div
                    className="context-menu"
                    style={{
                        position: 'fixed',
                        left: contextMenu.x,
                        top: contextMenu.y,
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-light)',
                        borderRadius: '8px',
                        padding: '6px 0',
                        minWidth: '180px',
                        zIndex: 10000,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div
                        className="context-menu-item"
                        onClick={() => { openWindow('about'); setContextMenu(null); }}
                        style={{
                            padding: '8px 16px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            color: 'var(--text-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                        onMouseEnter={(e) => e.target.style.background = 'var(--bg-hover)'}
                        onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                        <User size={14} /> About Me
                    </div>
                    <div
                        className="context-menu-item"
                        onClick={() => { openWindow('portfolio'); setContextMenu(null); }}
                        style={{
                            padding: '8px 16px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            color: 'var(--text-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                        onMouseEnter={(e) => e.target.style.background = 'var(--bg-hover)'}
                        onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                        <Briefcase size={14} /> Open Portfolio
                    </div>
                    <div style={{ height: '1px', background: 'var(--border-light)', margin: '4px 0' }} />
                    <div
                        className="context-menu-item"
                        onClick={refreshDesktop}
                        style={{
                            padding: '8px 16px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            color: 'var(--text-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                        onMouseEnter={(e) => e.target.style.background = 'var(--bg-hover)'}
                        onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                        <RefreshCw size={14} /> Refresh
                    </div>
                </div>
            )}

            {/* Taskbar */}
            <div className="taskbar">
                <div className="taskbar-start" title="Portfolio OS">
                    <Grid3X3 size={20} />
                </div>

                <div className="taskbar-apps">
                    {apps.map((app) => {
                        const window = windows.find(w => w.appId === app.id);
                        const isOpen = !!window;
                        const isActive = isOpen && activeWindow === app.id && !window.minimized;

                        return (
                            <div
                                key={app.id}
                                className={`taskbar-app ${isActive ? 'active' : ''} ${isOpen && window.minimized ? 'minimized' : ''}`}
                                onClick={() => handleTaskbarClick(app.id)}
                            >
                                <app.iconComponent size={18} />
                                <span className="taskbar-app-label">{app.title}</span>
                            </div>
                        );
                    })}
                </div>

                <div className="taskbar-tray">
                    <div className="taskbar-time">{formatTime(currentTime)}</div>
                    <div className="taskbar-date">{formatDate(currentTime)}</div>
                </div>
            </div>
        </>
    );
}
