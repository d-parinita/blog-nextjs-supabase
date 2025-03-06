'use client'
import { getBlogById } from '@/app/supabase-service';
import { constVariables } from '@/app/utils/constVariables';
import React, { use, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function Page({params}) {

  const {id} = use(params)
  const [blog, setBlog] = useState(null)

  const getBlog = async() => {
    try {
      const data = await getBlogById(id, constVariables.TABLES.BLOGS);
      setBlog(data)
    } catch (error) {
      toast.error("Error fetching data");
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  useEffect(() => {
    getBlog()
  }, [])

  return (
    <>
    <div className="max-w-5xl mx-auto p-6 my-12 bg-white shadow-lg">
      <img
        src={blog?.image}
        alt="Article Image"
        className="w-full h-64 object-cover rounded-lg"
      />
      <h1 className="text-3xl font-bold mt-4">{blog?.title}</h1>
      <p className="text-gray-500 text-sm mt-1">Published on {formatDate(blog?.created_at)}</p>
      <p dangerouslySetInnerHTML={{ __html: blog?.desc }} className="prose max-w-none text-gray-700 mt-4"></p>
    </div>
    </>
  )
}
