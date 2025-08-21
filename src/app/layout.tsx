import { Poppins } from 'next/font/google'
import Script from "next/script";
import './globals.css'
// import Header from '@/app/components/Layout/Header'
import HeaderPage from '@/app/components/Header'
import FooterPage from '@/app/components/Footer'
import "bootstrap/dist/css/bootstrap.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import './css/style.css';

import "@fortawesome/fontawesome-free/css/all.min.css";

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})
export const metadata = {
  
  icons: {
    icon: "/logo.png", // default favicon
    shortcut: "/logo.png",
    apple: "/apple-touch-icon.png", // for iOS home screen
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        {/* <link href="https://cdn.jsdelivr.net/npm/nouislider@15.7.1/dist/nouislider.min.css" rel="stylesheet"/> */}
        {/* <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        /> */}
        {/* <link
          href="https://cdn.jsdelivr.net/npm/sweetalert2@11.10.8/dist/sweetalert2.min.css"
          rel="stylesheet"
        /> */}
        {/* <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          rel="stylesheet"
        /> */}
      </head>
      <body className={`${font.className}`}>
        {/* <Header /> */}
        <HeaderPage  />
        <div style={{ height: "80px" }}></div>
        {children}
        <FooterPage  /> 
        
      </body>
      <Script crossOrigin="anonymous" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"/>
      
      <Script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.10.8/dist/sweetalert2.all.min.js"/>
      
      <Script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"/>
      
    </html>
  )
}




// import type { Metadata } from "next";
// import "./globals.css";

// // Import Bootstrap & Font Awesome
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import "sweetalert2/dist/sweetalert2.min.css";
// // import "@fortawesome/fontawesome-free/css/all.min.css";

// export const metadata: Metadata = {
//   title: "Home | Lab Equipment E-commerce",
//   description:
//     "Lab Equipment E-commerce platform - Buy lab instruments, reagents, and supplies. Explore categories, featured products, and promotions.",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" data-theme="light">
//       <head>
//         <link
//           href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
//           rel="stylesheet"
//         />
//         <link
//           href="https://cdn.jsdelivr.net/npm/sweetalert2@11.10.8/dist/sweetalert2.min.css"
//           rel="stylesheet"
//         />
//         <link
//           href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
//           rel="stylesheet"
//         />
//       </head>
//       <body className="font-poppins">
//         <a href="#main" className="skip-link">
//           Skip to main content
//         </a>
//         {children}
//       </body>
//     </html>
//   );
// }

