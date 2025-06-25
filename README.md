# Employee Data Challenge - Interview Project

Welcome to the Employee Data Challenge! This is a technical interview project designed to test your ability to work with large datasets, implement performance optimizations, and create a great user experience.

## 🎯 Challenge Overview

Your task is to implement a high-performance data table that can efficiently handle **10,000 employee records** with the following features:

### Required Features

1. **Virtualized List/Table** - Handle 10,000+ items efficiently without performance degradation
2. **Real-time Search** - Search across multiple fields (name, email, company, etc.)
3. **Filtering** - Filter by department, status, and other criteria
4. **Sorting** - Sort by any column (name, salary, start date, etc.)
5. **Responsive Design** - Works well on different screen sizes

### Performance Requirements

- ✅ Smooth scrolling through large datasets
- ✅ Responsive search and filtering (< 100ms)
- ✅ Efficient memory usage
- ✅ No UI blocking during data operations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📊 API Documentation

The mock API endpoint provides 10,000 employee records with the following structure:

### Endpoint
```
GET /api/items
```

### Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `page` | number | Page number (1-based) | `1` |
| `limit` | number | Items per page | `50` |
| `search` | string | Search term | `"john"` |
| `sortBy` | string | Sort field | `"name"`, `"salary"`, `"startDate"` |
| `sortOrder` | string | Sort direction | `"asc"`, `"desc"` |
| `department` | string | Filter by department | `"Engineering"` |
| `status` | string | Filter by status | `"active"`, `"inactive"`, `"pending"` |

### Example Request
```
GET /api/items?page=1&limit=100&search=john&sortBy=salary&sortOrder=desc&department=Engineering&status=active
```

### Response Format
```json
{
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@company.com",
      "company": "TechCorp",
      "department": "Engineering",
      "position": "Software Engineer",
      "salary": 95000,
      "location": "San Francisco, CA",
      "startDate": "2023-01-15",
      "status": "active",
      "experience": 5
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 100,
    "total": 1250,
    "totalPages": 13,
    "hasNext": true,
    "hasPrev": false
  },
  "filters": {
    "search": "john",
    "department": "Engineering",
    "status": "active",
    "sortBy": "salary",
    "sortOrder": "desc"
  }
}
```

## 💡 Implementation Guidelines

### Suggested Approaches

1. **Virtualization Libraries**
   - `react-window` or `react-virtualized` for efficient list rendering
   - `@tanstack/react-virtual` for modern virtualization

2. **State Management**
   - React hooks (useState, useEffect, useMemo, useCallback)
   - Consider useReducer for complex state
   - Optional: Zustand, Redux Toolkit, or Jotai

3. **Data Fetching**
   - Built-in `fetch` API
   - SWR or React Query for caching and synchronization
   - Debounce search inputs

4. **UI Components**
   - Tailwind CSS (already included)
   - Headless UI components
   - Custom components for table/list

### Performance Tips

- Use `useMemo` and `useCallback` to prevent unnecessary re-renders
- Implement proper debouncing for search inputs
- Consider windowing/virtualization for large lists
- Optimize API calls with proper caching strategies

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Runtime**: Node.js

## 📋 Evaluation Criteria

You'll be evaluated on:

1. **Performance** (30%)
   - Efficient handling of large datasets
   - Smooth user interactions
   - Proper virtualization implementation

2. **Code Quality** (25%)
   - Clean, readable code structure
   - Proper TypeScript usage
   - Component organization

3. **User Experience** (25%)
   - Intuitive interface design
   - Responsive behavior
   - Error handling

4. **Feature Completeness** (20%)
   - All required features implemented
   - Edge cases handled
   - Bonus features

## 🎯 Bonus Points

Implement any of these for extra credit:

- [ ] Column resizing and reordering
- [ ] Export functionality (CSV, Excel)
- [ ] Advanced filters (date ranges, salary ranges)
- [ ] Bulk actions (select multiple items)
- [ ] Dark mode toggle
- [ ] Keyboard navigation
- [ ] Accessibility features (ARIA labels, screen reader support)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checker

## 📝 Submission

When you're ready to present:

1. Ensure the app runs without errors
2. Test all features work correctly
3. Be prepared to explain your implementation choices
4. Discuss any tradeoffs or optimizations you made

## ❓ Questions?

Feel free to ask questions during the interview! We're here to help and want to see you succeed.

Good luck! 🚀
