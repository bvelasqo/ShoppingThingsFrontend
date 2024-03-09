export interface Product {
  readonly _id: string
  readonly title: string
  readonly price: number
  readonly description: string
  readonly image: string
  readonly country: string
  readonly stock: number
}

export interface CartProduct {
  readonly id: number;
  readonly title: string;
  readonly price: number;
  readonly image: string;
  readonly country: string;
  readonly quantity: number;
}

