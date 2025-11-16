import { z } from "zod";

// Zod validation schema for staff form
export const staffSchema = z.object({
  // Basic Details
  staffName: z.string().min(1, "Staff name is required"),
  phone: z.string().min(1, "Phone is required").regex(/^[0-9+\-\s()]+$/, "Invalid phone number"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  role: z.enum(["Cashier", "Manager", "Sales", "Inventory", "Admin", ""]).optional(),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say", ""]).optional(),
  dateOfBirth: z.string().optional(),
  profilePhoto: z.instanceof(FileList).optional(),

  // Job Details
  joiningDate: z.string().optional(),
  department: z.string().optional(),
  shiftStartTime: z.string().optional(),
  shiftEndTime: z.string().optional(),
  employeeCode: z.string().optional(),

  // Login & Permissions
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  accessLevel: z.enum(["Admin", "Manager", "Staff", ""]).optional(),
  canHandleCash: z.boolean().default(false),
  maxDiscountAllowed: z.coerce.number().min(0).max(100).optional().default(0),

  // Salary Details
  salaryType: z.enum(["Fixed", "Hourly", "Commission", ""]).optional(),
  monthlySalary: z.coerce.number().min(0).optional().default(0),
  hourlyRate: z.coerce.number().min(0).optional().default(0),
  commissionPercent: z.coerce.number().min(0).max(100).optional().default(0),

  // Identity
  aadharNumber: z.string().optional(),
  pan: z.string().optional(),
  address: z.string().optional(),

  // Other
  emergencyContact: z.string().optional(),
  notes: z.string().optional(),
}).refine((data) => {
  if (data.salaryType === "Fixed" && (!data.monthlySalary || data.monthlySalary <= 0)) {
    return false;
  }
  return true;
}, {
  message: "Monthly salary is required for fixed salary type",
  path: ["monthlySalary"],
}).refine((data) => {
  if (data.salaryType === "Hourly" && (!data.hourlyRate || data.hourlyRate <= 0)) {
    return false;
  }
  return true;
}, {
  message: "Hourly rate is required for hourly salary type",
  path: ["hourlyRate"],
}).refine((data) => {
  if (data.salaryType === "Commission" && (!data.commissionPercent || data.commissionPercent <= 0)) {
    return false;
  }
  return true;
}, {
  message: "Commission percentage is required for commission salary type",
  path: ["commissionPercent"],
});

export type StaffFormData = z.infer<typeof staffSchema>;

