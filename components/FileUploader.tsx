"use client";

import React, { useState } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "sonner";
import { FileUp, X, Loader2, Paperclip, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils"; 

interface FileUploaderProps {
  name: string;
  label: string;
  control: Control<any>;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
}

interface UploadResponse {
  name: string;
  ufsUrl?: string;
  
}

export default function FileUploader({
  name,
  label,
  control,
  error,
  required,
  disabled,
}: FileUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const { startUpload } = useUploadThing("cv", {
    onClientUploadComplete(res:UploadResponse[]) {
      const upload = res?.[0];
      if (upload) {
        setFileName(upload.name);
        setIsUploading(false);
        toast.success("File uploaded successfully!");
      }
    },
    onUploadError(err:Error) {
      setIsUploading(false);
      toast.error(`Upload failed: ${err.message}`);
    },
  });

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation
    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error("File size must be less than 8MB.");
      return;
    }

    setIsUploading(true);
    const res = await startUpload([file]);
    const upload = res?.[0];
    
    if (upload?.ufsUrl) {
      onChange(upload.ufsUrl);
    } else {
      setIsUploading(false);
    }
  };

  const handleRemove = (onChange: (value: string) => void) => {
    onChange("");
    setFileName(null);
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? "CV is required" : false }}
      render={({ field }) => (
        <div className="w-full space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {required && <span className="text-destructive mr-1 ">*</span>}
            {label}
            
          </label>

          <div className="relative">
            {!fileName ? (
              <label
                className={cn(
                  "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
                  "hover:bg-accent/50 hover:border-primary/50",
                  error ? "border-destructive bg-destructive/5" : "border-muted-foreground/25",
                  (disabled || isUploading) && "opacity-50 cursor-not-allowed"
                )}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {isUploading ? (
                    <Loader2 className="w-8 h-8 mb-3 animate-spin text-muted-foreground" />
                  ) : (
                    <FileUp className="w-8 h-8 mb-3 text-muted-foreground" />
                  )}
                  <p className="mb-1 text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">Click to upload</span> 
                  </p>
                  <p className="text-xs text-muted-foreground/70">PDF (Max 8MB)</p>
                </div>
                <input
                  type="file"
                  accept="application/pdf"
                  disabled={disabled || isUploading}
                  className="hidden"
                  onChange={(e) => handleFileChange(e, field.onChange)}
                />
              </label>
            ) : (
              <div className="flex items-center gap-3 p-3 border rounded-lg bg-card animate-in fade-in zoom-in-95 duration-200">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Paperclip className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{fileName}</p>
                  <div className="flex items-center text-xs text-green-600 gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Ready
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(field.onChange)}
                  className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-md transition-colors"
                  disabled={isUploading}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {error && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}