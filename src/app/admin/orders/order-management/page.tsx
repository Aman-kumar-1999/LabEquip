"use client";

import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Link from "next/link";

import '../../../css/order_details.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function OrderManagementPage() {
  // === State ===
  const [role, setRole] = useState<"customer" | "admin">("customer");
  const [status, setStatus] = useState<
    "Paid" | "Processing" | "Shipped" | "Delivered" | "Cancelled"
  >("Shipped");

  const [tracking, setTracking] = useState({
    number: "781234567890",
    carrier: "FedEx",
    url: "https://www.fedex.com/fedextrack/?tracknumbers=781234567890",
  });

  const [toastMessages, setToastMessages] = useState<
    { id: number; message: string; variant?: string }[]
  >([]);

  // Mock items
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Laptop",
      sku: "LP123",
      qty: 1,
      price: 1200,
      total: 1200,
      category: "electronics",
    },
    {
      id: 2,
      name: "Mouse",
      sku: "MS456",
      qty: 2,
      price: 25,
      total: 50,
      category: "accessories",
    },
  ]);

  const [filterQuery, setFilterQuery] = useState("");
  const [sortKey, setSortKey] = useState<keyof typeof items[0] | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  // === Status handling ===
  const nextStatuses: Record<string, string[]> = {
    Paid: ["Processing", "Cancelled"],
    Processing: ["Shipped", "Cancelled"],
    Shipped: ["Delivered", "Cancelled"],
    Delivered: [],
    Cancelled: [],
  };

  const filteredItems = items.filter(
    (item) =>
      !filterQuery ||
      item.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortKey) return 0;
    const va = a[sortKey];
    const vb = b[sortKey];
    if (typeof va === "number" && typeof vb === "number") {
      return sortDir === "asc" ? va - vb : vb - va;
    }
    return sortDir === "asc"
      ? String(va).localeCompare(String(vb))
      : String(vb).localeCompare(String(va));
  });

  // === Toast helper ===
  function showToast(message: string, variant: string = "info") {
    const id = Date.now();
    setToastMessages((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setToastMessages((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }

  // === CSV Export ===
  const exportCSV = () => {
    const csvRows = [["Name", "SKU", "Qty", "Price", "Total"]];
    filteredItems.forEach((item) => {
      csvRows.push([
        item.name,
        item.sku,
        String(item.qty),
        String(item.price),
        String(item.total),
      ]);
    });
    const csv = csvRows
      .map((r) => r.map((c) => `"${String(c).replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "order_items.csv";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Exported filtered items as CSV.", "success");
  };

  // === Chart Data ===
  const chartData = {
    
    datasets: [
      {
        data: [4792, 50, 50],
        backgroundColor: ["#4D4DFF", "#0099D2", "#FFA500"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
    labels: ["Subtotal", "Shipping", "Tax"],
  };

  // === Admin: Update Status ===
  const handleUpdateStatus = async (newStatus: string) => {
    setStatus(newStatus as any);
    showToast(`Order status changed to ${newStatus}.`, "success");
    await Swal.fire({
      icon: "success",
      title: "Status Updated",
      text: `Order status changed to ${newStatus}. Customer will be notified.`,
      confirmButtonColor: "#000080",
    });
  };

  // === Admin: Edit Tracking ===
  const handleEditTracking = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Add/Edit Tracking",
      html: `
        <div className="text-start">
          <label className="form-label">Carrier</label>
          <input id="swal-carrier" className="form-control" value="${tracking.carrier
        }" placeholder="e.g., FedEx">
          <label className="form-label mt-2">Tracking Number</label>
          <input id="swal-number" className="form-control" value="${tracking.number
        }" placeholder="e.g., 781234567890">
          <label className="form-label mt-2">Tracking URL</label>
          <input id="swal-url" className="form-control" value="${tracking.url
        }" placeholder="https://...">
        </div>`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Save",
      preConfirm: () => {
        const carrier = (
          document.getElementById("swal-carrier") as HTMLInputElement
        ).value.trim();
        const number = (
          document.getElementById("swal-number") as HTMLInputElement
        ).value.trim();
        const url = (
          document.getElementById("swal-url") as HTMLInputElement
        ).value.trim();
        if (!carrier || !number || !url) {
          Swal.showValidationMessage("Please complete all fields.");
          return false;
        }
        return { carrier, number, url };
      },
    });

    if (formValues) {
      setTracking(formValues);
      showToast("Tracking information updated.", "success");
    }
  };

  // === UI ===
  return (
    
    <main className="l-container py-4" id="main">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="x-breadcrumb mb-3">
        <Link href="/home_page">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/order_history">Orders</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Order #ORD-10025</span>
      </nav>

      {/* Toolbar */}
      <div className="x-toolbar mb-4 d-flex flex-wrap justify-between items-center">
        <div className="d-flex align-items-center gap-2">
          <i className="fa-solid fa-receipt u-text-primary" />
          <strong>Order Details</strong>
        </div>

        <div className="d-flex align-items-center gap-2 flex-wrap">
          <div aria-label="Search within order items" className="x-search" role="search">
            <i className="fa-solid fa-magnifying-glass" />
            <input
              aria-label="Search items"
              id="itemSearch"
              placeholder="Search items (name or SKU)"
              type="search"
            />
          </div>
          <div className="vr mx-2" />
          <label className="me-2 d-flex align-items-center" htmlFor="viewRole">
            <i className="fa-solid fa-user-shield me-1" />
            View as:
          </label>
          <select
            aria-label="View as role"
            className="form-select form-select-sm"
            id="viewRole"
            style={{ width: 'auto' }}
            value={role}
            onChange={(e) => setRole(e.target.value as 'customer' | 'admin')}
          >
            <option value="customer">Customer</option>
            <option value="admin">Administrator</option>
          </select>
          <button className="x-btn x-btn--secondary x-btn--sm ms-2" id="reloadBtn">
            <i className="fa-solid fa-rotate" />
            Reload data
          </button>
        </div>
      </div>

      {/* Order Summary Header */}
      <section aria-labelledby="order-summary-heading" className="x-card a-fade-in mb-4">
        <div className="x-card__body">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-3 align-items-start align-items-md-center">
            <div>
              <h1 className="h3 mb-2" id="order-summary-heading">
                Order <span className="text-muted">#</span>
                <span id="orderId">ORD-10025</span>
              </h1>
              <div className="d-flex flex-wrap gap-3">
                <div>
                  <i className="fa-regular fa-calendar me-1" />
                  <span id="orderDate">Aug 12, 2025</span>
                </div>
                <div>
                  <i className="fa-solid fa-money-check-dollar me-1" />
                  <span data-currency="USD" id="orderTotal">
                    $4,892.00
                  </span>
                </div>
              </div>
            </div>
            <div className="text-md-end">
              <span className="x-badge status-badge" data-status="Shipped" id="orderStatusBadge">
                <span className="x-status-dot me-1" />
                Shipped
              </span>
            </div>
          </div>

          {/* Progress steps */}
          <div aria-label="Order progress" className="c-steps mt-4" role="list">
            <div className="c-step is-complete" role="listitem">
              <span className="c-step__dot" />
              <span>Paid</span>
            </div>
            <div className="c-step is-complete" role="listitem">
              <span className="c-step__dot" />
              <span>Processing</span>
            </div>
            <div className="c-step is-active" role="listitem">
              <span className="c-step__dot" />
              <span>Shipped</span>
            </div>
            <div className="c-step" role="listitem">
              <span className="c-step__dot" />
              <span>Delivered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Admin panel (conditionally rendered) */}
      {role === 'admin' && (
        <section aria-labelledby="admin-panel-heading" className="x-card mb-4" id="adminPanel">
          <div className="x-card__header d-flex justify-content-between align-items-center">
            <h2 className="h5 mb-0" id="admin-panel-heading">
              <i className="fa-solid fa-gears me-2" />
              Order Management
            </h2>
            <span className="x-badge">
              <i className="fa-solid fa-id-badge" />
              Admin tools
            </span>
          </div>
          <div className="x-card__body">
            <div className="row g-3 align-items-end">
              <div className="col-md-6">
                <label className="x-label" htmlFor="statusSelect">
                  Update Status
                </label>
                <select className="form-select" id="statusSelect">
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  {/* ...etc */}
                </select>
              </div>
              <div className="col-md-6 d-flex gap-2">
                <button className="x-btn x-btn--primary" disabled={true} id="updateStatusBtn">
                  <i className="fa-solid fa-circle-check" />
                  Update Status
                </button>
                <button className="x-btn x-btn--secondary" id="notifyBtn">
                  <i className="fa-regular fa-bell" />
                  Notify Customer
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Items Table */}
      <section className="mb-5">
        <div className="row g-4">
          <div className="col-lg-8">
            <div aria-labelledby="items-heading" className="x-card h-100">
              <div className="x-card__header d-flex align-items-center justify-content-between">
                <h3 className="h5 mb-0" id="items-heading">
                  Ordered Items
                </h3>
                <div className="d-flex align-items-center gap-2">
                  <div className="dropdown">
                    <button
                      aria-expanded="false"
                      className="x-btn x-btn--ghost dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      <i className="fa-solid fa-filter" /> Filter
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <button className="dropdown-item item-filter" data-filter="all">
                          All
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item item-filter" data-filter="microscope">
                          Microscopes
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item item-filter" data-filter="centrifuge">
                          Centrifuges
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item item-filter" data-filter="pipette">
                          Pipettes
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item item-filter" data-filter="reagent">
                          Reagents
                        </button>
                      </li>
                    </ul>
                  </div>
                  <button className="x-btn x-btn--secondary" id="exportItemsBtn">
                    <i className="fa-solid fa-file-export" />
                    Export
                  </button>
                </div>
              </div>

              <div className="x-card__body">
                <div className="table-responsive">
                  <table className="x-table align-middle" id="itemsTable">
                    <thead>
                      <tr>
                        <th scope="col">Image</th>
                        <th scope="col" className="sortable" data-sort="name">
                          Product <i className="fa-solid fa-arrow-up-wide-short ms-1" />
                        </th>
                        <th scope="col" className="sortable" data-sort="sku">
                          SKU
                        </th>
                        <th scope="col" className="sortable text-end" data-sort="qty">
                          Qty
                        </th>
                        <th scope="col" className="sortable text-end" data-sort="price">
                          Price
                        </th>
                        <th scope="col" className="sortable text-end" data-sort="total">
                          Total
                        </th>
                        <th scope="col" className="text-end">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Example row */}
                      <tr data-category="microscope">
                        <td style={{ width: '72px' }}>
                          <Link href="/product_details?id=P-1001">
                            <img
                              alt="Microscope M200"
                              className="rounded"
                              height={60}
                              width={60}
                              src="assets/placeholder_image_for_ordered__1_5ba6bde5.png"
                              onError={(e) =>
                              ((e.target as HTMLImageElement).src =
                                'https://picsum.photos/seed/item1001/120/120?grayscale')
                              }
                            />
                          </Link>
                        </td>
                        <td data-name="Microscope M200">
                          <Link className="fw-semibold" href="/product_details?id=P-1001">
                            Microscope M200
                          </Link>
                          <div className="text-muted small">Binocular, LED</div>
                        </td>
                        <td data-sku="MIC-M200">MIC-M200</td>
                        <td className="text-end" data-qty="1">
                          1
                        </td>
                        <td className="text-end" data-currency="USD" data-price="2199.00">
                          $2,199.00
                        </td>
                        <td className="text-end" data-total="2199.00">
                          $2,199.00
                        </td>
                        <td className="text-end">
                          <div className="btn-group">
                            <Link className="x-btn x-btn--link x-btn--sm" href="/product_details?id=P-1001">
                              <i className="fa-regular fa-eye" /> View
                            </Link>
                            <button
                              className="x-btn x-btn--secondary x-btn--sm return-btn d-none"
                              data-item-id="LI-1"
                            >
                              <i className="fa-solid fa-rotate-left" /> Return
                            </button>
                          </div>
                        </td>
                      </tr>
                      {/* Repeat for other items... */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Right column: shipment + billing/payment --> */}
          <div className="col-lg-4">
            {/* <!-- Shipment Details Card --> */}
            <div aria-labelledby="shipment-heading" className="x-card mb-4">
              <div className="x-card__header d-flex align-items-center justify-content-between">
                <h3 className="h6 mb-0" id="shipment-heading">
                  <i className="fa-solid fa-truck-fast me-2">
                  </i>
                  Shipment Details
                </h3>
                <button className="x-btn x-btn--secondary x-btn--sm d-none" id="editTrackingBtn">
                  <i className="fa-regular fa-pen-to-square">
                  </i>
                  Add/Edit Tracking
                </button>
              </div>
              <div className="x-card__body">
                <div className="mb-3">
                  <div className="fw-semibold mb-1">
                    Shipping Address
                  </div>
                  <address className="mb-0 text-muted" id="shippingAddress">
                    Aurora Labs, Attn: Dr. Jane Smith
                    <br />
                    1200 Innovation Dr, Suite 420
                    <br />
                    Cambridge, MA 02139, USA
                  </address>
                </div>
                <div className="mb-3">
                  <div className="fw-semibold mb-1">
                    Tracking
                  </div>
                  <div id="trackingBlock">
                    <a className="text-decoration-underline"
                      href="https://www.fedex.com/fedextrack/?tracknumbers=781234567890"
                      id="trackingLink" rel="noopener" target="_blank">
                      FedEx # 7812 3456 7890
                    </a>
                  </div>
                </div>
                <img alt="Shipment illustration" className="img-fluid rounded"
                  // onerror="this.onerror=null;this.src='https://picsum.photos/seed/shipment/500/220?grayscale';"
                  src="/assets/illustration_for_shipment_deta_3_ebc2c98b.png" />
              </div>
            </div>
            {/* <!-- Billing & Payment Card --> */}
            <div aria-labelledby="billing-heading" className="x-card">
              <div className="x-card__header d-flex align-items-center justify-content-between">
                <h3 className="h6 mb-0" id="billing-heading">
                  <i className="fa-solid fa-credit-card me-2">
                  </i>
                  Billing &amp; Payment
                </h3>
                <button className="x-btn x-btn--primary x-btn--sm" id="downloadInvoiceBtn">
                  <i className="fa-solid fa-file-invoice">
                  </i>
                  Download Invoice
                </button>
              </div>
              <div className="x-card__body">
                <div className="mb-3">
                  <div className="fw-semibold mb-1">
                    Billing Address
                  </div>
                  <address className="mb-0 text-muted" id="billingAddress">
                    Aurora Labs Finance
                    <br />
                    1200 Innovation Dr, Suite 420
                    <br />
                    Cambridge, MA 02139, USA
                  </address>
                </div>
                <div className="mb-3">
                  <div className="fw-semibold mb-1">
                    Payment Method
                  </div>
                  <div className="text-muted" id="paymentMethod">
                    Paid with Visa •••• 1234
                  </div>
                </div>
                <div className="c-totals mb-3">
                  <div className="c-totals__row">
                    <span>
                      Subtotal
                    </span>
                    <span id="subtotal">
                      $4,792.00
                    </span>
                  </div>
                  <div className="c-totals__row">
                    <span>
                      Shipping
                    </span>
                    <span id="shippingFee">
                      $50.00
                    </span>
                  </div>
                  <div className="c-totals__row">
                    <span>
                      Tax
                    </span>
                    <span id="tax">
                      $50.00
                    </span>
                  </div>
                  <hr className="hr" />
                  <div className="c-totals__row c-totals__grand">
                    <span>
                      Total
                    </span>
                    <span id="grandTotal">
                      $4,892.00
                    </span>
                  </div>
                </div>
                {/* <canvas aria-label="Cost breakdown chart" height="220" id="costChart" role="img"
                  width="400">
                </canvas> */}
                {/* Chart */}
                <div className="my-6" >
                  <Doughnut data={chartData}  />
                </div>
                <img alt="Billing and payment illustration" className="img-fluid rounded mt-3"
                  // onerror="this.onerror=null;this.src='https://picsum.photos/seed/billing/500/300?grayscale';"
                  src="/assets/illustration_for_billing_and_p_1_6d12a614.png" />
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
