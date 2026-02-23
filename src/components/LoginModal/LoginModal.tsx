import { useAuthStore } from '../../store/authStore';
import './LoginModal.css'; // 引入 CSS 檔案

const LoginModal = () => {
  // 從Zustand取出視窗狀態與動作
  const isLoginModalOpen = useAuthStore((state) => state.isLoginModalOpen);
  const closeLoginModal = useAuthStore((state) => state.closeLoginModal);
  const login = useAuthStore((state) => state.login);

  // 如果狀態是 false (不開啟)，就回傳 null (畫面上什麼都不畫)
  if (isLoginModalOpen === false) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <button
          onClick={closeLoginModal}
          className='modal-close-btn'
        >
          ❌
        </button>
        <h2 className='modal-title'>會員登入 (模擬)</h2>
        <div className='modal-form'>
          <input type="text" placeholder="帳號 / 手機" className="modal-input" />
          <input type="password" placeholder="密碼" className="modal-input" />
          <button className="modal-submit-btn" onClick={login}>
            登入
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;