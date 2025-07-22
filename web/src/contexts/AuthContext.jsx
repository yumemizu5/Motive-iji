import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("access"));

  // トークンを保存
  useEffect(() => {
    if (token) localStorage.setItem("access", token);
    else localStorage.removeItem("access");
  }, [token]);

  // 有効期限チェック
  const isValid = () => {
    if (!token) return false;
    try {
      const { exp } = jwtDecode(token);
      return Date.now() < exp * 1000;
    } catch {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken, isValid }}>
      {children}
    </AuthContext.Provider>
  );
}

