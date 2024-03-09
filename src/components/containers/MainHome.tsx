import React from 'react'
import SectionHero from '../sections/Hero.section'
import SectionProducts from '../sections/Products.section'
import { useTranslations } from 'next-intl';
interface Props {
  url?: string;
}
function MainHome({ url }: Props) {
  const translations = useTranslations('Index');
  return (
    <main>
      <div className="container mx-auto px-6 max-w-[80%]">
        <SectionHero />
        <SectionProducts
          nextText={translations("pagination.next")}
          previousText={translations("pagination.previous")}
          title={translations("ourProducts.title")}
          addToCartText={translations("ourProducts.addToCart")}
          closeText={translations("ourProducts.close")}
          url={url}
        />
      </div>
    </main>
  )
}

export default MainHome