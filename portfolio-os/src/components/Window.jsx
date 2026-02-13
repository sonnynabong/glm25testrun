import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Folder, User, FileText, Code, Layers, Minus, Square, X, Maximize2, Calculator, Terminal, Cloud, StickyNote, Grid, Gamepad2, Hash, Music, Puzzle, Settings } from 'lucide-react';

const iconMap = {
    about: User,
    resume: FileText,
    skills: Code,
    projects: Layers,
    portfolio: Folder,
    calculator: Calculator,
    terminal: Terminal,
    notes: StickyNote,
    calendar: Grid,
    settings: Settings,
    weather: Cloud,
    files: Folder,
    snake: Gamepad2,
    memory: Puzzle,
    pong: Music,
    '2048': Hash,
    minesweeper: Grid,
    tetris: Gamepad2,
};

export default function Window({
    id,
    title,
    icon,
    children,
    initialPosition = { x: 100, y: 100 },
    initialSize = { width: 600, height: 500 },
    onClose,
    onMinimize,
    onFocus,
    onSnap,
    isActive,
    zIndex
}) {
    const [position, setPosition] = useState(initialPosition);
    const [size, setSize] = useState(initialSize);
    const [isMaximized, setIsMaximized] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState(null);
    const [showSnapGuide, setShowSnapGuide] = useState(null);
    const [minimizeDirection, setMinimizeDirection] = useState(null);
    const [isOpening, setIsOpening] = useState(true);

    const windowRef = useRef(null);
    const dragOffset = useRef({ x: 0, y: 0 });
    const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0, px: 0, py: 0 });
    const lastClickTime = useRef(0);
    const prevPosition = useRef(initialPosition);
    const prevSize = useRef(initialSize);

    const IconComponent = iconMap[icon] || Folder;

    // Opening animation
    useEffect(() => {
        const timer = setTimeout(() => setIsOpening(false), 200);
        return () => clearTimeout(timer);
    }, []);

    // Handle drag
    const handleMouseDown = useCallback((e) => {
        if (e.target.closest('.window-controls') || e.target.closest('.window-btn-gnome')) return;
        if (isMaximized) return;

        setIsDragging(true);
        onFocus?.(id);

        const rect = windowRef.current.getBoundingClientRect();
        dragOffset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }, [id, isMaximized, onFocus]);

    // Handle snap guides during drag
    const handleDragMove = useCallback((e) => {
        if (!isDragging || isMaximized) return;

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight - 48;
        const snapThreshold = 50;

        const mouseX = e.clientX;
        const centerX = screenWidth / 2;

        // Show snap guides
        if (mouseX < snapThreshold) {
            setShowSnapGuide('left');
        } else if (mouseX > screenWidth - snapThreshold) {
            setShowSnapGuide('right');
        } else {
            setShowSnapGuide(null);
        }
    }, [isDragging, isMaximized]);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleDragMove);
            return () => document.removeEventListener('mousemove', handleDragMove);
        }
    }, [isDragging, handleDragMove]);

    // Handle title bar double-click for snap
    const handleTitleBarClick = useCallback((e) => {
        const currentTime = Date.now();
        const timeDiff = currentTime - lastClickTime.current;

        if (timeDiff < 300) {
            // Double click - maximize/restore
            handleMaximize();
        } else {
            // Single click - handle drag or focus
            handleMouseDown(e);
        }

        lastClickTime.current = currentTime;
    }, [handleMouseDown]);

    // Handle resize
    const handleResizeStart = useCallback((direction, e) => {
        e.stopPropagation();
        setIsResizing(true);
        setResizeDirection(direction);
        onFocus?.(id);

        const rect = windowRef.current.getBoundingClientRect();
        resizeStart.current = {
            x: e.clientX,
            y: e.clientY,
            width: rect.width,
            height: rect.height,
            px: rect.left,
            py: rect.top
        };
    }, [id, onFocus]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) {
                const newX = e.clientX - dragOffset.current.x;
                const newY = e.clientY - dragOffset.current.y;

                // Boundary constraints
                const constrainedX = Math.max(0, Math.min(newX, window.innerWidth - size.width));
                const constrainedY = Math.max(0, Math.min(newY, window.innerHeight - 100));

                setPosition({ x: constrainedX, y: constrainedY });
            }

            if (isResizing && resizeDirection) {
                const deltaX = e.clientX - resizeStart.current.x;
                const deltaY = e.clientY - resizeStart.current.y;

                let newWidth = resizeStart.current.width;
                let newHeight = resizeStart.current.height;
                let newX = position.x;
                let newY = position.y;

                if (resizeDirection.includes('e')) {
                    newWidth = Math.max(400, resizeStart.current.width + deltaX);
                }
                if (resizeDirection.includes('w')) {
                    newWidth = Math.max(400, resizeStart.current.width - deltaX);
                    newX = resizeStart.current.px + deltaX;
                }
                if (resizeDirection.includes('s')) {
                    newHeight = Math.max(300, resizeStart.current.height + deltaY);
                }
                if (resizeDirection.includes('n')) {
                    newHeight = Math.max(300, resizeStart.current.height - deltaY);
                    newY = resizeStart.current.py + deltaY;
                }

                setSize({ width: newWidth, height: newHeight });
                setPosition({ x: newX, y: newY });
            }
        };

        const handleMouseUp = () => {
            // Handle snap on release
            if (isDragging && showSnapGuide) {
                handleSnapToGuide(showSnapGuide);
            }
            setIsDragging(false);
            setIsResizing(false);
            setResizeDirection(null);
            setShowSnapGuide(null);
        };

        if (isDragging || isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, resizeDirection, position, size, showSnapGuide]);

    const handleSnapToGuide = (direction) => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight - 48;

        let newPosition = { ...position };
        let newSize = { ...size };

        switch (direction) {
            case 'left':
                newPosition = { x: 0, y: 0 };
                newSize = { width: screenWidth / 2, height: screenHeight };
                break;
            case 'right':
                newPosition = { x: screenWidth / 2, y: 0 };
                newSize = { width: screenWidth / 2, height: screenHeight };
                break;
        }

        setPosition(newPosition);
        setSize(newSize);
    };

    const handleMinimize = () => {
        setMinimizeDirection('down');
        setTimeout(() => {
            setIsMinimized(true);
            onMinimize?.(id);
            setMinimizeDirection(null);
        }, 150);
    };

    const handleMaximize = () => {
        if (isMaximized) {
            // Restore to previous position and size
            setPosition(prevPosition.current);
            setSize(prevSize.current);
            setIsMaximized(false);
        } else {
            // Save current position and size
            prevPosition.current = { ...position };
            prevSize.current = { ...size };
            // Maximize
            onSnap?.(id, 'maximize');
            setIsMaximized(true);
        }
        onFocus?.(id);
    };

    const handleClose = () => {
        onClose?.(id);
    };

    const handleFocus = () => {
        onFocus?.(id);
    };

    // Load saved state from localStorage
    useEffect(() => {
        const saved = localStorage.getItem(`window-${id}`);
        if (saved) {
            try {
                const state = JSON.parse(saved);
                if (state.position) {
                    setPosition(state.position);
                    prevPosition.current = state.position;
                }
                if (state.size) {
                    setSize(state.size);
                    prevSize.current = state.size;
                }
            } catch (e) {
                console.error('Failed to load window state:', e);
            }
        }
    }, [id]);

    // Save state to localStorage
    useEffect(() => {
        const saveState = () => {
            localStorage.setItem(`window-${id}`, JSON.stringify({ position, size }));
        };

        const timeout = setTimeout(saveState, 500);
        return () => clearTimeout(timeout);
    }, [id, position, size]);

    if (isMinimized) return null;

    return (
        <>
            {/* Snap Guide Overlay */}
            {showSnapGuide && isDragging && (
                <div
                    className="snap-guide"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: showSnapGuide === 'left' ? 0 : '50%',
                        width: '50%',
                        height: 'calc(100vh - 48px)',
                        background: 'rgba(53, 132, 228, 0.15)',
                        border: showSnapGuide === 'left' ? '2px solid var(--accent-primary)' : '2px solid var(--accent-primary)',
                        borderLeft: showSnapGuide === 'right' ? 'none' : '2px solid var(--accent-primary)',
                        borderRight: showSnapGuide === 'left' ? 'none' : '2px solid var(--accent-primary)',
                        zIndex: 9999,
                        pointerEvents: 'none',
                    }}
                />
            )}

            <div
                ref={windowRef}
                className={`window ${isMaximized ? 'maximized' : ''} ${isActive ? 'active' : ''} ${isOpening ? 'opening' : ''}`}
                style={{
                    left: isMaximized ? 0 : position.x,
                    top: isMaximized ? 0 : position.y,
                    width: isMaximized ? '100vw' : size.width,
                    height: isMaximized ? 'calc(100vh - 48px)' : size.height,
                    zIndex: zIndex,
                    transform: isOpening ? 'scale(0.95)' : 'scale(1)',
                    opacity: isOpening ? 0 : 1,
                    transition: isOpening ? 'transform 0.2s ease, opacity 0.2s ease' : 'box-shadow 0.2s ease',
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(36, 36, 36, 0.85)',
                }}
                onMouseDown={handleFocus}
                role="dialog"
                aria-label={title}
            >
                {/* Resize Handles */}
                {!isMaximized && (
                    <>
                        <div className="resize-handle resize-handle-n" onMouseDown={(e) => handleResizeStart('n', e)} />
                        <div className="resize-handle resize-handle-s" onMouseDown={(e) => handleResizeStart('s', e)} />
                        <div className="resize-handle resize-handle-e" onMouseDown={(e) => handleResizeStart('e', e)} />
                        <div className="resize-handle resize-handle-w" onMouseDown={(e) => handleResizeStart('w', e)} />
                        <div className="resize-handle resize-handle-ne" onMouseDown={(e) => handleResizeStart('ne', e)} />
                        <div className="resize-handle resize-handle-nw" onMouseDown={(e) => handleResizeStart('nw', e)} />
                        <div className="resize-handle resize-handle-se" onMouseDown={(e) => handleResizeStart('se', e)} />
                        <div className="resize-handle resize-handle-sw" onMouseDown={(e) => handleResizeStart('sw', e)} />
                    </>
                )}

                {/* Title Bar - GNOME Style */}
                <div className="window-titlebar" onMouseDown={handleTitleBarClick}>
                    <div className="window-icon">
                        <IconComponent size={14} color="var(--text-primary)" />
                    </div>
                    <div className="window-title">{title}</div>

                    {/* GNOME-style window controls - right side */}
                    <div className="window-controls" style={{ marginLeft: 'auto' }}>
                        <button
                            className="window-btn-gnome"
                            onClick={handleMinimize}
                            title="Minimize"
                            aria-label="Minimize window"
                        >
                            <Minus size={14} />
                        </button>
                        <button
                            className="window-btn-gnome"
                            onClick={handleMaximize}
                            title={isMaximized ? "Restore" : "Maximize"}
                            aria-label={isMaximized ? "Restore window" : "Maximize window"}
                        >
                            {isMaximized ? (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <rect x="2" y="4" width="6" height="6" stroke="currentColor" strokeWidth="1" fill="none" />
                                    <path d="M4 4V2H10V8H8" stroke="currentColor" strokeWidth="1" fill="none" />
                                </svg>
                            ) : (
                                <Maximize2 size={12} />
                            )}
                        </button>
                        <button
                            className="window-btn-gnome window-btn-close-gnome"
                            onClick={handleClose}
                            title="Close"
                            aria-label="Close window"
                        >
                            <X size={14} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="window-content">
                    {children}
                </div>
            </div>
        </>
    );
}
