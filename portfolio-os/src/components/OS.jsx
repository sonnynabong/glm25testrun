import React, { useState, useEffect, useCallback, useRef } from 'react';
import { User, FileText, Code, Layers, Briefcase, Grid3X3, RefreshCw, Gamepad2, FolderOpen, Puzzle, Music, Hash, Calculator, Terminal, Calendar, Settings, Cloud, Folder, StickyNote, Grid } from 'lucide-react';
import Window from './Window';
import WavesBackground from './apps/WavesBackground';
import AboutMe from './apps/AboutMe';
import Resume from './apps/Resume';
import Skills from './apps/Skills';
import ProjectsGallery from './apps/ProjectsGallery';
import Portfolio from './apps/Portfolio';
import Snake from './apps/Snake';
import MemoryMatch from './apps/MemoryMatch';
import Pong from './apps/Pong';
import Game2048 from './apps/Game2048';
import FolderWindow from './apps/FolderWindow';
import CalculatorApp from './apps/Calculator';
import TerminalApp from './apps/Terminal';
import NotesApp from './apps/Notes';
import CalendarApp from './apps/Calendar';
import SettingsApp from './apps/Settings';
import WeatherApp from './apps/Weather';
import FileExplorerApp from './apps/FileExplorer';
import MinesweeperApp from './apps/Minesweeper';
import TetrisApp from './apps/Tetris';

const apps = [
    { id: 'about', title: 'About Me', icon: 'about', iconComponent: User },
    { id: 'resume', title: 'Resume', icon: 'resume', iconComponent: FileText },
    { id: 'skills', title: 'Skills', icon: 'skills', iconComponent: Code },
    { id: 'projects', title: 'Projects', icon: 'projects', iconComponent: Layers },
    { id: 'portfolio', title: 'Portfolio', icon: 'portfolio', iconComponent: Briefcase },
];

const utilityApps = [
    { id: 'calculator', title: 'Calculator', icon: 'calculator', iconComponent: Calculator },
    { id: 'terminal', title: 'Terminal', icon: 'terminal', iconComponent: Terminal },
    { id: 'notes', title: 'Notes', icon: 'notes', iconComponent: StickyNote },
    { id: 'calendar', title: 'Calendar', icon: 'calendar', iconComponent: Calendar },
    { id: 'settings', title: 'Settings', icon: 'settings', iconComponent: Settings },
    { id: 'weather', title: 'Weather', icon: 'weather', iconComponent: Cloud },
    { id: 'files', title: 'Files', icon: 'files', iconComponent: Folder },
];

const gameApps = [
    { id: 'snake', title: 'Snake', icon: 'snake', iconComponent: Gamepad2 },
    { id: 'memory', title: 'Memory', icon: 'memory', iconComponent: Puzzle },
    { id: 'pong', title: 'Pong', icon: 'pong', iconComponent: Music },
    { id: '2048', title: '2048', icon: '2048', iconComponent: Hash },
    { id: 'minesweeper', title: 'Minesweeper', icon: 'minesweeper', iconComponent: Grid },
    { id: 'tetris', title: 'Tetris', icon: 'tetris', iconComponent: Gamepad2 },
];

const appComponents = {
    about: AboutMe,
    resume: Resume,
    skills: Skills,
    projects: ProjectsGallery,
    portfolio: Portfolio,
    snake: Snake,
    memory: MemoryMatch,
    pong: Pong,
    '2048': Game2048,
    calculator: CalculatorApp,
    terminal: TerminalApp,
    notes: NotesApp,
    calendar: CalendarApp,
    settings: SettingsApp,
    weather: WeatherApp,
    files: FileExplorerApp,
    minesweeper: MinesweeperApp,
    tetris: TetrisApp,
};

const appSizes = {
    snake: { width: 450, height: 450 },
    memory: { width: 380, height: 420 },
    pong: { width: 440, height: 420 },
    '2048': { width: 340, height: 420 },
    calculator: { width: 320, height: 450 },
    terminal: { width: 600, height: 400 },
    notes: { width: 500, height: 400 },
    calendar: { width: 450, height: 500 },
    settings: { width: 550, height: 450 },
    weather: { width: 400, height: 500 },
    files: { width: 600, height: 450 },
    minesweeper: { width: 380, height: 450 },
    tetris: { width: 380, height: 500 },
    about: { width: 650, height: 550 },
    resume: { width: 700, height: 600 },
    skills: { width: 600, height: 500 },
    projects: { width: 750, height: 550 },
    portfolio: { width: 650, height: 550 },
};

