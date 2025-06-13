
import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode 
} from "react";

interface User {
  username: string;
  courseProgress: {
    [courseId: string]: number; // Stores progress percentage per course
  };
  completedCourses: string[]; // Stores IDs of completed courses
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
  updateCourseProgress: (courseId: string, progress: number) => void;
  markCourseComplete: (courseId: string) => void;
}

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Local Storage Keys
const USER_STORAGE_KEY = "crypto-learn-user";
const USERS_STORAGE_KEY = "crypto-learn-users";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from local storage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // Get registered users
  const getUsers = (): Record<string, string> => {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : {};
  };

  // Save users to local storage
  const saveUsers = (users: Record<string, string>) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  // Register a new user
  const register = async (username: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        const users = getUsers();
        
        if (users[username]) {
          reject(new Error("Username already exists"));
          return;
        }
        
        // Store new user
        users[username] = password;
        saveUsers(users);
        
        // Log user in with initial course progress
        const newUser = { 
          username,
          courseProgress: {},
          completedCourses: [] 
        };
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
        setUser(newUser);
        
        resolve();
      }, 800); // Simulate network delay
    });
  };

  // Login user
  const login = async (username: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        const users = getUsers();
        
        if (users[username] !== password) {
          reject(new Error("Invalid credentials"));
          return;
        }
        
        // Check if user has progress data, if not initialize it
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        let authenticatedUser: User;
        
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser.username === username) {
            // Use existing progress data if username matches
            authenticatedUser = parsedUser;
          } else {
            // Reset progress for different user
            authenticatedUser = { 
              username,
              courseProgress: {},
              completedCourses: [] 
            };
          }
        } else {
          // Initialize new progress data
          authenticatedUser = { 
            username,
            courseProgress: {},
            completedCourses: [] 
          };
        }
        
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authenticatedUser));
        setUser(authenticatedUser);
        
        resolve();
      }, 800); // Simulate network delay
    });
  };

  // Update course progress
  const updateCourseProgress = (courseId: string, progress: number) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      courseProgress: {
        ...user.courseProgress,
        [courseId]: progress
      }
    };
    
    // If progress is 100%, mark course as completed
    if (progress === 100 && !user.completedCourses.includes(courseId)) {
      updatedUser.completedCourses = [...user.completedCourses, courseId];
    }
    
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
    setUser(updatedUser);
  };
  
  // Mark course as complete
  const markCourseComplete = (courseId: string) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      courseProgress: {
        ...user.courseProgress,
        [courseId]: 100
      },
      completedCourses: user.completedCourses.includes(courseId) 
        ? user.completedCourses 
        : [...user.completedCourses, courseId]
    };
    
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateCourseProgress,
        markCourseComplete
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
