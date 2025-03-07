import { routes } from '@/app/utils/routes';
import Link from 'next/link';
import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <>
    <footer className="bg-gray-100 bottom-0 right-0 left-0 mt-12 text-gray-700 py-8">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">BlogBrand</h2>
          <p className="text-gray-500 mt-2">Creating amazing experiences for you.</p>
        </div>

        <div className="flex flex-col space-y-2">
          <Link href={routes.HOME} className="text-gray-600 hover:text-gray-900">Home</Link>
          <Link href={routes.ALLBLOGS} className="text-gray-600 hover:text-gray-900">Blogs</Link>
          <Link href={routes.SIGNUP} className="text-gray-600 hover:text-gray-900">Sign Up</Link>
        </div>

        <div className="flex space-x-4">
          <Link href="#" className="text-gray-600 hover:text-gray-900 text-xl"><FaFacebook /></Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900 text-xl"><FaTwitter /></Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900 text-xl"><FaInstagram /></Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900 text-xl"><FaLinkedin /></Link>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-6 border-t border-gray-300 pt-4">
        &copy; {new Date().getFullYear()} BlogBrand. All rights reserved.
      </div>
    </footer>  
    </>
  )
}
