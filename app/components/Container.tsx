import type { PropsWithChildren } from "react";
import { cn } from "~/utils/common";

interface ContainerProps {
  as?: React.ElementType;
  className?: string;
}

export function Container({
  as,
  children,
  className,
}: PropsWithChildren<ContainerProps>) {
  const Component = as || "div";

  return (
    <Component className={cn("container mx-auto", className)}>
      {children}
    </Component>
  );
}
