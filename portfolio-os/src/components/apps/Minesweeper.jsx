import React, { useState, useEffect, useCallback } from 'react';

const BOARD_SIZE = 9;
const MINES_COUNT = 10;

const CELL_STATES = {
    HIDDEN: 'hidden',
    REVEALED: 'revealed',
    FLAGGED: 'flagged',
    EXPLODED: 'exploded',
};

const COLORS = {
    1: '#3584e4',
    2: '#33d17a',
    3: '#e01b24',
    4: '#9141ac',
    5: '#ff7800',
    6: '#f6d32d',
    7: '#1c71d8',
    8: '#77767b',
};

export default function Minesweeper() {
    const [board, setBoard] = useState([]);
    const [gameState, setGameState] = useState('playing'); // playing, won, lost
    const [flags, setFlags] = useState(0);
    const [time, setTime] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    useEffect(() => {
        initializeBoard();
    }, []);

    useEffect(() => {
        let interval;
        if (isTimerRunning && gameState === 'playing') {
            interval = setInterval(() => setTime(t => t + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, gameState]);

    const initializeBoard = () => {
        // Create empty board
        let newBoard = Array(BOARD_SIZE).fill(null).map(() =>
            Array(BOARD_SIZE).fill(null).map(() => ({
                isMine: false,
                state: CELL_STATES.HIDDEN,
                neighborCount: 0,
            }))
        );

        // Place mines randomly
        let minesPlaced = 0;
        while (minesPlaced < MINES_COUNT) {
            const row = Math.floor(Math.random() * BOARD_SIZE);
            const col = Math.floor(Math.random() * BOARD_SIZE);
            if (!newBoard[row][col].isMine) {
                newBoard[row][col].isMine = true;
                minesPlaced++;
            }
        }

        // Calculate neighbor counts
        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
                if (!newBoard[row][col].isMine) {
                    newBoard[row][col].neighborCount = countNeighbors(newBoard, row, col);
                }
            }
        }

        setBoard(newBoard);
        setGameState('playing');
        setFlags(0);
        setTime(0);
        setIsTimerRunning(false);
    };

    const countNeighbors = (board, row, col) => {
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;
                const nr = row + dr;
                const nc = col + dc;
                if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE && board[nr][nc].isMine) {
                    count++;
                }
            }
        }
        return count;
    };

    const revealCell = useCallback((row, col) => {
        if (gameState !== 'playing') return;
        if (board[row][col].state === CELL_STATES.FLAGGED) return;

        // Start timer on first click
        if (!isTimerRunning) {
            setIsTimerRunning(true);
        }

        const newBoard = board.map(r => r.map(c => ({ ...c })));

        if (newBoard[row][col].isMine) {
            // Game over - exploded
            newBoard[row][col].state = CELL_STATES.EXPLODED;
            // Reveal all mines
            for (let r = 0; r < BOARD_SIZE; r++) {
                for (let c = 0; c < BOARD_SIZE; c++) {
                    if (newBoard[r][c].isMine && newBoard[r][c].state !== CELL_STATES.EXPLODED) {
                        newBoard[r][c].state = CELL_STATES.REVEALED;
                    }
                }
            }
            setBoard(newBoard);
            setGameState('lost');
            setIsTimerRunning(false);
            return;
        }

        // Reveal cell
        const reveal = (r, c) => {
            if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE) return;
            if (newBoard[r][c].state !== CELL_STATES.HIDDEN) return;

            newBoard[r][c].state = CELL_STATES.REVEALED;

            if (newBoard[r][c].neighborCount === 0) {
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        if (dr === 0 && dc === 0) continue;
                        reveal(r + dr, c + dc);
                    }
                }
            }
        };

        reveal(row, col);
        setBoard(newBoard);

        // Check win condition
        let revealedCount = 0;
        for (let r = 0; r < BOARD_SIZE; r++) {
            for (let c = 0; c < BOARD_SIZE; c++) {
                if (newBoard[r][c].state === CELL_STATES.REVEALED) {
                    revealedCount++;
                }
            }
        }
        if (revealedCount === BOARD_SIZE * BOARD_SIZE - MINES_COUNT) {
            setGameState('won');
            setIsTimerRunning(false);
        }
    }, [board, gameState, isTimerRunning]);

    const toggleFlag = useCallback((e, row, col) => {
        e.preventDefault();
        if (gameState !== 'playing') return;

        const newBoard = board.map(r => r.map(c => ({ ...c })));

        if (newBoard[row][col].state === CELL_STATES.HIDDEN) {
            newBoard[row][col].state = CELL_STATES.FLAGGED;
            setFlags(f => f + 1);
        } else if (newBoard[row][col].state === CELL_STATES.FLAGGED) {
            newBoard[row][col].state = CELL_STATES.HIDDEN;
            setFlags(f => f - 1);
        }

        setBoard(newBoard);
    }, [board, gameState]);

    const getCellStyle = (cell) => {
        if (cell.state === CELL_STATES.HIDDEN || cell.state === CELL_STATES.FLAGGED) {
            return {
                background: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
            };
        }
        if (cell.state === CELL_STATES.EXPLODED) {
            return {
                background: '#e01b24',
                border: '1px solid #c01a23',
            };
        }
        return {
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-light)',
        };
    };

    return (
        <div style={{ padding: '16px', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: '16px',
                padding: '12px',
                background: 'var(--bg-card)',
                borderRadius: '8px',
            }}>
                <div style={{
                    fontFamily: 'monospace',
                    fontSize: '24px',
                    color: 'var(--text-primary)',
                    background: 'var(--bg-surface)',
                    padding: '4px 12px',
                    borderRadius: '4px',
                }}>
                    {String(MINES_COUNT - flags).padStart(2, '0')}
                </div>
                <button
                    onClick={initializeBoard}
                    style={{
                        fontSize: '24px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                    }}
                >
                    {gameState === 'won' ? '😎' : gameState === 'lost' ? '😵' : '🙂'}
                </button>
                <div style={{
                    fontFamily: 'monospace',
                    fontSize: '24px',
                    color: 'var(--text-primary)',
                    background: 'var(--bg-surface)',
                    padding: '4px 12px',
                    borderRadius: '4px',
                }}>
                    {String(time).padStart(3, '0')}
                </div>
            </div>

            {/* Game board */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
                gap: '2px',
                background: 'var(--border-light)',
                padding: '4px',
                borderRadius: '4px',
            }}>
                {board.map((row, rowIndex) => (
                    row.map((cell, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            onClick={() => revealCell(rowIndex, colIndex)}
                            onContextMenu={(e) => toggleFlag(e, rowIndex, colIndex)}
                            style={{
                                width: '36px',
                                height: '36px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '18px',
                                fontWeight: '600',
                                cursor: cell.state === CELL_STATES.HIDDEN ? 'pointer' : 'default',
                                borderRadius: '2px',
                                ...getCellStyle(cell),
                            }}
                        >
                            {cell.state === CELL_STATES.FLAGGED && '🚩'}
                            {cell.state === CELL_STATES.REVEALED && !cell.isMine && cell.neighborCount > 0 && (
                                <span style={{ color: COLORS[cell.neighborCount] }}>
                                    {cell.neighborCount}
                                </span>
                            )}
                            {cell.state === CELL_STATES.EXPLODED && '💥'}
                        </div>
                    ))
                ))}
            </div>

            {/* Game over message */}
            {gameState !== 'playing' && (
                <div style={{
                    marginTop: '16px',
                    padding: '12px 24px',
                    background: gameState === 'won' ? '#33d17a' : '#e01b24',
                    color: 'white',
                    borderRadius: '8px',
                    fontWeight: '600',
                }}>
                    {gameState === 'won' ? 'You Won!' : 'Game Over'}
                </div>
            )}

            {/* Instructions */}
            <div style={{
                marginTop: 'auto',
                padding: '12px',
                fontSize: '11px',
                color: 'var(--text-muted)',
                textAlign: 'center',
            }}>
                Left click to reveal • Right click to flag
            </div>
        </div>
    );
}
