
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "User Management",
// };

// Demo users (front-end only)
const demoUsers = [
    {
        email: "admin@site.com",
        password: "Admin@123",
        role: "admin",
        redirect: "/admin/dashboard",
    },
    {
        email: "support@site.com",
        password: "HelpDesk1!",
        role: "admin",
        redirect: "/admin/dashboard",
    },
    {
        email: "manager@org.com",
        password: "Passw0rd!",
        role: "b2b",
        redirect: "/user/dashboard",
    },
    {
        email: "procure@org.com",
        password: "BuyMore#1",
        role: "b2b",
        redirect: "/user/dashboard",
    },
    {
        email: "researcher@lab.com",
        password: "Passw0rd!",
        role: "b2c",
        redirect: "/user/dashboard",
    },
    {
        email: "scientist@lab.com",
        password: "Lab@2024",
        role: "b2c",
        redirect: "/user/dashboard",
    },
];

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Prefill email if remembered
    useEffect(() => {
        try {
            const remembered = localStorage.getItem("demoRememberEmail");
            if (remembered) setEmail(remembered);
        } catch (e) { }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!emailRegex.test(email)) {
            setError("Invalid email format");
            return;
        }
        if (!password) {
            setError("Password is required");
            return;
        }

        setLoading(true);

        setTimeout(() => {
            const user = demoUsers.find(
                (u) =>
                    u.email.toLowerCase() === email.toLowerCase() && u.password === password
            );

            if (user) {
                // remember email
                try {
                    if (rememberMe) {
                        localStorage.setItem("demoRememberEmail", email);
                    } else {
                        localStorage.removeItem("demoRememberEmail");
                    }
                } catch (e) { }

                Swal.fire({
                    icon: "success",
                    title: "Login successful",
                    text: `Welcome ${user.role.toUpperCase()}! Redirecting...`,
                    timer: 1300,
                    showConfirmButton: false,
                }).then(() => {
                    router.push(user.redirect);
                });
            } else {
                setLoading(false);
                setError("Invalid email or password. Please try again.");
                Swal.fire({
                    icon: "error",
                    title: "Authentication failed",
                    text: "Please check your credentials and try again.",
                });
            }
        }, 900);
    };

    return (
        <div>
            <main className="auth-hero d-flex align-items-center" id="mainContent">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-10 col-md-8 col-lg-5">
                            {/* <!-- Login Card --> */}
                            <div className="x-card p-4 p-md-5 a-slide-up">
                                <h1 className="h3 fw-bold text-center mb-2">
                                    Welcome back
                                </h1>
                                <p className="text-center text-muted mb-4">
                                    Sign in to continue to your account
                                </p>
                                {/* <div className="mx-5">
        <img alt="Brand Logo" className="" height="72" src="/images/logo/logo.png" width="72"/>
       </div> */}
                                <div className="auth-hero d-flex align-items-center">
                                    <img alt="Brand Logo" className="container m-4" height="" src="/images/logo/dashboard.png" width="72" />
                                </div>

                                {/* <!-- Inline Alert Placeholder --> */}
                                {error && (
                                    <div className="alert alert-danger d-none" id="authAlert" role="alert">
                                        <i className="fa-solid fa-triangle-exclamation me-2">
                                        </i>
                                        <span id="authAlertText">
                                            Invalid credentials. Please try again.{error}
                                        </span>
                                    </div>
                                )}
                                <form id="loginForm"
                                    //    novalidate=""
                                    onSubmit={handleSubmit}
                                >
                                    {/* <!-- Email --> */}
                                    <div className="mb-3 x-field">
                                        <label className="form-label x-label" htmlFor="email">
                                            Email address
                                        </label>
                                        <input autoComplete="email" className="form-control x-input"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            data-bs-title="Use the email associated with your account"
                                            data-bs-toggle="tooltip" id="email" name="email" placeholder="your.email@company.com"
                                            type="email" />
                                        <div className="invalid-feedback">
                                            Please enter a valid email.
                                        </div>
                                    </div>
                                    {/* <!-- Password with visibility toggle --> */}
                                    <div className="mb-2 x-field">
                                        <label className="form-label x-label" htmlFor="password">
                                            Password
                                        </label>
                                        <div className="input-group">
                                            <input autoComplete="current-password" className="form-control x-input"
                                                id="password" name="password" placeholder="Enter your password" type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <button aria-label="Show/Hide password" className="btn btn-outline-secondary x-btn--outline" data-bs-title="Show/Hide password" data-bs-toggle="tooltip" id="togglePassword" type="button">
                                                <i aria-hidden="true" className="fa-solid fa-eye" id="togglePasswordIcon">
                                                </i>
                                            </button>
                                        </div>
                                        <div className="invalid-feedback">
                                            Password cannot be empty.
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div className="form-check">
                                            <input className="form-check-input" id="rememberMe" type="checkbox" value=""
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                            />
                                            <label className="form-check-label" htmlFor="rememberMe">
                                                Remember me
                                            </label>
                                        </div>
                                        <Link className="small" href="./verification_page.html">
                                            Forgot your password?
                                        </Link>
                                    </div>
                                    <div className="d-grid">
                                        <button className="x-btn x-btn--primary" id="loginBtn" type="submit" disabled={loading || !email || !password}>
                                            <span className="btn-label">
                                                Log In
                                                {loading ? "Signing in..." : "Login"}
                                            </span>
                                            <span aria-hidden="true" className="spinner-border spinner-border-sm ms-2 d-none" role="status">
                                            </span>
                                        </button>
                                    </div>
                                    <p className="text-center mt-3 mb-0">
                                        Don’t have an account?
                                        <Link className="x-btn--link" href="/register">
                                            Sign Up
                                        </Link>
                                    </p>
                                </form>
                            </div>
                            {/* <!-- Test Credentials Panel --> */}
                            <div className="x-card mt-4">
                                <div className="x-card__header">
                                    <h2 className="h5 mb-0">
                                        Test Credentials
                                    </h2>
                                </div>
                                <div className="x-card__body">
                                    <p className="mb-3 text-muted">
                                        Use the following demo accounts to test role-based redirects after login.
                                    </p>
                                    <div className="table-responsive">
                                        <table className="table x-table align-middle mb-2">
                                            <thead>
                                                <tr>
                                                    <th scope="col">
                                                        Role
                                                    </th>
                                                    <th scope="col">
                                                        Email
                                                    </th>
                                                    <th scope="col">
                                                        Password
                                                    </th>
                                                    <th scope="col">
                                                        Redirects To
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        Admin
                                                    </td>
                                                    <td>
                                                        <code>
                                                            admin@site.com
                                                        </code>
                                                    </td>
                                                    <td>
                                                        <code>
                                                            Admin@123
                                                        </code>
                                                    </td>
                                                    <td>
                                                        <a href="./admin_dashboard.html">
                                                            ./admin_dashboard.html
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        B2B Lab Manager
                                                    </td>
                                                    <td>
                                                        <code>
                                                            manager@org.com
                                                        </code>
                                                    </td>
                                                    <td>
                                                        <code>
                                                            Passw0rd!
                                                        </code>
                                                    </td>
                                                    <td>
                                                        <a href="./user_dashboard.html">
                                                            ./user_dashboard.html
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        B2B Procurement
                                                    </td>
                                                    <td>
                                                        <code>
                                                            procure@org.com
                                                        </code>
                                                    </td>
                                                    <td>
                                                        <code>
                                                            BuyMore#1
                                                        </code>
                                                    </td>
                                                    <td>
                                                        <a href="./user_dashboard.html">
                                                            ./user_dashboard.html
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        B2C Researcher
                                                    </td>
                                                    <td>
                                                        <code>
                                                            researcher@lab.com
                                                        </code>
                                                    </td>
                                                    <td>
                                                        <code>
                                                            Passw0rd!
                                                        </code>
                                                    </td>
                                                    <td>
                                                        <a href="./user_dashboard.html">
                                                            ./user_dashboard.html
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        B2C Scientist
                                                    </td>
                                                    <td>
                                                        <code>
                                                            scientist@lab.com
                                                        </code>
                                                    </td>
                                                    <td>
                                                        <code>
                                                            Lab@2024
                                                        </code>
                                                    </td>
                                                    <td>
                                                        <a href="./user_dashboard.html">
                                                            ./user_dashboard.html
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Support Admin (read-only)
                                                    </td>
                                                    <td>
                                                        <code>
                                                            support@site.com
                                                        </code>
                                                    </td>
                                                    <td>
                                                        <code>
                                                            HelpDesk1!
                                                        </code>
                                                    </td>
                                                    <td>
                                                        <a href="./admin_dashboard.html">
                                                            ./admin_dashboard.html
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <small className="text-muted">
                                        Note: These are demo accounts for front-end validation and routing only. No real authentication is performed.
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        // <div className="max-w-md mx-auto mt-20 p-6 bg-gray-900 text-white rounded-xl shadow-lg">
        //   <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        //   {error && (
        //     <div className="mb-4 p-3 rounded bg-red-600 text-sm">{error}</div>
        //   )}

        //   <form onSubmit={handleSubmit} className="space-y-4">
        //     {/* Email */}
        //     <div>
        //       <label htmlFor="email" className="block mb-1 text-sm">
        //         Email
        //       </label>
        //       <input
        //         type="email"
        //         id="email"
        //         className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
        //         value={email}
        //         onChange={(e) => setEmail(e.target.value)}
        //         required
        //       />
        //     </div>

        //     {/* Password */}
        //     <div>
        //       <label htmlFor="password" className="block mb-1 text-sm">
        //         Password
        //       </label>
        //       <input
        //         type="password"
        //         id="password"
        //         className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
        //         value={password}
        //         onChange={(e) => setPassword(e.target.value)}
        //         required
        //       />
        //     </div>

        //     {/* Remember Me */}
        //     <div className="flex items-center gap-2">
        //       <input
        //         type="checkbox"
        //         id="rememberMe"
        //         checked={rememberMe}
        //         onChange={(e) => setRememberMe(e.target.checked)}
        //       />
        //       <label htmlFor="rememberMe">Remember me</label>
        //     </div>

        //     {/* Submit */}
        //     <button
        //       type="submit"
        //       className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 transition disabled:bg-gray-600"
        //       disabled={loading || !email || !password}
        //     >
        //       {loading ? "Signing in..." : "Login"}
        //     </button>
        //   </form>

        //   {/* Footer */}
        //   <p className="mt-6 text-center text-sm text-gray-400">
        //     © {new Date().getFullYear()} Lab Equipment E-commerce
        //   </p>
        // </div>
    );
}


