import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TWS Starter" },
    { name: "description", content: "Welcome to TWS Starter!" },
  ];
}

export default function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold">Welcome to TWS Starter</h1>
    </>
  );
}
