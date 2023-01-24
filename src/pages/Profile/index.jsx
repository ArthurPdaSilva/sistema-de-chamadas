import { useContext, useState } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";

import { FiSettings, FiUpload } from "react-icons/fi";
import avatar from "../../assets/avatar.png";
import { AuthContext } from "../../contexts/auth";

import "./profile.css";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../services/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function Profile() {
  const { user, storageUser, setUser, logout } = useContext(AuthContext);
  const [name, setName] = useState(user && user.nome);
  const [email, setEmail] = useState(user && user.email);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);

  function handleFile(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(image));
      } else {
        toast.error("Envie uma image válida!");
        setImageAvatar(null);
        return;
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (imageAvatar === null && name !== "") {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        nome: name,
      }).then(() => {
        const data = {
          ...user,
          nome: name,
        };
        setUser(data);
        storageUser(data);
        toast.success("Atualizado com sucesso!");
      });
    } else if (name !== "" && imageAvatar !== null) {
      handleUpload();
    }
  }

  async function handleUpload() {
    const currentUid = user.uid;
    const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`);
    uploadBytes(uploadRef, imageAvatar).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (downloadUrl) => {
        let urlFoto = downloadUrl;
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, {
          avatarUrl: urlFoto,
          nome: name,
        }).then(() => {
          const data = {
            ...user,
            nome: name,
            avatarUrl: urlFoto,
          };
          setUser(data);
          storageUser(data);
          toast.success("Atualizado com sucesso!");
        });
      });
    });
  }

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Minha conta">
          <FiSettings size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleSubmit}>
            <label className="label-avatar">
              <span>
                <FiUpload color="#FFF" size={25} />
              </span>
              <input type="file" accept="image/*" onChange={handleFile} />{" "}
              <br />
              {avatarUrl === null ? (
                <img
                  src={avatar}
                  alt="Foto de perfil"
                  width={250}
                  height={250}
                />
              ) : (
                <img
                  src={avatarUrl}
                  alt="Foto de perfil"
                  width={250}
                  height={250}
                />
              )}
            </label>

            <label>Nome</label>
            <input
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Email</label>
            <input
              type="email"
              placeholder="teste@teste.com"
              disabled={true}
              value={email}
            />

            <button type="submit">Salvar</button>
          </form>
        </div>

        <div className="container">
          <button className="logout-btn" onClick={logout} type="submit">
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
