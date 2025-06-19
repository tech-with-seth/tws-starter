import { CustomerPortal } from "@polar-sh/remix";
import {
  getCustomerId,
  getCustomerIdBySessionId,
} from "~/models/customer.server";
import { getSession } from "~/models/session.server";

export const loader = CustomerPortal({
  accessToken: import.meta.env.VITE_POLAR_ACCESS_TOKEN,
  async getCustomerId(event) {
    const token = event.headers
      .get("cookie")
      ?.split(";")
      .find((c) => c.trim().includes("better-auth.session_token"))
      ?.split("=")[1];

    if (!token) {
      throw new Error("No session token found");
    }

    const decodedToken = decodeURIComponent(token).split(".")[0];
    const session = await getSession({ sessionToken: decodedToken });

    console.log(
      "\n\n",
      "===== SESSION LOG =====",
      JSON.stringify({ session }, null, 4),
      "\n\n",
    );

    if (!session) {
      throw new Error("Session not found");
    }

    // Access the user from the session
    const user = session.user;
    if (!user) {
      throw new Error("User not found for session");
    }

    // If you need the customerId, you can still use your existing logic
    const customerId = await getCustomerId({
      id: user.id,
    });

    if (!customerId) {
      throw new Error("Customer not found for session");
    }

    // You can now use `user` or `customerId` as needed
    return customerId;
  },
  server: "sandbox",
});
