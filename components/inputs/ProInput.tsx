"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface ProInputProps {
  label: string;
  placeholder?: string;
  icon?: React.ReactNode;
  isTextArea?: boolean;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const ProInput = ({
  label,
  placeholder,
  icon,
  isTextArea = false,
  register,
  error,
}: ProInputProps) => {
  const id =
    register?.name ??
    `input-${label.replace(/\s+/g, "-").toLowerCase()}`;

  const errorId = `${id}-error`;

  return (
    <div className="input-field group flex flex-col gap-2">
      {/* Label */}
      <div className="flex items-center gap-2.5">
        <span className="text-cyan-500 group-focus-within:text-cyan-400 transition-colors">
          {icon}
        </span>
        <label
          htmlFor={id}
          className="text-[11px] font-black text-white  tracking-[0.2em] group-focus-within:text-cyan-400 transition-colors"
        >
          {label}
        </label>
      </div>

      {/* Input */}
      <div className="relative">
        {isTextArea ? (
          <textarea
            id={id}
            rows={3}
            {...register}
            placeholder={placeholder}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={`w-full bg-black/60 border-2 p-4 text-sm font-bold text-white focus:outline-none transition-all  rounded-sm uppercase tracking-wider
              ${
                error
                  ? "border-red-500 focus:border-red-500 bg-red-950/20"
                  : "border-white/20 focus:border-cyan-500/80 focus:bg-cyan-950/20"
              }
              placeholder:text-white/10`}
          />
        ) : (
          <input
            id={id}
            type="text"
            {...register}
            placeholder={placeholder}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={`w-full bg-black/60 border-2 p-4 text-sm font-bold text-white focus:outline-none transition-all uppercase tracking-wider rounded-sm
              ${
                error
                  ? "border-red-500 focus:border-red-500 bg-red-950/20"
                  : "border-white/20 focus:border-cyan-500/80 focus:bg-cyan-950/20"
              }
              placeholder:text-white/10`}
          />
        )}

        {/* Bottom Glow Line */}
        <div
          className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-500 shadow-[0_0_15px]
            ${
              error
                ? "bg-red-500 w-full shadow-red-500"
                : "bg-cyan-400 w-0 group-focus-within:w-full shadow-cyan-400"
            }`}
        />
      </div>

      {/* Error Message */}
      {error && (
        <p
          id={errorId}
          className="text-[11px] text-red-400 flex items-center gap-2 mt-1"
        >
          {error.message}
        </p>
      )}
    </div>
  );
};

export default ProInput;