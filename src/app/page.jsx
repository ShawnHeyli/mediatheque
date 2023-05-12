"use client"

import React from 'react'
import styles from './page.module.css'
import CardList from '@/components/cardList/cardList.jsx'


export default function Home() {
  return (
    
    <main className={styles.main}>
      
      <div className={styles.center}>
        <CardList/>
      </div>

    </main>
  )
}
