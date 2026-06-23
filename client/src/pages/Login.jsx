import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

    if (!formData.email || !formData.password) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.login(formData);

      const data = response?.data?.data || response?.data;
      const token = data?.token;
      const user = data?.user;

      if (!token || !user) {
        throw new Error('Invalid server response');
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success('Welcome back! 🎉');
      navigate('/dashboard');

    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
        error?.message ||
        'Login failed'
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

      <div className="relative flex items-center justify-center min-h-screen px-4">
        <div className="max-w-md w-full">

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Management Pro
            </h1>
            <p className="text-gray-300">
              Your Premium Business Dashboard
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl">

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="text-sm text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter email"
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
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full mt-2 p-3 rounded-lg bg-white/5 text-white border border-gray-500 focus:ring-2 focus:ring-purple-500 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-4 text-gray-400"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !formData.email || !formData.password}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:opacity-90 transition"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
              <p>Email: admin@example.com</p>
              <p>Password: admin123</p>
            </div>

            <div className="mt-6 text-center text-sm text-gray-400">
              <p>Don't have an account? <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-semibold">Create one now</Link></p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;