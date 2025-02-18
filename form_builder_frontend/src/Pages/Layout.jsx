import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Layout({ children }) {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
        document.body.classList.toggle("sidebar-toggled");
        document.querySelector(".sidebar")?.classList.toggle("toggled");
    };

    return (
        <div>
            <div id="wrapper">
                {/* Sidebar */}
                <ul className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${isToggled ? 'toggled' : ''}`} id="accordionSidebar">
                    {/* Sidebar - Brand */}
                    <Link className="sidebar-brand d-flex align-items-center bg-white justify-content-center" to="/">
                        <div className="sidebar-brand-icon rotate-n-15">
                            <img src="../img/logo.png" className="logo" alt="form logo" />
                        </div>
                        <div className="sidebar-brand-text text-dark">Form Builder</div>
                    </Link>
                    {/* Divider */}
                    <hr className="sidebar-divider my-0" />
                    {/* Nav Item - Dashboard */}
                    <li className="nav-item active mt-4">
                        <Link className="nav-link" to="/">
                            <i className="fas fa-fw fa-tachometer-alt iconside"/>
                            <span className='textside'>Dashboard</span></Link>
                    </li>
                    {/* Nav Item - Pages Collapse Menu */}
                    <li className="nav-item mx-1">
                        <Link className="nav-link collapsed" to="/forms">
                            <i className="fa-regular fa-file iconside"></i>
                            <span className='textside'> Forms</span>
                        </Link>
                    </li>
                    <li className="nav-item mx-1">
                        <Link className="nav-link collapsed" to="/templates">
                            <i className="fa-solid fa-chart-bar iconside"></i>
                            <span className='textside'>Templates</span>
                        </Link>
                    </li>
                    <li className="nav-item mx-1">
                        <Link className="nav-link collapsed" to="/submission">
                            <i className="fa-regular fa-clipboard iconside"></i>
                            <span className='textside'> Submissions</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link collapsed mx-1" to="/login">
                            <i className="fa-solid fa-sign-out-alt iconside"></i>
                            <span className='textside'>Logout</span>
                        </Link>
                    </li>
                    {/* Divider */}
                    <hr className="sidebar-divider mt-3" />
                    {/* Sidebar Toggler (Sidebar) */}
                    <div className="text-center d-none d-md-inline">
                        <button className="btn btn-primary rounded-circle shadow-sm" onClick={handleToggle}>
                            <i className={isToggled ? "fas fa-angle-right text-white" : "fas fa-angle-left text-white"} style={{ fontSize: '1.5rem' }}></i>
                        </button>
                    </div>
                </ul>
                {/* End of Sidebar */}
                {/* Content Wrapper */}
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        {/* Topbar */}
                        <nav className="navbar navbar-expand navbar-light bg-primary topbar mb-4 static-top shadow">
                            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" onClick={handleToggle}>
                                <i className="fa fa-bars" style={{ fontSize: '1.5rem' }} />
                            </button>
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item dropdown no-arrow">
                                    <Link className="nav-link dropdown-toggle" to="#" id="userDropdown">
                                        <span className="mr-2 d-none d-lg-inline text-white small">John Doe</span>
                                        <img className="img-profile rounded-circle" src="img/undraw_profile.svg" alt="Profile" />
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        {/* Page Content */}
                        <div className="container-fluid">{children}</div>
                    </div>
                    {/* Footer */}
                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Copyright © Your Website 2025</span>
                            </div>
                        </div>
                    </footer>
                </div>
                {/* End of Content Wrapper */}
            </div>
        </div>
    );
}
