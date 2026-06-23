import { useState, useEffect } from 'react';
import { productsAPI, salesAPI } from '../services/api';
import { useSearch } from '../contexts/SearchContext';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
    lowStockItems: 0,
  });
  const [recentSales, setRecentSales] = useState([]);
  const [allSales, setAllSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery } = useSearch();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    const filtered = allSales.filter(sale =>
      sale.product_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.total_amount?.toString().includes(searchQuery)
    );
    setRecentSales(filtered.slice(0, 5));
  }, [searchQuery, allSales]);

  const fetchDashboardData = async () => {
    try {
      const [productsRes, salesRes] = await Promise.all([
        productsAPI.getAll(),
        salesAPI.getAll(),
      ]);

      const products = productsRes.data;
      const sales = salesRes.data;

      const totalProducts = products.length;
      const totalSales = sales.length;
      const totalRevenue = sales.reduce((sum, sale) => sum + parseFloat(sale.total_amount), 0);
      const lowStockItems = products.filter(product => product.stock_quantity < 10).length;

      setStats({
        totalProducts,
        totalSales,
        totalRevenue: totalRevenue.toFixed(2),
        lowStockItems,
      });

      setAllSales(sales);
      setRecentSales(sales.slice(0, 5));

    } catch (error) {
      toast.error('Failed to load dashboard data');
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" message="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500">Total Products</p>
          <h2 className="text-2xl font-bold">{stats.totalProducts}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500">Total Sales</p>
          <h2 className="text-2xl font-bold">{stats.totalSales}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500">Revenue</p>
          <h2 className="text-2xl font-bold">${stats.totalRevenue}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <p className="text-gray-500">Low Stock</p>
          <h2 className="text-2xl font-bold text-red-500">{stats.lowStockItems}</h2>
        </div>

      </div>

      {/* Recent Sales */}
      <div className="mt-8 bg-white p-5 rounded-xl shadow">
        <h2 className="font-semibold mb-3">Recent Sales</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Product</th>
                <th className="text-left py-2">Quantity</th>
                <th className="text-left py-2">Total</th>
                <th className="text-left py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map((sale) => (
                <tr key={sale.id} className="border-b">
                  <td className="py-2">{sale.product_name}</td>
                  <td className="py-2">{sale.quantity}</td>
                  <td className="py-2">${sale.total_amount}</td>
                  <td className="py-2">{new Date(sale.sale_date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}