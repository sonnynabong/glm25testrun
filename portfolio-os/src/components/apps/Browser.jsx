import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Home, Globe, Loader2, Plus, Star, Search, ExternalLink, X } from 'lucide-react';

// Default bookmarks for the browser
const DEFAULT_BOOKMARKS = [
    { id: 1, title: 'Google', url: 'https://www.google.com', icon: 'https://www.google.com/favicon.ico' },
    { id: 2, title: 'YouTube', url: 'https://www.youtube.com', icon: 'https://www.youtube.com/favicon.ico' },
    { id: 3, title: 'GitHub', url: 'https://www.github.com', icon: 'https://github.com/favicon.ico' },
    { id: 4, title: 'Wikipedia', url: 'https://www.wikipedia.org', icon: 'https://wikipedia.org/favicon.ico' },
    { id: 5, title: 'Reddit', url: 'https://www.reddit.com', icon: 'https://www.reddit.com/favicon.ico' },
    { id: 6, title: 'Twitter/X', url: 'https://twitter.com', icon: 'https://twitter.com/favicon.ico' },
    { id: 7, title: 'Stack Overflow', url: 'https://stackoverflow.com', icon: 'https://stackoverflow.com/favicon.ico' },
    { id: 8, title: 'MDN Web Docs', url: 'https://developer.mozilla.org', icon: 'https://developer.mozilla.org/favicon.ico' },
    { id: 9, title: 'Netflix', url: 'https://www.netflix.com', icon: 'https://www.netflix.com/favicon.ico' },
    { id: 10, title: 'Amazon', url: 'https://www.amazon.com', icon: 'https://www.amazon.com/favicon.ico' },
    { id: 11, title: 'Discord', url: 'https://discord.com', icon: 'https://discord.com/favicon.ico' },
    { id: 12, title: 'Twitch', url: 'https://www.twitch.tv', icon: 'https://www.twitch.tv/favicon.ico' },
];

const QUICK_SEARCHES = [
    { id: 1, title: 'Search Google', query: '' },
    { id: 2, title: 'Search YouTube', query: '' },
    { id: 3, title: 'Search Wikipedia', query: '' },
    { id: 4, title: 'Search Reddit', query: '' },
];

