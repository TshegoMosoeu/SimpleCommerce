import ProductCard from "../components/ProductCard";
import { getProducts} from "../data/products"
import { Link} from "react-router-dom"

/**
 * Render the Home page with a hero section and a grid of product cards.
 *
 * Renders a hero banner and a "Our Products" section containing a ProductCard for each available product.
 * @returns {JSX.Element} The Home page element containing the hero and the populated product grid.
 */
export default function Home() {
    const products = getProducts();

    return (
    <div className="page">
        <div className="home-hero">
            <h1 className="home-title">Welcome to ShopHub</h1>
            <p className="home-subtitle">Discover amazing products at great prices</p>
        </div>
        <div className="container">
            <h2 className="page-title">Our Products</h2>
            <div className="product-grid">
                {products.map((product)=> (
                    <ProductCard product={product} key={product.id}/>

                ))}
            </div>

        </div>
    </div>
);
}