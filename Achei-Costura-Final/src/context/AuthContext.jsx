import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true); // Estado de carregamento

  useEffect(() => {
    const initializeAuth = () => {
      const isDevelopment = process.env.NODE_ENV === 'development';
      
      // Tenta carregar do localStorage primeiro
      const savedUser = localStorage.getItem('dev_user');
      
      if (savedUser) {
        // Restaura do localStorage
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
        console.log('🔄 Usuário restaurado do localStorage');
      } else if (isDevelopment) {
        // Login automático apenas se não tiver usuário salvo
        console.log('🔄 Login automático para desenvolvimento');
        const devUser = { 
          nome: 'Usuário Teste', 
          coins: 1 
        };
        setUser(devUser);
        setIsLoggedIn(true);
        localStorage.setItem('dev_user', JSON.stringify(devUser));
      }
      
      setIsInitializing(false);
    };
    
    initializeAuth();
  }, []); // Executa apenas uma vez

  const login = () => {
    setIsLoggedIn(true);
    const newUser = { 
      nome: 'Usuário Teste', 
      coins: 1 
    };
    setUser(newUser);
    localStorage.setItem('dev_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('dev_user');
  };

  const gastarMoeda = () => {
    if (user && user.coins > 0) {
      const updatedUser = {
        ...user,
        coins: user.coins - 1
      };
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
    isInitializing // Para mostrar loading se necessário
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  // Opcional: Pode adicionar um loading enquanto inicializa
  if (context.isInitializing) {
    console.log('⏳ AuthContext ainda inicializando...');
  }
  
  return context;
}