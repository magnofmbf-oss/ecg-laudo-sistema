import React, { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { isEmailAutorizado } from "../config/authorized-users";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Verificar se o email está autorizado
      if (user && !isEmailAutorizado(user.email)) {
        console.warn("Acesso negado para:", user.email);
        firebaseSignOut(auth);
        setUser(null);
      } else {
        setUser(user);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // Verificar se o email está autorizado
      if (!isEmailAutorizado(result.user.email)) {
        await firebaseSignOut(auth);
        throw new Error("EMAIL_NAO_AUTORIZADO");
      }

      return result.user;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
