
'use client';

import { Poppins } from 'next/font/google';
import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";
import '../css/product_listing.css'
// import Script from "next/script";



import { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import { products, Product } from '../data/products';
import Link from "next/link";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

interface Props {

  onChange?: (range: [number, number]) => void; // callback to parent
}

// export const metadata: Metadata = {
//   title: "LabEquip",
// };

export default function ProductPage({ onChange }: Props) {

  const [page, setPage] = useState(1);

  // Example data (replace with dynamic categories/brands/purity from API)
  const categories = ["Microscopes", "Reagents", "Glassware"];
  const brands = ["Zeiss", "Thermo Fisher", "Eppendorf"];
  const purities = ["Analytical", "Lab Grade", "Pharma Grade"];

  const [compareChecked, setCompareChecked] = useState(false);
  const [query, setQuery] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sort, setSort] = useState('relevance');
  const [institution, setInstitution] = useState(false);




  // Selected filters
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [selectedPurity, setSelectedPurity] = useState<Set<string>>(new Set());


  const handleCategoryChange = (value: string, checked: boolean) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      checked ? newSet.add(value) : newSet.delete(value);
      return newSet;
    });
    setPage(1);
  };

  const handleBrandChange = (value: string, checked: boolean) => {
    setSelectedBrands((prev) => {
      const newSet = new Set(prev);
      checked ? newSet.add(value) : newSet.delete(value);
      return newSet;
    });
    setPage(1);
  };

  const handlePurityChange = (value: string, checked: boolean) => {
    setSelectedPurity((prev) => {
      const newSet = new Set(prev);
      checked ? newSet.add(value) : newSet.delete(value);
      return newSet;
    });
    setPage(1);
  };


  // Price range

  const sliderRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState<[number, number]>([0, 0]);

  // Compute min & max from products
  const minPrice = Math.floor(
    products.reduce(
      (m, p) => Math.min(m, p.priceRetail, p.priceInstitutional),
      Infinity
    )
  );
  const maxPrice = Math.ceil(
    products.reduce(
      (m, p) => Math.max(m, p.priceRetail, p.priceInstitutional),
      0
    )
  );

  // Init noUiSlider once
  useEffect(() => {
    if (!sliderRef.current) return;

    const slider = noUiSlider.create(sliderRef.current, {
      start: [minPrice, maxPrice],
      connect: true,
      tooltips: [true, true],
      step: 1,
      range: {
        min: minPrice,
        max: maxPrice,
      },
    });

    slider.on("change", (values: (string | number)[]) => {
      const newRange: [number, number] = [+values[0], +values[1]];
      setRange(newRange);
      onChange?.(newRange);
    });

    return () => {
      slider.destroy();
    };
  }, [minPrice, maxPrice, onChange]);

  // const minPrice = useMemo(() => Math.min(...products.map(p => p.priceRetail)), []);
  // const maxPrice = useMemo(() => Math.max(...products.map(p => p.priceRetail)), []);
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);



  // Filtering
  const filtered = useMemo(() => {
    return products.filter(p => {
      const price = institution ? p.priceInstitutional : p.priceRetail;
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
      const inCat = selectedCategories.size === 0 || selectedCategories.has(p.category);
      const inBrand = selectedBrands.size === 0 || selectedBrands.has(p.brand);
      const inPurity = selectedPurity.size === 0 || (p.purity && selectedPurity.has(p.purity));
      const inPrice = price >= priceRange[0] && price <= priceRange[1];
      return matchesQuery && inCat && inBrand && inPurity && inPrice;
    });
  }, [query, selectedCategories, selectedBrands, selectedPurity, priceRange, institution]);

  // Sorting
  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case 'priceAsc': return arr.sort((a, b) => (institution ? a.priceInstitutional : a.priceRetail) - (institution ? b.priceInstitutional : b.priceRetail));
      case 'priceDesc': return arr.sort((a, b) => (institution ? b.priceInstitutional : b.priceRetail) - (institution ? a.priceInstitutional : a.priceRetail));
      case 'nameAsc': return arr.sort((a, b) => a.name.localeCompare(b.name));
      case 'nameDesc': return arr.sort((a, b) => b.name.localeCompare(a.name));
      default: return arr;
    }
  }, [filtered, sort, institution]);


  return (
    <main className={` container`}>

      <main className="l-container my-4" id="mainContent">
        {/* <!-- Breadcrumb --> */}
        <nav aria-label="breadcrumb" className="x-breadcrumb mb-3">
          <a href="/">
            Home
          </a>
          <span aria-hidden="true">
            /
          </span>
          <span>
            Product Listing
          </span>
        </nav>
        {/* <!-- Context/Info Alert --> */}
        <div aria-live="polite" className="x-alert x-alert--info mb-3" role="status">
          <i className="fa-solid fa-circle-info u-text-info">
          </i>
          <div>
            Refine results using Filters. Prices shown default to Retail. Toggle Institutional Pricing to simulate B2B view.
          </div>
        </div>
        {/* <!-- Toolbar Row --> */}
        <div className="x-toolbar mb-3 d-flex flex-wrap gap-2 align-items-center">
          {/* <!-- Mobile Filter Button --> */}
          <button aria-controls="filterOffcanvas" className="x-btn x-btn--secondary d-lg-none" data-bs-target="#filterOffcanvas" data-bs-toggle="offcanvas">
            <i className="fa-solid fa-sliders">
            </i>
            Filters
          </button>
          {/* <!-- Results Count --> */}
          {/* <div className="fw-bold" id="resultsCount">
            Showing 0–0 of 0 products
          </div> */}
          {/* <!-- Search in results --> */}
          <div className="x-search flex-grow-1" role="search">
            <i className="fa-solid fa-magnifying-glass u-text-muted">
            </i>
            <input value={query} aria-label="Search in results" className="form-control form-control-sm border-0" id="searchInput" placeholder="Search in results (e.g., 'Zeiss', '99.9%')" type="search" onChange={e => setQuery(e.target.value)} />
          </div>
          {/* <!-- Sort --> */}
          <div className="d-flex align-items-center gap-2 ms-auto">
            <label className="x-label m-0">
              Sort by
            </label>
            <select aria-label="Sort products" value={sort}
              onChange={e => setSort(e.target.value)} className="form-select form-select-sm x-select" id="sortSelect">
              <option value="relevance">
                Relevance
              </option>
              <option value="priceAsc">
                Price: Low to High
              </option>
              <option value="priceDesc">
                Price: High to Low
              </option>
              <option value="nameAsc">
                Name: A → Z
              </option>
              <option value="nameDesc">
                Name: Z → A
              </option>
            </select>
          </div>
          {/* <!-- View Toggle --> */}
          <div aria-label="View toggle" className="btn-group" role="group">
            <button aria-pressed="true" className="x-btn x-btn--secondary x-btn--sm active" id="gridViewBtn">
              <i className="fa-solid fa-grip">
              </i>
              Grid
            </button>
            <button aria-pressed="false" className="x-btn x-btn--secondary x-btn--sm" id="listViewBtn">
              <i className="fa-solid fa-list">
              </i>
              List
            </button>
          </div>
          {/* <!-- Pricing Tier Toggle (simulate B2B) --> */}
          <div aria-live="polite" className="d-flex align-items-center gap-2">
            <span className="small u-text-muted">
              Institutional Pricing
            </span>
            <button onClick={() => setInstitution(!institution)} aria-checked="false" aria-label="Toggle institutional pricing" className="x-switch" id="tierToggle" role="switch" type="button">
              <span className="x-switch__thumb">
              </span>
            </button>
            {institution ? 'Institution Pricing' : 'Retail Pricing'}
          </div>
          <div className="fw-bold" id="resultsCount">
            Showing 0–0 of 0 products
          </div>
        </div>
        <div className="row g-4">
          {/* <!-- Filter Sidebar (Desktop) --> */}
          <aside className="col-lg-3 d-none d-lg-block">
            <div className="x-card plp-sidebar sticky-top" style={{ top: "90px" }}>
              <div className="x-card__header">
                <div className="d-flex align-items-center gap-2">
                  <i className="fa-solid fa-sliders">
                  </i>
                  <h5 className="m-2">
                    Filters
                  </h5>
                </div>
                <button className="x-btn x-btn--link x-btn--sm" id="clearFiltersBtn">
                  <i className="fa-regular fa-circle-xmark">
                  </i>
                  Clear all
                </button>
              </div>
              <div className="x-card__body">
                {/* <!-- Price Range --> */}
                {/* <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong>
                      Price Range
                    </strong>
                    <span className="badge x-badge" id="priceRangeLabel">
                      $0 - $0
                    </span>
                  </div>
                  <div id="priceSlider">
                  </div>
                </div> */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong>Price Range</strong>
                    <span className="badge x-badge">
                      {/* ${range[0]} - ${range[1]} */}
                    </span>
                  </div>
                  <hr className="hr" />
                  <div ref={sliderRef} id="priceSlider"></div>
                </div>
                <hr className="hr" />
                {/* <!-- Accordion Filters --> */}
                <div className="accordion" id="filtersAccordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingCategory">
                      <button aria-controls="collapseCategory" aria-expanded="true" className="accordion-button" data-bs-target="#collapseCategory" data-bs-toggle="collapse" type="button">
                        Category
                      </button>
                    </h2>
                    <div style={{ marginLeft: '20px' }} aria-labelledby="headingCategory" className="accordion-collapse collapse show" data-bs-parent="#filtersAccordion" id="collapseCategory">
                      <div className="accordion-body" id="filterCategory">
                        {categories.map((category) => (
                          <div key={category} className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`filterCategory-${category}`}
                              checked={selectedCategories.has(category)}
                              onChange={(e) => handleCategoryChange(category, e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor={`filterCategory-${category}`}>
                              {category}
                            </label>
                          </div>
                        ))}

                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingBrand">
                      <button aria-controls="collapseBrand" aria-expanded="false" className="accordion-button collapsed" data-bs-target="#collapseBrand" data-bs-toggle="collapse" type="button">
                        Brand
                      </button>
                    </h2>
                    <div style={{ marginLeft: '20px' }} aria-labelledby="headingBrand" className="accordion-collapse collapse" data-bs-parent="#filtersAccordion" id="collapseBrand">
                      <div className="accordion-body" id="filterBrand">
                        {brands.map((brand) => (
                          <div key={brand} className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`filterBrand-${brand}`}
                              checked={selectedBrands.has(brand)}
                              onChange={(e) => handleBrandChange(brand, e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor={`filterBrand-${brand}`}>
                              {brand}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingPurity">
                      <button aria-controls="collapsePurity" aria-expanded="false" className="accordion-button collapsed" data-bs-target="#collapsePurity" data-bs-toggle="collapse" type="button">
                        Purity Grade
                      </button>
                    </h2>
                    <div style={{ marginLeft: '20px' }} aria-labelledby="headingPurity" className="accordion-collapse collapse" data-bs-parent="#filtersAccordion" id="collapsePurity">
                      <div className="accordion-body" id="filterPurity">
                        {purities.map((purity) => (
                          <div key={purity} className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`filterPurity-${purity}`}
                              checked={selectedPurity.has(purity)}
                              onChange={(e) => handlePurityChange(purity, e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor={`filterPurity-${purity}`}>
                              {purity}
                            </label>
                          </div>
                        ))}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="x-card__footer d-grid gap-2">
                <button className="x-btn x-btn--primary" id="applyFiltersBtn">
                  <i className="fa-solid fa-filter">
                  </i>
                  Apply Filters
                </button>
                <button className="x-btn x-btn--secondary" id="resetFiltersBtn">
                  Reset
                </button>
              </div>
            </div>
          </aside>
          {/* <!-- Product Display Area --> */}
          <section className="col-12 col-lg-9">
            {/* <!-- Loading State --> */}
            <div className="d-none" id="loadingState">
              <div className="x-card p-4 mb-3">
                <div className="d-flex align-items-center gap-3">
                  <div aria-hidden="true" className="loader">
                  </div>
                  <div>
                    Loading products…
                  </div>
                </div>
              </div>
              <div className="row g-3">
                <div className="col-md-6 col-lg-4">
                  <div className="skeleton" style={{ "height": "320px" }}>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="skeleton" style={{ "height": "320px" }}>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="skeleton" style={{ "height": "320px" }}>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Products Grid/List --> */}
            <div className="row g-4" id="productsContainer">
              {/* <!-- Dynamic Product Cards --> */}
              {sorted.map(p => {
                const price = institution ? p.priceInstitutional : p.priceRetail;
                return (

                  <div key={p.id}
                    className={view === "list" ? "col-12" : "col-md-6 col-lg-4"}
                  >
                    <div className={`x-card h-100 ${view === "list" ? "list-view" : "grid-view"}`}>
                      <div
                        className={`p-3 ${view === "list" ? "d-flex align-items-start gap-3 flex-grow-1" : ""
                          }`}
                      >
                        {/* Product Image */}
                        <Link
                          // href={`/product/${p.id}`}
                          href={`/product`}
                          aria-label={`View ${p.name} details`}
                          className="d-block flex-shrink-0"
                        >
                          <img
                            className="product-img rounded"
                            src={p.imageUrl}
                            alt={p.name}
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                `https://picsum.photos/seed/${encodeURIComponent(p.id)}/600/400?grayscale`;
                            }}
                          />
                        </Link>

                        {/* Product Content */}
                        <div className={`mt-3 ${view === "list" ? "mt-0 flex-grow-1" : ""}`}>
                          <Link
                            // href={`/product/${p.id}`}
                            href={`/product`}
                            className="stretched-link fw-bold text-decoration-none"
                          >
                            {p.name}
                          </Link>

                          <div className="small u-text-muted mt-1">
                            {p.brand} • {p.category}
                            {p.purity ? ` • ${p.purity}` : ""}
                          </div>

                          {/* Price */}
                          <div className="d-flex align-items-center gap-2 mt-2">
                            <div className="fs-5 fw-bold u-text-primary">
                              ${price.toLocaleString()}
                            </div>
                            {price}
                          </div>

                          {/* Actions */}
                          <div className="d-flex flex-wrap gap-2 mt-3">
                            <button
                              className="x-btn x-btn--primary btn-add-cart"
                              data-id={p.id}
                              disabled={p.stockStatus !== "In Stock"}
                            >
                              <i className="fa-solid fa-cart-plus"></i> Add to Cart
                            </button>

                            <label className="x-chip mb-0">
                              <input
                                className="form-check-input me-2 compare-checkbox"
                                type="checkbox"
                                value={p.id}
                                checked={compareChecked}
                                onChange={(e) => setCompareChecked(e.target.checked)}
                                aria-label={`Add ${p.name} to compare`}
                              />
                              <i className="fa-solid fa-code-compare"></i> Compare
                            </label>

                            <Link
                              // href={`/product/${p.id}`} 
                              href={`/product`}
                              className="x-btn x-btn--secondary">
                              <i className="fa-regular fa-eye"></i> View
                            </Link>
                          </div>

                          {/* Stock Badge */}
                          <div className="mt-2">
                            {p.stockStatus === "In Stock" ? (
                              <span className="x-badge x-badge--success">
                                <i className="fa-solid fa-circle-check"></i> In Stock
                              </span>
                            ) : (
                              <span className="x-badge x-badge--danger">
                                <i className="fa-solid fa-circle-xmark"></i> Out of Stock
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* <!-- Pagination --> */}
            <nav aria-label="Product pagination" className="mt-4">
              <ul className="pagination justify-content-center" id="pagination">
                {/* <!-- Dynamic pages --> */}
              </ul>
            </nav>
          </section>
        </div>
      </main>
      {/* <!-- Sticky Compare Bar --> */}
      <div aria-live="polite" className="compare-bar x-card shadow-lg d-none" id="compareBar" role="region">
        <div className="d-flex align-items-center gap-3 flex-wrap">
          <i className="fa-solid fa-code-compare">
          </i>
          <div className="fw-bold" id="compareText">
            0 items selected for comparison
          </div>
          <div className="ms-auto d-flex align-items-center gap-2">
            <a aria-disabled="true" className="x-btn x-btn--primary disabled" href="./comparison_page.html" id="compareLink">
              <i className="fa-solid fa-arrow-right-arrow-left">
              </i>
              Compare
            </a>
            <button className="x-btn x-btn--secondary" id="clearCompareBtn">
              <i className="fa-regular fa-circle-xmark">
              </i>
              Clear
            </button>
          </div>
        </div>
      </div>
      {/* <!-- Offcanvas: Filters (Mobile) --> */}
      <div aria-labelledby="filterOffcanvasLabel" className="offcanvas offcanvas-start" id="filterOffcanvas" tabIndex={1}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="filterOffcanvasLabel">
            <i className="fa-solid fa-sliders">
            </i>
            Filters
          </h5>
          <button aria-label="Close" className="btn-close" data-bs-dismiss="offcanvas" type="button">
          </button>
        </div>
        <div className="offcanvas-body">
          {/* <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <strong>
                Price Range
              </strong>
              <span className="badge x-badge" id="priceRangeLabelMobile">
                $0 - $0
              </span>
            </div>
            <div id="priceSliderMobile">
            </div>
          </div> */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <strong>Price Range</strong>
              <span className="badge x-badge">
                {/* ${range[0]} - ${range[1]} */}
              </span>
            </div>
            {/* <div ref={sliderRef} id="priceSlider"></div> */}
            {/* <div ref={sliderRef} id="slider-fit"></div> */}
            {/* <div id="slider-fit"></div> */}
          </div>
          <hr className="hr" />
          <div className="accordion" id="filtersAccordionMobile">
            <div className="accordion-item">
              <h2 className="accordion-header" id="mHeadingCategory">
                <button aria-controls="mCollapseCategory" aria-expanded="true" className="accordion-button" data-bs-target="#mCollapseCategory" data-bs-toggle="collapse" type="button">
                  Category
                </button>
              </h2>
              <div aria-labelledby="mHeadingCategory" className="accordion-collapse collapse show" data-bs-parent="#filtersAccordionMobile" id="mCollapseCategory">
                <div className="accordion-body" id="mFilterCategory">
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="mHeadingBrand">
                <button aria-controls="mCollapseBrand" aria-expanded="false" className="accordion-button collapsed" data-bs-target="#mCollapseBrand" data-bs-toggle="collapse" type="button">
                  Brand
                </button>
              </h2>
              <div aria-labelledby="mHeadingBrand" className="accordion-collapse collapse" data-bs-parent="#filtersAccordionMobile" id="mCollapseBrand">
                <div className="accordion-body" id="mFilterBrand">
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="mHeadingPurity">
                <button aria-controls="mCollapsePurity" aria-expanded="false" className="accordion-button collapsed" data-bs-target="#mCollapsePurity" data-bs-toggle="collapse" type="button">
                  Purity Grade
                </button>
              </h2>
              <div aria-labelledby="mHeadingPurity" className="accordion-collapse collapse" data-bs-parent="#filtersAccordionMobile" id="mCollapsePurity">
                <div className="accordion-body" id="mFilterPurity">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="offcanvas-footer p-3 border-top d-grid gap-2">
          <button className="x-btn x-btn--primary" data-bs-dismiss="offcanvas" id="applyFiltersBtnMobile">
            <i className="fa-solid fa-filter">
            </i>
            Apply Filters
          </button>
          <button className="x-btn x-btn--secondary" id="resetFiltersBtnMobile">
            Reset
          </button>
        </div>
      </div>
      {/* <!-- Toast Stack --> */}
      <div aria-atomic="true" aria-live="polite" className="x-toast-stack" id="toastStack">
      </div>


    </main>


  );
}