import { useEffect, useState } from "react";
import { useGetTemperaturesQuery } from "../services/apiSlice";
import type { Temperature } from "../types/dashboard.types";

export function usePolling(intervalMs: number = 10000) {
  const { data, isLoading, isError, refetch } = useGetTemperaturesQuery();
  const [temperatures, setTemperatures] = useState<Temperature[]>([]);

  useEffect(() => {
    if (data) setTemperatures(data);
  }, [data]);

  // Polling
  useEffect(() => {
    const timer = setInterval(() => {
      refetch();
    }, intervalMs);

    return () => clearInterval(timer);
  }, [refetch, intervalMs]);

  return { temperatures, isLoading, isError };
}
