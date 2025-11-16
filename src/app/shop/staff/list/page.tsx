"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Search, Plus, Edit, Trash2, UserCog, Mail, Phone, Shield } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function StaffListPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const staff = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@shop.com",
      phone: "+1234567890",
      role: "Manager",
      department: "Sales",
      status: "Active",
    },
    {
      id: 2,
      name: "Bob Williams",
      email: "bob@shop.com",
      phone: "+1234567891",
      role: "Cashier",
      department: "Sales",
      status: "Active",
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@shop.com",
      phone: "+1234567892",
      role: "Sales Associate",
      department: "Sales",
      status: "On Leave",
    },
  ];

  const filteredStaff = staff.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600 mt-1">Manage your staff members and roles</p>
        </div>
        <Link href="/shop/staff/add-new">
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            Add Staff
          </Button>
        </Link>
      </div>

      {/* Search */}
      <Card>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search staff..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </Card>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((member) => (
          <Card key={member.id}>
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-primary-50 rounded-full">
                <UserCog className="text-primary-600" size={24} />
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" leftIcon={<Edit size={16} />} />
                <Button variant="ghost" size="sm" leftIcon={<Trash2 size={16} className="text-red-600" />} />
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{member.name}</h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={16} />
                <span>{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone size={16} />
                <span>{member.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Shield size={16} />
                <span>{member.role}</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-600">Department</p>
                <p className="font-semibold">{member.department}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  member.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {member.status}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

