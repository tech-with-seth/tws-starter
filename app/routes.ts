import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout(`routes/wrapper.tsx`, [
    index(`routes/home.tsx`),
    route(`about`, `routes/about.tsx`),
    route(`sign-in`, `routes/signin.tsx`),
    route(`sign-up`, `routes/signup.tsx`),
    route(`sign-out`, `routes/signout.ts`),
    route(`success`, `routes/customer-checkout-success.tsx`),
    layout(`routes/authenticated.tsx`, [
      route(`checkout`, `routes/customer-checkout.ts`),
      route(`dashboard`, `routes/dashboard.tsx`),
      route(`portal`, `routes/customer-portal.ts`),
      route(`profile`, `routes/profile.tsx`),
      ...prefix(`admin`, [
        route(`ai`, `routes/admin/ai.tsx`),
        route(`biz`, `routes/admin/business.tsx`),
        route(`email`, `routes/admin/email.tsx`),
      ]),
    ]),
    ...prefix(`api`, [route(`auth/*`, `routes/api/auth.ts`)]),
  ]),
] satisfies RouteConfig;
