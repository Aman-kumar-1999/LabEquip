

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import '../../css/admin_dashboard.css'

const AdminSidebar = () => {
  const pathname = usePathname();

  const navItems = [
    // { href: "/admin/landing", label: "Home", icon: "fa-solid fa-home" },
    { href: "/admin/dashboard", label: "Dashboard", icon: "fa-solid fa-gauge-high" },
    { href: "/admin/product", label: "Products", icon: "fa-solid fa-boxes-stacked" },
    { href: "/admin/bulk-import", label: "Bulk Import", icon: "fa-solid fa-file-import" },
    { href: "/admin/orders", label: "Orders", icon: "fa-solid fa-receipt" },
    { href: "/admin/user-management", label: "Users", icon: "fa-solid fa-users-gear" },
    { href: "/admin/price-management", label: "Pricing", icon: "fa-solid fa-tags" },
    { href: "/admin/quotes", label: "Quotes", icon: "fa-solid fa-file-signature" },
    { href: "/admin/returns", label: "Returns", icon: "fa-solid fa-rotate-left" },
  ];

  return (
    <aside aria-label="Admin navigation" className="admin-sidebar x-card" id="adminSidebar">
      <div className="p-3 border-bottom">
        <span className="fw-bold">Admin Navigation</span>
      </div>
      <nav className="nav flex-column p-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link x-nav__link ${isActive ? "active" : ""}`}
            >
              <i className={`${item.icon} me-2`} />
              <span className="link-label">{item.label}</span>
            </Link>
          );
        })}

        <div className="mt-3 px-2">
          <Link className="x-btn x-btn--outline w-100" href="/">
            <i className="fa-solid fa-arrow-up-right-from-square me-1" />
            Go to Store
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;







// import Link from "next/link";






// export default function AdminLeftSidebar() {
//     return (
//         // <div className="col-12 col-lg-3">
//             <aside aria-label="Admin navigation" className="admin-sidebar x-card" id="adminSidebar">
//                 <div className="p-3 border-bottom">
//                     <span className="fw-bold">
//                         Admin Navigation
//                     </span>
//                 </div>
//                 <nav className="nav flex-column p-2">
//                     <Link aria-current="page" className="nav-link x-nav__link active" href="/admin/dashboard">
//                         <i className="fa-solid fa-gauge-high me-2">
//                         </i>
//                         <span className="link-label">
//                             Dashboard
//                         </span>
//                     </Link>
//                     <Link className="nav-link x-nav__link" href="/admin/products">
//                         <i className="fa-solid fa-boxes-stacked me-2">
//                         </i>
//                         <span className="link-label">
//                             Products
//                         </span>
//                     </Link>
//                     <Link className="nav-link x-nav__link" href="/admin/import">
//                         <i className="fa-solid fa-file-import me-2">
//                         </i>
//                         <span className="link-label">
//                             Bulk Import
//                         </span>
//                     </Link>
//                     <Link className="nav-link x-nav__link" href="/admin/orders">
//                         <i className="fa-solid fa-receipt me-2">
//                         </i>
//                         <span className="link-label">
//                             Orders
//                         </span>
//                     </Link>
//                     <Link className="nav-link x-nav__link" href="/admin/user-management">
//                         <i className="fa-solid fa-users-gear me-2">
//                         </i>
//                         <span className="link-label">
//                             Users
//                         </span>
//                     </Link>
//                     <Link className="nav-link x-nav__link" href="/admin/pricing">
//                         <i className="fa-solid fa-tags me-2">
//                         </i>
//                         <span className="link-label">
//                             Pricing
//                         </span>
//                     </Link>
//                     <Link className="nav-link x-nav__link" href="/admin/quotes">
//                         <i className="fa-solid fa-file-signature me-2">
//                         </i>
//                         <span className="link-label">
//                             Quotes
//                         </span>
//                     </Link>
//                     <Link className="nav-link x-nav__link" href="/admin/returns">
//                         <i className="fa-solid fa-rotate-left me-2">
//                         </i>
//                         <span className="link-label">
//                             Returns
//                         </span>
//                     </Link>
//                     <div className="mt-3 px-2">
//                         <Link className="x-btn x-btn--outline w-100" href="/admin/">
//                             <i className="fa-solid fa-arrow-up-right-from-square me-1">
//                             </i>
//                             Go to Store
//                         </Link>
//                     </div>
//                 </nav>
//             </aside>
//         // </div>

