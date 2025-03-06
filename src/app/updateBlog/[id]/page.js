import BlogForm from '@/app/Components/BlogForm'
import React, { use } from 'react'

export default function Page({params}) {

  const {id} = use(params)

  return (
    <>
       <BlogForm
        id={id}
       /> 
    </>
  )
}
