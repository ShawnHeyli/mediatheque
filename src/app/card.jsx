import React from 'react'
import 'css/card.scss'

export default function Card() {
        return <article className="card">
            <div className="poster">
                <img src="https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1280x1280/products/89058/93685/Joker-2019-Final-Style-steps-Poster-buy-original-movie-posters-at-starstills__62518.1669120603.jpg?c=2"/>
            </div>
            <div className="description">
                <h3>Joker</h3>
                <div className="rating">
                    <svg viewBox="0 0 576 512"> <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                    <span> 8.5/10 </span>
                </div>
                <div className="infos">
                    <span className="reviewCount"> 150 </span>
                    <span className="hours">1</span>
                    <span className="minutes">35</span>
                    <span className="day">09</span>
                    <span className="month">05</span>
                    <span className="year">2023</span>
                </div>
                <div className="tags">
                    <span>Action</span>
                    <span>Drama</span>
                </div>
                <div className="synopsis">
                    <p>
                        La soupe aux choux est une soupe dont l’ingrédient de base est le chou. En raison de sa facilité à cultiver et de son coût relativement peu élevé, le chou entre comme ...
                    </p>
                </div>
            </div>
        </article>;
}
