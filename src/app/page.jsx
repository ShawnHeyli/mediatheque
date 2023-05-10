import Image from 'next/image'
import React from 'react'
import styles from './page.module.css'

import 'css/card.scss'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.js</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      
      <div className={styles.center}>
        <article className="card">
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
        </article>

        <article className="card">
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
        </article>
        
        <article className="card">
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
        </article>

      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://beta.nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}
