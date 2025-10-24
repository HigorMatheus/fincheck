import { Navigate } from "react-router";
import { Outlet } from "react-router";

export function AuthGuard({ isPrivate }: { isPrivate: boolean }) {
  const signedIn = false;

  if (!signedIn && isPrivate) {
    return <Navigate to="/login" replace />;
  }

  if (signedIn && !isPrivate) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
