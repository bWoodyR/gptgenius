"use client";

import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
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
        <ClerkLoading>
          <div className="flex flex-col gap-4 min-h-screen items-center justify-center">
            Loading ...
            <span className="loading loading-lg"></span>
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster position="top-center" />
            {children}
          </QueryClientProvider>
        </ClerkLoaded>
      </ClerkProvider>
    </>
  );
};

export default Providers;
