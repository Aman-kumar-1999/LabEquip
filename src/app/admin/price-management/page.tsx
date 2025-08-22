

"use client";

import { useEffect, useMemo, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Swal from "sweetalert2";

import "../../css/admin_pricing.css"; // Assuming you have a CSS file for styling

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PricingManagementPage() {
    // ---------------------------
    // State
    // ---------------------------
    const [pricingTiers, setPricingTiers] = useState([
        { id: "tier-retail", name: "Retail", description: "Standard pricing for individual consumers." },
        { id: "tier-institutional", name: "Institutional", description: "Discounted pricing for labs and institutions." },
        { id: "tier-academic", name: "Academic", description: "Special pricing for accredited academic institutions." },
        { id: "tier-government", name: "Government", description: "Contract pricing for government organizations." },
        { id: "tier-distributor", name: "Distributor", description: "Wholesale pricing for authorized distributors." },
        { id: "tier-vip", name: "VIP", description: "Negotiated VIP pricing for strategic accounts." },
    ]);

    const [organizations, setOrganizations] = useState([
        { id: "org-101", name: "Helix Research Labs", pricing_tier_id: "tier-institutional", updatedAt: "2025-08-01 10:24" },
        { id: "org-102", name: "Apex BioTech Pvt Ltd", pricing_tier_id: "tier-retail", updatedAt: "2025-08-02 14:05" },
        { id: "org-103", name: "Genova University", pricing_tier_id: "tier-academic", updatedAt: "2025-08-04 09:48" },
        { id: "org-104", name: "City General Hospital", pricing_tier_id: "tier-institutional", updatedAt: "2025-08-05 12:16" },
        { id: "org-105", name: "NovaGov Health Dept", pricing_tier_id: "tier-government", updatedAt: "2025-08-06 11:02" },
        { id: "org-106", name: "Quantum Diagnostics", pricing_tier_id: "tier-vip", updatedAt: "2025-08-06 16:21" },
        { id: "org-107", name: "BlueSky Pharma", pricing_tier_id: "tier-distributor", updatedAt: "2025-08-07 10:02" },
        { id: "org-108", name: "Orchid Medical Center", pricing_tier_id: "tier-institutional", updatedAt: "2025-08-08 13:33" },
        { id: "org-109", name: "IonTech Instruments", pricing_tier_id: "tier-distributor", updatedAt: "2025-08-08 15:45" },
        { id: "org-110", name: "Stellar State University", pricing_tier_id: "tier-academic", updatedAt: "2025-08-09 10:57" },
    ]);

    const [tierSearch, setTierSearch] = useState("");
    const [tierSortDir, setTierSortDir] = useState<"asc" | "desc">("asc");

    const [orgSearch, setOrgSearch] = useState("");
    const [orgPage, setOrgPage] = useState(1);
    const orgPageSize = 5;

    // ---------------------------
    // Computed Data
    // ---------------------------
    const filteredTiers = useMemo(() => {
        const rows = pricingTiers.filter(
            (t) =>
                t.name.toLowerCase().includes(tierSearch.toLowerCase()) ||
                t.description.toLowerCase().includes(tierSearch.toLowerCase())
        );
        rows.sort((a, b) =>
            tierSortDir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        );
        return rows;
    }, [pricingTiers, tierSearch, tierSortDir]);

    const orgFiltered = useMemo(() => {
        return organizations.filter((o) => o.name.toLowerCase().includes(orgSearch.toLowerCase()));
    }, [organizations, orgSearch]);

    const orgPageData = useMemo(() => {
        const totalPages = Math.max(1, Math.ceil(orgFiltered.length / orgPageSize));
        const page = Math.min(orgPage, totalPages);
        const start = (page - 1) * orgPageSize;
        const end = Math.min(start + orgPageSize, orgFiltered.length);
        return { rows: orgFiltered.slice(start, end), totalPages, start, end };
    }, [orgFiltered, orgPage]);

    const chartData = useMemo(() => {
        const counts: Record<string, number> = {};
        pricingTiers.forEach((t) => (counts[t.name] = 0));
        organizations.forEach((o) => {
            const tier = pricingTiers.find((t) => t.id === o.pricing_tier_id);
            if (tier) counts[tier.name] = (counts[tier.name] || 0) + 1;
        });
        return {
            labels: Object.keys(counts),
            datasets: [
                {
                    data: Object.values(counts),
                    backgroundColor: ["#000080", "#0099D2", "#00774E", "#FFA500", "#CD2026", "#6C757D"],
                    borderWidth: 1,
                },
            ],
        };
    }, [pricingTiers, organizations]);

    // ---------------------------
    // Handlers
    // ---------------------------
    const handleTierForm = async (mode: "create" | "edit", tier?: any) => {
        const { value: formValues } = await Swal.fire({
            title: mode === "create" ? "Create Pricing Tier" : "Edit Pricing Tier",
            html: `
        <div className="text-start">
          <label class="x-label mb-1" for="swal-tier-name">Tier Name <span class="text-danger">*</span></label>
          <input id="swal-tier-name" class="form-control" value="${tier?.name || ""}" />
          <label class="x-label mt-3 mb-1" for="swal-tier-desc">Description</label>
          <textarea id="swal-tier-desc" class="form-control">${tier?.description || ""}</textarea>
        </div>
      `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Save",
            preConfirm: () => {
                const name = (document.getElementById("swal-tier-name") as HTMLInputElement).value.trim();
                const description = (document.getElementById("swal-tier-desc") as HTMLTextAreaElement).value.trim();
                if (!name) {
                    Swal.showValidationMessage("Tier Name is required.");
                    return false;
                }
                const isDuplicate = pricingTiers.some(
                    (t) => t.name.toLowerCase() === name.toLowerCase() && t.id !== (tier?.id || "")
                );
                if (isDuplicate) {
                    Swal.showValidationMessage("Tier Name must be unique.");
                    return false;
                }
                return { name, description };
            },
        });

        if (!formValues) return;

        if (mode === "create") {
            setPricingTiers((prev) => [
                ...prev,
                {
                    id: "tier-" + formValues.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                    name: formValues.name,
                    description: formValues.description,
                },
            ]);
        } else if (tier) {
            setPricingTiers((prev) =>
                prev.map((t) =>
                    t.id === tier.id ? { ...t, name: formValues.name, description: formValues.description } : t
                )
            );
        }
    };

    
  const handleOrganizationForm = async (mode: "create" | "edit", org?: any) => {
    const { value: formValues } = await Swal.fire({
      title: mode === "create" ? "Create Organization" : "Edit Organization",
      html: `
        <div style="text-align: left;">
          <label class="x-label mb-1" for="swal-org-name">
            Organization Name <span class="text-danger">*</span>
          </label>
          <input 
            id="swal-org-name" 
            class="form-control" 
            value="${org?.name || ""}" 
          />

          <label class="x-label mt-3 mb-1" for="swal-org-tier-id">
            Pricing Tier
          </label>
          <select id="swal-org-tier-id" class="form-select form-select-sm">
            ${pricingTiers
              .map(
                (t) =>
                  `<option value="${t.id}" ${
                    org?.pricing_tier_id === t.id ? "selected" : ""
                  }>${t.name}</option>`
              )
              .join("")}
          </select>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Save",
      preConfirm: () => {
        const name = (document.getElementById("swal-org-name") as HTMLInputElement)?.value.trim();
        const pricing_tier_id = (document.getElementById("swal-org-tier-id") as HTMLSelectElement)?.value;

        const updatedAt = new Date().toISOString().slice(0, 16).replace("T", " ");

        if (!name) {
          Swal.showValidationMessage("Organization Name is required.");
          return false;
        }

        const isDuplicate = organizations.some(
          (o) => o.name.toLowerCase() === name.toLowerCase() && o.id !== (org?.id || "")
        );

        if (isDuplicate) {
          Swal.showValidationMessage("Organization Name must be unique.");
          return false;
        }

        return { name, pricing_tier_id, updatedAt };
      },
    });

    if (!formValues) return;

    if (mode === "create") {
      setOrganizations((prev) => [
        ...prev,
        {
          id: "org-" + formValues.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          name: formValues.name,
          pricing_tier_id: formValues.pricing_tier_id,
          updatedAt: formValues.updatedAt || new Date().toISOString().slice(0, 16).replace("T", " "),
        },
      ]);
    } else if (org) {
      setOrganizations((prev) =>
        prev.map((o) =>
          o.id === org.id
            ? {
                ...o,
                name: formValues.name,
                pricing_tier_id: formValues.pricing_tier_id,
                updatedAt: formValues.updatedAt,
              }
            : o
        )
      );
    }
  };

    const handleDeleteTier = (tierId: string) => {
        const assignedCount = organizations.filter((o) => o.pricing_tier_id === tierId).length;
        if (assignedCount > 0) {
            Swal.fire("Error", "This tier is assigned to organizations. Reassign first.", "error");
            return;
        }
        Swal.fire({
            title: "Delete this tier?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then((res) => {
            if (res.isConfirmed) {
                setPricingTiers((prev) => prev.filter((t) => t.id !== tierId));
            }
        });
    };

    const handleAssignTier = (orgId: string, newTierId: string) => {
        setOrganizations((prev) =>
            prev.map((o) =>
                o.id === orgId
                    ? { ...o, pricing_tier_id: newTierId, updatedAt: new Date().toISOString().slice(0, 16).replace("T", " ") }
                    : o
            )
        );
    };

    // ---------------------------
    // JSX
    // ---------------------------
    return (
        <main className="" id="main">
            <div className="l-container p-0">
                {/* Breadcrumb */}
                <div className="mb-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-1">
                            <li className="breadcrumb-item">
                                <a href="/admin">Admin</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Pricing Management
                            </li>
                        </ol>
                    </nav>
                    <div className="d-flex flex-wrap align-items-center justify-content-between">
                        <h1 className="h3 m-0">Admin Pricing Management</h1>
                        <button className="x-btn x-btn--secondary">
                            <i className="fa-solid fa-rotate"></i> <span className="ms-2">Refresh</span>
                        </button>
                    </div>
                </div>

                <div className="row g-3">
                    {/* Pricing Tier Management */}
                    <section className="col-12 col-xl-6">
                        <div className="x-card h-100">
                            <div className="x-card__header d-flex justify-content-between">
                                <h2 className="h5 m-0">Pricing Tier Management</h2>
                                <div className="d-flex gap-2">
                                    <input
                                        type="search"
                                        placeholder="Search tiers..."
                                        value={tierSearch}
                                        onChange={(e) => setTierSearch(e.target.value)}
                                        className="form-control form-control-sm"
                                    />
                                    <button className="x-btn x-btn--primary" onClick={() => handleTierForm("create")}>
                                        <i className="fa-solid fa-plus"></i> <span className="ms-2">Create Tier</span>
                                    </button>
                                </div>
                            </div>
                            <div className="x-card__body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>
                                                Tier Name
                                                <button onClick={() => setTierSortDir("asc")}>A-Z</button>
                                                <button onClick={() => setTierSortDir("desc")}>Z-A</button>
                                            </th>
                                            <th>Description</th>
                                            <th className="text-end">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredTiers.map((t) => (
                                            <tr key={t.id}>
                                                <td>{t.name}</td>
                                                <td>{t.description}</td>
                                                <td className="text-end">
                                                    <button onClick={() => handleTierForm("edit", t)} className="btn btn-sm btn-outline-primary">
                                                        <i className="fa-solid fa-pen-to-square"></i>

                                                    </button>
                                                    <button onClick={() => handleDeleteTier(t.id)} className="btn btn-sm btn-outline-danger ms-2">
                                                        <i className="fa-solid fa-trash"></i>

                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div>Showing {filteredTiers.length} of {pricingTiers.length}</div>
                            </div>
                        </div>
                    </section>

                    {/* Organizations Tier Assignment */}
                    <section className="col-12 col-xl-6">
                        <div className="x-card h-100">
                            <div className="x-card__header d-flex justify-content-between">
                                <div className="d-flex gap-2">
                                    <h2 className="h5 m-0">Organizations Tier Assignment</h2>
                                    <input
                                        type="search"
                                        placeholder="Search organizations..."
                                        value={orgSearch}
                                        onChange={(e) => {
                                            setOrgSearch(e.target.value);
                                            setOrgPage(1);
                                        }}
                                        className="form-control form-control-sm"
                                    />
                                    <button className="x-btn x-btn--primary" onClick={() => handleOrganizationForm("create")}>
                                        <i className="fa-solid fa-plus"></i> <span className="ms-2">Create Organization</span>
                                    </button>
                                </div>
                            </div>
                            <div className="x-card__body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Organization</th>
                                            <th>Assigned Tier</th>
                                            <th>Updated</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orgPageData.rows.map((o) => (
                                            <tr key={o.id}>
                                                <td>{o.name}</td>
                                                <td>
                                                    <select
                                                        value={o.pricing_tier_id}
                                                        onChange={(e) => handleAssignTier(o.id, e.target.value)}
                                                        className="form-select form-select-sm"
                                                    >
                                                        {pricingTiers.map((t) => (
                                                            <option key={t.id} value={t.id}>
                                                                {t.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td>{o.updatedAt}</td>
                                                <td className="text-end">
                                                    <a href="/admin_users" className="btn btn-sm btn-outline-secondary">
                                                        <i className="fa-solid fa-users"></i>
                                                        View
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-between">
                                    <span>
                                        Page {orgPage} of {orgPageData.totalPages} · Showing{" "}
                                        {orgFiltered.length === 0 ? 0 : orgPageData.start + 1}–{orgPageData.end} of {orgFiltered.length}
                                    </span>
                                    <div>
                                        <button disabled={orgPage <= 1} onClick={() => setOrgPage(orgPage - 1)}>
                                            <i className="fa-solid fa-chevron-left"></i>
                                            Prev
                                        </button>
                                        <span className="mx-2">|</span>
                                        <button disabled={orgPage >= orgPageData.totalPages} onClick={() => setOrgPage(orgPage + 1)}>
                                            Next
                                            <i className="fa-solid fa-chevron-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Chart */}
                    <section className="col-12">
                        <div className="x-card">
                            <div className="x-card__header">
                                <h2 className="h5 m-0">Organizations per Pricing Tier</h2>
                            </div>
                            <div className="x-card__body">
                                <Doughnut data={chartData} />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
