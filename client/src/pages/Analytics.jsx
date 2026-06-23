import { useState, useEffect } from 'react';
import { Line, Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { salesAPI, productsAPI } from '../services/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Analytics() {
  const [salesData, setSalesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('month');

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const [salesRes, productsRes] = await Promise.all([
        salesAPI.getAll(),
        productsAPI.getAll(),
      ]);

      setSalesData(salesRes.data);
      setProductsData(productsRes.data);
    } catch (error) {
      toast.error('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const getRevenueByMonth = () => {
    const monthlyRevenue = {};
    salesData.forEach(sale => {
      const date = new Date(sale.sale_date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyRevenue[monthKey] = (monthlyRevenue[monthKey] || 0) + parseFloat(sale.total_amount);
    });

    const sortedMonths = Object.keys(monthlyRevenue).sort();
    return {
      labels: sortedMonths.map(month => {
        const [year, monthNum] = month.split('-');
        return new Date(year, monthNum - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      }),
      data: sortedMonths.map(month => monthlyRevenue[month])
    };
  };

  const getSalesByCategory = () => {
    const categorySales = {};
    salesData.forEach(sale => {
      const product = productsData.find(p => p.id === sale.product_id);
      const category = product?.category || 'Other';
      categorySales[category] = (categorySales[category] || 0) + parseFloat(sale.total_amount);
    });

    return {
      labels: Object.keys(categorySales),
      data: Object.values(categorySales)
    };
  };

  const getTopProducts = () => {
    const productSales = {};
    salesData.forEach(sale => {
      const product = productsData.find(p => p.id === sale.product_id);
      if (product) {
        productSales[product.name] = (productSales[product.name] || 0) + sale.quantity;
      }
    });

    const sortedProducts = Object.entries(productSales)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    return {
      labels: sortedProducts.map(([name]) => name),
      data: sortedProducts.map(([,quantity]) => quantity)
    };
  };

  const revenueData = getRevenueByMonth();
  const categoryData = getSalesByCategory();
  const topProductsData = getTopProducts();

  const lineChartData = {
    labels: revenueData.labels,
    datasets: [
      {
        label: "Revenue ($)",
        data: revenueData.data,
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79,70,229,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const pieChartData = {
    labels: categoryData.labels,
    datasets: [
      {
        data: categoryData.data,
        backgroundColor: ["#4F46E5", "#22C55E", "#F59E0B", "#EF4444", "#8B5CF6"],
      },
    ],
  };

  const barChartData = {
    labels: topProductsData.labels,
    datasets: [
      {
        label: "Units Sold",
        data: topProductsData.data,
        backgroundColor: "#4F46E5",
        borderColor: "#4F46E5",
        borderWidth: 1,
      },
    ],
  };
  const exportToCSV = () => {
    try {
      const csvData = salesData.map(sale => ({
        'Date': sale.sale_date,
        'Product': sale.product_name,
        'Quantity': sale.quantity,
        'Unit Price': sale.unit_price,
        'Total Amount': sale.total_amount,
        'Customer': sale.customer_name || 'N/A'
      }));

      const headers = Object.keys(csvData[0] || {});
      const csvContent = [
        headers.join(','),
        ...csvData.map(row => headers.map(header => `"${row[header]}"`).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `sales_analytics_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('CSV exported successfully!');
    } catch (error) {
      toast.error('Failed to export CSV');
      console.error('Export error:', error);
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" message="Loading analytics data..." />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Sales Analytics</h1>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Total Revenue</p>
          <h2 className="text-2xl font-bold text-green-600">
            ${salesData.reduce((sum, sale) => sum + parseFloat(sale.total_amount), 0).toFixed(2)}
          </h2>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Total Sales</p>
          <h2 className="text-2xl font-bold">{salesData.length}</h2>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Avg Order Value</p>
          <h2 className="text-2xl font-bold">
            ${salesData.length > 0 ? (salesData.reduce((sum, sale) => sum + parseFloat(sale.total_amount), 0) / salesData.length).toFixed(2) : '0.00'}
          </h2>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Products Sold</p>
          <h2 className="text-2xl font-bold">{salesData.reduce((sum, sale) => sum + sale.quantity, 0)}</h2>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeFilter('day')}
            className={`px-4 py-2 rounded ${timeFilter === 'day' ? 'bg-indigo-600 text-white' : 'bg-white shadow'}`}
          >
            Today
          </button>
          <button
            onClick={() => setTimeFilter('week')}
            className={`px-4 py-2 rounded ${timeFilter === 'week' ? 'bg-indigo-600 text-white' : 'bg-white shadow'}`}
          >
            This Week
          </button>
          <button
            onClick={() => setTimeFilter('month')}
            className={`px-4 py-2 rounded ${timeFilter === 'month' ? 'bg-indigo-600 text-white' : 'bg-white shadow'}`}
          >
            This Month
          </button>
          <button
            onClick={() => setTimeFilter('year')}
            className={`px-4 py-2 rounded ${timeFilter === 'year' ? 'bg-indigo-600 text-white' : 'bg-white shadow'}`}
          >
            This Year
          </button>
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 ml-4"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Revenue Trend</h2>
          <Line data={lineChartData} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Sales by Category</h2>
          <Pie data={pieChartData} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow col-span-2">
          <h2 className="font-semibold mb-4">Top Products</h2>
          <Bar data={barChartData} />
        </div>
      </div>
    </div>
  );
}