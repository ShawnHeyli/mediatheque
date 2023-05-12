import './globals.css';
import React from 'react';
import NavBar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';


export const metadata = {
  title: 'Cinerater',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      
      <body>
        <NavBar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
