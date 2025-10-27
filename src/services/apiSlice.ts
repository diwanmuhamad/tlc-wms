import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { Temperature } from "../types/dashboard.types";
import type { InventoryItem } from "../types/inventory.types";
import type { LocationOption } from "../types/inbound.types";

import localTemperatures from "../constant/temperatures.json";
import localInventory from "../constant/inventory.json";
import localLocations from "../constant/locations.json";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8080",
});

const baseQueryWithFallback: BaseQueryFn<
  string | FetchArgs,
  Temperature[] | InventoryItem[] | LocationOption[],
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.data) {
    return {
      data: result.data as Temperature[] | InventoryItem[] | LocationOption[],
    };
  }

  if (result.error) {
    console.warn(
      "API failed, using local fallback for:",
      typeof args === "string" ? args : args.url
    );

    const url = typeof args === "string" ? args : args.url;

    switch (url) {
      case "/temperatures":
        return { data: localTemperatures as Temperature[] };
      case "/inventory":
        return { data: localInventory as InventoryItem[] };
      case "/locations":
        return { data: localLocations as LocationOption[] };
      default:
        return result as {
          error: FetchBaseQueryError;
        };
    }
  }

  return result as {
    data: Temperature[] | InventoryItem[] | LocationOption[];
  };
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithFallback,
  endpoints: (builder) => ({
    getTemperatures: builder.query<Temperature[], void>({
      query: () => "/temperatures",
    }),
    getInventory: builder.query<InventoryItem[], void>({
      query: () => "/inventory",
    }),
    getLocations: builder.query<LocationOption[], void>({
      query: () => "/locations",
    }),
  }),
});

export const {
  useGetTemperaturesQuery,
  useGetInventoryQuery,
  useGetLocationsQuery,
} = apiSlice;
