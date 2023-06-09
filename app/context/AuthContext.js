"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const data = await axios.get(`/api/user`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.status === 200) {
        setUser(data.data);
        router.push("/");
      }
    } catch (error) {
      setUser(null);
      console.log("Checking User", error.response);
    }
  };

  const saveUser = (user) => {
    setUser(user);
  };

  const providerValue = {
    user,
    saveUser,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
