"use server";

import { ChatMessageType } from "@/types/ChatMessageType";
import OpenAI from "openai";
import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateChatResponse = async (chatMessages: any) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant",
        },
        ...chatMessages,
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
      max_tokens: 100
    });
    const usedTokens = response?.usage?.total_tokens;
    const aiAnswer = response.choices[0].message as ChatMessageType
    console.log(response.choices[0].message);
    console.log(response);
    return { message: aiAnswer, tokens: usedTokens };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const generateTourResponse = async ({ city, country }: { city: string; country: string }) => {
  const query = `Find a exact ${city} in this exact ${country}.
If ${city} and ${country} exist, create a list of things families can do in this ${city},${country}. 
Once you have a list, create a one-day tour. Response should be  in the following JSON format: 
{
  "tour": {
    "city": "${city}",
    "country": "${country}",
    "title": "title of the tour",
    "description": "short description of the city and tour",
    "stops": ["short paragraph on the stop 1", "short paragraph on the stop 2","short paragraph on the stop 3"]
  }
}
"stops" property should include only three stops.
If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country},   return { "tour": null }, with no additional characters.`;

  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a tour guide" },
        { role: "user", content: query },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });
    console.log(response.choices[0].message);
    const tourData = JSON.parse(response.choices[0].message.content as any);
    console.log(tourData)
    if (!tourData.tour) return null;
    const usedTokens = response?.usage?.total_tokens;
    console.log(response.choices[0].message);
    console.log(response);
    return { tour: tourData.tour , tokens: usedTokens };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getExistingTour = async ({ city, country }: { city: string; country: string }) => {
  const localizedCity = city.slice(0, 1).toUpperCase() + city.slice(1);
  const localizedCountry = country.slice(0, 1).toUpperCase() + country.slice(1);
  return await prisma.tour.findUnique({
    where: {
      city_country: {
        city: localizedCity,
        country: localizedCountry,
      },
    },
  });
};

export const createNewTour = async (tour: any) => {
  return prisma.tour.create({
    data: tour,
  });
};

export const getAllTours = async (searchTerm: string | undefined) => {
  if (!searchTerm) {
    const tours = await prisma.tour.findMany({
      orderBy: {
        city: "desc",
      },
    });
    return tours;
  }

  const tours = await prisma.tour.findMany({
    where: {
      OR: [
        {
          city: {
            contains: searchTerm,
          },
        },
        {
          country: {
            contains: searchTerm,
          },
        },
      ],
    },
    orderBy: {
      city: "desc",
    },
  });
  return tours;
};

export const getSingleTour = async (id: string) => {
  return prisma.tour.findUnique({
    where: {
      id,
    },
  });
};

export const generateTourImage = async ({ city, country }: { city: string; country: string }) => {
  try {
    const tourImage = await openai.images.generate({
      model: "dall-e-2",
      // quality: "standard",
      prompt: `Panoramic view of the ${city}, ${country}`,
      n: 1,
      size: "512x512",
    });
    console.log(tourImage);
    return tourImage?.data[0]?.url;
  } catch (error) {
    return null;
  }
};

export const fetchUserTokensById = async (clerkId: string) => {
  const result = await prisma.token.findUnique({
    where: {
      clerkId,
    },
  });
  return result?.tokens;
};

export const generateUserTokensForId = async (clerkId: string) => {
  const result = await prisma.token.create({
    data: {
      clerkId,
    },
  });
  return result?.tokens;
};

export const fetchOrGenerateTokens = async (clerkId: string) => {
  const result = await fetchUserTokensById(clerkId);
  if (result) return result;

  return await generateUserTokensForId(clerkId);
};

export const subtractTokens = async (clerkId: string, amountOfTokens: number) => {
  const result = await prisma.token.update({
    where: {
      clerkId,
    },
    data: {
      tokens: {
        decrement: amountOfTokens,
      },
    },
  });
  revalidatePath("/chat");
  revalidatePath("/tours/new-tour");

  return result.tokens;
};
