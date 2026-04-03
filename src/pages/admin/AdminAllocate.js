import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { allocateHall } from '../../services/api';
import toast from 'react-hot-toast';

const BRANCHES = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL'];
const SECTIONS = ['A', 'B', 'C', 'D', 'E'];

const AdminAllocate = () => {
  const [form, setForm] = useState({
    branch: '', section: '', startRoll: '', endRoll: '',
    hallName: '', roomNumber: '', subject: '', examDate: '', examTime: ''
  });
  const [loading, setLoading] = useState(false);
  const [lastAlloc, setLastAlloc] = useState(null);

  const set = f => e => setForm({ ...form, [f]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await allocateHall(form);
      if (res.data.success) {
        toast.success('Hall allocated successfully! 🎉');
        setLastAlloc(res.data.data);
        setForm({ branch: '', section: '', startRoll: '', endRoll: '', hallName: '', roomNumber: '', subject: '', examDate: '', examTime: '' });
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Allocation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="page-header">
        <div>
          <h2>Allocate Exam Hall</h2>
          <p>Assign exam halls to students by branch, section, and roll number range</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px', alignItems: 'start' }}>
        {/* Form */}
        <div className="card">
          <h3 style={{ marginBottom: '20px', fontSize: '17px', color: '#1a237e' }}>🏛️ Allocation Details</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>Branch *</label>
                <select required value={form.branch} onChange={set('branch')}>
                  <option value="">Select Branch</option>
                  {BRANCHES.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Section *</label>
                <select required value={form.section} onChange={set('section')}>
                  <option value="">Select Section</option>
                  {SECTIONS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>Start Roll Number *</label>
                <input type="text" placeholder="e.g. 21BCE7001" required value={form.startRoll} onChange={set('startRoll')} />
              </div>
              <div className="form-group">
                <label>End Roll Number *</label>
                <input type="text" placeholder="e.g. 21BCE7060" required value={form.endRoll} onChange={set('endRoll')} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>Hall Name *</label>
                <input type="text" placeholder="e.g. Block A" required value={form.hallName} onChange={set('hallName')} />
              </div>
              <div className="form-group">
                <label>Room Number *</label>
                <input type="text" placeholder="e.g. 101" required value={form.roomNumber} onChange={set('roomNumber')} />
              </div>
            </div>

            <div className="form-group">
              <label>Subject *</label>
              <input type="text" placeholder="e.g. Data Structures and Algorithms" required value={form.subject} onChange={set('subject')} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>Exam Date</label>
                <input type="date" value={form.examDate} onChange={set('examDate')} />
              </div>
              <div className="form-group">
                <label>Exam Time</label>
                <input type="time" value={form.examTime} onChange={set('examTime')} />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '4px' }}>
              {loading ? 'Allocating...' : '✅ Allocate Hall'}
            </button>
          </form>
        </div>

        {/* Preview / Last allocation */}
        <div>
          <div className="card" style={{ marginBottom: '16px', background: '#f5f7ff', border: '1px dashed #c5cae9' }}>
            <h4 style={{ fontSize: '13px', color: '#5c6680', marginBottom: '12px', letterSpacing: '0.5px' }}>PREVIEW</h4>
            <div className="hall-card">
              <h3>{form.hallName || 'Hall Name'}</h3>
              <div className="room">Room: {form.roomNumber || '—'}</div>
              <div className="details">
                <div className="detail-item"><label>Branch</label><span>{form.branch || '—'}</span></div>
                <div className="detail-item"><label>Section</label><span>{form.section || '—'}</span></div>
                <div className="detail-item"><label>Roll Range</label><span>{form.startRoll && form.endRoll ? `${form.startRoll} – ${form.endRoll}` : '—'}</span></div>
                <div className="detail-item"><label>Subject</label><span>{form.subject || '—'}</span></div>
                {form.examDate && <div className="detail-item"><label>Date</label><span>{form.examDate}</span></div>}
                {form.examTime && <div className="detail-item"><label>Time</label><span>{form.examTime}</span></div>}
              </div>
            </div>
          </div>

          {lastAlloc && (
            <div className="card" style={{ background: '#e8f5e9', border: '1px solid #a5d6a7' }}>
              <h4 style={{ color: '#2e7d32', marginBottom: '8px', fontSize: '13px' }}>✅ LAST ALLOCATION</h4>
              <p style={{ fontSize: '14px', color: '#1b5e20' }}>
                <strong>{lastAlloc.branch} – Section {lastAlloc.section}</strong><br />
                {lastAlloc.hallName}, Room {lastAlloc.roomNumber}<br />
                <span style={{ fontSize: '12px', color: '#388e3c' }}>{lastAlloc.startRoll} to {lastAlloc.endRoll}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAllocate;
