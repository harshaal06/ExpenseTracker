import React from 'react'
import CardBox from './components/CardBox'

function App() {
  return (
    <div className='relative w-full h-screen bg-zinc-800'>
      <div className='fixed z-[2] w-full h-screen'>
        <div className='absolute top-[4%] w-full py-5 flex justify-center text-zinc-500 text-xl font-semibold'>Your quotes.</div>
        <h1 className='absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-[100px] md:text-[12vw] leading-none tracking-tighter font-semibold text-zinc-900'>Quotes.</h1>
      </div>
      <CardBox />
    </div>
  )
}

export default App