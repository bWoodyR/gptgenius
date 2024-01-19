"use client";

import { useState } from "react";

const PricingPage = () => {
  const [amountOfTokens, setAmountOfTokens] = useState(5000);

  return (
    <section className="flex flex-col gap-4 w-1/2">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-4xl">PAY ONLY FOR WHAT YOU WANT USE!</h1>
        <hr />
      </div>
      <form className="flex flex-col gap-4">
        <p>
          Amount of TOKENS: <span className="text-lg font-bold">{new Intl.NumberFormat("sk-SK").format(amountOfTokens)}</span>
        </p>
        <p>
          Price: <span className="text-lg font-bold">{new Intl.NumberFormat("sk-SK", { style: "currency", currency: "EUR" }).format(amountOfTokens / 1000)}</span>
        </p>
        <input type="range" min={5000} max="100000" value={amountOfTokens} onChange={(e) => setAmountOfTokens(Number(e.target.value))} className="range range-primary" />
        <div>
          <button className="btn btn-primary">BUY</button>
        </div>
      </form>
    </section>
  );
};

export default PricingPage;
