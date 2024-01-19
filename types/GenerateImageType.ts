export type TGenerateImage = {
  text: string;
  clerkId: string;
  quality: "standard" | "hd";
  size: "1024x1024" | "1024x1792" | "1792x1024";
};
