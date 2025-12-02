import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface User {
  id: string;
  email: string;
}
interface Session {
  user: User | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSession({ user: null });
    setUser(null);
    setIsAdmin(false);
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setUser({ id: "1", email });
    setSession({ user: { id: "1", email } });
    return { error: null };
  };

  const signUp = async (email: string, password: string) => {
    setUser({ id: "1", email });
    setSession({ user: { id: "1", email } });
    return { error: null };
  };

  const signOut = async () => {
    setUser(null);
    setSession({ user: null });
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, session, isAdmin, isLoading, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
