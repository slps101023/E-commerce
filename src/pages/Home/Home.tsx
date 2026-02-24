import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.css';



const Home = () => {
  return (
    <div className="page-container">
      {/* 假裝這是從後端抓來的商品 */}
      <div className="product-grid product-list-container">
        <ProductCard
          id={1}
          image="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400"
          name="MacBook Air M2"
          price={32900}
          category="電子產品"
        />
        <ProductCard
          id={2}
          image="https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400"
          name="Dyson Vacuum"
          price={22000}
          category="居家生活"
        />
      </div>
    </div>
  );
};

export default Home;