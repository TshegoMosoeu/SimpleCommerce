import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { getProductById } from "../data/products";
import { useCart } from "../context/CartContext";

/**
 * Render a product details page for the product identified by the route `id` and allow adding it to the cart.
 *
 * Retrieves the product by id, navigates to "/" if not found, and displays image, name, price, description, and an "Add to Cart" button that shows the current quantity in the cart when present.
 *
 * @returns {JSX.Element} The rendered product detail page.
 */
export default function ProductDetails() {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    const {addToCart,cartItems} = useCart()
    
    

    useEffect(()=> {
        const foundProduct =  getProductById(id);
        
        if(!foundProduct) {
            navigate("/");
            return;
        }

        setProduct(foundProduct);
        console.log(foundProduct)
        console.log(product)

    },[id,navigate]);

    if (!product) return <p>Loading...</p>;

    const productInCart = cartItems.find((item)=>item.id === product.id)
    const productQuantityLabel = productInCart ? `(${productInCart.quantity})` : ""



    return <div className="page">
        <div className="container">
            <div className="product-detail">
                <div className="product-detail-image">
                    <img src={product.image} alt={product.name}/>
                </div>
                <div className="product-detail-content">
                    <h1 className="product-detail-name">{product.name}</h1>
                    <p className="product-detail-price">${product.price}</p>
                    <p className="product-detail-description">{product.description}</p>
                    <button className="btn btn-primary" onClick={()=>addToCart(product.id)}>Add to Cart {productQuantityLabel}</button>
                </div>
            </div>
        </div>
    </div>
}