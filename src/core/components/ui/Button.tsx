import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-blue-700 text-white hover:bg-blue-800",
  outline: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50",
  ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
};

export const Button = ({ variant = "primary", className = "", ...props }: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
};
