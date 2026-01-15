import React, { createContext, ReactNode, useState } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isLogin: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (fullName: string, username: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Mock Database
const mockDatabase = {
  users: [
    {
      id: "1",
      username: "demo",
      password: "demo123",
      email: "demo@example.com",
      fullName: "Demo User",
    },
    {
      id: "2",
      username: "test",
      password: "test123",
      email: "test@example.com",
      fullName: "Test User",
    },
  ],
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // ✅ ค้นหา user จาก mock database
      const foundUser = mockDatabase.users.find(
        (u) => u.username === username && u.password === password
      );

      if (foundUser) {
        const userData: User = {
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
          fullName: foundUser.fullName,
        };

        setUser(userData);
        setIsLogin(true);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    fullName: string,
    username: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);

      // ✅ ตรวจสอบว่า username ไม่ซ้ำ
      const userExists = mockDatabase.users.some((u) => u.username === username);
      if (userExists) {
        return false;
      }

      // ✅ สร้าง user ใหม่
      const newUser = {
        id: String(mockDatabase.users.length + 1),
        username,
        password,
        email,
        fullName,
      };

      mockDatabase.users.push(newUser);

      const userData: User = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        fullName: newUser.fullName,
      };

      setUser(userData);
      setIsLogin(true);
      return true;
    } catch (error) {
      console.error("Register error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setUser(null);
      setIsLogin(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isLogin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
