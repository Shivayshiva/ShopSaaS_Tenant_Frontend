"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AttendancePage() {
  const attendance = [
    {
      id: 1,
      name: "Alice Johnson",
      date: "2024-01-15",
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
      status: "Present",
      hours: 9,
    },
    {
      id: 2,
      name: "Bob Williams",
      date: "2024-01-15",
      checkIn: "09:15 AM",
      checkOut: "06:30 PM",
      status: "Present",
      hours: 9.25,
    },
    {
      id: 3,
      name: "Charlie Brown",
      date: "2024-01-15",
      checkIn: "-",
      checkOut: "-",
      status: "Absent",
      hours: 0,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Present":
        return <CheckCircle className="text-green-600" size={20} />;
      case "Absent":
        return <XCircle className="text-red-600" size={20} />;
      case "Late":
        return <AlertCircle className="text-yellow-600" size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Attendance Tracking</h1>
          <p className="text-gray-600 mt-1">Track staff attendance and schedules</p>
        </div>
        <Button variant="outline">
          <Calendar className="w-4 h-4 mr-2" />
          Select Date
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div>
            <p className="text-sm text-gray-600">Total Staff</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{attendance.length}</p>
          </div>
        </Card>
        <Card>
          <div>
            <p className="text-sm text-gray-600">Present</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {attendance.filter((a) => a.status === "Present").length}
            </p>
          </div>
        </Card>
        <Card>
          <div>
            <p className="text-sm text-gray-600">Absent</p>
            <p className="text-2xl font-bold text-red-600 mt-1">
              {attendance.filter((a) => a.status === "Absent").length}
            </p>
          </div>
        </Card>
        <Card>
          <div>
            <p className="text-sm text-gray-600">Late</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">0</p>
          </div>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Attendance</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Staff</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Check In</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Check Out</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Hours</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{record.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{formatDate(record.date)}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{record.checkIn}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{record.checkOut}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{record.hours} hrs</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(record.status)}
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          record.status === "Present"
                            ? "bg-green-100 text-green-800"
                            : record.status === "Absent"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {record.status}
                      </span>
                    </div>
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

