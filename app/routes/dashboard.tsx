import type { Route } from "./+types/dashboard";

export function meta() {
  return [{ title: "Dashboard" }];
}

export default function DashboardRoute({ loaderData }: Route.ComponentProps) {
  return <>{"Dashboard"}</>;
}
