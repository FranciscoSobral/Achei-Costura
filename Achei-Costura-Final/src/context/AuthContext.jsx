import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false); 
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const savedUser = localStorage.getItem('dev_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          setIsLoggedIn(true);
        } catch (error) {
          localStorage.removeItem('dev_user');
        }
      } 
      setIsInitializing(false);
    };
    initializeAuth();
  }, []);

  // Agora login retorna uma Promise (permite usar await)
  const login = (userData) => {
    return new Promise((resolve) => {
      setLoadingAuth(true);

      setTimeout(() => {
          const newUser = userData || { 
            nome: 'Usuário Teste', 
            coins: 5 // Ajustei para 5 moedas como você mencionou
          };
          setUser(newUser);
          setIsLoggedIn(true);
          localStorage.setItem('dev_user', JSON.stringify(newUser));
          
          setLoadingAuth(false);
          resolve(); // Avisa que terminou!
      }, 1500);
    });
  };

  // Logout também retorna Promise
  const logout = () => {
    return new Promise((resolve) => {
      setLoadingAuth(true);

      setTimeout(() => {
          setIsLoggedIn(false);
          setUser(null);
          localStorage.removeItem('dev_user');
          
          setLoadingAuth(false);
          resolve(); // Avisa que terminou!
      }, 1500);
    });
  };

  const gastarMoeda = () => {
    if (user && user.coins > 0) {
      const updatedUser = { ...user, coins: user.coins - 1 };
      setUser(updatedUser);
      localStorage.setItem('dev_user', JSON.stringify(updatedUser));
      return true; 
    }
    return false; 
  };

  const value = { 
    isLoggedIn, 
    login, 
    logout, 
    user, 
    gastarMoeda, 
    isInitializing,
    loadingAuth 
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  return context;
}