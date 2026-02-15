import React, { useState, useEffect, useCallback, useRef } from 'react';
import { User, FileText, Code, Layers, Briefcase, Grid3X3, RefreshCw, Gamepad2, FolderOpen, Puzzle, Music, Hash, Calculator, Terminal, Calendar, Settings, Cloud, Folder, StickyNote, Grid } from 'lucide-react';
import Window from './Window';
import WavesBackground from './apps/WavesBackground';
import PrismaticBurst from './PrismaticBurst';
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
    const [showBackgroundMenu, setShowBackgroundMenu] = useState(false);
    const [backgroundType, setBackgroundType] = useState('waves'); // 'none', 'waves', 'prismatic'
    const [waveSettings, setWaveSettings] = useState({
        showWaves: true,
        lineColor: '#3584e4',
        waveSpeedX: 0.0125,
        waveSpeedY: 0.01,
        waveAmpX: 40,
        waveAmpY: 20,
    });
    const [prismaticBurstSettings, setPrismaticBurstSettings] = useState({
        enabled: false,
        intensity: 2,
        speed: 0.5,
        animationType: 'rotate3d',
        colors: ['#ff007a', '#4d3dff', '#ffffff'],
        distort: 0,
        hoverDampness: 0.25,
        rayCount: 0,
        mixBlendMode: 'lighten',
    });
    const desktopRef = useRef(null);

    const allApps = [...apps, ...utilityApps, ...gameApps];

    const wallpapers = {
        'gradient-1': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-2': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'gradient-3': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'gradient-4': 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        'gradient-5': 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        'gradient-6': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
        'prismatic': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    };

    useEffect(() => {
        // Load settings
        const savedSettings = localStorage.getItem('os-settings');
        if (savedSettings) {
            try {
                const settings = JSON.parse(savedSettings);
                if (settings.wallpaper) setWallpaper(settings.wallpaper);
                if (settings.waveSettings) setWaveSettings(settings.waveSettings);
                if (settings.prismaticBurstSettings) setPrismaticBurstSettings(settings.prismaticBurstSettings);
                // Determine background type from settings
                if (settings.backgroundType) {
                    setBackgroundType(settings.backgroundType);
                } else if (settings.prismaticBurstSettings?.enabled) {
                    setBackgroundType('prismatic');
                } else if (settings.waveSettings?.showWaves) {
                    setBackgroundType('waves');
                } else {
                    setBackgroundType('waves'); // Default to waves
                }
            } catch (e) {
                console.error('Failed to load settings:', e);
            }
        }

        // Listen for PrismaticBurst enable event from Settings
        const handlePrismaticEnabled = () => {
            const saved = localStorage.getItem('os-settings');
            if (saved) {
                try {
                    const settings = JSON.parse(saved);
                    if (settings.prismaticBurstSettings) {
                        setPrismaticBurstSettings(settings.prismaticBurstSettings);
                    }
                    if (settings.backgroundType) {
                        setBackgroundType(settings.backgroundType);
                    }
                } catch (e) {
                    console.error('Failed to load settings:', e);
                }
            }
        };

        const handleBackgroundChanged = () => {
            const saved = localStorage.getItem('os-settings');
            if (saved) {
                try {
                    const settings = JSON.parse(saved);
                    if (settings.backgroundType) {
                        setBackgroundType(settings.backgroundType);
                    }
                    if (settings.waveSettings) {
                        setWaveSettings(settings.waveSettings);
                    }
                } catch (e) {
                    console.error('Failed to load settings:', e);
                }
            }
        };

        window.addEventListener('prismatic-enabled', handlePrismaticEnabled);
        window.addEventListener('background-changed', handleBackgroundChanged);

        return () => {
            window.removeEventListener('prismatic-enabled', handlePrismaticEnabled);
            window.removeEventListener('background-changed', handleBackgroundChanged);
        };

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

    // Save prismatic burst settings when they change
    useEffect(() => {
        const savedSettings = localStorage.getItem('os-settings');
        let settings = {};
        if (savedSettings) {
            try {
                settings = JSON.parse(savedSettings);
            } catch (e) {
                console.error('Failed to load settings:', e);
            }
        }
        settings.prismaticBurstSettings = prismaticBurstSettings;
        settings.backgroundType = backgroundType;
        localStorage.setItem('os-settings', JSON.stringify(settings));
    }, [prismaticBurstSettings, backgroundType]);

    // Save wave settings when they change
    useEffect(() => {
        const savedSettings = localStorage.getItem('os-settings');
        let settings = {};
        if (savedSettings) {
            try {
                settings = JSON.parse(savedSettings);
            } catch (e) {
                console.error('Failed to load settings:', e);
            }
        }
        settings.waveSettings = waveSettings;
        settings.backgroundType = backgroundType;
        localStorage.setItem('os-settings', JSON.stringify(settings));
    }, [waveSettings, backgroundType]);

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
        const handleClick = () => {
            setContextMenu(null);
            setShowBackgroundMenu(false);
        };
        if (contextMenu || showBackgroundMenu) {
            document.addEventListener('click', handleClick);
            return () => document.removeEventListener('click', handleClick);
        }
    }, [contextMenu, showBackgroundMenu]);

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
                        background: 'var(--bg-deep)',
                        zIndex: 99999,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        setShowScreensaver(false);
                        setIdleTime(0);
                    }}
                >
                    <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '48px',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        marginBottom: '30px',
                        letterSpacing: '-0.5px',
                    }}>
                        PORTFOLIO OS
                    </div>
                    <div style={{
                        fontFamily: "'Monaco', 'Consolas', monospace",
                        fontSize: '13px',
                        color: 'var(--text-secondary)',
                        textAlign: 'left',
                        maxWidth: '350px',
                    }}>
                        <div style={{ margin: '4px 0', opacity: 0.7 }}>System idle...</div>
                        <div style={{ margin: '4px 0', opacity: 0.5 }}>Press any key or click to resume</div>
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

            {backgroundType === 'waves' && (
                <WavesBackground
                    lineColor={waveSettings.lineColor}
                    waveSpeedX={waveSettings.waveSpeedX}
                    waveSpeedY={waveSettings.waveSpeedY}
                    waveAmpX={waveSettings.waveAmpX}
                    waveAmpY={waveSettings.waveAmpY}
                />
            )}

            {backgroundType === 'prismatic' && (
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <PrismaticBurst
                        intensity={prismaticBurstSettings.intensity}
                        speed={prismaticBurstSettings.speed}
                        animationType={prismaticBurstSettings.animationType}
                        colors={prismaticBurstSettings.colors}
                        distort={prismaticBurstSettings.distort}
                        hoverDampness={prismaticBurstSettings.hoverDampness}
                        rayCount={prismaticBurstSettings.rayCount}
                        mixBlendMode={prismaticBurstSettings.mixBlendMode}
                    />
                </div>
            )}

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
                        onClick={() => { setContextMenu(null); setShowBackgroundMenu(true); }}
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
                        <Grid3X3 size={14} /> Background Options
                    </div>
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

            {/* Background Options Menu */}
            {showBackgroundMenu && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        position: 'fixed',
                        left: contextMenu ? contextMenu.x : '50%',
                        top: contextMenu ? contextMenu.y : '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-light)',
                        borderRadius: '12px',
                        padding: '16px',
                        minWidth: '280px',
                        zIndex: 10001,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    }}
                >
                    <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--text-primary)' }}>
                        Background Options
                    </div>

                    {/* Background Type Selector */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                        {[
                            { id: 'none', label: 'None', icon: '' },
                            { id: 'waves', label: 'Waves', icon: '' },
                            { id: 'prismatic', label: 'Prismatic', icon: '' },
                        ].map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setBackgroundType(type.id)}
                                style={{
                                    flex: 1,
                                    padding: '10px 8px',
                                    borderRadius: '8px',
                                    border: backgroundType === type.id ? '2px solid var(--accent-primary)' : '2px solid var(--border-light)',
                                    background: backgroundType === type.id ? 'var(--accent-primary)' : 'var(--bg-hover)',
                                    color: backgroundType === type.id ? 'white' : 'var(--text-primary)',
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '4px',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <span>{type.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Waves Settings */}
                    {backgroundType === 'waves' && (
                        <div style={{ padding: '12px', background: 'var(--bg-hover)', borderRadius: '8px' }}>
                            <div style={{ marginBottom: '12px' }}>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '12px', display: 'block', marginBottom: '8px' }}>Wave Color</span>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    {['#3584e4', '#e01b24', '#33d17a', '#f6d32d', '#ff7800', '#9141ac', '#ffffff', '#1c71d8'].map(color => (
                                        <button
                                            key={color}
                                            onClick={() => setWaveSettings(s => ({ ...s, lineColor: color }))}
                                            style={{
                                                width: '28px',
                                                height: '28px',
                                                borderRadius: '6px',
                                                border: waveSettings.lineColor === color ? '2px solid var(--text-primary)' : '2px solid transparent',
                                                background: color,
                                                cursor: 'pointer',
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Prismatic Burst Settings */}
                    {backgroundType === 'prismatic' && (
                        <div style={{ padding: '12px', background: 'var(--bg-hover)', borderRadius: '8px' }}>
                            {/* Animation Type */}
                            <div style={{ marginBottom: '12px' }}>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '12px', display: 'block', marginBottom: '6px' }}>Animation</span>
                                <select
                                    value={prismaticBurstSettings.animationType}
                                    onChange={(e) => setPrismaticBurstSettings(s => ({ ...s, animationType: e.target.value }))}
                                    style={{
                                        width: '100%',
                                        padding: '6px 8px',
                                        borderRadius: '4px',
                                        border: '1px solid var(--border-light)',
                                        background: 'var(--bg-surface)',
                                        color: 'var(--text-primary)',
                                        fontSize: '12px',
                                    }}
                                >
                                    <option value="rotate">Rotate</option>
                                    <option value="rotate3d">3D Rotate</option>
                                    <option value="hover">Hover</option>
                                </select>
                            </div>

                            {/* Intensity */}
                            <div style={{ marginBottom: '12px' }}>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '12px', display: 'block', marginBottom: '6px' }}>Intensity: {prismaticBurstSettings.intensity}</span>
                                <input
                                    type="range"
                                    min="0.5"
                                    max="5"
                                    step="0.1"
                                    value={prismaticBurstSettings.intensity}
                                    onChange={(e) => setPrismaticBurstSettings(s => ({ ...s, intensity: parseFloat(e.target.value) }))}
                                    style={{ width: '100%' }}
                                />
                            </div>

                            {/* Speed */}
                            <div style={{ marginBottom: '12px' }}>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '12px', display: 'block', marginBottom: '6px' }}>Speed: {prismaticBurstSettings.speed}</span>
                                <input
                                    type="range"
                                    min="0.1"
                                    max="2"
                                    step="0.1"
                                    value={prismaticBurstSettings.speed}
                                    onChange={(e) => setPrismaticBurstSettings(s => ({ ...s, speed: parseFloat(e.target.value) }))}
                                    style={{ width: '100%' }}
                                />
                            </div>

                            {/* Colors */}
                            <div style={{ marginBottom: '12px' }}>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '12px', display: 'block', marginBottom: '6px' }}>Colors</span>
                                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                    {[
                                        ['#ff007a', '#4d3dff', '#ffffff'],
                                        ['#ff6b6b', '#feca57', '#48dbfb'],
                                        ['#ff9ff3', '#f368e0', '#00d2d3'],
                                        ['#54a0ff', '#5f27cd', '#01a3a4'],
                                        ['#ee5a24', '#009432', '#f79f1f'],
                                        ['#1289a7', '#d980fa', '#b53471'],
                                    ].map((colors, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setPrismaticBurstSettings(s => ({ ...s, colors }))}
                                            style={{
                                                width: '28px',
                                                height: '28px',
                                                borderRadius: '4px',
                                                border: prismaticBurstSettings.colors[0] === colors[0] ? '2px solid var(--text-primary)' : '2px solid transparent',
                                                background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`,
                                                cursor: 'pointer',
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Distort */}
                            <div>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '12px', display: 'block', marginBottom: '6px' }}>Distort: {prismaticBurstSettings.distort}</span>
                                <input
                                    type="range"
                                    min="0"
                                    max="10"
                                    step="0.5"
                                    value={prismaticBurstSettings.distort}
                                    onChange={(e) => setPrismaticBurstSettings(s => ({ ...s, distort: parseFloat(e.target.value) }))}
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Close button */}
                    <button
                        onClick={() => {
                            setBackgroundType('waves');
                            setWaveSettings({
                                showWaves: true,
                                lineColor: '#3584e4',
                                waveSpeedX: 0.0125,
                                waveSpeedY: 0.01,
                                waveAmpX: 40,
                                waveAmpY: 20,
                            });
                            setPrismaticBurstSettings({
                                enabled: false,
                                intensity: 2,
                                speed: 0.5,
                                animationType: 'rotate3d',
                                colors: ['#ff007a', '#4d3dff', '#ffffff'],
                                distort: 0,
                                hoverDampness: 0.25,
                                rayCount: 0,
                                mixBlendMode: 'lighten',
                            });
                        }}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '6px',
                            border: 'none',
                            background: 'var(--bg-hover)',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            fontWeight: '500',
                            marginTop: '12px',
                        }}
                    >
                        Reset to Default
                    </button>

                    {/* Close button */}
                    <button
                        onClick={() => setShowBackgroundMenu(false)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '6px',
                            border: 'none',
                            background: 'var(--accent-primary)',
                            color: 'white',
                            cursor: 'pointer',
                            fontWeight: '500',
                        }}
                    >
                        Done
                    </button>
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
