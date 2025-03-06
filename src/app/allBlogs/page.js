'use client'
import React, { useEffect, useState, Fragment } from "react";
import { toast } from "react-toastify";
import BlogCard from "../Components/BlogCard";
import { getBlogFromDb } from "../supabase-service";
import { constVariables } from "../utils/constVariables";

export default function Page() {

  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const limit = 10

  const getBlogData = async () => {
    try {
      const offset = (page - 1) * limit;
      const { data, count } = await getBlogFromDb(constVariables.TABLES.BLOGS, limit, offset);
      console.log(data);
      console.log(count);

      setData(data);
      // setTotalCount(count); 
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  useEffect(() => {
    getBlogData()
  }, [])

  return (
    <>
      <div className="m-12">
        <div className="text-center text-3xl font-bold m-10">All Blogs</div>
        {data?.map((item, i) => (
          <Fragment key={i}>
            <BlogCard 
              image={item?.image}
              title={item?.title}
              shortDesc={item?.short_desc}
            />
          </Fragment>
        ))}
      </div>
    </>
  )
}
