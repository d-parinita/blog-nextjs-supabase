'use client'
import React, { useEffect, useState } from 'react'
import { addBlogData, getBlogById, getUserData, updateInDb, uploadFile } from '@/app/supabase-service';
import { toast } from 'react-toastify';
import { constVariables } from '@/app/utils/constVariables';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { routes } from '@/app/utils/routes';
const TinyMCEEditor = dynamic(() => import('@tinymce/tinymce-react').then(mod => mod.Editor), { ssr: false });

export default function BlogForm({id}) {

  const router = useRouter()
  const [blogData, setBlogData] = useState({
    image: '',
    title: '',
    short_desc: '',
    id: '',
  })
  const [desc, setDesc] = useState('')
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (id) {
      getBlog(id);
    }
  }, [id])

  const getBlog = async (id) => {
    try {
      const data = await getBlogById(id, constVariables.TABLES.BLOGS)
      setBlogData({
        image: data?.image,
        title: data?.title,
        short_desc: data?.short_desc,
        id: data?.user_id,
      })
      setDesc(data?.desc)
    } catch (error) {
      toast.error("Error fetching data");
    }
  }

  const userData = async() => {
    const response = await getUserData()
    setBlogData({...blogData,
      id: response?.user?.id
    })
    if (response?.error) {
      toast.error("Error fetching user");
    }
  }

  const handleFileChange = (e) => {
    setImage(e.target.files?.[0]);
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
        short_desc: blogData?.short_desc,
        user_id: blogData?.id
      }
      if (id) {
        try {
          const update = await updateInDb(id, payload, constVariables.TABLES.BLOGS);
          toast.success('Updated successfully');
          router.push(routes.ALLBLOGS)
        } catch (error) {
          toast.error('Error updating blog');
        }
      } else {
        try {
          const addData = await addBlogData(payload, constVariables.TABLES.BLOGS);
          toast.success('Blog posted successfully!');
          router.push(routes.ALLBLOGS)
        } catch (error) {
          toast.error('Error adding data');
        }
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
        onChange={(e) => setBlogData({...blogData, short_desc: e.target.value})}
        value={blogData?.short_desc}
        className="w-full p-2 border rounded-md mb-4"
        rows={3}
        placeholder="Short Description"
      ></textarea>

      <TinyMCEEditor
        apiKey='igbxa8s1rfgyyy8sd59uq442qr8rtv3o8l624jp27e72dnur'
        value={desc}
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

      <button onClick={handleSubmit} className="w-full mt-4 bg-blue-600 text-white p-2 rounded-md">{id ? 'Update Blog' : 'Add Blog'}</button>
    </div>  
    </>
  )
}
