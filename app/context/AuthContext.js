"use client";

import axios from "axios";
import { createContext, useEffect, useState } from "react";
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
      const data = await axios.get(`/api/user`);

      if (data.statusText === "OK") {
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
    checkUserLoggedIn,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
