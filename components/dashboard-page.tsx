"use client";

import { useState, useEffect } from "react";

import type { Product } from "@/types/product";
import { DashboardStats } from "./dashboard-stats";
import { Layout } from "./layout";

export function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const stats = {
    total: products.length,
    inStock: products.filter((p) => p.status === "In Stock").length,
    lowStock: products.filter((p) => p.status === "Low Stock").length,
    outOfStock: products.filter((p) => p.status === "Out of Stock").length,
  };

  return (
    <Layout>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold lg:text-3xl">Dashboard</h2>
        <DashboardStats stats={stats} />
      </div>
    </Layout>
  );
}
