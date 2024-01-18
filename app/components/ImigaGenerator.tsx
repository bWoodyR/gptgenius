"use client";

import { fetchUserTokensById, generateImage, subtractTokens, test } from "@/utils/action";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";

const ImageGenerator = () => {
  const [text, setText] = useState("");
  const { userId } = useAuth();
  const { mutate, isPending, data } = useMutation({
    mutationFn: async (text: string) => {
      const currentTokens = (await fetchUserTokensById(userId as string)) as number;

      if (currentTokens < 1000) {
        toast.error("Token balance is too low...");
        return;
      }

      const imageURL = await generateImage(text);

      if (!imageURL) {
        toast.error("Something went wrong");
        return;
      }

      setText("");
      await subtractTokens(userId as string, 1000);
      toast.success("Image generated");
      return imageURL;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text.length > 4000) {
      toast.error("Maximum number of characters is 4000");
      return;
    }

    mutate(text);
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div>
        <h1 className="text-4xl mb-4">GPT Image Generator DALL-E-3</h1>
        <p className="text-gray-500 ml-6">Accpets max 4000 characters</p>
        {isPending && <span className="loading loading-lg"></span>}
        {data && !isPending && (
          <div className="flex flex-col items-center justify-center gap-6 p-6">
            <p>
              <span className="font-bold">Download img URL: </span>
              {data}
            </p>
            <Image src={data} width={450} height={450} className="rounded-xl shadow-xl mb-16 object-cover" alt="genereted image" priority />
          </div>
        )}
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="max-w-4xl pt-12">
        <div className="join w-full">
          <input type="text" placeholder="Message" className="input input-bordered join-item w-full" value={text} required onChange={(e) => setText(e.target.value)} />
          <button type="submit" className="btn btn-primary join-item" disabled={isPending}>
            {isPending ? "Please wait..." : "Generate Image"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImageGenerator;
