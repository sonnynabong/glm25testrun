import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function Pong() {
    const canvasRef = useRef(null);
    const [score, setScore] = useState({ player: 0, ai: 0 });
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const gameRef = useRef(null);
    const aiRef = useRef({ y: 150 });
    const ballRef = useRef({ x: 200, y: 175, dx: 4, dy: 2 });
    const paddleRef = useRef({ y: 150 });

    const PADDLE_HEIGHT = 60;
    const PADDLE_WIDTH = 10;
    const CANVAS_WIDTH = 400;
    const CANVAS_HEIGHT = 350;
    const WINNING_SCORE = 5;

    const resetGame = useCallback(() => {
        setScore({ player: 0, ai: 0 });
        setGameStarted(false);
        setGameOver(false);
        ballRef.current = { x: 200, y: 175, dx: 4, dy: 2 };
        paddleRef.current = { y: 150 };
        aiRef.current = { y: 150 };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const drawPaddle = (x, y, color) => {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, PADDLE_WIDTH, PADDLE_HEIGHT);
        };

        const drawBall = (x, y) => {
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fillStyle = '#57e389';
            ctx.fill();
            ctx.closePath();
        };

        const drawNet = () => {
            ctx.strokeStyle = 'var(--border-light)';
            ctx.setLineDash([10, 10]);
            ctx.beginPath();
            ctx.moveTo(CANVAS_WIDTH / 2, 0);
            ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
            ctx.stroke();
            ctx.setLineDash([]);
        };

        const gameLoop = () => {
            // Clear canvas
            ctx.fillStyle = 'var(--bg-surface)';
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            // Draw net
            drawNet();

            if (gameStarted && !gameOver) {
                const ball = ballRef.current;
                const paddle = paddleRef.current;
                const ai = aiRef.current;

                // Move ball
                ball.x += ball.dx;
                ball.y += ball.dy;

                // Bounce off top/bottom
                if (ball.y <= 8 || ball.y >= CANVAS_HEIGHT - 8) {
                    ball.dy *= -1;
                }

                // Paddle collision (player)
                if (ball.x <= PADDLE_WIDTH + 10 &&
                    ball.y >= paddle.y &&
                    ball.y <= paddle.y + PADDLE_HEIGHT) {
                    ball.dx = Math.abs(ball.dx) * 1.05;
                    const hitPoint = (ball.y - paddle.y) / PADDLE_HEIGHT;
                    ball.dy = (hitPoint - 0.5) * 6;
                }

                // Paddle collision (AI)
                if (ball.x >= CANVAS_WIDTH - PADDLE_WIDTH - 10 &&
                    ball.y >= ai.y &&
                    ball.y <= ai.y + PADDLE_HEIGHT) {
                    ball.dx = -Math.abs(ball.dx) * 1.05;
                    const hitPoint = (ball.y - ai.y) / PADDLE_HEIGHT;
                    ball.dy = (hitPoint - 0.5) * 6;
                }

                // AI movement
                const aiCenter = ai.y + PADDLE_HEIGHT / 2;
                if (aiCenter < ball.y - 10) {
                    ai.y += 3;
                } else if (aiCenter > ball.y + 10) {
                    ai.y -= 3;
                }
                ai.y = Math.max(0, Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, ai.y));

                // Score
                if (ball.x < 0) {
                    setScore(s => ({ ...s, ai: s.ai + 1 }));
                    ball.x = CANVAS_WIDTH / 2;
                    ball.y = CANVAS_HEIGHT / 2;
                    ball.dx = -4;
                    ball.dy = 2;
                } else if (ball.x > CANVAS_WIDTH) {
                    setScore(s => ({ ...s, player: s.player + 1 }));
                    ball.x = CANVAS_WIDTH / 2;
                    ball.y = CANVAS_HEIGHT / 2;
                    ball.dx = 4;
                    ball.dy = 2;
                }

                // Check win
                if (score.player >= WINNING_SCORE || score.ai >= WINNING_SCORE) {
                    setGameOver(true);
                }

                // Draw ball
                drawBall(ball.x, ball.y);
            }

            // Draw paddles
            drawPaddle(10, paddle.y, 'var(--text-primary)');
            drawPaddle(CANVAS_WIDTH - PADDLE_WIDTH - 10, ai.y, 'var(--accent-primary)');

            gameRef.current = requestAnimationFrame(gameLoop);
        };

        gameRef.current = requestAnimationFrame(gameLoop);

        return () => {
            if (gameRef.current) {
                cancelAnimationFrame(gameRef.current);
            }
        };
    }, [gameStarted, gameOver, score]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!gameStarted || gameOver) return;

            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();
            const mouseY = e.clientY - rect.top;

            paddleRef.current.y = Math.max(0, Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, mouseY - PADDLE_HEIGHT / 2));
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [gameStarted, gameOver]);

    return (
        <div className="app-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: '12px',
                padding: '10px 16px',
                background: 'var(--bg-card)',
                borderRadius: '8px',
                border: '1px solid var(--border-light)'
            }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: 'var(--text-primary)' }}>
                    <span style={{ color: 'var(--accent-primary)' }}>{score.player}</span>
                    <span style={{ color: 'var(--text-muted)' }}> - </span>
                    <span style={{ color: 'var(--accent-primary)' }}>{score.ai}</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    First to {WINNING_SCORE} wins!
                </div>
            </div>

            <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                style={{
                    background: 'var(--bg-surface)',
                    borderRadius: '8px',
                    border: '1px solid var(--border-light)',
                    cursor: 'none'
                }}
            />

            <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                {!gameStarted && (
                    <button
                        onClick={() => setGameStarted(true)}
                        style={{
                            padding: '10px 24px',
                            background: 'var(--accent-primary)',
                            border: 'none',
                            borderRadius: '6px',
                            color: 'white',
                            fontSize: '13px',
                            fontFamily: 'var(--font-display)',
                            cursor: 'pointer'
                        }}
                    >
                        Start Game
                    </button>
                )}
                <button
                    onClick={resetGame}
                    style={{
                        padding: '10px 20px',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-light)',
                        borderRadius: '6px',
                        color: 'var(--text-primary)',
                        fontSize: '12px',
                        fontFamily: 'var(--font-display)',
                        cursor: 'pointer'
                    }}
                >
                    {gameOver ? 'Play Again' : 'Reset'}
                </button>
            </div>

            <div style={{
                marginTop: '12px',
                fontSize: '11px',
                color: 'var(--text-muted)',
                textAlign: 'center'
            }}>
                {!gameStarted
                    ? 'Click Start to play'
                    : gameOver
                        ? `${score.player >= WINNING_SCORE ? 'You Won!' : 'AI Won!'}`
                        : 'Move mouse to control paddle'
                }
            </div>
        </div>
    );
}
