'use client'
import React from 'react'
import { Editor } from "@tinymce/tinymce-react";

export default function Blogform() {
  return (
    <>
    <div className="max-w-6xl mt-12 mx-auto bg-white p-6 shadow-lg rounded-lg">
      <div className='text-3xl pb-8'>Upload Blogs</div>
      {/* Image Upload */}
      <label className="block mb-4 cursor-pointer">
      <input type="file" className="hidden" accept="image/*"/>
        {/* {image ? (
          <img src={image} alt="Uploaded" className="w-full h-48 object-cover rounded-md" />
        ) : ( */}
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-md">
            <span className="text-gray-500">Upload Image</span>
          </div>
        {/* )} */}
      </label>

      {/* Title Input */}
      <input
        type="text"
        className="w-full p-2 border rounded-md mb-4"
        placeholder="Enter Title"
      />

      {/* Short Description */}
      <textarea
        className="w-full p-2 border rounded-md mb-4"
        rows={3}
        placeholder="Short Description"
      ></textarea>

      {/* TinyMCE Editor */}
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        init={{
          height: 500,
          menubar: false,
          plugins: "link lists",
          toolbar: "undo redo | bold italic | bullist numlist | link",
        }}
      />

      {/* Submit Button */}
      <button className="w-full mt-4 bg-blue-600 text-white p-2 rounded-md">Submit</button>
    </div>  
    </>
  )
}
