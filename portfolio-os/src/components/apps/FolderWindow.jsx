import React from 'react';
import { FolderOpen, Gamepad2, Puzzle, Music, Hash } from 'lucide-react';

const gameIcons = {
    snake: Gamepad2,
    memory: Puzzle,
    pong: Music,
    '2048': Hash,
};

export default function FolderWindow({ folderTitle, items, onItemClick }) {
    return (
        <div className="folder-window">
            <div className="folder-header">
                <div className="folder-title-bar">
                    <FolderOpen size={18} color="var(--text-primary)" />
                    <span className="folder-title">{folderTitle}</span>
                </div>
            </div>
            <div className="folder-content">
                {items.map((item) => {
                    const IconComponent = item.iconComponent || gameIcons[item.id];
                    return (
                        <div
                            key={item.id}
                            className="folder-item"
                            onClick={() => onItemClick(item.id)}
                        >
                            <div className="folder-item-icon">
                                <IconComponent
                                    size={32}
                                    color="var(--text-primary)"
                                    strokeWidth={1.5}
                                />
                            </div>
                            <span className="folder-item-label">{item.title}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
