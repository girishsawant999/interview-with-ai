export interface Item {
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

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface Filters {
  search: string;
  department: string;
  status: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export interface ApiResponse {
  data: Item[];
  pagination: Pagination;
  filters: Filters;
}

export interface SortConfig {
  key: keyof Item;
  direction: "asc" | "desc";
}

export interface FilterConfig {
  search?: string;
  department?: string;
  status?: string;
}

// Available departments for filtering
export const DEPARTMENTS = [
  "Engineering",
  "Product",
  "Design",
  "Marketing",
  "Sales",
  "Operations",
  "HR",
  "Finance",
  "Customer Success",
  "Data Science",
] as const;

// Available statuses for filtering
export const STATUSES = ["active", "inactive", "pending"] as const;

export type Department = (typeof DEPARTMENTS)[number];
export type Status = (typeof STATUSES)[number];
