import { useReducer, useState } from "react";
import { Form, redirect, useHref, useNavigate } from "react-router";

import { Card } from "~/components/ui/card";
import { SITE_TITLE } from "~/utils/site-config";
import { signIn } from "~/utils/auth-client";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import type { Route } from "./+types/signin";
import { auth } from "~/utils/auth.server";

export function meta() {
  return [{ title: `${SITE_TITLE} | Sign In` }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const response = await auth.api.getSession({
    headers: request.headers,
  });

  if (response && response.session && response.user) {
    return redirect("/dashboard");
  }

  return null;
}

export default function SignInRoute() {
  const [email, setEmail] = useState("jeff@mail.com");
  const [password, setPassword] = useState("asdfasdf");

  const [isLoading, toggleIsLoading] = useReducer((s) => !s, false);

  const navigate = useNavigate();

  const handleSignIn = async () => {
    await signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: (ctx) => {
          // show loading state
          toggleIsLoading();
        },
        onSuccess: (ctx) => {
          navigate(`/dashboard`);
        },
        onError: (ctx) => {
          alert(JSON.stringify(ctx.error, null, 2));
          toggleIsLoading();
        },
      },
    );
  };

  return (
    <div className="flex h-full flex-col items-center justify-start gap-2 pt-12">
      <div className="w-full md:max-w-[500px]">
        <h1 className="mb-4 text-2xl font-bold">Sign in</h1>
        <Card className="w-full p-4">
          <Form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label className="font-bold">Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold">Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                disabled={isLoading}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              Sign in
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
}
