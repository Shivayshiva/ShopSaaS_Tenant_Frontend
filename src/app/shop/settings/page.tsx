"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Save, Building, DollarSign, FileText, Bell, Shield, Database, Plug } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Settings & Configuration</h1>
        <p className="text-gray-600 mt-1">Manage your shop settings and preferences</p>
      </div>

      {/* Shop Profile */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building className="text-primary-600" size={20} />
            <CardTitle>Shop Profile</CardTitle>
          </div>
        </CardHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Shop Name</label>
              <input
                type="text"
                defaultValue="My Shop"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                defaultValue="shop@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                defaultValue="+1234567890"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                defaultValue="123 Main St"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <Button variant="primary" leftIcon={<Save className="w-4 h-4" />}>
            Save Changes
          </Button>
        </div>
      </Card>

      {/* Tax & Currency */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <DollarSign className="text-primary-600" size={20} />
            <CardTitle>Tax & Currency Settings</CardTitle>
          </div>
        </CardHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
              <input
                type="number"
                defaultValue="10"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <Button variant="primary" leftIcon={<Save className="w-4 h-4" />}>
            Save Changes
          </Button>
        </div>
      </Card>

      {/* Invoice Template */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="text-primary-600" size={20} />
            <CardTitle>Invoice Template Settings</CardTitle>
          </div>
        </CardHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Default Template</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="standard">Standard Template</option>
              <option value="minimal">Minimal Template</option>
              <option value="detailed">Detailed Template</option>
            </select>
          </div>
          <Button variant="primary" leftIcon={<Save className="w-4 h-4" />}>
            Save Changes
          </Button>
        </div>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="text-primary-600" size={20} />
            <CardTitle>Notification Settings</CardTitle>
          </div>
        </CardHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm text-gray-700">Email Notifications</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm text-gray-700">SMS Notifications</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm text-gray-700">WhatsApp Notifications</span>
            </label>
          </div>
          <Button variant="primary" leftIcon={<Save className="w-4 h-4" />}>
            Save Changes
          </Button>
        </div>
      </Card>

      {/* Roles & Permissions */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="text-primary-600" size={20} />
            <CardTitle>Role & Permission Management</CardTitle>
          </div>
        </CardHeader>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Manage user roles and permissions for your shop.</p>
          <Button variant="outline">Manage Roles</Button>
        </div>
      </Card>

      {/* Integrations */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Plug className="text-primary-600" size={20} />
            <CardTitle>Integrations</CardTitle>
          </div>
        </CardHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Payment Gateway</p>
                <p className="text-sm text-gray-600">Connect payment processors</p>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">SMS API</p>
                <p className="text-sm text-gray-600">Configure SMS notifications</p>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Backup & Restore */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="text-primary-600" size={20} />
            <CardTitle>Backup & Restore</CardTitle>
          </div>
        </CardHeader>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Backup your shop data or restore from a previous backup.</p>
          <div className="flex gap-2">
            <Button variant="outline">Create Backup</Button>
            <Button variant="outline">Restore Backup</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

