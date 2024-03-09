import { useTranslations } from 'next-intl';
import React from 'react'

function SectionHero() {
  const translations = useTranslations('Index');
  return (
    <div className="h-64 rounded-md overflow-hidden bg-cover bg-center mt-12" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1577655197620-704858b270ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=144')"
    }}>
      <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
        <div className="px-10 max-w-xl">
          <h2 className="text-2xl text-white font-semibold">{translations("hero.title")}</h2>
          <p className="mt-2 text-gray-400">{translations("hero.subtitle")}</p>
        </div>
      </div>
    </div>
  )
}

export default SectionHero