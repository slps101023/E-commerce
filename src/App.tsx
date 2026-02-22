import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Logout from './pages/Logout';

function App() {
    
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    return (
        <BrowserRouter>
            <nav className="navbar">
                <Link to="/" className="nav-link">首頁</Link>
                <Link to="/cart" className="nav-link">購物車</Link>
                {isLoggedIn ? (
                    <Link to="/logout" className="nav-link">登出</Link> 
                ) : (
                    <Link to="/login" className="nav-link">登入</Link>
                )}
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;