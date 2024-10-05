import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc, query, where, getDocs, collection } from "firebase/firestore";  
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBMjvCbxME1lR5RsqH2KTCmrzDMFeUL6tU",
  authDomain: "chat-app-e8edc.firebaseapp.com",
  projectId: "chat-app-e8edc",
  storageBucket: "chat-app-e8edc.appspot.com",
  messagingSenderId: "495805931554",
  appId: "1:495805931554:web:b15925188f77ebf1e6ea7b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        username: username.toLowerCase(),
        email,
        name: "",
        avatar: "",
        lastSeen: Date.now(),
        bio: "hey, there I am using chat app",
      });
      await setDoc(doc(db, "chats", user.uid), {
        chatsData: []
      });
      toast.success("User created successfully!");
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error(`Error: ${error.message}`);
    }
  };


  const login = async(email,password) =>{
    try {
      await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
      console.error("Error during signin:", error);
      toast.error(`Error: ${error.message}`);
    }
  }

  const logOut = async () =>{
  try {
    await signOut(auth)
  } catch (error) {
    console.error("Error during signin:", error);
    toast.error(`Error: ${error.message}`);
  }
  }
 
  const resetPass = async (email) => {
    if(!email) {
      toast.error("enter your email");
      return null;
    }
    try {
      const userRef = collection(db,'users')
      const q = query(userRef,where("email","==",email))
      const querySnap = await getDocs(q)
      if (!querySnap.empty) {
        await sendPasswordResetEmail (auth,email);
        toast.success("reset email sent")
      }
      else{
        toast.error("email doesnot exist")
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }
export {login, signup,logOut,auth,db,resetPass };
