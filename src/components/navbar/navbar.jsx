import React from "react";
import './navBar.scss';
import SearchBar from "@/components/searchBar/searchBar";
import Link from "next/link";

export default function NavBar({ searchBar }){
  const hasSearch = (searchBar != "hidden");

  return (
    <header className="navBar">
      <div className="logo"><Link href="/">CINERATER</Link></div>
      {hasSearch?(
        <SearchBar/>
      ):(
      <></>
      )}
      <div className="user">
        <Link className="active" href="/signup">Sign Up</Link>
        <Link href="/login">Login</Link>
      </div>
      
    </header>
  )
}

