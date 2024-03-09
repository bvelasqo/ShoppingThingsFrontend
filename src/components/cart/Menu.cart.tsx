'use client';
import React from 'react'
import CartProduct from './Product.cart'
import { useCart } from '@/context/useCart'

interface CartMenuProps {
  readonly open: boolean
  readonly setOpen: (isOpen: boolean) => void
  title?: string
  emptyText?: string
  checkoutBtnText?: string
}

function CartMenu({ open, setOpen, title, emptyText, checkoutBtnText }: CartMenuProps) {
  const { cart: cartProducts } = useCart()
  const [cart, setCart] = React.useState(cartProducts)
  React.useEffect(() => {
    setCart(cartProducts)
  }, [cartProducts])

  return cart.length !== 0 ? (
    <div className={`fixed right-0 top-0 max-w-sm w-full h-full px-0 py-4 transition duration-300 transform overflow-y-auto bg-gray-950 border-l-2 border-gray-700 z-10 ${open ? 'translate-x-0' : 'translate-x-full'}`} suppressHydrationWarning>
      <div className="flex items-center justify-between px-3">
        <h3 className="text-2xl font-medium text-gray-200">{title}</h3>
        <button className="text-gray-600 focus:outline-none" onClick={() => setOpen(!open)}>
          <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div >
      <div suppressHydrationWarning className='mt-5'>
        {
          cart.map((item: any) => {
            return <CartProduct key={item.id} product={item} />
          })
        }
      </div>
      <a className="flex items-center justify-center mt-4 mx-16 py-2 bg-gray-800 text-white text-sm uppercase font-medium rounded-xl hover:cursor-pointer hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
        <span>{checkoutBtnText}</span>
        <svg className="h-5 w-5 mx-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
      </a>
    </div>) : (
    <div className={`fixed right-0 top-0 max-w-sm w-full h-full px-0 py-4 transition duration-300 transform overflow-y-auto bg-gray-950 border-l-2 border-gray-700 z-10 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex items-center justify-between px-3">
        <h3 className="text-2xl font-medium text-gray-200">{title}</h3>
        <button className="text-gray-600 focus:outline-none" onClick={() => setOpen(!open)}>
          <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div >
      <hr className="my-3" />
      <div className='flex w-full justify-center mt-6'>
        <h3 className="text-xl font-medium text-gray-500">{emptyText}</h3>
      </div>
    </div>
  )
}

export default CartMenu