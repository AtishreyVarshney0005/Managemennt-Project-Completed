import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Dashboard", icon: "📊" },
    { path: "/inventory", label: "Inventory", icon: "📦" },
    { path: "/billing", label: "Billing", icon: "💰" },
    { path: "/analytics", label: "Analytics", icon: "📈" },
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-blue-700 to-purple-700 text-white shadow-xl">
      {/* Logo Section */}
      <div className="p-6 border-b border-white border-opacity-20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <span className="text-blue-600 font-bold text-xl">M</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">Management</h1>
            <p className="text-xs text-blue-200">Professional</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-white bg-opacity-20 text-white shadow-lg"
                    : "text-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-white"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 p-4 bg-white bg-opacity-10 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-200 mb-2">Quick Stats</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Products:</span>
              <span className="font-semibold">6</span>
            </div>
            <div className="flex justify-between">
              <span>Sales:</span>
              <span className="font-semibold">4</span>
            </div>
            <div className="flex justify-between">
              <span>Revenue:</span>
              <span className="font-semibold">$386.94</span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}