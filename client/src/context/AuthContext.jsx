import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { authTokenService } from "../services/auth_token_service";
import { authService } from "../services/auth_service";

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const token = authTokenService.getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          authTokenService.removeToken();
          setUser(null);
          setIsAuthenticated(false);
        } else {
          setUser({ id: decoded.id, role: decoded.role });
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Invalid token", error);
        authTokenService.removeToken();
      }
    }
    setIsInitialized(true);
  }, []);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    if (data.token) {
      authTokenService.setToken(data.token);
      const decoded = jwtDecode(data.token);
      const loggedInUser = { id: decoded.id, role: decoded.role };
      setUser(loggedInUser);
      setIsAuthenticated(true);
      return loggedInUser;
    }
    throw new Error("No token received");
  };

  const logout = () => {
    authTokenService.removeToken();
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  if (!isInitialized) {
    return null; // Or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
