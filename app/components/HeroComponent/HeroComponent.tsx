import Link from "next/link";

const HeroComponent = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">GPT Genius App</h1>
          <p className="py-6">Your AI language companion. Powered by OpenAI, it enhances your conversations, content creation, and more!</p>
          <Link href="/chat" className="btn btn-accent">
            Get Started
          </Link>
          <ul className="steps mt-12 w-full">
            <li className="step step-accent">Login</li>
            <li className="step step-accent">Get Tokens</li>
            <li className="step step-accent">Generate Images</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;
