"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Edit, Trash2, Plus, Eye } from "lucide-react";

export default function BillTemplatesPage() {
  const templates = [
    { id: 1, name: "Standard Template", isDefault: true },
    { id: 2, name: "Minimal Template", isDefault: false },
    { id: 3, name: "Detailed Template", isDefault: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Invoice Templates</h1>
          <p className="text-gray-600 mt-1">Customize your invoice templates</p>
        </div>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          New Template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id}>
            <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-400 mb-2">Invoice</div>
                <div className="text-gray-500">Preview</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{template.name}</h3>
                {template.isDefault && (
                  <span className="text-xs text-primary-600 font-medium">Default</span>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Eye size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit size={16} />
                </Button>
                {!template.isDefault && (
                  <Button variant="ghost" size="sm">
                    <Trash2 size={16} className="text-red-600" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

