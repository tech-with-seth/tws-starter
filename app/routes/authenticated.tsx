import { Outlet, redirect } from "react-router";

import type { Route } from "./+types/authenticated";
import { auth } from "~/utils/auth.server";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session || !session?.user) {
    return redirect("/login");
  }

  return null;
}

export default function AuthenticatedRoute() {
  return <Outlet />;
}
