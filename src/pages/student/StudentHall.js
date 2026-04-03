import React, { useState, useEffect } from 'react';
import StudentLayout from '../../components/student/StudentLayout';
import { getHallAllocation, getStudentProfile } from '../../services/api';

const StudentHall = () => {
  const [allocation, setAllocation] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getHallAllocation(), getStudentProfile()])
      .then(([a, p]) => {
        setAllocation(a.data.data);
        setProfile(p.data.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <StudentLayout>
      <div className="loading-container"><div className="spinner" /><p>Loading hall allocation...</p></div>
    </StudentLayout>
  );

  return (
    <StudentLayout>
      <div className="page-header">
        <div>
          <h2>Exam Hall Allocation</h2>
          <p>Your assigned exam hall details</p>
        </div>
      </div>

      {!allocation ? (
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
          <div className="empty-state">
            <div className="icon">🏛️</div>
            <h3>Hall Not Allocated Yet</h3>
            <p>Your exam hall hasn't been assigned yet. Your admin will allocate a hall based on your roll number and section. Please check back later.</p>
          </div>
          {profile && (
            <div style={{ marginTop: '20px', padding: '16px', background: '#f5f7ff', borderRadius: '10px', textAlign: 'left' }}>
              <h4 style={{ fontSize: '13px', color: '#5c6680', marginBottom: '10px', letterSpacing: '0.5px' }}>YOUR DETAILS (FOR REFERENCE)</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[
                  ['Roll No', profile.rollNumber],
                  ['Branch', profile.branch],
                  ['Section', profile.section],
                  ['Year', profile.year || '—'],
                ].map(([label, val]) => (
                  <div key={label}>
                    <div style={{ fontSize: '11px', color: '#8892b0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#1a237e' }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{ maxWidth: '620px' }}>
          {/* Main Hall Card */}
          <div className="hall-card" style={{ marginBottom: '20px' }}>
            <h3>{allocation.hallName}</h3>
            <div className="room">Room Number: {allocation.roomNumber}</div>
            <div className="details">
              <div className="detail-item"><label>SUBJECT</label><span>{allocation.subject}</span></div>
              <div className="detail-item"><label>BRANCH</label><span>{allocation.branch}</span></div>
              <div className="detail-item"><label>SECTION</label><span>{allocation.section}</span></div>
              <div className="detail-item"><label>ROLL RANGE</label><span style={{ fontSize: '13px' }}>{allocation.startRoll} – {allocation.endRoll}</span></div>
              {allocation.examDate && <div className="detail-item"><label>EXAM DATE</label><span>{allocation.examDate}</span></div>}
              {allocation.examTime && <div className="detail-item"><label>EXAM TIME</label><span>{allocation.examTime}</span></div>}
            </div>
          </div>

          {/* Instructions */}
          <div className="card" style={{ background: '#e8f5e9', border: '1px solid #a5d6a7' }}>
            <h4 style={{ color: '#2e7d32', marginBottom: '12px', fontSize: '15px' }}>📋 Exam Day Instructions</h4>
            <ul style={{ fontSize: '14px', color: '#1b5e20', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Carry your Hall Ticket and a valid ID proof</li>
              <li>Report to the exam hall at least 15 minutes before the exam</li>
              <li>No electronic devices allowed inside the hall</li>
              <li>Sit in your allocated seat based on your roll number</li>
              <li>Hall: <strong>{allocation.hallName}</strong>, Room: <strong>{allocation.roomNumber}</strong></li>
            </ul>
          </div>
        </div>
      )}
    </StudentLayout>
  );
};

export default StudentHall;
