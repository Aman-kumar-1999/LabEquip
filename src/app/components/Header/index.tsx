'use client'

export default function HeaderPage() {
    return (

        <header className="x-header shadow-sm fixed-top">
            <nav aria-label="Primary Navigation" className="navbar navbar-expand-lg x-header__inner">
                <div className="container-fluid px-0">
                    <a aria-label="Go to Home" className="d-flex align-items-center" href="/">
                        {/* <img src="logo.png" alt="Company Logo" className="x-logo me-2" /> */}
                        <span aria-label="Company Logo" className="x-logo me-2" role="img">
                    </span>
                        {/* <span className="fw-bold d-none d-md-inline">
                        LabEquip
                    </span> */}
                    </a>
                    <button aria-controls="primaryNav" aria-expanded="false" aria-label="Toggle navigation"
                        className="navbar-toggler" data-bs-target="#primaryNav" data-bs-toggle="collapse" type="button">
                        <span className="navbar-toggler-icon">
                        </span>
                    </button>
                    <div className="collapse navbar-collapse" id="primaryNav">
                        {/* <!-- Left Nav Links --> */}
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 x-nav">
                            <li className="nav-item">
                                <a className="x-nav__link nav-link active" href="./">
                                    <i className="fa-solid fa-house me-1">
                                    </i>
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="x-nav__link nav-link" href="./product_listing.html">
                                    <i className="fa-solid fa-flask-vial me-1">
                                    </i>
                                    Products
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="x-nav__link nav-link" href="./comparison_page.html">
                                    <i className="fa-solid fa-code-compare me-1">
                                    </i>
                                    Compare
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="x-nav__link nav-link" href="./order_history.html">
                                    <i className="fa-solid fa-receipt me-1">
                                    </i>
                                    Orders
                                </a>
                            </li>
                        </ul>
                        {/* <!-- Search --> */}
                        <form action="./search_results.html" autoComplete="off" className="d-flex position-relative me-lg-3"
                            id="headerSearchForm" method="get" role="search">
                            <div className="x-search w-100">
                                <i className="fa-solid fa-magnifying-glass">
                                </i>
                                <input aria-label="Search" className="form-control border-0" id="searchInput" name="q"
                                    placeholder="Search products, specs, brands..." type="search" />
                            </div>
                            <div aria-labelledby="searchInput" className="dropdown-menu show d-none" id="search-suggestions"
                                role="listbox">
                            </div>
                        </form>
                        {/* <!-- User Actions --> */}
                        <div className="d-flex align-items-center gap-2">
                            {/* <!-- Cart --> */}
                            <a aria-label="View cart" className="btn x-btn x-btn--secondary position-relative"
                                href="./cart_page.html" id="cartBtn">
                                <i className="fa-solid fa-cart-shopping">
                                </i>
                                <span className="visually-hidden">
                                    Cart
                                </span>
                                <span
                                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                                    id="cartCountBadge">
                                    0
                                </span>
                            </a>
                            &nbsp;
                            {/* <!-- Guest: Login/Register --> */}
                            <div className="d-flex gap-2" id="guestActions">
                                <a className=" x-btn x-btn--primary" href="./login_page.html">
                                    <i className="fa-solid fa-right-to-bracket me-1">
                                    </i>
                                    Login
                                </a>
                                &nbsp;

                                <a className=" x-btn x-btn--secondary" href="./register_page.html">
                                    <i className="fa-solid fa-user-plus me-1">
                                    </i>
                                    Register
                                </a>
                                &nbsp;
                            </div>
                            {/* <!-- Authenticated: My Account Dropdown --> */}
                            <div className="dropdown d-none" id="userMenu">
                                <button aria-expanded="false" className="btn x-btn x-btn--secondary dropdown-toggle"
                                    data-bs-toggle="dropdown" id="userMenuButton" type="button">
                                    <i className="fa-solid fa-user-circle me-1">
                                    </i>
                                    <span id="userNameLabel">
                                        My Account
                                    </span>
                                </button>
                                <ul aria-labelledby="userMenuButton" className="dropdown-menu dropdown-menu-end x-menu__list">
                                    <li>
                                        <a className="dropdown-item x-menu__item" href="./user_dashboard.html">
                                            <i className="fa-solid fa-gauge-high">
                                            </i>
                                            <span className="ms-2">
                                                Dashboard
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item x-menu__item" href="./order_history.html">
                                            <i className="fa-solid fa-box">
                                            </i>
                                            <span className="ms-2">
                                                Order History
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item x-menu__item" href="./account_settings.html">
                                            <i className="fa-solid fa-gear">
                                            </i>
                                            <span className="ms-2">
                                                Account Settings
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <button className="dropdown-item x-menu__item" id="logoutBtn">
                                            <i className="fa-solid fa-arrow-right-from-bracket">
                                            </i>
                                            <span className="ms-2">
                                                Logout
                                            </span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>

    )
}
