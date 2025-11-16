import { z } from "zod";

// Zod validation schema for customer form
export const customerSchema = z.object({
  // Basic Info
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required").regex(/^[0-9+\-\s()]+$/, "Invalid phone number"),
  alternatePhone: z.string().regex(/^[0-9+\-\s()]*$/, "Invalid phone number").optional().or(z.literal("")),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say", ""]).optional(),
  dob: z.string().optional(),
  anniversary: z.string().optional(),

  // Address
  billingAddress: z.string().optional(),
  shippingAddress: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pinCode: z.string().regex(/^[0-9]*$/, "PIN code must be numeric").optional().or(z.literal("")),

  // Business Info (B2B)
  isB2B: z.boolean().default(false),
  companyName: z.string().optional(),
  gstNumber: z.string().optional(),
  pan: z.string().optional(),
  businessCategory: z.string().optional(),

  // Account / Finance
  openingBalance: z.coerce.number().optional().default(0),
  creditAllowed: z.boolean().default(false),
  creditLimit: z.coerce.number().optional().default(0),
  priceTier: z.enum(["tier1", "tier2", "tier3", "tier4", ""]).optional(),
  discountGroup: z.enum(["group1", "group2", "group3", ""]).optional(),
  paymentPreference: z.enum(["cash", "card", "upi", "bank-transfer", "credit", ""]).optional(),

  // Loyalty / Marketing
  loyaltyPoints: z.coerce.number().optional().default(0),
  offersOptIn: z.boolean().default(false),
  notificationPreference: z.array(z.enum(["SMS", "WhatsApp", "Email"])).default([]),

  // Additional Info
  customerPhoto: z.instanceof(FileList).optional(),
  notes: z.string().optional(),
  customFields: z.array(z.object({ key: z.string(), value: z.string() })).default([]),
}).refine((data) => {
  if (data.creditAllowed && (!data.creditLimit || data.creditLimit <= 0)) {
    return false;
  }
  return true;
}, {
  message: "Credit limit is required when credit is allowed",
  path: ["creditLimit"],
}).refine((data) => {
  if (data.isB2B) {
    if (!data.companyName || !data.gstNumber) {
      return false;
    }
  }
  return true;
}, {
  message: "Company name and GST number are required for B2B customers",
  path: ["companyName"],
});

export type CustomerFormData = z.infer<typeof customerSchema>;

