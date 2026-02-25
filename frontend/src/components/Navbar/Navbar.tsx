import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useCartState } from '../../store/cartStore'; // 引入購物車狀態
import './Navbar.css';

const Navbar = () => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const openLoginModal = useAuthStore((state) => state.openLoginModal);
    const { items } = useCartState();

    // 計算購物車商品總數
    const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo">MY-STORE</Link>
                <div className="nav-menu">
                    <Link to="/" className="nav-item">首頁</Link>
                    <Link to="/cart" className="nav-item cart-link">
                        <span>購物車</span>
                        {cartItemCount > 0 && (
                            <span className="cart-badge">{cartItemCount}</span>
                        )}
                    </Link>
                    {/* 根據登入狀態顯示不同的選項 */}
                    {isLoggedIn ? (
                        <div className="user-section">
                            <Link to="/profile" className="nav-item">我的帳戶</Link>
                            <span className="nav-divider"></span> {/* 視覺分隔線 */}
                            <Link to="/logout" className="nav-item logout-link">登出</Link>
                        </div>
                    ) : (
                        <button className="login-trigger-btn" onClick={openLoginModal}>
                            登入 / 註冊
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;