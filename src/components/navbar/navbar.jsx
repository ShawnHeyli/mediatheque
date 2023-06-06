
import React from "react";
import './navBar.scss';
import SearchBar from "@/components/searchBar/searchBar";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@supabase/auth-helpers-react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';


export default function NavBar({ searchBar }) {
  const hasSearch = searchBar != "hidden";
  const user = useUser();
  
  const handleSignOut = async () => {
    const supabase = createClientComponentClient()
    await supabase.auth.signOut()
  }
  
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
          <div>
          <Link className="account" href="/account">
            <Image
              src={"/images/placeholders/default_user_avatar_highlight.png"}
              alt="profile picture"
              height="20"
              width="20"
            />
          </Link>
          <Link className="active" href="/login" onClick={handleSignOut}>
              Sign out
            </Link>
          </div>
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

