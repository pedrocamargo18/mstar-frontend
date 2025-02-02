import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false); 
    };

    checkAuthStatus();
  }, []); 


  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false); 
  };

  return { isAuthenticated, loading, logout };
};
