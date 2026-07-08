import { ButtonHTMLAttributes } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const styles = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-900",
    danger:
      "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      {...props}
      className={`
        px-5
        py-3
        rounded-lg
        font-medium
        transition
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${styles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}