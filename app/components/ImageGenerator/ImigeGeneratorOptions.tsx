"use client";

type Props = {
  setImageGeneratorOptions: React.Dispatch<
    React.SetStateAction<{
      quality: "standard" | "hd";
      size: "1024x1024" | "1024x1792" | "1792x1024";
    }>
  >;
  imageGeneratorOptions: {
    quality: "standard" | "hd";
    size: "1024x1024" | "1024x1792" | "1792x1024";
  };
};

const ImigeGeneratorOptions = ({ setImageGeneratorOptions, imageGeneratorOptions }: Props) => {
  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quality = e.target.value as "standard" | "hd";
    setImageGeneratorOptions({ ...imageGeneratorOptions, quality });
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = e.target.value as "1024x1024" | "1024x1792" | "1792x1024";
    setImageGeneratorOptions({ ...imageGeneratorOptions, size });
  };

  const getCost = (size: string) => {
    if (imageGeneratorOptions.quality === "standard") {
      switch (size) {
        case "1024x1024":
          return "(0.04€)";
        case "1024x1792":
          return "(0.08€)";
        case "1792x1024":
          return "(0.08€)";
        default:
          throw new Error("Incorrect size");
      }
    }

    if (imageGeneratorOptions.quality === "hd") {
      switch (size) {
        case "1024x1024":
          return "(0.08€)";
        case "1024x1792":
          return "(0.12€)";
        case "1792x1024":
          return "(0.12€)";
        default:
          throw new Error("Incorrect size");
      }
    }
  };

  return (
    <>
      <div className="py-4 flex flex-row gap-8 items-center">
        <p className="font-bold text-lg">Quality:</p>
        <div className="flex gap-2 ">
          <input type="radio" name="quality" id="quality_standard" className="radio" value={"standard"} defaultChecked onChange={(e) => handleQualityChange(e)} />
          <label htmlFor="quality_standard" className="hover:cursor-pointer">Standard</label>
        </div>
        <div className="flex gap-2">
          <input type="radio" name="quality" id="quality_hd" className="radio" value={"hd"} onChange={(e) => handleQualityChange(e)} />
          <label htmlFor="quality_hd" className="hover:cursor-pointer">HD</label>
        </div>
      </div>
      <div className="py-4 flex flex-row gap-8 items-center">
        <p className="font-bold text-lg">Size:</p>
        <div className="flex gap-2 ">
          <input type="radio" name="size" id="size_1024x1024" value={"1024x1024"} className="radio" defaultChecked onChange={(e) => handleSizeChange(e)} />
          <label htmlFor="size_1024x1024" className="hover:cursor-pointer">
            1024x1024 <span className="text-sm text-gray-600">{getCost("1024x1024")}</span>
          </label>
        </div>
        <div className="flex gap-2">
          <input type="radio" name="size" id="size_1024x1792" value={"1024x1792"} className="radio" onChange={(e) => handleSizeChange(e)} />
          <label htmlFor="size_1024x1792" className="hover:cursor-pointer">
            1024x1792 <span className="text-sm text-gray-600">{getCost("1024x1792")}</span>
          </label>
        </div>
        <div className="flex gap-2">
          <input type="radio" name="size" id="size_1792x1024" value={"1792x1024"} className="radio" onChange={(e) => handleSizeChange(e)} />
          <label htmlFor="size_1792x1024" className="hover:cursor-pointer">
            1792x1024 <span className="text-sm text-gray-600">{getCost("1792x1024")}</span>
          </label>
        </div>
      </div>
    </>
  );
};

export default ImigeGeneratorOptions;
