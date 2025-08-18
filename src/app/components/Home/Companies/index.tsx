'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// CAROUSEL SETTINGS
const Companies = () => {
  const [techGaint, setTechGaint] = useState<{ imgSrc: string }[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setTechGaint(data.TechGaintsData)
      } catch (error) {
        console.error('Error fetching service:', error)
      }
    }
    fetchData()
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  }

  return (
    <section className='text-center'>
      <div className='container'>
        <h6 className='text-midnight_text capitalize'>
          Trusted by companies of all sizes
        </h6>
        <div className='py-7 border-b'>
          <Slider {...settings}>
            {techGaint.map((item, i) => (
              <div key={i}>
                <Image
                  src={item.imgSrc}
                  alt={item.imgSrc}
                  width={116}
                  height={36}
                  className='w-auto'
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  )
}

export default Companies
