import { useAuthStore, } from '../../../store/authStore';
import './RegisterModal.css';

const RegisterModal = () => {
  const closeModal = useAuthStore((state) => state.closeModal);
  const login = useAuthStore((state) => state.login);

  return (
    <div className='modal-content' onClick={(e) => e.stopPropagation()}>
      <button onClick={closeModal} className='modal-close-btn'>
        &times;
      </button>
      <div className='modal-header'>
        <h2 className='modal-title'>加入會員</h2>
        <p className='modal-subtitle'>註冊新帳號以開始您的購物之旅</p>
      </div>

      <div className='modal-form'>
        {/* 1. 使用者名稱 */}
        <div className="input-group">
          <label>使用者名稱</label>
          <input type="text" placeholder="請輸入使用者名稱" className="modal-input" />
        </div>

        {/* 2. 電子郵件 (註冊通常需要 Email) */}
        <div className="input-group">
          <label>電子郵件</label>
          <input type="email" placeholder="example@mail.com" className="modal-input" />
        </div>

        {/* 3. 手機號碼 */}
        <div className="input-group">
          <label>手機號碼</label>
          <input type="text" placeholder="請輸入手機號碼" className="modal-input" />
        </div>

        {/* 4. 密碼 */}
        <div className="input-group">
          <label>設定密碼</label>
          <input type="password" placeholder="至少 6 位英數字" className="modal-input" />
        </div>

        {/* 5. 確認密碼 (註冊必備，防止手殘) */}
        <div className="input-group">
          <label>確認密碼</label>
          <input type="password" placeholder="請再次輸入密碼" className="modal-input" />
        </div>

        <button className="modal-submit-btn">
          立即註冊
        </button>

        <div className="modal-footer">
          已經有帳號了？
          <span className="signup-link">
            立即登入
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;