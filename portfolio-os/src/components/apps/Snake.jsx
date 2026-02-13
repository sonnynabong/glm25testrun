import React, { useState, useEffect, useCallback, useRef } from 'react';

export default function Snake() {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [direction, setDirection] = useState('right');
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const gameRef = useRef(null);
    const BOARD_SIZE = 20;

    const generateFood = useCallback(() => {
        const newFood = {
            x: Math.floor(Math.random() * BOARD_SIZE),
            y: Math.floor(Math.random() * BOARD_SIZE)
        };
        // Make sure food doesn't spawn on snake
        const onSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
        if (onSnake) {
            return generateFood();
        }
        return newFood;
    }, [snake]);

    const resetGame = useCallback(() => {
        setSnake([{ x: 10, y: 10 }]);
        setFood({ x: 15, y: 15 });
        setDirection('right');
        setScore(0);
        setGameOver(false);
        setIsPaused(false);
    }, []);

    useEffect(() => {
        if (gameOver || isPaused) return;

        const moveSnake = () => {
            setSnake(prev => {
                const head = prev[0];
                let newHead = { ...head };

                switch (direction) {
                    case 'up':
                        newHead.y = (head.y - 1 + BOARD_SIZE) % BOARD_SIZE;
                        break;
                    case 'down':
                        newHead.y = (head.y + 1) % BOARD_SIZE;
                        break;
                    case 'left':
                        newHead.x = (head.x - 1 + BOARD_SIZE) % BOARD_SIZE;
                        break;
                    case 'right':
                        newHead.x = (head.x + 1) % BOARD_SIZE;
                        break;
                }

                // Check if head hits body
                if (prev.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
                    setGameOver(true);
                    return prev;
                }

                const newSnake = [newHead, ...prev];

                // Check if ate food
                if (newHead.x === food.x && newHead.y === food.y) {
                    setScore(s => s + 10);
                    setFood(generateFood());
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        };

        gameRef.current = setInterval(moveSnake, 150);
        return () => clearInterval(gameRef.current);
    }, [direction, food, gameOver, isPaused, generateFood]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameOver) return;

            if (e.key === ' ') {
                setIsPaused(p => !p);
                return;
            }

            const keyMap = {
                'ArrowUp': 'up',
                'ArrowDown': 'down',
                'ArrowLeft': 'left',
                'ArrowRight': 'right',
                'w': 'up',
                's': 'down',
                'a': 'left',
                'd': 'right'
            };

            const newDir = keyMap[e.key];
            if (!newDir) return;

            // Prevent reversing direction
            const opposites = {
                'up': 'down',
                'down': 'up',
                'left': 'right',
                'right': 'left'
            };

            if (opposites[newDir] !== direction) {
                setDirection(newDir);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [direction, gameOver]);

    return (
        <div className="app-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: '12px',
                padding: '8px 16px',
                background: 'var(--bg-card)',
                borderRadius: '8px',
                border: '1px solid var(--border-light)'
            }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: 'var(--text-primary)' }}>
                    Score: <span style={{ color: 'var(--accent-primary)' }}>{score}</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {isPaused ? 'PAUSED' : gameOver ? 'GAME OVER' : 'Press SPACE to pause'}
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${BOARD_SIZE}, 18px)`,
                gridTemplateRows: `repeat(${BOARD_SIZE}, 18px)`,
                gap: '1px',
                background: 'var(--bg-surface)',
                padding: '4px',
                borderRadius: '8px',
                border: '1px solid var(--border-light)'
            }}>
                {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, i) => {
                    const x = i % BOARD_SIZE;
                    const y = Math.floor(i / BOARD_SIZE);

                    const isSnake = snake.some(s => s.x === x && s.y === y);
                    const isHead = snake[0]?.x === x && snake[0]?.y === y;
                    const isFood = food.x === x && food.y === y;

                    return (
                        <div
                            key={i}
                            style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: isSnake ? '3px' : '0',
                                background: isHead
                                    ? 'var(--accent-primary)'
                                    : isSnake
                                        ? 'var(--text-primary)'
                                        : isFood
                                            ? '#57e389'
                                            : 'transparent'
                            }}
                        />
                    );
                })}
            </div>

            <div style={{
                marginTop: '16px',
                display: 'flex',
                gap: '8px'
            }}>
                <button
                    onClick={resetGame}
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
                    {gameOver ? 'Play Again' : 'Reset'}
                </button>
            </div>

            <div style={{
                marginTop: '16px',
                fontSize: '11px',
                color: 'var(--text-muted)',
                textAlign: 'center'
            }}>
                Use Arrow keys or WASD to move<br />
                SPACE to pause
            </div>
        </div>
    );
}
