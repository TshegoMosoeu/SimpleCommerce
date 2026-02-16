import { createContext, useContext, useState } from "react";
import { getProductById } from "../data/products";

const CartContext = createContext(null);

/**
 * Provides a CartContext to descendants, managing cart state and exposing cart operations.
 * @param {Object} props
 * @param {import('react').ReactNode} props.children - React children to render within the provider.
 * @returns {import('react').JSX.Element} The CartContext provider element supplying cartItems and actions (addToCart, getCartItemsWithProducts, removeFromCart, updateQuantity, getCartTotal, clearCart) to descendant components.
 */
export default function CartProvider({children}) {
    const [cartItems, setCartItems] = useState([]); //{id:2, quantity:7}
    
    function addToCart(productID) {

        const existing = cartItems.find((item)=> item.id ===productID)

        if (existing) {
            const currentQuantity= existing.quantity
            const updatedCartItems = cartItems.map((item) => item.id===productID? {id:productID, quantity:currentQuantity+1} 
            :item);
            setCartItems(updatedCartItems)

        } else {
            setCartItems([...cartItems, {id:productID, quantity:1}])

        }
        

    }


    function getCartItemsWithProducts() {
        return cartItems.map(item => ({
            ...item,
            product: getProductById(item.id)
        })).filter(item => item.product)
    }


    function removeFromCart(productId) {
        setCartItems(cartItems.filter(item => item.id !== productId))

    }
    function updateQuantity(productId, quantity) {

        if (quantity <=0) {
            removeFromCart(productId)
            return
        }
        setCartItems(
            cartItems.map((item)=>
            item.id===productId ? { ...item, quantity}: item)
        );
    }

    function getCartTotal() {
        const total = cartItems.reduce((total, item)=> {
            const product = getProductById(item.id)
            return total + (product ? product.price*item.quantity : 0)
        }
            ,0)
        return total
    }

    function clearCart() {
        setCartItems([])
    }

    return (
    <CartContext.Provider value={{
        cartItems,
        addToCart, 
        getCartItemsWithProducts, 
        removeFromCart, 
        updateQuantity, 
        getCartTotal,
        clearCart
    }}>{children}</CartContext.Provider>
)

}

/**
 * Accesses the cart context value for the calling React component.
 * @returns {object|null} The current CartContext value containing cartItems and cart actions (addToCart, getCartItemsWithProducts, removeFromCart, updateQuantity, getCartTotal, clearCart), or `null` if no CartProvider is present. 
 */
export function useCart() {
    const context = useContext(CartContext);
    return context;
}