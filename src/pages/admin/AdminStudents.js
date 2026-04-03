import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllStudents, getStudentsByBranch, getStudentsByBranchSec } from '../../services/api';
import toast from 'react-hot-toast';

const BRANCHES = ['ALL', 'CSE', 'ECE', 'EEE', 'MECH', 'CIVIL'];
const SECTIONS = ['ALL', 'A', 'B', 'C', 'D', 'E'];

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [branch, setBranch] = useState('ALL');
  const [section, setSection] = useState('ALL');
  const [search, setSearch] = useState('');

  const fetchStudents = async (b, s) => {
    setLoading(true);
    try {
      let res;
      if (b === 'ALL') res = await getAllStudents();
      else if (s === 'ALL') res = await getStudentsByBranch(b);
      else res = await getStudentsByBranchSec(b, s);
      const data = res.data.data || [];
      setStudents(data);
      setFiltered(data);
    } catch {
      toast.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStudents(branch, section); }, [branch, section]);

  useEffect(() => {
    if (!search) { setFiltered(students); return; }
    const q = search.toLowerCase();
    setFiltered(students.filter(s =>
      s.rollNumber?.toLowerCase().includes(q) ||
      s.name?.toLowerCase().includes(q) ||
      s.phone?.includes(q)
    ));
  }, [search, students]);

  return (
    <AdminLayout>
      <div className="page-header">
        <div>
          <h2>Students</h2>
          <p>View and filter student records by branch and section</p>
        </div>
        <span className="badge badge-primary">{filtered.length} students</span>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: '20px', padding: '16px 20px' }}>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ flex: '1', minWidth: '140px' }}>
            <label>Branch</label>
            <select value={branch} onChange={e => { setBranch(e.target.value); setSection('ALL'); }}>
              {BRANCHES.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div className="form-group" style={{ flex: '1', minWidth: '120px' }}>
            <label>Section</label>
            <select value={section} onChange={e => setSection(e.target.value)} disabled={branch === 'ALL'}>
              {SECTIONS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-group" style={{ flex: '2', minWidth: '200px' }}>
            <label>Search</label>
            <input
              type="text" placeholder="Search by name, roll no, or phone..."
              value={search} onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => { setBranch('ALL'); setSection('ALL'); setSearch(''); }}>
            Reset
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div className="loading-container"><div className="spinner" /><p>Loading students...</p></div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="icon">👥</div>
            <h3>No students found</h3>
            <p>Try changing your filters or search query.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Roll Number</th>
                  <th>Name</th>
                  <th>Branch</th>
                  <th>Section</th>
                  <th>Year</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, idx) => (
                  <tr key={s.rollNumber}>
                    <td style={{ color: '#8892b0', fontSize: '13px' }}>{idx + 1}</td>
                    <td><strong style={{ color: '#1a237e' }}>{s.rollNumber}</strong></td>
                    <td>{s.name}</td>
                    <td><span className="badge badge-primary">{s.branch}</span></td>
                    <td><span className="badge badge-info">{s.section}</span></td>
                    <td>{s.year || '—'}</td>
                    <td style={{ fontSize: '13px', color: '#5c6680' }}>📱 {s.phone}</td>
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

export default AdminStudents;
