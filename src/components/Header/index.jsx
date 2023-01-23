import React, { useContext } from "react";
import avatar from "../../assets/avatar.png";
import { AuthContext } from "../../contexts/auth";
import "./header.css";
import { FiHome, FiUser, FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Header() {
  const { user } = useContext(AuthContext);
  return (
    <div className="sidebar">
      <div>
        <img
          src={user.avatarUrl === null ? avatar : user.avatarUrl}
          alt="Foto do usuário"
        />
      </div>
      <Link to="/dashboard">
        <FiHome color="#FFF" size={24} />
        Chamados
      </Link>
      <Link to="/customers">
        <FiUser color="#FFF" size={24} />
        Clientes
      </Link>
      <Link to="/dashboard">
        <FiSettings color="#FFF" size={24} />
        Perfil
      </Link>
    </div>
  );
}
