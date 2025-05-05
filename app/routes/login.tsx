import { data, useFetcher } from "react-router";
import { AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { createUser, getUserByEmail, verifyLogin } from "~/models/user.server";
import { createUserSession } from "~/session.server";
import { loginSchema, signUpSchema } from "~/utils/validation";
import { safeRedirect } from "~/utils/common";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { Route } from "./+types/login";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

export function meta() {
  return [{ title: "Login" }];
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const intent = String(form.get("intent"));
  const redirectTo = safeRedirect(String(form.get("redirectTo")), "/");

  if (intent === "login") {
    const email = String(form.get("email"));
    const password = String(form.get("password"));
    const remember = String(form.get("remember"));

    const user = await verifyLogin(email, password);

    if (!user) {
      return data(
        {
          loginError: "Invalid email or password",
        },
        { status: 401 },
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
      const existingUser = await getUserByEmail(email);

      if (existingUser) {
        return data(
          {
            signUpError: "Email already exists",
          },
          { status: 400 },
        );
      }

      const user = await createUser(email, password);

      return createUserSession({
        redirectTo,
        remember: false,
        request,
        userId: user.id,
      });
    }
  }

  return null;
}

export default function LoginRoute() {
  const loginFetcher = useFetcher();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    loginFetcher.submit(
      { ...values, intent: "login" },
      {
        method: "POST",
      },
    );
  }

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  function onSignUpSubmit(values: z.infer<typeof signUpSchema>) {
    loginFetcher.submit(
      { ...values, intent: "signUp" },
      {
        method: "POST",
      },
    );
  }

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
              {loginFetcher.data?.loginError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {loginFetcher.data.loginError}
                  </AlertDescription>
                </Alert>
              )}
              <Form {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="user@mail.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="join">
              {loginFetcher.data?.signUpError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {loginFetcher.data.signUpError}
                  </AlertDescription>
                </Alert>
              )}
              <Form {...signUpForm}>
                <form
                  onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={signUpForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="user@mail.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input placeholder="Steve" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input placeholder="Madden" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </TabsContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
}
