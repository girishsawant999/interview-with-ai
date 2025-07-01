"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useRef, useState } from "react";

interface Item {
  id: number;
  name: string;
  email: string;
  company: string;
  department: string;
  position: string;
  salary: number;
  location: string;
  startDate: string;
  status: "active" | "inactive" | "pending";
  experience: number;
}

interface ApiResponse {
  data: Item[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters: {
    search: string;
    department: string;
    status: string;
    sortBy: string;
    sortOrder: string;
  };
}

function Filters({
  filters,
  onFilterChange,
}: {
  filters: {
    search: string;
    sortBy: string;
    sortOrder: "asc" | "desc";
    department: string;
    status: string;
  };
  onFilterChange: (key: keyof typeof filters, value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <input
        type="text"
        placeholder="Search..."
        value={filters.search}
        onChange={(e) => onFilterChange("search", e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 text-sm"
      />
      <select
        value={filters.sortBy}
        onChange={(e) => onFilterChange("sortBy", e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 text-sm"
      >
        <option value="id">ID</option>
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="company">Company</option>
        <option value="salary">Salary</option>
        <option value="startDate">Start Date</option>
        <option value="experience">Experience</option>
      </select>
      <select
        value={filters.sortOrder}
        onChange={(e) => onFilterChange("sortOrder", e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 text-sm"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <select
        value={filters.department}
        onChange={(e) => onFilterChange("department", e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 text-sm"
      >
        <option value="">All Departments</option>
        <option value="Engineering">Engineering</option>
        <option value="Sales">Sales</option>
        <option value="Marketing">Marketing</option>
        <option value="HR">HR</option>
      </select>
      <select
        value={filters.status}
        onChange={(e) => onFilterChange("status", e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 text-sm"
      >
        <option value="">All Statuses</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
}

export default function Home() {
  const parentRef = useRef<HTMLDivElement>(null);

  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    search: "",
    sortBy: "id",
    sortOrder: "asc" as "asc" | "desc",
    department: "",
    status: "",
  });
  // Debounced search UI state
  const [searchInput, setSearchInput] = useState("");

  const fetchItems = useCallback(
    async (page: number, reset = false) => {
      try {
        setLoading(true);
        const query = new URLSearchParams({
          page: page.toString(),
          limit: "100",
          search: filters.search,
          sortBy: filters.sortBy,
          sortOrder: filters.sortOrder,
          department: filters.department,
          status: filters.status,
        });
        const response = await fetch(`/api/items?${query}`);
        if (!response.ok) throw new Error("Failed to fetch items");
        const data: ApiResponse = await response.json();
        setItems((prev) => (reset ? data.data : [...prev, ...data.data]));
        setHasNext(data.pagination.hasNext);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  useEffect(() => {
    setItems([]);
    setPage(1);
    fetchItems(1, true);
  }, [filters, fetchItems]);

  // Debounce effect for search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Only update filter if changed to avoid unnecessary re-renders
      setFilters((prev) =>
        prev.search !== searchInput ? { ...prev, search: searchInput } : prev
      );
      setPage(1);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const [lastItem] = [...virtualItems].reverse();
    if (!lastItem) return;
    if (lastItem.index >= items.length - 1 && hasNext && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [hasNext, loading, items.length, virtualItems]);

  useEffect(() => {
    if (page === 1) return;
    fetchItems(page);
  }, [page, fetchItems]);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    if (key === "search") {
      setSearchInput(value);
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
      setPage(1);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error: {error}</div>
          <button
            onClick={() => {
              setError(null);
              fetchItems(page);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Employee Data Challenge
          </h1>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-3">
              🎯 Your Mission
            </h2>
            <div className="space-y-2 text-blue-800">
              <p>
                <strong>Goal:</strong> Implement a high-performance data table
                with 10,000 employee records
              </p>

              <div className="mt-4">
                <p className="font-semibold mb-2">Required Features:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Virtualized List:</strong> Handle 10,000+ items
                    efficiently
                  </li>
                  <li>
                    <strong>Search/Filtering:</strong> Real-time text search and
                    filter by department/status
                  </li>
                  <li>
                    <strong>Sorting:</strong> Sort by any column (name, salary,
                    date, etc.)
                  </li>
                  <li>
                    <strong>Performance:</strong> Smooth scrolling and
                    responsive interactions
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <p className="font-semibold mb-2">API Endpoint:</p>
                <code className="bg-white px-2 py-1 rounded border text-sm">
                  GET
                  /api/items?page=1&limit=50&search=&sortBy=id&sortOrder=asc&department=&status=
                </code>
              </div>

              <div className="mt-4">
                <p className="font-semibold">💡 Tip:</p>
                <p className="text-sm">
                  You&apos;re encouraged to use AI tools, libraries, and any
                  resources you need!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Filters
          filters={{ ...filters, search: searchInput }}
          onFilterChange={handleFilterChange}
        />

        {/* Virtualized Table Implementation */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Virtualized Table (Paginated + Prefetching)
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Loaded {items.length} items. New pages are fetched as you scroll.
            </p>
          </div>

          <div
            ref={parentRef}
            className="overflow-auto"
            style={{ maxHeight: "600px", position: "relative" }}
          >
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  position: "relative",
                }}
              >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const item = items[virtualRow.index];
                  return (
                    <tr
                      key={item.id}
                      ref={(el) => rowVirtualizer.measureElement(el)}
                      style={{
                        position: "absolute",
                        transform: `translateY(${virtualRow.start}px)`,
                        display: "flex",
                        width: "100%",
                      }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-[10%]">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-[15%]">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 w-[20%]">
                        {item.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-[15%]">
                        {item.company}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-[10%]">
                        {item.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-[10%]">
                        {item.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-[10%]">
                        ${item.salary.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap w-[10%]">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            item.status === "active"
                              ? "bg-green-100 text-green-800"
                              : item.status === "inactive"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {loading && (
            <div className="p-4 text-center text-gray-600">
              Loading more items...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
