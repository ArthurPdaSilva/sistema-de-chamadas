import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import { auth, db } from "../services/firebase";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

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
            setLoadingAuth(false);
          })
          .catch((err) => {
            console.log(err);
            setLoadingAuth(false);
          });
      }
    );
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, signUp, loadingAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}
