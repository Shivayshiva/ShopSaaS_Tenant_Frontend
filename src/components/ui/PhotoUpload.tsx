"use client";

import * as React from "react";
import { useState } from "react";
import { Upload, X, Camera, Image as ImageIcon } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

export interface PhotoUploadProps {
  value?: File | string | null;
  onChange?: (file: File | null) => void;
  onDelete?: () => void;
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
  previewClassName?: string;
}

export function PhotoUpload({
  value,
  onChange,
  onDelete,
  label,
  required,
  error,
  helperText,
  accept = "image/*",
  maxSize = 5,
  className,
  previewClassName,
}: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(
    typeof value === "string" ? value : value ? URL.createObjectURL(value) : null
  );
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSize) {
        alert(`File size must be less than ${maxSize}MB`);
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange?.(file);
    } else {
      setPreview(null);
      onChange?.(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileChange(file);
  };

  const handleDelete = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onChange?.(null);
    onDelete?.();
  };

  const handleChange = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] || null;
    handleFileChange(file);
  };

  React.useEffect(() => {
    if (typeof value === "string") {
      setPreview(value);
    } else if (value instanceof File) {
      setPreview(URL.createObjectURL(value));
    } else if (!value) {
      setPreview(null);
    }

    return () => {
      if (value instanceof File && preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [value]);

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg transition-colors cursor-pointer",
          error
            ? "border-red-500 bg-red-50"
            : isDragging
            ? "border-primary-500 bg-primary-50"
            : "border-gray-300 bg-gray-50",
          preview ? "border-solid bg-white p-4" : "min-h-[200px]"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleChange}
      >
        {preview ? (
          <div className={cn(
            "relative group w-full h-[200px] flex items-center justify-center",
            previewClassName
          )}>
            <img
              src={preview}
              alt="Preview"
              className={cn(
                "w-full h-full rounded-lg object-cover transition-opacity duration-200 group-hover:opacity-60"
              )}
            />
            <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleChange();
                }}
                className="bg-white shadow-lg hover:bg-gray-50 pointer-events-auto"
                leftIcon={<Camera className="w-4 h-4" />}
              >
                Change
              </Button>
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                className="bg-white shadow-lg hover:bg-red-50 pointer-events-auto"
                leftIcon={<X className="w-4 h-4" />}
              >
                Delete
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 px-2 " onClick={handleChange}>
            <div className="p-3 bg-gray-100 rounded-full mb-3">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium text-primary-600 hover:text-primary-700">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF up to {maxSize}MB
            </p>
            <Button
              type="button"
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleChange();
              }}
              className="mt-3"
              leftIcon={<Upload className="w-4 h-4" />}
            >
              Upload Photo
            </Button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}

