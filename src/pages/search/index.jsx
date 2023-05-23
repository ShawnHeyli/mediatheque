import React, {useState,useEffect} from 'react';
import Layout from '@/components/layouts/layout'
import supabase from "@/lib/supabase";
import Card from '@/components/card/card.jsx'
import Pagination from '@/components/pagination/pagination';
import "./index.scss";

export async function getServerSideProps({ query }) {
  const { s = "", withgenres = "-1", withoutgenres = "-1", pageSize = 20, page = 1, sortBy = "popularity", order = "desc" } = query;
  const offset = (page - 1) * pageSize;

  let { data: movies, error, count: movieCount } = await supabase
    .rpc(
      'search_movie',
      { keyword: s , similarity: 1, withgenres: withgenres.split(','), withoutgenres: withoutgenres.split(',') },
      { count: 'exact'}
      )
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

  let { data: genres } = await supabase.from("genres").select('*');

  if (error) {
    console.log(error);
    return { props: { movies: [], error: error.message } };
  } else {
    return { props: { movies: movies, genres: genres, page: page, pageSize: pageSize, movieCount: movieCount, s: s, withgenres: withgenres.split(','), withoutgenres: withoutgenres.split(','), sortBy: sortBy, order: order } };
  }
}

export default function Home({ movies, genres, page, pageSize, movieCount, s, withgenres, withoutgenres, sortBy, order }) {
  const [cardSize, setSize] = useState(1);
  console.log(sortBy);
  console.log(order);

  useEffect(() => {
    //change la taille de la liste dynamiquement
    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  })

  //change la taille de la liste
  function updateSize() {
    setSize(Math.max(Math.min(Math.floor((window.innerWidth)/250),4), 1));
  }

  //liens vers la page
  function pageLink() {
    return '/search?s=' + s 
    + ((withgenres.length == 0 || withgenres.indexOf('-1') != -1)? '' : '&withgenres=' + withgenres.join(','))
    + ((withoutgenres.length == 0 || withoutgenres.indexOf('-1') != -1)? '' : '&withoutgenres=' + withoutgenres.join(','));
  }

  //modification des genres selectionnés
  function GenreUpdate(value, arrayName) {
    var array = (arrayName == "withgenres")? withgenres : withoutgenres;
    var index = array.indexOf(value);

    if(index != -1){
      array.splice(index, 1);
    } else {
      index = array.indexOf('-1');
      if(index != -1){
        array.splice(index, 1, value);
      } else {
        array.push(value);
      }
    }

    window.location.replace(pageLink());
  }

  return (
    <Layout>
      <div className="searchPage">
        <div className="searchOptions">
          
          <div className="searchQuery">
            <h3> Search :</h3>
          </div>

          <div className="orderSelector">
            <h3> Order by :</h3>
          </div>

          <div className="genresSelector">
            <h3> Include Genres :</h3>
            {genres.map((genre) =>
            {
              if(withgenres.some(i => i == genre.id))
                return <button key={genre.id} className="genre actif" value={genre.id} onClick={e => GenreUpdate(e.target.value, "withgenres")}>
                {genre.name}
                </button>
              else
                return <button key={genre.id} className="genre" value={genre.id} onClick={e => GenreUpdate(e.target.value, "withgenres")}>
                {genre.name}
                </button>
            })}
            <h3> Exclude Genres :</h3>
            {genres.map((genre) =>
            {
              if(withoutgenres.some(i => i == genre.id))
                return <button key={genre.id} className="genre actif" value={genre.id} onClick={e => GenreUpdate(e.target.value, "withoutgenres")}>
                {genre.name}
                </button>
              else
                return <button key={genre.id} className="genre" value={genre.id} onClick={e => GenreUpdate(e.target.value, "withoutgenres")}>
                {genre.name}
                </button>
            })}
          </div>
        </div>

        <div className="searchPages">
          <h2>
            {'Resultats : ' + s + ' (' + movieCount + ' films)'}
          </h2>
          <Pagination count={Math.ceil(movieCount/pageSize)} index={parseInt(page)} origin={pageLink}/>
          <div className="searchResults" style={{width: cardSize * 250 - 10}}>
            {movies?.map((movie)=>
              <div className="cardElement" key={movie.id} name={movie.title}>
              <Card movie={movie}/>
            </div>)}
          </div>
          <Pagination count={Math.ceil(movieCount/pageSize)} index={parseInt(page)} origin={pageLink}/>
        </div>
      </div>
    </Layout>
  )
}