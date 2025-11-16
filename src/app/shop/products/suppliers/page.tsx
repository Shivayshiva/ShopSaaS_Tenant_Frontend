"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, Edit, Trash2, Phone, Mail, Building } from "lucide-react";

export default function SuppliersPage() {
  const suppliers = [
    {
      id: 1,
      name: "Supplier A",
      contact: "John Doe",
      email: "john@suppliera.com",
      phone: "+1234567890",
      address: "123 Main St",
    },
    {
      id: 2,
      name: "Supplier B",
      contact: "Jane Smith",
      email: "jane@supplierb.com",
      phone: "+1234567891",
      address: "456 Oak Ave",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Suppliers</h1>
          <p className="text-gray-600 mt-1">Manage your suppliers and vendors</p>
        </div>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Supplier
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <Card key={supplier.id}>
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Building className="text-blue-600" size={24} />
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
            <h3 className="font-semibold text-gray-900 mb-2">{supplier.name}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone size={16} />
                <span>{supplier.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={16} />
                <span>{supplier.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Building size={16} />
                <span>{supplier.address}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

