"use client";

import { useState } from "react";
import "../../css/order_history.css";
//  import '../../css/admin_dashboard.css';
import Link from "next/link";
import QuotesHistory from "./history/page";
import QuotesManagementPage from "./management/page";
import QuotesDetailsPage from "./details/page";

export default function QuotesPage() {
    const [activeTab, setActiveTab] = useState<"management" | "details" | "history">("management");

    return (
        
        <main className="col-12 " id="main">
            {/* Toggle Navbar */}
            <div className="l-container py-1">
                <nav className="nav nav-pills mb-3">
                    <button
                        id={`${activeTab === "management" ? "page" : ""}`}
                        className={`x-nav__link ${activeTab === "management" ? "active" : ""}`}
                        onClick={() => setActiveTab("management")}
                    >
                        Quotes Management
                    </button>
                    <button
                        id={`${activeTab === "history" ? "page" : ""}`}
                        // aria-current={`${activeTab === "history" ? "page" : ""}`}
                        className={`x-nav__link ${activeTab === "history" ? "active" : ""}`}
                        onClick={() => setActiveTab("history")}
                    >

                        Quotes History
                    </button>
                    <button
                        id={`${activeTab === "details" ? "page" : ""}`}
                        className={`x-nav__link ${activeTab === "details" ? "active" : ""}`}
                        onClick={() => setActiveTab("details")}
                    >
                        Quotes Details
                    </button>

                </nav>
            </div>
            {/* Quotes Management Section */}
            {
                activeTab === "management" && (
                    <QuotesManagementPage />
                    
                )
            }
            {/* Quotes Details Section */}
            {
                activeTab === "details" && (
                    <QuotesDetailsPage />
                )
            }

            {/* Quotes History Section */}
            {
                activeTab === "history" && (
                    <QuotesHistory />
                )
            }

            
        </main >
    );
}
