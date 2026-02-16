import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

/**
 * Render a product card with image, name, price, and actions to view details or add the product to the cart.
 * @param {{id: string|number, name: string, price: number, image: string}} product - Product data to display: `id` is the product identifier, `name` is the display name, `price` is the numeric price, and `image` is the image URL.
 * @returns {JSX.Element} The product card element containing product details, a "View Details" link, and an "Add to Cart" button (which shows the current quantity when present in the cart).
 */
export default function ProductCard({product}) {

    const {addToCart,cartItems} = useCart()
    const productInCart = cartItems.find((item)=>item.id === product.id)
    const productQuantityLabel = productInCart ? `(${productInCart.quantity})` : ""

    return (
        <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-card-image"/>
            <div className="product-card-content">
                <h3 className="product-card-name">{product.name}</h3>
                <p className="product-card-price">${product.price}</p>
            </div>
            <div className="product-card-actions">
                <Link className="btn btn-secondary" to={`/products/${product.id}`}>View Details</Link>
                <button 
                className="btn btn-primary" 
                onClick={()=>addToCart(product.id)}
                >
                    Add to Cart {productQuantityLabel}
                </button>
            </div>
        </div>

    )
}