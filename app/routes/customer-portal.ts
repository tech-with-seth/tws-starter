import { CustomerPortal } from "@polar-sh/remix";

export const loader = CustomerPortal({
  accessToken: import.meta.env.VITE_POLAR_ACCESS_TOKEN, // Or set an environment variable to POLAR_ACCESS_TOKEN
  getCustomerId: async (request: Request) => {
    console.log("===== LOG =====", JSON.stringify({ request }, null, 4));
    return "fdaff9d0-6156-4390-b616-7ea79df3ac9a";
  },
  server: "sandbox", // Use sandbox if you're testing Polar - omit the parameter or pass 'production' otherwise
});
