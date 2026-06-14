import { create } from 'zustand';
import { getCurrentUser, onTokenChange  } from '#/api';


interface UserState {
  userId: number;
  userName: string;
  userRole: number;
  email: string;
  refreshUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: 0,
  userName: '',
  userRole: 0,
  email: '',
  refreshUser: () => {
    const user = getCurrentUser();
    if (user) {
      set({ userId: user.userId, userName: user.userName, userRole: user.role, email: user.email });
    } else {
      set({ userId: 0, userName: '', userRole: 0, email: '' });
    }
  },
}));


if (typeof window !== 'undefined') {
  onTokenChange(() => {
    useUserStore.getState().refreshUser();
  });
  useUserStore.getState().refreshUser();
}