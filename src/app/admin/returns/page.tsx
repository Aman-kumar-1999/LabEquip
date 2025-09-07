"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import Image from "next/image";
import '../../css/return_request.css';

type OrderItem = {
  id: string;
  name: string;
  sku: string;
  image: string;
  purchasedQty: number;
  price: number;
};

type Order = {
  id: string;
  date: string;
  paymentStatus: string;
  fulfillmentStatus: string;
  currency: string;
  items: OrderItem[];
};
// Mock data loader
const mockOrder = () => ({
  id: "ORD-10234",
  date: "2025-07-28",
  paymentStatus: "Paid",
  fulfillmentStatus: "Delivered",
  currency: "USD",
  items: [
    {
      id: "SKU-AX100",
      name: "Precision Micropipette 10-100µL",
      sku: "AX100",
      image: "/assets/product_image_for_returnable_i_1_11744e8c.jpg",
      purchasedQty: 2,
      price: 129.99,
    },
    {
      id: "SKU-CF200",
      name: "Mini Centrifuge 7000 RPM",
      sku: "CF200",
      image: "/assets/product_image_for_returnable_i_2_361ad6c6.jpg",
      purchasedQty: 1,
      price: 259.0,
    },
    {
      id: "SKU-RG500",
      name: "Analytical Reagent - Sodium Chloride 500g",
      sku: "RG500",
      image: "/assets/product_image_for_returnable_i_3_d8aaf555.jpg",
      purchasedQty: 5,
      price: 19.5,
    },
    {
      id: "SKU-MS900",
      name: "Lab Microscope LED BX-900",
      sku: "MS900",
      image: "/assets/product_image_for_returnable_i_4_edef9465.jpg",
      purchasedQty: 1,
      price: 799.0,
    },
    {
      id: "SKU-TI050",
      name: "Titanium Lab Tongs 20cm",
      sku: "TI050",
      image: "/assets/product_image_for_returnable_i_5_156645ae.jpg",
      purchasedQty: 3,
      price: 34.75,
    },
  ],
});

function formatMoney(v: number, currency: string = "INR") {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
    }).format(v);
  } catch (e) {
    return `$${v.toFixed(2)}`;
  }
}

