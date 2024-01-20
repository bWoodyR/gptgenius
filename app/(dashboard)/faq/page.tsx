"use client";

import { useState } from "react";

const Faq = () => {
  const faqData = [
    {
      id: 1,
      title: "Click to open this one and close others",
      text: "hello",
    },
    {
      id: 2,
      title: "Click to open this one and close others",
      text: "hello",
    },
    {
      id: 3,
      title: "Click to open this one and close others",
      text: "hello",
    },
  ];

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h1 className="text-4xl  mb-4">FAQ</h1>
      </div>
      {faqData.map((item) => {
        return <FaqItem key={item.title} {...item} />;
      })}
    </section>
  );
};

type TFaqItem = { title: string; text: string; id: number };
const FaqItem = ({ title, text, id }: TFaqItem) => {
  const [showText, setShowText] = useState(false);

  return (
    <div className="collapse collapse-arrow bg-base-300">
      <input type="radio" name={`my-accordion-${id}`} checked={showText} onChange={() => setShowText(!showText)} />
      <div className="collapse-title text-xl font-medium">{title}</div>
      {showText && (
        <div className="collapse-content">
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

export default Faq;
