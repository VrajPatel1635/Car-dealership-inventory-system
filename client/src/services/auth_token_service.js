import { storage } from "../utils/storage";

const TOKEN_KEY = "auth_token";

export const authTokenService = {
  getToken: () => storage.getItem(TOKEN_KEY),
  setToken: (token) => storage.setItem(TOKEN_KEY, token),
  removeToken: () => storage.removeItem(TOKEN_KEY),
};
