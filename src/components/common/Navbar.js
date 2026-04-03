import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <span style={styles.logo}>🎓</span>
        <div>
          <div style={styles.brandName}>Anurag University</div>
          <div style={styles.brandSub}>Exam Hall Locator</div>
        </div>
      </div>

      <div style={styles.right}>
        {user && (
          <>
            <div style={styles.userInfo}>
              <div style={styles.avatar}>
                {user.role === 'ADMIN' ? '👨‍💼' : '👨‍🎓'}
              </div>
              <div>
                <div style={styles.userName}>{user.name || user.identifier}</div>
                <div style={styles.userRole}>
                  <span style={{
                    ...styles.roleBadge,
                    background: user.role === 'ADMIN' ? '#e8eaf6' : '#e8f5e9',
                    color: user.role === 'ADMIN' ? '#1a237e' : '#2e7d32',
                  }}>
                    {user.role}
                  </span>
                </div>
              </div>
            </div>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              🚪 Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    background: 'linear-gradient(135deg, #1a237e, #283593)',
    padding: '0 28px',
    height: '68px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 16px rgba(26,35,126,0.3)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logo: {
    fontSize: '32px',
  },
  brandName: {
    color: 'white',
    fontWeight: '700',
    fontSize: '16px',
    fontFamily: 'Poppins, sans-serif',
    letterSpacing: '0.5px',
  },
  brandSub: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: '11px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  avatar: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
  },
  userName: {
    color: 'white',
    fontWeight: '600',
    fontSize: '14px',
  },
  userRole: {
    marginTop: '2px',
  },
  roleBadge: {
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
  logoutBtn: {
    background: 'rgba(255,255,255,0.12)',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: 'Inter, sans-serif',
  },
};

export default Navbar;
