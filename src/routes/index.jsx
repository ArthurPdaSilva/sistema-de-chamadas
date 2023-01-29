import { Routes, Route } from "react-router-dom";
import Customers from "../pages/Customers";
import Dashboard from "../pages/Dashboard";
import New from "../pages/New";
import Profile from "../pages/Profile";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Private from "./Private";

export function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />

      <Route
        path="/dashboard"
        element={
          <Private>
            <Dashboard />
          </Private>
        }
      />

      <Route
        path="/profile"
        element={
          <Private>
            <Profile />
          </Private>
        }
      />

      <Route
        path="/customers"
        element={
          <Private>
            <Customers />
          </Private>
        }
      />

      <Route
        path="/new"
        element={
          <Private>
            <New />
          </Private>
        }
      />

      <Route
        path="/new/:id"
        element={
          <Private>
            <New />
          </Private>
        }
      />
    </Routes>
  );
}
