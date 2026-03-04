import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Logout from './pages/Logout/Logout';
import Profile from './pages/Profile/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import AuthModal from './components/AuthModal/AuthModal';
import Navbar from './components/Navbar/Navbar';
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <AuthModal />
            <Navbar />
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
                {/* 定義 id 為動態變數 */}
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>}
                />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;