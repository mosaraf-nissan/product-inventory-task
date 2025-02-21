"use client";

import { useState, useEffect } from "react";
import { Layout } from "../components/layout";
import AddEditProductModal from "../components/add-edit-product-modal";

import type { Product } from "@/types/product";
import { ProductHeader } from "../components/product-header";
import ProductGrid from "../components/product-grid";

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
    setProducts(storedProducts ? JSON.parse(storedProducts) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts([...products, { ...product, id: Date.now().toString() }]);
    setIsAddModalOpen(false);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setEditingProduct(null);
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const filteredAndSortedProducts = products
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((p) => (categoryFilter ? p.category === categoryFilter : true))
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

  return (
    <Layout>
      <div className="space-y-4">
        <ProductHeader
          onAddProduct={() => setIsAddModalOpen(true)}
          onSearch={setSearchTerm}
          onCategoryFilter={setCategoryFilter}
          onSort={setSortOrder}
        />
        <ProductGrid
          products={filteredAndSortedProducts}
          onEdit={setEditingProduct}
          onDelete={deleteProduct}
        />
      </div>
      <div>
        <AddEditProductModal
          isOpen={isAddModalOpen || !!editingProduct}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingProduct(null);
          }}
          onSave={editingProduct ? updateProduct : addProduct}
          product={editingProduct}
        />
      </div>
    </Layout>
  );
}