// export default function LoginPage(){
//     return(<div>
//         <main className="auth-hero d-flex align-items-center" id="mainContent">
//    <div className="container py-5">
//     <div className="row justify-content-center">
//      <div className="col-12 col-sm-10 col-md-8 col-lg-5">
//       {/* <!-- Login Card --> */}
//       <div className="x-card p-4 p-md-5 a-slide-up">
//        <div className="text-center mb-3">
//         <img alt="Brand Logo" className="brand-logo img-fluid" height="72" src="https://dsaishared.blob.core.windows.net/uxcceleratecontainer/projects/68a3a484669eba53f28c807b/logos/logo_aea901b5-7ab6-41d5-8f48-c68645f4c631.png" width="72"/>
//        </div>
//        <h1 className="h3 fw-bold text-center mb-2">
//         Welcome back
//        </h1>
//        <p className="text-center text-muted mb-4">
//         Sign in to continue to your account
//        </p>
//        {/* <!-- Inline Alert Placeholder --> */}
//        <div className="alert alert-danger d-none" id="authAlert" role="alert">
//         <i className="fa-solid fa-triangle-exclamation me-2">
//         </i>
//         <span id="authAlertText">
//          Invalid credentials. Please try again.
//         </span>
//        </div>
//        <form id="loginForm" 
//     //    novalidate=""
//        >
//         {/* <!-- Email --> */}
//         <div className="mb-3 x-field">
//          <label className="form-label x-label" htmlFor="email">
//           Email address
//          </label>
//          <input autoComplete="email" className="form-control x-input" data-bs-title="Use the email associated with your account" data-bs-toggle="tooltip" id="email" name="email" placeholder="your.email@company.com"  type="email"/>
//          <div className="invalid-feedback">
//           Please enter a valid email.
//          </div>
//         </div>
//         {/* <!-- Password with visibility toggle --> */}
//         <div className="mb-2 x-field">
//          <label className="form-label x-label" htmlFor="password">
//           Password
//          </label>
//          <div className="input-group">
//           <input autoComplete="current-password" className="form-control x-input" id="password" name="password" placeholder="Enter your password"  type="password"/>
//           <button aria-label="Show/Hide password" className="btn btn-outline-secondary x-btn--outline" data-bs-title="Show/Hide password" data-bs-toggle="tooltip" id="togglePassword" type="button">
//            <i aria-hidden="true" className="fa-solid fa-eye" id="togglePasswordIcon">
//            </i>
//           </button>
//          </div>
//          <div className="invalid-feedback">
//           Password cannot be empty.
//          </div>
//         </div>
//         <div className="d-flex justify-content-between align-items-center mb-3">
//          <div className="form-check">
//           <input className="form-check-input" id="rememberMe" type="checkbox" value=""/>
//           <label className="form-check-label" htmlFor="rememberMe">
//            Remember me
//           </label>
//          </div>
//          <a className="small" href="./verification_page.html">
//           Forgot your password?
//          </a>
//         </div>
//         <div className="d-grid">
//          <button className="x-btn x-btn--primary"  id="loginBtn" type="submit">
//           <span className="btn-label">
//            Log In
//           </span>
//           <span aria-hidden="true" className="spinner-border spinner-border-sm ms-2 d-none" role="status">
//           </span>
//          </button>
//         </div>
//         <p className="text-center mt-3 mb-0">
//          Don’t have an account?
//          <a className="x-btn--link" href="./register_page.html">
//           Sign Up
//          </a>
//         </p>
//        </form>
//       </div>
//       {/* <!-- Test Credentials Panel --> */}
//       <div className="x-card mt-4">
//        <div className="x-card__header">
//         <h2 className="h5 mb-0">
//          Test Credentials
//         </h2>
//        </div>
//        <div className="x-card__body">
//         <p className="mb-3 text-muted">
//          Use the following demo accounts to test role-based redirects after login.
//         </p>
//         <div className="table-responsive">
//          <table className="table x-table align-middle mb-2">
//           <thead>
//            <tr>
//             <th scope="col">
//              Role
//             </th>
//             <th scope="col">
//              Email
//             </th>
//             <th scope="col">
//              Password
//             </th>
//             <th scope="col">
//              Redirects To
//             </th>
//            </tr>
//           </thead>
//           <tbody>
//            <tr>
//             <td>
//              Admin
//             </td>
//             <td>
//              <code>
//               admin@site.com
//              </code>
//             </td>
//             <td>
//              <code>
//               Admin@123
//              </code>
//             </td>
//             <td>
//              <a href="./admin_dashboard.html">
//               ./admin_dashboard.html
//              </a>
//             </td>
//            </tr>
//            <tr>
//             <td>
//              B2B Lab Manager
//             </td>
//             <td>
//              <code>
//               manager@org.com
//              </code>
//             </td>
//             <td>
//              <code>
//               Passw0rd!
//              </code>
//             </td>
//             <td>
//              <a href="./user_dashboard.html">
//               ./user_dashboard.html
//              </a>
//             </td>
//            </tr>
//            <tr>
//             <td>
//              B2B Procurement
//             </td>
//             <td>
//              <code>
//               procure@org.com
//              </code>
//             </td>
//             <td>
//              <code>
//               BuyMore#1
//              </code>
//             </td>
//             <td>
//              <a href="./user_dashboard.html">
//               ./user_dashboard.html
//              </a>
//             </td>
//            </tr>
//            <tr>
//             <td>
//              B2C Researcher
//             </td>
//             <td>
//              <code>
//               researcher@lab.com
//              </code>
//             </td>
//             <td>
//              <code>
//               Passw0rd!
//              </code>
//             </td>
//             <td>
//              <a href="./user_dashboard.html">
//               ./user_dashboard.html
//              </a>
//             </td>
//            </tr>
//            <tr>
//             <td>
//              B2C Scientist
//             </td>
//             <td>
//              <code>
//               scientist@lab.com
//              </code>
//             </td>
//             <td>
//              <code>
//               Lab@2024
//              </code>
//             </td>
//             <td>
//              <a href="./user_dashboard.html">
//               ./user_dashboard.html
//              </a>
//             </td>
//            </tr>
//            <tr>
//             <td>
//              Support Admin (read-only)
//             </td>
//             <td>
//              <code>
//               support@site.com
//              </code>
//             </td>
//             <td>
//              <code>
//               HelpDesk1!
//              </code>
//             </td>
//             <td>
//              <a href="./admin_dashboard.html">
//               ./admin_dashboard.html
//              </a>
//             </td>
//            </tr>
//           </tbody>
//          </table>
//         </div>
//         <small className="text-muted">
//          Note: These are demo accounts for front-end validation and routing only. No real authentication is performed.
//         </small>
//        </div>
//       </div>
//      </div>
//     </div>
//    </div>
//   </main>
//     </div>)
// }