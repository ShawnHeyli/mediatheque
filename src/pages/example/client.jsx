import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import LoginExample from "../../components/example/login";
import Debug from "@/components/debug/debug";

const LoginPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const [data, setData] = useState();

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient
        .from("rls_testbench")
        .select("*")
        .eq("id", "1")
        .single();
      setData(data);
    }
    // Only run query once user is logged in.
    if (user) loadData();
  }, [user]);

  return data ? (
    <>
      <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
      <Debug title="User" data={user} />
      <Debug title="Client side fetched data :" data={data} />
    </>
  ) : (
    <LoginExample />
  );
};

export default LoginPage;
