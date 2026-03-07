import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.css';
import axios from 'axios';
// import { Product } from '../../api/axios';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        // 手動對應欄位名稱
        const formattedData = response.data.map((item: any) => ({
          product_id: item.productid,
          product_name: item.productname,
          category: item.category,
          price: item.price,
          stock_quantity: item.stockquantity,
          image_url: item.imageurl
        }));

        setProducts(formattedData);
      } catch (error) {
        console.error("哎呀！商品搬運失敗:", error);
      }
    };

    fetchProducts();
  }, []);



  return (
    <div className="page-container">
      {/* 假裝這是從後端抓來的商品 */}
      <div className="product-grid product-list-container">
        {products.map((product) => (
          console.log(product),
          <Link to={`/product/${product.product_id}`} key={product.product_id} className="product-link">
            <ProductCard
              id={product.product_id}
              name={product.product_name}
              category={product.category}
              price={product.price}
              stock_quantity={product.stock_quantity}
              image={product.image_url}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;