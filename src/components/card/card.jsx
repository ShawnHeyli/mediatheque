import React,{useState,useEffect} from 'react'
import './card.scss'

const API_KEY ="437c55c81dfb6a83ad6d2652bc7b2e28";
const API_IMG="https://image.tmdb.org/t/p/w500/";

export default function Card({id}) {
    const [movie, setMovie] = useState([])

    //recup le film
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/" + id + "?api_key=" + API_KEY)
        .then((res)=>res.json())
        .then(data=>{
          setMovie(data);
        })
      }, [])

    return (
    <article className="card">
        <div className="poster">
            <img src={API_IMG + movie.poster_path}/>
        </div>
        <div className="description">
            <div className="title">
                {movie.title}
            </div>
            <div className="rating">
                <svg viewBox="0 0 576 512"> <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                <span> {Number((movie.vote_average)?.toFixed(1))}/10 </span>
            </div>
            <div className="infos">
                <span className="reviewCount">{movie.vote_count}</span>
                <span className="hours">{Math.floor(movie.runtime/60)}</span>
                <span className="minutes">{("0" + (movie.runtime%60)).slice(-2)}</span>
                <span className="date">{movie.release_date}</span>
            </div>
            <div className="tags">
                {movie.genres?.map((genre)=>
                    <div className="tag" key={genre.id}>{genre.name}</div>)}
            </div>
            <div className="synopsis">
                {movie.overview}
            </div>
        </div>
    </article>
    )
}