import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { AlertCircle } from "lucide-react";

import type { Route } from "./+types/root";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { SITE_TITLE } from "~/utils/site-config";
import { auth } from "./utils/auth.server";

import "./app.css";

export function meta() {
  return [{ title: SITE_TITLE }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const response = await auth.api.getSession({
    headers: request.headers,
  });

  return {
    user: response?.user || null,
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-white dark:bg-black">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <Alert className="mb-4 border-red-500 text-red-500">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="text-red-500">
          <p>{message}</p>
          <p>{details}</p>
        </AlertDescription>
      </Alert>
      {stack && (
        <details>
          <summary>Stack error</summary>
          <pre className="w-full overflow-x-auto p-4">
            <code>{stack}</code>
          </pre>
        </details>
      )}
    </main>
  );
}
