import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { redirect } from "react-router-dom";

export const authProvider = {
  isAuthenticated: false,
  user: null,
  async signout() {
    await signOut(auth)
      .then(() => {
        // sign-out successful.
        authProvider.isAuthenticated = false;
        authProvider.email = "";
        authProvider.password = "";
        authProvider.user = null;
        redirect("/");
      })
      .catch((error) => {
        // an error happened.
        console.log(error);
      });
  },
  async signin(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // signed in
        this.user = userCredential.user;
        this.isAuthenticated = true;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.signout();
      });
  },
};
