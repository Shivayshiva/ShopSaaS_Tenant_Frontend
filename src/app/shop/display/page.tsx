"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, Edit, Trash2, Image as ImageIcon, Eye, Star, TrendingUp } from "lucide-react";

export default function ShopDisplayPage() {
  const banners = [
    { id: 1, name: "Summer Sale", image: "/banner1.jpg", status: "Active", position: "Top" },
    { id: 2, name: "New Arrivals", image: "/banner2.jpg", status: "Active", position: "Middle" },
  ];

  const featuredProducts = [
    { id: 1, name: "Product A", image: "/product1.jpg", status: "Featured" },
    { id: 2, name: "Product B", image: "/product2.jpg", status: "Featured" },
    { id: 3, name: "Product C", image: "/product3.jpg", status: "Trending" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Shop Display Management</h1>
        <p className="text-gray-600 mt-1">Manage banners, promotions, and featured products</p>
      </div>

      {/* Banners */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Banners & Promotions</CardTitle>
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Banner
            </Button>
          </div>
        </CardHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <div key={banner.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <ImageIcon className="text-gray-400" size={48} />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{banner.name}</h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      banner.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {banner.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Position: {banner.position}</p>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Edit size={16} className="mr-1" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Eye size={16} className="mr-1" />
                    Preview
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 size={16} className="text-red-600" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Featured Products */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Featured & Trending Products</CardTitle>
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </CardHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <ImageIcon className="text-gray-400" size={48} />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">{product.name}</h3>
                  {product.status === "Featured" ? (
                    <Star className="text-yellow-500" size={16} />
                  ) : (
                    <TrendingUp className="text-blue-500" size={16} />
                  )}
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    product.status === "Featured"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {product.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Theme Customization */}
      <Card>
        <CardHeader>
          <CardTitle>Theme Customization</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Shop Logo</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <ImageIcon className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-sm text-gray-600">Upload logo</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Shop Slogan</label>
            <input
              type="text"
              placeholder="Enter shop slogan"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

