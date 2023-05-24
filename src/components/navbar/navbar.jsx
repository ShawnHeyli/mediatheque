import React from "react";
import './navBar.scss';
import SearchBar from "@/components/searchBar/searchBar";

export default function NavBar({ searchBar }){
  const hasSearch = (searchBar != "hidden");

  return (
    <header className="navBar">
      <div className="logo"><a href="/">CINERATER</a></div>
      {hasSearch?(
        <SearchBar/>
      ):(
      <></>
      )}
      <div className="user">
        <a className="active" href="/signup">Sign Up</a>
        <a href="/login">Login</a>
      </div>
      
    </header>
  )
}

