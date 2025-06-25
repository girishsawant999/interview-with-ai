"use client";

import { useState, useEffect } from "react";

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

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Basic fetch without pagination, filtering, or sorting
  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/items?limit=50");
      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }
      const data: ApiResponse = await response.json();
      setItems(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading items...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error: {error}</div>
          <button
            onClick={fetchItems}
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

        {/* Current Basic Implementation */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Current Implementation (Basic - Replace with Your Solution)
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Showing first 50 items only. Your task: make it handle all 10,000
              efficiently!
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
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
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${item.salary.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
