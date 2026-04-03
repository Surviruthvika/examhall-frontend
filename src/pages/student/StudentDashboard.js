import React, { useState, useEffect } from 'react';
import StudentLayout from '../../components/student/StudentLayout';
import { getStudentProfile, getHallAllocation, getStudentNotifications } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [allocation, setAllocation] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [p, a, n] = await Promise.all([
          getStudentProfile(),
          getHallAllocation(),
          getStudentNotifications(),
        ]);
        setProfile(p.data.data);
        setAllocation(a.data.data);
        setNotifications(n.data.data || []);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchAll();
  }, []);

  if (loading) return (
    <StudentLayout>
      <div className="loading-container"><div className="spinner" /><p>Loading your dashboard...</p></div>
    </StudentLayout>
  );

  return (
    <StudentLayout>
      <div className="page-header">
        <div>
          <h2>Student Dashboard</h2>
          <p>Welcome, {profile?.name || user?.name}! 👋 Here's your exam information.</p>
        </div>
        <span className="badge badge-success">
          {profile?.branch} – Section {profile?.section}
        </span>
      </div>

      {/* Profile Stats */}
      <div className="stat-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e8eaf6' }}>🎓</div>
          <div className="stat-info">
            <h3 style={{ fontSize: '18px' }}>{profile?.rollNumber}</h3>
            <p>Roll Number</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e8f5e9' }}>📚</div>
          <div className="stat-info">
            <h3 style={{ fontSize: '18px' }}>{profile?.branch}</h3>
            <p>Branch</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fff8e1' }}>🔢</div>
          <div className="stat-info">
            <h3 style={{ fontSize: '18px' }}>Year {profile?.year || '—'}</h3>
            <p>Academic Year</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fce4ec' }}>🔔</div>
          <div className="stat-info">
            <h3 style={{ fontSize: '18px' }}>{notifications.length}</h3>
            <p>Notifications</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Hall Allocation */}
        <div>
          <h3 style={{ marginBottom: '14px', fontSize: '16px', color: '#1a237e' }}>🏛️ Your Exam Hall</h3>
          {allocation ? (
            <div className="hall-card">
              <h3>{allocation.hallName}</h3>
              <div className="room">Room No: {allocation.roomNumber}</div>
              <div className="details">
                <div className="detail-item"><label>SUBJECT</label><span>{allocation.subject}</span></div>
                <div className="detail-item"><label>SECTION</label><span>{allocation.section}</span></div>
                {allocation.examDate && <div className="detail-item"><label>DATE</label><span>{allocation.examDate}</span></div>}
                {allocation.examTime && <div className="detail-item"><label>TIME</label><span>{allocation.examTime}</span></div>}
                <div className="detail-item"><label>ROLL RANGE</label><span style={{ fontSize: '13px' }}>{allocation.startRoll} – {allocation.endRoll}</span></div>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="empty-state" style={{ padding: '30px' }}>
                <div className="icon">🏛️</div>
                <h3>Not Allocated Yet</h3>
                <p>Your exam hall hasn't been allocated yet. Check back later or contact your admin.</p>
              </div>
            </div>
          )}
        </div>

        {/* Recent Notifications */}
        <div>
          <h3 style={{ marginBottom: '14px', fontSize: '16px', color: '#1a237e' }}>🔔 Recent Notifications</h3>
          {notifications.length === 0 ? (
            <div className="card">
              <div className="empty-state" style={{ padding: '30px' }}>
                <div className="icon">📭</div>
                <h3>No Notifications</h3>
                <p>You'll see notifications from your admin here.</p>
              </div>
            </div>
          ) : (
            <div>
              {notifications.slice(0, 4).map(n => (
                <div key={n.id} className="notif-card">
                  <div className="message">{n.message}</div>
                  <div className="meta">
                    <span>📅 {n.date}</span>
                    <span>🕐 {n.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;
