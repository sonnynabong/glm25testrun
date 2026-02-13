import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Folder, User, FileText, Code, Layers, Minus, Square, X } from 'lucide-react';

const iconMap = {
    about: User,
    resume: FileText,
    skills: Code,
    projects: Layers,
    portfolio: Folder,
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

    const windowRef = useRef(null);
    const dragOffset = useRef({ x: 0, y: 0 });
    const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0, px: 0, py: 0 });

    const IconComponent = iconMap[icon] || Folder;

    // Handle drag
    const handleMouseDown = useCallback((e) => {
        if (e.target.closest('.window-controls') || e.target.closest('.window-btn')) return;
        if (isMaximized) return;

        setIsDragging(true);
        onFocus?.(id);

        const rect = windowRef.current.getBoundingClientRect();
        dragOffset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }, [id, isMaximized, onFocus]);

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
            setIsDragging(false);
            setIsResizing(false);
            setResizeDirection(null);
        };

        if (isDragging || isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, resizeDirection, position, size]);

    const handleMinimize = () => {
        setIsMinimized(true);
        onMinimize?.(id);
    };

    const handleMaximize = () => {
        setIsMaximized(!isMaximized);
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
                if (state.position) setPosition(state.position);
                if (state.size) setSize(state.size);
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
        <div
            ref={windowRef}
            className={`window ${isMaximized ? 'maximized' : ''} ${isActive ? 'active' : ''}`}
            style={{
                left: isMaximized ? 0 : position.x,
                top: isMaximized ? 0 : position.y,
                width: isMaximized ? '100vw' : size.width,
                height: isMaximized ? 'calc(100vh - 48px)' : size.height,
                zIndex: zIndex,
            }}
            onMouseDown={handleFocus}
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
            <div className="window-titlebar" onMouseDown={handleMouseDown}>
                <div className="window-icon">
                    <IconComponent size={14} />
                </div>
                <div className="window-title">{title}</div>

                {/* GNOME-style window controls - right side */}
                <div className="window-controls" style={{ marginLeft: 'auto' }}>
                    <button
                        className="window-btn-gnome"
                        onClick={handleMinimize}
                        title="Minimize"
                    >
                        <Minus size={14} />
                    </button>
                    <button
                        className="window-btn-gnome"
                        onClick={handleMaximize}
                        title={isMaximized ? "Restore" : "Maximize"}
                    >
                        {isMaximized ? (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <rect x="2" y="4" width="6" height="6" stroke="currentColor" strokeWidth="1" fill="none" />
                                <path d="M4 4V2H10V8H8" stroke="currentColor" strokeWidth="1" fill="none" />
                            </svg>
                        ) : (
                            <Square size={12} />
                        )}
                    </button>
                    <button
                        className="window-btn-gnome window-btn-close-gnome"
                        onClick={handleClose}
                        title="Close"
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
    );
}
