import React from 'react'
import supabase from "@/lib/supabase";
import Layout from '@/components/layouts/layout'
import MovieList from '@/components/movieList/movieList.jsx'
import '@/app/globals.css';
import Image from 'next/image';
import Review from '@/components/review/review';
import "./index.scss";


export async function getServerSideProps({ query }) {
  const { s = "", withgenres = "-1", withoutgenres = "-1", pageSize = 20, page = 1, sortBy = "popularity", order = "desc" } = query;
  const offset = (page - 1) * pageSize;

  let { data: movies, error } = await supabase
    .rpc(
      'search_movie',
      { keyword: s , similarity: 1, withgenres: withgenres.split(','), withoutgenres: withoutgenres.split(',') },
      { count: 'exact'}
      )
    .select(
      `
        *,
        genres ( * ),
        keywords ( * ),
        production_companies ( * ),
        production_countries ( * ),
        spoken_languages ( * )
      `
      )
    .order(sortBy, { ascending: order === "desc" ? false : true })
    .range(offset, offset + pageSize - 1);

  if (error) {
    console.log(error);
    return { props: { movies: [], error: error } };
  } else {
    return { props: { movies: movies } };
  }
}

export default function Home({ movies }) {
    return (
        <Layout>
        <div className="account">
          <div className="accountInfos">
            <Image
              src={"/images/placeholders/default_user_avatar.png"}
              alt="profile picture"
              height="100"
              width="100"
              />
              <h2>
                Pseudo
              </h2>
          </div>
            <h2>
              Last Review
            </h2>
            <div className="reviewBox">
              <Review 
              content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Iaculis eu non diam phasellus vestibulum lorem sed. Risus at ultrices mi tempus imperdiet. Ut etiam sit amet nisl purus in. fin du lorem'
              />
            </div>
            <h2>
              Most Liked Review
            </h2>
            <div className="reviewBox">
              <Review 
              content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Iaculis eu non diam phasellus vestibulum lorem sed. Risus at ultrices mi tempus imperdiet. Ut etiam sit amet nisl purus in. fin du lorem'
              />
            </div>
          </div>
            <MovieList movies={movies} title="movies you liked" type="release_date"/>
            <MovieList movies={movies} title="movies you rated rencently" type="release_date"/>
        </Layout>
    )
}