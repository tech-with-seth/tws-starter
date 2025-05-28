import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react

export const { signIn, signUp, useSession } = createAuthClient({
  baseURL: import.meta.env.VITE_BETTER_AUTH_URL,
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
  },
});
