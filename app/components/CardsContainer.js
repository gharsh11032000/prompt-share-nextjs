import Card from "./Card";

export default function CardsContainer({ prompts }) {
  return (
    <div className="flex flex-wrap w-full py-8 px-2 mb-10 justify-center gap-4">
      {prompts.map((prompt) => {
        return <Card prompt={prompt} key={prompt.id} />;
      })}
    </div>
  );
}
