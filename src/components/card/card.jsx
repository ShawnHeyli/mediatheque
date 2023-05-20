import React from 'react'
import '../card/card.scss'

export default function Card({ movie }) {
    const link = '/movies/' + movie.id;

    return (
    <article className="card">
        <a href={link}>
            <div className="poster">
                <img src={"/images/posters/" + movie.id + ".jpg"}/>
            </div>
        </a>
        <div className="description">
            <a href={link}>
                <div className="title">
                    {movie.title}
                </div>
            </a>
            <div className="rating">
                <svg viewBox="0 0 576 512"> 
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                </svg>
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
                <div className="overview">
                    {movie.overview}
                </div>
            </div>
        </div>
    </article>
    )
}