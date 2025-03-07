import { prisma } from "~/db.server";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TWS Starter" },
    { name: "description", content: "Welcome to TWS Starter!" },
  ];
}

export async function loader() {
  const users = await prisma.user.findMany();

  return {
    users,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <div className="p-4">
        <h1 className="text-4xl font-bold">Welcome to TWS Starter</h1>
      </div>
      <div className="flex gap-4">
        <div className="p-4">
          <h1 className="text-4xl font-bold">Side bar</h1>
        </div>
        <div className="p-4">
          <pre>
            <code>{JSON.stringify(loaderData, null, 4)}</code>
          </pre>
        </div>
      </div>
    </>
  );
}
