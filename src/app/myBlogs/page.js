'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { constVariables } from '../utils/constVariables'
import { toast } from 'react-toastify'
import { deleteFromDb, getMyBlogFromDb, getUserData } from '../supabase-service'
import BlogCard from '../Components/BlogCard'
import { useRouter } from 'next/navigation'
import { routes } from '../utils/routes'
import { useLoader } from '../context/LoaderContext'

export default function Page() {

  const { setLoading } = useLoader()
  const router = useRouter()

  const [myData, setMyData] = useState([])
  const [user, setUser] = useState(null)
  const [page, setPage] = useState(1)
  const limit = 10

  const getMyBlogData = async() => {
    setLoading(true)
    try {
      const offset = (page - 1) * limit;
      const { data, count } = await getMyBlogFromDb(constVariables.TABLES.BLOGS, limit, offset, user);
      setMyData(data)  
    } catch (error) {
      toast.error("Error fetching data");
    } finally {
      setLoading(false)
    }
  };

  const userData = async() => {
    const response = await getUserData()
    setUser(response?.user?.id)
    if (response?.error) {
      toast.error('Error fetching user')
    }
  }

  const handleDelete = async(id) => {
    setLoading(true)
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteFromDb(constVariables.TABLES.BLOGS, id);
        getMyBlogData();
        toast.success("Blog deleted successfully");
      } catch (error) {
        toast.error("Error deleting blog");
      } finally {
        setLoading(false)
      }
    }
  }

  const handleEdit = (id) => {
    router.push(routes.UPDATEBLOG + '/' + id)
  }

  useEffect(() => {
    userData()
  }, [])

  useEffect(() => {
    if (user) {
      getMyBlogData()
    }
  }, [user])

  return (
    <>
    <div className="m-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {myData?.map((item, i) => (
          <Fragment key={i}>
            <BlogCard
              image={item?.image}
              title={item?.title}
              shortDesc={item?.short_desc}
              isPathMyBlog={true}
              deleteBlog={() => handleDelete(item?.id)}
              edit={() => handleEdit(item?.id)}
            />
          </Fragment>
        ))}
      </div>
    </div>
    </>
  )
}
