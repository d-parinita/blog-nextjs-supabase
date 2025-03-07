'use client'
import { useLoader } from '@/app/context/LoaderContext';
import React from 'react'
import { DotLoader } from 'react-spinners';

export default function Loader() {

  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <>
    <div className='fixed inset-0 flex justify-center items-center bg-white bg-opacity-90 z-50'>
        <DotLoader
            color='#ccc'
            loading={loading}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    </div>
    </>
  )
}
