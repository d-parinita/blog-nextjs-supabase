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
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 8;
  const totalPages = Math.ceil(totalCount / limit);
  const showPagination = totalCount > limit;

  const getBlogData = async () => {
    setLoading(true)
    try {
      const offset = (page - 1) * limit;
      const { data, count } = await getBlogFromDb(constVariables.TABLES.BLOGS, limit, offset);
      setData(data);
      setTotalCount(count); 
    } catch (error) {
      toast.error("Error fetching data");
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getBlogData()
  }, [page])

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
        {showPagination && (
          <div className="flex items-center justify-center mt-8 mb-20 space-x-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 text-xs font-medium text-gray-800 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200"
            >
              Prev
            </button>

            <span className="text-xs font-medium text-gray-700">
              {page} / {totalPages}
            </span>

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 text-xs font-medium text-gray-800 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  )
}
