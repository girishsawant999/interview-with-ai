import type { ApiResponse } from "@/types";

interface FetchParams {
  page: number;
  filters: {
    search: string;
    sortBy: string;
    sortOrder: string;
    department: string;
    status: string;
  };
}

export async function fetchItems({
  page,
  filters,
}: FetchParams): Promise<ApiResponse> {
  const query = new URLSearchParams({
    page: page.toString(),
    limit: "100",
    search: filters.search,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
    department: filters.department,
    status: filters.status,
  });

  const res = await fetch(`/api/items?${query.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch items");
  return res.json();
}
