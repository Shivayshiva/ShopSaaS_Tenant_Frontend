"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Package,
  ShoppingBag,
  AlertTriangle,
  Download,
  Calendar,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { SalesChart } from "@/components/charts/SalesChart";
import { RevenueExpenseChart } from "@/components/charts/RevenueExpenseChart";

export default function ShopOverview() {
  // Mock data - replace with actual data from your backend
  const stats = {
    todaySales: 12500,
    weeklySales: 87500,
    monthlySales: 350000,
    totalCustomers: 1245,
    totalProducts: 856,
    totalOrders: 3421,
    profit: 87500,
    revenue: 350000,
    expenses: 262500,
  };

  const bestSellingProducts = [
    { id: 1, name: "Product A", sales: 245, revenue: 12250 },
    { id: 2, name: "Product B", sales: 189, revenue: 9450 },
    { id: 3, name: "Product C", sales: 156, revenue: 7800 },
    { id: 4, name: "Product D", sales: 134, revenue: 6700 },
  ];

  const lowStockItems = [
    { id: 1, name: "Product X", stock: 5, minStock: 10 },
    { id: 2, name: "Product Y", stock: 8, minStock: 15 },
    { id: 3, name: "Product Z", stock: 3, minStock: 10 },
  ];

  const recentTransactions = [
    { id: 1, customer: "John Doe", amount: 1250, date: "2024-01-15", status: "Completed" },
    { id: 2, customer: "Jane Smith", amount: 890, date: "2024-01-15", status: "Pending" },
    { id: 3, customer: "Bob Johnson", amount: 2100, date: "2024-01-14", status: "Completed" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Shop Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Filter Date
          </Button>
          <Button variant="primary" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Sales Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Sales</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(stats.todaySales)}
              </p>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUp size={16} className="mr-1" />
                <span>12% from yesterday</span>
              </div>
            </div>
            <div className="p-3 bg-primary-50 rounded-lg">
              <DollarSign className="text-primary-600" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Weekly Sales</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(stats.weeklySales)}
              </p>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUp size={16} className="mr-1" />
                <span>8% from last week</span>
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="text-green-600" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Sales</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(stats.monthlySales)}
              </p>
              <div className="flex items-center mt-2 text-sm text-red-600">
                <TrendingDown size={16} className="mr-1" />
                <span>3% from last month</span>
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <ShoppingBag className="text-blue-600" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Profit</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(stats.profit)}
              </p>
              <div className="flex items-center mt-2 text-sm text-green-600">
                <TrendingUp size={16} className="mr-1" />
                <span>25% margin</span>
              </div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <DollarSign className="text-purple-600" size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalCustomers}</p>
            </div>
            <Users className="text-primary-600" size={32} />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalProducts}</p>
            </div>
            <Package className="text-green-600" size={32} />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalOrders}</p>
            </div>
            <ShoppingBag className="text-blue-600" size={32} />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Sales Graph</CardTitle>
          </CardHeader>
          <SalesChart />
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Expense</CardTitle>
          </CardHeader>
          <RevenueExpenseChart />
        </Card>
      </div>

      {/* Best Selling Products & Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Best Selling Products</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            {bestSellingProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.sales} sales</p>
                </div>
                <p className="font-semibold text-gray-900">{formatCurrency(product.revenue)}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alerts</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            {lowStockItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="text-red-600" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.stock} left (min: {item.minStock})
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Restock
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{transaction.customer}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{transaction.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        transaction.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

