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
          
          <div className='presentation'>
            <ul>
            <li>
            <div classname="title">
              <h1>rate your favorite movies</h1>
            </div>
            </li>
            <li>
            <div classname="title">
              <h1>look for films you don’t know</h1>
            </div>
              
            </li>
            <li>
            <div classname="title">
              <h1>add films to your collection</h1>
            </div>
              
            </li>
            </ul>
          </div>
            
            <MovieList movies={movies} title="Popular Movies"/>
            <ul>
              <li>
                <a className='box-user' href="/signup">
                  <span>Join us</span>
              </a>
            </li>
              <li>
              <a className='box-user' href="/login">
                  <span>User space</span>
              </a>
              </li>
            </ul>
            
            
            <MovieList movies={movies} title="Popular Movies"/>
            <MovieList movies={movies} title="Popular Movies"/>
            <MovieList movies={movies} title="Popular Movies"/>
        </Layout>
    )
}