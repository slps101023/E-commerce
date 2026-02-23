import { useAuthStore } from '../store/authStore';

const LoginModal = () => {
  // 從大腦取出視窗狀態與動作
  const { isLoginModalOpen, closeLoginModal, login } = useAuthStore();

  // 如果狀態是 false (不開啟)，就回傳 null (畫面上什麼都不畫)
  if (!isLoginModalOpen) return null;

  return (
    // 黑色的半透明背景 (Overlay)
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: 1000 // 確保它浮在所有東西最上面
    }}>
      {/* 白色的彈出小視窗 (Modal) */}
      <div style={{
        backgroundColor: 'white', padding: '30px', borderRadius: '12px',
        width: '400px', maxWidth: '90%', position: 'relative',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        {/* 右上角的關閉按鈕 */}
        <button 
          onClick={closeLoginModal}
          style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
        >
          ❌
        </button>

        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>會員登入 (模擬)</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" placeholder="帳號 / 手機" style={{ padding: '10px', fontSize: '1rem' }} />
          <input type="password" placeholder="密碼" style={{ padding: '10px', fontSize: '1rem' }} />
          
          {/* 按下這個按鈕執行登入，大腦會把 isLoggedIn 變 true，同時把視窗關閉 */}
          <button className="btn" onClick={login} style={{ backgroundColor: '#e91e63' }}>
            登入
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;