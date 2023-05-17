import supabase from "../../../lib/supabase";

export default async function handler(req, res) {

    const {sortBy = 'id', order = 'asc', page = 1, pageSize = 20} = req.query;

    const offset = (page - 1) * pageSize;

    // We get every info for a movie but this we will change later based on what is actually needed
    let { data: movies, error } = await supabase
        .from("movies")
        .select(`   
            *,
            genres ( name ),
            keywords ( name ),
            production_companies ( name ),
            production_countries ( name ),
            spoken_languages ( name )
        `)
        .order(sortBy, { ascending: order === "asc" ? true : false })
        .range(offset, offset + pageSize - 1)
    
    if (error) {
        res.status(500).json({ error: error.message });
    }
    else {
        res.status(200).json(movies);
    }
}
