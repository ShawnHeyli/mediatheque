import React from 'react'
//import supabase from "@/lib/supabase";
import Layout from "@/components/layouts/layout";
import "@/app/globals.css";
import Image from "next/image";
import "./account.scss";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export async function getServerSideProps(ctx) {
  const supabaseServer = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabaseServer.auth.getSession(ctx);
  const user = session.user;

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
    props: { user, avatarUrl },
  };
}

// eslint-disable-next-line no-unused-vars
export default function Home({ movies, user, avatarUrl }) {
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
        <h2>Last Review</h2>
        <div className="reviewBox"></div>
        <h2>Most Liked Review</h2>
        <div className="reviewBox"></div>
        <h2>Avatar upload</h2>
        <input type="file" onChange={handleAvatarUpload} />
      </div>
    </Layout>
  );
}