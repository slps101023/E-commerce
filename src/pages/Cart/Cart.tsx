import './Cart.css';
import { useCartState } from '../../store/cartStore';

const CartPage = () => {
  const { items, updateQuantity, removeItem } = useCartState();

  if (items.length === 0) {
    return (
      <div className="page-container">
        <div className="cart-container" style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2>購物車是空的</h2>
          <p>請先將商品加入購物車</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>購物車 ({items.length})</h2>

      <div className="cart-list">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            {/* 左側：勾選框與圖片 */}
            <div className="item-left">
              <input type="checkbox" defaultChecked className="cart-checkbox" />
              <div className="item-img-box">
                <img src={item.image} alt={item.name} />
              </div>
            </div>

            {/* 中間：名稱與價格 */}
            <div className="item-info">
              <h4 className="item-name">{item.name}</h4>
              <p className="item-price">${item.price.toLocaleString()}</p>
              <div className="item-tag">內含商品 {item.name}</div>
            </div>

            {/* 右側：數量控制與動作 */}
            <div className="item-right">
              <div className="quantity-control">
                <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                <input type="text" value={item.quantity} readOnly />
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>
              <div className="item-actions">
                <span>♡ 追蹤</span>
                <span className="delete-btn" onClick={() => removeItem(item.id)}>🗑 刪除</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;