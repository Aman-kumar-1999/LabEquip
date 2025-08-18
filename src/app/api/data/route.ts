import { CourseType } from '@/app/types/course'
import { FooterLinkType } from '@/app/types/footerlink'
import { MentorType } from '@/app/types/mentor'
import { HeaderType } from '@/app/types/menu'
import { TestimonialType } from '@/app/types/testimonial'
import { NextResponse } from 'next/server'

const HeaderData: HeaderType[] = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/#courses  ' },
  { label: 'Mentor', href: '/#mentor' },
  { label: 'Contact Us', href: '/#contact' },
  { label: 'Docs', href: '/documentation' },
]

const TechGaintsData: { imgSrc: string }[] = [
  {
    imgSrc: '/images/companies/airbnb.svg',
  },
  {
    imgSrc: '/images/companies/fedex.svg',
  },
  {
    imgSrc: '/images/companies/google.svg',
  },
  {
    imgSrc: '/images/companies/hubspot.svg',
  },
  {
    imgSrc: '/images/companies/microsoft.svg',
  },
  {
    imgSrc: '/images/companies/walmart.svg',
  },
  {
    imgSrc: '/images/companies/airbnb.svg',
  },
  {
    imgSrc: '/images/companies/fedex.svg',
  },
]

const CourseData: CourseType[] = [
  {
    heading: '(MERN) Full-Stack Development',
    name: 'James Nolan',
    imgSrc: '/images/courses/mern.webp',
    students: 150,
    classes: 12,
    price: 20,
    rating: 4.4,
  },
  {
    heading: 'Design Systems with React',
    name: 'Elena Brooks',
    imgSrc: '/images/courses/react.webp',
    students: 130,
    classes: 12,
    price: 20,
    rating: 4.5,
  },
  {
    heading: 'Create Stunning Banners in Figma',
    name: 'Aria Kim',
    imgSrc: '/images/courses/UiUx.webp',
    students: 120,
    classes: 12,
    price: 20,
    rating: 5.0,
  },
  {
    heading: 'Build & Launch a Webflow Website',
    name: 'Marcus Lee',
    imgSrc: '/images/courses/webflow.webp',
    students: 150,
    classes: 12,
    price: 20,
    rating: 5.0,
  },
]

const MentorData: MentorType[] = [
  {
    profession: 'Senior UX Designer',
    name: 'Shoo Thar Mien',
    imgSrc: '/images/mentor/user1.webp',
  },
  {
    profession: 'Product Design Lead',
    name: 'Lina Carter',
    imgSrc: '/images/mentor/user2.webp',
  },
  {
    profession: 'UI/UX Strategy Consultant',
    name: 'Ethan Nakamura',
    imgSrc: '/images/mentor/user3.webp',
  },
]

const TestimonialData: TestimonialType[] = [
  {
    name: 'Michelle Bennett',
    profession: 'CEO, Parkview International Ltd',
    comment:
      'The courses transformed my career! The practical approach and expert mentorship made all the difference.',
    imgSrc: '/images/testimonial/user1.webp',
    rating: 5,
  },
  {
    name: 'Leslie Alexander',
    profession: 'Founder, TechWave Solutions',
    comment:
      'Engaging content and flexible learning schedules helped me upskill without disrupting my work.',
    imgSrc: '/images/testimonial/user2.webp',
    rating: 5,
  },
  {
    name: 'Cody Fisher',
    profession: 'Product Manager, InnovateX',
    comment:
      'Highly recommend! The hands-on projects and supportive community boosted my confidence and skills.',
    imgSrc: '/images/testimonial/user3.webp',
    rating: 5,
  },
]

const FooterLinkData: FooterLinkType[] = [
  {
    section: 'Sitemap',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Courses', href: '/#courses' },
      { label: 'Mentor', href: '/#mentor' },
      { label: 'Contact Us', href: '/#contact' },
    ],
  },
  {
    section: 'Company',
    links: [
      { label: 'Our Team', href: '/' },
      { label: 'career', href: '/' },
      { label: 'Services', href: '/' },
      { label: 'Affiliates', href: '/' },
    ],
  },
]

export const GET = () => {
  return NextResponse.json({
    HeaderData,
    TechGaintsData,
    CourseData,
    MentorData,
    TestimonialData,
    FooterLinkData,
  })
}
