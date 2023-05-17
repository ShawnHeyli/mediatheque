import React,{useState,useEffect} from 'react';
import Layout from '@/components/layouts/layout'
import Card from '@/components/card/card.jsx'
import "./index.scss";

const API_KEY ="437c55c81dfb6a83ad6d2652bc7b2e28";

export default function Home() {
    const [movies, setMovies]=useState([]);
    const noMovies = "No movies found :("

    useEffect(() => {
        const { search } = window.location;
        const query = new URLSearchParams(search).get('s');
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=` + API_KEY + `&query=${query}`)
        .then((res)=>res.json())
        .then(data=>{
        setMovies(data.results);
      })
    }, [])

    return (
        <Layout>
            {movies?.length > 0 ?(
            <div className="searchResults">
                {movies?.map((movie)=>
                    <div className="cardElement" key={movie.id} name={movie.title} id={movie.id}><Card id={movie.id}/></div>)}
            </div>
            ):(
                <h2>{noMovies}</h2>
            )}
        </Layout>
    )
}