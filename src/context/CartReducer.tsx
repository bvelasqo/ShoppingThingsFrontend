"use client"
import {CartProduct} from '@/interfaces/interfaces'

export const cartInitialState = JSON.parse(
  (() => {
    if (typeof window !== "undefined") {
      // Client-side-only code}
      return window.localStorage.getItem('cart') ?? '[]'
    }
    return '[]'
  })()
) || []

export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART',
  INCREMENT_QUANTITY: 'INCREMENT_QUANTITY',
  DECREMENT_QUANTITY: 'DECREMENT_QUANTITY'
}

// update localStorage with state for cart
export const updateLocalStorage = (state: any) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem('cart', JSON.stringify(state))
  }
}

const UPDATE_STATE_BY_ACTION = {
  [CART_ACTION_TYPES.ADD_TO_CART]: (state: any, action: any) => {
    const { id } = action.payload
    const productInCartIndex = state.findIndex((item: CartProduct) => item.id === id)

    if (productInCartIndex >= 0) {
      const newState = [
        ...state.slice(0, productInCartIndex),
        { ...state[productInCartIndex], quantity: state[productInCartIndex].quantity + action.payload.quantity },
        ...state.slice(productInCartIndex + 1)
      ]

      updateLocalStorage(newState)
      return newState
    }

    const newState = [
      ...state,
      {
        ...action.payload, // product
        quantity: action.payload.quantity
      }
    ]

    updateLocalStorage(newState)
    return newState
  },
  [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state: any, action: any) => {
    const { id } = action.payload
    const newState = state.filter((item: any) => item.id !== id)
    updateLocalStorage(newState)
    return newState
  },
  [CART_ACTION_TYPES.CLEAR_CART]: () => {
    updateLocalStorage([])
    return []
  },
  [CART_ACTION_TYPES.INCREMENT_QUANTITY]: (state: any, action: any) => {
    const { id } = action.payload
    const productInCartIndex = state.findIndex((item: CartProduct) => item.id === id)
    const newState = [
      ...state.slice(0, productInCartIndex),
      { ...state[productInCartIndex], quantity: state[productInCartIndex].quantity >= state[productInCartIndex].stock ? state[productInCartIndex].quantity : state[productInCartIndex].quantity + 1 },
      ...state.slice(productInCartIndex + 1)
    ]

    updateLocalStorage(newState)
    return newState
  },
  [CART_ACTION_TYPES.DECREMENT_QUANTITY]: (state: any, action: any) => {
    const { id } = action.payload
    const productInCartIndex = state.findIndex((item: CartProduct) => item.id === id)
    const newState = [
      ...state.slice(0, productInCartIndex),
      { ...state[productInCartIndex], quantity: state[productInCartIndex].quantity < 1 ? state[productInCartIndex].quantity : state[productInCartIndex].quantity - 1 },
      ...state.slice(productInCartIndex + 1)
    ]

    updateLocalStorage(newState)
    return newState
  }
}

export const cartReducer = (state: any, action: any) => {
  const { type: actionType } = action
  const updateState = UPDATE_STATE_BY_ACTION[actionType]
  return updateState ? updateState(state, action) : state
}