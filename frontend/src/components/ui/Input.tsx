import { InputHTMLAttributes } from "react";

interface Props
  extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({
  className = "",
  ...props
}: Props) {
  return (
    <input
      {...props}
      className={`
        w-full
        rounded-lg
        border
        border-gray-300
        px-4
        py-3
        focus:ring-2
        focus:ring-blue-500
        focus:border-blue-500
        outline-none
        transition
        ${className}
      `}
    />
  );
}