import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../services/firebase";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const storageUser = localStorage.getItem("@ticketsPro");
      if (storageUser) setUser(JSON.parse(storageUser));
      setLoading(false);
    }
    loadUser();
  }, []);

  async function signIn(email, password) {
    setLoadingAuth(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        const data = {
          uid: uid,
          nome: docSnap.data().nome,
          email: value.user.email,
          avatarUrl: docSnap.data().avatarUrl,
        };
        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
        toast.success("bem-vindo de volta!");
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setLoadingAuth(false);
        toast.error("Algo deu errado");
      });
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
            toast.error("Algo deu errado");
          });
      }
    );
  }

  async function logout() {
    await signOut(auth);
    localStorage.removeItem("@ticketsPro");
    setUser(null);
  }

  function storageUser(data) {
    localStorage.setItem("@ticketsPro", JSON.stringify(data));
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loadingAuth,
        loading,
        signIn,
        signUp,
        logout,
        storageUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
