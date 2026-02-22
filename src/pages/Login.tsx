import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Login = () => {

    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    function handleLogin() {
        login();
        navigate('/'); 
    }

    return (
        <div className="page-container" style={{ textAlign: 'center' }}>
            <h2>🔐 會員登入</h2>
            <p style={{ margin: '15px 0', color: '#666' }}>請登入以查看您的購物車</p>
            <button className="btn" onClick={handleLogin}>模擬登入</button>
        </div>
    );
};

export default Login;