import React from 'react'

export default function Hero() {
  return (
    <>
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Background Image */}
      <img
        src="https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>

      {/* Content */}
      <div className="relative text-center text-white px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Our Platform</h1>
        <p className="text-lg md:text-xl mb-6">Discover amazing content and explore endless possibilities.</p>
        <a
          href="#"
          className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Read Blogs
        </a>
      </div>
    </div>  
    </>
  )
}
