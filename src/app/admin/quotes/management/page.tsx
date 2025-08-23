"use client";

import { JSX, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Currency formatter
const currencyFmt = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

// Mock data
const mockQuotes = [{
  id: 'Q-2025-00123',
  customer: 'Dr. Alice Wong / NovaBio Labs',
  date: '2025-08-01',
  status: 'Pending',
  total: 12850.00
}, {
  id: 'Q-2025-00118',
  customer: 'Eagle University / Chem Dept',
  date: '2025-07-29',
  status: 'Sent',
  total: 4520.75
}, {
  id: 'Q-2025-00105',
  customer: 'HelixGen Inc.',
  date: '2025-07-22',
  status: 'Approved',
  total: 9875.00
}, {
  id: 'Q-2025-00101',
  customer: 'Starlight Research Center',
  date: '2025-07-20',
  status: 'Rejected',
  total: 640.00
}, {
  id: 'Q-2025-00098',
  customer: 'Quantum Labs',
  date: '2025-07-19',
  status: 'Expired',
  total: 2100.00
}, {
  id: 'Q-2025-00090',
  customer: 'BlueRiver Biotech',
  date: '2025-07-15',
  status: 'Converted',
  total: 15420.99
}, {
  id: 'Q-2025-00087',
  customer: 'GreenLeaf Pharma',
  date: '2025-07-14',
  status: 'Pending',
  total: 3320.00
}, {
  id: 'Q-2025-00080',
  customer: 'Eagle University / BioSci',
  date: '2025-07-12',
  status: 'Sent',
  total: 1210.50
}, {
  id: 'Q-2025-00077',
  customer: 'Apex Diagnostics',
  date: '2025-07-11',
  status: 'Approved',
  total: 7350.00
}, {
  id: 'Q-2025-00070',
  customer: 'MedCore Hospital Group',
  date: '2025-07-08',
  status: 'Converted',
  total: 18990.00
}, {
  id: 'Q-2025-00065',
  customer: 'BioNexus Labs',
  date: '2025-07-06',
  status: 'Pending',
  total: 890.00
}, {
  id: 'Q-2025-00055',
  customer: 'Orion Institute',
  date: '2025-07-01',
  status: 'Rejected',
  total: 420.00
},];

export default function QuoteManagementPage() {
  const router = useRouter();

  type StatusType = "Pending" | "Sent" | "Approved" | "Rejected" | "Expired" | "Converted";

  const [quotes, setQuotes] = useState(mockQuotes);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" }>({
    key: "date",
    dir: "desc",
  });
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });

  // Filtering + sorting
  const filtered = useMemo(() => {
    let data = [...quotes];
    if (search) {
      data = data.filter(
        (q) =>
          q.id.toLowerCase().includes(search.toLowerCase()) ||
          q.customer.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (statusFilter) {
      data = data.filter((q) => q.status === statusFilter);
    }
    data.sort((a, b) => {
      let va: any = a[sort.key as keyof typeof a];
      let vb: any = b[sort.key as keyof typeof b];
      if (sort.key === "date") {
        va = new Date(a.date).getTime();
        vb = new Date(b.date).getTime();
      }
      if (sort.key === "total") {
        va = Number(a.total);
        vb = Number(b.total);
      }
      return sort.dir === "asc" ? va - vb : vb - va;
    });
    return data;
  }, [quotes, search, statusFilter, sort]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Pagination logic
  //const totalPages = Math.ceil(filteredOrders.length / pageSize) || 1;
  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  // Chart data
  const chartData = useMemo(() => {
    const counts: Record<string, number> = {
      Pending: 0,
      Sent: 0,
      Approved: 0,
      Rejected: 0,
      Expired: 0,
      Converted: 0,
    };
    filtered.forEach((q) => {
      counts[q.status] = (counts[q.status] || 0) + 1;
    });
    return {
      labels: Object.keys(counts),
      datasets: [
        {
          label: "Count",
          data: Object.values(counts),
          backgroundColor: "#000080",
        },
      ],
    };
  }, [filtered]);

  // Actions
  const handleRowAction = (id: string, action: string) => {
    if (action === "view") {
      router.push(`/quote-details/${id}`);
    }
    if (action === "send") {
      Swal.fire("Quote Sent", `Quote ${id} sent to customer.`, "success");
    }
    if (action === "reject") {
      Swal.fire("Rejected", `Quote ${id} has been rejected.`, "error");
      setQuotes((prev) =>
        prev.map((q) => (q.id === id ? { ...q, status: "Rejected" } : q))
      );
    }
  };

  const Pagination = () => {
    const pages: JSX.Element[] = [];
    const addItem = (label: string, page: number, disabled = false, active = false) => {
      pages.push(
        <li key={label + page} className={`page-item ${disabled ? "disabled" : ""} ${active ? "active" : ""}`}>
          <a
            href="#"
            className="page-link"
            onClick={(e) => {
              e.preventDefault();
              if (!disabled && page !== page) {
                setPage(page);
              }
            }}
          >
            {label}
          </a>
        </li>
      );
    };

    addItem("«", Math.max(1, page - 1), page === 1);
    for (let i = 1; i <= totalPages; i++) addItem(String(i), i, false, i === page);
    addItem("»", Math.min(totalPages, page + 1), page === totalPages);

    return <ul className="pagination">{pages}</ul>;
  };

  return (
    <main className="app-main flex-grow-1 p-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb m-0">
          <li className="breadcrumb-item">
            <a href="/admin">Admin</a>
          </li>
          <li className="breadcrumb-item active">Quote Management</li>
        </ol>
      </nav>

      {/* Page header */}
      <div className="x-card mb-4">
        <div className="x-card__body d-flex flex-wrap justify-between items-center gap-3">
          <div>
            <h1 className="h3 m-0">Admin Quote Management</h1>
            <p className="u-text-muted mb-0">
              Review, price, and process B2B quote requests.
            </p>
          </div>
          <div className="d-flex gap-2">
            <button
              className="x-btn x-btn--secondary"
              onClick={() => Swal.fire("Refreshed", "Data refreshed.", "info")}
            >
              <i className="fa-solid fa-rotate me-2">
              </i>
              Refresh
            </button>
            <button
              className="x-btn x-btn--secondary"
              onClick={() => Swal.fire("Exported", "CSV export started.", "success")}
            ><i className="fa-solid fa-file-arrow-down me-2">
              </i>
              Export CSV
            </button>
            <button
              className="x-btn x-btn--primary"
              onClick={() => router.push("/quote-details/new")}
            >
              <i className="fa-solid fa-plus me-2">
              </i>
              Create Manual Quote
            </button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="x-toolbar mb-4 d-flex flex-wrap justify-between items-center gap-3">
        <div className="d-flex items-center gap-3">
          <input
            type="search"
            placeholder="Search by Quote ID or Customer"
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option>Pending</option>
            <option>Sent</option>
            <option>Approved</option>
            <option>Rejected</option>
            <option>Expired</option>
            <option>Converted</option>
          </select>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div className="dropdown">
            <button
              aria-expanded="false"
              className="x-btn x-btn--secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              type="button"
            >
              <i className="fa-solid fa-layer-group me-2"></i>
              Bulk Actions
            </button>
            <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item" id="bulkSend">
                  Send Quotes
                </button>
              </li>
              <li>
                <button className="dropdown-item" id="bulkApprove">
                  Approve
                </button>
              </li>
              <li>
                <button className="dropdown-item text-danger" id="bulkReject">
                  Reject
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>


      {/* Table */}
      <div className="x-card p-3">
        <div className="table-responsive">
          <table className="table x-table align-middle">
            <thead>
              <tr>
                <th scope="col" style={{ width: "30px" }}>
                  <input className="form-check-input" id="selectAll" type="checkbox" />
                </th>
                <th>Quote ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-end">Total</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((q) => (
                <tr key={q.id}>
                  <td scope="col" style={{ width: "36px" }}>
                    <input className="form-check-input" id={`select-${q.id}`} type="checkbox" />
                  </td>
                  <td className="fw-bold">{q.id}</td>
                  <td className="text-truncate">{q.customer}</td>
                  <td>
                    {fmtDate(q.date)}
                  </td>
                  <td>
                    {
                      (() => {
                        const status = q.status;
                        const map: Record<StatusType, string> = {
                          'Pending': 'x-badge x-badge--warning',
                          'Sent': 'x-badge',
                          'Approved': 'x-badge x-badge--success',
                          'Rejected': 'x-badge x-badge--danger',
                          'Expired': 'x-badge',
                          'Converted': 'x-badge u-bg-primary'
                        };
                        const cls = map[status as StatusType] || "x-badge";
                        const icon =
                          status === "Pending"
                            ? "fa-clock"
                            : status === "Sent"
                              ? "fa-paper-plane"
                              : status === "Approved"
                                ? "fa-circle-check"
                                : status === "Rejected"
                                  ? "fa-circle-xmark"
                                  : status === "Expired"
                                    ? "fa-hourglass-end"
                                    : status === "Converted"
                                      ? "fa-repeat"
                                      : "fa-question";
                        return (
                          <span className={cls}>
                            <i className={`fa-solid ${icon}`}></i> {status}
                          </span>
                        );
                      })()
                    }

                  </td>
                  <td className="text-end">{currencyFmt.format(q.total)}</td>

                  <td className="text-end">
                    <div className="btn-group" role="group">
                      <a href="./quote_details.html?quoteId=${encodeURIComponent(q.id)}" className="btn btn-sm btn-outline-primary"><i className="fa-regular fa-eye me-1"></i> View</a>
                      <button className="btn btn-sm btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="visually-hidden">Toggle Dropdown</span>
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li><button className="dropdown-item" onClick={() => handleRowAction(q.id, "send")} data-action="send" data-id="${q.id}"><i className="fa-solid fa-paper-plane me-2"></i>Send Quote</button></li>
                        <li><button className="dropdown-item" onClick={() => handleRowAction(q.id, "remind")} data-action="remind" data-id="${q.id}"><i className="fa-regular fa-bell me-2"></i>Send Reminder</button></li>
                        <li>
                          <hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item text-danger" onClick={() => handleRowAction(q.id, "reject")} data-action="reject" data-id="${q.id}"><i className="fa-solid fa-xmark me-2"></i>Reject</button></li>
                      </ul>
                    </div>
                  </td>

                  {/* <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleRowAction(q.id, "view")}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleRowAction(q.id, "send")}
                    >
                      Send
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRowAction(q.id, "reject")}
                    >
                      Reject
                    </button>
                  </td> */}
                </tr>
              ))}
              {pageData.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No quotes found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          {/* Left side info */}
          <div className="text-muted small" id="paginationInfo">
            Showing {(page - 1) * pageSize + 1}–
            {Math.min(page * pageSize, filtered.length)} of {filtered.length}
          </div>

          {/* Right side pagination */}
          <div>
            <ul className="pagination mb-0">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <li key={p} className="page-item">
                  <button
                    className={`page-link ${p === page ? "active" : ""}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* Chart */}
      <div className="x-card mt-4 p-3">
        <h3 className="h5">Quotes by Status (Last 30 Days)</h3>
        <Bar data={chartData} height={120} />
      </div>
    </main>
  );
}
