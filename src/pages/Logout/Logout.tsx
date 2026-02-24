import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import './Logout.css';

const Logout = () => {
    const logout = useAuthStore((state) => state.logout);
    const openLoginModal = useAuthStore((state) => state.openLoginModal);
    const navigate = useNavigate();

    // 這裡我們利用 useEffect，讓這個頁面「一載入」就自動執行登出動作
    useEffect(() => {
        logout(); // 改變全域狀態為 false

    }, [logout, navigate]);

    return (
        <div className="logout-page">
            <div className="logout-card">
                <div className="logout-icon">✨</div>
                <h2>您已成功登出</h2>
                <p>感謝您的光臨，我們會保留您的追蹤清單！</p>
                <div className="logout-actions">
                    <Link to="/">
                        <button className="btn-primary">立即回首頁</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Logout;