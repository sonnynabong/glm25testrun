import React, { useState, useEffect } from 'react';

const emojis = ['🎮', '🎯', '🎨', '🎭', '🎪', '🎢', '🎡', '🎠'];

export default function MemoryMatch() {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameWon, setGameWon] = useState(false);
    const [isLocked, setIsLocked] = useState(false);

    const shuffleCards = () => {
        const shuffled = [...emojis, ...emojis]
            .sort(() => Math.random() - 0.5)
            .map((emoji, index) => ({
                id: index,
                emoji,
                isFlipped: false,
                isMatched: false
            }));

        setCards(shuffled);
        setFlipped([]);
        setMatched([]);
        setMoves(0);
        setGameWon(false);
        setIsLocked(false);
    };

    useEffect(() => {
        shuffleCards();
    }, []);

    useEffect(() => {
        if (matched.length === emojis.length && matched.length > 0) {
            setGameWon(true);
        }
    }, [matched]);

    const handleCardClick = (index) => {
        if (isLocked) return;
        if (flipped.includes(index)) return;
        if (matched.includes(cards[index].emoji)) return;

        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(m => m + 1);
            setIsLocked(true);

            const [first, second] = newFlipped;
            const firstCard = cards[first];
            const secondCard = cards[second];

            if (firstCard.emoji === secondCard.emoji) {
                setMatched(prev => [...prev, firstCard.emoji]);
                setFlipped([]);
                setIsLocked(false);
            } else {
                setTimeout(() => {
                    setFlipped([]);
                    setIsLocked(false);
                }, 1000);
            }
        }
    };

    return (
        <div className="app-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: '16px',
                padding: '10px 16px',
                background: 'var(--bg-card)',
                borderRadius: '8px',
                border: '1px solid var(--border-light)'
            }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '14px', color: 'var(--text-primary)' }}>
                    Moves: <span style={{ color: 'var(--accent-primary)' }}>{moves}</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {gameWon ? '🎉 You Won!' : 'Find matching pairs'}
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 60px)',
                gap: '8px',
                marginBottom: '16px'
            }}>
                {cards.map((card, index) => {
                    const isFlipped = flipped.includes(index) || matched.includes(card.emoji);
                    return (
                        <div
                            key={index}
                            onClick={() => handleCardClick(index)}
                            style={{
                                width: '60px',
                                height: '60px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '28px',
                                background: isFlipped
                                    ? matched.includes(card.emoji)
                                        ? 'var(--bg-card)'
                                        : 'var(--bg-surface)'
                                    : 'var(--accent-primary)',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                border: matched.includes(card.emoji)
                                    ? '2px solid #57e389'
                                    : '2px solid transparent',
                                transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(0deg)',
                            }}
                        >
                            {isFlipped ? card.emoji : '?'}
                        </div>
                    );
                })}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
                <button
                    onClick={shuffleCards}
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
                    {gameWon ? 'Play Again' : 'Restart'}
                </button>
            </div>

            <div style={{
                marginTop: '16px',
                fontSize: '11px',
                color: 'var(--text-muted)',
                textAlign: 'center'
            }}>
                Click cards to flip and find matching pairs
            </div>
        </div>
    );
}
