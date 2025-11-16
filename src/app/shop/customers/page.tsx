"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Search, Plus, Edit, Trash2, Download, Users, Mail, Phone, DollarSign, Star } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      totalSpend: 12500,
      orders: 25,
      loyaltyPoints: 250,
      balance: 0,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1234567891",
      totalSpend: 8900,
      orders: 18,
      loyaltyPoints: 180,
      balance: 500,
      rating: 4.8,
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "+1234567892",
      totalSpend: 21000,
      orders: 42,
      loyaltyPoints: 420,
      balance: 0,
      rating: 5.0,
    },
  ];

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">Manage your customer database</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
            Export Data
          </Button>
          <Link href="/shop/customers/add">
            <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
              Add Customer
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div>
            <p className="text-sm text-gray-600">Total Customers</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{customers.length}</p>
          </div>
        </Card>
        <Card>
          <div>
            <p className="text-sm text-gray-600">Active Customers</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{customers.length}</p>
          </div>
        </Card>
        <Card>
          <div>
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {formatCurrency(customers.reduce((sum, c) => sum + c.totalSpend, 0))}
            </p>
          </div>
        </Card>
        <Card>
          <div>
            <p className="text-sm text-gray-600">Outstanding Balance</p>
            <p className="text-2xl font-bold text-red-600 mt-1">
              {formatCurrency(customers.reduce((sum, c) => sum + c.balance, 0))}
            </p>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search customers by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </Card>

      {/* Customers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id}>
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-primary-50 rounded-full">
                <Users className="text-primary-600" size={24} />
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" leftIcon={<Edit size={16} />} />
                <Button variant="ghost" size="sm" leftIcon={<Trash2 size={16} className="text-red-600" />} />
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{customer.name}</h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={16} />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone size={16} />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign size={16} />
                <span>Total Spend: {formatCurrency(customer.totalSpend)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Star size={16} className="text-yellow-500" />
                <span>Rating: {customer.rating}</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-600">Orders</p>
                <p className="font-semibold">{customer.orders}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Points</p>
                <p className="font-semibold">{customer.loyaltyPoints}</p>
              </div>
              {customer.balance > 0 && (
                <div>
                  <p className="text-xs text-red-600">Balance</p>
                  <p className="font-semibold text-red-600">{formatCurrency(customer.balance)}</p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

