import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define your existing interfaces for products, sales, purchases, expenses, etc.

export interface Product {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}

export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}

export interface ExpenseSummary {
  expenseSummaryId: string;
  totalExpenses: number;
  date: string;
}

// Define an interface for analytics data
export interface AnalyticsMetrics {
  topSellingProducts: Product[];
  monthlySalesSummary: SalesSummary[];
  yearlyPurchaseSummary: PurchaseSummary[];
  monthlyExpenseSummary: ExpenseSummary[];
}

// Define the `api` slice with all endpoints including `analytics`
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses", "Analytics"],
  endpoints: (build) => ({
    getDashboardMetrics: build.query<AnalyticsMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"],
    }),
    getProducts: build.query<Product[], string | void>({
      query: (search) => ({
        url: "/products",
        params: search ? { search } : {},
      }),
      providesTags: ["Products"],
    }),
    createProduct: build.mutation<Product, Partial<Product>>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    getUsers: build.query<any[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    getExpensesByCategory: build.query<any[], void>({
      query: () => "/expenses",
      providesTags: ["Expenses"],
    }),
    // Analytics endpoint
    getAnalyticsMetrics: build.query<any[], void>({
      query: () => "/analytics",
      providesTags: ["Analytics"],
    }),
  }),
});

// Export hooks for each endpoint
export const {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useGetUsersQuery,
  useGetExpensesByCategoryQuery,
  useGetAnalyticsMetricsQuery, // Hook for analytics
} = api;
