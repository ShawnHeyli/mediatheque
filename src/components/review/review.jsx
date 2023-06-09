import React, { useState } from "react";
import "./review.scss";
import Avatar from "../avatar/Avatar";
import Card from "../card/card";

export default function Review({ review, account, movie }) {
  const [showMore, setShowMore] = useState(false);
  var reviewContent = [];
  var reviewStars = [];
  
  const user = review.users;
  

  if (review.content.length < 500) {
    reviewContent.push(
      <div key={0} className="content">
        <p>{review.content}</p>
      </div>
    );
  } else {
    reviewContent.push(
      <div
        key={1}
        className="content"
        style={{ height: showMore ? "100%" : "110px" }}
      >
        <p>{review.content}</p>
      </div>
    );
    reviewContent.push(
      <div key={2} className="more">
        {showMore ? "" : "..."}
      </div>
    );
    reviewContent.push(
      <button
        key={3}
        className="showMore"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? "Show less" : "Show more"}
      </button>
    );
  }

  for (var i = 1; i <= 10; i++) {
    reviewStars.push(
      <svg
        key={i}
        className={"star" + (i <= review.note ? " filled" : "")}
        viewBox="0 0 576 512"
      >
        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
      </svg>
    );
  }

  return (
    <article className="review">
      
      {account ? (
          <div className="infoBox">
          <Card movie={movie}/>
        </div>
        
        ) : (
            <div className="infoBox">
          <div className="profilePicture">
            <Avatar user_id={user.id} height={60} width={60} />
          </div>
          <div className="user">
          
        </div>
          <h3 className="pseudo">{user.metadata.pseudo}</h3>
        </div>
        )}
      
      <div className="reviewBox">
        <h2 className="title">{review.title}</h2>
        <div className="note">{reviewStars}</div>
        {reviewContent}
        <div className="infos">
          {`Written the ${review.date} at ${review.time}`}
        </div>
      </div>
    </article>
  );
}
