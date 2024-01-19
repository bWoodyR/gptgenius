"use client";

import { ChatMessageType } from "@/types/ChatMessageType";
import { fetchUserTokensById, generateChatResponse, subtractTokens } from "@/utils/action";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

const Chat = () => {
  const { userId } = useAuth();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<ChatMessageType[] | []>([]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (query: ChatMessageType) => {
      const currentTokens = (await fetchUserTokensById(userId as string)) as number;

      if (currentTokens < 100) {
        toast.error("Token balance is too low...");
        return;
      }

      const response: any = await generateChatResponse([...messages, query]);
      if (!response) {
        toast.error("Something went wrong...");
        return;
      }

      setMessages((prev) => [...prev, response.message]);
      const newTokens = await subtractTokens(userId as string, response.tokens as number);
      toast.success(`${newTokens} tokens remainnig`);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = {
      role: "user",
      content: text,
    };
    mutate(query);
    setMessages((prev) => [...prev, query]);
    setText("");
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div>
        <h1 className="text-4xl">Chat GPT 3.5-turbo</h1>
        {messages.map((message, index) => {
          const avatar = message.role === "user" ? "🧑‍💼" : "🤖";
          const background = message.role === "user" ? "bg-base-200" : "bg-base-100";
          return (
            <div key={index} className={`${background} flex py-6 -mx-8 px-8 text-xl leading-loose border-b border-base-300`}>
              <span className="mr-4">{avatar}</span>
              <p className="max-w-3xl">{message.content}</p>
            </div>
          );
        })}
        {isPending ? <span className="loading"></span> : null}
      </div>

      <form onSubmit={(e) => handleSubmit(e)} className="max-w-4xl pt-12">
        <div className="join w-full">
          <input type="text" placeholder="Message" className="input input-bordered join-item w-full" value={text} required onChange={(e) => setText(e.target.value)} />
          <button type="submit" className="btn btn-primary join-item" disabled={isPending}>
            {isPending ? "Please wait..." : "Ask Question"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
