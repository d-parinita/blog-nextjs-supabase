'use client'
import React, { useEffect, useState, Fragment } from "react";
import { toast } from "react-toastify";
import BlogCard from "../Components/BlogCard";
import { getBlogFromDb } from "../supabase-service";
import { constVariables } from "../utils/constVariables";
import { routes } from "../utils/routes";
import Link from "next/link";
import { useLoader } from "../context/LoaderContext";

export default function Page() {

  const { setLoading } = useLoader()

  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const limit = 10

  const getBlogData = async () => {
    setLoading(true)
    try {
      const offset = (page - 1) * limit;
      const { data, count } = await getBlogFromDb(constVariables.TABLES.BLOGS, limit, offset);
      console.log(data);
      console.log(count);

      setData(data);
      // setTotalCount(count); 
    } catch (error) {
      toast.error("Error fetching data");
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getBlogData()
  }, [])

  return (
    <>
      <div className="m-12">
        <div className="text-center text-3xl font-bold m-10">All Blogs</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data?.map((item, i) => (
            <Fragment key={i}>
              <Link href={routes.BLOGDETAILS + '/' + item?.id}>
                <BlogCard 
                  image={item?.image}
                  title={item?.title}
                  shortDesc={item?.short_desc}
                />
              </Link>
            </Fragment>
          ))}
        </div>
      </div>
    </>
  )
}
