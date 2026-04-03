import React from 'react';
import { NavLink } from 'react-router-dom';

const menuItems = [
  { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  { path: '/admin/students', icon: '👥', label: 'Students' },
  { path: '/admin/allocate', icon: '🏛️', label: 'Allocate Hall' },
  { path: '/admin/allocations', icon: '📋', label: 'View Allocations' },
  { path: '/admin/notify', icon: '🔔', label: 'Send Notification' },
  { path: '/admin/notifications', icon: '📨', label: 'Notification History' },
];

const Sidebar = () => (
  <aside style={styles.sidebar}>
    <div style={styles.menuTitle}>ADMIN PANEL</div>
    <nav style={styles.nav}>
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive ? styles.activeLink : {}),
          })}
        >
          <span style={styles.icon}>{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  </aside>
);

const styles = {
  sidebar: {
    width: '240px',
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
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    padding: '0 10px',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '11px 14px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#5c6680',
    transition: 'all 0.18s',
    textDecoration: 'none',
  },
  activeLink: {
    background: 'linear-gradient(135deg, #e8eaf6, #f3f4fd)',
    color: '#1a237e',
    fontWeight: '700',
    boxShadow: '0 2px 8px rgba(26,35,126,0.08)',
  },
  icon: {
    fontSize: '18px',
    width: '24px',
    textAlign: 'center',
  },
};

export default Sidebar;
