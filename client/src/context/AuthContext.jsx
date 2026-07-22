import React, { createContext, useState, useEffect } from "react";
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

  useEffect(() => {
    // Initialize auth state from token (placeholder for actual user fetching)
    const token = authTokenService.getToken();
    if (token) {
      // In a real app, you might decode the JWT or fetch the user profile here
      setIsAuthenticated(true);
      // setUser({ id: 1, role: 'USER' }); // Placeholder
    }
  }, []);

  const login = async (credentials) => {
    // const data = await authService.login(credentials);
    // authTokenService.setToken(data.token);
    // setUser(data.user);
    // setIsAuthenticated(true);

    // Placeholder implementation for now
    authTokenService.setToken("placeholder-token");
    setIsAuthenticated(true);
    setUser({ id: 1, role: "USER" });
  };

  const logout = () => {
    authTokenService.removeToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
