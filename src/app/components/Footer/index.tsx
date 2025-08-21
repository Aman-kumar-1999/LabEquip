
export default function FooterPage() {
  return (
    <footer className="x-footer mt-auto">
        <div className="l-container">
            <div className="row g-4">
                <div className="col-12 col-md-4">
                    <div className="d-flex align-items-center mb-2">
                        {/* <span className="x-logo me-2" style={{width: "32px", height: "32px"}}>
                        </span> */}
                        <strong>
                            LabEquip
                        </strong>
                    </div>
                    <p className="mb-2">
                        Precision tools for every lab. Secure checkout, institutional pricing, and fast shipping.
                    </p>
                </div>
                <div className="col-6 col-md-4">
                    <h6 className="u-text-muted">
                        Quick Links
                    </h6>
                    <ul className="list-unstyled">
                        <li>
                            <a href="./product_listing.html">
                                Products
                            </a>
                        </li>
                        <li>
                            <a href="./login_page.html">
                                Login
                            </a>
                        </li>
                        <li>
                            <a href="./register_page.html">
                                Register
                            </a>
                        </li>
                        <li>
                            <a href="./cart_page.html">
                                Cart
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-6 col-md-4">
                    <h6 className="u-text-muted">
                        Legal
                    </h6>
                    <ul className="list-unstyled">
                        <li>
                            <a href="./order_history.html">
                                Orders
                            </a>
                        </li>
                        <li>
                            <a href="./return_request.html">
                                Returns
                            </a>
                        </li>
                        <li>
                            <a href="./account_settings.html">
                                Account Settings
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="hr">
            <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                    ©
                    <span id="year">
                    </span>
                    LabEquip Inc.
                </small>
                <div className="d-flex gap-3">
                    <a aria-label="Twitter" href="#">
                        <i className="fa-brands fa-x-twitter">
                        </i>
                    </a>
                    <a aria-label="LinkedIn" href="#">
                        <i className="fa-brands fa-linkedin">
                        </i>
                    </a>
                    <a aria-label="YouTube" href="#">
                        <i className="fa-brands fa-youtube">
                        </i>
                    </a>
                </div>
            </div>
            </div>
        </div>
    </footer>
    // <footer className="x-footer">
    //   <div className="container">
    //     <div className="row">
    //       <div className="col">
    //         <p>&copy; {new Date().getFullYear()} LabEquip. All rights reserved.</p>
    //       </div>
    //     </div>
    //   </div>
    // </footer>
  );
}
