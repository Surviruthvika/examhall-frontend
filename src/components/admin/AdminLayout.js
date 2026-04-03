import React from 'react';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';

const AdminLayout = ({ children }) => (
  <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
    <Navbar />
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '32px', overflowX: 'hidden' }}>
        {children}
      </main>
    </div>
  </div>
);

export default AdminLayout;
