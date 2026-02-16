import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

/**
 * Render the application's navigation bar with brand, primary links, and authentication controls.
 *
 * The component displays a brand link to the root, navigation links for Home and Cart, and an
 * authentication area that shows Login/Signup links when no user is present or a greeting with a
 * Logout button when a user is signed in.
 *
 * @returns {JSX.Element} The navbar element.
 */
export default function Navbar() {

    const {user, logout} = useAuth();

    return <nav className="navbar">
        <div className="navbar-container">
            <Link to="/" className="navbar-brand">
                ShopHub
            </Link>
            <div className="navbar-links">
                <Link to="/" className="navbar-link">Home</Link>
                <Link to="/checkout" className="navbar-link">Cart</Link>
            </div>
            <div className="navbar-auth">
                {!user ? <div className="navbar-auth-links">
                    <Link to="/auth" className="btn btn-secondary">Login</Link>
                    <Link to="/auth" className="btn btn-primary">Signup</Link>
                </div> :(
                    <div className="navbar-user">
                        <span className="navbar-greeting">Hello, {user.email}</span>
                        <button className="btn btn-secondary" onClick={logout}>Logout</button>
                    </div>
                )}

            </div>
        </div>

    </nav>
}