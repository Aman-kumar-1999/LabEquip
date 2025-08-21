// "use client";

import React from "react";
// import Hero from "@/app/components/Home/Hero";
// import Companies from "@/app/components/Home/Companies";
// import Courses from "@/app/components/Home/Courses";
// import Mentor from "@/app/components/Home/Mentor";
// import Testimonial from "@/app/components/Home/Testimonials";
// import ContactForm from "@/app/components/ContactForm";
// import Newsletter from "@/app/components/Home/Newsletter";
import './css/style.css';
// import './css/home_page.css';
import { Metadata } from "next";
import LandingPage from "./components/Landing";

export const metadata: Metadata = {
  title: "LabEquip",
};

export default function Home() {
  return (
    <main >
      <LandingPage />
      {/* <Hero /> */}
      {/* <Companies />
      <Courses />
      <Mentor />
      <Testimonial />
      <ContactForm/>
      <Newsletter /> */}
      
    </main>
  );
}

// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import Script from "next/script";

// export default function HomePage() {
//   return (
//     <main id="main" className="pb-5">
//       {/* Header */}
//       <header className="x-header shadow-sm">
//         <nav className="navbar navbar-expand-lg x-header__inner" aria-label="Primary Navigation">
//           <div className="container-fluid px-0">
//             <a href="/" className="d-flex align-items-center" aria-label="Go to Home">
//               <span aria-label="Company Logo" className="x-logo me-2" role="img">
//                     </span>
//                     {/* <span className="fw-bold d-none d-md-inline">
//                         LabEquip
//                     </span> */}
//             </a>

//             <button
//               className="navbar-toggler"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#primaryNav"
//               aria-controls="primaryNav"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//             >
//               <span className="navbar-toggler-icon"></span>
//             </button>

//             {/* Navbar links */}
//             <div className="collapse navbar-collapse" id="primaryNav">
//               <ul className="navbar-nav me-auto mb-2 mb-lg-0 x-nav">
//                 <li className="nav-item">
//                   <Link href="/" className="x-nav__link nav-link active" aria-current="page">
//                     <i className="fa-solid fa-house me-1"></i> Home
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link href="/products" className="x-nav__link nav-link">
//                     <i className="fa-solid fa-flask-vial me-1"></i> Products
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link href="/compare" className="x-nav__link nav-link">
//                     <i className="fa-solid fa-code-compare me-1"></i> Compare
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link href="/orders" className="x-nav__link nav-link">
//                     <i className="fa-solid fa-receipt me-1"></i> Orders
//                   </Link>
//                 </li>
//               </ul>
//               {/* Search */}
//               <form action="./search_results.html" className="d-flex position-relative me-lg-3"
//                     id="headerSearchForm" method="get" role="search">
//                   <div className="x-search w-100">
//                       <i className="fa-solid fa-magnifying-glass">
//                       </i>
//                       <input aria-label="Search" className="form-control border-0" id="searchInput" name="q"
//                                 placeholder="Search products, specs, brands..." type="search" />
//                         </div>
//                         <div aria-labelledby="searchInput" className="dropdown-menu show d-none" id="search-suggestions"
//                             role="listbox">
//                         </div>
//                     </form>
//               <div className="d-flex align-items-center gap-2">
//                 {/* Cart */}
//                 <a
//                   aria-label="View cart"
//                   className="btn x-btn x-btn--secondary position-relative"
//                   href="./cart_page.html"
//                   id="cartBtn"
//                 >
//                   <i className="fa-solid fa-cart-shopping"></i>
//                   <span className="visually-hidden">Cart</span>
//                   <span
//                     className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
//                     id="cartCountBadge"
//                   >
//                     0
//                   </span>
//                 </a>
//                 {/* Guest: Login/Register */}
//                 <div className="d-flex gap-2" id="guestActions">
//                   <a className="btn x-btn x-btn--primary" href="./login_page.html">
//                     <i className="fa-solid fa-right-to-bracket me-1"></i>
//                     Login
//                   </a>
//                   <a className="btn x-btn x-btn--secondary" href="./register_page.html">
//                   <i className="fa-solid fa-right-to-bracket me-1"></i>
                    
