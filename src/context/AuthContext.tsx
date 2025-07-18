import { useState, useEffect } from 'react';
import { AuthContext } from '../hooks/useAuth';

const USERS = [
  { user: 'jarvis', pass: '123' },
  { user: 'stark', pass: '456' },
];

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('stark-auth') === '1',
  );
  const [user, setUser] = useState<string | null>(() =>
    localStorage.getItem('stark-user'),
  );

  useEffect(() => {
    const syncAuth = () => {
      setIsAuthenticated(localStorage.getItem('stark-auth') === '1');
      setUser(localStorage.getItem('stark-user'));
    };
    window.addEventListener('storage', syncAuth);
    syncAuth();
    return () => window.removeEventListener('storage', syncAuth);
  }, []);

  const login = (user: string, pass: string): boolean => {
    const ok = USERS.some((u) => u.user === user && u.pass === pass);
    if (ok) {
      localStorage.setItem('stark-auth', '1');
      localStorage.setItem('stark-user', user);
      setIsAuthenticated(true);
      setUser(user);
    }
    return ok;
  };

  const logout = () => {
    localStorage.removeItem('stark-auth');
    localStorage.removeItem('stark-user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
