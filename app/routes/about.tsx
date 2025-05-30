import type { PropsWithChildren } from "react";

import { SITE_TITLE } from "~/utils/site-config";

function ResourceLink({ children, href }: PropsWithChildren<{ href: string }>) {
  return (
    <a href={href} className="underline">
      {children}
    </a>
  );
}

export default function AboutRoute() {
  return (
    <>
      <h1 className="text-4xl font-bold">{`This is the ${SITE_TITLE}`}</h1>
      <p className="py-4">Technologies used:</p>
      <ul>
        <li>
          <ResourceLink href="https://reactrouter.com/">
            React Router 7
          </ResourceLink>
        </li>
        <li>
          <ResourceLink href="https://www.better-auth.com/">
            Better Auth
          </ResourceLink>
        </li>
        <li>
          <ResourceLink href="https://polar.sh/">Polar</ResourceLink>
        </li>
        <li>
          <ResourceLink href="https://resend.com/">Resend</ResourceLink>
        </li>
        <li>
          <ResourceLink href="https://react-hook-form.com/">
            React Hook Form
          </ResourceLink>{" "}
          + <ResourceLink href="https://zod.dev/">Zod</ResourceLink>
        </li>
        <li>
          <ResourceLink href="https://tailwindcss.com/">
            Tailwind v4
          </ResourceLink>{" "}
          + <ResourceLink href="https://ui.shadcn.com/">shadcn</ResourceLink>
        </li>
        <li>
          <ResourceLink href="https://www.prisma.io/docs">Prisma</ResourceLink>
        </li>
        <li>
          <ResourceLink href="https://railway.com/">Railway</ResourceLink>
        </li>
      </ul>
    </>
  );
}
