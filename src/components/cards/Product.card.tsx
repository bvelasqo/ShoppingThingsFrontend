"use client"
import { useCart } from '@/context/useCart';
import { Product } from '@/interfaces/interfaces';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react'



interface CardProductProps {
  readonly product: Product
  readonly handleOpenModal?: (product: Product, quantity: number) => void
}

function CardProduct({ product, handleOpenModal }: CardProductProps) {
  const [counter, setCounter] = React.useState(1)
  const { country, description, image, price, stock, title } = product
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(convertToCartProduct())
  }

  function convertToCartProduct() {
    return {
      id: product._id,
      title,
      price,
      image,
      country,
      quantity: counter
    }
  }
  return (
    <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden transition duration-500 transform hover:bg-gray-800 hover:scale-105 hover:cursor-pointer">
      {/* Image */}
      <div className="flex items-end justify-between h-56 w-full bg-cover" style={{
        backgroundImage: `url('${image}')`
      }}
      >
        {/* Button see details */}
        <Button className="min-w-0 p-2 rounded-full bg-gray-600 text-white mx-5 -mb-4 flex-none  hover:bg-gray-500 focus:outline-none focus:bg-gray-500 z-50" onClick={() => handleOpenModal?.(product, counter)}>
          <svg className="h-7 w-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </Button>

        <button className="p-2 rounded-full bg-gray-800 text-white mx-5 -mb-4 hover:bg-gray-600 focus:outline-none focus:bg-gray-600 z-50" onClick={() => handleAddToCart()}>
          <svg className="h-7 w-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
        </button>
      </div>
      <div className="px-5 py-3">
        {/* Ttile and Country */}
        <div className="flex items-baseline">

          <h3 className="text-gray-200 uppercase mr-4 mt-3 font-bold">{title.slice(0, 20) + "..."} -</h3>
          <Image alt='CO' src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`} width={15} height={15} />
        </div>
        {/* description */}
        <p className="text-gray-500 mt-2 text-sm mb-2">{description.slice(0, 100) + "..."}</p>
        <div className='flex justify-between items-center'>
          {/* Price */}
          <span className="text-gray-300 mt-2">${price}</span>
          <div className="flex items-center mt-2">
            <button className="text-gray-500 focus:outline-none focus:text-gray-600" onClick={() => setCounter(counter <= 1 ? counter : counter - 1)}>
              <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
            <span className="text-gray-400 mx-2">{counter}</span>

            <button className="text-gray-500 focus:outline-none focus:text-gray-600" onClick={() => setCounter(counter >= stock ? counter : counter + 1)}>
              <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CardProduct