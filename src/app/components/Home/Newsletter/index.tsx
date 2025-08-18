import { Icon } from '@iconify/react'

const Newsletter = () => {
  return (
    <section>
      <div className='container'>
        <div className='grid grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-12 xl:gap-x-8'>
          <div className='col-span-12 bg-newsletter-bg bg-cover rounded-2xl bg-no-repeat px-4'>
            <div className='mb-10 mt-24 lg:mx-64 lg:my-24'>
              <h2 className='text-center font-semibold text-white mb-3'>
                Newsletter.
              </h2>
              <p className='text-base font-normal text-white/75 text-center mb-8 capitalize'>
                Subscrible our newsletter for discounts, <br /> promo and many
                more.
              </p>
              <div>
                <div className='relative rounded-full'>
                  <input
                    type='email'
                    name='email'
                    className='py-4 pl-8 pr-20 text-lg w-full bg-white text-black rounded-full border border-white/10 focus:outline-hidden focus:border-primary duration-300 shadow-input-shadow'
                    placeholder='Enter your email address'
                    autoComplete='off'
                  />
                  <button className='group border border-secondary bg-secondary hover:bg-transparent p-3 rounded-full absolute right-2 top-1.5 duration-300 hover:cursor-pointer'>
                    <Icon
                      icon='mynaui:send-solid'
                      className='text-white group-hover:text-primary text-2xl inline-block duration-300'
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
