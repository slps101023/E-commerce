import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import './AuthModal.css';

const AuthModal = () => {
    const isModalOpen = useAuthStore((state) => state.isModalOpen);

    const [mode, setMode] = useState<"login" | "register">("login");

    // 每次打開模態都重置為登入模式，確保使用者體驗一致
    useEffect(() => {
        setMode("login");
    }, [isModalOpen]);

    if (!isModalOpen) return null;

    return (
        /* 點擊遮罩處即可關閉 */
        <div className='modal-overlay'>
            {mode === 'login' ? (
                <LoginModal onSwitch={() => setMode('register')} />
            ) : (
                <RegisterModal onSwitch={() => setMode('login')} />
            )}
        </div>
    );
}

export default AuthModal;