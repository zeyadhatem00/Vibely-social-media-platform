import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function Authguard({ children }: { children: ReactNode }) {
  if (localStorage.getItem("token") == null) {
    return children;
  } else {
    return <Navigate to={"/Home"} />;
  }
}
