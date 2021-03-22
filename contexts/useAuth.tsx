import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "firebase";

// https://usehooks.com/useAuth

type AuthContext = ReturnType<typeof useProvideAuth>;

const authContext = createContext({} as AuthContext);

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export const ProvideAuth: React.FC = ({ children }) => {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => useContext(authContext);

function useProvideAuth() {
  const [user, setUser] = useState<firebase.User>(null);

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  });

  return {
    user,
    /**
     * Login an user by email and password
     * @param email
     * @param password
     * @returns
     */
    async signin(email: string, password: string) {
      const response = await firebase.auth().signInWithEmailAndPassword(email, password);
      setUser(response.user);

      return response.user;
    },
    /**
     * Signup a new user by email and password
     * @param email
     * @param password
     * @returns
     */
    async signup(email: string, password: string) {
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
      setUser(response.user);

      return response.user;
    },
    /**
     * Signout a logged in user
     */
    async signout() {
      await firebase.auth().signOut();
      setUser(null);
    },
  };
}
