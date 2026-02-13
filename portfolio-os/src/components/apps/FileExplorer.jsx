import React, { useState } from 'react';
import { Folder, FileText, Image, Code, File, FileVideo, FileAudio, Download } from 'lucide-react';

const mockFiles = {
    'Documents': {
        type: 'folder',
        items: [
            { name: 'Resume.pdf', type: 'file', size: '2.4 MB', modified: '2024-01-15' },
            { name: 'Cover Letter.docx', type: 'file', size: '156 KB', modified: '2024-01-10' },
            { name: 'Notes.txt', type: 'file', size: '12 KB', modified: '2024-01-20' },
        ]
    },
    'Projects': {
        type: 'folder',
        items: [
            { name: 'portfolio-os', type: 'folder', size: '-', modified: '2024-01-18' },
            { name: 'react-app', type: 'folder', size: '-', modified: '2024-01-12' },
            { name: 'python-scripts', type: 'folder', size: '-', modified: '2024-01-08' },
        ]
    },
    'Images': {
        type: 'folder',
        items: [
            { name: 'profile.jpg', type: 'file', size: '2.1 MB', modified: '2024-01-05' },
            { name: 'screenshot.png', type: 'file', size: '890 KB', modified: '2024-01-14' },
            { name: 'banner.svg', type: 'file', size: '45 KB', modified: '2024-01-02' },
        ]
    },
    'Downloads': {
        type: 'folder',
        items: [
            { name: 'book.pdf', type: 'file', size: '15.2 MB', modified: '2024-01-19' },
            { name: 'music.mp3', type: 'file', size: '8.4 MB', modified: '2024-01-17' },
        ]
    },
};

const rootFiles = [
    { name: 'Documents', type: 'folder', size: '-', modified: '2024-01-15' },
    { name: 'Projects', type: 'folder', size: '-', modified: '2024-01-18' },
    { name: 'Images', type: 'folder', size: '-', modified: '2024-01-14' },
    { name: 'Downloads', type: 'folder', size: '-', modified: '2024-01-19' },
    { name: 'readme.txt', type: 'file', size: '2 KB', modified: '2024-01-01' },
    { name: 'notes.md', type: 'file', size: '8 KB', modified: '2024-01-20' },
];

const getFileIcon = (item) => {
    if (item.type === 'folder') return Folder;
    const ext = item.name.split('.').pop().toLowerCase();
    switch (ext) {
        case 'txt':
        case 'md':
            return FileText;
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'svg':
            return Image;
        case 'js':
        case 'ts':
        case 'jsx':
        case 'tsx':
        case 'py':
        case 'html':
        case 'css':
            return Code;
        case 'mp4':
        case 'avi':
        case 'mov':
            return FileVideo;
        case 'mp3':
        case 'wav':
        case 'flac':
            return FileAudio;
        case 'pdf':
        case 'doc':
        case 'docx':
        case 'zip':
        case 'rar':
            return File;
        default:
            return File;
    }
};

