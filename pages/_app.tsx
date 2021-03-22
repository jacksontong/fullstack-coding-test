import firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";

const firebaseConfig = {
  apiKey: "AIzaSyD2AaEGYFZ0va6ZI8RKKX7ryXwLsaj21jM",
  authDomain: "fir-nextjs-4de43.firebaseapp.com",
  databaseURL: "https://fir-nextjs-4de43.firebaseio.com",
  projectId: "fir-nextjs-4de43",
  storageBucket: "fir-nextjs-4de43.appspot.com",
  messagingSenderId: "507862495192",
  appId: "1:507862495192:web:2054982e463765437dccad",
};

const MyApp = ({ Component, pageProps }) => {
  return (
    <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </FirebaseAuthProvider>
  );
};

export default MyApp;
