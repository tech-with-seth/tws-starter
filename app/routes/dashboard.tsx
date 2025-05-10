import { SITE_TITLE } from "~/utils/site-config";

export function meta() {
  return [{ title: `${SITE_TITLE} | Dashboard` }];
}

export default function DashboardRoute() {
  return <>Dashboard</>;
}
