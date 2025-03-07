import { routes } from '@/app/utils/routes'
import Link from 'next/link'
import React from 'react'

export default function Hero() {
  return (
    <>
    <div className="relative w-full h-[500px] flex items-center justify-center">
      <img
        src="./images/heroBg.jpg"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>

      <div className="relative text-center text-white px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Our Platform</h1>
        <p className="text-lg md:text-xl mb-6">Discover amazing content and explore endless possibilities.</p>
        <Link
          href={routes.ALLBLOGS}
          className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Read Blogs
        </Link>
      </div>
    </div>  
    </>
  )
}
