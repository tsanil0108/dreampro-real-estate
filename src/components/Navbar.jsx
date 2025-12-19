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
                            className={`dp-nav-link dp-nav-link--regular ${isActiveLink("/") ? "dp-nav-link--active" : ""}`}
                            onClick={handleLinkClick}
                        >
                            Home
                        </Link>

                        <Link
                            to="/properties"
                            className={`dp-nav-link dp-nav-link--regular ${isActiveLink("/properties") ? "dp-nav-link--active" : ""}`}
                            onClick={handleLinkClick}
                        >
                            Properties
                        </Link>

                        {/* DESKTOP INTERIOR WORK LINK */}
                        <Link
                            to="/interior"
                            className={`dp-nav-link dp-nav-link--interior ${isActiveLink("/interior") ? "dp-nav-link--active" : ""}`}
                            onClick={handleLinkClick}
                        >
                             Interior Design
                        </Link>

                        <Link
                            to="/Bookvisitt"
                            className={`dp-nav-link dp-nav-link--featured ${isActiveLink("/Bookvisitt") ? "dp-nav-link--active" : ""}`}
                            onClick={handleLinkClick}
                        >
                             Book Visit
                        </Link>

                        <Link
                            to="/Blogg"
                            className={`dp-nav-link dp-nav-link--regular ${isActiveLink("/blog") ? "dp-nav-link--active" : ""}`}
                            onClick={handleLinkClick}
                        >
                            Blog
                        </Link>

                        <Link
                            to="/contact"
                            className={`dp-nav-link dp-nav-link--regular ${isActiveLink("/contact") ? "dp-nav-link--active" : ""}`}
                            onClick={handleLinkClick}
                        >
                            Contact
                        </Link>


                           <Link
                                    to="/About"
                                    className={`dp-nav-link dp-nav-link--auth dp-nav-link--login ${isActiveLink("/login") ? "dp-nav-link--active" : ""}`}
                                    onClick={handleLinkClick}
                                >
    
                                    About
                                </Link>

                        {/* === MY ACCOUNT LINK (Desktop) === */}
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
                               
                               

                              
                              
                            </>
                        ) : (
                            <div className="dp-user-menu">

                                {/* User Button */}
                                <button
                                    className="dp-user-menu-toggle"
                                    onClick={() => setShowDropdown(!showDropdown)}
                                >
                                    <div className="dp-user-avatar">{getUserInitials()}</div>
                                    <span className="dp-user-name">Hi, {getUserFullName()}</span>
                                    <span className="dp-dropdown-arrow">▼</span>
                                </button>

                                {/* DROPDOWN */}
                                <div className={`dp-user-dropdown ${showDropdown ? "show" : ""}`}>
                                    {/* User Info */}
                                    <div className="dp-dropdown-user-info">
                                        <div className="dp-dropdown-avatar">{getUserInitials()}</div>
                                        <div className="dp-dropdown-user-details">
                                            <div className="dp-dropdown-user-name">{getUserFullName()}</div>
                                            <div className="dp-dropdown-user-email">{user?.email}</div>
                                            <div className="dp-dropdown-user-role">{user?.role}</div>
                                        </div>
                                    </div>

                                    <div className="dp-dropdown-divider"></div>

                                    {/* Quick Dashboard Access */}
                                    <Link
                                        to={getDashboardPath()}
                                        className="dp-dropdown-item dp-dropdown-item--dashboard"
                                        onClick={handleLinkClick}
                                    >
                                        📊 {getDashboardName()}
                                    </Link>

                                    {/* MY ACCOUNT LINK IN DROPDOWN */}
                                    <Link 
                                        to="/my-account" 
                                        className="dp-dropdown-item dp-dropdown-item--account" 
                                        onClick={handleLinkClick}
                                    >
                                        👤 My Account
                                    </Link>

                                    <Link to="/profile" className="dp-dropdown-item" onClick={handleLinkClick}>👤 My Profile</Link>
                                    <Link to="/my-properties" className="dp-dropdown-item" onClick={handleLinkClick}>🏠 My Properties</Link>
                                    <Link to="/saved" className="dp-dropdown-item" onClick={handleLinkClick}>💖 Saved Properties</Link>

                                    {/* Role-specific links */}
                                    {isAdmin() && (
                                        <Link to="/admin" className="dp-dropdown-item dp-dropdown-item--admin" onClick={handleLinkClick}>
                                            👑 Admin Panel
                                        </Link>
                                    )}

                                    {isAgent() && (
                                        <Link to="/agent/dashboard" className="dp-dropdown-item dp-dropdown-item--agent" onClick={handleLinkClick}>
                                            📈 Agent Dashboard
                                        </Link>
                                    )}

                                    <div className="dp-dropdown-divider"></div>

                                    {/* Logout */}
                                    <button className="dp-dropdown-item dp-logout-btn" onClick={handleLogout}>
                                        🚪 Logout
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* MOBILE MENU BUTTON */}
                <button
                    className={`dp-menu-icon ${menuOpen ? "dp-menu-open" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className="dp-menu-icon-bar"></span>
                    <span className="dp-menu-icon-bar"></span>
                    <span className="dp-menu-icon-bar"></span>
                </button>
            </nav>

            {/* MOBILE MENU */}
            <div className={`dp-mobile-menu ${menuOpen ? "dp-mobile-menu--open" : ""}`}>

                {/* Mobile Nav Items */}
                <Link to="/" className="dp-nav-link dp-nav-link--mobile dp-nav-link--regular" onClick={handleLinkClick}>Home</Link>
                <Link to="/properties" className="dp-nav-link dp-nav-link--mobile dp-nav-link--regular" onClick={handleLinkClick}>Properties</Link>

                {/* INTERIOR DESIGN LINK - MOBILE */}
                <Link 
                    to="/interior" 
                    className="dp-nav-link dp-nav-link--mobile dp-nav-link--interior" 
                    onClick={handleLinkClick}
                >
                     Interior Design
                </Link>

                <Link to="/Bookvisitt" className="dp-nav-link dp-nav-link--mobile dp-nav-link--featured" onClick={handleLinkClick}>
                     Book Visit
                </Link>

                <Link to="/Blogg" className="dp-nav-link dp-nav-link--mobile dp-nav-link--regular" onClick={handleLinkClick}>Blog</Link>
                <Link to="/contact" className="dp-nav-link dp-nav-link--mobile dp-nav-link--regular" onClick={handleLinkClick}>Contact</Link>

                {/* === MY ACCOUNT LINK (Mobile) === */}
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
                        <Link to="/About" className="dp-nav-link dp-nav-link--mobile dp-nav-link--login" onClick={handleLinkClick}>About</Link>
                        {/* <Link to="/signup" className="dp-nav-link dp-nav-link--mobile dp-nav-link--signup" onClick={handleLinkClick}>Signup</Link> */}
                    </>
                ) : (
                    <>
                        <div className="dp-mobile-user-info">
                            <div className="dp-user-avatar">{getUserInitials()}</div>
                            <div className="dp-user-details">
                                <div className="dp-user-name">{getUserFullName()}</div>
                                <div className="dp-user-email">{user?.email}</div>
                                <div className="dp-user-role">{user?.role}</div>
                            </div>
                        </div>

                        {/* MY ACCOUNT LINK IN MOBILE MENU */}
                        <Link 
                            to="/my-account" 
                            className="dp-mobile-user-link dp-mobile-user-link--account" 
                            onClick={handleLinkClick}
                        >
                            👤 My Account
                        </Link>

                        <Link to="/profile" className="dp-mobile-user-link" onClick={handleLinkClick}>👤 My Profile</Link>
                        <Link to="/my-properties" className="dp-mobile-user-link" onClick={handleLinkClick}>🏠 My Properties</Link>
                        <Link to="/saved" className="dp-mobile-user-link" onClick={handleLinkClick}>💖 Saved Properties</Link>

                        {/* Role-specific mobile links */}
                        {isAdmin() && (
                            <Link to="/admin" className="dp-mobile-user-link dp-mobile-user-link--admin" onClick={handleLinkClick}>
                                👑 Admin Panel
                            </Link>
                        )}

                        {isAgent() && (
                            <Link to="/agent/dashboard" className="dp-mobile-user-link dp-mobile-user-link--agent" onClick={handleLinkClick}>
                                📈 Agent Dashboard
                            </Link>
                        )}

                        <button className="dp-mobile-user-link dp-logout-btn" onClick={handleLogout}>
                            🚪 Logout
                        </button>
                    </>
                )}
            </div>

            {/* Overlay */}
            {showDropdown && <div className="dp-dropdown-overlay" onClick={() => setShowDropdown(false)} />}
        </>
    );
};

export default Navbar;