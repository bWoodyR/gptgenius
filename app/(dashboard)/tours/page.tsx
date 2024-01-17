import TouorsPage from "@/app/components/Tours/TouorsPage";
import { getAllTours } from "@/utils/action";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const AllToursPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tours", ""],
    queryFn: () => getAllTours(undefined),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TouorsPage />
    </HydrationBoundary>
  );
};

export default AllToursPage;
