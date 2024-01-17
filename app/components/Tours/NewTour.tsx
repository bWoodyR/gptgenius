"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import TourInfo from "./TourInfo";
import { createNewTour, fetchUserTokensById, generateTourResponse, getExistingTour, subtractTokens } from "@/utils/action";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

const NewTour = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const { mutate, isPending, data } = useMutation({
    mutationFn: async (destination: { city: string; country: string }) => {
      const existingTour = await getExistingTour(destination);
      if (existingTour) return existingTour;

      const currentTokens = (await fetchUserTokensById(userId as string)) ?? 0;
      if (currentTokens < 300) {
        toast.error("Token balacne too low...");
        return;
      }

      const newTour = await generateTourResponse(destination);
      if (!newTour) {
        toast.error("No matching city found...");
        return null;
      }
      await createNewTour(newTour.tour);
      queryClient.invalidateQueries({ queryKey: ["tours"] });

      const newTokens = await subtractTokens(userId as string, newTour.tokens as number);
      toast.success(`${newTokens} tokens remaining...`);

      return newTour.tour;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries()) as { city: string; country: string };
    mutate(destination);
  };

  if (isPending) {
    return <span className="loading loading-lg"></span>;
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className="max-w-2xl">
        <h2 className="mb-4">Select your dream destination</h2>
        <div className="join w-full">
          <input type="text" className="input input-bordered join-item w-full" placeholder="city" name="city" required />
          <input type="text" className="input input-bordered join-item w-full" placeholder="country" name="country" required />
          <button className="btn btn-primary join-item" type="submit">
            Generate Tour
          </button>
        </div>
      </form>
      <div className="mt-16">{data ? <TourInfo tour={data} /> : null}</div>
    </>
  );
};

export default NewTour;
