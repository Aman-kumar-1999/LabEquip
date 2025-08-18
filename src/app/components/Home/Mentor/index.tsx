'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { MentorType } from '@/app/types/mentor'
import MentorSkeleton from '../../Skeleton/Mentor'

const Mentor = () => {
  const [mentor, setMentor] = useState<MentorType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setMentor(data.MentorData)
      } catch (error) {
        console.error('Error fetching service:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 530,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <section className='bg-deep-slate scroll-mt-12' id='mentor'>
      <div className='container relative'>
        <h2 className='text-midnight_text max-w-96 leading-12 lg:leading-14'>
          Meet Our Expert Mentors
        </h2>

        <Slider {...settings}>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <MentorSkeleton key={i} />
              ))
            : mentor.map((items, i) => (
                <div key={i}>
                  <div className='m-3 py-14 mt-10 text-center rounded-2xl bg-white shadow-md'>
                    <div className='relative mb-10'>
                      <Image
                        src={items.imgSrc}
                        alt='user-image'
                        width={206}
                        height={206}
                        className='inline-block m-auto rounded-full border border-black/10'
                      />
                      <div className='absolute right-[22%] -bottom-[2%] bg-white rounded-full p-4'>
                        <Image
                          src={'/images/mentor/linkedin.svg'}
                          alt='linkedin-image'
                          width={25}
                          height={24}
                        />
                      </div>
                    </div>
                    <div>
                      <h6>{items.name}</h6>
                      <p className='text-lg font-normal text-black/50 pt-2'>
                        {items.profession}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
        </Slider>
      </div>
    </section>
  )
}

export default Mentor
