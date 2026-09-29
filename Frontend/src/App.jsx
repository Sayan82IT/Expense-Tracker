// import React, { useContext, useState } from 'react';

// import { AuthContext } from './context/AuthContext';
// import Dashboard from './pages/Dashboard';
// import ForgotPassword from './pages/ForgotPassword';
// import Login from './pages/Login';
// import Register from './pages/Register';

// const App = () => {
//   const { user, logout } = useContext(AuthContext);
//   const [authView, setAuthView] = useState('login'); // 'login' | 'signup' | 'forgot'

//   // Step 1: Render Auth Views if user is not authenticated
//   if (!user) {
//     if (authView === 'signup') return <Register onNavigate={setAuthView} />;
//     if (authView === 'forgot') return <ForgotPassword onNavigate={setAuthView} />;
//     return <Login onNavigate={setAuthView} />;
//   }

//   // Step 2: Render Main Application Dashboard when authenticated
//   return (
//     <div>
//       <header style={styles.navbar}>
//         <h3>Expense Tracker</h3>
//         <div>
//           <span style={{ marginRight: '15px' }}>Welcome, {user.name || 'User'}</span>
//           <button onClick={logout} style={styles.logoutBtn}>Logout</button>
//         </div>
//       </header>
//       <main>
//         <Dashboard />
//       </main>
//     </div>
//   );
// };

// const styles = {
//   navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', background: '#2c3e50', color: '#fff' },
//   logoutBtn: { padding: '6px 12px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }
// };

// export default App;


// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import ForgotPassword from './pages/ForgotPassword'; // match your actual filename
// import Dashboard from './pages/Dashboard';

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Navigate to="/login" />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;


// import React, { useContext } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, AuthContext } from './context/AuthContext';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import ForgotPassword from './pages/ForgotPassword';
// import Dashboard from './pages/Dashboard';

// // Protected Route Wrapper Component
// const ProtectedRoute = ({ children }) => {
//   const { user, token, loading } = useContext(AuthContext);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center text-slate-400 text-sm">
//         Loading session...
//       </div>
//     );
//   }

//   if (!user && !token) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Navigate to="/login" replace />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
          
//           {/* Protected Dashboard Route */}
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />

//           {/* Catch-all redirect */}
//           <Route path="*" element={<Navigate to="/login" replace />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;



import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import IncomePage from './pages/IncomePage';
import ExpensePage from './pages/ExpensePage';
// import ComingSoon from './pages/ComingSoon';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/incomes" element={<IncomePage />} />
          <Route path="/expenses" element={<ExpensePage />} />
          {/* <Route path="/analytics" element={<ComingSoon title="Analytics & Reports" />} />
          <Route path="/settings" element={<ComingSoon title="Settings" />} /> */}
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;