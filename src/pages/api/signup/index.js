import supabase from "@/lib/supabase";

export default async function handler(req, res) {

  const { email, password, pseudo } = req.body; 

  // Create the user
  // TODO: Figure out how to add a redirect link to the email dynamically
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { pseudo },
    },
  });

  
  // User exists, but is fake. See https://github.com/orgs/supabase/discussions/1282#discussioncomment-5230475
  // See https://github.com/orgs/supabase/discussions/1282#discussioncomment-4494190 to understand why we don't check directly for the email in the database
  if (data.user && data.user.identities && data.user.identities.length === 0) {
    res.status(500).json({ error: "Email already used" });
    return;
  }

  if (error) {
    res.status(500).json({ error: error.message });
  }
  else {
    res.status(200).json(data);
  }

}