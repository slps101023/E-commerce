import { useAuthStore, } from '../../store/authStore';
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from 'axios';

// 註冊表單的驗證規則
const registerSchema = z.object({
  username: z.string().min(2, "使用者名稱至少需要 2 個字元").max(100, "使用者名稱不能超過 100 個字元"),
  email: z.email({ message: "請輸入有效的電子郵件地址" }),
  phone: z.string().regex(/^09\d{8}$/, { message: "請輸入有效的手機號碼" }),
  password: z.string().min(6, "密碼至少需要 6 個字元").max(100, "密碼不能超過 100 個字元"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "密碼與確認密碼不一致",
  path: ["confirmPassword"]
});

type RegisterFormValues = z.infer<typeof registerSchema>;


interface RegisterModalProps {
  onSwitch: () => void;  // 切換到登入的函式
}

const RegisterModal = ({ onSwitch }: RegisterModalProps) => {
  // 從 authStore 中獲取關閉模態和登入的函式
  const closeModal = useAuthStore((state) => state.closeModal);
  const login = useAuthStore((state) => state.login);

  // 使用 react-hook-form 來管理表單狀態和驗證
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormValues>({ // 1. 直接用 Zod 推導出來的型別
    resolver: zodResolver(registerSchema), // 2. 這是最關鍵的一行！將驗證邏輯接進去
  });

  // 3. 提交的資料類型也會自動對齊 schema
  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      // 註冊成功後的操作
      login();
      // 同時建議使用你封裝好的 api 實例，而不是原始的 axios
      await axios.post('http://localhost:3000/api/register', {
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: data.password // 密碼在後端加密，這裡傳明文
      });
    } catch (error) {
      console.error("註冊請求失敗：", error);
    }
  };

  return (
    <div className='modal-content' onClick={(e) => e.stopPropagation()}>
      <button onClick={closeModal} className='modal-close-btn'>
        &times;
      </button>
      <div className='modal-header'>
        <h2 className='modal-title'>加入會員</h2>
        <p className='modal-subtitle'>註冊新帳號以開始您的購物之旅</p>
      </div>

      <form className='modal-form' onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label>使用者名稱</label>
          <input className='modal-input' {...register("username")} placeholder='請輸入使用者名稱' />
          {/* 顯示 Zod 定義的錯誤訊息 */}
          {errors.username && <p className="error-message">{errors.username.message}</p>}
        </div>

        <div className="input-group">
          <label>電子郵件</label>
          <input className='modal-input' {...register("email")} placeholder='example@mail.com' />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        <div className="input-group">
          <label>手機號碼</label>
          <input className='modal-input' {...register("phone")} placeholder='請輸入手機號碼' />
          {errors.phone && <p className="error-message">{errors.phone.message}</p>}
        </div>

        <div className="input-group">
          <label>設定密碼</label>
          <input className='modal-input' {...register("password")} type="password" placeholder='請設定密碼' />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>

        <div className="input-group">
          <label>確認密碼</label>
          <input className='modal-input' {...register("confirmPassword")} type="password" placeholder='請再次輸入密碼' />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
        </div>

        {/* 將註冊按鈕移入 form 內，類型設為 submit */}
        <button type="submit" className="modal-submit-btn">
          立即註冊
        </button>
      </form>

      <div className="modal-footer">
        已經有帳號了？
        <span className="signup-link" onClick={onSwitch}>
          立即登入
        </span>
      </div>
    </div>
  );
}

export default RegisterModal;