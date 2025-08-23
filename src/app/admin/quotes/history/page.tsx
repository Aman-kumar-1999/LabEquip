



"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Swal from "sweetalert2";
import { join } from "path";
// import flatpickr from "flatpickr";

// Register chart
ChartJS.register(ArcElement, Tooltip, Legend);

type Quote = {
  quoteId: string;
  creationDate: string;
  status: "Pending" | "Ready" | "Accepted" | "Rejected" | "Expired";
  totalAmount: number | null;
};

// Mock data
const QUOTES: Quote[] = [
  { quoteId: "Q-2025-00098", creationDate: "2025-06-12", status: "Pending", totalAmount: null },
  { quoteId: "Q-2025-00097", creationDate: "2025-06-09", status: "Ready", totalAmount: 125000 },
  { quoteId: "Q-2025-00096", creationDate: "2025-06-01", status: "Accepted", totalAmount: 78650.5 },
  { quoteId: "Q-2025-00095", creationDate: "2025-05-25", status: "Rejected", totalAmount: 45200 },
  { quoteId: "Q-2025-00094", creationDate: "2025-05-20", status: "Expired", totalAmount: 61300 },
  { quoteId: "Q-2025-00093", creationDate: "2025-05-10", status: "Accepted", totalAmount: 33000 },
];

