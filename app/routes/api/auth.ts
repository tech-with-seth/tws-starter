import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";

import { auth } from "~/utils/auth.server"; // Adjust the path as necessary

export async function loader({ request }: LoaderFunctionArgs) {
  return auth.handler(request);
}

export async function action({ request }: ActionFunctionArgs) {
  return auth.handler(request);
}
