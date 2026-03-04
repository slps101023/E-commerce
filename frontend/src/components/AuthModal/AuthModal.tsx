import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import LoginModal from "./LoginModal/LoginModal";
import RegisterModal from "./RegisterModal/RegisterModal";
import './AuthModal.css';

const AuthModal = () => {
    const isModalOpen = useAuthStore((state) => state.isModalOpen);
    const closeModal = useAuthStore((state) => state.closeModal);

    const [mode, setMode] = useState<"login" | "register">("login");
    if (!isModalOpen) return null;

    return (
        /* 點擊遮罩處即可關閉 */
        <div className='modal-overlay' onClick={closeModal}>
            {mode === 'login' ? (
                <LoginModal onSwitch={() => setMode('register')} />
            ) : (
                <RegisterModal onSwitch={() => setMode('login')} />
            )}
        </div>
    );
}

export default AuthModal;