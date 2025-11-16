import * as React from "react";
import { useFormContext, Controller, RegisterOptions } from "react-hook-form";
import { Input, InputProps } from "./Input";
import { Textarea, TextareaProps } from "./Textarea";
import { Select, SelectProps } from "./Select";
import { Checkbox, CheckboxProps } from "./Checkbox";

// Form Input Component
export interface FormInputProps extends Omit<InputProps, "error"> {
  name: string;
  rules?: RegisterOptions;
}

export function FormInput({ name, rules, ...props }: FormInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Input
          {...field}
          {...props}
          error={errors[name]?.message as string}
        />
      )}
    />
  );
}

// Form Textarea Component
export interface FormTextareaProps extends Omit<TextareaProps, "error"> {
  name: string;
  rules?: RegisterOptions;
}

export function FormTextarea({ name, rules, ...props }: FormTextareaProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Textarea
          {...field}
          {...props}
          error={errors[name]?.message as string}
        />
      )}
    />
  );
}

// Form Select Component
export interface FormSelectProps extends Omit<SelectProps, "error"> {
  name: string;
  rules?: RegisterOptions;
}

export function FormSelect({ name, rules, ...props }: FormSelectProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Select
          {...field}
          {...props}
          error={errors[name]?.message as string}
        />
      )}
    />
  );
}

// Form Checkbox Component
export interface FormCheckboxProps extends Omit<CheckboxProps, "error"> {
  name: string;
  rules?: RegisterOptions;
}

export function FormCheckbox({ name, rules, ...props }: FormCheckboxProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Checkbox
          {...field}
          checked={field.value || false}
          {...props}
          error={errors[name]?.message as string}
        />
      )}
    />
  );
}

