"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

interface QueryError extends Error {
  response: {
    status: number;
  };
}

const queryCache = new QueryCache({
  onError: (error: Error) => {
    const queryError = error as QueryError;
    if (queryError.response.status === 401) {
      // Redirect to login page if error is 401
      // window.location.reload();
    }
  },
});

const client = new QueryClient({ queryCache });

export function QueryProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
}

export default client;
