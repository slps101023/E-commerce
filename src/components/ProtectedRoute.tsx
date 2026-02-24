import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

// 定義 Props 的型別：保鑣需要保護的對象就是 children (子元件)
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const openLoginModal = useAuthStore((state) => state.openLoginModal);

  useEffect(() => {
    // 如果沒登入，就自動幫他打開登入小視窗
    if (!isLoggedIn) {
      openLoginModal();
    }
  }, [isLoggedIn, openLoginModal]);

  if (!isLoggedIn) {
    // to do : 這裡可以改成一個專門的提示頁面，告訴他「請先登入才能查看購物車」，並提供一個按鈕讓他重新開啟登入視窗
    return (
      <div className="page-container" style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>🛒 購物車專屬區域</h2>
        <p style={{ margin: '20px 0', color: '#666' }}>請完成登入後即可查看您的購物車</p>
        <button className="btn" onClick={openLoginModal}>
          重新開啟登入視窗
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;