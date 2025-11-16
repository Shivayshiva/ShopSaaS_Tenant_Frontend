"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, Edit, Trash2, Folder } from "lucide-react";

export default function CategoriesPage() {
  const categories = [
    { id: 1, name: "Electronics", products: 45, parent: null },
    { id: 2, name: "Clothing", products: 32, parent: null },
    { id: 3, name: "Food", products: 28, parent: null },
    { id: 4, name: "Mobile Phones", products: 15, parent: "Electronics" },
    { id: 5, name: "Laptops", products: 12, parent: "Electronics" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-1">Manage product categories and brands</p>
        </div>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-50 rounded-lg">
                  <Folder className="text-primary-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  {category.parent && (
                    <p className="text-xs text-gray-500">Parent: {category.parent}</p>
                  )}
                  <p className="text-sm text-gray-600 mt-1">{category.products} products</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Edit size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 size={16} className="text-red-600" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

