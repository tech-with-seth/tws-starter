import { Outlet } from "react-router";

import { requireUserId } from "~/session.server";
import type { Route } from "./+types/authenticated";

export async function loader({ request }: Route.LoaderArgs) {
  await requireUserId(request);

  return null;
}

export default function AuthenticatedRoute() {
  return <Outlet />;
}
