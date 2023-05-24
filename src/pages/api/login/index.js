import supabase from "@/lib/supabase";

export default async function handler(req, res) {

  const { email, password } = req.body; 

  // Create the user
  // TODO: Figure out how to add a redirect link to the email dynamically
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    res.status(500).json({ error: error.message });
  }
  else {
    res.status(200).json(data);
  }

}