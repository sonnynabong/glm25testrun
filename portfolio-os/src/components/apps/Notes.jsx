import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'portfolio-os-notes';

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setNotes(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to load notes:', e);
            }
        } else {
            // Add a welcome note
            setNotes([{
                id: Date.now(),
                title: 'Welcome!',
                content: 'Welcome to Notes!\n\nClick "+" to create a new note.',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }]);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }, [notes]);

    const createNote = () => {
        const newNote = {
            id: Date.now(),
            title: 'Untitled Note',
            content: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setNotes([newNote, ...notes]);
        setSelectedNote(newNote);
        setIsEditing(true);
        setEditTitle(newNote.title);
        setEditContent(newNote.content);
    };

    const updateNote = () => {
        const updatedNotes = notes.map(note =>
            note.id === selectedNote.id
                ? { ...note, title: editTitle, content: editContent, updatedAt: new Date().toISOString() }
                : note
        );
        setNotes(updatedNotes);
        setIsEditing(false);
    };

    const deleteNote = (noteId) => {
        setNotes(notes.filter(note => note.id !== noteId));
        if (selectedNote?.id === noteId) {
            setSelectedNote(null);
        }
    };

    const selectNote = (note) => {
        setSelectedNote(note);
        setEditTitle(note.title);
        setEditContent(note.content);
        setIsEditing(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div style={{ display: 'flex', height: '100%' }}>
            {/* Notes List */}
            <div style={{
                width: '220px',
                borderRight: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                background: 'var(--bg-surface)',
            }}>
                <div style={{
                    padding: '12px',
                    borderBottom: '1px solid var(--border-light)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Notes</span>
                    <button
                        onClick={createNote}
                        style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            border: 'none',
                            background: 'var(--accent-primary)',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        +
                    </button>
                </div>
                <div style={{ flex: 1, overflow: 'auto' }}>
                    {notes.map(note => (
                        <div
                            key={note.id}
                            onClick={() => selectNote(note)}
                            style={{
                                padding: '12px',
                                cursor: 'pointer',
                                background: selectedNote?.id === note.id ? 'var(--bg-hover)' : 'transparent',
                                borderBottom: '1px solid var(--border-light)',
                            }}
                        >
                            <div style={{
                                fontWeight: '500',
                                color: 'var(--text-primary)',
                                marginBottom: '4px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}>
                                {note.title || 'Untitled'}
                            </div>
                            <div style={{
                                fontSize: '11px',
                                color: 'var(--text-secondary)',
                            }}>
                                {formatDate(note.updatedAt)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Note Editor */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {selectedNote ? (
                    <>
                        <div style={{
                            padding: '12px',
                            borderBottom: '1px solid var(--border-light)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            {isEditing ? (
                                <input
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    style={{
                                        flex: 1,
                                        background: 'transparent',
                                        border: 'none',
                                        outline: 'none',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        color: 'var(--text-primary)',
                                    }}
                                    placeholder="Note title"
                                />
                            ) : (
                                <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>
                                    {selectedNote.title}
                                </span>
                            )}
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {isEditing ? (
                                    <button
                                        onClick={updateNote}
                                        style={{
                                            padding: '6px 12px',
                                            borderRadius: '6px',
                                            border: 'none',
                                            background: 'var(--accent-primary)',
                                            color: 'white',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        style={{
                                            padding: '6px 12px',
                                            borderRadius: '6px',
                                            border: 'none',
                                            background: 'var(--bg-hover)',
                                            color: 'var(--text-primary)',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Edit
                                    </button>
                                )}
                                <button
                                    onClick={() => deleteNote(selectedNote.id)}
                                    style={{
                                        padding: '6px 12px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        background: '#e01b24',
                                        color: 'white',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <textarea
                            value={isEditing ? editContent : selectedNote.content}
                            onChange={(e) => setEditContent(e.target.value)}
                            readOnly={!isEditing}
                            placeholder="Start typing..."
                            style={{
                                flex: 1,
                                padding: '12px',
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                resize: 'none',
                                fontSize: '14px',
                                color: 'var(--text-primary)',
                                fontFamily: 'inherit',
                                lineHeight: '1.6',
                            }}
                        />
                    </>
                ) : (
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-secondary)',
                    }}>
                        Select a note or create a new one
                    </div>
                )}
            </div>
        </div>
    );
}
