"use client";

import { useEffect, useState, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
// import dayjs from "dayjs";
import Swal from "sweetalert2";
// import '../../../css/quote-details.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const fmtCurrency = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
});

export default function QuotesDetailsPage() {

    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState("B2B");
    const [quote, setQuote] = useState({
        id: "Q-2025-000123",
        status: "Pending",
        createdAt: "2025-08-01T10:24:00Z",
        expiresAt: "2025-08-31T23:59:59Z",
        organization: { name: "Acme Research Labs Pvt Ltd" },
        requester: { name: "Dr. Alice Smith" },
        shipping: 1200.0,
        items: [
            {
                id: 1,
                name: "Analytical Balance 0.1 mg",
                sku: "BAL-AN-001",
                qty: 2,
                unitPrice: 1850.0,
                img: "https://picsum.photos/seed/balance/80/80",
            },
            {
                id: 2,
                name: "Centrifuge 20k RPM",
                sku: "CEN-20K-042",
                qty: 1,
                unitPrice: 9200.0,
                img: "https://picsum.photos/seed/centrifuge/80/80",
            },
            {
                id: 3,
                name: "Microscope Trinocular 1000x",
                sku: "MIC-TRI-100",
                qty: 1,
                unitPrice: 5400.0,
                img: "https://picsum.photos/seed/microscope/80/80",
            },
            {
                id: 4,
                name: "Pipette Single Channel 10-100µL",
                sku: "PIP-SC-110",
                qty: 5,
                unitPrice: 120.0,
                img: "https://picsum.photos/seed/pipette/80/80",
            },
            {
                id: 5,
                name: "Reagent: Acetone, ACS Grade, 4L",
                sku: "REA-ACE-4L",
                qty: 3,
                unitPrice: 35.5,
                img: "https://picsum.photos/seed/acetone/80/80",
            },
            {
                id: 6,
                name: "Refrigerated Incubator 150L",
                sku: "INC-REF-150",
                qty: 1,
                unitPrice: 4100.0,
                img: "https://picsum.photos/seed/incubator/80/80",
            },
        ],
    });
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("name-asc");
    const isAdmin = userRole === "ADMIN";
    const isEditable = isAdmin && quote.status === "Pending";

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

    const items = useMemo(() => {
        let filtered = [...quote.items];
        if (search) {
            filtered = filtered.filter(
                (i) =>
                    i.name.toLowerCase().includes(search.toLowerCase()) ||
                    i.sku.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (sort === "name-asc") filtered.sort((a, b) => a.name.localeCompare(b.name));
        if (sort === "price-asc") filtered.sort((a, b) => a.unitPrice - b.unitPrice);
        if (sort === "price-desc") filtered.sort((a, b) => b.unitPrice - a.unitPrice);
        if (sort === "qty-desc") filtered.sort((a, b) => b.qty - a.qty);
        return filtered;
    }, [quote.items, search, sort]);

    const totals = useMemo(() => {
        const subtotal = items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
        const taxes = subtotal * 0.18;
        const shipping = quote.shipping;
        return { subtotal, taxes, shipping, grand: subtotal + taxes + shipping };
    }, [items, quote.shipping]);

    const chartData = {
        labels: ["Subtotal", "Taxes", "Shipping"],
        datasets: [
            {
                data: [totals.subtotal, totals.taxes, totals.shipping],
                backgroundColor: ["#4D4DFF", "#0099D2", "#FFA500"],
                borderWidth: 0,
            },
        ],
    };

    const handleAccept = async () => {
        const result = await Swal.fire({
            icon: "question",
            title: "Accept this quote?",
            showCancelButton: true,
            confirmButtonText: "Accept & Checkout",
        });
        if (result.isConfirmed) setQuote({ ...quote, status: "Approved" });
    };

    const handleReject = async () => {
        const result = await Swal.fire({
            icon: "warning",
            title: "Reject this quote?",
            showCancelButton: true,
            confirmButtonText: "Reject",
        });
        if (result.isConfirmed) setQuote({ ...quote, status: "Rejected" });
    };

    const handleSend = async () => {
        const result = await Swal.fire({
            icon: "question",
            title: "Send finalized quote?",
            showCancelButton: true,
            confirmButtonText: "Send Quote",
        });
        if (result.isConfirmed) setQuote({ ...quote, status: "Ready" });
    };

    const handleConvert = async () => {
        await Swal.fire({ icon: "success", title: "Converted to order!" });
    };

    const handlePriceChange = (id: number, newPrice: string) => {
        setQuote((prev) => ({
            ...prev,
            items: prev.items.map((it) =>
                it.id === id ? { ...it, unitPrice: parseFloat(newPrice) || 0 } : it
            ),
        }));
    };
    return (
        <main className="col-12 col-lg-12 col-xl-12 py-4 position-relative">
            <div className="l-container">
                {/* Breadcrumb */}
                <nav className="x-breadcrumb mb-3">
                    <a href="/">Home</a> › <a href="/quotes">Quotes</a> › Quote Details
                </nav>

                {/* Title + Controls */}
                <div className="d-flex flex-wrap align-items-center justify-content-between mb-3 gap-2">
                    <h1>Quote Details</h1>
                    <div className="d-flex align-items-center gap-2">
                        <input
                            className="form-control form-control-sm"
                            placeholder="Search product or SKU"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <select
                            className="form-select form-select-sm"
                            value={userRole}
                            onChange={(e) => setUserRole(e.target.value)}
                        >
                            <option value="B2B">B2B Customer</option>
                            <option value="ADMIN">Administrator</option>
                        </select>
                        <select
                            className="form-select form-select-sm"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="name-asc">Name A–Z</option>
                            <option value="price-asc">Price Low–High</option>
                            <option value="price-desc">Price High–Low</option>
                            <option value="qty-desc">Quantity High–Low</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="x-card a-shimmer mb-3" style={{ height: 200 }} />
                ) : (
                    <div id="contentArea">
                        {/* Quote Header */}
                        <section className="x-card mb-3">
                            <div className="x-card__body d-flex justify-content-between">
                                <h3>
                                    Quote <span>{quote.id}</span> ({quote.status})
                                </h3>
                                {/* <div className="text-end small text-muted">
                  <div>Created: {dayjs(quote.createdAt).format("MMM D, YYYY")}</div>
                  <div>Valid Until: {dayjs(quote.expiresAt).format("MMM D, YYYY")}</div>
                </div> */}
                            </div>
                        </section>

                        {/* Customer Info */}
                        <section className="x-card mb-3">
                            <div className="x-card__body row">
                                <div className="col-md-6">
                                    <div className="fw-bold">{quote.organization.name}</div>
                                </div>
                                <div className="col-md-6">
                                    <div className="fw-bold">{quote.requester.name}</div>
                                </div>
                            </div>
                        </section>

                        {/* Items */}
                        <section className="x-card mb-3">
                            <div className="x-card__header">
                                <strong>Quoted Items</strong>
                                <span className="badge">{items.length} Items</span>
                            </div>
                            <div className="x-card__body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>SKU</th>
                                            <th className="text-end">Qty</th>
                                            <th className="text-end">Unit Price</th>
                                            <th className="text-end">Line Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((it) => (
                                            <tr key={it.id}>
                                                <td>{it.name}</td>
                                                <td>{it.sku}</td>
                                                <td className="text-end">{it.qty}</td>

                                                <td className="text-end">
                                                    {isEditable ? (
                                                        <div className="input-group input-group-sm justify-content-end price-input-group">
                                                            <span className="input-group-text">$</span>
                                                            <input
                                                                type="number"
                                                                step="0.01"
                                                                min="0"
                                                                value={it.unitPrice.toFixed(2)}
                                                                onChange={(e) => handlePriceChange(it.id, e.target.value)}
                                                                className="form-control text-end price-input"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <>
                                                        {it.unitPrice.toFixed(2)}
                                                        </>
                                                    )}
                                                </td>
                                                <td className="text-end">
                                                    {fmtCurrency.format(it.qty * it.unitPrice)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Totals + Chart */}
                        <section className="row g-3 mb-5">
                            <div className="col-lg-7">
                                <div className="x-card h-100">
                                    <div className="x-card__header">Cost Breakdown</div>
                                    <div className="x-card__body">
                                        <Doughnut data={chartData} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="c-totals h-100">
                                    <div>Subtotal: {fmtCurrency.format(totals.subtotal)}</div>
                                    <div>Taxes: {fmtCurrency.format(totals.taxes)}</div>
                                    <div>Shipping: {fmtCurrency.format(totals.shipping)}</div>
                                    <hr />
                                    <div className="fw-bold">
                                        Grand Total: {fmtCurrency.format(totals.grand)}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}
            </div>

            {/* Sticky Action Bar */}
            <div className="quote-action-bar x-card p-2 border-top d-flex justify-content-between">
                <button className="x-btn" onClick={() => window.print()}>
                    Print / PDF
                </button>
                <div>
                    {userRole === "B2B" && quote.status === "Pending" && (
                        <>
                            <button className="x-btn x-btn--success" onClick={handleAccept}>
                                Accept
                            </button>
                            <button className="x-btn x-btn--danger" onClick={handleReject}>
                                Reject
                            </button>
                        </>
                    )}
                    {userRole === "ADMIN" && quote.status === "Pending" && (
                        <button className="x-btn x-btn--primary" onClick={handleSend}>
                            Send Quote
                        </button>
                    )}
                    {userRole === "ADMIN" && quote.status === "Approved" && (
                        <button className="x-btn x-btn--info" onClick={handleConvert}>
                            Convert to Order
                        </button>
                    )}
                </div>
            </div>
        </main>
    );
}
