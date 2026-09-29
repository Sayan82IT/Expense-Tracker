// import React, { useState, useContext } from 'react';

// import { loginUser } from '../services/api';
// import { AuthContext } from '../context/AuthContext';

// const Login = ({ onNavigate }) => {
//   const { login } = useContext(AuthContext);
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await loginUser(formData);
//       login(data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Invalid credentials');
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2>Sign In</h2>
//         {error && <p style={styles.error}>{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div style={styles.inputGroup}>
//             <label>Email Address</label>
//             <input 
//               type="email" 
//               required
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             />
//           </div>
//           <div style={styles.inputGroup}>
//             <label>Password</label>
//             <input 
//               type="password" 
//               required
//               value={formData.password}
//               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//             />
//           </div>
//           <button type="submit" style={styles.button}>Login</button>
//         </form>
//         <div style={styles.links}>
//           <span onClick={() => onNavigate('forgot')} style={styles.link}>Forgot Password?</span>
//           <br />
//           <span>Don't have an account? </span>
//           <span onClick={() => onNavigate('signup')} style={styles.link}>Sign Up</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f4f6f8' },
//   card: { width: '380px', padding: '30px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
//   inputGroup: { marginBottom: '15px' },
//   button: { width: '100%', padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
//   links: { marginTop: '15px', textAlign: 'center', fontSize: '14px' },
//   link: { color: '#007bff', cursor: 'pointer', textDecoration: 'underline' },
//   error: { color: 'red', fontSize: '14px' }
// };

// export default Login;



import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { loginUser } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await loginUser(formData);
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {error && (
        <div className="bg-red-950/50 border border-red-800 text-red-400 text-sm rounded-lg px-3 py-2 mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="user@example.com"
              className="w-full bg-[#0b0f19] border border-slate-800 text-white placeholder-slate-500 rounded-lg pl-10 pr-3 py-2.5 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm text-slate-300">Password</label>
            <span
              onClick={() => navigate('/forgot-password')}
              className="text-sm text-emerald-400 cursor-pointer hover:underline"
            >
              Forgot password?
            </span>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-[#0b0f19] border border-slate-800 text-white placeholder-slate-500 rounded-lg pl-10 pr-3 py-2.5 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white font-semibold rounded-lg py-3 transition"
        >
          {loading ? 'Signing In...' : 'Sign In to Dashboard'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;