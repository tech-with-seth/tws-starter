import { requireUserId } from "~/session.server";
import type { Route } from "./+types/dashboard";

export function meta() {
  return [{ title: "Dashboard" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const userId = await requireUserId(request);

  return {
    userId,
  };
}

export default function DashboardRoute({ loaderData }: Route.ComponentProps) {
  return (
    <>
      {"Dashboard"} || {loaderData.userId}
    </>
  );
}
