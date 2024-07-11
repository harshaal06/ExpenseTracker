import React from 'react'
import { FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion"

function Card({data, reference}) {
    return (
        <motion.div drag dragConstraints={reference} whileDrag={{scale: 1.1}} dragElastic={0.1} className='relative flex-shrink-0 text-white px-4 py-7 md:px-6 md:py-10 w-48 md:w-60 h-60 md:h-72 rounded-[40px] md:rounded-[45px] bg-zinc-900 overflow-hidden'>
            <FaQuoteLeft />
            <p className='text-xs md:text-sm leading-tight mt-5 font-semibold font-mono'>{data.quote}</p>
            <p className='text-xs md:text-sm leading-tight mt-3 text-right font-semibold font-mono'>~ {data.writer}</p>
            <div className={`footer w-full py-4 left-0 absolute bottom-0 ${data.color === "blue" ? "bg-blue-600": "bg-green-600"}`}>
                <h3 className='text-md text-center'>Created by <span className='font-semibold'>{data.createdBy}</span></h3>
            </div>
        </motion.div>
    )
}

export default Card