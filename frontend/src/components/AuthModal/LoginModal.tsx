import { useAuthStore } from "../../store/authStore";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from 'axios';

// 設定axios的預設配置，允許攜帶cookie
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 登入表單的驗證規則
const loginSchema = z.object({
  account: z.string().refine((val) => {
    const isEmail = z.email().safeParse(val).success;
    const isPhone = /^09\d{8}$/.test(val);
    return isEmail || isPhone;
  }, {
    message: "請輸入有效的電子郵件或手機號碼"
  }), 
  password: z.string()
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginModalProps {
  onSwitch: () => void;  // 切換到登入的函式
}

const LoginModal = ({ onSwitch }: LoginModalProps) => {
  const closeModal = useAuthStore((state) => state.closeModal);
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      await axios.post('http://localhost:3000/api/login', {
        account: data.account,
        password: data.password
      });
      login();
    } catch (error) {
      console.error("登入失敗:", error);
      setError("account", { message: "帳號或密碼輸入錯誤" });
      setValue("account", ""); // 清空帳號欄位
      setValue("password", ""); // 清空密碼欄位
    }
  };

  return (
    <div className='modal-content' onClick={(e) => e.stopPropagation()}>
      <button onClick={closeModal} className='modal-close-btn'>
        &times;
      </button>
      <div className='modal-header'>
        <h2 className='modal-title'>歡迎回來</h2>
        <p className='modal-subtitle'>請登入您的帳戶以繼續購物</p>
      </div>
      {/* todo: 登入表單(hook form) */}
      <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label>帳號 / 手機</label>
          <input className="modal-input" {...register("account")} type="text" placeholder="請輸入帳號" />
          {errors.account && <p className="error-message">{errors.account.message}</p>}
        </div>
        <div className="input-group">
          <label>密碼</label>
          <input className="modal-input" {...register("password")} type="password" placeholder="請輸入密碼" />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
          <div className="forgot-password">忘記密碼？</div>
        </div>
        <button className="modal-submit-btn" type="submit">
          立即登入
        </button>
      </form>
      <div className="modal-footer">
        還沒有帳號？
        <span className="signup-link" onClick={onSwitch}>
          立即註冊
        </span>
      </div>
    </div>
  );
};

export default LoginModal;