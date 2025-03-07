'use client'
import { useLoader } from "@/app/context/LoaderContext";
import { getUserData, signOut } from "@/app/supabase-service";
import { routes } from "@/app/utils/routes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import { toast } from "react-toastify";

export default function Navbar() {

  const { setLoading } = useLoader()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const logout = async() => {
    const data = await signOut()
    setUser(null)
    if(data?.error){
      toast.error(data?.error)
    }
    router.push(routes.HOME)
  }

  const userData = async() => {
    const response = await getUserData()
    setUser({
      email: response?.user?.email,
      id: response?.user?.id
    })
    if(response?.error){
      toast.error('Error fetching user')
    }
  }

  useEffect(() => {
    userData()
  }, [])

  return (
    <nav className="bg-white shadow-md px-6 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href={routes.HOME} className="text-xl font-bold">BlogBrand</Link>
          <Link href={routes.HOME} className="hidden md:block">Home</Link>
          <Link href={routes.ALLBLOGS} className="hidden md:block">All Blogs</Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {!user ? (<>
            <Link href={routes.SIGNUP} className="px-4 py-2">Sign Up</Link>
            <Link href={routes.LOGIN} className="px-4 py-2 bg-blue-600 text-white rounded-md">Login</Link>
          </>) : (<>
            <Link href={routes.BLOGFORM} className="py-2">Upload Blogs</Link>
            <Link href={routes.MYBLOGS} className="px-4 py-2">My Blogs</Link>
            <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded-md">Logout</button>
          </>)}
        </div>

        <button className="md:hidden text-gray-600" onClick={() => setIsOpen(!isOpen)}>
          <MdMenu/>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-3 mt-3">
          <Link href={routes.HOME} className="block">Home</Link>
          <Link href={routes.ALLBLOGS} className="block">All Blogs</Link>
          {!user ? (<>
            <Link href={routes.SIGNUP} className="block text-blue-600">Sign Up</Link>
            <Link href={routes.LOGIN} className="block bg-blue-600 text-white px-4 py-2 rounded-md">Login</Link>
          </>) : (<>
            <Link href={routes.BLOGFORM} className="block text-blue-600">Upload Blogs</Link>
            <Link href={routes.MYBLOGS} className="block px-4 py-2 rounded-md">My Blogs</Link>
            <button onClick={logout} className="block bg-red-600 text-white px-4 py-2 rounded-md">Logout</button>
          </>)}
        </div>
      )}
    </nav>
  );
}
