import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, RegisterData, UserRole } from '@/types/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setRole: (role: UserRole, teacherSlug?: string) => void;
}

const mockUser = (name: string, email: string): User => ({
  id: `u_${Date.now()}`,
  name,
  email,
  avatar: undefined,
  joinedAt: new Date().toISOString(),
  locale: 'en',
  role: 'learner',
});

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async (email, _password) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 600));
        const name = email.split('@')[0];
        set({
          user: mockUser(name.charAt(0).toUpperCase() + name.slice(1), email),
          isAuthenticated: true,
          isLoading: false,
        });
      },
      register: async (data) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 600));
        set({
          user: mockUser(data.name, data.email),
          isAuthenticated: true,
          isLoading: false,
        });
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      setUser: (user) => set({ user, isAuthenticated: true }),
      setRole: (role, teacherSlug) =>
        set((s) =>
          s.user
            ? {
                user: {
                  ...s.user,
                  role,
                  teacherSlug:
                    role === 'teacher'
                      ? teacherSlug ?? s.user.teacherSlug ?? 'mohamed-thani-ahmed'
                      : undefined,
                },
              }
            : s
        ),
    }),
    {
      name: 'nma-auth',
    }
  )
);
