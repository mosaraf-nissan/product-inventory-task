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
      {products?.length ? (
        products.map((product) => (
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
              <span className="font-bold">Price:</span> $
              {product.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span className="font-bold">Category:</span> {product.category}
            </p>
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-4">
              <span
                className={
                  product.status === "In Stock"
                    ? "text-green-500"
                    : product.status === "Out of Stock"
                    ? "text-red-500"
                    : "text-yellow-700"
                }
              >
                {product.status}
              </span>
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => onEdit(product)}
                className="bg-purple-200 text-purple-600 px-3 py-1 rounded-xl flex items-center transition-colors"
              >
                <FiEdit className="mr-1" /> Edit
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-xl flex items-center hover:bg-red-600 transition-colors"
              >
                <FiTrash2 className="mr-1" /> Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center col-span-3 text-xl p-4 rounded-xl">
          No Product In Stock
        </p>
      )}
    </div>
  );
}
