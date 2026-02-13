import React, { useState, useEffect, useCallback, useRef } from 'react';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const SHAPES = {
    I: { shape: [[1, 1, 1, 1]], color: '#3584e4' },
    O: { shape: [[1, 1], [1, 1]], color: '#f6d32d' },
    T: { shape: [[0, 1, 0], [1, 1, 1]], color: '#9141ac' },
    S: { shape: [[0, 1, 1], [1, 1, 0]], color: '#33d17a' },
    Z: { shape: [[1, 1, 0], [0, 1, 1]], color: '#e01b24' },
    J: { shape: [[1, 0, 0], [1, 1, 1]], color: '#3584e4' },
    L: { shape: [[0, 0, 1], [1, 1, 1]], color: '#ff7800' },
};

const SHAPE_KEYS = Object.keys(SHAPES);

const createEmptyBoard = () => Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0));

const rotateMatrix = (matrix) => {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const rotated = Array(cols).fill(null).map(() => Array(rows).fill(0));
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            rotated[c][rows - 1 - r] = matrix[r][c];
        }
    }
    return rotated;
};

const isValidMove = (board, shape, pos) => {
    for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
            if (shape[r][c]) {
                const newX = pos.x + c;
                const newY = pos.y + r;
                if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
                    return false;
                }
                if (newY >= 0 && board[newY][newX]) {
                    return false;
                }
            }
        }
    }
    return true;
};

