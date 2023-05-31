import Search from "./Search";

export default function Hero() {
  return (
    <>
      <div className="hero px-4 py-16">
        <div className="hero-content text-center">
          <div className="max-w-4xl flex items-center justify-center flex-col">
            <h1 className="text-5xl font-bold leading-tight">
              <span className="changing-text mr-3 underline underline-offset-2"></span>
              <span>Engaging Prompts.</span>
            </h1>
            <p className="py-6 max-w-lg">
              Unleash your imagination and inspire others at Prompt Verse, the
              ultimate platform for prompt sharing.
            </p>
            <Search />
          </div>
        </div>
      </div>
    </>
  );
}
