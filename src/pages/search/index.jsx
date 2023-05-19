import React, {useState,useEffect} from 'react';
import Layout from '@/components/layouts/layout'
import supabase from "@/lib/supabase";
import Card from '@/components/card/card.jsx'
import Pagination from '@/components/pagination/pagination';
import "./index.scss";

export async function getServerSideProps({ query }) {
  const { page = 1, pageSize = 20, s = "" } = query;
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
    return { props: { movies: [], page: page, s: s, error: error.message } };
  } else {
    return { props: { movies: movies, page: page, s: s } };
  }
}

export default function Home({ movies, page, s }) {
  const [cardSize, setSize] = useState(1);
  console.log(page);

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

  return (
    <Layout>
        <div className="search">
            <h2>
              {'Resultats pour : ' + s}
            </h2>
            <div className="searchResults" style={{width: cardSize * 250 - 10}}>
              {movies?.map((movie)=>
                <div className="cardElement" key={movie.id} name={movie.title}>
                  <Card movie={movie}/>
                </div>)}
            </div>
            <Pagination count={50} index={parseInt(page)} origin={'/search?s=' + s}/>
        </div>
    </Layout>
  )
}