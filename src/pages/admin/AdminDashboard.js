import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllStudents, getAllAllocations, getAllNotifications } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const BRANCHES = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL'];

const AdminDashboard = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [s, a, n] = await Promise.all([
          getAllStudents(), getAllAllocations(), getAllNotifications()
        ]);
        setStudents(s.data.data || []);
        setAllocations(a.data.data || []);
        setNotifications(n.data.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const branchCounts = BRANCHES.map(b => ({
    branch: b,
    count: students.filter(s => s.branch === b).length,
  }));

  if (loading) return (
    <AdminLayout>
      <div className="loading-container"><div className="spinner" /><p>Loading dashboard...</p></div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="page-header">
        <div>
          <h2>Dashboard</h2>
          <p>Welcome back, {user?.name || 'Admin'} 👋 Here's an overview of the system.</p>
        </div>
        <span className="badge badge-primary">🕐 {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>

      {/* Summary Stats */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e8eaf6' }}>👥</div>
          <div className="stat-info">
            <h3>{students.length}</h3>
            <p>Total Students</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e8f5e9' }}>🏛️</div>
          <div className="stat-info">
            <h3>{allocations.length}</h3>
            <p>Hall Allocations</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fff8e1' }}>🔔</div>
          <div className="stat-info">
            <h3>{notifications.length}</h3>
            <p>Notifications Sent</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fce4ec' }}>🏫</div>
          <div className="stat-info">
            <h3>{BRANCHES.length}</h3>
            <p>Branches</p>
          </div>
        </div>
      </div>

      {/* Branch Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '28px' }}>
        <div className="card">
          <h3 style={{ marginBottom: '18px', fontSize: '17px', color: '#1a237e' }}>📊 Students by Branch</h3>
          {branchCounts.map(({ branch, count }) => (
            <div key={branch} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>{branch}</span>
                <span style={{ fontSize: '13px', color: '#5c6680' }}>{count} students</span>
              </div>
              <div style={{ background: '#eef0f8', borderRadius: '4px', height: '8px' }}>
                <div style={{
                  background: 'linear-gradient(90deg, #1a237e, #3949ab)',
                  borderRadius: '4px', height: '8px',
                  width: students.length ? `${(count / students.length) * 100}%` : '0%',
                  transition: 'width 0.8s ease',
                  minWidth: count > 0 ? '4px' : '0',
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Recent Notifications */}
        <div className="card">
          <h3 style={{ marginBottom: '18px', fontSize: '17px', color: '#1a237e' }}>🔔 Recent Notifications</h3>
          {notifications.length === 0 ? (
            <div className="empty-state" style={{ padding: '20px' }}>
              <div className="icon">📭</div>
              <p>No notifications sent yet</p>
            </div>
          ) : (
            notifications.slice(0, 4).map(n => (
              <div key={n.id} className="notif-card">
                <div className="message">{n.message.length > 80 ? n.message.substring(0, 80) + '...' : n.message}</div>
                <div className="meta">
                  <span>📅 {n.date}</span>
                  <span>🕐 {n.time}</span>
                  {n.targetBranch && <span className="badge badge-primary">{n.targetBranch}</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recent Allocations */}
      <div className="card">
        <h3 style={{ marginBottom: '18px', fontSize: '17px', color: '#1a237e' }}>🏛️ Recent Hall Allocations</h3>
        {allocations.length === 0 ? (
          <div className="empty-state">
            <div className="icon">🏛️</div>
            <h3>No allocations yet</h3>
            <p>Start by allocating exam halls to branches and sections.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Branch</th><th>Section</th><th>Roll Range</th>
                  <th>Hall</th><th>Room</th><th>Subject</th><th>Date</th>
                </tr>
              </thead>
              <tbody>
                {allocations.slice(0, 5).map(a => (
                  <tr key={a.id}>
                    <td><span className="badge badge-primary">{a.branch}</span></td>
                    <td><strong>{a.section}</strong></td>
                    <td style={{ fontSize: '13px', color: '#5c6680' }}>{a.startRoll} – {a.endRoll}</td>
                    <td><strong>{a.hallName}</strong></td>
                    <td>{a.roomNumber}</td>
                    <td>{a.subject}</td>
                    <td style={{ fontSize: '13px', color: '#5c6680' }}>{a.examDate || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
