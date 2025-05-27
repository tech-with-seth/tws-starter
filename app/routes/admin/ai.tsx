import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import invariant from "tiny-invariant";

import type { Route } from "./+types/ai";
import { Form, useNavigation } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const prompt = form.get("prompt") as string;

  invariant(prompt, "Prompt is required");

  const { text } = await generateText({
    model: openai("o4-mini"),
    prompt,
  });

  return text;
}

export default function AiRoute({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Completions</h1>
      <Card className="mb-4 max-w-lg">
        <CardContent>
          <Form method="POST" className="flex gap-4">
            <div className="grow">
              <h3 className="mb-4 text-xl font-bold">Prompt</h3>
              <Input id="prompt" name="prompt" type="text" />
            </div>
            <div className="shrink self-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send"}
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
      {isSubmitting && !actionData && <div>Loading...</div>}
      {actionData && (
        <Card className="max-w-lg">
          <CardContent>
            <h3 className="mb-4 text-xl font-bold">Response</h3>
            <p className="whitespace-pre-line">{actionData}</p>
          </CardContent>
        </Card>
      )}
    </>
  );
}
