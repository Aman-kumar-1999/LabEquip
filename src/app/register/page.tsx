import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register User",
};

export default function SignupPage() {
    return (
        <div>
            <main className="py-4 py-md-5" id="main">
                <div className="l-container">
                    {/* <!-- Breadcrumbs --> */}
                    <nav aria-label="Breadcrumb" className="x-breadcrumb mb-3">
                        <a href="./home_page.html">
                            Home
                        </a>
                        <span aria-hidden="true">
                            /
                        </span>
                        <span aria-current="page">
                            Register
                        </span>
                    </nav>
                    <div className="row g-4 align-items-stretch">
                        {/* <!-- Form Column --> */}
                        <div className="col-12 col-lg-6 order-2 order-lg-1">
                            <section className="x-card h-100 a-fade-in">
                                <div className="x-card__body">
                                    <header className="mb-3">
                                        <h1 className="h3 fw-800 mb-1">
                                            Create Your Account
                                        </h1>
                                        <p className="text-muted">
                                            Sign up as an Individual (B2C) or Organization (B2B) to start purchasing lab equipment.
                                        </p>
                                    </header>
                                    {/* <!-- System message (hidden by default) --> */}
                                    <div className="alert alert-warning d-none" id="sysAlert" role="alert">
                                        <i className="fa-solid fa-circle-exclamation me-2">
                                        </i>
                                        <span id="sysAlertMsg">
                                            Please review the highlighted fields.
                                        </span>
                                    </div>
                                    <form id="registrationForm" >
                                        {/* <!-- Account Type Selector --> */}
                                        <fieldset className="mb-4">
                                            <legend className="form-label fw-bold mb-2">
                                                Account type
                                            </legend>
                                            <div className="row g-2">
                                                <div className="col-12 col-sm-6">
                                                    <div aria-checked="true" className="form-check account-type-check p-5 rounded border h-100" role="radio">
                                                        <input type="radio" className="form-check-input" id="accB2C" name="accountType" value="B2C" />
                                                        <label className="form-check-label w-100" htmlFor="accB2C">
                                                            <i className="fa-solid fa-user me-2 text-primary">
                                                            </i>
                                                            Individual Account (B2C)
                                                        </label>
                                                        <div className="form-text">
                                                            For researchers and individual buyers.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <div aria-checked="false" className="form-check account-type-check p-5 rounded border h-100" role="radio">
                                                        <input className="form-check-input" id="accB2B" name="accountType" type="radio" value="B2B" />
                                                        <label className="form-check-label w-100" htmlFor="accB2B">
                                                            <i className="fa-solid fa-building me-2 text-primary">
                                                            </i>
                                                            Organizational Account (B2B)
                                                        </label>
                                                        <div className="form-text">
                                                            For labs, institutions, and companies.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                        {/* <!-- Credentials --> */}
                                        <fieldset className="mb-4">
                                            <legend className="form-label fw-bold mb-2">
                                                Your details
                                            </legend>
                                            <div className="mb-3 x-field">
                                                <label className="x-label" htmlFor="fullName">
                                                    Full Name
                                                </label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-white">
                                                        <i className="fa-regular fa-id-card">
                                                        </i>
                                                    </span>
                                                    <input className="form-control x-input" id="fullName" name="fullName" placeholder="e.g., Dr. Jane Doe" type="text" />
                                                </div>
                                                <div className="invalid-feedback">
                                                    Full name is required.
                                                </div>
                                            </div>
                                            <div className="mb-3 x-field">
                                                <label className="x-label" htmlFor="email">
                                                    Email Address
                                                </label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-white">
                                                        <i className="fa-regular fa-envelope">
                                                        </i>
                                                    </span>
                                                    <input autoComplete="email" className="form-control x-input" id="email" name="email" placeholder="name@lab.org" type="email" />
                                                </div>
                                                <div className="invalid-feedback" id="emailFeedback">
                                                    Please enter a valid, unique email.
                                                </div>
                                            </div>
                                            <div className="mb-3 x-field">
                                                <label className="x-label" htmlFor="password">
                                                    Password
                                                </label>
                                                <div className="input-group" data-bs-title="Min 8 chars with upper, lower, number, and symbol" data-bs-toggle="tooltip">
                                                    <span className="input-group-text bg-white">
                                                        <i className="fa-solid fa-lock">
                                                        </i>
                                                    </span>
                                                    <input autoComplete="new-password" className="form-control x-input" id="password" name="password" placeholder="Create a strong password" type="password" />
                                                    <button aria-label="Toggle password visibility" className="btn btn-outline-secondary x-btn x-btn--outline" id="togglePassword" type="button">
                                                        <i className="fa-regular fa-eye">
                                                        </i>
                                                    </button>
                                                </div>
                                                <div className="form-text" id="pwdHint">
                                                    Use at least 8 characters including a number and a symbol.
                                                </div>
                                                {/* <div aria-label="Password strength" aria-valuemax="100" aria-valuemin="0" className="progress mt-2" role="progressbar">
                                                    <div className="progress-bar" id="pwdStrengthBar" style={{ width: "0%" }}>hi
                                                    </div>
                                                </div> */}
                                                <small className="text-muted" id="pwdStrengthText">
                                                    Strength: —
                                                </small>
                                                <div className="invalid-feedback">
                                                    Password does not meet complexity requirements.
                                                </div>
                                            </div>
                                            <div className="mb-3 x-field">
                                                <label className="x-label" htmlFor="confirmPassword">
                                                    Confirm Password
                                                </label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-white">
                                                        <i className="fa-solid fa-check-double">
                                                        </i>
                                                    </span>
                                                    <input autoComplete="new-password" className="form-control x-input" id="confirmPassword" name="confirmPassword" placeholder="Re-enter your password" type="password" />
                                                </div>
                                                <div className="invalid-feedback">
                                                    Passwords must match.
                                                </div>
                                            </div>
                                        </fieldset>
                                        {/* <!-- B2B Fields (Conditional) --> */}
                                        <fieldset className="mb-4 d-none" id="b2bFields">
                                            <legend className="form-label fw-bold mb-2">
                                                Organization details
                                            </legend>
                                            <div className="mb-3 x-field">
                                                <label className="x-label" htmlFor="companyName">
                                                    Company / Institution Name
                                                </label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-white">
                                                        <i className="fa-solid fa-flask">
                                                        </i>
                                                    </span>
                                                    <input className="form-control x-input" id="companyName" name="companyName" placeholder="e.g., GenomeLab Institute" type="text" />
                                                </div>
                                                <div className="invalid-feedback">
                                                    Company/Institution name is required for B2B accounts.
                                                </div>
                                            </div>
                                        </fieldset>
                                        {/* <!-- Terms and Submit --> */}
                                        <div className="mb-3 form-check">
                                            <input className="form-check-input" id="agreeTerms" type="checkbox" value="1" />
                                            <label className="form-check-label" htmlFor="agreeTerms">
                                                I agree to the
                                                <a href="./home_page.html#terms">
                                                    Terms of Service
                                                </a>
                                                and
                                                <a href="./home_page.html#privacy">
                                                    Privacy Policy
                                                </a>
                                                .
                                            </label>
                                            <div className="invalid-feedback">
                                                You must accept the terms.
                                            </div>
                                        </div>
                                        <div className="d-grid d-sm-flex gap-2 align-items-center">
                                            <button className="x-btn x-btn--primary" id="submitBtn" type="submit">
                                                <span aria-hidden="true" className="spinner-border spinner-border-sm me-2 d-none" role="status">
                                                </span>
                                                <i className="fa-solid fa-user-plus me-2">
                                                </i>
                                                Create Account
                                            </button>
                                            <Link className="x-btn x-btn--link" href="/login">
                                                Already have an account? Log In
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </section>
                        </div>
                        {/* <!-- Image Column --> */}
                        <div className="col-12 col-lg-6 order-1 order-lg-2">
                            <aside className="register-hero x-card h-100 overflow-hidden">
                                <img alt="High-tech laboratory background" className="w-100 h-100 object-fit-cover" src="assets/registration_page_background_i_1_d6ab5b93.jpg" />
                                <div className="register-hero__overlay">
                                </div>
                                <div className="register-hero__content">
                                    <h2 className="h4 mb-2 text-white">
                                        Modern Lab Commerce
                                    </h2>
                                    <p className="mb-3 text-white-50">
                                        Secure B2B/B2C purchasing, quotes, and streamlined checkout.
                                    </p>
                                    <div className="d-flex gap-2">
                                        <a className="x-btn x-btn--secondary" href="./product_listing.html">
                                            Browse Products
                                        </a>
                                        <a className="x-btn x-btn--ghost text-white" href="./comparison_page.html">
                                            Compare Specs
                                        </a>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                    {/* <!-- Support links --> */}
                    <div className="mt-4 text-center text-muted small">
                        Need help? Visit
                        <a href="./home_page.html#faq">
                            FAQ
                        </a>
                        or
                        <a href="./home_page.html#contact">
                            Contact Support
                        </a>
                        .
                    </div>
                </div>
            </main>
        </div>
    );
}
