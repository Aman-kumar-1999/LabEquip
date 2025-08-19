'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import HeaderLink from '../Header/Navigation/HeaderLink'
import MobileHeaderLink from '../Header/Navigation/MobileHeaderLink'
import Signin from '@/app/components/Auth/SignIn'
import SignUp from '@/app/components/Auth/SignUp'
import { Icon } from '@iconify/react/dist/iconify.js'
import { HeaderType } from '@/app/types/menu'
// import '../../../css/style.css';
// import '../../../css/home_page.css';

const Header: React.FC = () => {
    //   const [navbarOpen, setNavbarOpen] = useState(false)
    //   const [sticky, setSticky] = useState(false)
    //   const [isSignInOpen, setIsSignInOpen] = useState(false)
    //   const [isSignUpOpen, setIsSignUpOpen] = useState(false)
    //   const [navLink, setNavLink] = useState<HeaderType[]>([])

    //   const signInRef = useRef<HTMLDivElement>(null)
    //   const signUpRef = useRef<HTMLDivElement>(null)
    //   const mobileMenuRef = useRef<HTMLDivElement>(null)

    //   useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const res = await fetch('/api/data')
    //         if (!res.ok) throw new Error('Failed to fetch')
    //         const data = await res.json()
    //         setNavLink(data.HeaderData)
    //       } catch (error) {
    //         console.error('Error fetching service:', error)
    //       }
    //     }
    //     fetchData()
    //   }, [])

    //   const handleScroll = () => {
    //     setSticky(window.scrollY >= 80)
    //   }

    //   const handleClickOutside = (event: MouseEvent) => {
    //     if (
    //       signInRef.current &&
    //       !signInRef.current.contains(event.target as Node)
    //     ) {
    //       setIsSignInOpen(false)
    //     }
    //     if (
    //       signUpRef.current &&
    //       !signUpRef.current.contains(event.target as Node)
    //     ) {
    //       setIsSignUpOpen(false)
    //     }
    //     if (
    //       mobileMenuRef.current &&
    //       !mobileMenuRef.current.contains(event.target as Node) &&
    //       navbarOpen
    //     ) {
    //       setNavbarOpen(false)
    //     }
    //   }

    //   useEffect(() => {
    //     window.addEventListener('scroll', handleScroll)
    //     document.addEventListener('mousedown', handleClickOutside)
    //     return () => {
    //       window.removeEventListener('scroll', handleScroll)
    //       document.removeEventListener('mousedown', handleClickOutside)
    //     }
    //   }, [navbarOpen, isSignInOpen, isSignUpOpen])

    //   useEffect(() => {
    //     if (isSignInOpen || isSignUpOpen || navbarOpen) {
    //       document.body.style.overflow = 'hidden'
    //     } else {
    //       document.body.style.overflow = ''
    //     }
    //   }, [isSignInOpen, isSignUpOpen, navbarOpen])

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

        // <header
        //   className={`fixed top-0 z-40 w-full transition-all duration-300 bg-transparent ${
        //     sticky ? 'bg-white shadow-lg py-2' : 'shadow-none py-4'
        //   }`}>
        //   <div>
        //     <div className='container flex items-center justify-between'>
        //       <Logo />
        //       {/* <nav className='hidden lg:flex grow items-center lg:gap-5 xl:gap-8 justify-center'>
        //         {navLink.map((item, index) => (
        //           <HeaderLink key={index} item={item} />
        //         ))}
        //       </nav> */}
        //       <div className='flex items-center gap-4'>
        //         <Link
        //           href='#'
        //           className='hidden lg:block bg-primary text-white hover:bg-primary/15 hover:text-primary py-2 px-6 rounded-full text-lg font-medium'
        //           onClick={() => {
        //             setIsSignInOpen(true)
        //           }}>
        //           Sign In
        //         </Link>
        //         {isSignInOpen && (
        //           <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50'>
        //             <div
        //               ref={signInRef}
        //               className='relative mx-auto w-full max-w-md overflow-hidden rounded-lg px-8 pt-14 pb-8 text-center bg-white'>
        //               <button
        //                 onClick={() => setIsSignInOpen(false)}
        //                 className='absolute top-0 right-0 mr-4 mt-8 hover:cursor-pointer'
        //                 aria-label='Close Sign In Modal'>
        //                 <Icon
        //                   icon='material-symbols:close-rounded'
        //                   width={24}
        //                   height={24}
        //                   className='text-black hover:text-primary text-24 inline-block me-2'
        //                 />
        //               </button>
        //               <Signin />
        //             </div>
        //           </div>
        //         )}
        //         <Link
        //           href='#'
        //           className='hidden lg:block bg-primary/15 hover:bg-primary text-primary hover:text-white py-2 px-6 rounded-full text-lg font-medium'
        //           onClick={() => {
        //             setIsSignUpOpen(true)
        //           }}>
        //           Sign Up
        //         </Link>
        //         {isSignUpOpen && (
        //           <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50'>
        //             <div
        //               ref={signUpRef}
        //               className='relative mx-auto w-full max-w-md overflow-hidden rounded-lg bg-white backdrop-blur-md px-8 pt-14 pb-8 text-center'>
        //               <button
        //                 onClick={() => setIsSignUpOpen(false)}
        //                 className='absolute top-0 right-0 mr-4 mt-8 hover:cursor-pointer'
        //                 aria-label='Close Sign In Modal'>
        //                 <Icon
        //                   icon='material-symbols:close-rounded'
        //                   width={24}
        //                   height={24}
        //                   className='text-black hover:text-primary text-24 inline-block me-2'
        //                 />
        //               </button>
        //               <SignUp />
        //             </div>
        //           </div>
        //         )}
        //         <button
        //           onClick={() => setNavbarOpen(!navbarOpen)}
        //           className='block lg:hidden p-2 rounded-lg hover:cursor-pointer'
        //           aria-label='Toggle mobile menu'>
        //           <span className='block w-6 h-0.5 bg-black'></span>
        //           <span className='block w-6 h-0.5 bg-black mt-1.5'></span>
        //           <span className='block w-6 h-0.5 bg-black mt-1.5'></span>
        //         </button>
        //       </div>
        //     </div>
        //     {navbarOpen && (
        //       <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-40' />
        //     )}
        //     <div
        //       ref={mobileMenuRef}
        //       className={`lg:hidden fixed top-0 right-0 h-full w-full bg-white shadow-lg transform transition-transform duration-300 max-w-xs ${
        //         navbarOpen ? 'translate-x-0' : 'translate-x-full'
        //       } z-50`}>
        //       <div className='flex items-center justify-between gap-2 p-4'>
        //         <div>
        //           <Logo />
        //         </div>
        //         {/*  */}
        //         <button
        //           onClick={() => setNavbarOpen(false)}
        //           className='hover:cursor-pointer'
        //           aria-label='Close menu Modal'>
        //           <Icon
        //             icon='material-symbols:close-rounded'
        //             width={24}
        //             height={24}
        //             className='text-black hover:text-primary text-24 inline-block me-2'
        //           />
        //         </button>
        //       </div>
        //       <nav className='flex flex-col items-start p-4'>
        //         {navLink.map((item, index) => (
        //           <MobileHeaderLink key={index} item={item} />
        //         ))}
        //         <div className='mt-4 flex flex-col space-y-4 w-full'>
        //           <Link
        //             href='#'
        //             className='bg-transparent border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white'
        //             onClick={() => {
        //               setIsSignInOpen(true)
        //               setNavbarOpen(false)
        //             }}>
        //             Sign In
        //           </Link>
        //           <Link
        //             href='#'
        //             className='bg-primary border border-primary text-white px-4 py-2 rounded-lg hover:bg-transparent hover:text-primary'
        //             onClick={() => {
        //               setIsSignUpOpen(true)
        //               setNavbarOpen(false)
        //             }}>
        //             Sign Up
        //           </Link>
        //         </div>
        //       </nav>
        //     </div>
        //   </div>
        // </header>
    )
}

export default Header
