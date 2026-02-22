import { Link } from 'react-router-dom';

const Cart = () => {
  return (
    <div className="page-container">
      <h2>🛒 我的購物車</h2>
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <p>目前購物車是空的，快去選購吧！</p>
      </div>
      <Link to="/">
        <button className="btn">繼續購物</button>
      </Link>
    </div>
  );
};

export default Cart;