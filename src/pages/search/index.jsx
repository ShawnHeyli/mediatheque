import React, {useState,useEffect,useRef } from 'react';
import Layout from '@/components/layouts/layout'
import supabase from "@/lib/supabase";
import Card from '@/components/card/card.jsx'
import "./index.scss";

export async function getServerSideProps({ query }) {
  const { page = 1, pageSize = 20, s } = query;
  const offset = (page - 1) * pageSize;

  let { data: movies, error } = await supabase
    .rpc('search_movie', { keyword: s })
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
    .range(offset, offset + pageSize - 1);

  if (error) {
    console.log(error);
    return { props: { movies: [], error: error.message } };
  } else {
    return { props: { movies: movies } };
  }
}

export default function Home({ movies }) {
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

  const observerTarget = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          console.log("load more data");
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  return (
    <Layout>
        <div className="search">
            {movies?.length > 0 ?(
            <div className="searchResults" style={{width: cardSize * 250 - 10}}>
                {movies?.map((movie)=>
                    <div className="cardElement" key={movie.id} name={movie.title}>
                        <Card movie={movie}/>
                    </div>)}
              <div ref={observerTarget}></div>
            </div>
            ):(
                <h2>No movies found</h2>
            )}
        </div>
    </Layout>
  )
}