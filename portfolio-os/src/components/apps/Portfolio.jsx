import React from 'react';
import { ExternalLink, Github, Star, Wrench } from 'lucide-react';

export default function Portfolio() {
    const featuredProjects = [
        {
            title: 'E-Commerce Platform',
            subtitle: 'Full-Stack Development',
            description: `Built a comprehensive e-commerce platform serving 10,000+ monthly active users. Implemented secure payment processing with Stripe, real-time inventory management, and an intuitive admin dashboard for business owners.

Key features include:
• User authentication and authorization with JWT
• Shopping cart with local storage persistence
• Order tracking and history
• Product search with filters and sorting
• Responsive design for all devices
• Performance optimization achieving 90+ Lighthouse score`,
            tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis', 'Docker'],
            stats: { stars: 245, forks: 67, views: 12000 },
            live: true,
            github: true
        },
        {
            title: 'Social Analytics Dashboard',
            subtitle: 'Data Visualization',
            description: `Developed a real-time analytics dashboard for social media management companies. The platform processes millions of data points daily and presents insights through interactive visualizations.

Key features include:
• Real-time data streaming with WebSockets
• Custom D3.js charts and graphs
• Customizable dashboard layouts
• Export reports in multiple formats
• Team collaboration features
• API for third-party integrations`,
            tech: ['Next.js', 'TypeScript', 'D3.js', 'PostgreSQL', 'AWS', 'GraphQL'],
            stats: { stars: 189, forks: 43, views: 8500 },
            live: true,
            github: true
        },
        {
            title: 'Healthcare Management System',
            subtitle: 'Enterprise Application',
            description: `Created a HIPAA-compliant healthcare management system for clinics and hospitals. The application streamlines patient records, appointments, and billing processes.

Key features include:
• Electronic Health Records (EHR)
• Appointment scheduling with calendar view
• Patient communication portal
• Insurance billing integration
• Role-based access control
• Audit logging for compliance`,
            tech: ['Vue.js', 'Python', 'MongoDB', 'FHIR', 'Kubernetes', 'AWS'],
            stats: { stars: 312, forks: 89, views: 15000 },
            live: false,
            github: true
        }
    ];

    return (
        <div className="app-content">
            <div className="app-header">
                <h1 className="app-title">Portfolio</h1>
                <p className="app-subtitle">Featured projects in detail</p>
            </div>

            {featuredProjects.map((project, index) => (
                <div key={index} className="app-section" style={{ marginBottom: '32px' }}>
                    <div style={{
                        background: 'var(--bg-card)',
                        borderRadius: '16px',
                        border: '1px solid var(--glass-border)',
                        overflow: 'hidden'
                    }}>
                        {/* Project Header */}
                        <div style={{
                            padding: '24px',
                            borderBottom: '1px solid var(--glass-border)',
                            background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.05), rgba(255, 0, 255, 0.05))'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                <div>
                                    <h3 style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: '20px',
                                        fontWeight: '600',
                                        color: 'var(--text-primary)',
                                        marginBottom: '4px'
                                    }}>
                                        {project.title}
                                    </h3>
                                    <p style={{ color: 'var(--neon-cyan)', fontSize: '13px' }}>{project.subtitle}</p>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {project.github && (
                                        <button style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            padding: '8px 16px',
                                            background: 'rgba(255, 0, 255, 0.1)',
                                            border: '1px solid var(--neon-magenta)',
                                            borderRadius: '8px',
                                            color: 'var(--neon-magenta)',
                                            fontSize: '12px',
                                            cursor: 'pointer'
                                        }}>
                                            <Github size={14} />
                                            Source
                                        </button>
                                    )}
                                    {project.live && (
                                        <button style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            padding: '8px 16px',
                                            background: 'rgba(0, 255, 255, 0.1)',
                                            border: '1px solid var(--neon-cyan)',
                                            borderRadius: '8px',
                                            color: 'var(--neon-cyan)',
                                            fontSize: '12px',
                                            cursor: 'pointer'
                                        }}>
                                            <ExternalLink size={14} />
                                            Live Demo
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Stats */}
                            <div style={{ display: 'flex', gap: '20px', marginTop: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '12px' }}>
                                    <Star size={14} style={{ color: 'var(--neon-yellow)' }} />
                                    {project.stats.stars} stars
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '12px' }}>
                                    <Code size={14} style={{ color: 'var(--neon-green)' }} />
                                    {project.stats.forks} forks
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '12px' }}>
                                    <Wrench size={14} style={{ color: 'var(--neon-cyan)' }} />
                                    {project.stats.views.toLocaleString()} views
                                </div>
                            </div>
                        </div>

                        {/* Project Description */}
                        <div style={{ padding: '24px' }}>
                            <p style={{
                                color: 'var(--text-secondary)',
                                lineHeight: '1.8',
                                whiteSpace: 'pre-line',
                                marginBottom: '20px'
                            }}>
                                {project.description}
                            </p>

                            {/* Tech Stack */}
                            <div>
                                <span style={{
                                    fontSize: '11px',
                                    color: 'var(--neon-magenta)',
                                    fontFamily: 'var(--font-display)',
                                    letterSpacing: '1px',
                                    textTransform: 'uppercase'
                                }}>
                                    Tech Stack
                                </span>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                                    {project.tech.map((tech, techIndex) => (
                                        <span key={techIndex} style={{
                                            background: 'var(--bg-elevated)',
                                            padding: '6px 12px',
                                            borderRadius: '6px',
                                            border: '1px solid var(--glass-border)',
                                            color: 'var(--text-primary)',
                                            fontSize: '12px'
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

            <div className="app-section">
                <h3 className="app-section-title">Open Source Contributions</h3>
                <div style={{
                    background: 'var(--bg-card)',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid var(--glass-border)'
                }}>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
                        I've contributed to various open source projects including React, Vue, and several popular libraries.
                        Check out my GitHub profile to see more of my contributions.
                    </p>
                    <a href="#" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--neon-cyan)',
                        textDecoration: 'none',
                        fontSize: '14px'
                    }}>
                        <Github size={16} />
                        View GitHub Profile
                    </a>
                </div>
            </div>
        </div>
    );
}
