#!/usr/bin/python

import pandas as pd

# Extract json from given column , convert to csv and save

# Dataset from Kaggle: https://www.kaggle.com/tmdb/tmdb-movie-metadata
# budget,genres,homepage,id,keywords,original_language,original_title,overview,popularity,production_companies,production_countries,release_date,revenue,runtime,spoken_languages,status,tagline,title,vote_average,vote_count
# 237000000,"[{""id"": 28, ""name"": ""Action""}, {""id"": 12, ""name"": ""Adventure""}, {""id"": 14, ""name"": ""Fantasy""}, {""id"": 878, ""name"": ""Science Fiction""}]",http://www.avatarmovie.com/,19995,"[{""id"": 1463, ""name"": ""culture clash""}, {""id"": 2964, ""name"": ""future""}, {""id"": 3386, ""name"": ""space war""}, {""id"": 3388, ""name"": ""space colony""}, {""id"": 3679, ""name"": ""society""}, {""id"": 3801, ""name"": ""space travel""}, {""id"": 9685, ""name"": ""futuristic""}, {""id"": 9840, ""name"": ""romance""}, {""id"": 9882, ""name"": ""space""}, {""id"": 9951, ""name"": ""alien""}, {""id"": 10148, ""name"": ""tribe""}, {""id"": 10158, ""name"": ""alien planet""}, {""id"": 10987, ""name"": ""cgi""}, {""id"": 11399, ""name"": ""marine""}, {""id"": 13065, ""name"": ""soldier""}, {""id"": 14643, ""name"": ""battle""}, {""id"": 14720, ""name"": ""love affair""}, {""id"": 165431, ""name"": ""anti war""}, {""id"": 193554, ""name"": ""power relations""}, {""id"": 206690, ""name"": ""mind and soul""}, {""id"": 209714, ""name"": ""3d""}]",en,Avatar,"In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.",150.437577,"[{""name"": ""Ingenious Film Partners"", ""id"": 289}, {""name"": ""Twentieth Century Fox Film Corporation"", ""id"": 306}, {""name"": ""Dune Entertainment"", ""id"": 444}, {""name"": ""Lightstorm Entertainment"", ""id"": 574}]","[{""iso_3166_1"": ""US"", ""name"": ""United States of America""}, {""iso_3166_1"": ""GB"", ""name"": ""United Kingdom""}]",2009-12-10,2787965087,162,"[{""iso_639_1"": ""en"", ""name"": ""English""}, {""iso_639_1"": ""es"", ""name"": ""Espa\u00f1ol""}]",Released,Enter the World of Pandora.,Avatar,7.2,11800

# Read csv
df = pd.read_csv('data/tmdb_5000_movies.csv')

# Dictionary with corresponding column names to primary keys
cols = {
    'genres': 'id',
    'keywords': 'id',
    'production_companies': 'id',
    'production_countries': 'iso_3166_1',
    'spoken_languages': 'iso_639_1'
}

for col, key in cols.items():

    # Create an empty DataFrame to store the extracted genre data
    genre_df = pd.DataFrame(columns=[key, "name"])

    # Iterate over each row in the 'genres' column
    for genres in df[col]:
        # Extract the JSON data
        genre_data = pd.read_json(genres)
        # Concatenate the data to the genre DataFrame
        genre_df = pd.concat([genre_df, genre_data], ignore_index=True)

    # Remove duplicate rows
    genre_df = genre_df.drop_duplicates()
    # Sort the DataFrame by the 'id' column
    genre_df = genre_df.sort_values(by=key)
    # Save the genre DataFrame to a CSV file
    genre_df.to_csv('data/'+ col +'.csv', index=False)