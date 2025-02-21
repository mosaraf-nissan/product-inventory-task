import { FiPlus } from "react-icons/fi";

interface ProductHeaderProps {
  onAddProduct: () => void;
  onSearch: (term: string) => void;
  onCategoryFilter: (category: string) => void;
  onSort: (order: "asc" | "desc") => void;
}

export function ProductHeader({
  onAddProduct,
  onSearch,
  onCategoryFilter,
  onSort,
}: ProductHeaderProps) {
  return (
    <div className="space-y-4 dark:text-black">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight dark:text-slate-400">
          Products
        </h2>
        <button
          onClick={onAddProduct}
          className="bg-purple-500  text-white px-4 py-2 rounded-xl flex items-center active:scale-95 duration-200 "
        >
          <FiPlus className="mr-2" /> Add Product
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 ">
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => onSearch(e.target.value)}
          className="border rounded-md px-3 py-2 w-full sm:w-64 dark:bg-gray-500 dark:border-0"
        />
        <select
          onChange={(e) => onCategoryFilter(e.target.value)}
          className="border rounded-md px-3 py-2 dark:bg-gray-500 dark:border-0"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Home">Home</option>
        </select>
        <select
          onChange={(e) => onSort(e.target.value as "asc" | "desc")}
          className="border rounded-md px-3 py-2 dark:bg-gray-500 dark:border-0"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}
