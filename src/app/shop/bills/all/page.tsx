"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Search, Filter, Download, Eye, Edit, Printer, FileText, Plus } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useState } from "react";

export default function AllBillsPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const bills = [
    {
      id: 1,
      billNumber: "BILL-001",
      customer: "John Doe",
      amount: 1250,
      date: "2024-01-15",
      status: "Paid",
      dueDate: "2024-01-15",
    },
    {
      id: 2,
      billNumber: "BILL-002",
      customer: "Jane Smith",
      amount: 890,
      date: "2024-01-15",
      status: "Unpaid",
      dueDate: "2024-01-20",
    },
    {
      id: 3,
      billNumber: "BILL-003",
      customer: "Bob Johnson",
      amount: 2100,
      date: "2024-01-14",
      status: "Paid",
      dueDate: "2024-01-14",
    },
  ];

  const filteredBills =
    statusFilter === "all"
      ? bills
      : bills.filter((bill) => bill.status.toLowerCase() === statusFilter.toLowerCase());

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Bill Management</h1>
          <p className="text-gray-600 mt-1">View and manage all bills</p>
        </div>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Create Bill
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search bills..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div>
            <p className="text-sm text-gray-600">Total Bills</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{bills.length}</p>
          </div>
        </Card>
        <Card>
          <div>
            <p className="text-sm text-gray-600">Paid Bills</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {bills.filter((b) => b.status === "Paid").length}
            </p>
          </div>
        </Card>
        <Card>
          <div>
            <p className="text-sm text-gray-600">Unpaid Bills</p>
            <p className="text-2xl font-bold text-red-600 mt-1">
              {bills.filter((b) => b.status === "Unpaid").length}
            </p>
          </div>
        </Card>
      </div>

      {/* Bills Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Bills</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Bill #</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Due Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBills.map((bill) => (
                <tr key={bill.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{bill.billNumber}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{bill.customer}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {formatCurrency(bill.amount)}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{formatDate(bill.date)}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{formatDate(bill.dueDate)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        bill.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {bill.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Printer size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download size={16} />
                      </Button>
                    </div>
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

