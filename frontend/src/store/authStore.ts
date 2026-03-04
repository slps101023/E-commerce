import { create } from 'zustand';

// 1. 定義狀態與行為的「型別」 (TypeScript 的保護機制)
interface AuthState {
  isLoggedIn: boolean;       // 記錄目前是否登入
  isModalOpen: boolean;  // 👈 新增：記錄視窗是否開啟
  login: () => void;         // 執行登入的動作
  logout: () => void;        // 執行登出的動作
  openModal: () => void; // 👈 新增：打開視窗的動作
  closeModal: () => void;// 👈 新增：關閉視窗的動作
}



// 2. 建立 Zustand Store (你的全域大腦)
// useAuthStore 是一個 Custom Hook，我們之後可以在任何元件裡呼叫它
export const useAuthStore = create<AuthState>((set) => ({
  // 初始狀態
  isLoggedIn: false, 
  isModalOpen: false, // 預設是不開啟的
  
  // 更新狀態的方法 (呼叫 set 函數來改變狀態)
  login: () => set({ isLoggedIn: true, isModalOpen: false }), // 登入後順便關閉視窗
  logout: () => set({ isLoggedIn: false }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));