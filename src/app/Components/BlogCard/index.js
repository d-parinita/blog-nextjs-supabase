import React from 'react'

export default function BlogCard() {
  return (
    <>
        <div className="max-w-sm mt-12 ml-12 overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
            <img className="w-full h-50 object-cover" src="https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Card Image" />
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">Card Title</h2>
                <p className="text-gray-600">This is a short description of the card content. It provides a brief insight into what this card is about.</p>
            </div>
        </div>
    </>
  )
}
