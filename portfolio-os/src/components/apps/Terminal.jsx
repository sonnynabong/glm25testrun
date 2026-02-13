import React, { useState, useEffect, useRef } from 'react';

const commands = {
    help: 'Show available commands',
    about: 'About this portfolio OS',
    skills: 'List my technical skills',
    projects: 'Show my projects',
    contact: 'Get contact information',
    date: 'Show current date and time',
    whoami: 'Display current user',
    clear: 'Clear the terminal',
    echo: 'Print text to terminal',
    neofetch: 'System information',
    matrix: 'Enter the matrix (easter egg)',
    sudo: 'Become root (just kidding)',
    ls: 'List directory contents',
    cat: 'Display file contents',
    pwd: 'Print working directory',
    uname: 'System information',
};

const files = {
    'about.txt': 'Hi! I am a passionate developer building amazing things.',
    'skills.txt': 'React, TypeScript, Node.js, Python, Go, Docker, AWS',
    'projects.txt': 'Portfolio OS, Web Apps, Mobile Apps, CLI Tools',
    'contact.txt': 'Email: hello@example.com\nGitHub: github.com/example',
};

export default function Terminal() {
    const [history, setHistory] = useState([
        { type: 'output', content: 'Welcome to Portfolio Terminal v1.0.0' },
        { type: 'output', content: 'Type "help" to see available commands.' },
    ]);
    const [input, setInput] = useState('');
    const [currentDir, setCurrentDir] = useState('~');
    const inputRef = useRef(null);
    const terminalRef = useRef(null);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    const focusInput = () => {
        inputRef.current?.focus();
    };

    const executeCommand = (cmd) => {
        const trimmedCmd = cmd.trim();
        const parts = trimmedCmd.split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1).join(' ');

        let output = [];

        switch (command) {
            case 'help':
                output = Object.entries(commands).map(([cmd, desc]) => 
                    `  ${cmd.padEnd(12)} - ${desc}`
                );
                break;
            case 'about':
                output = ['Portfolio OS - An interactive desktop portfolio experience!'];
                break;
            case 'skills':
                output = ['Technical Skills:', '  - Frontend: React, Vue, TypeScript', '  - Backend: Node.js, Python, Go', '  - DevOps: Docker, AWS, Kubernetes'];
                break;
            case 'projects':
                output = ['Projects:', '  - Portfolio OS (this!)', '  - Web Applications', '  - Mobile Apps'];
                break;
            case 'contact':
                output = ['Contact Information:', '  Email: hello@example.com', '  GitHub: github.com/example'];
                break;
            case 'date':
                output = [new Date().toString()];
                break;
            case 'whoami':
                output = ['visitor'];
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'echo':
                output = [args];
                break;
            case 'neofetch':
                output = [
                    '        ___',
                    '       (_. )',
                    '        /_/',
                    '     ___(   )___',
                    '    /           \\',
                    '   |  Portfolio  |',
                    '    \\         /',
                    '     \\_____/',
                    '',
                    '  OS: Portfolio OS 1.0',
                    '  Host: Browser',
                    '  Kernel: JavaScript',
                    '  Shell: Terminal',
                    '  Resolution: Dynamic',
                    '  Theme: Dark (Adwaita)',
                ];
                break;
            case 'matrix':
                output = ['\u001b[32mWake up, Neo... The matrix has you...\u001b[0m'];
                setTimeout(() => {
                    setHistory(prev => [...prev, { type: 'output', content: 'Follow the white rabbit...' }]);
                }, 1000);
                break;
            case 'sudo':
                output = ['nice try!'];
                break;
            case 'ls':
                output = Object.keys(files);
                break;
            case 'cat':
                if (args && files[args]) {
                    output = [files[args]];
                } else if (!args) {
                    output = ['usage: cat <filename>'];
                } else {
                    output = [`cat: ${args}: No such file`];
                }
                break;
            case 'pwd':
                output = [currentDir];
                break;
            case 'uname':
                output = ['PortfolioOS'];
                break;
            case '':
                break;
            default:
                output = [`command not found: ${command}`];
        }

        setHistory(prev => [
            ...prev,
            { type: 'command', content: `${currentDir}$ ${cmd}` },
            ...output.map(content => ({ type: 'output', content }))
        ]);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            executeCommand(input);
            setInput('');
        }
    };

    return (
        <div
            ref={terminalRef}
            onClick={focusInput}
            style={{
                height: '100%',
                background: '#0d1117',
                color: '#c9d1d9',
                fontFamily: "'Monaco', 'Consolas', monospace",
                fontSize: '13px',
                padding: '12px',
                overflowY: 'auto',
                cursor: 'text',
            }}
        >
            {history.map((item, index) => (
                <div key={index} style={{ marginBottom: '4px' }}>
                    {item.type === 'command' ? (
                        <span style={{ color: '#58a6ff' }}>{item.content}</span>
                    ) : (
                        <span style={{ color: '#c9d1d9', whiteSpace: 'pre-wrap' }}>{item.content}</span>
                    )}
                </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#58a6ff', marginRight: '8px' }}>{currentDir}$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: '#c9d1d9',
                        fontFamily: 'inherit',
                        fontSize: 'inherit',
                    }}
                    autoFocus
                />
            </div>
        </div>
    );
}
