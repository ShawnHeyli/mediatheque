import React from 'react'
import supabase from "@/lib/supabase";
import Layout from '@/components/layouts/layout'
import MovieList from '@/components/movieList/movieList.jsx'
import '@/app/globals.css';
import LinksUser from '@/components/linksUser/linksUser';
import "./index.scss";


export async function getServerSideProps({ query }) {
  const { sortBy = "popularity", order = "asc", page = 1, pageSize = 20 } = query;

  const offset = (page - 1) * pageSize;

//TODO ne pas faire autant d'appel à la base de données que de liste de films sur la page d'accueil
// En cours, ne fonctionne pas:

/*
  const  movies = supabase
    .from("movies")
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
    ;

    const moviesReleaseDateData = movies.order("release_date", { ascending: order === "asc" ? false : true }).range(offset, offset + pageSize - 1);
    const moviesPopularityData = movies.order("popularity", { ascending: order === "desc" ? false : true }).range(offset, offset + pageSize - 1);
    const moviesVote_averageData = movies.order("vote_average", { ascending: order === "asc" ? false : true }).range(offset, offset + pageSize - 1);
    
    let { data: moviesVote_average, error } = await moviesVote_averageData;
    let {data: moviesPopularity}  = await moviesPopularityData;
    let { data: moviesReleaseDate } = await moviesReleaseDateData;
*/
    function moviesListGenre(genre){
        const movies = supabase
        .rpc(
          'select_movies_with_genres',
          { ids: [ genre ] },
          { count: 'exact'}
          )
        .select(
          `   
            *,
            genres ( * ),
            keywords ( * ),
            production_companies ( * ),
            production_countries ( * ),
            spoken_languages ( * ),
            reviews ( 
              id,
              title,
              note, 
              content,
              date,
              time,
              users ( * )
              )
          `
          ).order(sortBy, { ascending: order === order ? false : true })
          .range(offset, offset + pageSize - 1); 

        return movies
    }


    function moviesList(sortBy, orderBy, original_language) {
      const movies  = supabase
      .from("movies")
      .select(
      `   
        *,
        genres ( * ),
        keywords ( * ),
        production_companies ( * ),
        production_countries ( * ),
        spoken_languages ( * ),
        reviews ( 
          id,
          title,
          note, 
          content,
          date,
          time,
          users ( * )
          )
      `
      ).order(sortBy, { ascending: order === orderBy ? false : true })
      .range(offset, offset + pageSize - 1); 

      if (original_language != "*"){
        movies.eq('original_language', original_language);
      }

      return movies;
    }

    let {data: moviesPopularity, error}  = await moviesList(sortBy, "asc", "*");
    let {data: moviesVote_average}  = await moviesList("vote_average", "asc", "*");
    let {data: moviesReleaseDate}  = await moviesList("release_date", "asc", "*");
    let {data: animationMovies}  = await moviesListGenre(16);
    


  if (error) {
    console.log(error);
    return { props: { movies: [], error: error.message } };
  } else {
    return { props: { 
      moviesPopularity: moviesPopularity,
      moviesVote_average: moviesVote_average,
      moviesReleaseDate: moviesReleaseDate,
      animationMovies: animationMovies
    } };
  }
}

export default function Home({ moviesPopularity, moviesVote_average, moviesReleaseDate, animationMovies }) {
    return (
        <Layout>
          
          <div className='presentation'>
            <ul>
            <li className='titles'>
            <div className="title">
              <h1>rate your favorite movies</h1>
            </div>
            </li>
            <li className='titles'>
            <div className="title">
              <h1>look for films you don’t know</h1>
            </div>
              
            </li>
            <li className='titles'>
            <div className="title">
              <h1>add films to your collection</h1>
            </div>
              
            </li>
            </ul>
          </div>
          <MovieList movies={moviesReleaseDate} title="movies of the moment" type="release_date"/>

          <MovieList movies={moviesPopularity} title="Popular Movies" type="popularity"/>

            <LinksUser/>

            <MovieList movies={moviesVote_average} title="Best voted" type="vote_average"/>

            
            
            <MovieList movies={animationMovies} title="Best animation Movies" type="animation"/>
        </Layout>
    )
}