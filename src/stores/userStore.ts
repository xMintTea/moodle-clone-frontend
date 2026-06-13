import { create } from 'zustand';
import { getCurrentUser, onTokenChange  } from '#/api';


interface UserState {
  userId: number;
  userName: string;
  userRole: number;
  refreshUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: 0,
  userName: '',
  userRole: 0,
  refreshUser: () => {
    const user = getCurrentUser();
    if (user) {
      set({ userId: user.userId, userName: user.userName, userRole: user.role });
    } else {
      set({ userId: 0, userName: '', userRole: 0 });
    }
  },
}));


if (typeof window !== 'undefined') {
  onTokenChange(() => {
    useUserStore.getState().refreshUser();
  });
  useUserStore.getState().refreshUser();
}