export default function RequestReturnPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  // const [selected, setSelected] = useState({}); // itemId -> { qty, reason }
  const [selected, setSelected] = useState<{ [key: string]: { qty: number; reason: string } }>({});
  const [search, setSearch] = useState("");
  const [reasonFilter, setReasonFilter] = useState("");
  const [sort, setSort] = useState("name-asc");
  const [comments, setComments] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Load order on mount
  useEffect(() => {
    //const id = params.get("orderId") || "ORD-10234";
    setOrder(mockOrder());
  }, [params]);

  // Filter + sort
  const filteredItems = useMemo(() => {
    if (!order) return [];
    let arr = order.items.filter((it) => {
      const inText =
        !search ||
        it.name.toLowerCase().includes(search.toLowerCase()) ||
        it.sku.toLowerCase().includes(search.toLowerCase());
      if (!inText) return false;
      if (!reasonFilter) return true;
      const sel = selected[it.id];
      return sel && sel.reason === reasonFilter;
    });
    switch (sort) {
      case "name-asc":
        arr.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        arr.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "qty-desc":
        arr.sort((a, b) => b.purchasedQty - a.purchasedQty);
        break;
      case "qty-asc":
        arr.sort((a, b) => a.purchasedQty - b.purchasedQty);
        break;
    }
    return arr;
  }, [order, search, reasonFilter, sort, selected]);

  // Pagination
  const start = (page - 1) * pageSize;
  const pageItems = filteredItems.slice(start, start + pageSize);

  // Summary
  const summary = useMemo(() => {
    let qty = 0,
      total = 0;
    const ids = Object.keys(selected);
    ids.forEach((id) => {
      const it = order?.items.find((x) => x.id === id);
      const sel = selected[id];
      if (it && sel) {
        qty += sel.qty;
        total += sel.qty * it.price;
      }
    });
    return {
      count: ids.length,
      qty,
      total,
    };
  }, [selected, order]);

  // Submit handler
  async function handleSubmit() {
    const payload = {
      orderId: order?.id,
      items: Object.entries(selected).map(([id, sel]) => ({
        itemId: id,
        quantity: sel.qty,
        reason: sel.reason,
      })),
      comments,
    };

    const totalLines = payload.items.reduce((acc, it) => acc + it.quantity, 0);
    const result = await Swal.fire({
      title: "Submit Return Request?",
      html: `<div className="text-start"><p>You are submitting a return for <strong>${payload.items.length}</strong> item(s), total quantity <strong>${totalLines}</strong>.</p><p>Order: <code>#${order?.id}</code></p></div>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, submit",
      cancelButtonText: "Review again",
      confirmButtonColor: "#000080",
    });

    if (!result.isConfirmed) return;

    await new Promise((res) => setTimeout(res, 1000));
    await Swal.fire({
      title: "Request Submitted",
      text: "Your return request has been submitted successfully.",
      icon: "success",
      confirmButtonColor: "#000080",
    });

    router.push(`/order_details?orderId=${order?.id}&return=submitted`);
  }

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });


  if (!order) return <div>Loading…</div>;

  return (
    <main className="container my-4">
      {/* Breadcrumb */}
      <nav className="mb-3 text-sm text-gray-600">
        <a href="/home">Home</a> / <a href="/order_history">Order History</a> /
        <a href={`/order_details?orderId=${order?.id}`}> Order #{order?.id}</a> /
        <span className="font-semibold"> Request Return</span>
      </nav>

      {/* Hero */}
      <section className="x-card p-0 overflow-hidden mb-4">
        <div className="row g-0 align-items-center">
          <div className="col-lg-7 p-4">
            <h1 className="x-hero__title h2 mb-2">Request a Return</h1>
            <p className="x-hero__subtitle fs-6 text-muted mb-3">
              Select the items you want to return from your order, specify
              quantities and reasons, and submit your request.
            </p>
            <div className="c-steps mb-2">
              <div className="c-step is-active"> <span className="c-step__dot">
              </span>1. Select Items</div>
              <div className="c-step"> <span className="c-step__dot">
              </span>2. Add Details</div>
              <div className="c-step"> <span className="c-step__dot">
              </span>3. Submit</div>
            </div>
            <small className="text-muted">
              <i className="fa-regular fa-circle-question me-1" data-bs-toggle="tooltip"
                title="Eligible items can be returned within 30 days of delivery.">
              </i>
              Need help? Contact support from your order details page.
            </small>
          </div>
          <div className="col-lg-5 p-3 text-center bg-light-subtle">
            <Image
              src="/assets/return_process_illustration_1_9d703c11.jpg"
              alt="Return illustration"
              width={400}
              height={200}
              className="img-fluid return-hero-illustration"
            />
          </div>
        </div>
      </section>

      {/* Order summary */}
      <section className="x-card mb-4">
        <div className="x-card__body">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">



            <div className="d-flex align-items-center gap-3">
              <div className="u-bg-surface u-rounded u-shadow-sm p-2">
                <i className="fa-solid fa-file-invoice fa-lg u-text-primary"></i>
              </div>
              <div>
                <div className="fw-bold">Order ID: # - {order.id}</div>
                <small className="text-muted">
                  Placed on: {new Date(order.date).toLocaleDateString()}
                </small>
              </div>

            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="x-badge">
                <i className="fa-solid fa-check"></i>
                {order.paymentStatus}
              </span>
              <span className="x-badge">
                <i className="fa-solid fa-truck"></i>
                {order.fulfillmentStatus}
              </span>
            </div>
          </div>
        </div>

      </section>
      <div className="row g-4">
        <div className="col-lg-8">
          {/* <!-- Toolbar: Search, Filters, Sort --> */}
          <div className="x-toolbar mb-3">
            <div className="x-search" role="search">
              <i className="fa-solid fa-magnifying-glass">
              </i>
              <input aria-label="Search products" className="form-control form-control-sm border-0"
                placeholder="Search…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                id="searchInput" />
            </div>
            <div className="d-flex flex-wrap align-items-center gap-2">
              <div className="form-check me-2">
                <input className="form-check-input" id="selectAllChk" type="checkbox" />
                <label className="form-check-label" htmlFor="selectAllChk">
                  Select All
                </label>
              </div>
              <select aria-label="Filter by reason" value={reasonFilter}
                onChange={(e) => setReasonFilter(e.target.value)} className="form-select form-select-sm" id="reasonFilter">
                <option value="">
                  Filter: Any Reason
                </option>
                <option>
                  Damaged Item
                </option>
                <option>
                  Wrong Item Received
                </option>
                <option>
                  No Longer Needed
                </option>
                <option>
                  Other
                </option>
              </select>
              <select aria-label="Sort items"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="form-select form-select-sm" id="sortSelect">
                <option value="name-asc">
                  Sort: Name (A→Z)
                </option>
                <option value="name-desc">
                  Name (Z→A)
                </option>
                <option value="qty-desc">
                  Purchased Qty (High→Low)
                </option>
                <option value="qty-asc">
                  Purchased Qty (Low→High)
                </option>
              </select>
            </div>
          </div>
          {/* <!-- Items Table --> */}

          <div className="x-card p-3">
            <div className="table-responsive">
              <table className="table x-table align-middle">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "30px" }}>
                      Select
                      {/* <input className="form-check-input" id="selectAll" type="checkbox" /> */}
                    </th>
                    <th scope="col" style={{ width: "30px" }}>Product ID</th>
                    <th scope="col" style={{ width: "30px" }}>Product Name</th>
                    <th scope="col" style={{ width: "30px" }}>Purchased</th>
                    <th scope="col" style={{ width: "30px" }}>Return Qty</th>
                    <th className="text-end">Reason</th>
                    <th className="text-end">Price</th>
                    <th className="text-end">Line Total</th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((it) => {
                    const sel = selected[it.id];
                    return (
                      <tr key={it.id}>
                        <td scope="col" style={{ width: "36px" }}>
                          <input 
                          className="form-check-input" 
                          id={`select-${it.id}`} 
                          type="checkbox" 
                          checked={!!sel}
                          onChange={(e) => {
                            setSelected((prev) => {
                              const copy = { ...prev };
                              if (e.target.checked) {
                                copy[it.id] = {
                                  qty: 1,
                                  reason: "",
                                };
                              } else {
                                delete copy[it.id];
                              }
                              return copy;
                            });
                          }}
                          />
                        </td>
                        <td className="fw-bold">{it.id}</td>
                        <td className="fw-bold">
                          <div className="flex gap-2 items-center">
                          <Image
                            src={it.image}
                            alt={it.name}
                            width={50}
                            height={50}
                            className="rounded"
                          />
                          <div>
                            <div className="font-semibold">{it.name}</div>
                            <small className="text-gray-500">SKU: {it.sku}</small>
                          </div>
                        </div>
                        </td>
                        <td className="text-truncate">{it.purchasedQty}</td>
                        {/* <td>
                          {fmtDate(order.date)}
                        </td> */}
                        <td>
                          <input
                          type="number"
                          min={1}
                          max={it.purchasedQty}
                          value={sel?.qty || ""}
                          disabled={!sel}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setSelected((prev) => ({
                              ...prev,
                              [it.id]: { ...prev[it.id], qty: val },
                            }));
                          }}
                          className="border rounded p-1 w-16 text-sm"
                        />

                        </td>
                        <td className="text-end">
                          <select
                          disabled={!sel}
                          value={sel?.reason || ""}
                          onChange={(e) =>
                            setSelected((prev) => ({
                              ...prev,
                              [it.id]: { ...prev[it.id], reason: e.target.value },
                            }))
                          }
                          className="border rounded p-1 text-sm"
                        >
                          <option value="">Select…</option>
                          <option>Damaged Item</option>
                          <option>Wrong Item Received</option>
                          <option>No Longer Needed</option>
                          <option>Other</option>
                        </select>
                          
                          </td>

                        <td className="text-end">
                          {formatMoney(it.price)}
                        </td>
                        <td className="text-end">
                          {sel ? formatMoney(sel.qty * it.price) : "-"}
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
                    );
                  })}
                  {pageItems.length === 0 && (
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
          
          <div className="text-muted small" id="paginationInfo">
            Showing {(page - 1) * pageSize + 1}–
            {Math.min(page * pageSize, page)} of {page}
          </div>

          
          <div>
            <ul className="pagination mb-0">
              {Array.from({ length: page }, (_, i) => i + 1).map((p) => (
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

          {/* <div className="table-responsive x-card">
            <table className="table x-table align-middle mb-0" id="itemsTable">
              <thead>
                <tr>
                  <th style={{ "width": "48px" }}>
                    Select
                  </th>
                  <th>
                    Product
                  </th>
                  <th className="text-center">
                    Purchased
                  </th>
                  <th className="text-center">
                    Return Qty
                  </th>
                  <th>
                    Reason
                  </th>
                  <th className="text-end">
                    Price
                  </th>
                  <th className="text-end">
                    Line Total
                  </th>
                </tr>
              </thead>
              <tbody id="itemsTbody">
                <!-- Rows injected by JS -->
                {pageItems.map((it) => {
                  const sel = selected[it.id];
                  return (
                    <tr key={it.id} className="border-t">
                      <td className="p-2">
                        <input
                          type="checkbox"
                          checked={!!sel}
                          onChange={(e) => {
                            setSelected((prev) => {
                              const copy = { ...prev };
                              if (e.target.checked) {
                                copy[it.id] = {
                                  qty: 1,
                                  reason: "",
                                };
                              } else {
                                delete copy[it.id];
                              }
                              return copy;
                            });
                          }}
                        />
                      </td>
                      <td className="p-2">
                        <div className="flex gap-2 items-center">
                          <Image
                            src={it.image}
                            alt={it.name}
                            width={50}
                            height={50}
                            className="rounded"
                          />
                          <div>
                            <div className="font-semibold">{it.name}</div>
                            <small className="text-gray-500">SKU: {it.sku}</small>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">{it.purchasedQty}</td>
                      <td className="text-center">
                        <input
                          type="number"
                          min={1}
                          max={it.purchasedQty}
                          value={sel?.qty || ""}
                          disabled={!sel}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setSelected((prev) => ({
                              ...prev,
                              [it.id]: { ...prev[it.id], qty: val },
                            }));
                          }}
                          className="border rounded p-1 w-16 text-sm"
                        />
                      </td>
                      <td>
                        <select
                          disabled={!sel}
                          value={sel?.reason || ""}
                          onChange={(e) =>
                            setSelected((prev) => ({
                              ...prev,
                              [it.id]: { ...prev[it.id], reason: e.target.value },
                            }))
                          }
                          className="border rounded p-1 text-sm"
                        >
                          <option value="">Select…</option>
                          <option>Damaged Item</option>
                          <option>Wrong Item Received</option>
                          <option>No Longer Needed</option>
                          <option>Other</option>
                        </select>
                      </td>
                      <td className="text-right">{formatMoney(it.price)}</td>
                      <td className="text-right">
                        {sel ? formatMoney(sel.qty * it.price) : "-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div> */}
          {/* <div className="d-flex justify-content-between align-items-center mt-2">
            <small className="text-muted" id="paginationInfo">
              Showing 0 of 0 items
            </small>
            <div className="x-pagination">
              <button className="x-btn x-btn--ghost x-btn--sm" disabled id="prevPageBtn">
                <i className="fa-solid fa-chevron-left">
                </i>
              </button>
              <span aria-current="page" className="x-page" id="currentPage">
                1
              </span>
              <button className="x-btn x-btn--ghost x-btn--sm" disabled id="nextPageBtn">
                <i className="fa-solid fa-chevron-right">
                </i>
              </button>
            </div>
          </div> */}
          {/* <!-- Additional Comments --> */}
          <section className="x-card mt-4">
            <div className="x-card__body">
              <div className="mb-3">
                <label className="x-label" htmlFor="comments">
                  Additional Comments (Optional)
                </label>
                <textarea className="x-textarea form-control" id="comments"
                  placeholder="Please provide more details about your return request."
                  rows={4}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                >

                </textarea>
                <div className="form-text">
                  Do not include sensitive payment information.
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* <!-- Totals / Actions --> */}
        <div className="col-lg-4">
          <aside className="x-card position-sticky" style={{ "top": "90px" }}>
            <div className="x-card__header">
              <div className="fw-bold">
                Return Summary
              </div>
            </div>
            <div className="x-card__body">
              <div className="c-totals mb-3">
                <div className="c-totals__row">
                  <span>
                    Selected Items
                  </span>
                  <span id="summarySelected">
                    {summary.count}
                  </span>
                </div>
                <div className="c-totals__row">
                  <span>
                    Total Quantity
                  </span>
                  <span id="summaryQty">
                    {summary.qty}
                  </span>
                </div>
                <div className="c-totals__row">
                  <span>
                    Estimated Refund
                  </span>
                  <span id="summaryRefund">
                    {formatMoney(summary.total)}
                  </span>
                </div>
                {/* <hr className="hr">
                  <div className="d-flex align-items-center gap-2">
                    <i className="fa-regular fa-clock u-text-muted" data-bs-toggle="tooltip"
                      title="Returns are typically processed within 5-7 business days after approval.">
                    </i>
                    <small className="text-muted">
                      Processing time 5-7 business days.
                    </small>
                  </div>
                </hr> */}
              </div>
              <div className="d-grid gap-2">
                <button className="x-btn x-btn--primary w-100" id="submitBtn" disabled={!summary.count}
                  onClick={handleSubmit}>
                  <span className="btn-text">
                    <i className="fa-solid fa-paper-plane me-2">
                    </i>
                    Submit Request
                  </span>
                  <span className="btn-loading d-none">
                    <span aria-hidden="true" className="x-btn__spinner">
                    </span>
                    Submitting…
                  </span>
                </button>
                <button className="x-btn x-btn--secondary w-100" id="cancelBtn" onClick={() => router.push(`/order_details?orderId=${order.id}`)}>
                  <i className="fa-solid fa-xmark me-2">
                  </i>
                  Cancel
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Items + Sidebar */}
      {/* <div className="grid lg:grid-cols-3 gap-4">
       
        <div className="lg:col-span-2">
         
          <div className="flex gap-2 mb-3">
            <input
              type="search"
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded p-1 text-sm flex-1"
            />
            <select
              className="border rounded p-1 text-sm"
              value={reasonFilter}
              onChange={(e) => setReasonFilter(e.target.value)}
            >
              <option value="">Any Reason</option>
              <option>Damaged Item</option>
              <option>Wrong Item Received</option>
              <option>No Longer Needed</option>
              <option>Other</option>
            </select>
            <select
              className="border rounded p-1 text-sm"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="name-asc">Name (A→Z)</option>
              <option value="name-desc">Name (Z→A)</option>
              <option value="qty-desc">Qty (High→Low)</option>
              <option value="qty-asc">Qty (Low→High)</option>
            </select>
          </div>

          
          <div className="overflow-x-auto bg-white rounded-2xl shadow">
            <table className="table-auto w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th></th>
                  <th className="text-left p-2">Product</th>
                  <th>Purchased</th>
                  <th>Return Qty</th>
                  <th>Reason</th>
                  <th className="text-right">Price</th>
                  <th className="text-right">Line Total</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((it) => {
                  const sel = selected[it.id];
                  return (
                    <tr key={it.id} className="border-t">
                      <td className="p-2">
                        <input
                          type="checkbox"
                          checked={!!sel}
                          onChange={(e) => {
                            setSelected((prev) => {
                              const copy = { ...prev };
                              if (e.target.checked) {
                                copy[it.id] = {
                                  qty: 1,
                                  reason: "",
                                };
                              } else {
                                delete copy[it.id];
                              }
                              return copy;
                            });
                          }}
                        />
                      </td>
                      <td className="p-2">
                        <div className="flex gap-2 items-center">
                          <Image
                            src={it.image}
                            alt={it.name}
                            width={50}
                            height={50}
                            className="rounded"
                          />
                          <div>
                            <div className="font-semibold">{it.name}</div>
                            <small className="text-gray-500">SKU: {it.sku}</small>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">{it.purchasedQty}</td>
                      <td className="text-center">
                        <input
                          type="number"
                          min={1}
                          max={it.purchasedQty}
                          value={sel?.qty || ""}
                          disabled={!sel}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setSelected((prev) => ({
                              ...prev,
                              [it.id]: { ...prev[it.id], qty: val },
                            }));
                          }}
                          className="border rounded p-1 w-16 text-sm"
                        />
                      </td>
                      <td>
                        <select
                          disabled={!sel}
                          value={sel?.reason || ""}
                          onChange={(e) =>
                            setSelected((prev) => ({
                              ...prev,
                              [it.id]: { ...prev[it.id], reason: e.target.value },
                            }))
                          }
                          className="border rounded p-1 text-sm"
                        >
                          <option value="">Select…</option>
                          <option>Damaged Item</option>
                          <option>Wrong Item Received</option>
                          <option>No Longer Needed</option>
                          <option>Other</option>
                        </select>
                      </td>
                      <td className="text-right">{formatMoney(it.price)}</td>
                      <td className="text-right">
                        {sel ? formatMoney(sel.qty * it.price) : "-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          
          <div className="bg-white rounded-2xl shadow mt-4 p-4">
            <label className="block text-sm font-medium mb-1">
              Additional Comments
            </label>
            <textarea
              className="border rounded w-full p-2 text-sm"
              rows={3}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>
        </div>

        
        <aside className="bg-white rounded-2xl shadow p-4 h-fit sticky top-20">
          <div className="font-bold mb-2">Return Summary</div>
          <div className="space-y-1 text-sm mb-3">
            <div className="flex justify-between">
              <span>Selected Items</span>
              <span>{summary.count}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Quantity</span>
              <span>{summary.qty}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Refund</span>
              <span>{formatMoney(summary.total)}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              disabled={!summary.count}
              onClick={handleSubmit}
              className="bg-blue-600 text-white py-2 rounded disabled:opacity-50"
            >
              Submit Request
            </button>
            <button
              onClick={() => router.push(`/order_details?orderId=${order.id}`)}
              className="border py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </aside>
      </div> */}
    </main>
  );
}
