import React, {useState,useEffect} from 'react';
import Layout from '@/components/layouts/layout'
import supabase from "@/lib/supabase";
import Card from '@/components/card/card.jsx'
import Pagination from '@/components/pagination/pagination';
import Slider from '@/components/slider/slider';
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
    + '&sortBy=' + sortBy
    + '&order=' + order
    + '&pageSize=' + pageSize
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

  //changer de triage
  function sortByUpdate(value){
    if (sortBy == value)
      return;
    sortBy = value;
    window.location.replace(pageLink());
  }
  
  //changer d'ordre de triage
  function orderUpdate(){
    if (order == "desc")
      order = "asc";
    else
      order = "desc";
    window.location.replace(pageLink());
  }

  //changer les mots a rechercher
  function keywordUpdate(event){
    event.preventDefault();
    s = event.target[0].value;
    window.location.replace(pageLink());
  }

  //changer la taille des pages (en films)
  function changePageSize(newSize){
    pageSize = newSize;
    window.location.replace(pageLink());
  }

  return (
    <Layout searchBar="hidden">
      <div className="searchPage">
        <div className="searchOptions">
          <h3> Search :</h3>
          <form onSubmit={e => keywordUpdate(e)} className="searchForm" >
            <input
              type="text"
              className="searchTerm"
              placeholder="What are you looking for?"
              name="s"
              defaultValue={s}
            />
            <button type="submit">
              <svg viewBox="0 0 512 512">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </button>
          </form>
          <h3> Sort by :</h3>
          <div className="sortBySelector">
            <SortByComponent title="Sort Alphabetically" sortBy={sortBy} sortingQuery="title" callback={sortByUpdate}>
              <svg viewBox="0 0 576 512">
                <path d="M183.6 469.6C177.5 476.2 169 480 160 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L128 365.7V64c0-17.7 14.3-32 32-32s32 14.3 32 32V365.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 320c0-17.7 14.3-32 32-32H480c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9L429.3 416H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H352c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9L402.7 352H352c-17.7 0-32-14.3-32-32zM416 32c12.1 0 23.2 6.8 28.6 17.7l64 128 16 32c7.9 15.8 1.5 35-14.3 42.9s-35 1.5-42.9-14.3L460.2 224H371.8l-7.2 14.3c-7.9 15.8-27.1 22.2-42.9 14.3s-22.2-27.1-14.3-42.9l16-32 64-128C392.8 38.8 403.9 32 416 32zM395.8 176h40.4L416 135.6 395.8 176z"/>
              </svg>
            </SortByComponent>
            <SortByComponent title="Sort by Date" sortBy={sortBy} sortingQuery="release_date" callback={sortByUpdate}>
              <svg viewBox="0 0 512 512">
                <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
              </svg>
            </SortByComponent>
            <SortByComponent title="Sort by Ratings" sortBy={sortBy} sortingQuery="vote_average" callback={sortByUpdate}>
              <svg viewBox="0 0 576 512">
                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
              </svg>
            </SortByComponent>
            <SortByComponent title="Sort by Popularity" sortBy={sortBy} sortingQuery="popularity" callback={sortByUpdate}>
              <svg viewBox="0 0 448 512">
                <path d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5c-16.5-21-46-58.5-62.8-79.8c-6.3-8-18.3-8.1-24.7-.1c-33.8 42.5-50.8 69.3-50.8 99.4C112 375.4 162.6 416 225.7 416z"/>
              </svg>
            </SortByComponent>
            <OrderButton order={order} callback={orderUpdate}/>
          </div>
          <h3> Movies Per Page :</h3>

          <Slider min={4} max={40} startValue={pageSize} step={4} callback={changePageSize}/>

          <h3> Include Genres :</h3>
          <div className="genresSelector">
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
            {'Results : ' + s + ' (' + movieCount + ' films) ' + '(' + order + 'ending)'}
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

function SortByComponent({ title, sortBy, sortingQuery, callback, children }) {
  if(sortBy == sortingQuery)
    return(
      <div className="sort actif" title={title}>
        {children}
      </div>
    )
  else
    return (
      <button className="sort nonActif" title={title} onClick={() => callback(sortingQuery)}>
        {children}
      </button>
    )
}

function OrderButton({ order, callback }){
  if(order == "desc")
    return(
      <button className="order sort nonActif" title="ascending" onClick={callback}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path d="M151.6 469.6C145.5 476.2 137 480 128 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L96 365.7V64c0-17.7 14.3-32 32-32s32 14.3 32 32V365.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 480c-17.7 0-32-14.3-32-32s14.3-32 32-32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H320z"/>
        </svg>
      </button>
    )
  else
    return(
      <button className="order sort nonActif" title="descending" onClick={callback}>
        <svg viewBox="0 0 576 512">
          <path d="M151.6 42.4C145.5 35.8 137 32 128 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L96 146.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V146.3l32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 480h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32z"/>
        </svg>
      </button>
    )
}