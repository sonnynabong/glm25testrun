import React from 'react';
import { ExternalLink, Github, Eye } from 'lucide-react';

export default function ProjectsGallery() {
    const projects = [
        {
            title: 'E-Commerce Platform',
            description: 'A full-featured online store with payment integration, inventory management, and admin dashboard.',
            tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
            image: '🛒'
        },
        {
            title: 'Social Media Dashboard',
            description: 'Real-time analytics dashboard with interactive charts, user management, and reporting features.',
            tags: ['Next.js', 'TypeScript', 'D3.js', 'Tailwind'],
            image: '📊'
        },
        {
            title: 'Task Management App',
            description: 'Collaborative project management tool with Kanban boards, time tracking, and team communication.',
            tags: ['Vue.js', 'Firebase', 'Socket.io'],
            image: '✅'
        },
        {
            title: 'Weather Application',
            description: 'Beautiful weather app with location-based forecasts, interactive maps, and severe weather alerts.',
            tags: ['React', 'OpenWeather API', 'Leaflet'],
            image: '🌤️'
        },
        {
            title: 'Blog Platform',
            description: 'Content management system with markdown support, SEO optimization, and custom themes.',
            tags: ['Astro', 'Markdown', 'Tailwind'],
            image: '📝'
        },
        {
            title: 'Real-time Chat',
            description: 'End-to-end encrypted messaging app with group chats, file sharing, and video calls.',
            tags: ['React', 'WebRTC', 'Socket.io', 'MongoDB'],
            image: '💬'
        }
    ];

    return (
        <div className="app-content">
            <div className="app-header">
                <h1 className="app-title">Projects Gallery</h1>
                <p className="app-subtitle">A showcase of my recent work</p>
            </div>

            <div className="projects-grid">
                {projects.map((project, index) => (
                    <div key={index} className="project-card">
                        <div className="project-thumbnail">
                            <span style={{ fontSize: '48px' }}>{project.image}</span>
                        </div>
                        <div className="project-info">
                            <h4 className="project-title">{project.title}</h4>
                            <p className="project-description">{project.description}</p>
                            <div className="project-tags">
                                {project.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className="project-tag">{tag}</span>
                                ))}
                            </div>
                            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                                <button style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    padding: '6px 12px',
                                    background: 'rgba(0, 255, 255, 0.1)',
                                    border: '1px solid var(--neon-cyan)',
                                    borderRadius: '6px',
                                    color: 'var(--neon-cyan)',
                                    fontSize: '11px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}>
                                    <Eye size={12} />
                                    View
                                </button>
                                <button style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    padding: '6px 12px',
                                    background: 'rgba(255, 0, 255, 0.1)',
                                    border: '1px solid var(--neon-magenta)',
                                    borderRadius: '6px',
                                    color: 'var(--neon-magenta)',
                                    fontSize: '11px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}>
                                    <Github size={12} />
                                    Code
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="app-section">
                <h3 className="app-section-title">Project Stats</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    {[
                        { label: 'Total Projects', value: '20+' },
                        { label: 'Happy Clients', value: '15+' },
                        { label: 'Years Experience', value: '5+' }
                    ].map((stat, index) => (
                        <div key={index} style={{
                            background: 'var(--bg-card)',
                            padding: '20px',
                            borderRadius: '12px',
                            border: '1px solid var(--glass-border)',
                            textAlign: 'center'
                        }}>
                            <div style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '28px',
                                fontWeight: '700',
                                color: 'var(--neon-cyan)',
                                marginBottom: '4px'
                            }}>
                                {stat.value}
                            </div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
