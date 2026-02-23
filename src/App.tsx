import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Logout from './pages/Logout';
import ProtectedRoute from './components/ProtectedRoute';
import LoginModal from './components/LoginModal';

function App() {

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const openLoginModal = useAuthStore((state) => state.openLoginModal);

    return (
        <BrowserRouter>
            <LoginModal />
            <nav className="navbar">
                <Link to="/" className="nav-link">首頁</Link>
                <Link to="/cart" className="nav-link">購物車</Link>
                {isLoggedIn ? (
                    <Link to="/logout" className="nav-link">登出</Link>
                ) : (
                    <button className="nav-link" onClick={openLoginModal} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', fontFamily: 'inherit', fontWeight: 'bold' }}>
                        登入
                    </button>
                )}
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
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