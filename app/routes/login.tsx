import { Form } from "react-router";
import { parseWithZod, getZodConstraint } from "@conform-to/zod";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { createUser, getUserByEmail, verifyLogin } from "~/models/user.server";
import { createUserSession } from "~/session.server";
import { InputFormField } from "~/components/InputFormField";
import { loginSchema, signUpSchema } from "~/utils/validation";
import { safeRedirect } from "~/utils/common";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { Route } from "./+types/login";

export function meta() {
  return [{ title: "Login" }];
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const intent = form.get("intent");
  const redirectTo = safeRedirect(String(form.get("redirectTo")), "/");

  if (intent === "login") {
    const remember = String(form.get("remember"));
    const submission = parseWithZod(form, { schema: loginSchema });

    if (submission.status !== "success") {
      return submission.reply();
    }

    const user = await verifyLogin(
      submission.value.email,
      submission.value.password,
    );

    if (!user) {
      return submission.reply({
        formErrors: ["Invalid email or password"],
      });
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
      const submission = parseWithZod(form, { schema: signUpSchema });

      if (submission.status !== "success") {
        return submission.reply();
      }

      const existingUser = await getUserByEmail(email);

      if (existingUser) {
        return submission.reply({
          formErrors: ["Email already in use"],
        });
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

export default function LoginRoute({ actionData }: Route.ComponentProps) {
  const [loginForm, loginFields] = useForm({
    lastResult: actionData,
    constraint: getZodConstraint(loginSchema),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },
  });

  const [signUpForm, signUpFields] = useForm({
    lastResult: actionData,
    constraint: getZodConstraint(signUpSchema),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signUpSchema });
    },
  });

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
              <Form
                method="POST"
                className="space-y-4"
                {...getFormProps(loginForm)}
              >
                {loginForm.errors && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{loginForm.errors}</AlertDescription>
                  </Alert>
                )}
                <InputFormField
                  errorText={loginFields.email.errors}
                  label="Email"
                  {...getInputProps(loginFields.email, { type: "email" })}
                />
                <InputFormField
                  errorText={loginFields.password.errors?.at(0)}
                  label="Password"
                  {...getInputProps(loginFields.password, { type: "password" })}
                />
                <Button name="intent" value="login">
                  Login
                </Button>
              </Form>
            </TabsContent>
            <TabsContent value="join">
              <Form
                method="POST"
                className="space-y-4"
                {...getFormProps(signUpForm)}
              >
                <InputFormField
                  errorText={signUpFields.firstName.errors}
                  label="First name"
                  {...getInputProps(signUpFields.firstName, { type: "text" })}
                />
                <InputFormField
                  errorText={signUpFields.lastName.errors}
                  label="Last name"
                  {...getInputProps(signUpFields.lastName, { type: "text" })}
                />
                <InputFormField
                  errorText={signUpFields.email.errors}
                  label="Email"
                  {...getInputProps(signUpFields.email, { type: "email" })}
                />
                <InputFormField
                  errorText={signUpFields.password.errors?.at(0)}
                  label="Password"
                  {...getInputProps(signUpFields.password, {
                    type: "password",
                  })}
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
