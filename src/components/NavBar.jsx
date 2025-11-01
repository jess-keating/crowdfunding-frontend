import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";

function NavBar() {
    const {auth, setAuth} = useAuth();

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
        setAuth({ token: null, user: null });
    };

    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About Us</Link>
                
                {auth.token && <Link to="/create-fundraiser">New Fundraiser</Link>}
                <Link to="/contact">Contact Us</Link>
                {auth.token ? (
                    <Link to="/" onClick={handleLogout}>
                        Log Out
                    </Link>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </nav>
            <Outlet />
        </div>
    );
}

export default NavBar;