import { useCart } from '@/context/useCart';
import { CartProduct } from '@/interfaces/interfaces';
import Image from 'next/image'
import React, { useEffect } from 'react'


interface CartProductProps {
  readonly product: CartProduct
}

function CartProduct({ product }: CartProductProps) {
  const [counter, setCounter] = React.useState(product.quantity)
  const { removeFromCart, incrementQuantity, decrementQuantity } = useCart()

  useEffect(() => {
    if (product.quantity === 0) {
      removeFromCart(product)
      setCounter(0)
    }
    setCounter(product.quantity)
  }, [product.quantity, product, removeFromCart])

  return (<div className='transition duration-500 transform hover:bg-gray-700 rounded-xl hover:text-gray-100 px-2 py-3 mx-2' suppressHydrationWarning={true}>
    <div className="flex justify-between" >
      <div className="flex">
        <Image className="h-20 w-20 object-cover rounded" src={product.image} alt="" width={256} height={256} />
        <div className="mx-3">
          <h3 className="text-sm text-gray-200">{product.title.slice(0, 20) + "..."}</h3>
          <div className="flex items-center mt-2">
            <button className="text-gray-200 focus:outline-none focus:text-gray-200" onClick={() => decrementQuantity(product)}>
              <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
            <span className="text-gray-100 mx-2">{counter}</span>

            <button className="text-gray-200 focus:outline-none focus:text-gray-100" onClick={() => incrementQuantity(product)}>
              <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
          </div>
        </div>
      </div>
      <span className="text-gray-300">{product.price}$</span>
    </div>
  </div>
  )
}

export default CartProduct