import { data, Form, redirect } from "react-router";

import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { createUserSession } from "~/session.server";
import { InputFormField } from "~/components/InputFormField";
import { safeRedirect } from "~/utils/common";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { verifyLogin } from "~/models/user.server";
import type { Route } from "./+types/login";

export function meta() {
  return [{ title: "Login" }];
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const intent = form.get("intent");

  if (intent === "login") {
    const email = String(form.get("email"));
    const password = String(form.get("password"));
    const redirectTo = safeRedirect(String(form.get("redirectTo")), "/");
    const remember = String(form.get("remember"));

    // Add CONFORM validation here

    const user = await verifyLogin(email, password);

    if (!user) {
      return data(
        { errors: { email: "Invalid email or password", password: null } },
        { status: 400 },
      );
    }

    return createUserSession({
      redirectTo,
      remember: remember === "on" ? true : false,
      request,
      userId: user.id,
    });
  }

  if (intent === "signUp") {
    const email = String(form.get("email"));
    const password = String(form.get("password"));
    const firstName = String(form.get("firstName"));
    const lastName = String(form.get("lastName"));

    if (email && password && firstName && lastName) {
      console.log(
        "===== LOG =====",
        JSON.stringify({ email, password }, null, 4),
      );

      return redirect("/dashboard");
    }
  }

  return null;
}

export default function LoginRoute() {
  return (
    <div className="flex h-full flex-col items-center justify-start gap-2 pt-12">
      <div className="min-w-[500px]">
        <h1 className="mb-4 text-2xl font-bold">Login or sign up</h1>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="join">Sign up</TabsTrigger>
          </TabsList>
          <Card className="w-full p-4">
            <TabsContent value="login">
              <Form method="POST" className="space-y-4">
                <InputFormField
                  errorText="ASDF"
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                />
                <InputFormField
                  errorText="ASDF"
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                />
                <Button name="intent" value="login">
                  Login
                </Button>
              </Form>
            </TabsContent>
            <TabsContent value="join">
              <Form method="POST" className="space-y-4">
                <InputFormField
                  errorText="ASDF"
                  id="firstName"
                  label="First name"
                  name="firstName"
                  type="text"
                />
                <InputFormField
                  errorText="ASDF"
                  id="lastName"
                  label="Last name"
                  name="lastName"
                  type="text"
                />
                <InputFormField
                  errorText="ASDF"
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                />
                <InputFormField
                  errorText="ASDF"
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                />
                <Button name="intent" value="signUp">
                  Sign up
                </Button>
              </Form>
            </TabsContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
}
