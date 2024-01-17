import TourCard from "./TourCard";

type Props = {
  data: any;
};

const ToursList = ({ data }: Props) => {
  if (data.length === 0) {
    return <p className="text-lg">No tours found...</p>;
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {data.map((tour: any) => {
        return <TourCard key={tour.id} {...tour} />;
      })}
    </div>
  );
};

export default ToursList;
