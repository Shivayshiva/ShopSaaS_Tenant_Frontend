"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, Calendar, Clock } from "lucide-react";

export default function SchedulesPage() {
  const schedules = [
    {
      id: 1,
      name: "Alice Johnson",
      shift: "Morning",
      startTime: "09:00 AM",
      endTime: "06:00 PM",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    },
    {
      id: 2,
      name: "Bob Williams",
      shift: "Evening",
      startTime: "02:00 PM",
      endTime: "10:00 PM",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Shift Scheduling</h1>
          <p className="text-gray-600 mt-1">Manage staff shifts and schedules</p>
        </div>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Create Schedule
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schedules.map((schedule) => (
          <Card key={schedule.id}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{schedule.name}</h3>
                <p className="text-sm text-gray-600">{schedule.shift} Shift</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-gray-400" />
                <span className="text-gray-600">
                  {schedule.startTime} - {schedule.endTime}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={16} className="text-gray-400" />
                <div className="flex gap-1">
                  {schedule.days.map((day) => (
                    <span
                      key={day}
                      className="px-2 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

