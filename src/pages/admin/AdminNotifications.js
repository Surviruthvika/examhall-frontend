import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllNotifications } from '../../services/api';
import toast from 'react-hot-toast';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAllNotifications()
      .then(res => setNotifications(res.data.data || []))
      .catch(() => toast.error('Failed to load notifications'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = notifications.filter(n =>
    !search ||
    n.message?.toLowerCase().includes(search.toLowerCase()) ||
    n.targetBranch?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="page-header">
        <div>
          <h2>Notification History</h2>
          <p>All notifications sent to students</p>
        </div>
        <span className="badge badge-primary">{notifications.length} total</span>
      </div>

      <div className="card" style={{ marginBottom: '20px', padding: '14px 20px' }}>
        <div className="form-group" style={{ maxWidth: '360px' }}>
          <label>Search Notifications</label>
          <input type="text" placeholder="Search by message or branch..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <div className="loading-container"><div className="spinner" /><p>Loading...</p></div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="icon">📭</div>
          <h3>No notifications found</h3>
          <p>Send a notification from the "Send Notification" page.</p>
        </div>
      ) : (
        <div>
          {filtered.map(n => (
            <div key={n.id} className="notif-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <div className="message" style={{ flex: 1 }}>{n.message}</div>
                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                  {n.targetBranch ? (
                    <span className="badge badge-primary">🏫 {n.targetBranch} Branch</span>
                  ) : (
                    <span className="badge badge-info">👤 Specific Students</span>
                  )}
                </div>
              </div>
              <div className="meta">
                <span>📅 {n.date}</span>
                <span>🕐 {n.time}</span>
                {n.sentBy && <span>👤 {n.sentBy}</span>}
                {n.studentRolls && !n.targetBranch && (
                  <span style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    Roll(s): {n.studentRolls}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminNotifications;
