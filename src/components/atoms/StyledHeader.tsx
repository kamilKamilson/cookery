import { ReactNode } from "react";

export const StyledHeader = ({ children }: { children: ReactNode }) => (
  <div className="text-lg md:text-xl font-bold">{children}</div>
);
