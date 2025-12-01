import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const location = useLocation();

    const {
        user,
        logout,
        isAuthenticated,
        getUserFullName,
        getUserInitials,
        isAdmin,
        isAgent
    } = useAuth();

    const logoUrl = "https://img.icons8.com/color/96/home--v1.png";

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLinkClick = () => {
        setMenuOpen(false);
        setShowDropdown(false);
    };

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        setShowDropdown(false);
    };

    // GET DASHBOARD PATH BASED ON ROLE
    const getDashboardPath = () => {
        if (isAdmin()) return "/admin/dashboard";
        if (isAgent()) return "/agent/dashboard";
        return "/dashboard";
    };

    const getDashboardName = () => {
        if (isAdmin()) return "Admin Dashboard";
        if (isAgent()) return "Agent Dashboard";
        return "Dashboard";
    };

    const isActiveLink = (path) => location.pathname === path;

    return (
        <>
            <nav className={`dp-navbar ${scrolled ? "dp-navbar--scrolled" : ""}`}>

                {/* LOGO */}
                <Link to="/" className="dp-logo" onClick={handleLinkClick}>
                    <img src={logoUrl} alt="DreamPro Logo" className="dp-logo-img" />
                    <span className="dp-logo-text">DreamPro</span>
                </Link>

                {/* DESKTOP MENU */}
                <div className="dp-menu-desktop">

                    {/* Main Nav Links */}
                    <div className="dp-nav-links">
                        <Link
                            to="/"
                            className={`dp-nav-link ${isActiveLink("/") ? "dp-nav-link--active" : ""}`}
                            onClick={handleLinkClick}
                        >
                            Home
                        </Link>

                        <Link
                            to="/properties"
                            className={`dp-nav-link ${isActiveLink("/properties") ? "dp-nav-link--active" : ""}`}
                            onClick={handleLinkClick}
                        >
                            Properties
                        </Link>

                        {/* DESKTOP INTERIOR WORK LINK */}
                        <Link
                            to="/interior"
                            className={`dp-nav-link ${isActiveLink("/interior") ? "dp-nav-link--active" : ""}`}
                            onClick={handleLinkClick}
                        >
                            🛠️ Interior Design
                        </Link>

                        <Link
                            to="/Bookvisitt"
                            className={`dp-nav-link dp-nav-link--featured ${isActiveLink("/Bookvisitt") ? "dp-nav-link--active" : ""}`}
                            onClick={handleLinkClick}
                        >
                            📅 Book Visit
                        </Link>

                        <Link
                            to="/Blogg"
                            className={`dp-nav-link ${isActiveLink("/blog") ? "dp-nav-link--active" : ""}`}
                            onClick={handleLinkClick}
                        >
                            Blog
                        </Link>

                        <Link
                            to="/contact"
                            className={`dp-nav-link ${isActiveLink("/contact") ? "dp-nav-link--active" : ""}`}
                            onClick={handleLinkClick}
                        >
                            Contact
                        </Link>

                        {/* === MY ACCOUNT LINK (Desktop) - ADDED === */}
                        {isAuthenticated() && (
                            <Link
                                to="/my-account"
                                className={`dp-nav-link dp-nav-link--account ${isActiveLink("/my-account") ? "dp-nav-link--active" : ""}`}
                                onClick={handleLinkClick}
                            >
                                👤 My Account
                            </Link>
                        )}

                        {/* === DASHBOARD LINK (Desktop) === */}
                        {isAuthenticated() && (
                            <Link
                                to={getDashboardPath()}
                                className={`dp-nav-link dp-nav-link--dashboard ${isActiveLink(getDashboardPath()) ? "dp-nav-link--active" : ""}`}
                                onClick={handleLinkClick}
                            >
                                📊 {getDashboardName()}
                            </Link>
                        )}
                    </div>

                    {/* RIGHT SIDE USER MENU */}
                    <div className="dp-nav-actions">

                        {!isAuthenticated() ? (
                            <>
                                <Link
                                    to="/login"
                                    className={`dp-nav-link dp-nav-link--auth ${isActiveLink("/login") ? "dp-nav-link--active" : ""}`}
                                    onClick={handleLinkClick}
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/signup"
                                    className={`dp-nav-link dp-nav-link--auth ${isActiveLink("/signup") ? "dp-nav-link--active" : ""}`}
                                    onClick={handleLinkClick}
                                >
                                    Signup
                                </Link>
                            </>
                        ) : (
                            <div className="user-menu">

                                {/* User Button */}
                                <button
                                    className="user-menu-toggle"
                                    onClick={() => setShowDropdown(!showDropdown)}
                                >
                                    <div className="user-avatar">{getUserInitials()}</div>
                                    <span className="user-name">Hi, {getUserFullName()}</span>
                                    <span className="dropdown-arrow">▼</span>
                                </button>

                                {/* DROPDOWN - UPDATED WITH SHOW CLASS */}
                                <div className={`user-dropdown ${showDropdown ? "show" : ""}`}>
                                    {/* User Info */}
                                    <div className="dropdown-user-info">
                                        <div className="dropdown-avatar">{getUserInitials()}</div>
                                        <div className="dropdown-user-details">
                                            <div className="dropdown-user-name">{getUserFullName()}</div>
                                            <div className="dropdown-user-email">{user?.email}</div>
                                            <div className="dropdown-user-role">{user?.role}</div>
                                        </div>
                                    </div>

                                    <div className="dropdown-divider"></div>

                                    {/* Quick Dashboard Access */}
                                    <Link
                                        to={getDashboardPath()}
                                        className="dropdown-item dropdown-item--dashboard"
                                        onClick={handleLinkClick}
                                    >
                                        📊 {getDashboardName()}
                                    </Link>

                                    {/* MY ACCOUNT LINK IN DROPDOWN - ADDED */}
                                    <Link 
                                        to="/my-account" 
                                        className="dropdown-item dropdown-item--account" 
                                        onClick={handleLinkClick}
                                    >
                                        👤 My Account
                                    </Link>

                                    <Link to="/profile" className="dropdown-item" onClick={handleLinkClick}>👤 My Profile</Link>
                                    <Link to="/my-properties" className="dropdown-item" onClick={handleLinkClick}>🏠 My Properties</Link>
                                    <Link to="/saved" className="dropdown-item" onClick={handleLinkClick}>💖 Saved Properties</Link>

                                    {/* Role-specific links */}
                                    {isAdmin() && (
                                        <Link to="/admin" className="dropdown-item dropdown-item--admin" onClick={handleLinkClick}>
                                            👑 Admin Panel
                                        </Link>
                                    )}

                                    {isAgent() && (
                                        <Link to="/agent/dashboard" className="dropdown-item dropdown-item--agent" onClick={handleLinkClick}>
                                            📈 Agent Dashboard
                                        </Link>
                                    )}

                                    <div className="dropdown-divider"></div>

                                    {/* Logout */}
                                    <button className="dropdown-item logout-btn" onClick={handleLogout}>
                                        🚪 Logout
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* MOBILE MENU BUTTON - UPDATED WITH MENU-OPEN CLASS */}
                <button
                    className={`dp-menu-icon ${menuOpen ? "menu-open" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className="menu-icon-bar"></span>
                    <span className="menu-icon-bar"></span>
                    <span className="menu-icon-bar"></span>
                </button>
            </nav>

            {/* MOBILE MENU */}
            <div className={`dp-mobile-menu ${menuOpen ? "dp-mobile-menu--open" : ""}`}>

                {/* Mobile Nav Items */}
                <Link to="/" className="dp-nav-link dp-nav-link--mobile" onClick={handleLinkClick}>Home</Link>
                <Link to="/properties" className="dp-nav-link dp-nav-link--mobile" onClick={handleLinkClick}>Properties</Link>

                {/* INTERIOR DESIGN LINK - ADDED TO MOBILE MENU */}
                <Link 
                    to="/interior" 
                    className="dp-nav-link dp-nav-link--mobile" 
                    onClick={handleLinkClick}
                >
                    🛠️ Interior Design
                </Link>

                <Link to="/Bookvisitt" className="dp-nav-link dp-nav-link--mobile dp-nav-link--featured" onClick={handleLinkClick}>
                    📅 Book Visit
                </Link>

                <Link to="/Blogg" className="dp-nav-link dp-nav-link--mobile" onClick={handleLinkClick}>Blog</Link>
                <Link to="/contact" className="dp-nav-link dp-nav-link--mobile" onClick={handleLinkClick}>Contact</Link>

                {/* === MY ACCOUNT LINK (Mobile) - ADDED === */}
                {isAuthenticated() && (
                    <Link
                        to="/my-account"
                        className="dp-nav-link dp-nav-link--mobile dp-nav-link--account"
                        onClick={handleLinkClick}
                    >
                        👤 My Account
                    </Link>
                )}

                {/* === Dashboard Mobile === */}
                {isAuthenticated() && (
                    <Link
                        to={getDashboardPath()}
                        className="dp-nav-link dp-nav-link--mobile dp-nav-link--dashboard"
                        onClick={handleLinkClick}
                    >
                        📊 {getDashboardName()}
                    </Link>
                )}

                {/* MOBILE AUTH AREA */}
                {!isAuthenticated() ? (
                    <>
                        <Link to="/login" className="dp-nav-link dp-nav-link--mobile" onClick={handleLinkClick}>Login</Link>
                        <Link to="/signup" className="dp-nav-link dp-nav-link--mobile" onClick={handleLinkClick}>Signup</Link>
                    </>
                ) : (
                    <>
                        <div className="mobile-user-info">
                            <div className="user-avatar">{getUserInitials()}</div>
                            <div className="user-details">
                                <div className="user-name">{getUserFullName()}</div>
                                <div className="user-email">{user?.email}</div>
                                <div className="user-role">{user?.role}</div>
                            </div>
                        </div>

                        {/* MY ACCOUNT LINK IN MOBILE MENU - ADDED */}
                        <Link 
                            to="/my-account" 
                            className="mobile-user-link mobile-user-link--account" 
                            onClick={handleLinkClick}
                        >
                            👤 My Account
                        </Link>

                        <Link to="/profile" className="mobile-user-link" onClick={handleLinkClick}>👤 My Profile</Link>
                        <Link to="/my-properties" className="mobile-user-link" onClick={handleLinkClick}>🏠 My Properties</Link>
                        <Link to="/saved" className="mobile-user-link" onClick={handleLinkClick}>💖 Saved Properties</Link>

                        {/* Role-specific mobile links */}
                        {isAdmin() && (
                            <Link to="/admin" className="mobile-user-link mobile-user-link--admin" onClick={handleLinkClick}>
                                👑 Admin Panel
                            </Link>
                        )}

                        {isAgent() && (
                            <Link to="/agent/dashboard" className="mobile-user-link mobile-user-link--agent" onClick={handleLinkClick}>
                                📈 Agent Dashboard
                            </Link>
                        )}

                        <button className="mobile-user-link logout-btn" onClick={handleLogout}>
                            🚪 Logout
                        </button>
                    </>
                )}
            </div>

            {/* Overlay */}
            {showDropdown && <div className="dropdown-overlay" onClick={() => setShowDropdown(false)} />}
        </>
    );
};

export default Navbar;