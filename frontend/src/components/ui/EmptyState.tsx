import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function EmptyState({
  icon,
  title,
  description,
}: Props) {
  return (
    <div className="text-center py-20">

      <div className="flex justify-center text-gray-300">
        {icon}
      </div>

      <h2 className="text-3xl font-bold mt-6">
        {title}
      </h2>

      <p className="text-gray-500 mt-3">
        {description}
      </p>

    </div>
  );
}