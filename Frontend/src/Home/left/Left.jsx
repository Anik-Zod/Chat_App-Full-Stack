import React from 'react'
import Search from './Search'
import LeftNavbar from './LeftNavbar'
import Users from './Users'

export default function Left() {
  return (
    <div className='w-[25%] border text-white border-gray-500 bg-[#242526]'>
        <LeftNavbar/>
        <Search/>
        <Users/>
    </div>
  )
}
