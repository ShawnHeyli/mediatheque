import React from 'react'
import supabase from "@/lib/supabase";
import Layout from '@/components/layouts/layout'
import MovieList from '@/components/movieList/movieList.jsx'
import '@/app/globals.css';
import "./index.scss";

export async function getServerSideProps({ query }) {
  const { sortBy = "popularity", order = "asc", page = 1, pageSize = 20 } = query;

  const offset = (page - 1) * pageSize;

  let { data: movies, error } = await supabase
    .from("movies")
    .select(
      `   
        *,
        genres ( name ),
        keywords ( name ),
        production_companies ( name ),
        production_countries ( name ),
        spoken_languages ( name )
    `
    )
    .order(sortBy, { ascending: order === "desc" ? false : true })
    .range(offset, offset + pageSize - 1);

  if (error) {
    console.log(error);
    return { props: { movies: [], error: error.message } };
  } else {
    return { props: { movies: movies } };
  }
}

export default function Home({ movies }) {
    return (
        <Layout>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <MovieList movies={movies} title="Popular Movies"/>
            <a className='box-user' href="/signup">
                  <span>Join us</span>
            </a>
            <MovieList movies={movies} title="Popular Movies"/>
            <a className='box-user' href="/login">
                  <span>User space</span>
            </a>
        </Layout>
    )
}