import { useAuthStore } from '../store/authStore';
import './LoginModal.css'; // 引入 CSS 檔案

const LoginModal = () => {
  // 從大腦取出視窗狀態與動作
  const { isLoginModalOpen, closeLoginModal, login } = useAuthStore();

  // 如果狀態是 false (不開啟)，就回傳 null (畫面上什麼都不畫)
  if (!isLoginModalOpen) return null;

  return (
    // 黑色的半透明背景 (Overlay)
    <div className='modal-overlay'>
      {/* 白色的彈出小視窗 (Modal) */}
      <div className='modal-content'>
        {/* 右上角的關閉按鈕 */}
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
          
          {/* 按下這個按鈕執行登入，大腦會把 isLoggedIn 變 true，同時把視窗關閉 */}
          <button className="modal-submit-btn" onClick={login}>
            登入
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;