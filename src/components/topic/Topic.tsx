import React from 'react'
import Link from 'next/link'

const Topic = (props: {[key: string]: string}) => {
  return (
    <div className='flex flex-row w-4/5 h-auto border-none rounded-md hover:shadow-black hover:shadow-md hover:cursor-pointer p-4 mb-4 border-gray-500 justify-between items-center bg-gradient-to-r from-blue-500 to-pink-500'>
        <h1 className='text-xl text-white'>
          Linear Equations
        </h1>
        <div>
          <Link href={`/dashboard/${props.mode}/subject/1/topic/linear+equation`} className='text-xl text-white hover:underline'>
            View Discussion
          </Link>
        </div>
    </div>
  )
}

export default Topic
