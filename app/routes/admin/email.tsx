import { Form, data } from "react-router";
import { Resend } from "resend";

import { Button } from "~/components/ui/button";
import { getUsers } from "~/models/user.server";

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

export async function loader() {
  return {
    users: await getUsers(),
  };
}

export async function action() {
  const { data: emailData, error } = await resend.emails.send({
    from: "Sethers <hey@sethdavis.tech>",
    to: ["sethdavis512@gmail.com"],
    subject: "Welcome to our Community!",
    html: `
        <html>
            <body>
                <h1>Welcome to Our Community!</h1>
                <p>Hi there,</p>
                <p>We're excited to have you on board. Feel free to reach out if you have any questions or need assistance.</p>
                <p>Best regards,</p>
                <p>The Team</p>
            </body>
        </html>
    `,
  });

  if (error) {
    return data({ error }, 500);
  }

  return data(emailData, 200);
}

export default function EmailRoute() {
  return (
    <>
      <Form method="POST">
        <Button type="submit">Send email</Button>
      </Form>
    </>
  );
}
