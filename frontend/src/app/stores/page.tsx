"use client";

import { useEffect, useState } from "react";
import { FaStore } from "react-icons/fa";

import { getStores } from "@/services/storeService";

import StoreCard from "@/components/store/StoreCard";

import Section from "@/components/ui/Section";
import PageHeader from "@/components/ui/PageHeader";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";

interface Store {
  id: number;
  name: string;
  description: string;
  logo: string | null;
  product_count: number;
}

export default function StoresPage() {

  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStores();
  }, []);

  async function loadStores() {
    try {
      const data = await getStores();

      setStores(
        data.results ?? data
      );

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (stores.length === 0) {
    return (
      <Section>
        <EmptyState
          icon={<FaStore size={70} />}
          title="No Stores Yet"
          description="Merchants will appear here after creating stores."
        />
      </Section>
    );
  }

  return (
    <Section>

      <PageHeader
        title="Browse Stores"
        subtitle="Discover trusted merchants across KwariMart."
      />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

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