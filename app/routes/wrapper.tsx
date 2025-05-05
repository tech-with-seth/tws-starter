import { Outlet } from "react-router";
import { AppSidebar } from "~/components/app-sidebar";
import { Container } from "~/components/Container";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "~/components/ui/breadcrumb";
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
      <AppSidebar user={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {/* <Breadcrumb>
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
          </Breadcrumb> */}
        </header>
        <div className="grid h-full w-full grid-cols-12 grid-rows-[auto_1fr]">
          <header className="col-span-full border-b"></header>
          <main className="col-span-full flex flex-col overflow-y-auto">
            <div className="flex-1 p-4">
              <Outlet />
            </div>
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
      </SidebarInset>
    </SidebarProvider>
  );
}
