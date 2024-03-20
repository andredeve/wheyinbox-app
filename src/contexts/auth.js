import {useState, createContext, useEffect} from 'react';
import {auth, db} from '../services/firebaseConection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loadingauth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const products = [
      {
        id: 1,
        nome: "Pré-treino Hor...",
        preco: 1,
        quantidade: 1,
        imagem: require('../assets/produtos/horus-300-frutas-vermelhas.png'),
      },
      {
        id: 2,
        nome: "Barrinha Brownie",
        preco: 1,
        quantidade: 1,
        imagem: require('../assets/produtos/barrinha-brownie-black-skull.png'),
      },
      {
        id: 3,
        nome: "Whey Isolado Nutrata",
        preco: 1,
        quantidade: 1,
        imagem: require('../assets/produtos/whey-isolado-nutrata-900-chocolate.png'),
      }
    ];

    const [itens, setItens] = useState([]);

    const calcularTotal = () => {
      return itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    };

    
    const adicionarItem = (id) => {
      const novoItem = products.find(item => item.id === id);
      const itemExistente = itens.find(item => item.id === id);
    
      if (itemExistente) {
        const novosItens = itens.map(item => {
          if (item.id === id) {
            return { ...item, quantidade: item.quantidade + 1 };
          }
          return item;
        });
        setItens(novosItens);
      } else {
        setItens([...itens, { ...novoItem, quantidade: 1 }]);
      }
    };
  
    const removerItem = (id) => {
      const novosItens = itens.filter(item => item.id !== id);
      setItens(novosItens);
    };
  
    const diminuirQuantidade = (id) => {
      const novosItens = itens.map(item => {
        if (item.id === id && item.quantidade > 1) {
          return { ...item, quantidade: item.quantidade - 1 };
        }
        return item;
      });
      setItens(novosItens);
    };
  
    const alterarQuantidade = (id, quantidade) => {
      const novosItens = itens.map(item => {
        if (item.id === id) {
          return { ...item, quantidade: quantidade };
        }
        return item;
      });
      setItens(novosItens);
    };








    useEffect(()=>{
      async function loadUser(){
        const storageUser = localStorage.getItem('@AuthUsers')
        if(storageUser){
          setUser(JSON.parse(storageUser));
          setLoadingAuth(false);
        }

        setLoadingAuth(false);
      }
      loadUser();
    },[])


    async function signIn(email, password){
       setLoadingAuth(true);
       await signInWithEmailAndPassword(auth, email, password) 
       .then( async(value)=>{
          let uid = value.user.uid;

          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);

          let data = {
            uid: uid,
            nome: docSnap.data().nome,
            email: value.user.email,
            avatarUrl: docSnap.data().avatarUrl
          };
          
          setUser(data);
          storageUser(data);
          setLoadingAuth(false);
          toast.success("Bem-vindo de volta!");
          navigate("/home");
       })
       .catch((error)=>{
          console.log(error);
          setLoadingAuth(false);
          toast.error("Ops, algo deu errado!");
       })
    }

    async function signUp(email, password, name){
        setLoadingAuth(true);
    
        await createUserWithEmailAndPassword(auth, email, password)
        .then( async (value) => {
            let uid = value.user.uid
    
            await setDoc(doc(db, "users", uid), {
              nome: name,
              avatarUrl: null
            })
            .then( () => {
    
              let data = {
                uid: uid,
                nome: name,
                email: value.user.email,
                avatarUrl: null
              };
    
              setUser(data);
              storageUser(data);
              setLoadingAuth(false);
              toast.success("Seja bem-vindo ao sistema!");
              navigate("/home");
            })
    
    
        })
        .catch((error) => {
          console.log(error);
          setLoadingAuth(false);
        })
    
      }
    
      function storageUser(data){
        localStorage.setItem('@AuthUsers', JSON.stringify(data));
      }

      async function logout(){
        await signOut(auth);
        localStorage.removeItem('@AuthUsers');
        setUser(null);
      }

    return(
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                signIn,
                signUp,
                logout,
                loadingauth,
                loading,
                itens,
                calcularTotal,
                adicionarItem,
                removerItem,
                diminuirQuantidade,
                alterarQuantidade,
                products
            }}  
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;