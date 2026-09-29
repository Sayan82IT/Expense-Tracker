// import React, { useState } from 'react';

// import { forgotPassword } from '../services/api';

// const ForgotPassword = ({ onNavigate }) => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await forgotPassword({ email });
//       setMessage(data.message || 'Reset link sent to your email');
//       setError('');
//     } catch (err) {
//       setError(err.response?.data?.message || 'User not found');
//       setMessage('');
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2>Reset Password</h2>
//         {message && <p style={styles.success}>{message}</p>}
//         {error && <p style={styles.error}>{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div style={styles.inputGroup}>
//             <label>Email Address</label>
//             <input 
//               type="email" 
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <button type="submit" style={styles.button}>Send Reset Link</button>
//         </form>
//         <div style={styles.links}>
//           <span onClick={() => onNavigate('login')} style={styles.link}>Back to Login</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f4f6f8' },
//   card: { width: '380px', padding: '30px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
//   inputGroup: { marginBottom: '15px' },
//   button: { width: '100%', padding: '10px', background: '#17a2b8', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
//   links: { marginTop: '15px', textAlign: 'center', fontSize: '14px' },
//   link: { color: '#007bff', cursor: 'pointer', textDecoration: 'underline' },
//   success: { color: 'green', fontSize: '14px' },
//   error: { color: 'red', fontSize: '14px' }
// };

// export default ForgotPassword;




import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, KeyRound, Lock } from 'lucide-react';
import { forgotPassword, verifyResetOTP, resetPassword } from '../services/api';
import { Wallet } from 'lucide-react';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await forgotPassword(email);
      setMessage(data.message);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await verifyResetOTP(email, otp);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(email, otp, newPassword);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-[#0b0f19] border border-slate-800 text-white placeholder-slate-500 rounded-lg pl-10 pr-3 py-2.5 focus:outline-none focus:border-emerald-500';

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0e17] px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center mb-4">
            <Wallet className="text-emerald-400" size={26} />
          </div>
          <h1 className="text-2xl font-bold text-white">ExpenseFlow MERN</h1>
          <p className="text-sm text-indigo-400 mt-1">Full-stack Financial Management Interface</p>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          {step === 1 && (
            <>
              <h2 className="text-lg font-bold text-white mb-1">Reset Password</h2>
              <p className="text-sm text-slate-400 mb-5">
                Enter your email address and we'll send a password reset OTP code.
              </p>
              {error && (
                <div className="bg-red-950/50 border border-red-800 text-red-400 text-sm rounded-lg px-3 py-2 mb-4">
                  {error}
                </div>
              )}
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="user@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white font-semibold rounded-lg py-3 transition"
                >
                  {loading ? 'Sending...' : 'Send Reset OTP Code'}
                </button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-lg font-bold text-white mb-1">Enter OTP Code</h2>
              <p className="text-sm text-slate-400 mb-5">
                We sent a 6-digit code to <span className="text-slate-200">{email}</span>
              </p>
              {message && (
                <div className="bg-emerald-950/50 border border-emerald-800 text-emerald-400 text-sm rounded-lg px-3 py-2 mb-4">
                  {message}
                </div>
              )}
              {error && (
                <div className="bg-red-950/50 border border-red-800 text-red-400 text-sm rounded-lg px-3 py-2 mb-4">
                  {error}
                </div>
              )}
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-1">OTP Code</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="123456"
                      className={inputClass}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white font-semibold rounded-lg py-3 transition"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </form>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-lg font-bold text-white mb-1">Set New Password</h2>
              <p className="text-sm text-slate-400 mb-5">Choose a new password for your account.</p>
              {error && (
                <div className="bg-red-950/50 border border-red-800 text-red-400 text-sm rounded-lg px-3 py-2 mb-4">
                  {error}
                </div>
              )}
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-1">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className={inputClass}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white font-semibold rounded-lg py-3 transition"
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            </>
          )}

          <div className="text-center mt-5">
            <Link to="/login" className="text-sm text-slate-400 hover:text-emerald-400">
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;