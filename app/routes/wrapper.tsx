import { AppSidebar } from "~/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "~/components/ui/sidebar";
import { useOptionalUser } from "~/utils/common";

export default function WrapperRoute() {
  const user = useOptionalUser();

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
        {/* <div className="grid h-screen w-full grid-cols-12 grid-rows-[auto_1fr_auto]">
          <header className="col-span-full border-b">
            <Container as="nav" className="flex justify-between p-4">
              <ul className="flex items-center gap-4">
                <li>
                  <SidebarTrigger />
                </li>
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
        </div> */}
      </SidebarInset>
    </SidebarProvider>
  );
}