const initialPositions = {
    about: { x: 50, y: 30 },
    resume: { x: 100, y: 60 },
    skills: { x: 150, y: 90 },
    projects: { x: 200, y: 120 },
    portfolio: { x: 250, y: 150 },
    calculator: { x: 100, y: 100 },
    terminal: { x: 80, y: 80 },
    notes: { x: 120, y: 60 },
    calendar: { x: 150, y: 100 },
    settings: { x: 200, y: 120 },
    weather: { x: 80, y: 150 },
    files: { x: 100, y: 80 },
    snake: { x: 80, y: 80 },
    memory: { x: 100, y: 100 },
    pong: { x: 120, y: 120 },
    '2048': { x: 140, y: 140 },
    minesweeper: { x: 160, y: 100 },
    tetris: { x: 180, y: 80 },
};

export default function OS() {
    const [windows, setWindows] = useState([]);
    const [activeWindow, setActiveWindow] = useState(null);
    const [zIndexCounter, setZIndexCounter] = useState(100);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [contextMenu, setContextMenu] = useState(null);
    const [expandedFolder, setExpandedFolder] = useState(null);
    const [notification, setNotification] = useState(null);
    const [wallpaper, setWallpaper] = useState('gradient-1');
    const [showScreensaver, setShowScreensaver] = useState(false);
    const [idleTime, setIdleTime] = useState(0);
    const desktopRef = useRef(null);

    const allApps = [...apps, ...utilityApps, ...gameApps];

    const wallpapers = {
        'gradient-1': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-2': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'gradient-3': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'gradient-4': 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        'gradient-5': 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        'gradient-6': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
    };

    useEffect(() => {
        // Load settings
        const savedSettings = localStorage.getItem('os-settings');
        if (savedSettings) {
            try {
                const settings = JSON.parse(savedSettings);
                if (settings.wallpaper) setWallpaper(settings.wallpaper);
            } catch (e) {
                console.error('Failed to load settings:', e);
            }
        }

        // Load windows
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

        // Mouse move handler to reset idle time
        const handleMouseMove = () => {
            setIdleTime(0);
            if (showScreensaver) {
                setShowScreensaver(false);
            }
        };
        window.addEventListener('mousemove', handleMouseMove);

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Idle detection for screensaver
    useEffect(() => {
        const idleInterval = setInterval(() => {
            setIdleTime(t => t + 1);
            if (idleTime >= 300 && !showScreensaver) { // 5 minutes
                setShowScreensaver(true);
            }
        }, 1000);
        return () => clearInterval(idleInterval);
    }, [idleTime, showScreensaver]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem('os-windows', JSON.stringify({ windows }));
        }, 500);
        return () => clearTimeout(timeout);
    }, [windows]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.altKey && e.key === 'F4') {
                e.preventDefault();
                if (activeWindow) {
                    const window = windows.find(w => w.appId === activeWindow);
                    if (window) {
                        closeWindow(window.id);
                    }
                }
            }
            if (e.key === 'Escape') {
                setContextMenu(null);
                setExpandedFolder(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeWindow, windows]);

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
            const app = apps.find(a => a.id === appId) || utilityApps.find(a => a.id === appId) || gameApps.find(a => a.id === appId);
            const position = initialPositions[appId] || { x: 100, y: 100 };
            const size = appSizes[appId] || { width: 650, height: 550 };

            setWindows(prev => [...prev, {
                id: `${appId}-${Date.now()}`,
                appId,
                title: app.title,
                icon: app.icon,
                position,
                size,
                minimized: false,
                zIndex: zIndexCounter + 1
            }]);
            setActiveWindow(appId);
            setZIndexCounter(prev => prev + 1);
            setExpandedFolder(null);

            // Show notification for new app
            setNotification(`${app.title} opened`);
            setTimeout(() => setNotification(null), 2000);
        }
    }, [windows, zIndexCounter]);

    const openFolder = useCallback((folderId, folderTitle, items) => {
        const existingWindow = windows.find(w => w.appId === `folder-${folderId}`);

        if (existingWindow) {
            if (existingWindow.minimized) {
                setWindows(prev => prev.map(w =>
                    w.appId === `folder-${folderId}` ? { ...w, minimized: false } : w
                ));
            }
            setActiveWindow(`folder-${folderId}`);
            setZIndexCounter(prev => prev + 1);
        } else {
            const position = initialPositions[folderId] || { x: 150, y: 80 };
            const size = { width: 500, height: 400 };

            setWindows(prev => [...prev, {
                id: `folder-${folderId}-${Date.now()}`,
                appId: `folder-${folderId}`,
                title: folderTitle,
                icon: 'folder',
                position,
                size,
                minimized: false,
                zIndex: zIndexCounter + 1,
                isFolder: true,
                folderItems: items,
                folderTitle: folderTitle
            }]);
            setActiveWindow(`folder-${folderId}`);
            setZIndexCounter(prev => prev + 1);
            setExpandedFolder(null);
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

    const snapWindow = useCallback((windowId, direction) => {
        const window = windows.find(w => w.id === windowId);
        if (!window) return;

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight - 48;

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
        localStorage.removeItem('os-windows');
        setWindows([]);
        setActiveWindow(null);
        setContextMenu(null);
    };

    const toggleFolder = (folderId) => {
        setExpandedFolder(prev => prev === folderId ? null : folderId);
    };

    // Get icon component by name
    const getIconComponent = (iconName) => {
        const allIcons = {
            about: User, resume: FileText, skills: Code, projects: Layers, portfolio: Briefcase,
            calculator: Calculator, terminal: Terminal, notes: StickyNote, calendar: Calendar,
            settings: Settings, weather: Cloud, files: Folder, snake: Gamepad2, memory: Puzzle,
            pong: Music, '2048': Hash, minesweeper: Grid, tetris: Gamepad2, folder: FolderOpen,
        };
        return allIcons[iconName] || Folder;
    };

    const utilityFolderItems = [
        { id: 'calculator', title: 'Calculator', icon: 'calculator', iconComponent: Calculator },
        { id: 'terminal', title: 'Terminal', icon: 'terminal', iconComponent: Terminal },
        { id: 'notes', title: 'Notes', icon: 'notes', iconComponent: StickyNote },
        { id: 'calendar', title: 'Calendar', icon: 'calendar', iconComponent: Calendar },
        { id: 'settings', title: 'Settings', icon: 'settings', iconComponent: Settings },
        { id: 'weather', title: 'Weather', icon: 'weather', iconComponent: Cloud },
        { id: 'files', title: 'Files', icon: 'files', iconComponent: Folder },
    ];

    return (
        <>
            {/* Screensaver */}
            {showScreensaver && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: wallpapers['gradient-5'],
                        zIndex: 99999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        setShowScreensaver(false);
                        setIdleTime(0);
                    }}
                >
                    <div style={{ textAlign: 'center', color: 'white' }}>
                        <div style={{ fontSize: '72px', marginBottom: '16px' }}>Portfolio OS</div>
                        <div style={{ fontSize: '18px', opacity: 0.7 }}>Click anywhere to exit</div>
                    </div>
                </div>
            )}

            {/* Notification */}
            {notification && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '60px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'var(--bg-elevated)',
                        color: 'var(--text-primary)',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        zIndex: 10001,
                        animation: 'fadeInUp 0.3s ease',
                    }}
                >
                    {notification}
                </div>
            )}

            <WavesBackground />

            <div
                className="desktop"
                ref={desktopRef}
                onContextMenu={handleContextMenu}
            >
                {/* Utility Apps Folder */}
                <div
                    className="desktop-icon"
                    onClick={() => openFolder('utility', 'Utilities', utilityFolderItems)}
                    style={{ position: 'relative' }}
                >
                    <div className="icon-wrapper">
                        <Grid3X3
                            size={36}
                            color="var(--text-primary)"
                            strokeWidth={1.5}
                        />
                    </div>
                    <span className="icon-label">Utilities</span>
                </div>

                {/* Games Folder */}
                <div
                    className="desktop-icon"
                    onClick={() => openFolder('games', 'Games', gameApps)}
                    style={{ position: 'relative' }}
                >
                    <div className="icon-wrapper">
                        <FolderOpen
                            size={36}
                            color="var(--text-primary)"
                            strokeWidth={1.5}
                        />
                    </div>
                    <span className="icon-label">Games</span>
                </div>

                {/* Main Apps */}
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

            {windows.map((window) => {
                if (window.isFolder) {
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
                            <FolderWindow
                                folderTitle={window.folderTitle}
                                items={window.folderItems}
                                onItemClick={(itemId) => openWindow(itemId)}
                            />
                        </Window>
                    );
                }
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

            {contextMenu && (
                <div
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

            <div className="taskbar">
                <div className="taskbar-start" title="Portfolio OS">
                    <Grid3X3 size={20} />
                </div>

                <div className="taskbar-apps">
                    {windows.filter(w => !w.isFolder).map((window) => {
                        const app = allApps.find(a => a.id === window.appId);
                        if (!app) return null;
                        const isActive = activeWindow === window.appId && !window.minimized;

                        return (
                            <div
                                key={window.id}
                                className={`taskbar-app ${isActive ? 'active' : ''} ${window.minimized ? 'minimized' : ''}`}
                                onClick={() => handleTaskbarClick(window.appId)}
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
