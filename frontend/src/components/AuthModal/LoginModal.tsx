import { useAuthStore } from "../../store/authStore";

interface LoginModalProps {
  onSwitch: () => void;  // 切換到登入的函式
}

const LoginModal = ({ onSwitch }: LoginModalProps) => {
  const closeModal = useAuthStore((state) => state.closeModal);
  const login = useAuthStore((state) => state.login);

  return (
    <div className='modal-content' onClick={(e) => e.stopPropagation()}>
      <button onClick={closeModal} className='modal-close-btn'>
        &times;
      </button>
      <div className='modal-header'>
        <h2 className='modal-title'>歡迎回來</h2>
        <p className='modal-subtitle'>請登入您的帳戶以繼續購物</p>
      </div>
      {/* todo: 登入表單(hook form) */}
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
          還沒有帳號？
          <span className="signup-link" onClick={onSwitch}>
            立即註冊
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;