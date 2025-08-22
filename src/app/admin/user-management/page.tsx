
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

// Mock data
const pricingTiers = [
    { id: "tier1", name: "Institutional - Tier 1" },
    { id: "tier2", name: "Institutional - Tier 2" },
    { id: "tier3", name: "Institutional - Tier 3" },
];


const initialUsers = [
    {
        id: 1001,
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        type: 'B2C',
        status: 'Active',
        date: '2025-07-02',
        orgName: '',
        tierId: '',
        avatar: 'https://invalid.example.com/u1.png'
    }, {
        id: 1002,
        name: 'Dr. Robert Lee',
        email: 'robert.lee@genexlabs.com',
        type: 'B2B',
        status: 'Active',
        date: '2025-06-21',
        orgName: 'Genex Labs',
        tierId: 'tier2',
        avatar: 'https://invalid.example.com/u2.png'
    }, {
        id: 1003,
        name: 'Maria Gomez',
        email: 'maria.gomez@example.com',
        type: 'B2C',
        status: 'Inactive',
        date: '2025-05-15',
        orgName: '',
        tierId: '',
        avatar: 'https://invalid.example.com/u3.png'
    }, {
        id: 1004,
        name: 'BioCore Analytics',
        email: 'anita.patel@biocore.io',
        type: 'B2B',
        status: 'Active',
        date: '2025-04-28',
        orgName: 'BioCore Analytics',
        tierId: 'tier3',
        avatar: 'https://invalid.example.com/u4.png'
    }, {
        id: 1005,
        name: 'Chen Wei',
        email: 'chen.wei@example.org',
        type: 'B2C',
        status: 'Active',
        date: '2025-04-02',
        orgName: '',
        tierId: '',
        avatar: 'https://invalid.example.com/u5.png'
    }, {
        id: 1006,
        name: 'Helix Biotech',
        email: 'procurement@helixbio.co',
        type: 'B2B',
        status: 'Inactive',
        date: '2025-03-19',
        orgName: 'Helix Biotech',
        tierId: 'tier1',
        avatar: 'https://invalid.example.com/u6.png'
    }, {
        id: 1007,
        name: 'David Smith',
        email: 'david.smith@example.com',
        type: 'B2C',
        status: 'Active',
        date: '2025-02-07',
        orgName: '',
        tierId: '',
        avatar: 'https://invalid.example.com/u7.png'
    }, {
        id: 1008,
        name: 'Quantum Research Group',
        email: 'ops@qresearch.group',
        type: 'B2B',
        status: 'Active',
        date: '2025-01-20',
        orgName: 'Quantum Research Group',
        tierId: 'tier1',
        avatar: 'https://invalid.example.com/u8.png'
    }
];

