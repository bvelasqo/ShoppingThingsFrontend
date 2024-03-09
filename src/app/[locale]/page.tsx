import MainHome from "@/components/containers/MainHome";
import Header from "@/components/header/Header";
import { CartProvider } from "@/context/CartContext";


export default function Home(){
  const url = process.env.NEXT_PUBLIC_API_URL;
  return (
    <CartProvider>
      <Header />
      <MainHome url={url} />
    </CartProvider>
  );
}
