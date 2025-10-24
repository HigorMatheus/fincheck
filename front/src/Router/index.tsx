import { BrowserRouter, Route } from "react-router";
import { Routes } from "react-router";
import { AuthGuard } from "./AuthGuard";
import Dashboard from "../view/pages/Dashboard";
import Register from "../view/pages/Register";
import Login from "../view/pages/Login";
import AuthLayout from "../view/layouts/AuthLayout";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Route>
        </Route>
        <Route element={<AuthGuard isPrivate />}>
          <Route path="/" element={<Dashboard />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
