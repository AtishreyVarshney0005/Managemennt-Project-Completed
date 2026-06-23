import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill all fields');
      return;
    }

    if (formData.username.length < 3) {
      toast.error('Username must be at least 3 characters');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await authAPI.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      toast.success('Account created successfully! 🎉');
      
      setTimeout(() => {
        navigate('/login');
      }, 1500);

    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
        error?.message ||
        'Signup failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full blur-xl opacity-20 animate-blob delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full blur-xl opacity-20 animate-blob delay-4000"></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen px-4 py-8">
        <div className="max-w-md w-full">

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Management Pro
            </h1>
            <p className="text-gray-300">
              Create Your Account
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl">

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="text-sm text-gray-300">Username</label>
                <input
                  type="text"
                  name="username"
                  required
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 rounded-lg bg-white/5 text-white border border-gray-500 focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 rounded-lg bg-white/5 text-white border border-gray-500 focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Password</label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full mt-2 p-3 pr-10 rounded-lg bg-white/5 text-white border border-gray-500 focus:ring-2 focus:ring-purple-500 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-5 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm text-gray-300">Confirm Password</label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full mt-2 p-3 pr-10 rounded-lg bg-white/5 text-white border border-gray-500 focus:ring-2 focus:ring-purple-500 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-5 text-gray-400 hover:text-gray-300"
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !formData.username || !formData.email || !formData.password || !formData.confirmPassword}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>

            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
              <p>Already have an account? <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold">Sign in here</Link></p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;
