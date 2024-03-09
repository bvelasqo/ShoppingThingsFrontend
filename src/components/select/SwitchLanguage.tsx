import React from "react";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import { useRouter } from 'next/navigation';

interface SwitchLanguageProps {
  label?: string
  languageText?: {
    spain: string
    france: string
    usa: string
  },
  locale: string
}

export default function SwitchLanguage({ label, languageText, locale }: SwitchLanguageProps) {
  const router = useRouter();
  return (
    <Select
      className="max-w-[200px] w-full max-h-[40px] h-full dark text-black bg-black dark:bg-black dark:border-gray-600 border-gray-300 dark:focus:border-gray-600 focus:border-gray-300 dark:hover:border-gray-600 hover:border-gray-300"
      label={label}
      defaultOpen={false}
      defaultSelectedKeys={[locale]}
      onChange={(item) => {
        console.log(item.target.value);
        const key = item.target.value;
        if (key === "spain") {
          router.push('/es')
        } else if (key === "france") {
          router.push('/fr')
        } else if (key === "usa") {
          router.push('/en')
        }
      }}
    >
      <SelectItem
        key="spain"
        className="dark:bg-black dark:text-black dark:hover:bg-gray-800 dark:hover:text-white bg:black text-black hover:bg-black-400 hover:text-black"
        startContent={<Avatar alt="Spain" className="w-6 h-6" src="https://flagcdn.com/es.svg" />}
      >

        {languageText?.spain}
      </SelectItem>
      <SelectItem
        key="france"
        className="dark:bg-black dark:text-black dark:hover:bg-gray-800 dark:hover:text-white bg:black text-black hover:bg-black-400 hover:text-black"
        startContent={<Avatar alt="France" className="w-6 h-6" src="https://flagcdn.com/fr.svg" />}
      >
        {languageText?.france}
      </SelectItem>
      <SelectItem
        key="usa"
        className="dark:bg-black dark:text-black dark:hover:bg-gray-800 dark:hover:text-white bg:black text-black hover:bg-black-400 hover:text-black"
        startContent={<Avatar alt="Usa" className="w-6 h-6" src="https://flagcdn.com/us.svg" />}
      >
        {languageText?.usa}
      </SelectItem>
    </Select>
  );
}
