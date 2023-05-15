/* eslint-disable no-undef */
import { createClient } from "@supabase/supabase-js";

// TODO: Fix
// EsLint does not recognize process.env
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default supabase;
