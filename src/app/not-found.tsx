// import HeroSub from "@/app/components/SharedComponent/HeroSub";
// import NotFound from "@/app/components/NotFound";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 Page",
};

const ErrorPage = () => {
  return (
    <>
      <h1 style={{color :'#8394'}}>404 Error Page </h1>
                  {/* <p className="zoom-area"><b>CSS</b> animations to make a cool 404 page. </p> */}
                  <section className="error-container">
                      <span className="four"><span className="screen-reader-text">4</span></span>
                      <span className="zero"><span className="screen-reader-text">0</span></span>
                      <span className="four"><span className="screen-reader-text">4</span></span>
                  </section>
                  <div className="link-container">
                      <Link href={'/'} className="more-link">Visit Our website</Link>
                  </div>
    </>
  );
};

export default ErrorPage;
