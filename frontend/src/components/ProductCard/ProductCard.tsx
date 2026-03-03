import './ProductCard.css';
import { useCartState } from '../../store/cartStore';

const ProductCard = (props) => {
    // 格式化價格，增加千分位符號
    const formattedPrice = new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD',
        minimumFractionDigits: 0
    }).format(props.price);

    // 呼叫 cartStore 的 addItem 方法，將商品加入購物車
    const { addItem } = useCartState(); 
    
    const handleAddClick = () => {
        const productToAdd = {
            id: props.product_id,       // 👈 記得傳入唯一的 ID
            name: props.product_name,
            price: props.price,
            image: props.image_url,
            quantity: props.stock_quantity         // 初始數量
        };
        addItem(productToAdd);  // 👈 正確傳送商品資料給大腦
    };

    return (
        <div className="product-card">
            <div className="image-container">
                <img src={props.image} alt={props.name} loading="lazy" />
                <span className="category-badge">{props.category}</span>
            </div>
            
            <div className="product-info">
                <h3 className="product-name">{props.name}</h3>
                <p className="product-price">{formattedPrice}</p>
                <button className="add-to-cart-btn" onClick={handleAddClick}>
                    加入購物車
                </button>
            </div>
        </div>
    );
};

export default ProductCard;