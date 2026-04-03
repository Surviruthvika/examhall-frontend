import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/';
    }
    return Promise.reject(err);
  }
);

// ---- Auth ----
export const adminSignup = (data) => api.post('/api/auth/admin/signup', data);
export const adminLogin  = (data) => api.post('/api/auth/admin/login', data);
export const studentSignup = (data) => api.post('/api/auth/student/signup', data);
export const studentLogin  = (data) => api.post('/api/auth/student/login', data);

// ---- Admin ----
export const getAllStudents          = ()         => api.get('/api/admin/students');
export const getStudentsByBranch    = (branch)   => api.get(`/api/admin/students/branch/${branch}`);
export const getStudentsByBranchSec = (b, s)     => api.get(`/api/admin/students/branch/${b}/section/${s}`);
export const allocateHall           = (data)     => api.post('/api/admin/allocate', data);
export const getAllAllocations       = ()         => api.get('/api/admin/allocations');
export const getAllocationsByBranch  = (branch)   => api.get(`/api/admin/allocations/branch/${branch}`);
export const deleteAllocation       = (id)       => api.delete(`/api/admin/allocations/${id}`);
export const sendNotification       = (data)     => api.post('/api/admin/notify', data);
export const getAllNotifications     = ()         => api.get('/api/admin/notifications');

// ---- Student ----
export const getStudentProfile    = () => api.get('/api/student/profile');
export const getHallAllocation    = () => api.get('/api/student/hall-allocation');
export const getStudentNotifications = () => api.get('/api/student/notifications');

export default api;
