import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import Image from 'next/image';
import { useCart } from '@/context/useCart';

interface ModalProductProps {
  readonly productSelected: any
  readonly isOpen: boolean
  readonly onClose: () => void
  addToCartText?: string
  closeText?: string
}
function ModalProduct({ productSelected, isOpen, onClose, addToCartText, closeText }: ModalProductProps) {
  const [counter, setCounter] = React.useState(productSelected?.quantity ?? 1)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(convertToCartProduct())
    onClose()
  }

  React.useEffect(() => {
    setCounter(productSelected?.quantity ?? 1)
  }, [productSelected])

  function convertToCartProduct() {
    return {
      id: productSelected._id,
      title: productSelected.title,
      price: productSelected.price,
      image: productSelected.image,
      country: productSelected.country,
      quantity: counter
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} className=' bg-gray-900 py-4 max-h-[85%] overflow-auto' placement='top-center'
    >
      <ModalContent>
        <ModalHeader className='flex items-center justify-center text-2xl'>{productSelected?.title}</ModalHeader>
        <ModalBody>
          <div className="flex items-center justify-between">
            <div className="flex flex-col justify-center items-center">
              <Image width={256} height={256} className="h-64 w-64 object-cover rounded" src={productSelected?.image ?? ""} alt="" />
              <div className="mx-3 flex flex-col justify-center items-center mt-4">
                <Image alt='CO' src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${productSelected?.country}.svg`} width={15} height={15} />
                <div className="flex flex-col justify-center items-center gap-4 mt-2">
                  <span className="text-gray-200 mx-2 text-justify">{productSelected?.description}</span>
                  <span className="text-blue-200 mx-2 flex justify-center w-full text-xl">{productSelected?.price}$</span>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className='flex items-center justify-between'>
          <div className="flex items-center mt-2">
            <button className="text-gray-200 focus:outline-none focus:text-gray-400" onClick={() => setCounter(counter <= 1 ? counter : counter - 1)}>
              <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
            <span className="text-gray-100 mx-2">{counter}</span>

            <button className="text-gray-200 focus:outline-none focus:text-gray-400" onClick={() => setCounter(counter >= productSelected?.stock ? counter : counter + 1)}>
              <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
          </div>
          <div className="flex items-center justify-end gap-3">
            <Button
              onPress={() => handleAddToCart()}
              className='bg-gray-100 text-gray-800 hover:bg-gray-300 transition duration-500 transform 
              hover:scale-105 focus:outline-none focus:bg-gray-100 focus:text-gray-800 rounded-xl px-3 py-1 uppercase font-medium text-sm '
            >
              {addToCartText}
              <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </Button>
            <Button
              onPress={onClose}
              className='bg-gray-800 text-white hover:bg-gray-600 hover:text-gray-100 transition duration-500 transform hover:scale-105 focus:outline-none focus:bg-gray-100 focus:text-gray-800 rounded-xl px-3 py-1 uppercase font-medium text-sm'
            >
              {closeText}
            </Button>
          </div>

        </ModalFooter>
      </ModalContent>
    </Modal>)
}

export default ModalProduct