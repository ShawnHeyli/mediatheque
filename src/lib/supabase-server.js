import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

const supabase = createServerComponentClient({
  headers,
  cookies,
});
export default supabase;
