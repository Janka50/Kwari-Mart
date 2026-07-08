"use client";

import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import FeaturedStores from "@/components/home/FeaturedStores";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function HomePage() {
  return (
    <>
      <Hero />

      <FeaturedStores />

      <FeaturedProducts />

      <Features />
    </>
  );
}