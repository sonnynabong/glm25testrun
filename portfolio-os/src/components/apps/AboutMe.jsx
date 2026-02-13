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

                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '380px', marginBottom: '16px', fontSize: '13px' }}>
                    I'm a passionate developer with expertise in building modern web applications.
                    I love creating intuitive user experiences and solving complex problems with elegant solutions.
                </p>

                <div className="contact-links">
                    <a href="#" className="contact-link">
                        <MapPin size={14} />
                        <span>City, Country</span>
                    </a>
                    <a href="#" className="contact-link">
                        <Mail size={14} />
                        <span>email@example.com</span>
                    </a>
                    <a href="#" className="contact-link">
                        <Globe size={14} />
                        <span>yourwebsite.com</span>
                    </a>
                </div>

                <div className="contact-links" style={{ marginTop: '8px' }}>
                    <a href="#" className="contact-link">
                        <Github size={14} />
                        <span>GitHub</span>
                    </a>
                    <a href="#" className="contact-link">
                        <Linkedin size={14} />
                        <span>LinkedIn</span>
                    </a>
                    <a href="#" className="contact-link">
                        <Twitter size={14} />
                        <span>Twitter</span>
                    </a>
                </div>
            </div>

            <div className="app-section" style={{ marginTop: '20px' }}>
                <h3 className="app-section-title">My Story</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '13px' }}>
                    With over 5 years of experience in web development, I've worked with startups and established companies
                    to build products that make a difference. My journey started with curiosity about how things work on the web,
                    and it has evolved into a career dedicated to creating impactful digital experiences.
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginTop: '10px', fontSize: '13px' }}>
                    When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                    or sharing knowledge with the developer community.
                </p>
            </div>

            <div className="app-section">
                <h3 className="app-section-title">What I Do</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
                    <div style={{
                        background: 'var(--bg-card)',
                        padding: '16px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-light)'
                    }}>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '6px', fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: '600' }}>
                            Web Development
                        </h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                            Building responsive, performant web applications
                        </p>
                    </div>
                    <div style={{
                        background: 'var(--bg-card)',
                        padding: '16px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-light)'
                    }}>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '6px', fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: '600' }}>
                            UI/UX Design
                        </h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                            Creating intuitive and clean user interfaces
                        </p>
                    </div>
                    <div style={{
                        background: 'var(--bg-card)',
                        padding: '16px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-light)'
                    }}>
                        <h4 style={{ color: 'var(--text-primary)', marginBottom: '6px', fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: '600' }}>
                            Backend Systems
                        </h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                            Developing robust APIs and server applications
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
