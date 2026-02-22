import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Logout = () => {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    // 這裡我們利用 useEffect，讓這個頁面「一載入」就自動執行登出動作
    useEffect(() => {
        logout(); // 改變全域狀態為 false
        
        // (可選) 如果你想讓它停留 2 秒後自動跳回首頁，可以這樣寫：
        setTimeout(() => navigate('/'), 2000);
    }, [logout, navigate]);

    return (
        <div className="page-container" style={{ textAlign: 'center' }}>
            <h2>👋 您已成功登出</h2>
            <p style={{ margin: '15px 0', color: '#666' }}>感謝您的使用，期待您再次光臨！</p>
            <Link to="/">
                <button className="btn">回首頁</button>
            </Link>
        </div>
    );
};

export default Logout;