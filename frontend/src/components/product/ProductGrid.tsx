import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string | null;
  stock_quantity: number;
}

interface Props {
  products: Product[];
}

export default function ProductGrid({
  products,
}: Props) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}