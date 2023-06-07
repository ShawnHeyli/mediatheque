import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import "./reviewWriter.scss";
import { useRouter } from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Avatar from "../avatar/Avatar";

export default function ReviewWriter({ review, movie_id }) {
  const [title, setTitle] = useState(review ? review.title : "");
  const [content, setContent] = useState(review ? review.content : "");
  const [hydrated, setHydrated] = useState(false);
  const [note, setNote] = useState(review ? review.note : 5);

  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }

  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  async function submitReview() {
    if (review) {
      await supabaseClient
        .from("reviews")
        .update({
          title: title,
          note: note,
          content: content,
          user_id: user.id,
          movie_id: movie_id,
        })
        .eq("id", review.id);
    } else {
      await supabaseClient.from("reviews").insert({
        title: title,
        note: note,
        content: content,
        user_id: user.id,
        movie_id: movie_id,
      });
    }

    router.push("/movies/" + movie_id);
  }

  var reviewStars = [];
  for (var i = 1; i <= 10; i++) {
    const value = i;
    reviewStars.push(
      <button className="starButton" key={i} onClick={() => setNote(value)}>
        <svg
          className={"star" + (i <= note ? " filled" : "")}
          viewBox="0 0 576 512"
        >
          <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
        </svg>
      </button>
    );
  }

  return (
    <article className="reviewWriter">
      <div className="infoBox">
        <div className="profilePicture">
          <Avatar user_id={user.id} width={60} height={60} />
        </div>
        <h3 className="pseudo">{user.user_metadata.pseudo}</h3>
        <div className="rank">{user.role}</div>
      </div>

      <div className="reviewBox">
        <input
          type="text"
          className="title"
          maxLength="30"
          placeholder="Title"
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="note">{reviewStars}</div>
        <textarea
          type="text"
          rows="12"
          className="content"
          placeholder="Write a review..."
          defaultValue={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="button"
          className="submit"
          value="submit"
          onClick={submitReview}
        />

        <div className="infos">{`Written the ${date} at ${time}`}</div>
      </div>
    </article>
  );
}