import { FaShieldAlt, FaStore, FaTruck } from "react-icons/fa";

import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";

const features = [
  {
    icon: <FaStore size={40} />,
    title: "Verified Stores",
    description: "Buy from trusted merchants."
  },
  {
    icon: <FaTruck size={40} />,
    title: "Fast Ordering",
    description: "Simple and quick checkout."
  },
  {
    icon: <FaShieldAlt size={40} />,
    title: "Secure Marketplace",
    description: "Reliable shopping experience."
  }
];

export default function Features() {
  return (
    <Section>

      <div className="grid md:grid-cols-3 gap-8">

        {features.map((feature) => (
          <Card key={feature.title}>

            <div className="text-blue-600 mb-4">
              {feature.icon}
            </div>

            <h3 className="font-bold text-xl">
              {feature.title}
            </h3>

            <p className="text-gray-500 mt-3">
              {feature.description}
            </p>

          </Card>
        ))}

      </div>

    </Section>
  );
}