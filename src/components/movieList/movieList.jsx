import React,{useLayoutEffect,useState,useEffect} from 'react'
import Card from '@/components/card/card.jsx'
import './movieList.scss'

const API_KEY ="437c55c81dfb6a83ad6d2652bc7b2e28";
const API_POPULAR = "https://api.themoviedb.org/3/movie/popular?api_key=" + API_KEY;
const API_LATEST = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + API_KEY;

export default function MovieList(props) {
    const [movies, setMovies] = useState([])
    const [index, setIndex] = useState(0);
    const [cardSize, setSize] = useState(0);

    //resize la liste quand on resize la fenetre
    useLayoutEffect(() => {
      function updateSize() {
        setSize(Math.max(Math.floor((window.innerWidth-318)/250), 1));
      }
      window.addEventListener('resize', updateSize);
      updateSize();
    }, []);

    var request = "https://api.themoviedb.org/3/movie/" + props.request + "?api_key=" + API_KEY;

    //recup les films
    useEffect(() => {
      fetch(request)
      .then((res)=>res.json())
      .then(data=>{
        setMovies(data.results);
      })
    }, [])

    //change index du film
    function updateIndex(newIndex) {
      if (newIndex < 0) {
        newIndex = movies.length - cardSize;
      } else if (newIndex > movies.length - cardSize) {
        newIndex = 0;
      }
      setIndex(newIndex);
    }

    return <div className="movieList">
      <h1>
          {props.title} {index}
      </h1>
      <div className="cardList" style={{ width: cardSize*250 + 130}}>
        <div className="button" onClick={() => {updateIndex(index - 1)}}>
          <svg viewBox="0 0 320 512"> <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
        </div>

        <div className="cardBox">
          <div className="cardElements" style={{ transform: `translate(-${index * 250}px)`}}>
            {movies?.map((movie)=>
              <div className="cardElement" key={movie.id} name={movie.title} id={movie.id}><Card id={movie.id}/></div>)}
          </div>
        </div>
        
        <div className="button" onClick={() => {updateIndex(index + 1)}}>
          <svg viewBox="0 0 320 512"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>
        </div>
      </div>
    </div>
    
}
