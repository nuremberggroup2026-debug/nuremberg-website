"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Control, Controller, FieldError, FieldValues, Merge, Path } from "react-hook-form";

interface FormCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  error?: FieldError | Merge<FieldError, (FieldError | undefined)[]> | undefined; // ✅ fixed
  description?: string;
  className?: string;
}

export default function FormCheckbox<T extends FieldValues>({
  name,
  label,
  control,
  error,
  description,
  className = "",
}: FormCheckboxProps<T>) {
  const id = name;
  const errorId = `${id}-error`;

  return (
    <div className={`mb-4 ${className} ml-2`}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex items-start gap-3">
            <div className="flex flex-col">
              <label
                htmlFor={id}
                className="text-sm font-semibold text-gray-700 cursor-pointer"
              >
                {label}
              </label>

              {description && (
                <p id={`${id}-desc`} className="text-xs text-gray-500 mt-0.5">
                  {description}
                </p>
              )}
            </div>

            <Checkbox
              id={id}
              checked={!!field.value} // ensure boolean
              onCheckedChange={(val) => field.onChange(!!val)} // ensure boolean
              aria-invalid={!!error}
              aria-describedby={
                error ? errorId : description ? `${id}-desc` : undefined
              }
              className={`mt-1 ${error ? "border-red-600" : "border-gray-300"}`}
            />
          </div>
        )}
      />

      {error && "message" in error && (
        <p id={errorId} className="mt-1 text-xs text-red-600 ml-7">
          {error.message}
        </p>
      )}
    </div>
  );
}