import React from 'react'
import ErrorImg from './404-error.png';

function ShowError() {
  return (
    <div className='w-full h-screen bg-[#282c34] pt-3'>
      <div className='flex h-[90vh] items-center justify-center'><img src={ErrorImg} className='h-[500px]' /></div>
    </div>
  )
}

export default ShowError