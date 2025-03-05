'use client'
import Link from "next/link";
import React, { useState } from "react";
import { routes } from "../utils/routes";
import { signup } from "../supabase-service";
import { useRouter } from "next/navigation";

export default function Page() {

  const router = useRouter()

  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const handleSignUp = async() => {
    const payload = {
      email: userData?.email,
      password: userData?.password
    }
    try {
      const response = await signup(payload)
      setUserData({
        email: '',
        password: ''
      })
      router.push(routes.HOME)
    } catch (error) {
      throw error
    }
  }

  return (
    <div className="max-w-md mt-12 mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          onChange={(e) => setUserData({...userData, email: e.target.value})}
          value={userData.email}
          className="w-full mt-1 p-2 border rounded-md"
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-4 relative">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          onChange={(e) => setUserData({...userData, password: e.target.value})}
          value={userData.password}
          className="w-full mt-1 p-2 border rounded-md pr-10"
          placeholder="Enter your password"
        />
      </div>
      <button 
        onClick={handleSignUp}
        className="w-full bg-blue-600 text-white py-2 cursor-pointer rounded-md hover:bg-blue-700 transition"
      >
        Sign Up
      </button>
      <p className="text-center mt-4 text-gray-600">
        Already have an account? <Link href={routes.LOGIN} className="text-blue-600">Log in</Link>
      </p>
    </div>
  );
}