export default function AdminUsersPage() {
    const [users, setUsers] = useState(initialUsers);
    const [filters, setFilters] = useState({ type: "all", status: "all" });
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sort, setSort] = useState<{ column: string; direction: "asc" | "desc" }>({ column: "date", direction: "desc" });
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);

    // Chart data
    const chartData = {
        labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        datasets: [
            {
                label: "Signups",
                data: [28, 45, 39, 52, 61, 58],
                borderColor: "#000080",
                backgroundColor: "rgba(0,0,128,0.2)",
                tension: 0.3,
            },
        ],
    };

    // Filtering and sorting
    const filteredUsers = users
        .filter((u) =>
            [u.name, u.email, u.orgName].some((v) => v?.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .filter((u) => (filters.type === "all" ? true : u.type === filters.type))
        .filter((u) => (filters.status === "all" ? true : u.status === filters.status))
        .sort((a, b) => {
            const dir = sort.direction === "asc" ? 1 : -1;
            if (sort.column === "name") return a.name.localeCompare(b.name) * dir;
            if (sort.column === "date") return (new Date(a.date).getTime() - new Date(b.date).getTime()) * dir;
            return 0;
        });

    const total = filteredUsers.length;
    const pageData = filteredUsers.slice((page - 1) * pageSize, page * pageSize);

    const handleSaveUser = (payload: any) => {
        if (selectedUser) {
            setUsers((prev) => prev.map((u) => (u.id === selectedUser.id ? { ...u, ...payload } : u)));
            Swal.fire({ icon: "success", title: "User updated", timer: 1200, showConfirmButton: false });
        } else {
            const newUser = {
                id: Math.max(...users.map((u) => u.id)) + 1,
                date: new Date().toISOString().slice(0, 10),
                avatar: "",
                ...payload,
            };
            setUsers([newUser, ...users]);
            Swal.fire({ icon: "success", title: "User created", timer: 1200, showConfirmButton: false });
        }
        setShowModal(false);
        setSelectedUser(null);
    };

    return (
        <main className="flex-grow-1" id="mainContent">
            {/* <div className="l-container py-4"> */}



            {/* <!-- Page Header --> */}
            <div className="d-flex align-items-center justify-content-between mb-3">
                {/* <!-- Breadcrumb --> */}
                <nav aria-label="Breadcrumb" className="x-breadcrumb mb-3">
                    <Link href="/admin">
                        Admin
                    </Link>
                    <span aria-hidden="true">
                        /
                    </span>
                    <span aria-current="page">
                        Users
                    </span>
                </nav>
                {/* <h1 className="h3 mb-4">
                        User Management
                    </h1> */}
                {/* <div>
                        <h1 className="h3 mb-1">
                            User Management
                        </h1>
                        <p className="u-text-muted mb-0">
                            View, create, edit users and manage B2B pricing tiers.
                        </p>
                    </div> */}
                <div className="d-flex gap-2">
                    <button className="x-btn x-btn--primary" id="btnAddUser" onClick={() => { setSelectedUser(null); setShowModal(true); }}>
                        <i className="fa-solid fa-user-plus">
                        </i>
                        Add User
                    </button>
                </div>
            </div>
            {/* <!-- System Feedback Area --> */}
            <div aria-live="polite" className="x-alert x-alert--info d-none" id="systemFeedback" role="status">
                <i className="fa-regular fa-bell">
                </i>
                <div>
                    <strong>
                        Status:
                    </strong>
                    <span id="systemFeedbackMsg">
                        Loading users...
                    </span>
                </div>
            </div>
            {/* <!-- Analytics Snapshot --> */}
            <div className="x-card mb-4">
                <div className="x-card__header">
                    <div className="d-flex align-items-center gap-2">
                        <i className="fa-solid fa-chart-line u-text-primary">
                        </i>
                        <strong>
                            Signups (Last 6 Months)
                        </strong>
                    </div>
                    <span className="small u-text-muted">
                        Interactive
                    </span>
                </div>
                <div className="x-card__body">
                    {/* <canvas aria-label="Signups over time" height="120" id="signupChart" role="img">
                        </canvas> */}
                    <Line data={chartData} aria-label="Signups over time" height="120" id="signupChart" role="img" />
                </div>
            </div>
            {/* <!-- Toolbar: Search and Filters --> */}
            <div className="x-toolbar mb-3">
                <div className="x-search" role="search">
                    <i className="fa-solid fa-magnifying-glass">
                    </i>
                    <input aria-label="Search users"
                        className="form-control form-control-sm border-0"
                        id="searchInput" placeholder="Search by name, email, or organization..."
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="d-flex flex-wrap gap-2 align-items-center">
                    <div className="d-flex align-items-center gap-2">
                        <label className="x-label mb-0" htmlFor="filterType">
                            Type
                        </label>
                        <select value={filters.type} onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))} aria-label="Filter by account type" className="form-select form-select-sm x-select" id="filterType">
                            <option
                                //   selected="" 
                                value="all">
                                All
                            </option>
                            <option value="B2C">
                                B2C
                            </option>
                            <option value="B2B">
                                B2B
                            </option>
                        </select>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <label className="x-label mb-0" htmlFor="filterStatus">
                            Status
                        </label>
                        <select value={filters.status} onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))} aria-label="Filter by status" className="form-select form-select-sm x-select" id="filterStatus">
                            <option
                                //   selected="" 
                                value="all">
                                All
                            </option>
                            <option value="Active">
                                Active
                            </option>
                            <option value="Inactive">
                                Inactive
                            </option>
                        </select>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <label className="x-label mb-0" htmlFor="pageSize">
                            Page size
                        </label>
                        <select aria-label="Items per page" className="form-select form-select-sm x-select" id="pageSize">
                            <option
                                // selected
                                value="5">
                                5
                            </option>
                            <option value="10">
                                10
                            </option>
                            <option value="15">
                                15
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            {/* <!-- Data Table --> */}
            <div className="x-card">
                <div className="x-card__body p-0">
                    <div className="table-responsive">
                        <table aria-describedby="userTableCaption" className="x-table mb-0 align-middle">
                            <caption className="visually-hidden" id="userTableCaption">
                                Users and organizations management table
                            </caption>
                            <thead>
                                <tr>
                                    <th scope="col">
                                        S.No.
                                    </th>
                                    <th className="sortable" data-sort="name" scope="col" onClick={() => setSort({ column: "name", direction: sort.direction === "asc" ? "desc" : "asc" })}>
                                        Name / Company
                                        <i className="fa-solid fa-sort ms-1">
                                        </i>
                                    </th>
                                    <th scope="col">
                                        Email
                                    </th>
                                    <th scope="col">
                                        Account Type
                                    </th>
                                    <th className="text-center" scope="col">
                                        Status
                                    </th>
                                    <th onClick={() => setSort({ column: "date", direction: sort.direction === "asc" ? "desc" : "asc" })} className="sortable" data-sort="date" scope="col">
                                        Date Registered
                                        <i className="fa-solid fa-sort ms-1">
                                        </i>
                                    </th>
                                    <th className="text-end" scope="col">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="userTableBody">
                                {/* <!-- Rows injected by JS --> */}
                                {pageData.map((u, index) => (
                                    <tr key={u.id}>
                                        <td> {index + 1} </td>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.type}</td>
                                        <td>{u.status === 'Active' ?
                                            <span className="x-badge x-badge--success">Active</span> :
                                            <span className="x-badge x-badge--danger">Inactive</span>}</td>
                                        <td>{u.date} </td>
                                        {/* <td>
                                            <button className="btn btn-sm btn-secondary" onClick={() => { setSelectedUser(u); setShowModal(true); }}>
                                                Edit
                                            </button>
                                        </td> */}
                                        <td className="text-end">
                                            <div className="btn-group" role="group">
                                                <button className="x-btn x-btn--secondary x-btn--sm" data-action="edit" data-id="${u.id}" onClick={() => { setSelectedUser(u); setShowModal(true); }}><i className="fa-regular fa-pen-to-square"></i> Edit</button>
                                                <button className="x-btn x-btn--ghost x-btn--sm" data-action="more" data-id="${u.id}" data-bs-toggle="tooltip" title="More actions"><i className="fa-solid fa-ellipsis"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {pageData.length === 0 && (
                                    <tr><td colSpan={6} className="text-center">No users found</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="x-card__footer d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <div className="small text-muted" id="paginationInfo">
                        {/* Showing 0–0 of 0 */}
                        <small>Showing {pageData.length} of {total}</small>
                    </div>
                    <nav aria-label="User list pagination" className="x-pagination" id="paginationControls">
                        {/* <!-- Pagination buttons injected by JS --> */}
                        <div className="d-flex justify-content-between">

                            <div>
                                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}> <i className="fa-solid fa-angle-left"></i> Prev</button>
                                <span className="mx-2">Page {page} of {Math.ceil(total / pageSize)}</span>
                                <button onClick={() => setPage((p) => p + 1)} disabled={page * pageSize >= total}>Next <i className="fa-solid fa-angle-right"></i></button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            

            {showModal && (
                <div className="modal d-block" tabIndex={-1}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content p-3">
                            <h5>{selectedUser ? "Edit User" : "Create User"}</h5>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const form = e.target as HTMLFormElement;
                                    const payload = {
                                        name: (form.elements.namedItem("name") as HTMLInputElement).value,
                                        email: (form.elements.namedItem("email") as HTMLInputElement).value,
                                        type: (form.elements.namedItem("type") as HTMLSelectElement).value,
                                        status: (form.elements.namedItem("status") as HTMLInputElement).checked ? "Active" : "Inactive",
                                    };
                                    handleSaveUser(payload);
                                }}
                            >
                                <input name="name" defaultValue={selectedUser?.name || ""} className="form-control mb-2" placeholder="Name" required />
                                <input name="email" defaultValue={selectedUser?.email || ""} className="form-control mb-2" placeholder="Email" required type="email" />
                                <select name="type" defaultValue={selectedUser?.type || "B2C"} className="form-control mb-2">
                                    <option value="B2C">B2C</option>
                                    <option value="B2B">B2B</option>
                                </select>
                                <div className="form-check mb-2">
                                    <input type="checkbox" name="status" className="form-check-input" defaultChecked={selectedUser?.status === "Active"} />
                                    <label className="form-check-label">Active</label>
                                </div>
                                <div className="d-flex justify-content-end gap-2">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </form> 
                        </div>
                    </div>
                </div>
            )}
        </main>
       
    );
}




