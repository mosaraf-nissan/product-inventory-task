"use client";

import { useState, useRef, useEffect } from "react";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";

export function UserNav() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-10" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-full duration-200 hover:bg-gray-100   dark:hover:bg-gray-700"
      >
        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <FiUser className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 py-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <a
            href="#"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiUser className="mr-2 h-4 w-4" />
            Profile
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiSettings className="mr-2 h-4 w-4" />
            Settings
          </a>
          <div className="border-t border-gray-200 dark:border-gray-700" />
          <a
            href="#"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiLogOut className="mr-2 h-4 w-4" />
            Log out
          </a>
        </div>
      )}
    </div>
  );
}
