"use client";

import { useEffect, useState } from "react";

import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import StoreCard from "@/components/store/StoreCard";

import { getStores } from "@/services/storeService";

interface Store {
  id: number;
  name: string;
  description: string;
  logo: string | null;
}

export default function FeaturedStores() {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    loadStores();
  }, []);

  async function loadStores() {
    try {
      const data = await getStores();
      setStores(data.slice(0, 3));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Section>
      <SectionTitle
        title="Featured Stores"
        subtitle="Trusted merchants on KwariMart"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <StoreCard
            key={store.id}
            store={store}
          />
        ))}
      </div>
    </Section>
  );
}