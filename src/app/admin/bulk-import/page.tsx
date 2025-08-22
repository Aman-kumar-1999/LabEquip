"use client";

import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BulkImportPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileMetaVisible, setFileMetaVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadPct, setUploadPct] = useState(0);
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fmtBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024,
      sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileSelect = (file: File) => {
    if (!file) return;
    const maxBytes = 10 * 1024 * 1024;
    if (!file.name.endsWith(".csv") && !file.name.endsWith(".xlsx")) {
      Swal.fire("Invalid file", "Upload only .csv or .xlsx", "error");
      return;
    }
    if (file.size > maxBytes) {
      Swal.fire("File too large", "Max file size is 10 MB", "error");
      return;
    }
    setSelectedFile(file);
    setFileMetaVisible(true);
    Swal.fire("File ready", file.name, "success");
  };

  const simulateUpload = (isValidateOnly = false) => {
    if (!selectedFile) return;
    setUploading(true);
    setUploadPct(0);

    let pct = 0;
    const timer = setInterval(() => {
      pct = Math.min(100, pct + Math.floor(Math.random() * 20 + 5));
      setUploadPct(pct);
      if (pct >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          // Mock response
          const mockResults = [
            { row: 2, sku: "MICR-AX200", name: "Microscope AX-200", status: "success", message: "Created" },
            { row: 19, sku: "PIPT-10ML", name: "Pipette 10ml", status: "error", message: "Missing Brand" },
          ];
          setResults(mockResults);
          setShowResults(true);
          setUploading(false);
          Swal.fire("Done", isValidateOnly ? "Validation complete" : "Import complete", "success");
        }, 1200);
      }
    }, 300);
  };

  return (
    <main className="admin-main l-container py-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/admin_dashboard">Admin</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/admin_products">Products</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Bulk Import
          </li>
        </ol>
      </nav>

      {/* Upload Section */}
      <section className="x-card mb-4">
        <div className="x-card__body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h5 m-0">Upload your file</h2>
            <div className="d-flex gap-2">
              <button
                className="x-btn x-btn--secondary"
                disabled={!selectedFile || uploading}
                onClick={() => simulateUpload(true)}
              >
                Validate Only
              </button>
              <button
                className="x-btn x-btn--primary"
                disabled={!selectedFile || uploading}
                onClick={() => simulateUpload(false)}
              >
                {uploading ? `Uploading ${uploadPct}%` : "Import"}
              </button>
            </div>
          </div>

          <div
            className="c-dropzone text-center"
            role="button"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx"
              className="hidden"
              onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
            />
            <div className="d-flex flex-column align-items-center gap-2">
              <i className="fa-solid fa-cloud-arrow-up fa-2x u-text-primary"></i>
              <p className="m-0">Drag and drop or <span className="underline">browse</span></p>
              <small className="text-muted">Accepted: .csv, .xlsx | Max: 10 MB</small>
            </div>
          </div>

          {fileMetaVisible && selectedFile && (
            <div className="mt-3">
              <div className="d-flex align-items-center justify-content-between p-3 border rounded-3">
                <div>
                  <div className="fw-bold">{selectedFile.name}</div>
                  <small className="text-muted">{fmtBytes(selectedFile.size)}</small>
                </div>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => {
                    setSelectedFile(null);
                    setFileMetaVisible(true);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {uploading && (
            <div className="mt-3">
              <div className="progress">
                <div className="progress-bar progress-bar-striped" style={{ width: `${uploadPct}%` }}>
                  {uploadPct}%
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      {showResults && (
        <section className="x-card mb-4">
          <div className="x-card__header">
            <h2 className="h5 m-0">Import Results</h2>
          </div>
          <div className="x-card__body">
            <Bar
              data={{
                labels: ["Success", "Errors"],
                datasets: [{ data: [results.filter(r => r.status === "success").length, results.filter(r => r.status === "error").length], backgroundColor: ["#000080", "#CD2026"] }],
              }}
              options={{ responsive: true, plugins: { legend: { display: false } } }}
            />

            <table className="x-table mt-3">
              <thead>
                <tr>
                  <th>Row</th>
                  <th>SKU</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, idx) => (
                  <tr key={idx}>
                    <td>{r.row}</td>
                    <td>{r.sku}</td>
                    <td>{r.name}</td>
                    <td>
                      {r.status === "success" ? (
                        <span className="badge bg-success">Success</span>
                      ) : (
                        <span className="badge bg-danger">Error</span>
                      )}
                    </td>
                    <td>{r.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </main>
  );
}
