import React from 'react'
import Image from 'next/image';
import '../card/card.scss'

export default function Card({ movie, type }) {
    const link = '/movies/' + movie.id;
    const poster = `https://dhnmuopflbpxbpisgvmk.supabase.co/storage/v1/object/public/posters/${movie.id}.jpg`

    let linkFromAccueil = "";

      if(type == "vote_average"){
        linkFromAccueil = "&sortBy=vote_average";
      }else if(type == "release_date"){
        linkFromAccueil = "&sortBy=release_date";
      }else if(type == "animation"){
        linkFromAccueil = ",16";
      }

    function getVoteAverage(reviews){
        var total = 0;
  
        for(var i = 0 ; i < reviews.length ; i++){
            total += reviews[i].note
        }
  
        return total/reviews.length;
    }


    return (
    <article className="card">
        <a href={link} className="poster">
            <Image
            src={poster}
            alt={movie.title}
            width={240}
            height={360}
            />
        </a>
        <div className="description">
            <a href={link} className="title">
                {movie.title}
            </a>
            <div className="rating">
                <svg className="vote" viewBox="0 0 576 512">
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                </svg>
                <span className="note"> {Number((movie.vote_average)?.toFixed(1))}/10 </span>
                {movie.reviews.length > 0 && (
                    <>
                    <svg className="reviews" viewBox="0 0 576 512">
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                    </svg>
                    <span className="note"> {Number((getVoteAverage(movie.reviews))?.toFixed(1))}/10 </span>
                    </>
                )
                }
            </div>
            <div className="infos">
                {movie.vote_count +' | ' + Math.floor(movie.runtime/60) + 'h' + ("0" + (movie.runtime%60)).slice(-2) + 'mins | ' + movie.release_date}
            </div>
            <div className="genres">
                {movie.genres?.map((genre, index)=>
                    <a key={index} href={'/search?s=&withgenres=' + genre.id + linkFromAccueil} className="genre">{genre.name}</a>)}
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