import {React, useState, useEffect} from 'react'
import NavBar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';



  

export const Layout = ({children}) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true)
    }, [])
  return mounted &&(
    <html lang="fr">

      <body>
      <NavBar/>

        {children}
      <Footer/>
      </body>
    
    </html>
  );
}

export default Layout;
