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

// Function to generate realistic mock data
function generateMockData(): Item[] {
  const companies = [
    "TechCorp",
    "InnovateLab",
    "DataSystems",
    "CloudFirst",
    "AI Solutions",
    "DevOps Inc",
    "ScaleUp",
    "StartupHub",
    "Enterprise Co",
    "Digital Works",
    "CodeFactory",
    "ByteStream",
    "NetFlow",
    "AppCraft",
    "WebMaster",
  ];

  const departments = [
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
  ];

  const positions = [
    "Software Engineer",
    "Senior Developer",
    "Product Manager",
    "Designer",
    "Data Analyst",
    "DevOps Engineer",
    "QA Engineer",
    "Marketing Manager",
    "Sales Representative",
    "Project Manager",
    "Technical Lead",
    "Architect",
  ];

  const locations = [
    "San Francisco, CA",
    "New York, NY",
    "Seattle, WA",
    "Austin, TX",
    "Boston, MA",
    "Chicago, IL",
    "Los Angeles, CA",
    "Denver, CO",
    "Portland, OR",
    "Atlanta, GA",
    "Remote",
    "Miami, FL",
  ];

  const statuses: ("active" | "inactive" | "pending")[] = [
    "active",
    "inactive",
    "pending",
  ];

  const firstNames = [
    "Alex",
    "Sam",
    "Jordan",
    "Taylor",
    "Morgan",
    "Casey",
    "Riley",
    "Avery",
    "Jamie",
    "Blake",
    "Cameron",
    "Drew",
    "Emery",
    "Finley",
    "Gray",
    "Hayden",
    "Indigo",
    "Kai",
    "Lane",
    "Max",
    "Nova",
    "Oakley",
    "Parker",
    "Quinn",
    "Reese",
    "Sage",
    "Tatum",
    "Uma",
    "Val",
    "Winter",
  ];

  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Anderson",
    "Thomas",
    "Taylor",
    "Moore",
    "Jackson",
    "Martin",
  ];

  const items: Item[] = [];

  for (let i = 1; i <= 10000; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const department =
      departments[Math.floor(Math.random() * departments.length)];
    const position = positions[Math.floor(Math.random() * positions.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    // Generate realistic salary based on position and experience
    const baseExperience = Math.floor(Math.random() * 15) + 1;
    const baseSalary =
      60000 + baseExperience * 5000 + Math.floor(Math.random() * 30000);

    // Generate start date within last 5 years
    const startDate = new Date();
    startDate.setFullYear(
      startDate.getFullYear() - Math.floor(Math.random() * 5)
    );
    startDate.setMonth(Math.floor(Math.random() * 12));
    startDate.setDate(Math.floor(Math.random() * 28) + 1);

    items.push({
      id: i,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company
        .toLowerCase()
        .replace(/\s+/g, "")}.com`,
      company,
      department,
      position,
      salary: baseSalary,
      location,
      startDate: startDate.toISOString().split("T")[0],
      status,
      experience: baseExperience,
    });
  }

  return items;
}

// Cache the mock data
let cachedData: Item[] | null = null;

export async function GET(request: Request) {
  // Parse query parameters
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "50");
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "id";
  const sortOrder = searchParams.get("sortOrder") || "asc";
  const department = searchParams.get("department") || "";
  const status = searchParams.get("status") || "";

  // Generate data once and cache it
  if (!cachedData) {
    cachedData = generateMockData();
  }

  let filteredData = [...cachedData];

  // Apply search filter
  if (search) {
    const searchLower = search.toLowerCase();
    filteredData = filteredData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchLower) ||
        item.email.toLowerCase().includes(searchLower) ||
        item.company.toLowerCase().includes(searchLower) ||
        item.department.toLowerCase().includes(searchLower) ||
        item.position.toLowerCase().includes(searchLower) ||
        item.location.toLowerCase().includes(searchLower)
    );
  }

  // Apply department filter
  if (department) {
    filteredData = filteredData.filter(
      (item) => item.department === department
    );
  }

  // Apply status filter
  if (status) {
    filteredData = filteredData.filter((item) => item.status === status);
  }

  // Apply sorting
  filteredData.sort((a, b) => {
    let aValue = a[sortBy as keyof Item];
    let bValue = b[sortBy as keyof Item];

    // Handle string sorting
    if (typeof aValue === "string" && typeof bValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortOrder === "desc") {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    } else {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    }
  });

  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 100 + 50));

  return Response.json({
    data: paginatedData,
    pagination: {
      page,
      limit,
      total: filteredData.length,
      totalPages: Math.ceil(filteredData.length / limit),
      hasNext: endIndex < filteredData.length,
      hasPrev: startIndex > 0,
    },
    filters: {
      search,
      department,
      status,
      sortBy,
      sortOrder,
    },
  });
}
