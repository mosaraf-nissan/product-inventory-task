import type { Product } from "@/types/product";
import Image from "next/image";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface ProductGridProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductGrid({
  products,
  onEdit,
  onDelete,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-purple-100 dark:bg-gray-800 rounded-xl shadow-sm p-4"
        >
          <div className="relative aspect-square w-full mb-4 bg-gray-100 shadow-md dark:bg-gray-700 rounded-xl overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover "
              priority={false}
            />
          </div>
          <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">
            {product.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {product.category}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Status: {product.status}
          </p>
          <div className="flex justify-between">
            <button
              onClick={() => onEdit(product)}
              className="bg-blue-500 text-white px-3 py-1 rounded-md flex items-center hover:bg-blue-600 transition-colors"
            >
              <FiEdit className="mr-1" /> Edit
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md flex items-center hover:bg-red-600 transition-colors"
            >
              <FiTrash2 className="mr-1" /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