//                     Register
//                   </a>
//                 </div>
//                 {/* Authenticated: My Account Dropdown */}
//                 <div className="dropdown d-none" id="userMenu">
//                   <button
//                     aria-expanded="false"
//                     className="btn x-btn x-btn--secondary dropdown-toggle"
//                     data-bs-toggle="dropdown"
//                     id="userMenuButton"
//                     type="button"
//                   >
//                     <i className="fa-solid fa-user-circle me-1"></i>
//                     <span id="userNameLabel">My Account</span>
//                   </button>
//                   <ul
//                     aria-labelledby="userMenuButton"
//                     className="dropdown-menu dropdown-menu-end x-menu__list"
//                   >
//                     <li>
//                       <a className="dropdown-item x-menu__item" href="./user_dashboard.html">
//                         <i className="fa-solid fa-gauge-high">
//                         </i>
//                         <span className="ms-2">
//                           Dashboard
//                         </span>
//                       </a>
//                     </li>
//                     <li>
//                       <a className="dropdown-item x-menu__item" href="./order_history.html">
//                         <i className="fa-solid fa-box">
//                         </i>
//                         <span className="ms-2">
//                           Order History
//                         </span>
//                       </a>
//                     </li>
//                     <li>
//                       <a className="dropdown-item x-menu__item" href="./account_settings.html">
//                         <i className="fa-solid fa-gear">
//                         </i>
//                         <span className="ms-2">
//                           Account Settings
//                         </span>
//                       </a>
//                     </li>
//                     <li>
//                       <hr className="dropdown-divider" />
//                     </li>
//                     <li>
//                       <button className="dropdown-item x-menu__item" id="logoutBtn">
//                         <i className="fa-solid fa-arrow-right-from-bracket">
//                         </i>
//                         <span className="ms-2">
//                           Logout
//                         </span>
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </header>

//       {/* Hero Section */}
//       <section className="pt-0">
//         <div
//           id="heroCarousel"
//           className="carousel slide"
//           data-bs-ride="carousel"
//           aria-label="Promotional Carousel"
//         >
//           <div className="carousel-indicators">
//             <button
//               type="button"
//               data-bs-target="#heroCarousel"
//               data-bs-slide-to="0"
//               className="active"
//               aria-current="true"
//               aria-label="Slide 1"
//             />
//             <button
//               type="button"
//               data-bs-target="#heroCarousel"
//               data-bs-slide-to="1"
//               aria-label="Slide 2"
//             />
//             <button
//               type="button"
//               data-bs-target="#heroCarousel"
//               data-bs-slide-to="2"
//               aria-label="Slide 3"
//             />
//           </div>

//           <div className="carousel-inner">
//             <div className="carousel-item active">
//               <Image
//                 src="/assets/hero_image_for_research_and_di_1_96344ba9.jpg"
//                 alt="Lab equipment promotion slide 1"
//                 width={1600}
//                 height={640}
//                 className="d-block w-100 object-fit-cover"
//               />
//               <div className="carousel-caption text-start hero-caption">
//                 <h1 className="display-5 fw-bold">Equip Your Discovery</h1>
//                 <p className="lead">
//                   Microscopes, centrifuges, pipettes, reagents and more—engineered for precision.
//                 </p>
//                 <Link href="/products" className="btn x-btn x-btn--primary btn-lg">
//                   Shop All Products
//                 </Link>
//               </div>
//             </div>
//             {/* Add other slides here */}
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="x-footer mt-auto">
//         <div className="l-container">
//           <div className="row g-4">
//             <div className="col-12 col-md-4">
//               <div className="d-flex align-items-center mb-2">
//                 <span className="x-logo me-2" style={{ width: "32px", height: "32px" }}></span>
//                 <strong>LabEquip</strong>
//               </div>
//               <p>
//                 Precision tools for every lab. Secure checkout, institutional pricing, and fast
//                 shipping.
//               </p>
//             </div>
//             {/* Quick Links */}
//             <div className="col-6 col-md-4">
//               <h6 className="u-text-muted">Quick Links</h6>
//               <ul className="list-unstyled">
//                 <li>
//                   <Link href="/products">Products</Link>
//                 </li>
//                 <li>
//                   <Link href="/login">Login</Link>
//                 </li>
//                 <li>
//                   <Link href="/register">Register</Link>
//                 </li>
//                 <li>
//                   <Link href="/cart">Cart</Link>
//                 </li>
//               </ul>
//             </div>
//             {/* Legal */}
//             <div className="col-6 col-md-4">
//               <h6 className="u-text-muted">Legal</h6>
//               <ul className="list-unstyled">
//                 <li>
//                   <Link href="/orders">Orders</Link>
//                 </li>
//                 <li>
//                   <Link href="/returns">Returns</Link>
//                 </li>
//                 <li>
//                   <Link href="/account">Account Settings</Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <hr />
//           <div className="d-flex justify-content-between align-items-center">
//             <small className="text-muted">© {new Date().getFullYear()} LabEquip Inc.</small>
//             <div className="d-flex gap-3">
//               <Link href="#" aria-label="Twitter">
//                 <i className="fa-brands fa-x-twitter"></i>
//               </Link>
//               <Link href="#" aria-label="LinkedIn">
//                 <i className="fa-brands fa-linkedin"></i>
//               </Link>
//               <Link href="#" aria-label="YouTube">
//                 <i className="fa-brands fa-youtube"></i>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Scripts (Bootstrap, SweetAlert2, Chart.js) */}
//       <Script
//         src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
//         strategy="beforeInteractive"
//       />
//       <Script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.10.8/dist/sweetalert2.all.min.js" />
//       <Script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js" />
//     </main>
//   );
// }
