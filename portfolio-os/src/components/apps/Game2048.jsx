import React, { useState, useEffect, useCallback } from 'react';

export default function Game2048() {
    const [board, setBoard] = useState([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);

    const initializeBoard = useCallback(() => {
        let newBoard = Array(4).fill(null).map(() => Array(4).fill(0));
        newBoard = addRandomTile(newBoard);
        newBoard = addRandomTile(newBoard);
        setBoard(newBoard);
        setScore(0);
        setGameOver(false);
        setWon(false);
    }, []);

    useEffect(() => {
        initializeBoard();
        const saved = localStorage.getItem('2048-best');
        if (saved) setBestScore(parseInt(saved));
    }, [initializeBoard]);

    const addRandomTile = (board) => {
        const emptyTiles = [];
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (board[r][c] === 0) {
                    emptyTiles.push({ r, c });
                }
            }
        }
        if (emptyTiles.length === 0) return board;

        const { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[r][c] = Math.random() < 0.9 ? 2 : 4;
        return [...board];
    };

    const moveLeft = (board) => {
        let newBoard = [];
        let points = 0;

        for (let r = 0; r < 4; r++) {
            let row = board[r].filter(x => x !== 0);
            let newRow = [];

            for (let i = 0; i < row.length; i++) {
                if (row[i] === row[i + 1]) {
                    newRow.push(row[i] * 2);
                    points += row[i] * 2;
                    i++;
                } else {
                    newRow.push(row[i]);
                }
            }

            while (newRow.length < 4) {
                newRow.push(0);
            }
            newBoard.push(newRow);
        }

        return { board: newBoard, points };
    };

    const rotateLeft = (board) => {
        let newBoard = Array(4).fill(null).map(() => Array(4).fill(0));
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                newBoard[r][c] = board[c][3 - r];
            }
        }
        return newBoard;
    };

    const rotateRight = (board) => {
        let newBoard = Array(4).fill(null).map(() => Array(4).fill(0));
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                newBoard[r][c] = board[3 - c][r];
            }
        }
        return newBoard;
    };

    const move = useCallback((direction) => {
        if (gameOver || won) return;

        setBoard(prev => {
            let rotated = [...prev.map(row => [...row])];

            if (direction === 'left') {
                // Already in correct orientation
            } else if (direction === 'right') {
                rotated = rotated.map(row => row.reverse());
            } else if (direction === 'up') {
                rotated = rotateRight(rotated);
            } else if (direction === 'down') {
                rotated = rotateLeft(rotated);
            }

            const { board: moved, points } = moveLeft(rotated);

            let final = moved;
            if (direction === 'right') {
                final = final.map(row => row.reverse());
            } else if (direction === 'up') {
                final = rotateLeft(final);
            } else if (direction === 'down') {
                final = rotateRight(final);
            }

            if (JSON.stringify(final) !== JSON.stringify(prev)) {
                const newBoard = addRandomTile(final);
                setScore(s => {
                    const newScore = s + points;
                    if (newScore > bestScore) {
                        setBestScore(newScore);
                        localStorage.setItem('2048-best', newScore.toString());
                    }
                    return newScore;
                });

                // Check for 2048 (win)
                if (!won && newBoard.some(row => row.includes(2048))) {
                    setWon(true);
                }

                // Check game over
                if (isGameOver(newBoard)) {
                    setGameOver(true);
                }

                return newBoard;
            }

            return prev;
        });
    }, [gameOver, won, bestScore]);

    const isGameOver = (board) => {
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (board[r][c] === 0) return false;
                if (c < 3 && board[r][c] === board[r][c + 1]) return false;
                if (r < 3 && board[r][c] === board[r + 1][c]) return false;
            }
        }
        return true;
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            const keyMap = {
                'ArrowLeft': 'left',
                'ArrowRight': 'right',
                'ArrowUp': 'up',
                'ArrowDown': 'down'
            };

            if (keyMap[e.key]) {
                e.preventDefault();
                move(keyMap[e.key]);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [move]);

    const getTileColor = (value) => {
        const colors = {
            0: 'var(--bg-surface)',
            2: '#eee4da',
            4: '#ede0c8',
            8: '#f2b179',
            16: '#f59563',
            32: '#f67c5f',
            64: '#f65e3b',
            128: '#edcf72',
            256: '#edcc61',
            512: '#edc850',
            1024: '#edc53f',
            2048: '#edc22e'
        };
        return colors[value] || '#3c3a32';
    };

    const getTextColor = (value) => {
        return value <= 4 ? '#776e65' : '#f9f6f2';
    };

    return (
        <div className="app-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: '12px',
                gap: '8px'
            }}>
                <div style={{
                    padding: '8px 16px',
                    background: 'var(--bg-card)',
                    borderRadius: '8px',
                    border: '1px solid var(--border-light)',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Score</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--text-primary)' }}>{score}</div>
                </div>
                <div style={{
                    padding: '8px 16px',
                    background: 'var(--bg-card)',
                    borderRadius: '8px',
                    border: '1px solid var(--border-light)',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Best</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--accent-primary)' }}>{bestScore}</div>
                </div>
            </div>

            {gameOver && (
                <div style={{
                    marginBottom: '12px',
                    padding: '8px 16px',
                    background: '#f66151',
                    borderRadius: '6px',
                    color: 'white',
                    fontSize: '13px',
                    fontWeight: '600'
                }}>
                    Game Over!
                </div>
            )}

            {won && !gameOver && (
                <div style={{
                    marginBottom: '12px',
                    padding: '8px 16px',
                    background: '#57e389',
                    borderRadius: '6px',
                    color: 'var(--bg-deep)',
                    fontSize: '13px',
                    fontWeight: '600'
                }}>
                    🎉 You reached 2048! Keep playing...
                </div>
            )}

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '8px',
                padding: '8px',
                background: 'var(--bg-surface)',
                borderRadius: '8px',
                border: '1px solid var(--border-light)'
            }}>
                {board.map((row, r) =>
                    row.map((cell, c) => (
                        <div
                            key={`${r}-${c}`}
                            style={{
                                width: '65px',
                                height: '65px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: getTileColor(cell),
                                borderRadius: '6px',
                                fontFamily: 'var(--font-display)',
                                fontSize: cell > 100 ? '18px' : '22px',
                                fontWeight: '700',
                                color: getTextColor(cell)
                            }}
                        >
                            {cell !== 0 ? cell : ''}
                        </div>
                    ))
                )}
            </div>

            <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                <button
                    onClick={initializeBoard}
                    style={{
                        padding: '8px 20px',
                        background: 'var(--accent-primary)',
                        border: 'none',
                        borderRadius: '6px',
                        color: 'white',
                        fontSize: '12px',
                        fontFamily: 'var(--font-display)',
                        cursor: 'pointer'
                    }}
                >
                    New Game
                </button>
            </div>

            <div style={{
                marginTop: '12px',
                fontSize: '11px',
                color: 'var(--text-muted)',
                textAlign: 'center'
            }}>
                Use arrow keys to move tiles
            </div>
        </div>
    );
}
