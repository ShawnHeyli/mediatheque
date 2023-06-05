import React from "react";
import './navBar.scss';
import SearchBar from "@/components/searchBar/searchBar";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@supabase/auth-helpers-react";

export default function NavBar({ searchBar }) {
  const hasSearch = searchBar != "hidden";
  const user = useUser();
  
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
      {hasSearch ? <SearchBar /> : <></>}
      <div className="user">
        {user ? (
          <Link className="account" href="/account">
            <Image
              src={"/images/placeholders/default_user_avatar_highlight.png"}
              alt="profile picture"
              height="20"
              width="20"
            />
          </Link>
        ) : (
          <>
            <Link className="active" href="/signup">
              Sign Up
            </Link>
            <Link href="/login">Login</Link>
          </>
        )}
      </div>
    </header>
  );
}

