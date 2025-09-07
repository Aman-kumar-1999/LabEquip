"use client";

import { useState } from "react";
import "../../css/order_history.css";
//  import '../../css/admin_dashboard.css';
import OrderHistory from "./history/page";
import OrderManagementPage from "./order-management/page";
import Link from "next/link";

export default function OrdersPage() {
    const [activeTab, setActiveTab] = useState<"history" | "details">("history");

    return (
        
        <main className="col-12 " id="main">
            {/* Toggle Navbar */}
            <div className="l-container py-1">
                <nav className="nav nav-pills mb-3">
                    <button
                        id={`${activeTab === "history" ? "page" : ""}`}
                        // aria-current={`${activeTab === "history" ? "page" : ""}`}
                        className={`x-nav__link ${activeTab === "history" ? "active" : ""}`}
                        onClick={() => setActiveTab("history")}
                    >

                        Order History
                    </button>
                    <button
                        id={`${activeTab === "details" ? "page" : ""}`}
                        className={`x-nav__link ${activeTab === "details" ? "active" : ""}`}
                        onClick={() => setActiveTab("details")}
                    >
                        Order Details
                    </button>
                </nav>
            </div>


            {/* Order History Section */}
            {
                activeTab === "history" && (
                    <OrderHistory />
                )
            }

            {/* Order Details Section */}
            {
                activeTab === "details" && (
                    <OrderManagementPage />
                    
                )
            }
        </main >
    );
}
