import TourInfo, { TTour } from "@/app/components/Tours/TourInfo";
import { generateTourImage, getSingleTour } from "@/utils/action";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import axios from "axios";

type Props = {
  params: { id: string };
};

const URL = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

const SinglePagetour = async ({ params }: Props) => {
  const tour = (await getSingleTour(params.id)) as any;

  if (!tour) {
    redirect("/tours");
  }

  // const tourImage = await generateTourImage({ city: tour.city, country: tour.country });

  const { data } = await axios.get(`${URL}${tour.city}`);
  const tourImage = data?.results[0]?.urls?.raw;
  return (
    <div>
      <Link href={"/tours"} className="btn btn-secondary mb-12">
        Back to Tours
      </Link>
      {tourImage ? (
        <div>
          <Image src={tourImage} width={300} height={300} className="rounded-xl shadow-xl mb-16 h-96 w-96 object-cover" alt={`${tour.title}`} priority />
        </div>
      ) : null}
      <TourInfo tour={tour} />
    </div>
  );
};

export default SinglePagetour;
