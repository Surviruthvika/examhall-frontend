import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { studentSignup } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const BRANCHES = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL'];
const SECTIONS = ['A', 'B', 'C', 'D', 'E'];
const YEARS = [1, 2, 3, 4];

const StudentSignup = () => {
  const [form, setForm] = useState({
    rollNumber: '', name: '', branch: '', section: '',
    year: '', phone: '', password: '', confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return; }
    if (form.phone.length < 10) { toast.error('Enter a valid 10-digit phone number'); return; }
    setLoading(true);
    try {
      const payload = { ...form, year: parseInt(form.year) };
      delete payload.confirmPassword;
      const res = await studentSignup(payload);
      if (res.data.success) {
        login(res.data.data);
        toast.success('Account created successfully!');
        navigate('/student/dashboard');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.icon}>👨‍🎓</div>
          <h2 style={styles.title}>Student Registration</h2>
          <p style={styles.sub}>Create your student account</p>
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.grid2}>
            <div className="form-group">
              <label>Roll Number *</label>
              <input type="text" placeholder="21BCE7001" required value={form.rollNumber} onChange={set('rollNumber')} />
            </div>
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" placeholder="Your full name" required value={form.name} onChange={set('name')} />
            </div>
          </div>
          <div style={styles.grid3}>
            <div className="form-group">
              <label>Branch *</label>
              <select required value={form.branch} onChange={set('branch')}>
                <option value="">Select</option>
                {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Section *</label>
              <select required value={form.section} onChange={set('section')}>
                <option value="">Select</option>
                {SECTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Year *</label>
              <select required value={form.year} onChange={set('year')}>
                <option value="">Year</option>
                {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Phone Number *</label>
            <input type="tel" placeholder="10-digit mobile number" required maxLength={10}
              value={form.phone} onChange={set('phone')} />
          </div>
          <div style={styles.grid2}>
            <div className="form-group">
              <label>Password *</label>
              <input type="password" placeholder="Min 6 characters" required minLength={6}
                value={form.password} onChange={set('password')} />
            </div>
            <div className="form-group">
              <label>Confirm Password *</label>
              <input type="password" placeholder="Re-enter password" required
                value={form.confirmPassword} onChange={set('confirmPassword')} />
            </div>
          </div>
          <button type="submit" className="btn w-full" disabled={loading}
            style={{ ...styles.btnGreen, marginTop: '8px' }}>
            {loading ? 'Creating account...' : '✅ Register as Student'}
          </button>
        </form>
        <p style={styles.footer}>
          Already registered?{' '}
          <Link to="/student/login" style={{ color: '#2e7d32', fontWeight: 600 }}>Login here</Link>
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
    width: '100%', maxWidth: '560px', boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
  },
  header: { textAlign: 'center', marginBottom: '24px' },
  icon: { fontSize: '48px', marginBottom: '12px' },
  title: { fontSize: '24px', color: '#2e7d32', marginBottom: '4px' },
  sub: { fontSize: '13px', color: '#8892b0' },
  form: { display: 'flex', flexDirection: 'column', gap: '14px' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' },
  grid3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' },
  btnGreen: {
    background: 'linear-gradient(135deg, #2e7d32, #388e3c)',
    color: 'white', padding: '13px', borderRadius: '10px',
    fontWeight: '700', fontSize: '15px', border: 'none', cursor: 'pointer',
  },
  footer: { textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#5c6680' },
};

export default StudentSignup;
