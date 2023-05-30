import Debug from "@/components/debug/debug";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Redirect to login if not logged in (aka no session)
  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  // Run queries with RLS on the server
  const { data } = await supabase
    .from("user")
    .select("*")
    .eq("id", "1")
    .single();

  return {
    props: {
      session,
      data: data ?? [],
    },
  };
};

export default function ServerProfile({ data, session }) {
  return (
    <>
      <Debug title="Session" data={session} />
      <Debug title="Server side fetched data :" data={data} />
    </>
  );
}
