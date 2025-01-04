import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useQueryData = <T>(options: UseQueryOptions<T>) =>
  useQuery<T>({ ...options, retry: 0, refetchOnWindowFocus: false });