export default function FileExplorer() {
    const [currentPath, setCurrentPath] = useState(['Home']);
    const [selectedItem, setSelectedItem] = useState(null);
    const [viewMode, setViewMode] = useState('grid');

    const getCurrentFiles = () => {
        if (currentPath.length === 1) {
            return rootFiles;
        }
        const folderName = currentPath[currentPath.length - 1];
        const folder = mockFiles[folderName];
        return folder ? folder.items : [];
    };

    const navigateTo = (item) => {
        if (item.type === 'folder') {
            setCurrentPath([...currentPath, item.name]);
            setSelectedItem(null);
        } else {
            setSelectedItem(item);
        }
    };

    const goBack = () => {
        if (currentPath.length > 1) {
            setCurrentPath(currentPath.slice(0, -1));
            setSelectedItem(null);
        }
    };

    const goHome = () => {
        setCurrentPath(['Home']);
        setSelectedItem(null);
    };

    const files = getCurrentFiles();

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Toolbar */}
            <div style={{
                padding: '8px 12px',
                borderBottom: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--bg-surface)',
            }}>
                <button
                    onClick={goBack}
                    disabled={currentPath.length === 1}
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        border: 'none',
                        background: currentPath.length === 1 ? 'transparent' : 'var(--bg-hover)',
                        color: currentPath.length === 1 ? 'var(--text-muted)' : 'var(--text-primary)',
                        cursor: currentPath.length === 1 ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    title="Back"
                >
                    ‹
                </button>
                <button
                    onClick={goHome}
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
                    title="Home"
                >
                    ⌂
                </button>

                {/* Breadcrumb */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 12px',
                    background: 'var(--bg-card)',
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    overflow: 'hidden',
                }}>
                    {currentPath.map((segment, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && <span style={{ margin: '0 4px' }}>/</span>}
                            <span
                                onClick={() => setCurrentPath(currentPath.slice(0, index + 1))}
                                style={{
                                    cursor: 'pointer',
                                    color: index === currentPath.length - 1 ? 'var(--text-primary)' : 'inherit',
                                }}
                            >
                                {segment}
                            </span>
                        </React.Fragment>
                    ))}
                </div>

                {/* View toggle */}
                <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                        onClick={() => setViewMode('grid')}
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            border: 'none',
                            background: viewMode === 'grid' ? 'var(--accent-primary)' : 'var(--bg-hover)',
                            color: viewMode === 'grid' ? 'white' : 'var(--text-primary)',
                            cursor: 'pointer',
                        }}
                    >
                        ⊞
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            border: 'none',
                            background: viewMode === 'list' ? 'var(--accent-primary)' : 'var(--bg-hover)',
                            color: viewMode === 'list' ? 'white' : 'var(--text-primary)',
                            cursor: 'pointer',
                        }}
                    >
                        ≡
                    </button>
                </div>
            </div>

            {/* File content */}
            <div style={{ flex: 1, padding: '12px', overflow: 'auto' }}>
                {viewMode === 'grid' ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
                        gap: '8px',
                    }}>
                        {files.map((item, index) => {
                            const Icon = getFileIcon(item);
                            return (
                                <div
                                    key={index}
                                    onClick={() => navigateTo(item)}
                                    onDoubleClick={() => item.type === 'folder' && navigateTo(item)}
                                    style={{
                                        padding: '12px 8px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        background: selectedItem?.name === item.name ? 'var(--bg-hover)' : 'transparent',
                                        textAlign: 'center',
                                        transition: 'background 0.15s ease',
                                    }}
                                >
                                    <div style={{ marginBottom: '8px', color: item.type === 'folder' ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                                        <Icon size={32} />
                                    </div>
                                    <div style={{
                                        fontSize: '11px',
                                        color: 'var(--text-primary)',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        {item.name}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div>
                        {/* List header */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '2fr 100px 120px',
                            padding: '8px 12px',
                            fontSize: '11px',
                            fontWeight: '600',
                            color: 'var(--text-muted)',
                            borderBottom: '1px solid var(--border-light)',
                        }}>
                            <div>Name</div>
                            <div>Size</div>
                            <div>Modified</div>
                        </div>
                        {files.map((item, index) => {
                            const Icon = getFileIcon(item);
                            return (
                                <div
                                    key={index}
                                    onClick={() => setSelectedItem(item)}
                                    onDoubleClick={() => navigateTo(item)}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '2fr 100px 120px',
                                        padding: '10px 12px',
                                        fontSize: '13px',
                                        cursor: 'pointer',
                                        background: selectedItem?.name === item.name ? 'var(--bg-hover)' : 'transparent',
                                        borderBottom: '1px solid var(--border-light)',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                                        <Icon size={18} style={{ color: item.type === 'folder' ? 'var(--accent-primary)' : 'var(--text-secondary)', flexShrink: 0 }} />
                                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {item.name}
                                        </span>
                                    </div>
                                    <div style={{ color: 'var(--text-secondary)' }}>{item.size}</div>
                                    <div style={{ color: 'var(--text-secondary)' }}>{item.modified}</div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Status bar */}
            <div style={{
                padding: '6px 12px',
                borderTop: '1px solid var(--border-light)',
                fontSize: '11px',
                color: 'var(--text-muted)',
                background: 'var(--bg-surface)',
            }}>
                {files.length} items
                {selectedItem && selectedItem.type === 'file' && ` • ${selectedItem.size}`}
            </div>
        </div>
    );
}
