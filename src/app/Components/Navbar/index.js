'use client'
import { routes } from "@/app/utils/routes";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side */}
        <div className="flex items-center space-x-6">
          <Link href={routes.HOME} className="text-xl font-bold">Logo</Link>
          <Link href={routes.HOME} className="hidden md:block">Home</Link>
          <Link href={routes.ALLBLOGS} className="hidden md:block">All Blogs</Link>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href={routes.BLOGFORM} className="px-4 py-2">Upload Blogs</Link>
          <Link href={routes.SIGNUP} className="px-4 py-2">Sign Up</Link>
          <Link href={routes.LOGIN} className="px-4 py-2 bg-blue-600 text-white rounded-md">Login</Link>
          {/* <Link href="#" className="px-4 py-2">My Blogs</Link> */}
          {/* <button className="px-4 py-2 bg-red-600 text-white rounded-md">Logout</button> */}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-600" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-3 mt-3">
          <Link href={routes.HOME} className="block">Home</Link>
          <Link href={routes.ALLBLOGS} className="block">All Blogs</Link>
          <Link href={routes.BLOGFORM} className="block text-blue-600">Upload Blogs</Link>
          <Link href={routes.SIGNUP} className="block text-blue-600">Sign Up</Link>
          <Link href={routes.LOGIN} className="block bg-blue-600 text-white px-4 py-2 rounded-md">Login</Link>
          <Link href="#" className="block px-4 py-2 rounded-md">My Blogs</Link>
          <button className="block bg-red-600 text-white px-4 py-2 rounded-md">Logout</button>
        </div>
      )}
    </nav>
  );
}
