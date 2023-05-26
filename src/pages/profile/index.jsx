import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

export const getServerSideProps = async (ctx) => {
  // Create a client for server-side queries
  const supabase = createPagesServerClient(ctx);

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  // Run queries with RLS on the server
  const { data } = await supabase.from("user").select("*").eq("id", 1).single();

  return {
    props: {
      initialSession: session,
      user: session.user,
      data: data ?? [],
    },
  };
};

export default function Profile({ data }) {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
