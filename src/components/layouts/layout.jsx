import React from 'react';
import NavBar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import "./layout.scss";

export default function Layout({children, searchBar}) {
  return (
    <>
      <NavBar searchBar={searchBar}/>
      <main className="container">
        {children}
      </main>
      <Footer/>
    </>
  )
}
