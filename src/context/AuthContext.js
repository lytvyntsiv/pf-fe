import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../api/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getUserInfo = useCallback(async () => {
    try {
      if (user) return;
      setIsLoading(true);

      const { data } = await AuthService.getMe();

      setUser(data.user);
      navigate("/");
    } catch (error) {
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  }, [navigate, user]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
