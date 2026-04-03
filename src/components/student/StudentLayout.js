import React from 'react';
import Navbar from '../common/Navbar';
import { NavLink } from 'react-router-dom';

const studentMenu = [
  { path: '/student/dashboard', icon: '🏠', label: 'Dashboard' },
  { path: '/student/hall', icon: '🏛️', label: 'Hall Allocation' },
  { path: '/student/notifications', icon: '🔔', label: 'Notifications' },
];

const StudentLayout = ({ children }) => (
  <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
    <Navbar />
    <div style={{ display: 'flex' }}>
      <aside style={styles.sidebar}>
        <div style={styles.menuTitle}>STUDENT PORTAL</div>
        <nav style={styles.nav}>
          {studentMenu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                ...styles.link,
                ...(isActive ? styles.activeLink : {}),
              })}
            >
              <span style={{ fontSize: '18px', width: '24px', textAlign: 'center' }}>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '32px', overflowX: 'hidden' }}>
        {children}
      </main>
    </div>
  </div>
);

const styles = {
  sidebar: {
    width: '230px',
    minHeight: 'calc(100vh - 68px)',
    background: 'white',
    borderRight: '1px solid #dde1f0',
    padding: '24px 0',
    flexShrink: 0,
    boxShadow: '2px 0 12px rgba(26,35,126,0.06)',
  },
  menuTitle: {
    fontSize: '10px',
    fontWeight: '700',
    color: '#8892b0',
    letterSpacing: '1.5px',
    padding: '0 20px 12px',
    borderBottom: '1px solid #eef0f8',
    marginBottom: '8px',
  },
  nav: { display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 10px' },
  link: {
    display: 'flex', alignItems: 'center', gap: '12px',
    padding: '11px 14px', borderRadius: '10px',
    fontSize: '14px', fontWeight: '500', color: '#5c6680',
    transition: 'all 0.18s', textDecoration: 'none',
  },
  activeLink: {
    background: 'linear-gradient(135deg, #e8f5e9, #f1f8f2)',
    color: '#2e7d32', fontWeight: '700',
    boxShadow: '0 2px 8px rgba(46,125,50,0.08)',
  },
};

export default StudentLayout;
