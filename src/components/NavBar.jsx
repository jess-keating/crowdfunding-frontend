import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import "./NavBar.css";

function NavBar() {
    const { auth, setAuth } = useAuth();

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
        setAuth({ token: null, user: null });
    };

    return (
        <>
            <nav>
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/about">About Us</Link>
                    {auth.token ? (
                        <>
                            <Link to="/create-fundraiser">New Fundraiser</Link>
                            <Link to="/contact">Contact Us</Link>
                            <Link to="/" onClick={handleLogout}>
                                Log Out
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                        </>
                    )}
                </div>
                
                {auth.user && (
                    <div className="user-indicator">
                        Logged in as: <strong>{auth.user.username}</strong>
                    </div>
                )}
            </nav>
            <Outlet />
        </>
    );
}

export default NavBar;