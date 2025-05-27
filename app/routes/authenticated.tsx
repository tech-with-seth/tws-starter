import { Outlet, redirect } from "react-router";

import type { Route } from "./+types/authenticated";
import { auth } from "~/utils/auth.server";

export async function loader({ request }: Route.LoaderArgs) {
  const response = await auth.api.getSession({
    headers: request.headers,
  });

  if (!response || !response.session || !response.user) {
    return redirect("/sign-in");
  }

  return null;
}

export default function AuthenticatedRoute() {
  return <Outlet />;
}
