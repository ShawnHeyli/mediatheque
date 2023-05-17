import supabase from "../../../lib/supabase";

export default async function handler(req, res) {
        const { id } = req.query;

    let { data: movie, error } = await supabase
        .from("movies")
        .select(`
            *,
            genres ( name ),
            keywords ( name ),
            production_companies ( name ),
            production_countries ( name ),
            spoken_languages ( name )
        `)
        .eq("id", id)
        .single();

    
    if (error) {
        res.status(500).json({ error: error.message });
    }
    else {
        res.status(200).json(movie);
    }
}
