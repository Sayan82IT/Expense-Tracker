// import { useState, useContext } from 'react';

// import { registerUser } from '../services/api';
// import { AuthContext } from '../context/AuthContext';

// const Register = ({ onNavigate }) => {
//   const { login } = useContext(AuthContext);
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await registerUser(formData);
//       login(data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed');
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2>Create Account</h2>
//         {error && <p style={styles.error}>{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div style={styles.inputGroup}>
//             <label>Full Name</label>
//             <input 
//               type="text" 
//               required
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             />
//           </div>
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
//           <button type="submit" style={styles.button}>Sign Up</button>
//         </form>
//         <div style={styles.links}>
//           <span>Already have an account? </span>
//           <span onClick={() => onNavigate('login')} style={styles.link}>Login</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f4f6f8' },
//   card: { width: '380px', padding: '30px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
//   inputGroup: { marginBottom: '15px' },
//   button: { width: '100%', padding: '10px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
//   links: { marginTop: '15px', textAlign: 'center', fontSize: '14px' },
//   link: { color: '#007bff', cursor: 'pointer', textDecoration: 'underline' },
//   error: { color: 'red', fontSize: '14px' }
// };

// export default Register;



import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ShieldCheck } from 'lucide-react';
import { registerUser } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    try {
      const { data } = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
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
          <label className="block text-sm text-slate-300 mb-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Alex Johnson"
              className="w-full bg-[#0b0f19] border border-slate-800 text-white placeholder-slate-500 rounded-lg pl-10 pr-3 py-2.5 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

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
          <label className="block text-sm text-slate-300 mb-1">Password</label>
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

        <div>
          <label className="block text-sm text-slate-300 mb-1">Confirm Password</label>
          <div className="relative">
            <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
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
          {loading ? 'Creating Account...' : 'Create New Account'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Register;