export default function QuoteHistoryPage() {
  type StatusType = "Pending" | "Ready" | "Accepted" | "Rejected" | "Expired";
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filters, setFilters] = useState({ q: "", status: "", start: null as Date | null, end: null as Date | null });
  const [sort, setSort] = useState({ key: "creationDate", dir: "desc" as "asc" | "desc" });
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // Filter + Sort
  const filteredQuotes = useMemo(() => {
    let rows = [...QUOTES];
    if (filters.q) {
      const s = filters.q.trim().toLowerCase();
      rows = rows.filter(r => r.quoteId.toLowerCase().includes(s));
    }
    if (filters.status) rows = rows.filter(r => r.status === filters.status);
    if (filters.start && filters.end) {
      rows = rows.filter(
        r => new Date(r.creationDate) >= filters.start! && new Date(r.creationDate) <= filters.end!
      );
    }
    rows.sort((a, b) => {
      const va: any = a[sort.key as keyof Quote];
      const vb: any = b[sort.key as keyof Quote];
      if (sort.key === "creationDate") {
        return sort.dir === "asc" ? +new Date(va) - +new Date(vb) : +new Date(vb) - +new Date(va);
      }
      if (sort.key === "totalAmount") {
        return sort.dir === "asc" ? (va ?? -Infinity) - (vb ?? -Infinity) : (vb ?? -Infinity) - (va ?? -Infinity);
      }
      return sort.dir === "asc" ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
    });
    return rows;
  }, [filters, sort]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredQuotes.length / pageSize));
  const pagedQuotes = filteredQuotes.slice((page - 1) * pageSize, page * pageSize);

  // Chart Data
  const chartData = useMemo(() => {
    const counts = { Pending: 0, Ready: 0, Accepted: 0, Rejected: 0, Expired: 0 };
    for (const q of filteredQuotes) counts[q.status]++;
    return {
      labels: Object.keys(counts),
      datasets: [
        {
          data: Object.values(counts),
          backgroundColor: ["#FFA500", "#8080FF", "#00774E", "#CD2026", "#6C757D"],
          borderWidth: 0,
        },
      ],
    };
  }, [filteredQuotes]);

  // Format helpers
  const fmtDate = (iso: string) =>
    new Intl.DateTimeFormat("en-IN", { year: "numeric", month: "short", day: "2-digit" }).format(new Date(iso));
  const fmtMoney = (n: number | null) =>
    n == null ? "—" : new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);

  const handleSort = (key: keyof Quote) => {
    setSort(prev => (prev.key === key ? { ...prev, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));
    setPage(1);
  };

  return (
    <main className="col-12 col-lg-12 col-xl-12 p-3">
      {/* Breadcrumb */}
      <nav className="x-breadcrumb mb-3">
        <Link href="/home_page">Home</Link> / <Link href="/user_dashboard">Account</Link> /{" "}
        <span>Quote History</span>
      </nav>

      {/* Page Header */}
      <div className="x-card mb-4">
        <div className="x-card__header d-flex justify-between items-center">
          <div className="d-flex align-items-center gap-3">
            <i className="fa-solid fa-file-signature u-text-primary" />
            <div>
              <h2 className="m-0">Quote History</h2>
              <p className="m-0 u-text-muted">View, filter, and track your organization's quote requests.</p>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button className="x-btn x-btn--secondary" onClick={() => Swal.fire("Refreshed!")}>
              <i className="fa-solid fa-rotate" /> Refresh
            </button>
            <Link className="x-btn x-btn--primary" href="/quote_details">
              <i className="fa-solid fa-plus" /> New Quote
            </Link>
          </div>
        </div>

        <div className="x-card__body">
          {/* Chart */}
          <div className="row mt-3 g-3">
            <div className="col-12 col-lg-6">
              <div className="x-card h-100">
                <div className="x-card__header">
                  <strong>Status Distribution</strong>
                </div>
                <div className="x-card__body">
                  <Doughnut data={chartData} />
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="x-card mt-4">
            <div className="x-card__body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0 x-table">
                  <thead>
                    <tr>
                      <th onClick={() => handleSort("quoteId")}>Quote ID</th>
                      <th onClick={() => handleSort("creationDate")}>Created</th>
                      <th onClick={() => handleSort("status")}>Status</th>
                      <th className="text-end" onClick={() => handleSort("totalAmount")}>Total Amount</th>
                      <th className="text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedQuotes.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center p-4">No quotes found.</td>
                      </tr>
                    ) : (
                      pagedQuotes.map(q => (
                        <tr key={q.quoteId}>
                          <td><b>{q.quoteId}</b></td>
                          <td>{fmtDate(q.creationDate)}</td>

                          {/* <td>{q.status}</td> */}

                          <td>
                            {
                              (() => {
                                const status = q.status;
                                const map: Record<StatusType, string> = {
                                  'Pending': 'x-badge x-badge--warning',
                                  'Ready': 'x-badge x-badge--info',
                                  'Accepted': 'x-badge x-badge--success',
                                  'Rejected': 'x-badge x-badge--danger',
                                  'Expired': 'x-badge',
                                  
                                };
                                const cls = map[status as StatusType] || "x-badge";
                                const icon =
                                  status === "Pending"
                                    ? "fa-clock"
                                    : status === "Ready"
                                      ? "fa-circle-check"
                                      : status === "Accepted"
                                        ? "fa-thumbs-up"
                                        : status === "Rejected"
                                          ? "fa-circle-xmark"
                                          : status === "Expired"
                                            ? "fa-hourglass-end"
                                            : "fa-question";
                                return (
                                  <span className={cls}>
                                    <i className={`fa-solid ${icon}`}></i> {status}
                                  </span>
                                );
                              })()
                            }

                          </td>

                          <td className="text-end">{fmtMoney(q.totalAmount)}</td>
                          <td className="text-end">
                            <Link className="x-btn x-btn--secondary x-btn--sm" href={`/quote_details?quoteId=${q.quoteId}`}>
                              <i className="fa-regular fa-eye" /> View Details
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="x-card__footer d-flex justify-content-between align-items-center">
              <div>Page {page} of {totalPages}</div>
              <span className=""></span>
              <div className="x-pagination d-flex gap-2">
                <button className="x-btn x-btn--outline x-btn--sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
                  <i className="fa-solid fa-chevron-left" />
                </button>
                <span>{page}</span>
                <button className="x-btn x-btn--outline x-btn--sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
                  <i className="fa-solid fa-chevron-right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
