"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Download, Filter, Calendar } from "lucide-react";
import { SalesChart } from "@/components/charts/SalesChart";
import { RevenueExpenseChart } from "@/components/charts/RevenueExpenseChart";
import { formatCurrency } from "@/lib/utils";

export default function SalesReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Sales Reports</h1>
          <p className="text-gray-600 mt-1">Analyze your sales performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Button variant="primary">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div>
            <p className="text-sm text-gray-600">Total Sales</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(350000)}</p>
            <p className="text-sm text-green-600 mt-1">↑ 12% from last month</p>
          </div>
        </Card>
        <Card>
          <div>
            <p className="text-sm text-gray-600">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">3,421</p>
            <p className="text-sm text-green-600 mt-1">↑ 8% from last month</p>
          </div>
        </Card>
        <Card>
          <div>
            <p className="text-sm text-gray-600">Average Order Value</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(102.3)}</p>
            <p className="text-sm text-green-600 mt-1">↑ 5% from last month</p>
          </div>
        </Card>
        <Card>
          <div>
            <p className="text-sm text-gray-600">Refunds</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(12500)}</p>
            <p className="text-sm text-red-600 mt-1">↑ 3% from last month</p>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
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

      {/* Filter by Customer/Staff */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Reports</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Customer</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="">All Customers</option>
              <option value="1">John Doe</option>
              <option value="2">Jane Smith</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Staff</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="">All Staff</option>
              <option value="1">Staff Member 1</option>
              <option value="2">Staff Member 2</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button variant="primary" className="w-full">
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

