"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Search, Filter, Plus, Edit, Trash2, Upload, Download, Package } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";

export default function ProductsListPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const products = [
    {
      id: 1,
      name: "Product A",
      category: "Electronics",
      price: 50,
      stock: 100,
      sku: "PROD-001",
      barcode: "1234567890",
    },
    {
      id: 2,
      name: "Product B",
      category: "Clothing",
      price: 75,
      stock: 50,
      sku: "PROD-002",
      barcode: "1234567891",
    },
    {
      id: 3,
      name: "Product C",
      category: "Food",
      price: 30,
      stock: 200,
      sku: "PROD-003",
      barcode: "1234567892",
    },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product catalog</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" leftIcon={<Upload className="w-4 h-4" />}>
            Bulk Upload
          </Button>
          <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
            Export
          </Button>
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            Add Product
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products by name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="food">Food</option>
          </select>
          <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
            Filter
          </Button>
        </div>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-primary-50 rounded-lg">
                <Package className="text-primary-600" size={24} />
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" leftIcon={<Edit size={16} />} />
                <Button variant="ghost" size="sm" leftIcon={<Trash2 size={16} className="text-red-600" />} />
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{product.category}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-medium">{formatCurrency(product.price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Stock:</span>
                <span className={`font-medium ${product.stock < 20 ? "text-red-600" : "text-green-600"}`}>
                  {product.stock}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">SKU:</span>
                <span className="font-medium text-xs">{product.sku}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

