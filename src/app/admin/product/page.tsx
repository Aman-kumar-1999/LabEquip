"use client";

import { useMemo, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Swal from "sweetalert2";



ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProductManagementPage() {
  // ---------------------------
  // State
  // ---------------------------
  const [categories, setCategories] = useState([
    { id: "cat-lab", name: "Lab Equipment", description: "Instruments and lab essentials." },
    { id: "cat-microscopes", name: "Microscopes", description: "Research and teaching microscopes." },
    { id: "cat-chemicals", name: "Chemicals", description: "Research-grade chemicals and reagents." },
    { id: "cat-kits", name: "Kits", description: "Ready-to-use experiment kits." },
    { id: "cat-diagnostics", name: "Diagnostics", description: "Medical diagnostic tools and kits." },
    { id: "cat-other", name: "Other", description: "Miscellaneous products." },
  ]);

  const [products, setProducts] = useState([
    { id: "p-101", name: "Zeiss Axio Lab.A1 Microscope", category_id: "cat-microscopes", updatedAt: "2025-08-01 10:24" },
    { id: "p-102", name: "Helix PCR Kit", category_id: "cat-kits", updatedAt: "2025-08-02 14:05" },
    { id: "p-103", name: "Sigma Chemicals Pack", category_id: "cat-chemicals", updatedAt: "2025-08-04 09:48" },
    { id: "p-104", name: "NanoDrop Spectrophotometer", category_id: "cat-lab", updatedAt: "2025-08-05 12:16" },
    { id: "p-105", name: "Rapid Antigen Test Kit", category_id: "cat-diagnostics", updatedAt: "2025-08-06 11:02" },
    { id: "p-106", name: "General Lab Glassware Set", category_id: "cat-lab", updatedAt: "2025-08-07 10:02" },
  ]);

  const [categorySearch, setCategorySearch] = useState("");
  const [categorySortDir, setCategorySortDir] = useState<"asc" | "desc">("asc");

  const [productSearch, setProductSearch] = useState("");
  const [productPage, setProductPage] = useState(1);
  const productPageSize = 5;

  // ---------------------------
  // Computed Data
  // ---------------------------
  const filteredCategories = useMemo(() => {
    const rows = categories.filter(
      (c) =>
        c.name.toLowerCase().includes(categorySearch.toLowerCase()) ||
        c.description.toLowerCase().includes(categorySearch.toLowerCase())
    );
    rows.sort((a, b) =>
      categorySortDir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    return rows;
  }, [categories, categorySearch, categorySortDir]);

  const productFiltered = useMemo(() => {
    return products.filter((p) => p.name.toLowerCase().includes(productSearch.toLowerCase()));
  }, [products, productSearch]);

  const productPageData = useMemo(() => {
    const totalPages = Math.max(1, Math.ceil(productFiltered.length / productPageSize));
    const page = Math.min(productPage, totalPages);
    const start = (page - 1) * productPageSize;
    const end = Math.min(start + productPageSize, productFiltered.length);
    return { rows: productFiltered.slice(start, end), totalPages, start, end };
  }, [productFiltered, productPage]);

  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach((c) => (counts[c.name] = 0));
    products.forEach((p) => {
      const cat = categories.find((c) => c.id === p.category_id);
      if (cat) counts[cat.name] = (counts[cat.name] || 0) + 1;
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
  }, [categories, products]);

  // ---------------------------
  // Handlers
  // ---------------------------
  const handleCategoryForm = async (mode: "create" | "edit", cat?: any) => {
    const { value: formValues } = await Swal.fire({
      title: mode === "create" ? "Create Category" : "Edit Category",
      html: `
        <div style="text-align: left;">
          <label class="x-label mb-1" for="swal-cat-name">Category Name <span class="text-danger">*</span></label>
          <input id="swal-cat-name" class="form-control" value="${cat?.name || ""}" />
          <label class="x-label mt-3 mb-1" for="swal-cat-desc">Description</label>
          <textarea id="swal-cat-desc" class="form-control">${cat?.description || ""}</textarea>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Save",
      preConfirm: () => {
        const name = (document.getElementById("swal-cat-name") as HTMLInputElement).value.trim();
        const description = (document.getElementById("swal-cat-desc") as HTMLTextAreaElement).value.trim();
        if (!name) {
          Swal.showValidationMessage("Category Name is required.");
          return false;
        }
        const isDuplicate = categories.some(
          (c) => c.name.toLowerCase() === name.toLowerCase() && c.id !== (cat?.id || "")
        );
        if (isDuplicate) {
          Swal.showValidationMessage("Category Name must be unique.");
          return false;
        }
        return { name, description };
      },
    });

    if (!formValues) return;

    if (mode === "create") {
      setCategories((prev) => [
        ...prev,
        {
          id: "cat-" + formValues.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          name: formValues.name,
          description: formValues.description,
        },
      ]);
    } else if (cat) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === cat.id ? { ...c, name: formValues.name, description: formValues.description } : c
        )
      );
    }
  };

   const handleProductForm = async (mode: "create" | "edit", product?: any) => {
    const { value: formValues } = await Swal.fire({
      title: mode === "create" ? "Create Product" : "Edit Product",
      html: `
        <div style="text-align: left;">
          <label class="x-label mb-1" for="swal-prod-name">Product Name <span class="text-danger">*</span></label>
          <input id="swal-prod-name" class="form-control" value="${product?.name || ""}" />
          <label class="x-label mt-3 mb-1" for="swal-prod-cat">Category</label>
          <select id="swal-prod-cat" class="form-select form-select-sm">
            ${categories
              .map(
                (c) =>
                  `<option value="${c.id}" ${product?.category_id === c.id ? "selected" : ""}>${c.name}</option>`
              )
              .join("")}
          </select>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Save",
      preConfirm: () => {
        const name = (document.getElementById("swal-prod-name") as HTMLInputElement)?.value.trim();
        const category_id = (document.getElementById("swal-prod-cat") as HTMLSelectElement)?.value;
        const updatedAt = new Date().toISOString().slice(0, 16).replace("T", " ");
        if (!name) {
          Swal.showValidationMessage("Product Name is required.");
          return false;
        }
        const isDuplicate = products.some(
          (p) => p.name.toLowerCase() === name.toLowerCase() && p.id !== (product?.id || "")
        );
        if (isDuplicate) {
          Swal.showValidationMessage("Product Name must be unique.");
          return false;
        }
        return { name, category_id, updatedAt };
      },
    });

    if (!formValues) return;

    if (mode === "create") {
      setProducts((prev) => [
        ...prev,
        {
          id: "p-" + formValues.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          name: formValues.name,
          category_id: formValues.category_id,
          updatedAt: formValues.updatedAt,
        },
      ]);
    } else if (product) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id
            ? { ...p, name: formValues.name, category_id: formValues.category_id, updatedAt: formValues.updatedAt }
            : p
        )
      );
    }
  };

  const handleDeleteCategory = (catId: string) => {
    const assignedCount = products.filter((p) => p.category_id === catId).length;
    if (assignedCount > 0) {
      Swal.fire("Error", "This category has assigned products. Reassign first.", "error");
      return;
    }
    Swal.fire({
      title: "Delete this category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((res) => {
      if (res.isConfirmed) {
        setCategories((prev) => prev.filter((c) => c.id !== catId));
      }
    });
  };

  // ---------------------------
  // JSX
  // ---------------------------
  return (
    <main id="main">
      <div className="l-container p-0">
        {/* Breadcrumb */}
        <div className="mb-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-1">
              <li className="breadcrumb-item">
                <a href="/admin">Admin</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Product Management
              </li>
            </ol>
          </nav>
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            <h1 className="h3 m-0">Admin Product Management</h1>
            <button className="x-btn x-btn--secondary">
              <i className="fa-solid fa-rotate"></i> <span className="ms-2">Refresh</span>
            </button>
          </div>
        </div>

        <div className="row g-3">
          {/* Category Management */}
          <section className="col-12 col-xl-6">
            <div className="x-card h-100">
              <div className="x-card__header d-flex justify-content-between">
                <h2 className="h5 m-0">Category Management</h2>
                <div className="d-flex gap-2">
                  <input
                    type="search"
                    placeholder="Search categories..."
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    className="form-control form-control-sm"
                  />
                  <button className="x-btn x-btn--primary" onClick={() => handleCategoryForm("create")}>
                    <i className="fa-solid fa-plus"></i> <span className="ms-2">Create Category</span>
                  </button>
                </div>
              </div>
              <div className="x-card__body">
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        Category Name
                        <button onClick={() => setCategorySortDir("asc")}>A-Z</button>
                        <button onClick={() => setCategorySortDir("desc")}>Z-A</button>
                      </th>
                      <th>Description</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCategories.map((c) => (
                      <tr key={c.id}>
                        <td>{c.name}</td>
                        <td>{c.description}</td>
                        <td className="text-end">
                          <button
                            onClick={() => handleCategoryForm("edit", c)}
                            className="btn btn-sm btn-outline-primary"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(c.id)}
                            className="btn btn-sm btn-outline-danger ms-2"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>Showing {filteredCategories.length} of {categories.length}</div>
              </div>
            </div>
          </section>

          {/* Product Management */}
          
          <section className="col-12 col-xl-6">
            <div className="x-card h-100">
              <div className="x-card__header d-flex justify-content-between">
                <div className="d-flex gap-2">
                  <h2 className="h5 m-0">Products</h2>
                  <input
                    type="search"
                    placeholder="Search products..."
                    value={productSearch}
                    onChange={(e) => {
                      setProductSearch(e.target.value);
                      setProductPage(1);
                    }}
                    className="form-control form-control-sm"
                  />
                  <button className="x-btn x-btn--primary" onClick={() => handleProductForm("create")}>
                    <i className="fa-solid fa-plus"></i> <span className="ms-2">Create Product</span>
                  </button>
                </div>
              </div>
              <div className="x-card__body">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productPageData.rows.map((p) => (
                      <tr key={p.id}>
                        <td>{p.name}</td>
                        <td>
                          <select
                            value={p.category_id}
                            onChange={(e) =>
                              setProducts((prev) =>
                                prev.map((pp) =>
                                  pp.id === p.id
                                    ? { ...pp, category_id: e.target.value, updatedAt: new Date().toISOString().slice(0, 16).replace("T", " ") }
                                    : pp
                                )
                              )
                            }
                            className="form-select form-select-sm"
                          >
                            {categories.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>{p.updatedAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="d-flex justify-content-between">
                  <span>
                    Page {productPage} of {productPageData.totalPages} · Showing{" "}
                    {productFiltered.length === 0 ? 0 : productPageData.start + 1}–{productPageData.end} of {productFiltered.length}
                  </span>
                  <div>
                    <button disabled={productPage <= 1} onClick={() => setProductPage(productPage - 1)}>
                        <i className="fa-solid fa-chevron-left"></i>
                      Prev
                    </button>
                    <span className="mx-2">|</span>
                    <button disabled={productPage >= productPageData.totalPages} onClick={() => setProductPage(productPage + 1)}>
                      Next
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Chart */}
          <section className="col-12 col-xl-6">
            <div className="x-card">
              <div className="x-card__header">
                <h2 className="h5 m-0">Products per Category</h2>
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


// "use client";

// import { useMemo, useState } from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Doughnut } from "react-chartjs-2";
// import Swal from "sweetalert2";

// // import "../../css/admin_products.css"; // New CSS for product management

// ChartJS.register(ArcElement, Tooltip, Legend);

// export default function ProductManagementPage() {
//   // ---------------------------
//   // State
//   // ---------------------------
//   const [categories, setCategories] = useState([
//     { id: "cat-lab", name: "Lab Equipment", description: "Instruments and lab essentials." },
//     { id: "cat-microscopes", name: "Microscopes", description: "Research and teaching microscopes." },
//     { id: "cat-chemicals", name: "Chemicals", description: "Research-grade chemicals and reagents." },
//     { id: "cat-kits", name: "Kits", description: "Ready-to-use experiment kits." },
//     { id: "cat-diagnostics", name: "Diagnostics", description: "Medical diagnostic tools and kits." },
//     { id: "cat-other", name: "Other", description: "Miscellaneous products." },
//   ]);

//   const [products, setProducts] = useState([
//     { id: "p-101", name: "Zeiss Axio Lab.A1 Microscope", category_id: "cat-microscopes", updatedAt: "2025-08-01 10:24" },
//     { id: "p-102", name: "Helix PCR Kit", category_id: "cat-kits", updatedAt: "2025-08-02 14:05" },
//     { id: "p-103", name: "Sigma Chemicals Pack", category_id: "cat-chemicals", updatedAt: "2025-08-04 09:48" },
//     { id: "p-104", name: "NanoDrop Spectrophotometer", category_id: "cat-lab", updatedAt: "2025-08-05 12:16" },
//     { id: "p-105", name: "Rapid Antigen Test Kit", category_id: "cat-diagnostics", updatedAt: "2025-08-06 11:02" },
//     { id: "p-106", name: "General Lab Glassware Set", category_id: "cat-lab", updatedAt: "2025-08-07 10:02" },
//   ]);

//   const [categorySearch, setCategorySearch] = useState("");
//   const [categorySortDir, setCategorySortDir] = useState<"asc" | "desc">("asc");

//   const [productSearch, setProductSearch] = useState("");
//   const [productPage, setProductPage] = useState(1);
//   const productPageSize = 5;

//   // ---------------------------
//   // Computed Data
//   // ---------------------------
//   const filteredCategories = useMemo(() => {
//     const rows = categories.filter(
//       (c) =>
//         c.name.toLowerCase().includes(categorySearch.toLowerCase()) ||
//         c.description.toLowerCase().includes(categorySearch.toLowerCase())
//     );
//     rows.sort((a, b) =>
//       categorySortDir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
//     );
//     return rows;
//   }, [categories, categorySearch, categorySortDir]);

//   const productFiltered = useMemo(() => {
//     return products.filter((p) => p.name.toLowerCase().includes(productSearch.toLowerCase()));
//   }, [products, productSearch]);

//   const productPageData = useMemo(() => {
//     const totalPages = Math.max(1, Math.ceil(productFiltered.length / productPageSize));
//     const page = Math.min(productPage, totalPages);
//     const start = (page - 1) * productPageSize;
//     const end = Math.min(start + productPageSize, productFiltered.length);
//     return { rows: productFiltered.slice(start, end), totalPages, start, end };
//   }, [productFiltered, productPage]);

//   const chartData = useMemo(() => {
//     const counts: Record<string, number> = {};
//     categories.forEach((c) => (counts[c.name] = 0));
//     products.forEach((p) => {
//       const cat = categories.find((c) => c.id === p.category_id);
//       if (cat) counts[cat.name] = (counts[cat.name] || 0) + 1;
//     });
//     return {
//       labels: Object.keys(counts),
//       datasets: [
//         {
//           data: Object.values(counts),
//           backgroundColor: ["#000080", "#0099D2", "#00774E", "#FFA500", "#CD2026", "#6C757D"],
//           borderWidth: 1,
//         },
//       ],
//     };
//   }, [categories, products]);

//   // ---------------------------
//   // Handlers
//   // ---------------------------
//   const handleCategoryForm = async (mode: "create" | "edit", cat?: any) => {
//     const { value: formValues } = await Swal.fire({
//       title: mode === "create" ? "Create Category" : "Edit Category",
//       html: `
//         <div style="text-align: left;">
//           <label class="x-label mb-1" for="swal-cat-name">Category Name <span class="text-danger">*</span></label>
//           <input id="swal-cat-name" class="form-control" value="${cat?.name || ""}" />
//           <label class="x-label mt-3 mb-1" for="swal-cat-desc">Description</label>
//           <textarea id="swal-cat-desc" class="form-control">${cat?.description || ""}</textarea>
//         </div>
//       `,
//       focusConfirm: false,
//       showCancelButton: true,
//       confirmButtonText: "Save",
//       preConfirm: () => {
//         const name = (document.getElementById("swal-cat-name") as HTMLInputElement).value.trim();
//         const description = (document.getElementById("swal-cat-desc") as HTMLTextAreaElement).value.trim();
//         if (!name) {
//           Swal.showValidationMessage("Category Name is required.");
//           return false;
//         }
//         const isDuplicate = categories.some(
//           (c) => c.name.toLowerCase() === name.toLowerCase() && c.id !== (cat?.id || "")
//         );
//         if (isDuplicate) {
//           Swal.showValidationMessage("Category Name must be unique.");
//           return false;
//         }
//         return { name, description };
//       },
//     });

//     if (!formValues) return;

//     if (mode === "create") {
//       setCategories((prev) => [
//         ...prev,
//         {
//           id: "cat-" + formValues.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
//           name: formValues.name,
//           description: formValues.description,
//         },
//       ]);
//     } else if (cat) {
//       setCategories((prev) =>
//         prev.map((c) =>
//           c.id === cat.id ? { ...c, name: formValues.name, description: formValues.description } : c
//         )
//       );
//     }
//   };

//   const handleProductForm = async (mode: "create" | "edit", product?: any) => {
//     const { value: formValues } = await Swal.fire({
//       title: mode === "create" ? "Create Product" : "Edit Product",
//       html: `
//         <div style="text-align: left;">
//           <label class="x-label mb-1" for="swal-prod-name">Product Name <span class="text-danger">*</span></label>
//           <input id="swal-prod-name" class="form-control" value="${product?.name || ""}" />
//           <label class="x-label mt-3 mb-1" for="swal-prod-cat">Category</label>
//           <select id="swal-prod-cat" class="form-select form-select-sm">
//             ${categories
//               .map(
//                 (c) =>
//                   `<option value="${c.id}" ${product?.category_id === c.id ? "selected" : ""}>${c.name}</option>`
//               )
//               .join("")}
//           </select>
//         </div>
//       `,
//       focusConfirm: false,
//       showCancelButton: true,
//       confirmButtonText: "Save",
//       preConfirm: () => {
//         const name = (document.getElementById("swal-prod-name") as HTMLInputElement)?.value.trim();
//         const category_id = (document.getElementById("swal-prod-cat") as HTMLSelectElement)?.value;
//         const updatedAt = new Date().toISOString().slice(0, 16).replace("T", " ");
//         if (!name) {
//           Swal.showValidationMessage("Product Name is required.");
//           return false;
//         }
//         const isDuplicate = products.some(
//           (p) => p.name.toLowerCase() === name.toLowerCase() && p.id !== (product?.id || "")
//         );
//         if (isDuplicate) {
//           Swal.showValidationMessage("Product Name must be unique.");
//           return false;
//         }
//         return { name, category_id, updatedAt };
//       },
//     });

//     if (!formValues) return;

//     if (mode === "create") {
//       setProducts((prev) => [
//         ...prev,
//         {
//           id: "p-" + formValues.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
//           name: formValues.name,
//           category_id: formValues.category_id,
//           updatedAt: formValues.updatedAt,
//         },
//       ]);
//     } else if (product) {
//       setProducts((prev) =>
//         prev.map((p) =>
//           p.id === product.id
//             ? { ...p, name: formValues.name, category_id: formValues.category_id, updatedAt: formValues.updatedAt }
//             : p
//         )
//       );
//     }
//   };

//   const handleDeleteCategory = (catId: string) => {
//     const assignedCount = products.filter((p) => p.category_id === catId).length;
//     if (assignedCount > 0) {
//       Swal.fire("Error", "This category has assigned products. Reassign first.", "error");
//       return;
//     }
//     Swal.fire({
//       title: "Delete this category?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Delete",
//     }).then((res) => {
//       if (res.isConfirmed) {
//         setCategories((prev) => prev.filter((c) => c.id !== catId));
//       }
//     });
//   };

//   // ---------------------------
//   // JSX
//   // ---------------------------
//   return (
//     <main id="main">
//       <div className="l-container p-0">
//         {/* Breadcrumb */}
//         <div className="mb-3">
//           <nav aria-label="breadcrumb">
//             <ol className="breadcrumb mb-1">
//               <li className="breadcrumb-item">
//                 <a href="/admin">Admin</a>
//               </li>
//               <li className="breadcrumb-item active" aria-current="page">
//                 Product Management
//               </li>
//             </ol>
//           </nav>
//           <div className="d-flex flex-wrap align-items-center justify-content-between">
//             <h1 className="h3 m-0">Admin Product Management</h1>
//             <button className="x-btn x-btn--secondary">
//               <i className="fa-solid fa-rotate"></i> <span className="ms-2">Refresh</span>
//             </button>
//           </div>
//         </div>

//         <div className="row g-3">
          
//           {/* Chart */}
//           <section className="col-12 col-md-6">
//             <div className="x-card">
//               <div className="x-card__header">
//                 <h2 className="h5 m-0">Products per Category</h2>
//               </div>
//               <div className="x-card__body">
//                 <Doughnut data={chartData} />
//               </div>
//             </div>
//           </section>
//           {/* Category Management */}
//           <section className="col-12 col-xl-6">
//             <div className="x-card h-100">
//               <div className="x-card__header d-flex justify-content-between">
//                 <h2 className="h5 m-0">Category Management</h2>
//                 <div className="d-flex gap-2">
//                   <input
//                     type="search"
//                     placeholder="Search categories..."
//                     value={categorySearch}
//                     onChange={(e) => setCategorySearch(e.target.value)}
//                     className="form-control form-control-sm"
//                   />
//                   <button className="x-btn x-btn--primary" onClick={() => handleCategoryForm("create")}>
//                     <i className="fa-solid fa-plus"></i> <span className="ms-2">Create Category</span>
//                   </button>
//                 </div>
//               </div>
//               <div className="x-card__body">
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       <th>
//                         Category Name
//                         <button onClick={() => setCategorySortDir("asc")}>A-Z</button>
//                         <button onClick={() => setCategorySortDir("desc")}>Z-A</button>
//                       </th>
//                       <th>Description</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredCategories.map((c) => (
//                       <tr key={c.id}>
//                         <td>{c.name}</td>
//                         <td>{c.description}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 <div>Showing {filteredCategories.length} of {categories.length}</div>
//               </div>
//             </div>
//           </section>

//           {/* Product Management */}
//           <section className="col-12 col-xl-6">
//             <div className="x-card h-100">
//               <div className="x-card__header d-flex justify-content-between">
//                 <div className="d-flex gap-2">
//                   <h2 className="h5 m-0">Products</h2>
//                   <input
//                     type="search"
//                     placeholder="Search products..."
//                     value={productSearch}
//                     onChange={(e) => {
//                       setProductSearch(e.target.value);
//                       setProductPage(1);
//                     }}
//                     className="form-control form-control-sm"
//                   />
//                   <button className="x-btn x-btn--primary" onClick={() => handleProductForm("create")}>
//                     <i className="fa-solid fa-plus"></i> <span className="ms-2">Create Product</span>
//                   </button>
//                 </div>
//               </div>
//               <div className="x-card__body">
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       <th>Product</th>
//                       <th>Category</th>
//                       <th>Updated</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {productPageData.rows.map((p) => (
//                       <tr key={p.id}>
//                         <td>{p.name}</td>
//                         <td>
//                           <select
//                             value={p.category_id}
//                             onChange={(e) =>
//                               setProducts((prev) =>
//                                 prev.map((pp) =>
//                                   pp.id === p.id
//                                     ? { ...pp, category_id: e.target.value, updatedAt: new Date().toISOString().slice(0, 16).replace("T", " ") }
//                                     : pp
//                                 )
//                               )
//                             }
//                             className="form-select form-select-sm"
//                           >
//                             {categories.map((c) => (
//                               <option key={c.id} value={c.id}>
//                                 {c.name}
//                               </option>
//                             ))}
//                           </select>
//                         </td>
//                         <td>{p.updatedAt}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 <div className="d-flex justify-content-between">
//                   <span>
//                     Page {productPage} of {productPageData.totalPages} · Showing{" "}
//                     {productFiltered.length === 0 ? 0 : productPageData.start + 1}–{productPageData.end} of {productFiltered.length}
//                   </span>
//                   <div>
//                     <button disabled={productPage <= 1} onClick={() => setProductPage(productPage - 1)}>
//                       <i className="fa-solid fa-chevron-left"></i>
//                       Prev
//                     </button>
//                     <span className="mx-2">|</span>
//                     <button disabled={productPage >= productPageData.totalPages} onClick={() => setProductPage(productPage + 1)}>
                      
//                       Next
//                       <i className="fa-solid fa-chevron-right"></i>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>

          
//         </div>
//       </div>
//     </main>
//   );
// }
