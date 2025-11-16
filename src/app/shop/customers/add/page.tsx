"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSchema, CustomerFormData } from "@/schemas/customer.schema";
import { FormInput, FormTextarea, FormSelect } from "@/components/ui/FormField";
import { PhotoUpload } from "@/components/ui/PhotoUpload";

export default function AddCustomerPage() {
  const router = useRouter();

  const methods = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema) as any,
    defaultValues: {
      isB2B: false,
      creditAllowed: false,
      offersOptIn: false,
      openingBalance: 0,
      creditLimit: 0,
      loyaltyPoints: 0,
      notificationPreference: [],
    },
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting },
  } = methods;

  const isB2B = watch("isB2B");
  const creditAllowed = watch("creditAllowed");

  const onSubmit = async (data: CustomerFormData): Promise<void> => {
    try {
      // Convert form data to submission format
      const submitData = {
        ...data,
        customerPhoto: data.customerPhoto?.[0] || null,
      };

      console.log("Customer data:", submitData);

      // Here you would typically make an API call
      // await fetch('/api/customers', { method: 'POST', body: JSON.stringify(submitData) });

      // Redirect after successful submission
      router.push("/shop/customers");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Add New Customer</h1>
            <p className="text-gray-600 mt-1">Create a new customer profile</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.back()} type="button" leftIcon={<X className="w-4 h-4" />}>
              Cancel
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Info</CardTitle>
            </CardHeader>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormInput
                    name="name"
                    label="Name"
                    type="text"
                    placeholder="Enter customer name"
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
                    name="alternatePhone"
                    label="Alternate Phone"
                    type="tel"
                    placeholder="Enter alternate phone number"
                  />
                  <FormInput
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter email address"
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
                    name="dob"
                    label="DOB"
                    type="date"
                  />
                  <FormInput
                    name="anniversary"
                    label="Anniversary"
                    type="date"
                  />
                </div>
                <div className="w-full md:w-auto md:flex-shrink-0">
                  <Controller
                    name="customerPhoto"
                    control={control}
                    render={({ field }) => (
                      <PhotoUpload
                        label="Customer Photo"
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

          {/* Address */}
          <Card>
            <CardHeader>
              <CardTitle>Address</CardTitle>
            </CardHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* <div className="md:col-span-1 space-y-4"> */}
                <div className="md:col-span-1">
                  <FormInput
                    name="city"
                    label="City"
                    type="text"
                    placeholder="Enter city"
                  />
                  </div>
                  <div className="md:col-span-1">
                  <FormInput
                    name="state"
                    label="State"
                    type="text"
                    placeholder="Enter state"
                  />
                  </div>
                  <div className="md:col-span-1">
                  <FormInput
                    name="pinCode"
                    label="PIN Code"
                    type="text"
                    placeholder="Enter PIN code"
                  />
                  </div>
                  <div className="md:col-span-1">
                  <FormTextarea
                    name="billingAddress"
                    label="Billing Address"
                    placeholder="Enter billing address"
                    rows={3}
                  />
                </div>
                <div className="md:col-span-1">
                  <FormTextarea
                    name="shippingAddress"
                    label="Shipping Address"
                    placeholder="Enter shipping address"
                    rows={3}
                  />
                </div>
                </div>
              </div>
          </Card>

          {/* Business Info (If B2B) */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Business Info (If B2B)</CardTitle>
                <Controller
                  name="isB2B"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">B2B Customer</span>
                    </label>
                  )}
                />
              </div>
            </CardHeader>
            {isB2B && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormInput
                    name="companyName"
                    label="Company Name"
                    type="text"
                    placeholder="Enter company name"
                  />
                  <FormInput
                    name="gstNumber"
                    label="GST Number"
                    type="text"
                    placeholder="Enter GST number"
                  />
                  <FormInput
                    name="pan"
                    label="PAN"
                    type="text"
                    placeholder="Enter PAN"
                  />
                  <FormInput
                    name="businessCategory"
                    label="Business Category"
                    type="text"
                    placeholder="Enter business category"
                  />
                </div>
              </div>
            )}
          </Card>

          {/* Account / Finance */}
          <Card>
            <CardHeader>
              <CardTitle>Account / Finance</CardTitle>
            </CardHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormInput
                  name="openingBalance"
                  label="Opening Balance"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Credit Allowed
                  </label>
                  <Controller
                    name="creditAllowed"
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
                  name="creditLimit"
                  label="Credit Limit"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  disabled={!creditAllowed}
                />
                <FormSelect
                  name="priceTier"
                  label="Price Tier"
                  placeholder="Select price tier"
                  options={[
                    { value: "", label: "Select price tier" },
                    { value: "tier1", label: "Tier 1" },
                    { value: "tier2", label: "Tier 2" },
                    { value: "tier3", label: "Tier 3" },
                    { value: "tier4", label: "Tier 4" },
                  ]}
                />
                <FormSelect
                  name="discountGroup"
                  label="Discount Group"
                  placeholder="Select discount group"
                  options={[
                    { value: "", label: "Select discount group" },
                    { value: "group1", label: "Group 1" },
                    { value: "group2", label: "Group 2" },
                    { value: "group3", label: "Group 3" },
                  ]}
                />
                <FormSelect
                  name="paymentPreference"
                  label="Payment Preference"
                  placeholder="Select payment preference"
                  options={[
                    { value: "", label: "Select payment preference" },
                    { value: "cash", label: "Cash" },
                    { value: "card", label: "Card" },
                    { value: "upi", label: "UPI" },
                    { value: "bank-transfer", label: "Bank Transfer" },
                    { value: "credit", label: "Credit" },
                  ]}
                />
              </div>
            </div>
          </Card>

          {/* Loyalty / Marketing */}
          <Card>
            <CardHeader>
              <CardTitle>Loyalty / Marketing</CardTitle>
            </CardHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormInput
                  name="loyaltyPoints"
                  label="Loyalty Points"
                  type="number"
                  placeholder="0"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Offers Opt-In
                  </label>
                  <Controller
                    name="offersOptIn"
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notification Preference
                  </label>
                  <Controller
                    name="notificationPreference"
                    control={control}
                    render={({ field }) => (
                      <div className="flex flex-wrap gap-4">
                        {(["SMS", "WhatsApp", "Email"] as const).map((pref) => (
                          <label key={pref} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={field.value?.includes(pref) || false}
                              onChange={(e) => {
                                const current = field.value || [];
                                const updated = e.target.checked
                                  ? [...current, pref]
                                  : current.filter((p) => p !== pref);
                                field.onChange(updated);
                              }}
                              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <span className="text-sm text-gray-700">{pref}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Additional Info */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Info</CardTitle>
            </CardHeader>
            <div className="space-y-4">
              <FormTextarea
                name="notes"
                label="Notes"
                placeholder="Enter any additional notes..."
                rows={4}
              />
            </div>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting} loading={isSubmitting} leftIcon={<Save className="w-4 h-4" />}>
              {isSubmitting ? "Saving..." : "Save Customer"}
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
