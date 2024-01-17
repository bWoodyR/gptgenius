"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { skSK } from "@clerk/localizations";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
  return (
    <>
      <ClerkProvider localization={skSK}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster position="top-center" />
          {children}
        </QueryClientProvider>
      </ClerkProvider>
    </>
  );
};

export default Providers;
