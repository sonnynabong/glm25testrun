import React from 'react';
import { ExternalLink, Github, Star, Monitor } from 'lucide-react';

export default function Portfolio() {
    const projects = [
        {
            title: 'E-Commerce Platform',
            subtitle: 'Full-Stack Development',
            description: `Built a comprehensive e-commerce platform serving 10,000+ monthly active users. Implemented secure payment processing with Stripe, real-time inventory management, and an admin dashboard.`,
            tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Docker'],
            stats: { stars: 245, forks: 67, views: 12000 },
            live: true,
            github: true,
            image: '🛒'
        },
        {
            title: 'Social Analytics Dashboard',
            subtitle: 'Data Visualization',
            description: `Developed a real-time analytics dashboard for social media management. Processes millions of data points daily with interactive visualizations.`,
            tech: ['Next.js', 'TypeScript', 'D3.js', 'PostgreSQL', 'AWS'],
            stats: { stars: 189, forks: 43, views: 8500 },
            live: true,
            github: true,
            image: '📊'
        },
        {
            title: 'Healthcare Management System',
            subtitle: 'Enterprise Application',
            description: `Created a HIPAA-compliant healthcare management system for clinics. Streamlines patient records, appointments, and billing processes.`,
            tech: ['Vue.js', 'Python', 'MongoDB', 'Kubernetes', 'AWS'],
            stats: { stars: 312, forks: 89, views: 15000 },
            live: false,
            github: true,
            image: '🏥'
        },
        {
            title: 'Weather Application',
            subtitle: 'Mobile-First Web App',
            description: `Beautiful weather app with location-based forecasts, interactive maps, and severe weather alerts.`,
            tech: ['React', 'OpenWeather API', 'Leaflet', 'PWA'],
            stats: { stars: 156, forks: 34, views: 9800 },
            live: true,
            github: true,
            image: '🌤️'
        },
        {
            title: 'Real-time Chat Application',
            subtitle: 'Communication Platform',
            description: `End-to-end encrypted messaging app with group chats, file sharing, and video calls.`,
            tech: ['React', 'WebRTC', 'Socket.io', 'MongoDB'],
            stats: { stars: 278, forks: 56, views: 11000 },
            live: true,
            github: true,
            image: '💬'
        },
        {
            title: 'Task Management App',
            subtitle: 'Productivity Tool',
            description: `Collaborative project management tool with Kanban boards, time tracking, and team communication.`,
            tech: ['Vue.js', 'Firebase', 'Socket.io', 'Redux'],
            stats: { stars: 203, forks: 45, views: 7500 },
            live: true,
            github: false,
            image: '✅'
        }
    ];

    return (
        <div className="app-content">
            <div className="app-header">
                <h1 className="app-title">Portfolio</h1>
                <p className="app-subtitle">Featured projects and case studies</p>
            </div>

            {/* Stats Overview */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
                <div style={{
                    background: 'var(--bg-card)',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-light)',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '20px', fontFamily: 'var(--font-display)', color: 'var(--text-primary)', fontWeight: '600' }}>20+</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Projects</div>
                </div>
                <div style={{
                    background: 'var(--bg-card)',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-light)',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '20px', fontFamily: 'var(--font-display)', color: 'var(--text-primary)', fontWeight: '600' }}>50+</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Clients</div>
                </div>
                <div style={{
                    background: 'var(--bg-card)',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-light)',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '20px', fontFamily: 'var(--font-display)', color: 'var(--text-primary)', fontWeight: '600' }}>5+</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Years</div>
                </div>
                <div style={{
                    background: 'var(--bg-card)',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-light)',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '20px', fontFamily: 'var(--font-display)', color: 'var(--text-primary)', fontWeight: '600' }}>100%</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Satisfaction</div>
                </div>
            </div>

            {/* Projects List */}
            {projects.map((project, index) => (
                <div key={index} className="app-section" style={{ marginBottom: '20px' }}>
                    <div style={{
                        background: 'var(--bg-card)',
                        borderRadius: '8px',
                        border: '1px solid var(--border-light)',
                        overflow: 'hidden'
                    }}>
                        {/* Project Header */}
                        <div style={{
                            padding: '16px',
                            borderBottom: '1px solid var(--border-light)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px'
                        }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: 'var(--bg-surface)',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '22px'
                            }}>
                                {project.image}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    color: 'var(--text-primary)',
                                    marginBottom: '2px'
                                }}>
                                    {project.title}
                                </h3>
                                <p style={{ color: 'var(--accent-primary)', fontSize: '11px' }}>{project.subtitle}</p>
                            </div>
                            <div style={{ display: 'flex', gap: '6px' }}>
                                {project.github && (
                                    <button style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        padding: '6px 10px',
                                        background: 'var(--bg-surface)',
                                        border: '1px solid var(--border-light)',
                                        borderRadius: '6px',
                                        color: 'var(--text-secondary)',
                                        fontSize: '11px',
                                        cursor: 'pointer',
                                        fontFamily: 'var(--font-display)'
                                    }}>
                                        <Github size={12} />
                                        Code
                                    </button>
                                )}
                                {project.live && (
                                    <button style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        padding: '6px 10px',
                                        background: 'var(--accent-primary)',
                                        border: 'none',
                                        borderRadius: '6px',
                                        color: 'white',
                                        fontSize: '11px',
                                        cursor: 'pointer',
                                        fontFamily: 'var(--font-display)'
                                    }}>
                                        <ExternalLink size={12} />
                                        Live
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Project Stats */}
                        <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border-light)', display: 'flex', gap: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '11px' }}>
                                <Star size={12} />
                                {project.stats.stars} stars
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '11px' }}>
                                <Github size={12} />
                                {project.stats.forks} forks
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '11px' }}>
                                <Monitor size={12} />
                                {project.stats.views.toLocaleString()} views
                            </div>
                        </div>

                        {/* Project Description */}
                        <div style={{ padding: '16px' }}>
                            <p style={{
                                color: 'var(--text-secondary)',
                                lineHeight: '1.6',
                                marginBottom: '12px',
                                fontSize: '12px'
                            }}>
                                {project.description}
                            </p>

                            {/* Tech Stack */}
                            <div>
                                <span style={{
                                    fontSize: '10px',
                                    color: 'var(--text-muted)',
                                    fontFamily: 'var(--font-display)',
                                    textTransform: 'uppercase'
                                }}>
                                    Technologies
                                </span>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                                    {project.tech.map((tech, techIndex) => (
                                        <span key={techIndex} style={{
                                            background: 'var(--bg-surface)',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            color: 'var(--text-secondary)',
                                            fontSize: '10px'
                                        }}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Call to Action */}
            <div className="app-section">
                <div style={{
                    background: 'var(--bg-card)',
                    padding: '24px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-light)',
                    textAlign: 'center'
                }}>
                    <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '16px',
                        color: 'var(--text-primary)',
                        marginBottom: '8px'
                    }}>
                        Interested in working together?
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '13px' }}>
                        I'm always open to discussing new projects and opportunities.
                    </p>
                    <button style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '10px 20px',
                        background: 'var(--accent-primary)',
                        border: 'none',
                        borderRadius: '6px',
                        color: 'white',
                        fontWeight: '500',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-display)',
                        fontSize: '12px'
                    }}>
                        <ExternalLink size={14} />
                        Get In Touch
                    </button>
                </div>
            </div>
        </div>
    );
}
