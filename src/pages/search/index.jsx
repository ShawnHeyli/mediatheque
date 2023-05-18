import React from 'react';
import Layout from '@/components/layouts/layout'
import supabase from "@/lib/supabase";
import Card from '@/components/card/card.jsx'
import "./index.scss";

export async function getServerSideProps({ query }) {
  const { sortBy = "title", order = "desc", page = 1, pageSize = 20 } = query;
  const offset = (page - 1) * pageSize;

  let { data: movies, error } = await supabase
    .from("movies")
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
    .textSearch('overview', query.s)
    .order(sortBy, { ascending: order === "desc" ? false : true })
    .range(offset, offset + pageSize - 1);

  if (error) {
    console.log(error);
    return { props: { movies: [], error: error.message } };
  } else {
    return { props: { movies: movies } };
  }
}

export default function Home({ movies}) {
    return (
        <Layout>
            <div className="search">
                {movies?.length > 0 ?(
                <div className="searchResults">
                    {movies?.map((movie)=>
                        <div className="cardElement" key={movie.id} name={movie.title}>
                            <Card movie={movie}/>
                        </div>)}
                </div>
                ):(
                    <h2>No movies found</h2>
                )}
            </div>
        </Layout>
    )
}