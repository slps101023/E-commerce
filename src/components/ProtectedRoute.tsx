import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

// 定義 Props 的型別：保鑣需要保護的對象就是 children (子元件)
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // 1. 詢問大腦：他登入了沒？
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const openLoginModal = useAuthStore((state) => state.openLoginModal);

  useEffect(() => {
    // 如果沒登入，就自動幫他打開登入小視窗
    if (!isLoggedIn) {
      openLoginModal();
    }
  }, [isLoggedIn, openLoginModal]);

  // 同時，把他送回首頁 (避免他看到空的購物車破版)
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;