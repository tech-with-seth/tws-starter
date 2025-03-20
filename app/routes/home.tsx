import type { PropsWithChildren } from "react";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TWS Starter" },
    { name: "description", content: "Welcome to TWS Starter!" },
  ];
}

function ResourceLink({ children, href }: PropsWithChildren<{ href: string }>) {
  return (
    <a href={href} className="underline">
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold">This is the TWS Starter</h1>
      <p className="py-4">Technologies used:</p>
      <ul>
        <li>
          <ResourceLink href="https://reactrouter.com/">
            React Router 7
          </ResourceLink>
        </li>
        <li>
          <ResourceLink href="https://tailwindcss.com/">
            Tailwind v4
          </ResourceLink>{" "}
          + <ResourceLink href="https://ui.shadcn.com/">shadcn</ResourceLink>
        </li>
        <li>
          <ResourceLink href="https://conform.guide/">Conform</ResourceLink> +{" "}
          <ResourceLink href="https://zod.dev/">Zod</ResourceLink>
        </li>
        <li>
          <ResourceLink href="https://www.prisma.io/docs">Prisma</ResourceLink>
        </li>
        <li>
          <ResourceLink href="https://reactrouter.com/">Railway</ResourceLink>
        </li>
      </ul>
    </>
  );
}
