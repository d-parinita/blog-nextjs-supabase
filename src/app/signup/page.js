import Link from "next/link";
import React from "react";
import { routes } from "../utils/routes";

export default function Page() {

  return (
    <div className="max-w-md mt-12 mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          className="w-full mt-1 p-2 border rounded-md"
          placeholder="Enter your email"
        />
      </div>

      {/* Password */}
      <div className="mb-4 relative">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          className="w-full mt-1 p-2 border rounded-md pr-10"
          placeholder="Enter your password"
        />
      </div>

      {/* Submit Button */}
      <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
        Sign Up
      </button>

      {/* Login Link */}
      <p className="text-center mt-4 text-gray-600">
        Already have an account? <Link href={routes.LOGIN} className="text-blue-600">Log in</Link>
      </p>
    </div>
  );
}
