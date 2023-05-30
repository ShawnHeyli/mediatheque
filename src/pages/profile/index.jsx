"use client";

import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

import Layout from "@/components/layouts/layout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const getServerSideProps = async (ctx) => {
  // Create a client for server-side queries
  const supabaseServer = createPagesServerClient(ctx);

  // Check if we have a session
  const {
    data: { session },
  } = await supabaseServer.auth.getSession();

  /*
  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
    */

  // Run queries with RLS on the server
  const { data } = await supabaseServer
    .from("user")
    .select("*")
    .eq("id", 1)
    .single();

  return {
    props: {
      session: session,
      data: data ?? [],
    },
  };
};

export default function Profile({ data }) {
  // Client-side supabase client
  const supabase = createClientComponentClient();
  const router = useRouter();

  // Listen for sign in/out and reload the page
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "INITIAL_SESSION") router.replace(router.asPath);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  // Sign up function email/password
  const signUp = async () => {
    const { error } = await supabase.auth.signUp({
      email: "oye@grr.la",
      password: "oyeoye",
      options: {
        data: {
          pseudo: "oye",
        },
      },
    });
    if (error) console.log("Error: ", error.message);
  };

  // Sign in function email/password
  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: "oye@grr.la",
      password: "oyeoye",
    });
    if (error) console.log("Error: ", error.message);
  };

  // Sign out function
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("Error: ", error.message);
  };

  return (
    <Layout>
      <div>
        <h1>Profile</h1>
        <p>{JSON.stringify(data)}</p>
        <button onClick={signUp}>Sign up</button>
        <button onClick={signIn}>Sign in</button>
        <button onClick={signOut}>Sign out</button>
      </div>
    </Layout>
  );
}
