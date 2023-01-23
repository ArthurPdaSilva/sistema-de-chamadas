import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/auth";
import { RoutesApp } from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}
