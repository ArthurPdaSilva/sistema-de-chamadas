import React, { useContext } from "react";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";
import "./dashboard.css";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      <Header />
      Dashboard
      <button onClick={logout}>Sair</button>
    </div>
  );
}
