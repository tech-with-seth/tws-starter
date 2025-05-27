import type { PropsWithChildren } from "react";
import { SITE_TITLE } from "~/utils/site-config";

export function meta() {
  return [
    { title: SITE_TITLE },
    { name: "description", content: `Welcome to ${SITE_TITLE}!` },
  ];
}

export default function Home() {
  return (
    <>
      <p>{`Home`}</p>
    </>
  );
}