//         // <Linkside className="col-12 col-lg-3">
//         //     <nav aria-label="Admin sidebar navigation" className="admin-sidebar x-card p-3">
//         //         <div className="mb-3">
//         //             <div className="text-muted small">
//         //                 Admin Navigation
//         //             </div>
//         //         </div>
//         //         <ul className="nav nav-pills flex-column gap-1">
//         //             <li className="nav-item">
//         //                 <Link className="sidebar-link nav-link" href="./admin_dashboard.html">
//         //                     <i className="fa-solid fa-gauge-high me-2">
//         //                     </i>
//         //                     Dashboard
//         //                 </Link>
//         //             </li>
//         //             <li className="nav-item">
//         //                 <Link className="sidebar-link nav-link" href="./admin_products.html">
//         //                     <i className="fa-solid fa-box-open me-2">
//         //                     </i>
//         //                     Products
//         //                 </Link>
//         //             </li>
//         //             <li className="nav-item">
//         //                 <Link className="sidebar-link nav-link" href="./admin_import.html">
//         //                     <i className="fa-solid fa-file-arrow-up me-2">
//         //                     </i>
//         //                     Bulk Import
//         //                 </Link>
//         //             </li>
//         //             <li className="nav-item">
//         //                 <Link className="sidebar-link nav-link" href="./admin_orders.html">
//         //                     <i className="fa-solid fa-receipt me-2">
//         //                     </i>
//         //                     Orders
//         //                 </Link>
//         //             </li>
//         //             <li className="nav-item">
//         //                 <Link aria-current="page" className="sidebar-link nav-link active" href="./admin_users.html">
//         //                     <i className="fa-solid fa-users-gear me-2">
//         //                     </i>
//         //                     Users
//         //                 </Link>
//         //             </li>
//         //             <li className="nav-item">
//         //                 <Link className="sidebar-link nav-link" href="./admin_pricing.html">
//         //                     <i className="fa-solid fa-tags me-2">
//         //                     </i>
//         //                     Pricing
//         //                 </Link>
//         //             </li>
//         //             <li className="nav-item">
//         //                 <Link className="sidebar-link nav-link" href="./admin_quotes.html">
//         //                     <i className="fa-solid fa-file-invoice-dollar me-2">
//         //                     </i>
//         //                     Quotes
//         //                 </Link>
//         //             </li>
//         //             <li className="nav-item">
//         //                 <Link className="sidebar-link nav-link" href="./admin_returns.html">
//         //                     <i className="fa-solid fa-rotate-left me-2">
//         //                     </i>
//         //                     Returns
//         //                 </Link>
//         //             </li>
//         //         </ul>
//         //         <hr className="hr" />
//         //         <div className="small text-muted">
//         //             Quick Links
//         //         </div>
//         //         <ul className="nav flex-column mt-2">
//         //             <li className="nav-item">
//         //                 <Link className="sidebar-link nav-link" href="./home_page.html">
//         //                     <i className="fa-solid fa-house me-2">
//         //                     </i>
//         //                     Storefront
//         //                 </Link>
//         //             </li>
//         //             <li className="nav-item">
//         //                 <Link className="sidebar-link nav-link" href="./order_history.html">
//         //                     <i className="fa-solid fa-clock-rotate-left me-2">
//         //                     </i>
//         //                     Order History
//         //                 </Link>
//         //             </li>
//         //         </ul>
//         //     </nav>
//         // </Linkside>
//     );
// }
