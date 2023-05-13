import React from 'react';
import NavBar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';

export const metadata = {
  title: 'Accueil',
}

export default function Layout({children}) {
  return (
    <>
      <NavBar/>
      <main>
        {children}
      </main>
      <Footer/>
    </>
  )
}
