import { useEffect, useState } from "react";
import Image from "next/image";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Avatar({ width = 100, height = 100, user_id }) {
  const supabaseClient = useSupabaseClient();

  const [avatarUrl, setAvatarUrl] = useState(
    "/images/placeholders/default_user_avatar.png"
  );

  useEffect(() => {
    async function getAvatarUrl() {
      const placeholderAvatarUrl =
        "/images/placeholders/default_user_avatar.png";

      const { data, error } = await supabaseClient.storage
        .from("avatar")
        .createSignedUrl(`${user_id}/${user_id}`, 6000, {
          transform: {
            width,
            height,
          },
        });

      setAvatarUrl(error ? placeholderAvatarUrl : data.signedUrl);
    }
    getAvatarUrl();
  }, [user_id, height, width]);

  return (
    <Image
      src={avatarUrl}
      alt="profile picture"
      height={height}
      width={width}
    />
  );
}
