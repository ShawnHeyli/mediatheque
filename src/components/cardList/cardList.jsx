import React,{useState,useEffect} from 'react'
import Card from '../card/card.jsx'
import './cardList.scss'

const API_KEY ="437c55c81dfb6a83ad6d2652bc7b2e28";
const API_TRENDING = "https://api.themoviedb.org/3/trending/movie/day?api_key=" + API_KEY;

export default function CardList() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetch(API_TRENDING)
        .then((res)=>res.json())
        .then(data=>{
          setMovies(data.results);
        })
      }, [])

    return <div className="cardList">
        {movies.map((movie)=>
            <Card id={movie.id}/>)}
    </div>
}