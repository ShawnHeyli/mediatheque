import React from 'react'
import './pagination.scss'

export default function Pagination({ count, index, origin }) {
    var pageLinks = [];
    const pagelink = origin + '&page=';

    if(index > 1) {
        pageLinks.push(<a href={pagelink+ (index-1)}>prev</a>)
    }

    if(index > 3){
        pageLinks.push(<a href={pagelink + 1}>1</a>)
        if(index > 4){
            pageLinks.push(<span>...</span>)
        }
    }

    for(var i = index-2; i <= index+2; i++){
        if(i == index){
            pageLinks.push(<span className="actif">{i}</span>)
        }else if (i > 0 && i <= count){
            pageLinks.push(<a href={pagelink + i}>{i}</a>)
        }
    }

    if(index < count - 2){
        if(index < count - 3){
            pageLinks.push(<span>...</span>)
        }
        pageLinks.push(<a href={pagelink + count}>{count}</a>)
    }

    if(index < count - 1) {
        pageLinks.push(<a href={pagelink+ (index+1)}>next</a>)
    }

    return (
        <div className="pagination">
            {pageLinks}
        </div>
    )
}