import React from "react";
import './navBar.scss';
import SearchBar from "@/components/searchBar/searchBar";
import Link from "next/link";
import Image from "next/image";

export default function NavBar({ searchBar }){
  const hasSearch = (searchBar != "hidden");

  return (
    <header className="navBar">
      <div className="logo">
        <Link href="/">
          <Image
          src={"/images/svg/logo.svg"}
          alt="Logo CineRater"
          height="40" 
          width="150"
          />
        </Link>
      </div>
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

