"use client";
import React, { useEffect } from 'react'
import CardProduct from '../cards/Product.card'
import { Button, useDisclosure } from "@nextui-org/react";
import { Product } from '@/interfaces/interfaces';
import ModalProduct from '../modals/Product.modal';

interface SectionProductsProps {
  title?: string
  previousText?: string
  nextText?: string
  addToCartText?: string
  closeText?: string
  url?: string
}



function SectionProducts({ title, previousText, nextText, addToCartText, closeText, url }: SectionProductsProps) {
  const [page, setPage] = React.useState(1)
  const [products, setProducts] = React.useState<any[]>([])
  const [productSelected, setProductSelected] = React.useState<any>(null)
  const limit = 8
  const [loading, setLoading] = React.useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [lastPage, setLastPage] = React.useState(0)
  const handleOpen = (product: Product, quantity: number) => {
    setProductSelected({ ...product, quantity })
    onOpen();
  }
  useEffect(() => {
    setLoading(true)
    const fetchProducts = async () => {
      const dynamicData = await fetch(`${url}products/public?page=${page}&limit=${limit}`, { cache: 'no-store' }).then(res => res.json())
      const { result: { meta: { pageCount } } } = dynamicData
      const { result: { data } } = dynamicData
      setLastPage(pageCount)
      setProducts(data)
      setLoading(false)
    }
    fetchProducts()
  }, [page])
  return (
    <div className="mt-16 pb-14">
      <div className="px-0 sm:px-3 xl:px-0 mx-auto flex items-center justify-between">
        <h3 className="text-gray-200 text-2xl font-medium">{title}</h3>
        {/* Pagination */}
        <div className='flex items-center justify-end min-w-14 flex-wrap  gap-3 '>
          <Button onClick={(e: any) => {
            e.preventDefault()
            setPage(page - 1)
          }}
            disabled={page === 1} className="px-3 py-1 bg-gray-800 text-white rounded-xl transition duration-500 transform hover:bg-gray-100 hover:scale-105 hover:text-black" type='button'>{previousText}</Button>
          <Button disabled={page === lastPage} onClick={(e: any) => {
            e.preventDefault();
            setPage(page + 1)
          }} className="px-3 py-1 bg-gray-800 text-white rounded-xl transition duration-500 transform hover:bg-gray-100 hover:scale-105 hover:text-black mt-2 sm:mt-0" type='button'>{nextText}</Button>
        </div>
      </div>
      <div className='flex items-center justify-center w-full mt-10'>
        {loading && <div className='flex justify-center w-full items-center'><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 m-4 border-gray-100"></div></div>}
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full -mt-4">

        {
          !loading && products?.map((product: any) =>
            <CardProduct product={product} handleOpenModal={handleOpen} key={product._id} />
          )
        }
        <ModalProduct isOpen={isOpen} onClose={onClose} productSelected={productSelected} addToCartText={addToCartText} closeText={closeText} />
      </div>
      {/* Pagination */}
      <div className='flex items-center justify-center min-w-14 flex-wrap gap-3 mt-14'>
        <Button onClick={(e: any) => {
          e.preventDefault()
          setPage(page - 1)
        }}
          disabled={page === 1} className="px-3 py-1 bg-gray-800 text-white rounded-xl transition duration-500 transform hover:bg-gray-100 hover:scale-105 hover:text-black" type='button'>{previousText}</Button>
        <Button disabled={page === lastPage} onClick={(e: any) => {
          e.preventDefault();
          setPage(page + 1)
        }} className="px-3 py-1 bg-gray-800 text-white rounded-xl transition duration-500 transform hover:bg-gray-100 hover:scale-105 hover:text-black" type='button'>{nextText}</Button>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const url = process.env.NEXT_API_URL
  console.log(url)
  return {
    props: {
      url
    }
  }
  // ...
}

export default SectionProducts