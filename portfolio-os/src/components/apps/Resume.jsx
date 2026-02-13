import React from 'react';
import { Download, GraduationCap, Briefcase } from 'lucide-react';

export default function Resume() {
    const workExperience = [
        {
            date: '2022 - Present',
            title: 'Senior Full Stack Developer',
            company: 'Tech Company Inc.',
            description: 'Leading development of microservices architecture, mentoring junior developers, and implementing CI/CD pipelines.'
        },
        {
            date: '2020 - 2022',
            title: 'Full Stack Developer',
            company: 'StartupXYZ',
            description: 'Built and maintained multiple client web applications using React, Node.js, and PostgreSQL. Improved performance by 40%.'
        },
        {
            date: '2018 - 2020',
            title: 'Frontend Developer',
            company: 'Digital Agency',
            description: 'Developed responsive websites and web applications for various clients. Collaborated with designers to implement pixel-perfect UIs.'
        }
    ];

    const education = [
        {
            date: '2014 - 2018',
            title: 'Bachelor of Computer Science',
            company: 'University of Technology',
            description: 'Graduated with Honors. Specialized in Software Engineering and Web Technologies.'
        }
    ];

    return (
        <div className="app-content">
            <div className="app-header">
                <h1 className="app-title">Resume</h1>
                <p className="app-subtitle">My professional journey</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 18px',
                    background: 'var(--accent-primary)',
                    border: 'none',
                    borderRadius: '6px',
                    color: 'white',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-display)',
                    fontSize: '12px'
                }}>
                    <Download size={14} />
                    Download PDF
                </button>
            </div>

            <div className="app-section">
                <h3 className="app-section-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Briefcase size={14} />
                    Work Experience
                </h3>
                <div className="timeline">
                    {workExperience.map((item, index) => (
                        <div key={index} className="timeline-item">
                            <div className="timeline-date">{item.date}</div>
                            <div className="timeline-title">{item.title}</div>
                            <div className="timeline-company">{item.company}</div>
                            <div className="timeline-description">{item.description}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="app-section">
                <h3 className="app-section-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <GraduationCap size={14} />
                    Education
                </h3>
                <div className="timeline">
                    {education.map((item, index) => (
                        <div key={index} className="timeline-item">
                            <div className="timeline-date">{item.date}</div>
                            <div className="timeline-title">{item.title}</div>
                            <div className="timeline-company">{item.company}</div>
                            <div className="timeline-description">{item.description}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="app-section">
                <h3 className="app-section-title">Professional Summary</h3>
                <div style={{
                    background: 'var(--bg-card)',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-light)',
                    marginBottom: '16px'
                }}>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '13px' }}>
                        Results-driven Full Stack Developer with 5+ years of experience in designing and deploying scalable web applications.
                        Proficient in modern JavaScript frameworks, cloud services, and agile methodologies. Proven track record of delivering
                        high-quality solutions that improve business operations and user engagement.
                    </p>
                </div>
            </div>

            <div className="app-section">
                <h3 className="app-section-title">Certifications</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {['AWS Certified Developer', 'Google Cloud Professional', 'Meta Frontend Expert'].map((cert, index) => (
                        <div key={index} style={{
                            background: 'var(--bg-surface)',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            border: '1px solid var(--border-light)',
                            color: 'var(--text-secondary)',
                            fontSize: '11px',
                            fontFamily: 'var(--font-display)'
                        }}>
                            {cert}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
