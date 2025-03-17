import React from 'react'
import Left from './Home/left/Left'
import Right from './Home/right/Right'

export default function App() {
  return (
    <div>
      <div className='flex h-screen'>
        <Left/>
        <Right/>
      </div>
    </div>
  )
}
