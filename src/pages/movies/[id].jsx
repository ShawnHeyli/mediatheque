import React from 'react';
import Layout from '@/components/layouts/layout'
import supabase from "@/lib/supabase";
import "./[id].scss"

export async function getServerSideProps({ query }) {
  const { id = 155} = query;

  let { data: movie, error } = await supabase
    .from("movies")
    .select(`
        *,
        genres ( name ),
        keywords ( name ),
        production_companies ( name ),
        production_countries ( name ),
        spoken_languages ( name )
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    return { props: { movie: [], error: error.message } };
  } else {
    return { props: { movie: movie } };
  }
}

export default function Home({ movie }) {
  function datePropre(date) {
    return date.substring(8,10) + ' ' + monthWriten(date.substring(5,7)) +' ' + date.substring(0,4)
  }

  function monthWriten(month) {
    switch (month) {
      case '01': return 'Janvier'
      case '02': return 'Février'
      case '03': return 'Mars'
      case '04': return 'Avril'
      case '05': return 'Mai'
      case '06': return 'Juin'
      case '07': return 'Juillet'
      case '08': return 'Août'
      case '09': return 'Septembre'
      case '10': return 'Octobre'
      case '11': return 'Novombre'
      default: return 'Décembre'
    }
  }

  return (
    <Layout>
      <div className="presentation">
        <div className="primary">
          <img src="https://static.posters.cz/image/1300/affiches-et-posters/the-batman-2022-i122127.jpg"/>

          <div className="mainDescription">
            <h1>{movie.title}</h1>
            <h2>{movie.release_date.substring(0,4)}</h2>
            <h3>Réaliser par quelqu'un</h3>
            <h3>Durée de {Math.floor(movie.runtime/60)} h {("0" + (movie.runtime%60)).slice(-2)} mins</h3>
            <h3>Sortie le {datePropre(movie.release_date)}</h3>
            <h4>Production : {movie.production_companies.map((company, index) => (index != 0)? ', ' + company.name : company.name)}.</h4>
          </div>
        </div>
        
        <div className="secondary">
          <div className="rating">
              <svg viewBox="0 0 576 512"> 
                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
              </svg>
              <h2> {Number((movie.vote_average)?.toFixed(1))}/10 ({movie.vote_count})</h2>
          </div>
          <div className="infos">
            <h3>Genres : {movie.genres.map((genre, index) => (index != 0)? ', ' + genre.name : genre.name)}.</h3>
            <h3>Titre original : {movie.original_title}</h3>
            <h3>Pays d'origine : {movie.original_language}</h3>
            <h3>Budget : {movie.budget}</h3>
          </div>
        </div>

        <div className="synopsis">
          <h1>Synopsis : </h1>
          <h3>
            {movie.overview}
          </h3>
        </div>

      </div>
    </Layout>
  )
}