import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Cinerater',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  )
}
