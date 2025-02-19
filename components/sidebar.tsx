"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiPackage, FiLayout, FiX } from "react-icons/fi";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden${
          open ? "opacity-100" : "opacity-0 z-[-1]"
        }`}
        onClick={() => setOpen(false)}
      ></div>

      <div
        className={`fixed border-r inset-y-0 left-0 z-10 w-64 bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 bg-gray-50 dark:bg-gray-900 lg:hidden">
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            Menu
          </span>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <FiPackage className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            <span className="text-xl font-bold text-gray-700 dark:text-gray-200">
              Inventory
            </span>
          </div>
          <nav className="space-y-2">
            <Link
              href="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                pathname === "/" ? "bg-gray-100 dark:bg-gray-700" : ""
              }`}
            >
              <FiLayout className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/products"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                pathname === "/products" ? "bg-gray-100 dark:bg-gray-700" : ""
              }`}
            >
              <FiPackage className="h-5 w-5" />
              Products
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
