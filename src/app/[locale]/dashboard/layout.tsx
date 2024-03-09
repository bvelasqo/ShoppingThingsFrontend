import React from 'react'
import styles from '@/app/ui/dashboard/dashboard.module.css'
import { Sidebar } from '@/app/ui/dashboard/sidebar/Sidebar'
import { Navbar } from '@nextui-org/react'

const layout = ({ children }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Navbar />
        <div>{children}</div>
      </div>
    </div>
  )
}

export default layout