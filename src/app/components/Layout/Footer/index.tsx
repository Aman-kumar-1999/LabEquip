'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import Logo from '../Header/Logo'
// import { Icon } from '@iconify/react/dist/iconify.js'
// import { FooterLinkType } from '@/app/types/footerlink'
import '../../../css/style.css';
import '../../../css/home_page.css';

const Footer = () => {
  // const [footerlink, SetFooterlink] = useState<FooterLinkType[]>([])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch('/api/data')
  //       if (!res.ok) throw new Error('Failed to fetch')
  //       const data = await res.json()
  //       SetFooterlink(data.FooterLinkData)
  //     } catch (error) {
  //       console.error('Error fetching services:', error)
  //     }
  //   }
  //   fetchData()
  // }, [])

  return (
    // <!-- Footer (Global) - Included on Home page -->
    <footer className="x-footer mt-auto">
      <div className="l-container">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <div className="d-flex align-items-center mb-2">
              <span className="x-logo me-2" style={{ width: '32px', height: '32px' }}>
              </span>
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
    // <footer className='bg-deep-slate pt-10'>
    //   <div className='container'>
    //     <div className='grid grid-cols-1 sm:grid-cols-6 lg:gap-20 md:gap-24 sm:gap-12 gap-12 pb-10'>
    //       <div className='col-span-2'>
    //         <div className='mb-10'>
    //           <Logo />
    //         </div>
    //         <div className='flex items-center gap-4'>
    //           <Link
    //             href='https://facebook.com'
    //             className='hover:text-primary text-black text-3xl'>
    //             <Icon icon='tabler:brand-facebook' />
    //           </Link>
    //           <Link
    //             href='https://twitter.com'
    //             className='hover:text-primary text-black text-3xl'>
    //             <Icon icon='tabler:brand-twitter' />
    //           </Link>
    //           <Link
    //             href='https://instagram.com'
    //             className='hover:text-primary text-black text-3xl'>
    //             <Icon icon='tabler:brand-instagram' />
    //           </Link>
    //         </div>
    //       </div>
    //       <div className='col-span-2'>
    //         <div className='flex gap-20'>
    //           {footerlink.map((product, i) => (
    //             <div key={i} className='group relative col-span-2'>
    //               <p className='text-black text-xl font-semibold mb-9'>
    //                 {product.section}
    //               </p>
    //               <ul>
    //                 {product.links.map((item, i) => (
    //                   <li key={i} className='mb-3'>
    //                     <Link
    //                       href={item.href}
    //                       className='text-black/60 hover:text-primary text-base font-normal mb-6'>
    //                       {item.label}
    //                     </Link>
    //                   </li>
    //                 ))}
    //               </ul>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //       <div className='col-span-2 sm:col-span-6 md:col-span-2'>
    //         <div className='flex flex-col gap-10'>
    //           <div className='flex item-center'>
    //             <Icon
    //               icon='solar:point-on-map-perspective-bold'
    //               className='text-primary text-3xl lg:text-2xl inline-block me-2'
    //             />
    //             <p className='text-black text-base'>
    //               925 Filbert Street Pennsylvania 18072
    //             </p>
    //           </div>
    //           <Link href='tel:+1(909) 235-9814' className='flex items-center w-fit'>
    //             <Icon
    //               icon='solar:phone-bold'
    //               className='text-primary text-3xl lg:text-2xl inline-block me-2'
    //             />
    //             <p className='text-black/60 hover:text-primary text-base'>
    //               +1(909) 235-9814
    //             </p>
    //           </Link>
    //           <Link href='/' className='flex items-center w-fit'>
    //             <Icon
    //               icon='solar:mailbox-bold'
    //               className='text-primary text-3xl lg:text-2xl inline-block me-2'
    //             />
    //             <p className='text-black/60 hover:text-primary text-base'>
    //               info@gmail.com
    //             </p>
    //           </Link>
    //         </div>
    //       </div>
    //     </div>

    //     <div className='mt-10 lg:flex items-center justify-between border-t border-black/10 py-5'>
    //       <p className='text-black/50 text-base text-center lg:text-start font-normal'>
    //         @2025 Agency. All Rights Reserved by{' '}
    //         <Link
    //           href='https://getnextjstemplates.com/'
    //           target='_blank'
    //           className='hover:text-primary hover:underline'>
    //           {' '}
    //           GetNextJsTemplates.com
    //         </Link>
    //       </p>
    //       <div className='flex gap-5 mt-5 lg:mt-0 justify-center lg:justify-start'>
    //         <Link href='/' target='_blank'>
    //           <p className='text-black/50 text-base font-normal hover:text-primary hover:underline px-5 border-r border-grey/20'>
    //             Privacy policy
    //           </p>
    //         </Link>
    //         <Link href='/' target='_blank'>
    //           <p className='text-black/50 text-base font-normal hover:text-primary hover:underline'>
    //             Terms & conditions
    //           </p>
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </footer>
  )
}

export default Footer
