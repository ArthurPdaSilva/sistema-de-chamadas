import React, { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import "./dashboard.css";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      Dashboard
      <button onClick={logout}>Sair</button>
    </div>
  );
}