export default function Browser() {
    const [url, setUrl] = useState('');
    const [displayUrl, setDisplayUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showBookmarks, setShowBookmarks] = useState(true);
    const [bookmarks, setBookmarks] = useState(DEFAULT_BOOKMARKS);
    const [searchQuery, setSearchQuery] = useState('');
    const iframeRef = useRef(null);
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [error, setError] = useState(null);

    const canGoBack = historyIndex > 0;
    const canGoForward = historyIndex < history.length - 1;

    const handleNavigate = (e) => {
        e.preventDefault();
        if (!displayUrl.trim()) return;

        let formattedUrl = displayUrl.trim();

        // Add protocol if missing
        if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
            // Check if it looks like a domain
            if (formattedUrl.includes('.') && !formattedUrl.includes(' ')) {
                formattedUrl = 'https://' + formattedUrl;
            } else {
                // Treat as search query - open in new tab via Google
                formattedUrl = `https://www.google.com/search?q=${encodeURIComponent(formattedUrl)}&igu=1`;
            }
        }

        setUrl(formattedUrl);
        setDisplayUrl(formattedUrl);
        setShowBookmarks(false);
        setError(null);

        // Update history
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(formattedUrl);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    };

    const handleBookmarkClick = (bookmark) => {
        setUrl(bookmark.url);
        setDisplayUrl(bookmark.url);
        setShowBookmarks(false);
        setError(null);

        const newHistory = [...history, bookmark.url];
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&igu=1`;
        setUrl(googleUrl);
        setDisplayUrl(searchQuery);
        setShowBookmarks(false);
        setError(null);

        const newHistory = [...history, googleUrl];
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setSearchQuery('');
    };

    const handleBack = () => {
        if (canGoBack) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            const prevUrl = history[newIndex];
            setUrl(prevUrl);
            setDisplayUrl(prevUrl);
            setShowBookmarks(false);
        }
    };

    const handleForward = () => {
        if (canGoForward) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            const nextUrl = history[newIndex];
            setUrl(nextUrl);
            setDisplayUrl(nextUrl);
            setShowBookmarks(false);
        }
    };

    const handleRefresh = () => {
        if (url) {
            // Add timestamp to bypass cache
            const separator = url.includes('?') ? '&' : '?';
            setUrl(url + separator + '_t=' + Date.now());
            setError(null);
        }
    };

    const handleHome = () => {
        setUrl('');
        setDisplayUrl('');
        setShowBookmarks(true);
        setError(null);
    };

    const handleLoadStart = () => {
        setIsLoading(true);
        setError(null);
    };

    const handleLoadError = () => {
        setIsLoading(false);
        setError('Unable to load this page. The site may be blocking iframe embedding.');
    };

    const handleLoadEnd = () => {
        setIsLoading(false);
    };

    const buttonStyle = {
        padding: '6px',
        borderRadius: '6px',
        border: 'none',
        background: 'transparent',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.15s ease',
    };

    const buttonHoverStyle = {
        background: 'var(--bg-hover)',
        color: 'var(--text-primary)',
    };

    const NavButton = ({ onClick, disabled, children, style = {}, title }) => {
        const [hover, setHover] = React.useState(false);

        return (
            <button
                onClick={onClick}
                disabled={disabled}
                title={title}
                style={{
                    ...buttonStyle,
                    ...(hover && !disabled ? buttonHoverStyle : {}),
                    ...(disabled ? { opacity: 0.4, cursor: 'not-allowed' } : {}),
                    ...style,
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                {children}
            </button>
        );
    };

    // Start Page with Bookmarks
    const renderStartPage = () => (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--bg-surface)',
            overflow: 'auto',
            padding: '32px',
        }}>
            {/* Search Bar */}
            <form onSubmit={handleSearch} style={{ marginBottom: '32px' }}>
                <div style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    background: 'var(--bg-card)',
                    borderRadius: '24px',
                    padding: '12px 20px',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}>
                    <Search size={18} style={{ color: 'var(--text-secondary)', marginRight: '12px' }} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search the web..."
                        style={{
                            flex: 1,
                            border: 'none',
                            background: 'transparent',
                            color: 'var(--text-primary)',
                            fontSize: '16px',
                            outline: 'none',
                        }}
                    />
                </div>
            </form>

            {/* Bookmarks Grid */}
            <div style={{ flex: 1 }}>
                <h3 style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}>
                    <Star size={14} /> Bookmarks
                </h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                    gap: '16px',
                }}>
                    {bookmarks.map((bookmark) => (
                        <button
                            key={bookmark.id}
                            onClick={() => handleBookmarkClick(bookmark)}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '16px 8px',
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                                e.currentTarget.style.borderColor = 'var(--text-secondary)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.borderColor = 'var(--border-color)';
                            }}
                        >
                            <img
                                src={bookmark.icon}
                                alt={bookmark.title}
                                style={{ width: '32px', height: '32px', borderRadius: '8px' }}
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                            <span style={{
                                fontSize: '12px',
                                color: 'var(--text-primary)',
                                textAlign: 'center',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                width: '100%',
                            }}>
                                {bookmark.title}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div style={{
                textAlign: 'center',
                padding: '16px',
                fontSize: '12px',
                color: 'var(--text-secondary)',
            }}>
                Press Enter to search • Click a bookmark to visit
            </div>
        </div>
    );

    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--bg-surface)',
        }}>
            {/* Navigation Bar */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                background: 'var(--bg-card)',
                borderBottom: '1px solid var(--border-color)',
            }}>
                <NavButton onClick={handleBack} disabled={!canGoBack} title="Back">
                    <ChevronLeft size={18} />
                </NavButton>
                <NavButton onClick={handleForward} disabled={!canGoForward} title="Forward">
                    <ChevronRight size={18} />
                </NavButton>
                <NavButton onClick={handleRefresh} disabled={!url} title="Refresh">
                    <RotateCcw size={18} />
                </NavButton>
                <NavButton onClick={handleHome} title="Home">
                    <Home size={18} />
                </NavButton>

                {/* URL Bar */}
                <form onSubmit={handleNavigate} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        background: 'var(--bg-surface)',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        border: '1px solid var(--border-color)',
                    }}>
                        <Globe size={14} style={{ color: 'var(--text-secondary)', marginRight: '8px' }} />
                        <input
                            type="text"
                            value={displayUrl}
                            onChange={(e) => setDisplayUrl(e.target.value)}
                            placeholder="Enter URL or search..."
                            style={{
                                flex: 1,
                                border: 'none',
                                background: 'transparent',
                                color: 'var(--text-primary)',
                                fontSize: '13px',
                                outline: 'none',
                            }}
                        />
                        {isLoading && <Loader2 size={14} style={{ color: 'var(--text-secondary)', animation: 'spin 1s linear infinite' }} />}
                    </div>
                </form>

                {/* Open in New Tab hint */}
                <NavButton
                    onClick={() => window.open(url || 'https://www.google.com', '_blank')}
                    title="Open current page in new tab"
                    style={{ marginLeft: '4px' }}
                >
                    <ExternalLink size={18} />
                </NavButton>
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                {showBookmarks && !url ? (
                    renderStartPage()
                ) : url ? (
                    <>
                        <iframe
                            ref={iframeRef}
                            src={url}
                            title="Browser"
                            style={{
                                width: '100%',
                                height: '100%',
                                border: 'none',
                                background: '#ffffff',
                            }}
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                            onLoadStart={handleLoadStart}
                            onLoad={handleLoadEnd}
                        />

                        {/* Loading Overlay */}
                        {isLoading && (
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'rgba(0,0,0,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                pointerEvents: 'none',
                            }}>
                                <Loader2 size={32} style={{ color: 'var(--text-secondary)', animation: 'spin 1s linear infinite' }} />
                            </div>
                        )}

                        {/* Error Overlay */}
                        {error && (
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'var(--bg-surface)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '16px',
                                padding: '32px',
                                textAlign: 'center',
                            }}>
                                <Globe size={48} style={{ color: 'var(--text-secondary)', opacity: 0.5 }} />
                                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{error}</p>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '12px', opacity: 0.7 }}>
                                    Click the <ExternalLink size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> icon to open in a new tab
                                </p>
                                <button
                                    onClick={handleHome}
                                    style={{
                                        padding: '8px 16px',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '13px',
                                    }}
                                >
                                    Go to Home
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    renderStartPage()
                )}
            </div>

            {/* CSS for spin animation */}
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
