import { Form, Link, Outlet } from "react-router";

import { AppSidebar } from "~/components/AppSidebar";
import { Container } from "~/components/Container";
import { Button } from "~/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { useOptionalUser } from "~/utils/common";

export default function WrapperRoute() {
  const user = useOptionalUser();

  return (
    <SidebarProvider>
      {!!user && <AppSidebar />}
      <div className="grid h-screen w-full grid-cols-12 grid-rows-[auto_1fr_auto]">
        <header className="col-span-full border-b">
          <Container as="nav" className="flex justify-between p-4">
            <ul className="flex items-center gap-4">
              {!!user && (
                <li>
                  <SidebarTrigger />
                </li>
              )}
              <li>
                <Link className="font-black" to="/">
                  TWS
                </Link>
              </li>
            </ul>
            <ul className="flex items-center gap-4">
              {user ? (
                <>
                  <li>
                    <Button asChild variant="link">
                      <Link to="/profile">Profile</Link>
                    </Button>
                  </li>
                  <li>
                    <Form method="POST" action="/logout">
                      <Button variant="link">Logout</Button>
                    </Form>
                  </li>
                </>
              ) : (
                <li>
                  <Button asChild variant="link">
                    <Link to="/login">Login</Link>
                  </Button>
                </li>
              )}
            </ul>
          </Container>
        </header>
        <main className="col-span-full flex flex-col overflow-y-auto">
          <Container className="flex-1 p-4">
            <Outlet />
          </Container>
          <footer className="col-span-full border-t">
            <Container className="p-4">
              Built by{" "}
              <a href="https://bsky.app/profile/sethdavis.tech">
                @sethdavis.tech
              </a>
            </Container>
          </footer>
        </main>
      </div>
    </SidebarProvider>
  );
}
