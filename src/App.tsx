import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Logout from './pages/Logout/Logout';
import ProtectedRoute from './components/ProtectedRoute';
import LoginModal from './components/LoginModal/LoginModal';
import Navbar from './components/Navbar/Navbar';
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <LoginModal />
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
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;