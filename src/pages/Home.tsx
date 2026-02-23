import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="page-container">
      <h2>🏠 商品列表</h2>
      
      {/* 假裝這是從後端抓來的商品 */}
      <div className="product-grid">
        <div className="card">
          <h3>機械鍵盤</h3>
          <p>$ 3,000</p>
          <button className="btn">加入購物車</button>
        </div>
        <div className="card">
          <h3>人體工學椅</h3>
          <p>$ 8,000</p>
          <button className="btn">加入購物車</button>
        </div>
      </div>
    </div>
  );
};

export default Home;