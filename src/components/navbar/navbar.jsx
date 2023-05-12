import React from "react";
import './navBar.scss';

export default function NavBar (){
  return <main>
    <header className="navBar">
    <ul>
      <li><a href="/">CINERATER</a></li>
      <li className="user"><a className="active right" href="#inscription">Inscription</a></li>
      <li className="user"><a href="#se connecter">Se connecter</a></li>
      
    </ul>

  </header>
  </main> 
  
}

