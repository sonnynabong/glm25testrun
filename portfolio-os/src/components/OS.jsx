import React, { useState, useEffect, useCallback } from 'react';
import { User, FileText, Code, Layers, Folder, Grid3X3, Briefcase } from 'lucide-react';
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

    const openWindow = useCallback((appId) => {
        const existingWindow = windows.find(w => w.appId === appId);

        if (existingWindow) {
            // Bring to front if already open
            if (existingWindow.minimized) {
                setWindows(prev => prev.map(w =>
                    w.appId === appId ? { ...w, minimized: false } : w
                ));
            }
            setActiveWindow(appId);
            setZIndexCounter(prev => prev + 1);
        } else {
            // Open new window
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

    const handleTaskbarClick = (appId) => {
        const window = windows.find(w => w.appId === appId);
        if (window) {
            if (window.minimized) {
                // Restore minimized window
                setWindows(prev => prev.map(w =>
                    w.appId === appId ? { ...w, minimized: false } : w
                ));
                setActiveWindow(appId);
                setZIndexCounter(prev => prev + 1);
            } else if (activeWindow === appId) {
                // Minimize if already active
                setWindows(prev => prev.map(w =>
                    w.appId === appId ? { ...w, minimized: true } : w
                ));
            } else {
                // Bring to front
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

    return (
        <>
            {/* Desktop */}
            <div className="desktop">
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
                        isActive={activeWindow === window.appId}
                        zIndex={window.zIndex}
                    >
                        <AppComponent />
                    </Window>
                );
            })}

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
