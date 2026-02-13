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
                            <span style={{ fontSize: '32px' }}>{project.image}</span>
                        </div>
                        <div className="project-info">
                            <h4 className="project-title">{project.title}</h4>
                            <p className="project-description">{project.description}</p>
                            <div className="project-tags">
                                {project.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className="project-tag">{tag}</span>
                                ))}
                            </div>
                            <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                                <button style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    padding: '5px 10px',
                                    background: 'var(--bg-surface)',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: '4px',
                                    color: 'var(--text-secondary)',
                                    fontSize: '10px',
                                    cursor: 'pointer'
                                }}>
                                    <Eye size={10} />
                                    View
                                </button>
                                <button style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    padding: '5px 10px',
                                    background: 'var(--bg-surface)',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: '4px',
                                    color: 'var(--text-secondary)',
                                    fontSize: '10px',
                                    cursor: 'pointer'
                                }}>
                                    <Github size={10} />
                                    Code
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="app-section" style={{ marginTop: '20px' }}>
                <h3 className="app-section-title">Project Stats</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    {[
                        { label: 'Total Projects', value: '20+' },
                        { label: 'Happy Clients', value: '15+' },
                        { label: 'Years Experience', value: '5+' }
                    ].map((stat, index) => (
                        <div key={index} style={{
                            background: 'var(--bg-card)',
                            padding: '16px',
                            borderRadius: '8px',
                            border: '1px solid var(--border-light)',
                            textAlign: 'center'
                        }}>
                            <div style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '22px',
                                fontWeight: '600',
                                color: 'var(--text-primary)',
                                marginBottom: '2px'
                            }}>
                                {stat.value}
                            </div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
