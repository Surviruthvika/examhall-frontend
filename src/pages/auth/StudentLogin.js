import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { studentLogin } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const StudentLogin = () => {
  const [form, setForm] = useState({ rollNumber: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await studentLogin(form);
      if (res.data.success) {
        login(res.data.data);
        toast.success(`Welcome, ${res.data.data.name}!`);
        navigate('/student/dashboard');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.icon}>👨‍🎓</div>
          <h2 style={styles.title}>Student Login</h2>
          <p style={styles.sub}>Anurag University · Exam Hall Locator</p>
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div className="form-group">
            <label>Roll Number</label>
            <input type="text" placeholder="e.g. 21BCE7001" required
              value={form.rollNumber} onChange={e => setForm({ ...form, rollNumber: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          </div>
          <button type="submit" className="btn w-full" disabled={loading}
            style={{ ...styles.btnGreen, marginTop: '8px' }}>
            {loading ? 'Logging in...' : '🔓 Login as Student'}
          </button>
        </form>
        <p style={styles.footer}>
          New student?{' '}
          <Link to="/student/signup" style={{ color: '#2e7d32', fontWeight: 600 }}>Register here</Link>
        </p>
        <p style={styles.footer}>
          <Link to="/" style={{ color: '#8892b0', fontSize: '13px' }}>← Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1b5e20, #2e7d32)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
  },
  card: {
    background: 'white', borderRadius: '20px', padding: '40px',
    width: '100%', maxWidth: '420px', boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
  },
  header: { textAlign: 'center', marginBottom: '28px' },
  icon: { fontSize: '48px', marginBottom: '12px' },
  title: { fontSize: '26px', color: '#2e7d32', marginBottom: '4px' },
  sub: { fontSize: '13px', color: '#8892b0' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  btnGreen: {
    background: 'linear-gradient(135deg, #2e7d32, #388e3c)',
    color: 'white', padding: '13px', borderRadius: '10px',
    fontWeight: '700', fontSize: '15px', border: 'none', cursor: 'pointer',
  },
  footer: { textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#5c6680' },
};

export default StudentLogin;
