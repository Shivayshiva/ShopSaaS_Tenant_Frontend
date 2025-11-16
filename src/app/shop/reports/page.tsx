"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Download, Filter, BarChart3, TrendingUp, DollarSign, Package, Users } from "lucide-react";
import { SalesChart } from "@/components/charts/SalesChart";
import { RevenueExpenseChart } from "@/components/charts/RevenueExpenseChart";
import { formatCurrency } from "@/lib/utils";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive business insights and reports</p>
        </div>
        <Button variant="primary">
          <Download className="w-4 h-4 mr-2" />
          Export All Reports
        </Button>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <DollarSign className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Sales Reports</p>
              <p className="text-sm text-gray-600">View sales data</p>
            </div>
          </div>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <Package className="text-green-600" size={24} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Product Reports</p>
              <p className="text-sm text-gray-600">Product analytics</p>
            </div>
          </div>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Users className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Customer Reports</p>
              <p className="text-sm text-gray-600">Customer insights</p>
            </div>
          </div>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-50 rounded-lg">
              <BarChart3 className="text-orange-600" size={24} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Profit & Loss</p>
              <p className="text-sm text-gray-600">Financial reports</p>
            </div>
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

      {/* Quick Reports */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Quick Reports</CardTitle>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Today's Sales</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(12500)}</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Monthly Revenue</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(350000)}</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Profit</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(87500)}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

