"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import type { Product } from "@/types/product";

interface AddEditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product?: Product | null;
}

export default function AddEditProductModal({
  isOpen,
  onClose,
  onSave,
  product,
}: AddEditProductModalProps) {
  const [formData, setFormData] = useState<Product>({
    id: "",
    name: "",
    price: 0,
    image: "",
    category: "",
    status: "In Stock",
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        id: "",
        name: "",
        price: 0,
        image: "",
        category: "",
        status: "In Stock",
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number.parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-full h-full min-h-screen">
      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg dark:bg-gray-900/90">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {product ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
            />
            <input
              name="price"
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full border rounded-xl  px-3 py-2 dark:bg-gray-700"
            />
            <input
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Home">Home</option>
            </select>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-3 py-2 dark:bg-gray-700"
            >
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Low Stock">Low Stock</option>
            </select>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
            >
              {product ? "Update" : "Add"} Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
