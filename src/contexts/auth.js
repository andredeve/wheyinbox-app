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
                loading
            }}  
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;