export default function Tetris() {
    const [board, setBoard] = useState(createEmptyBoard);
    const [currentPiece, setCurrentPiece] = useState(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [lines, setLines] = useState(0);
    const [gameState, setGameState] = useState('idle');
    const [nextPiece, setNextPiece] = useState(null);
    const gameLoopRef = useRef(null);

    const spawnPiece = useCallback(() => {
        const pieceKey = nextPiece || SHAPE_KEYS[Math.floor(Math.random() * SHAPE_KEYS.length)];
        const nextKey = SHAPE_KEYS[Math.floor(Math.random() * SHAPE_KEYS.length)];
        setNextPiece(nextKey);

        const piece = SHAPES[pieceKey];
        const startX = Math.floor((BOARD_WIDTH - piece.shape[0].length) / 2);

        setCurrentPiece({ ...piece, shape: piece.shape.map(row => [...row]) });
        setPosition({ x: startX, y: 0 });

        // Check for game over
        if (!isValidMove(board, piece.shape, { x: startX, y: 0 })) {
            setGameState('gameover');
            return true;
        }
        return false;
    }, [board, nextPiece]);

    const lockPiece = useCallback(() => {
        if (!currentPiece) return;

        const newBoard = board.map(row => [...row]);

        // Place piece on board
        for (let r = 0; r < currentPiece.shape.length; r++) {
            for (let c = 0; c < currentPiece.shape[r].length; c++) {
                if (currentPiece.shape[r][c]) {
                    const newY = position.y + r;
                    const newX = position.x + c;
                    if (newY >= 0) {
                        newBoard[newY][newX] = currentPiece.color;
                    }
                }
            }
        }

        // Check for completed lines
        let linesCleared = 0;
        for (let r = BOARD_HEIGHT - 1; r >= 0; r--) {
            if (newBoard[r].every(cell => cell !== 0)) {
                newBoard.splice(r, 1);
                newBoard.unshift(Array(BOARD_WIDTH).fill(0));
                linesCleared++;
                r++;
            }
        }

        // Update score
        if (linesCleared > 0) {
            const points = [0, 100, 300, 500, 800];
            setScore(s => s + points[linesCleared] * level);
            setLines(l => l + linesCleared);
            setLevel(l => Math.floor((lines + linesCleared) / 10) + 1);
        }

        setBoard(newBoard);

        // Spawn next piece
        const gameOver = spawnPiece();
        if (gameOver) {
            setGameState('gameover');
        }
    }, [board, currentPiece, position, level, lines, spawnPiece]);

    const movePiece = useCallback((dx, dy) => {
        if (!currentPiece || gameState !== 'playing') return;

        const newPos = { x: position.x + dx, y: position.y + dy };

        if (isValidMove(board, currentPiece.shape, newPos)) {
            setPosition(newPos);
        } else if (dy > 0) {
            lockPiece();
        }
    }, [board, currentPiece, position, gameState, lockPiece]);

    const rotatePiece = useCallback(() => {
        if (!currentPiece || gameState !== 'playing') return;

        const rotated = rotateMatrix(currentPiece.shape);
        if (isValidMove(board, rotated, position)) {
            setCurrentPiece({ ...currentPiece, shape: rotated });
        }
    }, [board, currentPiece, position, gameState]);

    const startGame = useCallback(() => {
        setBoard(createEmptyBoard());
        setScore(0);
        setLevel(1);
        setLines(0);
        setGameState('playing');
        setNextPiece(SHAPE_KEYS[Math.floor(Math.random() * SHAPE_KEYS.length)]);
        setCurrentPiece(null);
        setPosition({ x: 0, y: 0 });
    }, []);

    // Spawn first piece when game starts
    useEffect(() => {
        if (gameState === 'playing' && !currentPiece) {
            const pieceKey = nextPiece || SHAPE_KEYS[Math.floor(Math.random() * SHAPE_KEYS.length)];
            const nextKey = SHAPE_KEYS[Math.floor(Math.random() * SHAPE_KEYS.length)];
            setNextPiece(nextKey);

            const piece = SHAPES[pieceKey];
            const startX = Math.floor((BOARD_WIDTH - piece.shape[0].length) / 2);

            setCurrentPiece({ ...piece, shape: piece.shape.map(row => [...row]) });
            setPosition({ x: startX, y: 0 });
        }
    }, [gameState, currentPiece, nextPiece]);

    // Game loop
    useEffect(() => {
        if (gameState === 'playing' && currentPiece) {
            gameLoopRef.current = setInterval(() => {
                movePiece(0, 1);
            }, Math.max(100, 800 - (level - 1) * 100));
        }
        return () => {
            if (gameLoopRef.current) {
                clearInterval(gameLoopRef.current);
            }
        };
    }, [gameState, currentPiece, level, movePiece]);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameState !== 'playing') return;

            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    movePiece(-1, 0);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    movePiece(1, 0);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    movePiece(0, 1);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    rotatePiece();
                    break;
                case ' ':
                    e.preventDefault();
                    // Hard drop
                    let newY = position.y;
                    while (isValidMove(board, currentPiece.shape, { ...position, y: newY + 1 })) {
                        newY++;
                    }
                    setPosition({ ...position, y: newY });
                    lockPiece();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState, movePiece, rotatePiece, lockPiece, board, currentPiece, position]);

    // Display board with current piece
    const displayBoard = board.map(row => [...row]);
    if (currentPiece && gameState === 'playing') {
        for (let r = 0; r < currentPiece.shape.length; r++) {
            for (let c = 0; c < currentPiece.shape[r].length; c++) {
                if (currentPiece.shape[r][c]) {
                    const newY = position.y + r;
                    const newX = position.x + c;
                    if (newY >= 0 && newY < BOARD_HEIGHT && newX >= 0 && newX < BOARD_WIDTH) {
                        displayBoard[newY][newX] = currentPiece.color;
                    }
                }
            }
        }
    }

    const Cell = ({ color }) => (
        <div
            style={{
                width: '24px',
                height: '24px',
                background: color || 'var(--bg-surface)',
                border: color ? '1px solid rgba(0,0,0,0.2)' : '1px solid var(--border-light)',
                borderRadius: '2px',
            }}
        />
    );

    return (
        <div style={{ padding: '16px', height: '100%', display: 'flex', gap: '16px' }}>
            {/* Game board */}
            <div style={{ position: 'relative' }}>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${BOARD_WIDTH}, 24px)`,
                        gap: '1px',
                        background: 'var(--border-light)',
                        padding: '4px',
                        borderRadius: '4px',
                    }}
                >
                    {displayBoard.map((row, rowIndex) => (
                        row.map((cell, colIndex) => (
                            <Cell key={`${rowIndex}-${colIndex}`} color={cell} />
                        ))
                    ))}
                </div>

                {/* Overlay for game states */}
                {gameState !== 'playing' && (
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0,0,0,0.7)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '4px',
                        }}
                    >
                        {gameState === 'idle' && (
                            <button
                                onClick={startGame}
                                style={{
                                    padding: '12px 24px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    background: 'var(--accent-primary)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                }}
                            >
                                Start Game
                            </button>
                        )}
                        {gameState === 'gameover' && (
                            <>
                                <div style={{ color: 'white', fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>
                                    Game Over
                                </div>
                                <div style={{ color: 'white', fontSize: '16px', marginBottom: '16px' }}>
                                    Score: {score}
                                </div>
                                <button
                                    onClick={startGame}
                                    style={{
                                        padding: '12px 24px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        background: 'var(--accent-primary)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Play Again
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Side panel */}
            <div style={{ width: '120px' }}>
                <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>SCORE</div>
                    <div style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)' }}>{score}</div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>LEVEL</div>
                    <div style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)' }}>{level}</div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>LINES</div>
                    <div style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)' }}>{lines}</div>
                </div>
                <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>NEXT</div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 20px)',
                        gap: '2px',
                        padding: '8px',
                        background: 'var(--bg-card)',
                        borderRadius: '4px',
                    }}>
                        {(() => {
                            const next = nextPiece ? SHAPES[nextPiece] : null;
                            if (!next) return null;
                            const shape = next.shape;
                            const display = Array(4).fill(null).map(() => Array(4).fill(0));
                            shape.forEach((row, r) => {
                                row.forEach((cell, c) => {
                                    if (cell) display[r + 1][c + 1] = next.color;
                                });
                            });
                            return display.flat().map((color, i) => (
                                <Cell key={i} color={color} />
                            ));
                        })()}
                    </div>
                </div>

                {/* Controls */}
                <div style={{ marginTop: '24px', fontSize: '11px', color: 'var(--text-muted)' }}>
                    <div style={{ marginBottom: '4px' }}>↑ Rotate</div>
                    <div style={{ marginBottom: '4px' }}>← → Move</div>
                    <div>↓ Soft Drop</div>
                </div>
            </div>
        </div>
    );
}
