import {
  Form,
  Link,
  NavLink,
  Outlet,
  type NavLinkRenderProps,
} from "react-router";

import { SITE_TITLE } from "~/utils/site-config";
import { useOptionalUser } from "~/utils/common";

const defaultLinkStyle = `inline-block px-3 py-2 rounded-md dark:hover:bg-zinc-800`;

const navLinkClassName = ({ isActive }: NavLinkRenderProps) =>
  `${defaultLinkStyle} ${isActive ? "bg-zinc-200 dark:bg-zinc-700" : ""}`;

export default function WrapperRoute() {
  const user = useOptionalUser();

  return (
    <>
      <div className="grid h-full w-full grid-cols-12 grid-rows-[auto_1fr]">
        <header className="col-span-full border-b">
          <nav className="flex justify-between">
            <ul className="flex items-center gap-2 px-2 py-2">
              <li>
                <Link to="/" className={defaultLinkStyle}>
                  {SITE_TITLE}
                </Link>
              </li>
              <li>
                <NavLink to="/about" className={navLinkClassName}>
                  About
                </NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink to="/dashboard" className={navLinkClassName}>
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/profile" className={navLinkClassName}>
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/portal" className={navLinkClassName}>
                      Portal
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`/checkout?products=c2a7d57a-b0c4-4216-afe3-ed477524fff8&products=045ca2e4-8c5c-4c54-9cf8-86d46cf4fc40`}
                      className={navLinkClassName}
                    >
                      Checkout
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
            <ul className="flex items-center gap-2 px-2 py-2">
              {!user && (
                <>
                  <li>
                    <NavLink to="/sign-in" className={navLinkClassName}>
                      Sign In
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/sign-up" className={navLinkClassName}>
                      Sign Up
                    </NavLink>
                  </li>
                </>
              )}
              {user && (
                <li>
                  <Form method="POST" action="/sign-out">
                    <button className={defaultLinkStyle} type="submit">
                      <p>Sign Out</p>
                    </button>
                  </Form>
                </li>
              )}
            </ul>
          </nav>
        </header>
        <main className="col-span-full flex flex-col overflow-y-auto">
          <div className="flex-1 p-4">
            <Outlet />
          </div>
          <footer className="col-span-full border-t p-4">
            Built by{" "}
            <a href="https://bsky.app/profile/sethdavis.tech">
              @sethdavis.tech
            </a>
          </footer>
        </main>
      </div>
    </>
  );
}
