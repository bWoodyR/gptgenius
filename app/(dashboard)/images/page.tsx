import ImageGenerator from "@/app/components/ImigaGenerator";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const page = () => {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ImageGenerator />
    </HydrationBoundary>
  );
};

export default page;
