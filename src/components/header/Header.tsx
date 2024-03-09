import React from 'react'
import Navbar from './Navbar'
import { useLocale, useTranslations } from 'next-intl';

function Header() {
  const translations = useTranslations('Index');
  const locale = useLocale();

  const languages = {
    "usa": translations("languages.en"),
    "spain": translations("languages.es"),
    "france": translations("languages.fr"),
    "locale": locale === "en" ? "usa" : locale === "es" ? "spain" : "france"
  }

  console.log(languages);

  return (
    <header>
      <Navbar title={translations("title")} loginText={translations("loginText")} cartEmptyText={translations("cart.empty")} cartTitle={translations("cart.title")} cartCheckout={translations("cart.checkout")} selectLanguageText={translations("selectLanguage")} languages={languages} />
    </header >
  )
}

export default Header