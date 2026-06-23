import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Billing() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100">

      <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex justify-between items-center h-16">
            {/* Left - Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-3 text-white hover:text-indigo-100 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-all duration-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Back to Dashboard</span>
              </button>

              <div className="h-8 w-px bg-white/30"></div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">Billing Pro</h1>
                  <p className="text-xs text-indigo-100">Invoice Management</p>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                </svg>
                <span className="text-sm font-medium">Dashboard</span>
              </button>

              <button
                onClick={() => navigate('/inventory')}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="text-sm font-medium">Inventory</span>
              </button>

              <button
                onClick={() => navigate('/analytics')}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-sm font-medium">Analytics</span>
              </button>

              <div className="w-px h-6 bg-white/30 mx-2"></div>

              <div className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">
                Billing
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {user && (
                <div className="flex items-center space-x-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-white">{user.name || user.email}</p>
                    <p className="text-xs text-indigo-100">Billing Admin</p>
                  </div>
                  <div className="relative">
                    <img
                      src="https://i.pravatar.cc/36"
                      alt="profile"
                      className="w-9 h-9 rounded-full border-2 border-white/30 shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                    title="Logout"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="md:hidden border-t border-white/20">
          <div className="px-6 py-3">
            <div className="flex justify-around">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex flex-col items-center space-y-1 text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                </svg>
                <span className="text-xs">Dashboard</span>
              </button>

              <button
                onClick={() => navigate('/inventory')}
                className="flex flex-col items-center space-y-1 text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="text-xs">Inventory</span>
              </button>

              <button
                onClick={() => navigate('/analytics')}
                className="flex flex-col items-center space-y-1 text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-xs">Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="px-6 py-8 lg:px-10">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/70">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-semibold text-slate-900">Billing Experience</h1>
                <p className="mt-3 max-w-2xl text-slate-600">
                  An independent billing view that focuses on checkout flow, invoice summary, and order review without the shared admin sidebar layout.
                </p>
              </div>
              <button className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
                Create New Invoice
              </button>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
            <section className="space-y-6 rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/70">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Available Products</h2>
                <p className="mt-1 text-sm text-slate-500">Search, select, and add products to your current order.</p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
                <svg className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search products"
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { name: 'Wireless Mouse', price: '₹29.99', category: 'Electronics' },
                { name: 'Mechanical Keyboard', price: '₹89.99', category: 'Electronics' },
                { name: 'Office Chair', price: '₹249.99', category: 'Furniture' },
                { name: 'Coffee Mug', price: '₹12.99', category: 'Merch' },
              ].map((item) => (
                <button
                  key={item.name}
                  className="group rounded-3xl border border-slate-200 p-4 text-left transition hover:border-blue-400 hover:bg-blue-50"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">{item.category}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {item.price}
                    </span>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm transition group-hover:bg-blue-500 group-hover:text-white">
                    Add to cart
                  </div>
                </button>
              ))}
            </div>
          </section>

          <aside className="space-y-6 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 text-white shadow-xl">
            <div>
              <h2 className="text-xl font-semibold">Invoice Summary</h2>
              <p className="mt-2 text-sm text-slate-300">Review your current billing details and complete checkout.</p>
            </div>

            <div className="space-y-4 rounded-3xl bg-slate-900/90 p-5 shadow-inner">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>Subtotal</span>
                <span>₹382.97</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>Tax (18%)</span>
                <span>₹68.94</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>Discount</span>
                <span>-₹10.00</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-700 pt-4 text-lg font-semibold text-white">
                <span>Total</span>
                <span>₹441.91</span>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-900/90 p-5 shadow-inner">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">Payment method</h3>
              <p className="mt-4 text-sm text-slate-200">Visa ending in 4621</p>
              <p className="mt-1 text-xs text-slate-500">Expiration 11/27</p>
            </div>

            <button className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
              Complete Payment
            </button>

            <div className="rounded-3xl bg-slate-900/90 p-4 text-sm text-slate-300">
              <p className="font-medium text-slate-200">Order details</p>
              <ul className="mt-3 space-y-3">
                <li className="flex items-center justify-between">
                  <span>Wireless Mouse</span>
                  <span>₹29.99</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Mechanical Keyboard</span>
                  <span>₹89.99</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Office Chair</span>
                  <span>₹249.99</span>
                </li>
                <li className="flex items-center justify-between text-slate-400">
                  <span className="font-medium">Shipping</span>
                  <span>₹12.00</span>
                </li>
              </ul>
            </div>
          </aside>
          </div>
        </div>
      </div>
    </div>
  );
}