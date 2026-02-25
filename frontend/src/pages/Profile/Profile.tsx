import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  // 模擬一些使用者數據
  const stats = [
    { label: '待付款', count: 0, icon: '💳' },
    { label: '待出貨', count: 2, icon: '📦' },
    { label: '待收貨', count: 5, icon: '🚚' },
    { label: '評價', count: 12, icon: '⭐' },
  ];

  return (
    <div className="profile-container">
      {/* 左側側邊欄 */}
      <aside className="profile-sidebar">
        <div className="user-info-card">
          <div className="avatar">👤</div>
          <h3>{user?.name || '親愛的會員'}</h3>
          <p className="user-level">💎 黃金會員</p>
        </div>
        <nav className="sidebar-nav">
          <button className="active">個人帳戶</button>
          <button>我的訂單</button>
          <button>我的追蹤</button>
          <button>收件地址</button>
          <button onClick={logout} className="logout-btn-sidebar">安全登出</button>
        </nav>
      </aside>

      {/* 右側主要內容 */}
      <main className="profile-content">
        <section className="order-stats-section">
          <h2>我的訂單</h2>
          <div className="stats-grid">
            {stats.map((s) => (
              <div key={s.label} className="stat-item">
                <span className="stat-icon">{s.icon}</span>
                <span className="stat-count">{s.count}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="account-details-section">
          <div className="section-header">
            <h2>個人資料</h2>
            <button className="edit-btn">編輯</button>
          </div>
          <div className="details-card">
            <div className="detail-row">
              <label>電子郵件</label>
              <span>{user?.email || 'user@example.com'}</span>
            </div>
            <div className="detail-row">
              <label>手機號碼</label>
              <span>0912-***-456</span>
            </div>
            <div className="detail-row">
              <label>註冊日期</label>
              <span>2024-01-15</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;