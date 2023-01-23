import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/auth";
import { RoutesApp } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer autoClose={3000} theme="colored" />
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}
