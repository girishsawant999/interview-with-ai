"use client";

import React from "react";

interface FiltersProps {
  filters: {
    search: string;
    sortBy: string;
    sortOrder: "asc" | "desc";
    department: string;
    status: string;
  };
  onFilterChange: (key: keyof FiltersProps["filters"], value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4 text-neutral-800">
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
};

export default Filters;
