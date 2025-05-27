import { redirect } from "react-router";

import type { Route } from "./+types/signout";
import { auth } from "~/utils/auth.server";

export async function loader() {
  return redirect("/");
}

export async function action({ request }: Route.ActionArgs) {
  if (request.method === "POST") {
    await auth.api.revokeSessions({
      headers: request.headers,
    });
  }
}
