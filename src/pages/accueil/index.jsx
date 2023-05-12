"use client"

import React from 'react'
import Layout from '@/components/layouts/layout'
import MovieList from '@/components/movieList/movieList.jsx'

export default function Home() {
    return (
        <Layout>
            <MovieList request="popular" title="Popular Movies"/>
            <MovieList request="now_playing" title="Recent Movies"/>
        </Layout>
    )
}