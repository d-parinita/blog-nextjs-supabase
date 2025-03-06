import React from 'react'

export default function BlogCard({ image, title, shortDesc, isPathMyBlog=false, edit, deleteBlog}) {
  return (
    <>
        <div className="max-w-sm overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
            <img className="w-full h-50 object-cover" src={image} alt="Card Image" />
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                <p className="text-gray-600">{shortDesc}</p>
                {isPathMyBlog ? (<>
                  <div className="flex justify-between mt-4">
                    <button 
                      onClick={edit}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={deleteBlog}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
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
