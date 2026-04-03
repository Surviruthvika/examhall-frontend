import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { sendNotification } from '../../services/api';
import toast from 'react-hot-toast';

const BRANCHES = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL'];

const AdminNotify = () => {
  const [mode, setMode] = useState('branch'); // 'branch' | 'specific'
  const [form, setForm] = useState({
    message: '', targetBranch: '', studentRolls: '', date: '', time: '', sendSms: false
  });
  const [loading, setLoading] = useState(false);

  const set = f => e => setForm({ ...form, [f]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.message.trim()) { toast.error('Message is required'); return; }
    if (!form.date || !form.time) { toast.error('Date and time are required'); return; }
    if (mode === 'branch' && !form.targetBranch) { toast.error('Please select a branch'); return; }
    if (mode === 'specific' && !form.studentRolls.trim()) { toast.error('Please enter roll numbers'); return; }

    const payload = {
      message: form.message,
      date: form.date,
      time: form.time,
      sendSms: form.sendSms,
    };

    if (mode === 'branch') {
      payload.targetBranch = form.targetBranch;
      payload.studentRolls = [];
    } else {
      payload.studentRolls = form.studentRolls.split(',').map(r => r.trim()).filter(Boolean);
      payload.targetBranch = '';
    }

    setLoading(true);
    try {
      const res = await sendNotification(payload);
      if (res.data.success) {
        toast.success('Notification sent successfully! 🎉');
        setForm({ message: '', targetBranch: '', studentRolls: '', date: '', time: '', sendSms: false });
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send notification');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const nowTime = new Date().toTimeString().slice(0, 5);

  return (
    <AdminLayout>
      <div className="page-header">
        <div>
          <h2>Send Notification</h2>
          <p>Send exam hall alerts to students via the portal and SMS</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'start' }}>
        <div className="card">
          <h3 style={{ marginBottom: '20px', fontSize: '17px', color: '#1a237e' }}>🔔 Compose Notification</h3>

          {/* Mode Toggle */}
          <div style={{ display: 'flex', gap: '0', marginBottom: '20px', borderRadius: '10px', overflow: 'hidden', border: '1.5px solid #dde1f0' }}>
            {[['branch', '🏫 Entire Branch'], ['specific', '👤 Specific Students']].map(([m, label]) => (
              <button key={m} type="button" onClick={() => setMode(m)}
                style={{
                  flex: 1, padding: '11px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '600',
                  background: mode === m ? 'linear-gradient(135deg, #1a237e, #283593)' : 'white',
                  color: mode === m ? 'white' : '#5c6680',
                  transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
                }}>
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {mode === 'branch' ? (
              <div className="form-group">
                <label>Target Branch *</label>
                <select required value={form.targetBranch} onChange={set('targetBranch')}>
                  <option value="">Select Branch</option>
                  {BRANCHES.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
            ) : (
              <div className="form-group">
                <label>Roll Numbers * (comma-separated)</label>
                <input type="text" placeholder="21BCE7001, 21BCE7002, 21BCE7003"
                  value={form.studentRolls} onChange={set('studentRolls')} />
                <small style={{ color: '#8892b0', fontSize: '12px' }}>Enter multiple roll numbers separated by commas</small>
              </div>
            )}

            <div className="form-group">
              <label>Message *</label>
              <textarea
                rows={4} required placeholder="Enter notification message here..."
                value={form.message} onChange={set('message')}
                style={{ padding: '11px 14px', border: '1.5px solid #dde1f0', borderRadius: '8px', resize: 'vertical', fontSize: '14px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>Date *</label>
                <input type="date" required min={today} value={form.date} onChange={set('date')} />
              </div>
              <div className="form-group">
                <label>Time *</label>
                <input type="time" required value={form.time} onChange={set('time')} />
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '12px', background: '#f5f7ff', borderRadius: '8px', border: '1px solid #dde1f0' }}>
              <input type="checkbox" checked={form.sendSms} onChange={set('sendSms')} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
              <div>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#1a237e' }}>📱 Send SMS via Twilio</span>
                <p style={{ fontSize: '12px', color: '#8892b0', margin: '2px 0 0' }}>Requires Twilio credentials configured in backend</p>
              </div>
            </label>

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '4px' }}>
              {loading ? 'Sending...' : '🚀 Send Notification'}
            </button>
          </form>
        </div>

        {/* Info Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ background: '#e8eaf6', border: '1px solid #c5cae9' }}>
            <h4 style={{ color: '#1a237e', marginBottom: '12px', fontSize: '14px' }}>ℹ️ How Notifications Work</h4>
            <ul style={{ fontSize: '13px', color: '#5c6680', lineHeight: '1.7', paddingLeft: '16px' }}>
              <li>Notifications appear in the student portal instantly</li>
              <li>Enable SMS to also send a text message to students' phones</li>
              <li>Branch notifications reach all students in that branch</li>
              <li>Specific notifications target individual roll numbers</li>
            </ul>
          </div>
          <div className="card" style={{ background: '#fff8e1', border: '1px solid #ffe082' }}>
            <h4 style={{ color: '#f57f17', marginBottom: '10px', fontSize: '14px' }}>⚠️ SMS Note</h4>
            <p style={{ fontSize: '13px', color: '#5c6680', lineHeight: '1.6' }}>
              SMS requires valid Twilio credentials set in backend environment variables. Without them, notifications will still appear in the portal but SMS won't be sent.
            </p>
          </div>
          <div className="card" style={{ background: 'linear-gradient(135deg, #e8eaf6, #f3f4fd)' }}>
            <h4 style={{ color: '#1a237e', marginBottom: '8px', fontSize: '13px' }}>📋 PREVIEW</h4>
            <div style={{ background: 'white', borderRadius: '8px', padding: '14px', borderLeft: '4px solid #1a237e' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a237e', marginBottom: '6px' }}>
                {mode === 'branch' ? (form.targetBranch ? `To: ${form.targetBranch} Branch` : 'To: (select branch)') : 'To: Specific Students'}
              </div>
              <div style={{ fontSize: '14px', color: '#333' }}>{form.message || '(message preview)'}</div>
              {(form.date || form.time) && (
                <div style={{ fontSize: '12px', color: '#8892b0', marginTop: '8px' }}>
                  📅 {form.date} · 🕐 {form.time}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNotify;
