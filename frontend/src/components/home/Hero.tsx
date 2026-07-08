import Link from "next/link";

import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";

export default function Hero() {
  return (
    <Section className="py-20">

      <div className="grid lg:grid-cols-2 gap-12 items-center">

        <div>

          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Nigeria's Local Marketplace
          </span>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Shop from
            <span className="text-blue-600">
              {" "}Trusted Local Merchants
            </span>
          </h1>

          <p className="text-gray-600 text-lg mt-6">
            Discover products from verified stores,
            compare prices, and shop securely
            through KwariMart.
          </p>

          <div className="flex gap-4 mt-8">

            <Link href="/stores">
              <Button>
                Browse Stores
              </Button>
            </Link>

            <Link href="/merchant/store/create">
              <Button variant="secondary">
                Become a Merchant
              </Button>
            </Link>

          </div>

        </div>

        <div>

          <img
            src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=900"
            alt="Marketplace"
            className="rounded-3xl shadow-xl"
          />

        </div>

      </div>

    </Section>
  );
}