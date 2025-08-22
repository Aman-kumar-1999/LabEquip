"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Chart as ChartJS, LineElement, ArcElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

// Register ChartJS modules
ChartJS.register(LineElement, ArcElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function AdminDashboard() {
  const [range, setRange] = useState("30d");
  const [salesData, setSalesData] = useState<any>(null);
  const [statusData, setStatusData] = useState<any>(null);

  // Simulated chart render
  useEffect(() => {
    const base = range === "7d" ? 7 : range === "today" ? 1 : range === "ytd" ? 52 : 12;
    const labels = Array.from({ length: base }, (_, i) => `P${i + 1}`);
    const data = Array.from({ length: base }, () => Math.floor(50000 + Math.random() * 120000));

    setSalesData({
      labels,
      datasets: [
        {
          label: "Sales (USD)",
          data,
          borderColor: "#000080",
          backgroundColor: "rgba(0,0,128,0.08)",
          tension: 0.3,
          fill: true,
          pointRadius: 3,
        },
      ],
    });

    setStatusData({
      labels: ["Processing", "Paid", "Shipped", "Pending", "Cancelled"],
      datasets: [
        {
          data: [28, 22, 30, 12, 8],
          backgroundColor: ["#0099D2", "#00774E", "#000080", "#FFA500", "#CD2026"],
        },
      ],
    });
  }, [range]);

  return (
    <div className="admin-wrapper d-flex">
      {/* Sidebar */}
      {/* <aside className="admin-sidebar x-card p-3" id="adminSidebar">
        <div className="fw-bold mb-2">Navigation</div>
        <nav className="nav flex-column">
          <Link href="/admin/dashboard" className="nav-link x-nav__link active">
            <i className="fa-solid fa-gauge-high me-2" /> Dashboard
          </Link>
          <Link href="/admin/products" className="nav-link x-nav__link">
            <i className="fa-solid fa-boxes-stacked me-2" /> Products
          </Link>
          <Link href="/admin/import" className="nav-link x-nav__link">
            <i className="fa-solid fa-file-import me-2" /> Bulk Import
          </Link>
          <Link href="/admin/orders" className="nav-link x-nav__link">
            <i className="fa-solid fa-receipt me-2" /> Orders
          </Link>
          <Link href="/admin/users" className="nav-link x-nav__link">
            <i className="fa-solid fa-users-gear me-2" /> Users
          </Link>
          <Link href="/admin/pricing" className="nav-link x-nav__link">
            <i className="fa-solid fa-tags me-2" /> Pricing
          </Link>
          <Link href="/admin/quotes" className="nav-link x-nav__link">
            <i className="fa-solid fa-file-signature me-2" /> Quotes
          </Link>
          <Link href="/admin/returns" className="nav-link x-nav__link">
            <i className="fa-solid fa-rotate-left me-2" /> Returns
          </Link>
          <div className="mt-3">
            <Link href="/" className="x-btn x-btn--outline w-100">
              <i className="fa-solid fa-arrow-up-right-from-square me-1" /> Go to Store
            </Link>
          </div>
        </nav>
      </aside> */}

      {/* Main content */}
      <main className="admin-main flex-grow-1 p-4" id="mainContent">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div>
            <nav className="x-breadcrumb">
              <Link href="/">Home</Link> / <span>Admin Dashboard</span>
            </nav>
            {/* <h1>Admin Dashboard</h1> */}
            <p className="u-text-muted">At-a-glance KPIs and quick access to management tools.</p>
          </div>
          <div className="d-flex gap-2">
            <select
              className="form-select"
              value={range}
              onChange={(e) => setRange(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="qtd">Quarter to Date</option>
              <option value="ytd">Year to Date</option>
            </select>
            <button className="x-btn x-btn--secondary" onClick={() => setRange(range)}>
              <i className="fa-solid fa-rotate" /> Refresh
            </button>
          </div>
        </div>

        {/* Charts */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-lg-8">
            <div className="x-card h-100 p-3">
              <h3>Sales Over Time</h3>
              {salesData ? <Line data={salesData} /> : <p>Loading…</p>}
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="x-card h-100 p-3">
              <h3>Orders by Status</h3>
              {statusData ? <Doughnut data={statusData} /> : <p>Loading…</p>}
            </div>
          </div>
        </div>

        {/* Recent Orders - (can be a separate component) */}
        <div className="x-card">
          <div className="x-card__header d-flex justify-content-between">
            <h3>Recent Orders</h3>
            <Link href="/admin/orders" className="x-btn x-btn--primary">
              View All
            </Link>
          </div>
          <div className="x-card__body">
            <table className="x-table table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>O-20250816-0001</td>
                  <td>Dr. Alice Nguyen</td>
                  <td>2025-08-16 09:24</td>
                  <td>$152,340.00</td>
                  <td>Processing</td>
                  <td>
                    <Link href="/admin/orders" className="x-btn x-btn--link">
                      Open
                    </Link>
                  </td>
                </tr>
                {/* More rows… */}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}





// import { Metadata } from "next";
// import Link from "next/link";

// export const metadata: Metadata = {
//     title: "Admin Dashboard",
// };


// export default function AdminDashboard() {
//     return (
//         <main className="flex-grow-1" id="mainContent">
//             <div className="l-container py-4">
//                 <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">

//                     <nav aria-label="breadcrumb" className="x-breadcrumb">
//                         <Link href="/admin">
//                             Admin
//                         </Link>
//                         <span>
//                             /
//                         </span>
//                         <span aria-current="page">
//                             Dashboard
//                         </span>
//                     </nav>
//                     {/* <h1 className="h3 mb-4">
//                         Dashboard
//                     </h1> */}

//                     <div className="d-flex align-items-center justify-content-between mb-3">
//                         <select className="form-select" id="timeRange">
//                             <option value="today">
//                                 Today
//                             </option>
//                             <option value="7d">
//                                 Last 7 Days
//                             </option>
//                             <option

//                                 // selected="" 
//                                 value="30d">
//                                 Last 30 Days
//                             </option>
//                             <option value="qtd">
//                                 Quarter to Date
//                             </option>
//                             <option value="ytd">
//                                 Year to Date
//                             </option>
//                         </select>&nbsp;
//                         <button className="x-btn x-btn--secondary" id="refreshBtn">
//                             <i className="fa-solid fa-rotate">
//                             </i>
//                             Refresh
//                         </button>
//                     </div>
//                 </div>
//                 {/* <!-- Quick Actions --> */}
//                 <div className="x-card mb-4">
//                     <div className="x-card__body d-flex flex-wrap gap-2">
//                         <a className="x-btn x-btn--primary" href="./admin_products.html">
//                             <i className="fa-solid fa-plus">
//                             </i>
//                             Add Product
//                         </a>
//                         <a className="x-btn x-btn--secondary" href="./admin_import.html">
//                             <i className="fa-solid fa-file-import">
//                             </i>
//                             Bulk Import
//                         </a>
//                         <a className="x-btn x-btn--secondary" href="./admin_orders.html">
//                             <i className="fa-solid fa-list-check">
//                             </i>
//                             View Orders
//                         </a>
//                         <a className="x-btn x-btn--secondary" href="./admin_quotes.html">
//                             <i className="fa-solid fa-quote-right">
//                             </i>
//                             Manage Quotes
//                         </a>
//                     </div>
//                 </div>
//                 {/* <!-- KPI Summary (DashboardSummary) --> */}
//                 <section aria-labelledby="kpiHeading" className="mb-4">
//                     <h2 className="visually-hidden" id="kpiHeading">
//                         Key Performance Summary
//                     </h2>
//                     <div className="row g-3">
//                         <div className="col-12 col-md-6 col-lg-3">
//                             <a className="x-card kpi-card d-block text-decoration-none" href="./admin_orders.html">
//                                 <div className="x-card__body d-flex align-items-center justify-content-between">
//                                     <div>
//                                         <div className="u-text-muted">
//                                             Total Sales
//                                         </div>
//                                         <div className="fs-3 fw-bold" id="kpiSales">
//                                             $1,254,320
//                                         </div>
//                                         <div className="small text-success">
//                                             <i className="fa-solid fa-arrow-trend-up">
//                                             </i>
//                                             <span id="kpiSalesChange">
//                                                 +12.4%
//                                             </span>
//                                             vs prev
//                                         </div>
//                                     </div>
//                                     <div className="kpi-icon kpi-primary">
//                                         <i className="fa-solid fa-sack-dollar">
//                                         </i>
//                                     </div>
//                                 </div>
//                             </a>
//                         </div>
//                         <div className="col-12 col-md-6 col-lg-3">
//                             <a className="x-card kpi-card d-block text-decoration-none" href="./admin_orders.html">
//                                 <div className="x-card__body d-flex align-items-center justify-content-between">
//                                     <div>
//                                         <div className="u-text-muted">
//                                             Orders
//                                         </div>
//                                         <div className="fs-3 fw-bold" id="kpiOrders">
//                                             1,284
//                                         </div>
//                                         <div className="small text-success">
//                                             <i className="fa-solid fa-arrow-trend-up">
//                                             </i>
//                                             <span id="kpiOrdersChange">
//                                                 +5.2%
//                                             </span>
//                                             vs prev
//                                         </div>
//                                     </div>
//                                     <div className="kpi-icon kpi-info">
//                                         <i className="fa-solid fa-cart-shopping">
//                                         </i>
//                                     </div>
//                                 </div>
//                             </a>
//                         </div>
//                         <div className="col-12 col-md-6 col-lg-3">
//                             <a className="x-card kpi-card d-block text-decoration-none" href="./admin_users.html">
//                                 <div className="x-card__body d-flex align-items-center justify-content-between">
//                                     <div>
//                                         <div className="u-text-muted">
//                                             New Customers
//                                         </div>
//                                         <div className="fs-3 fw-bold" id="kpiCustomers">
//                                             238
//                                         </div>
//                                         <div className="small text-success">
//                                             <i className="fa-solid fa-arrow-trend-up">
//                                             </i>
//                                             <span id="kpiCustomersChange">
//                                                 +8.0%
//                                             </span>
//                                             vs prev
//                                         </div>
//                                     </div>
//                                     <div className="kpi-icon kpi-success">
//                                         <i className="fa-solid fa-user-plus">
//                                         </i>
//                                     </div>
//                                 </div>
//                             </a>
//                         </div>
//                         <div className="col-12 col-md-6 col-lg-3">
//                             <a className="x-card kpi-card d-block text-decoration-none" href="./admin_quotes.html">
//                                 <div className="x-card__body d-flex align-items-center justify-content-between">
//                                     <div>
//                                         <div className="u-text-muted">
//                                             Pending Quotes
//                                         </div>
//                                         <div className="fs-3 fw-bold" id="kpiQuotes">
//                                             32
//                                         </div>
//                                         <div className="small text-danger">
//                                             <i className="fa-solid fa-arrow-trend-down">
//                                             </i>
//                                             <span id="kpiQuotesChange">
//                                                 -3.1%
//                                             </span>
//                                             vs prev
//                                         </div>
//                                     </div>
//                                     <div className="kpi-icon kpi-warning">
//                                         <i className="fa-solid fa-file-signature">
//                                         </i>
//                                     </div>
//                                 </div>
//                             </a>
//                         </div>
//                     </div>
//                 </section>
//                 {/* <!-- Charts --> */}
//                 <section aria-labelledby="chartsHeading" className="mb-4">
//                     <h2 className="visually-hidden" id="chartsHeading">
//                         Performance Charts
//                     </h2>
//                     <div className="row g-3">
//                         <div className="col-12 col-lg-8">
//                             <div className="x-card h-100">
//                                 <div className="x-card__header">
//                                     <h3 className="h5 mb-0">
//                                         Sales Over Time
//                                     </h3>
//                                     <div className="text-muted small">
//                                         Interactive line chart
//                                     </div>
//                                 </div>
//                                 <div className="x-card__body position-relative">
//                                     <div className="d-flex align-items-center justify-content-center py-5"
//                                         id="salesChartLoader">
//                                         <div aria-label="Loading sales chart" className="loader" role="status">
//                                         </div>
//                                     </div>
//                                     <canvas aria-label="Sales over time chart" className="d-none" height="140"
//                                         id="salesChart" role="img">
//                                     </canvas>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-12 col-lg-4">
//                             <div className="x-card h-100">
//                                 <div className="x-card__header">
//                                     <h3 className="h5 mb-0">
//                                         Orders by Status
//                                     </h3>
//                                     <div className="text-muted small">
//                                         Distribution
//                                     </div>
//                                 </div>
//                                 <div className="x-card__body position-relative">
//                                     <div className="d-flex align-items-center justify-content-center py-5"
//                                         id="statusChartLoader">
//                                         <div aria-label="Loading orders status chart" className="loader" role="status">
//                                         </div>
//                                     </div>
//                                     <canvas aria-label="Order status distribution chart" className="d-none" height="180"
//                                         id="statusChart" role="img">
//                                     </canvas>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//                 {/* <!-- Recent Orders List --> */}
//                 <section aria-labelledby="recentOrdersHeading" className="mb-5">
//                     <div className="x-card">
//                         <div className="x-card__header d-flex align-items-center justify-content-between flex-wrap gap-2">
//                             <div>
//                                 <h3 className="h5 mb-1" id="recentOrdersHeading">
//                                     Recent Orders
//                                 </h3>
//                                 <div className="small u-text-muted">
//                                     Latest activity across the store
//                                 </div>
//                             </div>
//                             <div className="d-flex align-items-center gap-2">
//                                 <div className="x-search">
//                                     <i className="fa-solid fa-magnifying-glass u-text-muted">
//                                     </i>
//                                     <input aria-label="Search orders" id="orderSearch" placeholder="Search orders…"
//                                         type="search" />
//                                 </div>
//                                 <select className="form-select" id="statusFilter">
//                                     <option
//                                         // selected="" 
//                                         value="all">
//                                         All Statuses
//                                     </option>
//                                     <option value="Processing">
//                                         Processing
//                                     </option>
//                                     <option value="Paid">
//                                         Paid
//                                     </option>
//                                     <option value="Shipped">
//                                         Shipped
//                                     </option>
//                                     <option value="Pending">
//                                         Pending
//                                     </option>
//                                     <option value="Cancelled">
//                                         Cancelled
//                                     </option>

//                                 </select>
//                                 <button className="x-btn x-btn--secondary" id="downloadCsv">
//                                     <i className="fa-solid fa-download me-1">
//                                     </i>
//                                     CSV
//                                 </button>
//                                 <a className="x-btn x-btn--primary" href="./admin_orders.html">
//                                     <i className="fa-solid fa-arrow-right">
//                                     </i>
//                                     View All
//                                 </a>
//                             </div>
//                         </div>
//                         <div className="x-card__body">
//                             <div className="table-responsive">
//                                 <table className="x-table align-middle" id="recentOrdersTable">
//                                     <thead>
//                                         <tr>
//                                             <th className="sortable" data-sort="id" scope="col">
//                                                 Order ID
//                                                 <i className="fa-solid fa-sort ms-1">
//                                                 </i>
//                                             </th>
//                                             <th scope="col">
//                                                 Customer
//                                             </th>
//                                             <th className="sortable" data-sort="date" scope="col">
//                                                 Date
//                                                 <i className="fa-solid fa-sort ms-1">
//                                                 </i>
//                                             </th>
//                                             <th className="sortable text-end" data-sort="total" scope="col">
//                                                 Total
//                                                 <i className="fa-solid fa-sort ms-1">
//                                                 </i>
//                                             </th>
//                                             <th scope="col">
//                                                 Status
//                                             </th>
//                                             <th className="text-end" scope="col">
//                                                 Action
//                                             </th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {/* <!-- 6 Sample Rows --> */}
//                                         <tr className="order-row" data-date="2025-08-16T09:24:00" data-id="O-20250816-0001"
//                                             data-status="Processing" data-total="152340">
//                                             <td>
//                                                 O-20250816-0001
//                                             </td>
//                                             <td>
//                                                 Dr. Alice Nguyen
//                                             </td>
//                                             <td>
//                                                 2025-08-16 09:24
//                                             </td>
//                                             <td className="text-end">
//                                                 $152,340.00
//                                             </td>
//                                             <td>
//                                                 <span className="x-badge">
//                                                     <span className="x-status__dot c-status--info d-inline-block"
//                                                         style={{ "width": "10px", "height": "10px", "borderRadius": "50%", "background": "var(--color-info)" }}>
//                                                     </span>
//                                                     Processing
//                                                 </span>
//                                             </td>
//                                             <td className="text-end">
//                                                 <a className="x-btn x-btn--link" href="./admin_orders.html">
//                                                     Open
//                                                 </a>
//                                             </td>
//                                         </tr>
//                                         <tr className="order-row" data-date="2025-08-15T14:32:00" data-id="O-20250815-0002"
//                                             data-status="Shipped" data-total="8730">
//                                             <td>
//                                                 O-20250815-0002
//                                             </td>
//                                             <td>
//                                                 BioLab Inc.
//                                             </td>
//                                             <td>
//                                                 2025-08-15 14:32
//                                             </td>
//                                             <td className="text-end">
//                                                 $8,730.00
//                                             </td>
//                                             <td>
//                                                 <span className="x-badge x-badge--success">
//                                                     <i className="fa-solid fa-truck-fast">
//                                                     </i>
//                                                     Shipped
//                                                 </span>
//                                             </td>
//                                             <td className="text-end">
//                                                 <a className="x-btn x-btn--link" href="./admin_orders.html">
//                                                     Open
//                                                 </a>
//                                             </td>
//                                         </tr>
//                                         <tr className="order-row" data-date="2025-08-15T10:05:00" data-id="O-20250815-0003"
//                                             data-status="Paid" data-total="24550">
//                                             <td>
//                                                 O-20250815-0003
//                                             </td>
//                                             <td>
//                                                 Quantum Research
//                                             </td>
//                                             <td>
//                                                 2025-08-15 10:05
//                                             </td>
//                                             <td className="text-end">
//                                                 $24,550.00
//                                             </td>
//                                             <td>
//                                                 <span className="x-badge x-badge--success">
//                                                     <i className="fa-solid fa-circle-check">
//                                                     </i>
//                                                     Paid
//                                                 </span>
//                                             </td>
//                                             <td className="text-end">
//                                                 <a className="x-btn x-btn--link" href="./admin_orders.html">
//                                                     Open
//                                                 </a>
//                                             </td>
//                                         </tr>
//                                         <tr className="order-row" data-date="2025-08-14T16:47:00" data-id="O-20250814-0004"
//                                             data-status="Pending" data-total="1299">
//                                             <td>
//                                                 O-20250814-0004
//                                             </td>
//                                             <td>
//                                                 Genomics Lab
//                                             </td>
//                                             <td>
//                                                 2025-08-14 16:47
//                                             </td>
//                                             <td className="text-end">
//                                                 $1,299.00
//                                             </td>
//                                             <td>
//                                                 <span className="x-badge x-badge--warning">
//                                                     <i className="fa-solid fa-hourglass-half">
//                                                     </i>
//                                                     Pending
//                                                 </span>
//                                             </td>
//                                             <td className="text-end">
//                                                 <a className="x-btn x-btn--link" href="./admin_orders.html">
//                                                     Open
//                                                 </a>
//                                             </td>
//                                         </tr>
//                                         <tr className="order-row" data-date="2025-08-14T11:12:00" data-id="O-20250814-0005"
//                                             data-status="Processing" data-total="5890">
//                                             <td>
//                                                 O-20250814-0005
//                                             </td>
//                                             <td>
//                                                 Dr. Rahul Verma
//                                             </td>
//                                             <td>
//                                                 2025-08-14 11:12
//                                             </td>
//                                             <td className="text-end">
//                                                 $5,890.00
//                                             </td>
//                                             <td>
//                                                 <span className="x-badge">
//                                                     <span className="x-status__dot c-status--info d-inline-block"
//                                                         style={{ "width": "10px", "height": "10px", "borderRadius": "50%", "background": "var(--color-info)" }}>
//                                                     </span>
//                                                     Processing
//                                                 </span>
//                                             </td>
//                                             <td className="text-end">
//                                                 <a className="x-btn x-btn--link" href="./admin_orders.html">
//                                                     Open
//                                                 </a>
//                                             </td>
//                                         </tr>
//                                         <tr className="order-row" data-date="2025-08-13T09:02:00" data-id="O-20250813-0006"
//                                             data-status="Cancelled" data-total="420">
//                                             <td>
//                                                 O-20250813-0006
//                                             </td>
//                                             <td>
//                                                 City Hospital Lab
//                                             </td>
//                                             <td>
//                                                 2025-08-13 09:02
//                                             </td>
//                                             <td className="text-end">
//                                                 $420.00
//                                             </td>
//                                             <td>
//                                                 <span className="x-badge x-badge--danger">
//                                                     <i className="fa-solid fa-circle-xmark">
//                                                     </i>
//                                                     Cancelled
//                                                 </span>
//                                             </td>
//                                             <td className="text-end">
//                                                 <a className="x-btn x-btn--link" href="./admin_orders.html">
//                                                     Open
//                                                 </a>
//                                             </td>
//                                         </tr>
//                                     </tbody>
//                                 </table>
//                             </div>
//                             <div className="d-flex align-items-center justify-content-between mt-3 flex-wrap gap-2">
//                                 <div className="small u-text-muted" id="paginationInfo">
//                                     Showing 1–6 of 42 results
//                                 </div>
//                                 <nav aria-label="Orders pagination" className="x-pagination">
//                                     <a aria-label="Previous page" className="x-page" href="#">
//                                         «
//                                     </a>
//                                     <a aria-current="page" className="x-page" href="#">
//                                         1
//                                     </a>
//                                     <a className="x-page" href="#">
//                                         2
//                                     </a>
//                                     <a className="x-page" href="#">
//                                         3
//                                     </a>
//                                     <a aria-label="Next page" className="x-page" href="#">
//                                         »
//                                     </a>
//                                 </nav>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </div>
//         </main>

//     );
// }
