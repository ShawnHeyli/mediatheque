import React from 'react'
import './pagination.scss'

export default function Pagination({ count, index, origin }) {
    var pageLinks = [];
    const pagelink = origin() + '&page=';

    if(index > 1) {
        pageLinks.push(<a key={-1} href={pagelink+ (index-1)}>prev</a>)
    }

    if(index > 3){
        pageLinks.push(<a key={1} href={pagelink + 1}>1</a>)
        if(index > 4){
            pageLinks.push(<span key={-11}>...</span>)
        }
    }

    for(var i = index-2; i <= index+2; i++){
        if(i == index){
            pageLinks.push(<span key={i} className="actif">{i}</span>)
        }else if (i > 0 && i <= count){
            pageLinks.push(<a key={i} href={pagelink + i}>{i}</a>)
        }
    }

    if(index < count - 2){
        if(index < count - 3){
            pageLinks.push(<span key={-12}>...</span>)
        }
        pageLinks.push(<a key={count} href={pagelink + count}>{count}</a>)
    }

    if(index < count) {
        pageLinks.push(<a key={-2} href={pagelink+ (index+1)}>next</a>)
    }

    if(count == 1)
        return(
            <></>
        )
    else
        return (
            <div className="pagination">
                {pageLinks}
            </div>
        )
}