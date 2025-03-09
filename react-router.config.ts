import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  prerender: ["/", "/login"],
} satisfies Config;
