"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Search, AlertTriangle, Package, TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const inventory = [
    { id: 1, name: "Product A", sku: "PROD-001", stock: 100, minStock: 50, value: 5000 },
    { id: 2, name: "Product B", sku: "PROD-002", stock: 5, minStock: 20, value: 375 },
    { id: 3, name: "Product C", sku: "PROD-003", stock: 200, minStock: 100, value: 6000 },
    { id: 4, name: "Product D", sku: "PROD-004", stock: 8, minStock: 15, value: 800 },
  ];

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockItems = filteredInventory.filter((item) => item.stock < item.minStock);
  const totalValue = inventory.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Track stock levels and manage inventory</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div>
            <p className="text-sm text-gray-600">Total Products</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{inventory.length}</p>
          </div>
        </Card>
        <Card>
          <div>
            <p className="text-sm text-gray-600">Total Stock Value</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(totalValue)}</p>
          </div>
        </Card>
        <Card>
          <div>
            <p className="text-sm text-gray-600">Low Stock Items</p>
            <p className="text-2xl font-bold text-red-600 mt-1">{lowStockItems.length}</p>
          </div>
        </Card>
        <Card>
          <div>
            <p className="text-sm text-gray-600">Out of Stock</p>
            <p className="text-2xl font-bold text-red-600 mt-1">0</p>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </Card>

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-red-600" size={20} />
              <CardTitle>Low Stock Alerts</CardTitle>
            </div>
          </CardHeader>
          <div className="space-y-2">
            {lowStockItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.stock} left (min: {item.minStock})
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Restock
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory List</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Product</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">SKU</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Stock</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Min Stock</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Value</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{item.sku}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{item.stock}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{item.minStock}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {formatCurrency(item.value)}
                  </td>
                  <td className="py-3 px-4">
                    {item.stock < item.minStock ? (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                        Low Stock
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        In Stock
                      </span>
                    )}
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

