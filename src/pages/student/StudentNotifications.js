import React, { useState, useEffect } from 'react';
import StudentLayout from '../../components/student/StudentLayout';
import { getStudentNotifications } from '../../services/api';
import toast from 'react-hot-toast';

const StudentNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudentNotifications()
      .then(res => setNotifications(res.data.data || []))
      .catch(() => toast.error('Failed to load notifications'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <StudentLayout>
      <div className="page-header">
        <div>
          <h2>Notifications</h2>
          <p>All notifications sent to you by admin</p>
        </div>
        <span className="badge badge-success">{notifications.length} messages</span>
      </div>

      {loading ? (
        <div className="loading-container"><div className="spinner" /><p>Loading notifications...</p></div>
      ) : notifications.length === 0 ? (
        <div className="card" style={{ maxWidth: '480px', margin: '0 auto' }}>
          <div className="empty-state">
            <div className="icon">📭</div>
            <h3>No Notifications Yet</h3>
            <p>You haven't received any notifications. Your admin will send updates about exam hall allocations and important announcements here.</p>
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: '700px' }}>
          {notifications.map((n, idx) => (
            <div key={n.id} className="notif-card" style={{ borderLeftColor: idx === 0 ? '#e53935' : '#1a237e' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <div className="message" style={{ flex: 1 }}>{n.message}</div>
                {idx === 0 && <span className="badge badge-danger" style={{ flexShrink: 0 }}>New</span>}
              </div>
              <div className="meta">
                <span>📅 {n.date}</span>
                <span>🕐 {n.time}</span>
                {n.targetBranch && <span className="badge badge-primary" style={{ fontSize: '11px' }}>Branch: {n.targetBranch}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </StudentLayout>
  );
};

export default StudentNotifications;
