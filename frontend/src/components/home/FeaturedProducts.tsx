"use client";

import { useEffect, useState } from "react";

import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

import ProductCard from "@/components/product/ProductCard";

import { getProducts } from "@/services/productService";
import type { Product } from "@/types/product";


export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data.slice(0, 6));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Section>

      <SectionTitle
        title="Featured Products"
        subtitle="Popular products available today."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </Section>
  );
}