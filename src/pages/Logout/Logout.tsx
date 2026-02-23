import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import './Logout.css';

const Logout = () => {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    // 這裡我們利用 useEffect，讓這個頁面「一載入」就自動執行登出動作
    useEffect(() => {
        logout(); // 改變全域狀態為 false
        
    }, [logout, navigate]);

    return (
        <div className="page-container logout-page">
            <h2>👋 您已成功登出</h2>
            <p>感謝您的使用，期待您再次光臨！</p>
            <Link to="/">
                <button className="btn">回首頁</button>
            </Link>
        </div>
    );
};

export default Logout;