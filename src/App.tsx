import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Logout from './pages/Logout/Logout';
import ProtectedRoute from './components/ProtectedRoute';
import LoginModal from './components/LoginModal/LoginModal';
import './App.css'

function App() {

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const openLoginModal = useAuthStore((state) => state.openLoginModal);

    return (
        <BrowserRouter>
            <LoginModal />
            {/* to do: 將navbar元件化 */}
            <nav className="navbar">
                <Link to="/" className="nav-link">首頁</Link>
                <Link to="/cart" className="nav-link">購物車</Link>
                {isLoggedIn ? (
                    <Link to="/logout" className="nav-link">登出</Link>
                ) : (
                    <button className="nav-link login-button" onClick={openLoginModal}>
                        登入
                    </button>
                )}
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    }
                />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;