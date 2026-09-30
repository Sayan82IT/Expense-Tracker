// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5000/api', // Adjust to match your server port
// });

// // Attach JWT Auth Token to every request automatically
// API.interceptors.request.use((req) => {
//   const user = JSON.parse(localStorage.getItem('user'));
//   if (user && user.token) {
//     req.headers.Authorization = `Bearer ${user.token}`;
//   }
//   return req;
// });

// // User Authentication Endpoints (userRoute.js)
// export const loginUser = (formData) => API.post('/users/login', formData);
// export const registerUser = (formData) => API.post('/users/register', formData);
// export const forgotPassword = (formData) => API.post('/users/forgot-password', formData);

// // Dashboard Endpoint (dashboardRoute.js)
// export const fetchDashboardData = () => API.get('/dashboard');

// // Income Endpoints (incomeRoute.js)
// export const fetchIncomes = () => API.get('/income');
// export const addIncome = (data) => API.post('/income', data);
// export const deleteIncome = (id) => API.delete(`/income/${id}`);

// // Expense Endpoints (expenseRoute.js)
// export const fetchExpenses = () => API.get('/expense');
// export const addExpense = (data) => API.post('/expense', data);
// export const deleteExpense = (id) => API.delete(`/expense/${id}`);

// export default API;


import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const api = axios.create({ baseURL: API_BASE_URL });

//Attach token fresh on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Re-attach token on page refresh
const savedToken = localStorage.getItem('token');
if (savedToken) setAuthToken(savedToken);

export const registerUser = (formData) => api.post('/users/register', formData);
export const loginUser = (formData) => api.post('/users/login', formData);
export const getCurrentUser = () => api.get('/users/me');
export const updateProfile = (formData) => api.put('/users/profile', formData);
export const updatePassword = (formData) => api.put('/users/password', formData);
export const forgotPassword = (email) => api.post('/users/forgot-password', { email });
export const verifyResetOTP = (email, otp) => api.post('/users/verify-otp', { email, otp });
export const resetPassword = (email, otp, newPassword) =>
  api.post('/users/reset-password', { email, otp, newPassword });
export const fetchDashboardData = () => api.get('/dashboard');

// Income endpoints
export const getIncomes = () => api.get('/incomes/get');
export const addIncome = (data) => api.post('/incomes/add', data);
export const updateIncome = (id, data) => api.put(`/incomes/update/${id}`, data);
export const deleteIncome = (id) => api.delete(`/incomes/delete/${id}`);
export const getIncomeOverview = (range) => api.get(`/incomes/overview?range=${range}`);

// Expense endpoints
export const getExpenses = () => api.get('/expenses/get');
export const addExpense = (data) => api.post('/expenses/add', data);
export const updateExpense = (id, data) => api.put(`/expenses/update/${id}`, data);
export const deleteExpense = (id) => api.delete(`/expenses/delete/${id}`);
export const getExpenseOverview = (range) => api.get(`/expenses/overview?range=${range}`);

export default api;