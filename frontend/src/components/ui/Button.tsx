import React from "react";
import Spinner from "./Spinner";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  loading = false,
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-slate-200 hover:bg-slate-300 text-slate-900",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`
        w-full
        rounded-xl
        px-5
        py-3
        font-medium
        transition-all
        duration-200
        disabled:opacity-60
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </button>
  );
}