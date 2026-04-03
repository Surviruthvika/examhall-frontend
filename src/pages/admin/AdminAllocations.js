import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllAllocations, getAllocationsByBranch, deleteAllocation } from '../../services/api';
import toast from 'react-hot-toast';

const BRANCHES = ['ALL', 'CSE', 'ECE', 'EEE', 'MECH', 'CIVIL'];

const AdminAllocations = () => {
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [branch, setBranch] = useState('ALL');

  const fetchAllocations = async (b) => {
    setLoading(true);
    try {
      const res = b === 'ALL' ? await getAllAllocations() : await getAllocationsByBranch(b);
      setAllocations(res.data.data || []);
    } catch { toast.error('Failed to fetch allocations'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAllocations(branch); }, [branch]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this allocation?')) return;
    try {
      await deleteAllocation(id);
      toast.success('Allocation deleted');
      fetchAllocations(branch);
    } catch { toast.error('Delete failed'); }
  };

  return (
    <AdminLayout>
      <div className="page-header">
        <div>
          <h2>Hall Allocations</h2>
          <p>View and manage all exam hall allocations</p>
        </div>
        <span className="badge badge-primary">{allocations.length} allocations</span>
      </div>

      <div className="card" style={{ marginBottom: '20px', padding: '16px 20px' }}>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ minWidth: '160px' }}>
            <label>Filter by Branch</label>
            <select value={branch} onChange={e => setBranch(e.target.value)}>
              {BRANCHES.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div className="loading-container"><div className="spinner" /><p>Loading...</p></div>
        ) : allocations.length === 0 ? (
          <div className="empty-state">
            <div className="icon">🏛️</div>
            <h3>No allocations found</h3>
            <p>Allocate exam halls from the "Allocate Hall" section.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th><th>Branch</th><th>Section</th><th>Roll Range</th>
                  <th>Hall</th><th>Room</th><th>Subject</th><th>Date</th><th>Time</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allocations.map((a, i) => (
                  <tr key={a.id}>
                    <td style={{ color: '#8892b0', fontSize: '13px' }}>{i + 1}</td>
                    <td><span className="badge badge-primary">{a.branch}</span></td>
                    <td><strong>{a.section}</strong></td>
                    <td style={{ fontSize: '12px', color: '#5c6680', whiteSpace: 'nowrap' }}>{a.startRoll} – {a.endRoll}</td>
                    <td><strong>{a.hallName}</strong></td>
                    <td>{a.roomNumber}</td>
                    <td style={{ maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.subject}</td>
                    <td style={{ fontSize: '13px', color: '#5c6680' }}>{a.examDate || '—'}</td>
                    <td style={{ fontSize: '13px', color: '#5c6680' }}>{a.examTime || '—'}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(a.id)}>
                        🗑️ Delete
                      </button>
                    </td>
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

export default AdminAllocations;
