"use client";
import type React from "react";
import dynamic from "next/dynamic";
import {
  FiPackage,
  FiCheckCircle,
  FiAlertCircle,
  FiXCircle,
} from "react-icons/fi";

interface DashboardStatsProps {
  stats: {
    total: number;
    inStock: number;
    lowStock: number;
    outOfStock: number;
  };
}
const Chart = dynamic(
  () => import("react-apexcharts").then((mod) => mod.default),
  { ssr: false }
);

export function DashboardStats({ stats }: DashboardStatsProps) {
  const chartOptions = {
    chart: {
      type: "bar" as const,
      height: 350,
      // gray-200
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Total", "In Stock", "Low Stock", "Out of Stock"],
    },
  };

  const chartSeries = [
    {
      name: "Products",
      data: [stats.total, stats.inStock, stats.lowStock, stats.outOfStock],
    },
  ];
  return (
    <div className=" bg-purple-100 rounded-xl p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-2 dark:bg-gray-700">
      <div className="bg-white dark:bg-gray-800">
        <div className="text-black">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={350}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        <StatCard
          title="Total Products"
          value={stats.total}
          icon={<FiPackage className="h-5 w-5" />}
        />
        <StatCard
          title="In Stock"
          value={stats.inStock}
          icon={<FiCheckCircle className="h-5 w-5" />}
        />
        <StatCard
          title="Low Stock"
          value={stats.lowStock}
          icon={<FiAlertCircle className="h-5 w-5" />}
        />
        <StatCard
          title="Out of Stock"
          value={stats.outOfStock}
          icon={<FiXCircle className="h-5 w-5" />}
        />
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </h3>
        <div className="text-gray-400 dark:text-gray-500">{icon}</div>
      </div>
      <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100 lg:text-3xl">
        {value}
      </p>
    </div>
  );
}
