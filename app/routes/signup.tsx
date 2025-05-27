import { useReducer, useState } from "react";
import { Form, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { signUp } from "~/utils/auth-client";
import { SITE_TITLE } from "~/utils/site-config";

export function meta() {
  return [{ title: `${SITE_TITLE} | Sign Up` }];
}

export default function SignUpRoute() {
  const [email, setEmail] = useState("jeff@mail.com");
  const [name, setName] = useState("Jeff");
  const [password, setPassword] = useState("asdfasdf");

  const [isLoading, toggleIsLoading] = useReducer((s) => !s, false);

  const navigate = useNavigate();

  const handleSignUp = async () => {
    await signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onRequest: (ctx) => {
          // show loading state
        },
        onSuccess: (ctx) => {
          // redirect to home
        },
        onError: (ctx) => {
          alert(JSON.stringify(ctx.error, null, 2));
        },
      },
    );
  };

  return (
    <div className="flex h-full flex-col items-center justify-start gap-2 pt-12">
      <div className="w-full md:max-w-[500px]">
        <h1 className="mb-4 text-2xl font-bold">Sign up</h1>
        <Card className="w-full p-4">
          <Form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label className="font-bold">Name</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                disabled={isLoading}
              />
            </div>
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
              Sign Up
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
}
