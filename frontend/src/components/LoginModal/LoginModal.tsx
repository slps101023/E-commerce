import { useAuthStore,  } from '../../store/authStore';
import './LoginModal.css';

const LoginModal = () => {
  const isLoginModalOpen = useAuthStore((state) => state.isLoginModalOpen);
  const closeLoginModal = useAuthStore((state) => state.closeLoginModal);
  const login = useAuthStore((state) => state.login);

  if (!isLoginModalOpen) return null;

  return (
    /* 點擊遮罩處即可關閉 */
    <div className='modal-overlay' onClick={closeLoginModal}>
      {/* 點擊內容區時防止事件冒泡（避免關閉） */}
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <button onClick={closeLoginModal} className='modal-close-btn'>
          &times;
        </button>
        
        <div className='modal-header'>
          <h2 className='modal-title'>歡迎回來</h2>
          <p className='modal-subtitle'>請登入您的帳戶以繼續購物</p>
        </div>

        <div className='modal-form'>
          <div className="input-group">
            <label>帳號 / 手機</label>
            <input type="text" placeholder="請輸入帳號" className="modal-input" />
          </div>
          
          <div className="input-group">
            <label>密碼</label>
            <input type="password" placeholder="請輸入密碼" className="modal-input" />
            <div className="forgot-password">忘記密碼？</div>
          </div>

          <button className="modal-submit-btn" onClick={login}>
            立即登入
          </button>

          <div className="modal-footer">
            還沒有帳號？ <span className="signup-link">立即註冊</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;