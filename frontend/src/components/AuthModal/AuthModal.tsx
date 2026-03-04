import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import LoginModal from "./LoginModal/LoginModal";
import RegisterModal from "./RegisterModal/RegisterModal";
import './AuthModal.css';

const AuthModal = () => {
    const isModalOpen = useAuthStore((state) => state.isModalOpen);
    const closeModal = useAuthStore((state) => state.closeModal);
    const login = useAuthStore((state) => state.login);

    // const [mode, setMode] = useState<"login" | "register" | null>(null);

    // const goToRegister = () => setMode('register');
    // const goToLogin = () => setMode('login');
    if (!isModalOpen) return null;

    return (
        /* 點擊遮罩處即可關閉 */
        <div className='modal-overlay' onClick={closeModal}>
            {/* 點擊內容區時防止事件冒泡（避免關閉） */}
                {/* 根據 mode 狀態決定顯示登入或註冊表單 */}
                {/* {mode === 'login' && <LoginModal  />} */}
                {/* {mode === 'register' && <RegisterModal />} */}
                <LoginModal />
        </div>
    );
}

export default AuthModal;