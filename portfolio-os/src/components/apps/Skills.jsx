import React from 'react';
import { Code, Database, Palette, Terminal, Box, Cloud } from 'lucide-react';

export default function Skills() {
    const skills = [
        {
            category: 'Frontend',
            icon: <Palette size={16} />,
            items: [
                { name: 'React / Next.js', level: 95 },
                { name: 'TypeScript', level: 90 },
                { name: 'HTML / CSS', level: 95 },
                { name: 'Tailwind CSS', level: 90 },
                { name: 'Vue.js', level: 75 }
            ]
        },
        {
            category: 'Backend',
            icon: <Database size={16} />,
            items: [
                { name: 'Node.js', level: 90 },
                { name: 'Python', level: 85 },
                { name: 'PostgreSQL', level: 85 },
                { name: 'MongoDB', level: 80 },
                { name: 'GraphQL', level: 75 }
            ]
        },
        {
            category: 'DevOps',
            icon: <Cloud size={16} />,
            items: [
                { name: 'Docker', level: 85 },
                { name: 'AWS', level: 80 },
                { name: 'CI/CD', level: 85 },
                { name: 'Kubernetes', level: 70 },
                { name: 'Linux', level: 80 }
            ]
        },
        {
            category: 'Tools',
            icon: <Terminal size={16} />,
            items: [
                { name: 'Git', level: 95 },
                { name: 'VS Code', level: 95 },
                { name: 'Figma', level: 75 },
                { name: 'Webpack', level: 80 },
                { name: 'Vite', level: 90 }
            ]
        }
    ];

    return (
        <div className="app-content">
            <div className="app-header">
                <h1 className="app-title">Skills</h1>
                <p className="app-subtitle">Technical expertise and tools</p>
            </div>

            <div className="skills-grid">
                {skills.map((category, catIndex) => (
                    <div key={catIndex} className="skill-category">
                        <div className="skill-category-title">
                            {category.icon}
                            {category.category}
                        </div>
                        {category.items.map((skill, skillIndex) => (
                            <div key={skillIndex} className="skill-item">
                                <div className="skill-name">
                                    <span>{skill.name}</span>
                                    <span style={{ color: 'var(--neon-cyan)' }}>{skill.level}%</span>
                                </div>
                                <div className="skill-bar">
                                    <div
                                        className="skill-progress"
                                        style={{ width: `${skill.level}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="app-section" style={{ marginTop: '24px' }}>
                <h3 className="app-section-title">Additional Skills</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {[
                        'Agile / Scrum', 'REST APIs', 'Microservices', 'TDD',
                        'System Design', 'UI/UX', 'Performance Optimization',
                        'Accessibility', 'SEO', 'Testing'
                    ].map((skill, index) => (
                        <div key={index} style={{
                            background: 'var(--bg-card)',
                            padding: '8px 14px',
                            borderRadius: '20px',
                            border: '1px solid var(--glass-border)',
                            color: 'var(--text-secondary)',
                            fontSize: '12px'
                        }}>
                            {skill}
                        </div>
                    ))}
                </div>
            </div>

            <div className="app-section">
                <h3 className="app-section-title">Currently Learning</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {['Rust', 'WebAssembly', 'AI/ML'].map((skill, index) => (
                        <div key={index} style={{
                            background: 'rgba(255, 0, 255, 0.1)',
                            padding: '10px 16px',
                            borderRadius: '8px',
                            border: '1px solid var(--neon-magenta)',
                            color: 'var(--neon-magenta)',
                            fontSize: '13px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <Box size={14} />
                            {skill}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
