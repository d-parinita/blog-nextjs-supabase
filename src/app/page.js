'use client'
import React, { useEffect, useState, Fragment } from "react";
import BlogCard from "./Components/BlogCard";
import Hero from "./Components/Hero";
import { getBlogFromDb } from "./supabase-service";
import { constVariables } from "./utils/constVariables";
import { toast } from "react-toastify";
import Link from "next/link";
import { routes } from "./utils/routes";
import { useLoader } from "./context/LoaderContext";

export default function Home() {

  const { setLoading } = useLoader()
  const [data, setData] = useState([])
  const [page, setPage] = useState(1);
  const limit = 8;

  const getBlogData = async () => {
    setLoading(true)
    try {
      const offset = (page - 1) * limit;
      const { data, count } = await getBlogFromDb(constVariables.TABLES.BLOGS, limit, offset);
      setData(data);
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
      <Hero/>
      <div className="m-12">
        <div className="text-center text-3xl font-bold m-10">Featured Blogs</div>
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
        <div className="mt-6 flex justify-end">
          <Link
            href={routes.ALLBLOGS}
            className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition"
          >
            View all Blogs
          </Link>
        </div>
      </div>
    </>
  );
}
