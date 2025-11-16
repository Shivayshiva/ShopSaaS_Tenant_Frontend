"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { staffSchema, StaffFormData } from "@/schemas/staff.schema";
import { FormInput, FormTextarea, FormSelect, FormCheckbox } from "@/components/ui/FormField";
import { PhotoUpload } from "@/components/ui/PhotoUpload";

export default function AddStaffPage() {
  const router = useRouter();

  const methods = useForm<StaffFormData>({
    resolver: zodResolver(staffSchema) as any,
    defaultValues: {
      canHandleCash: false,
      maxDiscountAllowed: 0,
      monthlySalary: 0,
      hourlyRate: 0,
      commissionPercent: 0,
    },
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting },
  } = methods;

  const salaryType = watch("salaryType");

  const onSubmit = async (data: StaffFormData): Promise<void> => {
    try {
      // Convert form data to submission format
      const submitData = {
        ...data,
        profilePhoto: data.profilePhoto?.[0] || null,
      };

      console.log("Staff data:", submitData);

      // Here you would typically make an API call
      // await fetch('/api/staff', { method: 'POST', body: JSON.stringify(submitData) });

      // Redirect after successful submission
      router.push("/shop/staff");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Add New Staff</h1>
            <p className="text-gray-600 mt-1">Create a new staff member profile</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.back()} type="button" leftIcon={<X className="w-4 h-4" />}>
              Cancel
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
          {/* Basic Details */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Details</CardTitle>
            </CardHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      name="staffName"
                      label="Staff Name"
                      type="text"
                      placeholder="Enter staff name"
                      required
                    />
                    <FormInput
                      name="phone"
                      label="Phone"
                      type="tel"
                      placeholder="Enter phone number"
                      required
                    />
                    <FormInput
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="Enter email address"
                    />
                    <FormSelect
                      name="role"
                      label="Role"
                      placeholder="Select role"
                      options={[
                        { value: "", label: "Select role" },
                        { value: "Cashier", label: "Cashier" },
                        { value: "Manager", label: "Manager" },
                        { value: "Sales", label: "Sales" },
                        { value: "Inventory", label: "Inventory" },
                        { value: "Admin", label: "Admin" },
                      ]}
                    />
                    <FormSelect
                      name="gender"
                      label="Gender"
                      placeholder="Select gender"
                      options={[
                        { value: "", label: "Select gender" },
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "other", label: "Other" },
                        { value: "prefer-not-to-say", label: "Prefer not to say" },
                      ]}
                    />
                    <FormInput
                      name="dateOfBirth"
                      label="Date of Birth"
                      type="date"
                    />
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <Controller
                    name="profilePhoto"
                    control={control}
                    render={({ field }) => (
                      <PhotoUpload
                        label="Profile Photo"
                        value={field.value?.[0] || null}
                        onChange={(file) => {
                          if (file) {
                            const dataTransfer = new DataTransfer();
                            dataTransfer.items.add(file);
                            field.onChange(dataTransfer.files);
                          } else {
                            field.onChange(undefined);
                          }
                        }}
                        onDelete={() => field.onChange(undefined)}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Job Details */}
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormInput
                  name="joiningDate"
                  label="Joining Date"
                  type="date"
                />
                <FormInput
                  name="department"
                  label="Department"
                  type="text"
                  placeholder="Enter department"
                />
                <FormInput
                  name="employeeCode"
                  label="Employee Code / Staff ID"
                  type="text"
                  placeholder="Enter employee code"
                />
                <FormInput
                  name="shiftStartTime"
                  label="Shift Start Time"
                  type="time"
                />
                <FormInput
                  name="shiftEndTime"
                  label="Shift End Time"
                  type="time"
                />
              </div>
            </div>
          </Card>

          {/* Login & Permissions */}
          <Card>
            <CardHeader>
              <CardTitle>Login & Permissions</CardTitle>
            </CardHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormInput
                  name="username"
                  label="Username"
                  type="text"
                  placeholder="Enter username"
                  required
                />
                <FormInput
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  required
                />
                <FormSelect
                  name="accessLevel"
                  label="Access Level"
                  placeholder="Select access level"
                  options={[
                    { value: "", label: "Select access level" },
                    { value: "Admin", label: "Admin" },
                    { value: "Manager", label: "Manager" },
                    { value: "Staff", label: "Staff" },
                  ]}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Can Handle Cash
                  </label>
                  <Controller
                    name="canHandleCash"
                    control={control}
                    render={({ field }) => (
                      <select
                        value={field.value ? "yes" : "no"}
                        onChange={(e) => field.onChange(e.target.value === "yes")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    )}
                  />
                </div>
                <FormInput
                  name="maxDiscountAllowed"
                  label="Max Discount Allowed (%)"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  placeholder="0"
                />
              </div>
            </div>
          </Card>

          {/* Salary Details */}
          <Card>
            <CardHeader>
              <CardTitle>Salary Details</CardTitle>
            </CardHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormSelect
                  name="salaryType"
                  label="Salary Type"
                  placeholder="Select salary type"
                  options={[
                    { value: "", label: "Select salary type" },
                    { value: "Fixed", label: "Fixed" },
                    { value: "Hourly", label: "Hourly" },
                    { value: "Commission", label: "Commission" },
                  ]}
                />
                {salaryType === "Fixed" && (
                  <FormInput
                    name="monthlySalary"
                    label="Monthly Salary"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    required
                  />
                )}
                {salaryType === "Hourly" && (
                  <FormInput
                    name="hourlyRate"
                    label="Hourly Rate"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    required
                  />
                )}
                {salaryType === "Commission" && (
                  <FormInput
                    name="commissionPercent"
                    label="Commission %"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    placeholder="0"
                    required
                  />
                )}
              </div>
            </div>
          </Card>

          {/* Identity */}
          <Card>
            <CardHeader>
              <CardTitle>Identity</CardTitle>
            </CardHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormInput
                  name="aadharNumber"
                  label="Aadhar Number"
                  type="text"
                  placeholder="Enter Aadhar number"
                />
                <FormInput
                  name="pan"
                  label="PAN"
                  type="text"
                  placeholder="Enter PAN"
                />
              </div>
              <FormTextarea
                name="address"
                label="Address"
                placeholder="Enter address"
                rows={3}
              />
            </div>
          </Card>

          {/* Other */}
          <Card>
            <CardHeader>
              <CardTitle>Other</CardTitle>
            </CardHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormInput
                  name="emergencyContact"
                  label="Emergency Contact"
                  type="tel"
                  placeholder="Enter emergency contact"
                />
                <div className="md:col-span-2">
                  <FormTextarea
                    name="notes"
                    label="Notes"
                    placeholder="Enter any additional notes..."
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting} loading={isSubmitting} leftIcon={<Save className="w-4 h-4" />}>
              {isSubmitting ? "Saving..." : "Save Staff"}
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}

