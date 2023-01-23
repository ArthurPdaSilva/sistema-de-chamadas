import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../services/firebase";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const navigate = useNavigate();

  function signIn(email, password) {
    console.log(email, password);
    alert("Deu certo");
  }

  async function signUp(email, password, name) {
    setLoadingAuth(true);
    await createUserWithEmailAndPassword(auth, email, password).then(
      async (value) => {
        let uid = value.user.uid;
        await setDoc(doc(db, "users", uid), {
          nome: name,
          avatarUrl: null,
        })
          .then(() => {
            const data = {
              uid: uid,
              nome: name,
              email: value.user.email,
              avatarUrl: null,
            };
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success("Seja bem-vindo ao sistema!");
            navigate("/dashboard");
          })
          .catch((err) => {
            console.log(err);
            setLoadingAuth(false);
          });
      }
    );
  }

  function storageUser(data) {
    localStorage.setItem("@ticketsPro", JSON.stringify(data));
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, signUp, loadingAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}
