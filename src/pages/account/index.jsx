import React from 'react'
//import supabase from "@/lib/supabase";
import Layout from "@/components/layouts/layout";
import "@/app/globals.css";
import Image from "next/image";
import "./account.scss";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

export async function getServerSideProps(ctx) {
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
  
  // TEMP 
  return { props: { user: session.user } };
}

// eslint-disable-next-line no-unused-vars
export default function Home({ movies, user }) {
  const pseudo = user.user_metadata.pseudo;

  return (
    <Layout>
      <div className="account">
        <div className="accountInfos">
          <Image
            src={"/images/placeholders/default_user_avatar.png"}
            alt="profile picture"
            height="100"
            width="100"
          />
          <h2>{pseudo}</h2>
        </div>
        <h2>Last Review</h2>
        <div className="reviewBox"></div>
        <h2>Most Liked Review</h2>
        <div className="reviewBox"></div>
      </div>
    </Layout>
  );
}