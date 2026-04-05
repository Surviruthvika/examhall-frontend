import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    navigate(user.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard');
  }

  return (
    <div style={styles.page}>
      {/* Background decoration */}
      <div style={styles.bgCircle1} />
      <div style={styles.bgCircle2} />

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logoWrap}>🎓</div>
          <h1 style={styles.title}>Anurag University</h1>
          <p style={styles.subtitle}>Exam Hall Locator System</p>
          <p style={styles.desc}>
            Efficiently manage and locate exam halls for students and administrators.
            Get instant SMS notifications and real-time hall allocations.
          </p>
        </div>

        {/* Feature pills */}
        <div style={styles.features}>
          {['📍 Hall Locator', '📱 SMS Alerts', '⚡ Real-Time', '🔒 Secure'].map(f => (
            <span key={f} style={styles.pill}>{f}</span>
          ))}
        </div>

        {/* Cards */}
        <div style={styles.cards}>
          {/* Admin Card */}
          <div style={styles.card}>
            <div style={styles.cardIcon}>👨‍💼</div>
            <h2 style={styles.cardTitle}>Admin Portal</h2>
            <p style={styles.cardDesc}>
              Manage students, allocate exam halls, and send bulk notifications via SMS.
            </p>
            <div style={styles.cardActions}>
              <button style={styles.btnPrimary} onClick={() => navigate('/admin/login')}>
                Admin Login
              </button>
              <button style={styles.btnOutline} onClick={() => navigate('/admin/signup')}>
                Register Admin
              </button>
            </div>
          </div>

          {/* Student Card */}
          <div style={{ ...styles.card, ...styles.cardGreen }}>
            <div style={styles.cardIcon}>👨‍🎓</div>
            <h2 style={styles.cardTitle}>Student Portal</h2>
            <p style={styles.cardDesc}>
              View your exam hall allocation, get notifications, and stay informed about exams.
            </p>
            <div style={styles.cardActions}>
              <button style={styles.btnGreen} onClick={() => navigate('/student/login')}>
                Student Login
              </button>
              <button style={styles.btnOutlineGreen} onClick={() => navigate('/student/signup')}>
                Register Now
              </button>
            </div>
          </div>
        </div>

        <p style={styles.footer}>
          © 2024 Anurag University · Exam Hall Locator System · All rights reserved
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0d1642 0%, #1a237e 50%, #283593 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    position: 'relative',
    overflow: 'hidden',
  },
  bgCircle1: {
    position: 'absolute', width: '500px', height: '500px',
    borderRadius: '50%', background: 'rgba(255,255,255,0.04)',
    top: '-100px', right: '-100px',
  },
  bgCircle2: {
    position: 'absolute', width: '300px', height: '300px',
    borderRadius: '50%', background: 'rgba(255,255,255,0.03)',
    bottom: '-60px', left: '-60px',
  },
  container: {
    maxWidth: '860px',
    width: '100%',
    position: 'relative',
    zIndex: 1,
  },
  header: { textAlign: 'center', marginBottom: '32px' },
  logoWrap: {
    fontSize: '64px', marginBottom: '16px',
    filter: 'drop-shadow(0 4px 16px rgba(255,255,255,0.3))',
  },
  title: {
    color: 'white',
    fontSize: '42px',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '800',
    letterSpacing: '1px',
    marginBottom: '8px',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '18px',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    fontWeight: '400',
    marginBottom: '16px',
  },
  desc: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '15px',
    maxWidth: '520px',
    margin: '0 auto',
    lineHeight: '1.7',
  },
  features: {
    display: 'flex', justifyContent: 'center', gap: '10px',
    flexWrap: 'wrap', marginBottom: '36px',
  },
  pill: {
    background: 'rgba(255,255,255,0.12)',
    color: 'rgba(255,255,255,0.85)',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    border: '1px solid rgba(255,255,255,0.2)',
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
  },
  card: {
    background: 'white',
    borderRadius: '20px',
    padding: '36px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
    textAlign: 'center',
  },
  cardGreen: {},
  cardIcon: { fontSize: '52px', marginBottom: '16px' },
  cardTitle: {
    fontSize: '24px', fontFamily: 'Poppins, sans-serif',
    fontWeight: '700', color: '#1a237e', marginBottom: '10px',
  },
  cardDesc: {
    fontSize: '14px', color: '#5c6680', lineHeight: '1.6', marginBottom: '24px',
  },
  cardActions: { display: 'flex', flexDirection: 'column', gap: '10px' },
  btnPrimary: {
    padding: '13px', borderRadius: '10px', border: 'none',
    background: 'linear-gradient(135deg, #1a237e, #283593)',
    color: 'white', fontWeight: '700', fontSize: '15px',
    cursor: 'pointer', fontFamily: 'Inter, sans-serif',
    transition: 'all 0.2s',
  },
  btnOutline: {
    padding: '13px', borderRadius: '10px',
    border: '2px solid #1a237e', background: 'transparent',
    color: '#1a237e', fontWeight: '700', fontSize: '15px',
    cursor: 'pointer', fontFamily: 'Inter, sans-serif',
  },
  btnGreen: {
    padding: '13px', borderRadius: '10px', border: 'none',
    background: 'linear-gradient(135deg, #2e7d32, #388e3c)',
    color: 'white', fontWeight: '700', fontSize: '15px',
    cursor: 'pointer', fontFamily: 'Inter, sans-serif',
  },
  btnOutlineGreen: {
    padding: '13px', borderRadius: '10px',
    border: '2px solid #2e7d32', background: 'transparent',
    color: '#2e7d32', fontWeight: '700', fontSize: '15px',
    cursor: 'pointer', fontFamily: 'Inter, sans-serif',
  },
  footer: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.35)',
    fontSize: '12px',
  },
};

export default LandingPage;
