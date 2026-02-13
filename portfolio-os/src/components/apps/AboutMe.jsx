import React from 'react';
import { MapPin, Mail, Globe, Github, Linkedin, Twitter } from 'lucide-react';

export default function AboutMe() {
    return (
        <div className="app-content">
            <div className="app-header">
                <h1 className="app-title">About Me</h1>
                <p className="app-subtitle">Get to know me better</p>
            </div>

            <div className="profile-card">
                <div className="profile-avatar">JD</div>
                <h2 className="profile-name">Your Name</h2>
                <p className="profile-title">Full Stack Developer</p>

                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '400px', marginBottom: '20px' }}>
                    I'm a passionate developer with expertise in building modern web applications.
                    I love creating intuitive user experiences and solving complex problems with elegant solutions.
                </p>

                <div className="contact-links">
                    <a href="#" className="contact-link">
                        <MapPin size={16} />
                        <span>City, Country</span>
                    </a>
                    <a href="#" className="contact-link">
                        <Mail size={16} />
                        <span>email@example.com</span>
                    </a>
                    <a href="#" className="contact-link">
                        <Globe size={16} />
                        <span>yourwebsite.com</span>
                    </a>
                </div>

                <div className="contact-links" style={{ marginTop: '12px' }}>
                    <a href="#" className="contact-link">
                        <Github size={16} />
                        <span>GitHub</span>
                    </a>
                    <a href="#" className="contact-link">
                        <Linkedin size={16} />
                        <span>LinkedIn</span>
                    </a>
                    <a href="#" className="contact-link">
                        <Twitter size={16} />
                        <span>Twitter</span>
                    </a>
                </div>
            </div>

            <div className="app-section">
                <h3 className="app-section-title">My Story</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                    With over 5 years of experience in web development, I've worked with startups and established companies
                    to build products that make a difference. My journey started with curiosity about how things work on the web,
                    and it has evolved into a career dedicated to creating impactful digital experiences.
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '12px' }}>
                    When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                    or sharing knowledge with the developer community.
                </p>
            </div>

            <div className="app-section">
                <h3 className="app-section-title">What I Do</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                    <div style={{
                        background: 'var(--bg-card)',
                        padding: '20px',
                        borderRadius: '12px',
                        border: '1px solid var(--glass-border)'
                    }}>
                        <h4 style={{ color: 'var(--neon-cyan)', marginBottom: '8px', fontFamily: 'var(--font-display)', fontSize: '14px' }}>
                            Web Development
                        </h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                            Building responsive, performant web applications with modern frameworks
                        </p>
                    </div>
                    <div style={{
                        background: 'var(--bg-card)',
                        padding: '20px',
                        borderRadius: '12px',
                        border: '1px solid var(--glass-border)'
                    }}>
                        <h4 style={{ color: 'var(--neon-magenta)', marginBottom: '8px', fontFamily: 'var(--font-display)', fontSize: '14px' }}>
                            UI/UX Design
                        </h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                            Creating intuitive and visually appealing user interfaces
                        </p>
                    </div>
                    <div style={{
                        background: 'var(--bg-card)',
                        padding: '20px',
                        borderRadius: '12px',
                        border: '1px solid var(--glass-border)'
                    }}>
                        <h4 style={{ color: 'var(--neon-green)', marginBottom: '8px', fontFamily: 'var(--font-display)', fontSize: '14px' }}>
                            Backend Systems
                        </h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                            Developing robust APIs and server-side applications
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
