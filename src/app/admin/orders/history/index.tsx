"use client";

import { useEffect, useMemo, useState } from "react";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";
import Swal from "sweetalert2";

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

export default function OrderHistory() {

    type StatusType = "Delivered" | "Shipped" | "Processing" | "Cancelled" | "Returned";



    // ---------------- Mock Data ----------------
    const sampleProducts = [
        "Compound Microscope",
        "Centrifuge 12K",
        "Analytical Balance",
        "Pipette Set 1-10ml",
        "pH Meter Pro",
        "Cryo Tubes 2ml",
        "Microtome",
        "Spectrophotometer",
        "Lab Refrigerator",
        "PCR Thermocycler",
    ];
    const STATUSES = ["Processing", "Shipped", "Delivered", "Cancelled", "Returned"];

    const randomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    function genOrders(n = 36) {
        const out: any[] = [];
        let seq = 1024;
        for (let i = 0; i < n; i++) {
            const daysAgo = Math.floor(Math.random() * 180); // last 6 months
            const d = new Date();
            d.setDate(d.getDate() - daysAgo);
            const status = randomItem(STATUSES);
            const item = randomItem(sampleProducts);
            const total = Math.round((50 + Math.random() * 4950) * 100) / 100;
            const purchaser = randomItem(["A. Patel", "J. Chen", "M. Gomez", "S. Kumar", "L. Wright", "D. Silva", "R. Tan"]);
            out.push({
                orderId: `ORD-2025-${String(seq + i).padStart(5, "0")}`,
                orderDate: d.toISOString(),
                purchaserName: purchaser,
                totalAmount: total,
                status: status,
                searchable: `${item} ${purchaser}`,
                items: [item],
            });
        }
        return out.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
    }

    // ---------------- State ----------------
    const [orders, setOrders] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [isB2B, setIsB2B] = useState(true);
    const [sortColumn, setSortColumn] = useState("orderDate");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
    const [page, setPage] = useState(1);
    const pageSize = 10;

    // ---------------- Filters & Sorting ----------------
    const filteredOrders = useMemo(() => {
        let rows = [...orders];
        if (statusFilter !== "All") rows = rows.filter((r) => r.status === statusFilter);
        if (dateFrom) rows = rows.filter((r) => new Date(r.orderDate) >= new Date(dateFrom));
        if (dateTo) rows = rows.filter((r) => new Date(r.orderDate) <= new Date(dateTo));
        if (searchTerm) {
            const q = searchTerm.toLowerCase();
            rows = rows.filter((r) => r.orderId.toLowerCase().includes(q) || r.searchable.toLowerCase().includes(q));
        }
        rows.sort((a, b) => {
            let va, vb;
            if (sortColumn === "orderDate") {
                va = new Date(a.orderDate).getTime();
                vb = new Date(b.orderDate).getTime();
            } else if (sortColumn === "totalAmount") {
                va = a.totalAmount;
                vb = b.totalAmount;
            } else {
                va = a[sortColumn];
                vb = b[sortColumn];
            }
            return sortDirection === "asc" ? va - vb : vb - va;
        });
        return rows;
    }, [orders, searchTerm, statusFilter, dateFrom, dateTo, sortColumn, sortDirection]);
    const [state, setState] = useState({
        orders: genOrders(28),
        isLoading: false,
        error: null,
        currentPage: 1,
        pageSize: 10,
        totalPages: 1,
        searchTerm: "",
        statusFilter: "All",
        dateFrom: "",
        dateTo: "",
        sortColumn: "orderDate",
        sortDirection: "desc",
        isB2B: true,
    });

    // 🔹 Total pages
    const totalPages = Math.ceil(state.orders.length / state.pageSize);
    // 🔹 Paginated orders
    const paginatedOrders = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filteredOrders.slice(start, start + pageSize);
    }, [filteredOrders, page]);

    const handlePrev = () =>{
        setState((prev) => ({
            ...prev,
            currentPage: Math.max(1, prev.currentPage - 1),
        }));
        setPage((prev) => Math.max(prev - 1, 1));
    }
        

    const handleNext = () =>{
        setState((prev) => ({
            ...prev,
            currentPage: Math.min(totalPages, prev.currentPage + 1),
        }));
        setPage((prev) => Math.min(prev + 1, totalPages));
    }

    //   const setPage = (pageNum: number) =>
    //     setState((prev) => ({ ...prev, currentPage: pageNum }));
    // ---------------- Chart Data ----------------
    const chartData = useMemo(() => {
        const now = new Date();
        const labels: string[] = [];
        const counts: number[] = [];
        const map = new Map<string, number>();
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
            labels.push(d.toLocaleString(undefined, { month: "short" }));
            map.set(key, 0);
        }
        filteredOrders.forEach((o) => {
            const d = new Date(o.orderDate);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
            if (map.has(key)) map.set(key, (map.get(key) || 0) + 1);
        });
        counts.push(...Array.from(map.values()));
        return {
            labels,
            datasets: [
                {
                    label: "Orders",
                    data: counts,
                    borderColor: "#000080",
                    backgroundColor: "rgba(0,0,128,0.1)",
                    fill: true,
                    tension: 0.35,
                },
            ],
        };
    }, [filteredOrders]);

    // ---------------- Init Orders ----------------
    useEffect(() => {
        setOrders(genOrders(28));
    }, []);

    // ---------------- Helpers ----------------
    const fmtDate = (d: string) =>
        new Date(d).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });

    const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

    const showInvoice = (id: string) => {
        Swal.fire({
            title: "Download Invoice",
            text: `Invoice for ${id} will be generated as PDF.`,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Download",
            cancelButtonText: "Cancel",
        }).then((res) => {
            if (res.isConfirmed) {
                Swal.fire("Downloaded!", `Invoice for ${id} downloaded.`, "success");
            }
        });
    };

    const resetFilters = () => {
        setSearchTerm("");
        setStatusFilter("All");
        setDateFrom("");
        setDateTo("");
    };

    // function handlePrev(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
    //     event.preventDefault();
    //     setPage((prev) => Math.max(prev - 1, 1));
    // }
    // const handlePrev = () => {
    //     if (page > 1) setPage((prev) => Math.max(prev - 1, 1));
    // };



    // const handleNext = () => {
    //     if (page < paginatedOrders.length) setPage((prev) => Math.min(prev + 1, paginatedOrders.length));
    // };


    // ---------------- JSX ----------------
    return (
        <main className="col-12 " id="main">
            <div className="l-container py-4">
                {/* Breadcrumb */}
                <nav aria-label="breadcrumb" className="mb-3">
                    <ol className="breadcrumb x-breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="/">Home</a>
                        </li>
                        <li className="breadcrumb-item">
                            <a href="/account">Account</a>
                        </li>
                        <li className="breadcrumb-item active">Order History</li>
                    </ol>
                </nav>

                {/* Page Header */}
                <div className="row gy-3 align-items-stretch">
                    <div className="col-12 col-lg-7">
                        <div className="x-card h-100">
                            <div className="x-card__body d-flex justify-content-between align-items-center flex-wrap gap-2">
                                <div>
                                    <h1 className="h3 mb-1">Order History</h1>
                                    <p className="u-text-muted mb-0">Review, track, and manage your past and current orders.</p>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <div className="form-check form-switch">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="roleSwitch"
                                            checked={!isB2B}
                                            onChange={() => setIsB2B(!isB2B)}
                                        />
                                        <label className="form-check-label" htmlFor="roleSwitch">
                                            <span className="badge text-bg-light">View as {isB2B ? "B2B" : "B2C"}</span>
                                        </label>
                                    </div>
                                    <a className="x-btn x-btn--secondary" href="/products">
                                        <i className="fa-solid fa-flask-vial"></i>
                                        <span className="ms-1">Shop Products</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="col-12 col-lg-5">
                        <div className="x-card h-100">
                            <div className="x-card__header">
                                <strong>
                                    <i className="fa-solid fa-chart-line me-2"></i> Orders (last 6 months)
                                </strong>
                            </div>
                            <div className="x-card__body" style={{ height: 200 }}>
                                <Line data={chartData} />
                            </div>
                        </div>
                    </div>
                </div>

                <div aria-label="Search and filter orders" className="c-search-filter mt-4" role="region">
                    <div className="x-search d-flex align-items-center mb-3">
                        <i className="fa-solid fa-magnifying-glass u-text-muted me-2"></i>
                        <input
                            aria-label="Search orders"
                            className="form-control form-control-sm border-0"
                            placeholder="Search by Order ID or Product..."
                            type="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                aria-label="Clear search"
                                className="btn btn-link btn-sm ms-2 text-decoration-none u-text-muted"
                                type="button"
                                onClick={() => setSearchTerm("")}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        )}
                    </div>

                    <div className="d-flex flex-wrap align-items-center gap-2">
                        {/* Status Filter */}
                        <div className="d-flex align-items-center gap-2">
                            <label className="x-label mb-0" htmlFor="statusSelect">
                                Status
                            </label>
                            <select
                                className="form-select form-select-sm x-select"
                                value={STATUSES.includes(statusFilter) ? statusFilter : "All"}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option>All</option>
                                <option>Processing</option>
                                <option>Shipped</option>
                                <option>Delivered</option>
                                <option>Cancelled</option>
                                <option>Returned</option>
                            </select>
                        </div>

                        {/* Date Range Filter */}
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                            <label className="x-label mb-0" htmlFor="fromDate">From</label>
                            <input
                                type="date"
                                className="form-control form-control-sm x-input"
                                value={fmtDate(dateFrom)}
                                onChange={(e) => setDateFrom(e.target.value)}
                            />
                            <label className="x-label mb-0" htmlFor="toDate">To</label>
                            <input
                                type="date"
                                className="form-control form-control-sm x-input"
                                value={fmtDate(dateTo)}
                                onChange={(e) => setDateTo(e.target.value)}
                            />
                        </div>

                        {/* Reset Button */}
                        <div className="d-flex align-items-center gap-2">
                            <button className="btn btn-outline-secondary btn-sm" onClick={resetFilters}>
                                <i className="fa-solid fa-rotate-left me-1"></i>
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results & Status legend */}
                <div className="d-flex justify-content-between align-items-center mt-3 u-text-muted small">
                    <div>
                        <span id="resultsText">
                            {state.orders.length > 0
                                ? `Showing ${(state.currentPage - 1) * state.pageSize + 1}–${Math.min(
                                    state.currentPage * state.pageSize,
                                    state.orders.length
                                )} of ${state.orders.length} orders`
                                : "Showing 0 orders"}
                        </span>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        {["Delivered", "Shipped", "Processing", "Cancelled/Returned"].map(
                            (status) => (
                                <div
                                    key={status}
                                    className="d-flex align-items-center gap-2"
                                >
                                    <span
                                        className={`c-status ${status.includes("Delivered")
                                            ? "c-status--success"
                                            : status.includes("Shipped")
                                                ? "c-status--info"
                                                : status.includes("Processing")
                                                    ? "c-status--warning"
                                                    : "c-status--danger"
                                            }`}
                                    >
                                        <span className="c-status__dot"></span>
                                        {status}
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Orders Table */}
                <div className="x-card mt-3">
                    <div className="x-card__body p-0">
                        <div className="table-responsive">
                            <table className="table x-table mb-0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        {isB2B && <th>Purchaser</th>}
                                        <th className="text-end">Total</th>
                                        <th>Status</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedOrders.map((o, index) => (
                                        <tr key={o.orderId}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <a href={`/order/${o.orderId}`} className="fw-bold">
                                                    {o.orderId}
                                                </a>
                                            </td>
                                            <td>{fmtDate(o.orderDate)}</td>
                                            {isB2B && <td>{o.purchaserName}</td>}
                                            <td className="text-end">{currency.format(o.totalAmount)}</td>

                                            <td>
                                                {
                                                    (() => {
                                                        const status = o.status;
                                                        const map: Record<StatusType, string> = {
                                                            Delivered: "x-badge x-badge--success",
                                                            Shipped: "x-badge", // default neutral
                                                            Processing: "x-badge x-badge--warning",
                                                            Cancelled: "x-badge x-badge--danger",
                                                            Returned: "x-badge x-badge--danger",
                                                        };
                                                        const cls = map[status as StatusType] || "x-badge";
                                                        const icon =
                                                            status === "Delivered"
                                                                ? "fa-circle-check"
                                                                : status === "Shipped"
                                                                    ? "fa-truck-fast"
                                                                    : status === "Processing"
                                                                        ? "fa-rotate"
                                                                        : "fa-circle-xmark";
                                                        return (
                                                            <span className={cls}>
                                                                <i className={`fa-solid ${icon}`}></i> {status}
                                                            </span>
                                                        );
                                                    })()
                                                }

                                            </td>
                                            <td className="text-end">
                                                <div className="btn-group">
                                                    <a href={`/order/${o.orderId}`} className="btn btn-sm btn-outline-primary">
                                                        <i className="fa-solid fa-eye"></i> View
                                                    </a>
                                                    <button
                                                        onClick={() => showInvoice(o.orderId)}
                                                        className="btn btn-sm btn-outline-secondary"
                                                    >
                                                        <i className="fa-solid fa-file-pdf"></i> Invoice
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {paginatedOrders.length === 0 && (
                            <div className="text-center py-5">
                                <h2 className="h5">You have no orders yet.</h2>
                                <p className="u-text-muted">Browse our catalog and place your first order.</p>
                                <a className="x-btn x-btn--primary" href="/products">
                                    <i className="fa-solid fa-flask me-1"></i> Explore Products
                                </a>
                            </div>
                        )}
                        {/* Pagination */}
                        <div className="x-card__footer d-flex flex-wrap justify-content-between align-items-center gap-2">
                            <div className="small u-text-muted" id="paginationText">
                                Page {state.currentPage} of {totalPages || 1}
                            </div>
                            <nav aria-label="Orders pagination" className="x-pagination">
                                <button
                                    aria-label="Previous page"
                                    className="x-page btn"
                                    onClick={handlePrev}
                                    disabled={state.currentPage === 1}
                                >
                                    <i className="fa-solid fa-chevron-left"></i>
                                </button>

                                {/* Page numbers */}
                                <div
                                    className="d-inline-flex align-items-center gap-2"
                                    id="pageNumbers"
                                >
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                        (pageNum) => (
                                            <button
                                                key={pageNum}
                                                onClick={() => setPage(pageNum)}
                                                className={`x-page btn ${pageNum === state.currentPage ? "active" : ""
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        )
                                    )}
                                </div>

                                <button
                                    aria-label="Next page"
                                    className="x-page btn"
                                    onClick={handleNext}
                                    disabled={state.currentPage === totalPages || totalPages === 0}
                                >
                                    <i className="fa-solid fa-chevron-right"></i>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
