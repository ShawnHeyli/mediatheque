import React,{useState,useEffect} from 'react';
import Layout from '@/components/layouts/layout'
import Card from '@/components/card/card.jsx'
import "./index.scss";

const API_KEY ="437c55c81dfb6a83ad6d2652bc7b2e28";

export default function Home() {
    const [movies, setMovies]=useState([]);
    const [query, setQuery]=useState('');

    //remplie par default les films avec les films populaires
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=" + API_KEY)
        .then((res)=>res.json())
        .then(data=>{
        setMovies(data.results);
      })
    }, [])

    //change les films
    function searchMovies() {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=bcc4ff10c2939665232d75d8bf0ec093&query=${query}`)
        .then((res)=>res.json())
        .then(data=>{
        setMovies(data.results);
      })
    }

    //change la recherche
    function changeQuery(e) {
        setQuery(e.target.value);
    }

    return (
        <Layout>
            <div className="search">
                <div className="searchBarBox">
                    <div className="searchBar">
                        <input type="text" class="searchTerm" placeholder="What are you looking for?" value={query} onChange={changeQuery}/>
                        <div className="button" onClick={searchMovies}>
                            <svg viewBox="0 0 512 512">
                                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="searchResults">
                    {movies?.map((movie)=>
                    <div className="cardElement" key={movie.id} name={movie.title} id={movie.id}><Card id={movie.id}/></div>)}
                </div>
            </div>
        </Layout>
    )
}