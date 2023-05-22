import React from "react";
import './navBar.scss';
import SearchBar from "@/components/searchBar/searchBar";

export default function NavBar (){
  /*
    <ul>
      <li><a href="/">CINERATER</a></li>
      <li className="user"><a className="active right" href="#inscription">Inscription</a></li>
      <li className="user"><a href="/login">Se connecter</a></li>
    </ul>*/

  return (
    <header className="navBar">
      <div className="logo"><a href="/">CINERATER</a></div>
      <SearchBar/>
      <div className="user">
        <a className="active" href="/signup">Sign Up</a>
        <a href="/login">Login</a>
      </div>
      
    </header>
  )
}

