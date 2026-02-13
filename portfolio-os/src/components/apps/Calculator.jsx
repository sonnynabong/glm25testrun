import React, { useState } from 'react';

export default function Calculator() {
    const [display, setDisplay] = useState('0');
    const [previousValue, setPreviousValue] = useState(null);
    const [operation, setOperation] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const inputDigit = (digit) => {
        if (waitingForOperand) {
            setDisplay(digit);
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? digit : display + digit);
        }
    };

    const inputDecimal = () => {
        if (waitingForOperand) {
            setDisplay('0.');
            setWaitingForOperand(false);
        } else if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    };

    const clear = () => {
        setDisplay('0');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(false);
    };

    const toggleSign = () => {
        setDisplay(String(-parseFloat(display)));
    };

    const percentage = () => {
        setDisplay(String(parseFloat(display) / 100));
    };

    const performOperation = (nextOperation) => {
        const inputValue = parseFloat(display);

        if (previousValue === null) {
            setPreviousValue(inputValue);
        } else if (operation) {
            const currentValue = previousValue || 0;
            let result;

            switch (operation) {
                case '+':
                    result = currentValue + inputValue;
                    break;
                case '-':
                    result = currentValue - inputValue;
                    break;
                case '×':
                    result = currentValue * inputValue;
                    break;
                case '÷':
                    result = currentValue / inputValue;
                    break;
                case '%':
                    result = currentValue % inputValue;
                    break;
                default:
                    result = inputValue;
            }

            setDisplay(String(result));
            setPreviousValue(result);
        }

        setWaitingForOperand(true);
        setOperation(nextOperation);
    };

    const calculate = () => {
        if (!operation || previousValue === null) return;

        const inputValue = parseFloat(display);
        let result;

        switch (operation) {
            case '+':
                result = previousValue + inputValue;
                break;
            case '-':
                result = previousValue - inputValue;
                break;
            case '×':
                result = previousValue * inputValue;
                break;
            case '÷':
                result = previousValue / inputValue;
                break;
            case '%':
                result = previousValue % inputValue;
                break;
            default:
                result = inputValue;
        }

        setDisplay(String(result));
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(true);
    };

    const Button = ({ onClick, className, children }) => (
        <button
            onClick={onClick}
            className={`calc-btn ${className}`}
            style={{
                padding: '16px',
                fontSize: '18px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => e.target.style.background = 'var(--bg-hover)'}
            onMouseLeave={(e) => e.target.style.background = 'var(--bg-card)'}
        >
            {children}
        </button>
    );

    return (
        <div style={{ padding: '16px', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div
                style={{
                    background: 'var(--bg-surface)',
                    padding: '20px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    textAlign: 'right',
                }}
            >
                <div
                    style={{
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                        marginBottom: '4px',
                        minHeight: '20px',
                    }}
                >
                    {previousValue} {operation}
                </div>
                <div
                    style={{
                        fontSize: '32px',
                        fontWeight: '500',
                        color: 'var(--text-primary)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {display}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', flex: 1 }}>
                <Button onClick={clear} className="function">AC</Button>
                <Button onClick={toggleSign} className="function">±</Button>
                <Button onClick={percentage} className="function">%</Button>
                <Button onClick={() => performOperation('÷')} className="operator">÷</Button>

                <Button onClick={() => inputDigit('7')}>7</Button>
                <Button onClick={() => inputDigit('8')}>8</Button>
                <Button onClick={() => inputDigit('9')}>9</Button>
                <Button onClick={() => performOperation('×')} className="operator">×</Button>

                <Button onClick={() => inputDigit('4')}>4</Button>
                <Button onClick={() => inputDigit('5')}>5</Button>
                <Button onClick={() => inputDigit('6')}>6</Button>
                <Button onClick={() => performOperation('-')} className="operator">−</Button>

                <Button onClick={() => inputDigit('1')}>1</Button>
                <Button onClick={() => inputDigit('2')}>2</Button>
                <Button onClick={() => inputDigit('3')}>3</Button>
                <Button onClick={() => performOperation('+')} className="operator">+</Button>

                <Button
                    onClick={() => inputDigit('0')}
                    className="zero"
                    style={{ gridColumn: 'span 2' }}
                >
                    0
                </Button>
                <Button onClick={inputDecimal}>.</Button>
                <Button onClick={calculate} className="operator">=</Button>
            </div>
        </div>
    );
}
