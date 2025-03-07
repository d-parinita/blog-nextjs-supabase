import React from 'react'

export default function BlogCard({ image, title, shortDesc, isPathMyBlog=false, edit, deleteBlog}) {
  return (
    <>
        <div className="max-w-sm overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
            <img className="w-full h-50 object-cover" src={image} alt="Card Image" />
            <div className="p-4">
                <h2 className="text-xl line-clamp-2 font-semibold mb-2">{title}</h2>
                <p className="text-gray-600 line-clamp-3">{shortDesc}</p>
                {isPathMyBlog ? (<>
                  <div className="flex justify-end items-center mt-3 gap-2">
                    <button
                      onClick={edit}
                      className="bg-blue-500 text-white px-3 py-1.5 text-xs rounded-md shadow hover:bg-blue-600 hover:scale-105 transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={deleteBlog}
                      className="bg-red-500 text-white px-3 py-1.5 text-xs rounded-md shadow hover:bg-red-600 hover:scale-105 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </>) : ''} 
            </div>
        </div>
    </>
  )
}
