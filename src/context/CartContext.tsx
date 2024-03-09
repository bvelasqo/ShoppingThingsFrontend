"use client"
import { useReducer, createContext, useMemo } from 'react'
import { cartInitialState, cartReducer } from './CartReducer';


export const CartContext = createContext<any>({})

function useCartReducer() {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  const addToCart = (product: any) => dispatch({
    type: 'ADD_TO_CART',
    payload: product
  })

  const removeFromCart = (product: any) => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  })

  const incrementQuantity = (product: any) => dispatch({
    type: 'INCREMENT_QUANTITY',
    payload: product
  })

  const decrementQuantity = (product: any) => dispatch({
    type: 'DECREMENT_QUANTITY',
    payload: product
  })

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  return { state, addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity }
}

// la dependencia de usar React Context
// es MÍNIMA
export function CartProvider({ children }: any) {
  const { state, addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = useCartReducer()
  const obj = useMemo(() => ({
    cart: state,
    addToCart,
    removeFromCart,
    clearCart,
    incrementQuantity, decrementQuantity
  }), [state, addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity])
  return (
    <CartContext.Provider value={obj}
    >
      {children}
    </CartContext.Provider>
  )
}