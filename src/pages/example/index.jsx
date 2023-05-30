"use client";

import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import LoginExample from "../../components/example/login";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Debug from "@/components/debug/debug";

export const getServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  /*
  if (!session)
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  }
  */

  const { data } = await supabase
    .from("user")
    .select("*")
    .eq("id", "1")
    .single();

  return {
    props: {
      session,
      serverData: data ?? [],
    },
  };
};

export default function Example({ serverData, session }) {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const user = useUser();
  const [clientData, setData] = useState(null);

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient
        .from("user")
        .select("*")
        .eq("id", "1")
        .single();
      setData(data);
    }
    // Only run query once user is logged in.
    if (user) loadData();
  }, [user]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((event) => {
      if (event !== "INITIAL_SESSION") router.replace(router.asPath);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabaseClient, router]);

  const handleSignOut = async () => {
    await supabaseClient.auth.signOut();
  };

  return session ? (
    <>
      <h1>Example</h1>
      <button onClick={handleSignOut}>Sign out</button>
      <h3>Session</h3>
      <p>{JSON.stringify(session, null, 2)}</p>
      <h3>User</h3>
      <p>{JSON.stringify(user, null, 2)}</p>
      <Debug title="Data fetched server side" data={serverData} />
      <Debug title="Data fetched client side" data={clientData} />
    </>
  ) : (
    <LoginExample />
  );
}
