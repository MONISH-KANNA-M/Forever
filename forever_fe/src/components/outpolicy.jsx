import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Outpolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2  text-center  py-8 '>

        <div>
            <img src={assets.exchange_icon} alt="" className='w-12  m-auto  mb-5 ' />
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-gray-400'> We offer hassle free exchange policy </p>
        </div>
        
        <div>
            <img src={assets.quality_iconu}alt="" className='w-12  m-auto  mb-5 ' />
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-gray-400'> We offer hassle free exchange policy </p>
        </div>
        
        <div>
            <img src={assets.support_img} alt="" className='w-12  m-auto  mb-5 ' />
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-gray-400'> We offer hassle free exchange policy </p>
        </div>

    </div>
  )
}

export default Outpolicy