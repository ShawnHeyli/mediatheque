import React from 'react'
//import supabase from "@/lib/supabase";
import Layout from "@/components/layouts/layout";
import "@/app/globals.css";
import Image from "next/image";
import "./account.scss";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Review from "@/components/review/review";
import supabase from '@/lib/supabase';



export async function getServerSideProps(ctx) {
   /*
  const {
    s = "",
    withgenres = "-1",
    withoutgenres = "-1",
    pageSize = 20,
    page = 1,
    sortBy = "popularity",
    order = "desc",
  } = ctx.query;
  const offset = (page - 1) * pageSize;


  let { data: movies, error } = await supabase
    .rpc(
      "search_movie",
      {
        keyword: s,
        similarity: 1,
        withgenres: withgenres.split(","),
        withoutgenres: withoutgenres.split(","),
      },
      { count: "exact" }
    )
    .select(
      `
        *,
        genres ( * ),
        keywords ( * ),
        production_companies ( * ),
        production_countries ( * ),
        spoken_languages ( * )
      `
    )
    .order(sortBy, { ascending: order === "desc" ? false : true })
    .range(offset, offset + pageSize - 1);
    */
  /*
  if (error) {
    return {
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  } else {
    return { props: { movies, user: session.user } };
  }
  */
  const supabaseServer = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabaseServer.auth.getSession(ctx);
  

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const user = session.user;

  const { data: lastReviews } = await supabase
  .from("reviews")
  .select(`*,
          movies( *,
            genres ( * ),
            keywords ( * ),
            production_companies ( * ),
            production_countries ( * ),
            spoken_languages ( * ),
            reviews ( * )
            )
            `)
  .eq("user_id", user.id)
  .order('date', { ascending: false })
  .order('time', { ascending: false });

  
      
  
  
 

  const placeholderAvatarUrl = "/images/placeholders/default_user_avatar.png";
  const { data, error } = await supabaseServer.storage
    .from("avatar")
    .createSignedUrl(`${user.id}/${user.id}`, 6000, {
      transform: {
        width: 300,
        height: 300,
      },
    });

  // TEMP
  let avatarUrl = error ? placeholderAvatarUrl : data.signedUrl;

  return {
    props: { user : user, avatarUrl : avatarUrl, lastReviews : lastReviews },
  };
}

// eslint-disable-next-line no-unused-vars
export default function Home({ movies, user, avatarUrl, lastReview, movie, lastReviews }) {
  const pseudo = user.user_metadata.pseudo;
  const router = useRouter();

  const supabaseClient = useSupabaseClient();

  async function handleAvatarUpload(e) {
    const file = e.target.files[0];
    
    if (!file.type.includes("image/")) {
      alert("Please upload an image file");
      return;
    }

    const { error } = await supabaseClient.storage
      .from("avatar")
      .upload(`${user.id}/${user.id}`, file, {
        upsert: true,
      });

    if (error) {
      alert(error.message);
    } else {
      // Soft refresh
      router.replace(router.asPath);
    }
  }


  return (
    <Layout>
      <div className="account">
        <div className="accountInfos">
          <Image
            src={avatarUrl}
            alt="profile picture"
            height="100"
            width="100"
          />
          <h2>{pseudo}</h2>
        </div>
        <h2>Avatar upload</h2>
        <input type="file" onChange={handleAvatarUpload} />
        <h2>Your Last Reviews</h2>
        <div className="reviews">
          {lastReviews?.map((review, index) => (
            <Review key={index} review={review} account={user} movie={review.movies} />
          ))}
        </div>
        <div className="reviewBox"></div>
        <h2>Most Liked Review</h2>
        <div className="reviewBox"></div>
      </div>
    </Layout>
  );
}