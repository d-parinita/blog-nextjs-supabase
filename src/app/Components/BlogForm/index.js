'use client'
import React, { useEffect, useState } from 'react'
import { Editor } from "@tinymce/tinymce-react";
import { addBlogData, getUserData, uploadFile } from '@/app/supabase-service';
import { toast } from 'react-toastify';
import { constVariables } from '@/app/utils/constVariables';
import dynamic from 'next/dynamic';
const TinyMCEEditor = dynamic(() => import('@tinymce/tinymce-react').then(mod => mod.Editor), { ssr: false });

export default function BlogForm() {

  const [data, setData] = useState([])
  const [blogData, setBlogData] = useState({
    image: '',
    title: '',
    shortDesc: '',
    id: ''
  })
  const [desc, setDesc] = useState('')
  const [image, setImage] = useState(null)

  const userData = async() => {
    const response = await getUserData()
    setBlogData({...blogData,
      id: response?.user?.id
    })
    if (response?.error) {
      console.log('error');
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  }

  const handleSubmit = async () => {
    try {
      let finalImageUrl = blogData?.image;
      if (image) {
        finalImageUrl = await uploadFile(image, constVariables.BUCKETS.BLOGS); 
      }
      await saveBlogData(finalImageUrl); 
    } catch (error) {
      toast.error('Error saving blog: ' + error.message);
    }
  }

  const saveBlogData = async(imageUrl) => {
    try {
      const payload = { 
        title: blogData?.title, 
        desc: desc, 
        image: imageUrl,
        short_desc: blogData?.shortDesc,
        user_id: blogData?.id
      };
      console.log(payload);
      
      try {
        const addData = await addBlogData(payload, constVariables.TABLES.BLOGS);
        toast.success('Blog posted successfully!');
      } catch (error) {
        toast.error('Error adding data');
      }
      setBlogData({...blogData,
        image: '',
        title: '',
        shortDesc: '',
        desc: ''
      })
      setImage(null)
    } catch (error) {
      toast.error('Error saving blog');
    }
  }

  useEffect(() => {
    userData()
  }, [])

  return (
    <>
    <div className="max-w-6xl my-12 mx-auto bg-white p-6 shadow-lg rounded-lg">
      <div className='text-3xl pb-8'>Upload Blogs</div>

      <input onChange={handleFileChange} type="file" className="w-full p-2 border rounded-md mb-4" accept="image/*"/>
      
      <input
        type="text"
        onChange={(e) => setBlogData({...blogData, title: e.target.value})}
        value={blogData?.title}
        className="w-full p-2 border rounded-md mb-4"
        placeholder="Enter Title"
      />

      <textarea
        onChange={(e) => setBlogData({...blogData, shortDesc: e.target.value})}
        value={blogData?.shortDesc}
        className="w-full p-2 border rounded-md mb-4"
        rows={3}
        placeholder="Short Description"
      ></textarea>

      <TinyMCEEditor
        apiKey='igbxa8s1rfgyyy8sd59uq442qr8rtv3o8l624jp27e72dnur'
        init={{
          height: 300,
          menubar: false,
          plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview'],
          toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | code',
          setup: (editor) => {
            editor.on('change', () => {
              setDesc(editor.getContent());
            });
          },
        }}
      />

      <button onClick={handleSubmit} className="w-full mt-4 bg-blue-600 text-white p-2 rounded-md">Submit</button>
    </div>  
    </>
  )
}
