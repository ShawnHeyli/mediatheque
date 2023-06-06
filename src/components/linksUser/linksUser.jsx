import React from "react";
import './linksUser.scss';
import Link from "next/link";
import { useUser } from "@supabase/auth-helpers-react";


export default function LinksUser (){
  const user = useUser();

  return (

    <div className="user">
        {user ? (
          <ul className='list-items'>
            <li className='list-item'>
              <div className="item_for_user">
                  <Link className='user' href="/account">
                      <div >
                      <div>
                              <img className="item-logo" src="/images/accueil/user_space_white.png" alt='user_space'/>
                          </div>
                          <p className="text-lien-item">User space</p> 
                      </div>
                  </Link>
                </div>
            </li>

        </ul>
        ) : (
          <>
            <ul className='list-items'>
              <li className='list-item'>
              <div className="item">
                  <Link className='user' href="/login">
                      <div >
                      <div>
                              <img className="item-logo" src="/images/accueil/user_space_white.png" alt='user_space'/>
                          </div>
                          <p className="text-lien-item">User space</p> 
                      </div>
                  </Link>
                </div>
            </li>
            <li className='list-item'>
              <div className="item">
                  <Link className='user' href="/signup">
                      <div >
                          <div>
                              <img className="item-logo" src="/images/accueil/join_us_white.png" alt='join_us'/>
                          </div>
                          <p className="text-lien-item">Join us</p> 
                      </div>
                  </Link>
                </div>
              </li>
            </ul>
          </>
        )}
      </div>
    
  )
}

