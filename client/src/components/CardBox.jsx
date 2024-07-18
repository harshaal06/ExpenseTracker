import React, { useRef } from 'react'
import Card from './Card'

export default function CardBox() {
    const ref = useRef(null);

    const data = [
        {
            quote: "Do not think of the enemy as weak, then do not be too scared to feel too strong.",
            writer: "Chhatrapati Shivaji Maharaj",
            createdBy: "Harshal",
            color: "blue"
        },
        {
            quote: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
            writer: "Albert Einstein",
            createdBy: "Harshal",
            color: "green"
        },
        {
            quote: "Be the change that you wish to see in the world.",
            writer: "Mahatma Gandhi",
            createdBy: "Harshal",
            color: "blue"
        },
        {
            quote: "Everything is easy when you are busy. But nothing is easy when you are lazy",
            writer: "Swami Vivekananda",
            createdBy: "Harshal",
            color: "green"
        }
    ]
    return (
        <div ref={ref} className='fixed top-0 p-5 pt-28 left-0 z-[3] w-full h-full flex gap-10 flex-wrap'>
            {data.map((item, index)=>(
                <Card data={item} reference={ref} />
            ))}
        </div>
    )
}
