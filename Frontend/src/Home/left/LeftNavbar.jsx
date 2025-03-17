import React from 'react'
import { FiEdit } from "react-icons/fi";
import { IoIosMore } from "react-icons/io";

export default function LeftNavbar() {
  return (
    <div className='flex justify-between py-4 px-7'>
        <h1 className='text-xl font-bold'>Chats</h1>
        <div className='flex gap-2'>
            <div className='bg-[#333334] p-3 rounded-full '>
              <IoIosMore/>
            </div>
            <div className='bg-[#333334] p-3 rounded-full'>
               <FiEdit />
            </div>
        </div>
    </div>
  )
}
