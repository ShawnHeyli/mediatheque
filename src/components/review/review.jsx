import React, {useState} from 'react'
import Image from 'next/image';
import "./review.scss"

export default function Review({ content }) {
    const [showMore, setShowMore] = useState(false);
    //const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Iaculis eu non diam phasellus vestibulum lorem sed. Risus at ultrices mi tempus imperdiet. Ut etiam sit amet nisl purus in. Nullam non nisi est sit amet facilisis. Proin nibh nisl condimentum id. Urna porttitor rhoncus dolor purus non enim praesent elementum. Quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna. Suspendisse interdum consectetur libero id faucibus nisl tincidunt. Eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim. Netus et malesuada fames ac turpis egestas integer. Pellentesque id nibh tortor id aliquet lectus. Volutpat est velit egestas dui. Facilisis mauris sit amet massa vitae tortor condimentum lacinia quis. Fames ac turpis egestas sed tempus. Dui nunc mattis enim ut tellus elementum sagittis. Volutpat est velit egestas dui id ornare arcu odio. Et malesuada fames ac turpis egestas. In ante metus dictum at tempor commodo ullamcorper. Aliquet lectus proin nibh nisl condimentum id venenatis a. Urna id volutpat lacus laoreet non curabitur gravida arcu ac. Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. In hac habitasse platea dictumst quisque sagittis purus sit. Sed risus ultricies tristique nulla aliquet enim tortor at. Eget felis eget nunc lobortis mattis aliquam faucibus purus. Quis varius quam quisque id diam vel quam elementum pulvinar. Id porta nibh venenatis cras. Aliquam ut porttitor leo a diam. Enim tortor at auctor urna nunc id cursus metus. Sed turpis tincidunt id aliquet. Sit amet nisl purus in mollis nunc sed. Sed pulvinar proin gravida hendrerit. Pharetra convallis posuere morbi leo. Felis bibendum ut tristique et egestas. Euismod nisi porta lorem mollis aliquam ut porttitor. Orci sagittis eu volutpat odio facilisis mauris sit amet massa. A diam sollicitudin tempor id eu nisl nunc mi ipsum. Massa vitae tortor condimentum lacinia quis. Sed viverra tellus in hac habitasse. Sit amet porttitor eget dolor morbi non arcu risus. Sed cras ornare arcu dui vivamus arcu. Fringilla urna porttitor rhoncus dolor purus non enim. Rutrum tellus pellentesque eu tincidunt. Quam pellentesque nec nam aliquam sem et tortor consequat. Justo nec ultrices dui sapien eget mi proin sed libero. Ut tellus elementum sagittis vitae et leo duis ut diam. Venenatis lectus magna fringilla urna porttitor rhoncus. Semper auctor neque vitae tempus quam pellentesque nec nam. Porttitor massa id neque aliquam vestibulum morbi. Ac felis donec et odio pellentesque diam volutpat commodo. Venenatis a condimentum vitae sapien. Consequat id porta nibh venenatis cras sed felis eget velit. Amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus et. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae. Tellus in metus vulputate eu. Sed augue lacus viverra vitae congue eu consequat. Vitae congue eu consequat ac felis donec. Faucibus turpis in eu mi bibendum neque egestas congue. Luctus venenatis lectus magna fringilla urna porttitor rhoncus. Placerat in egestas erat imperdiet sed euismod nisi porta lorem. Bibendum est ultricies integer quis auctor elit sed vulputate. Ullamcorper malesuada proin libero nunc. Ultricies integer quis auctor elit. Nullam vehicula ipsum a arcu cursus vitae congue. Vel facilisis volutpat est velit egestas dui id ornare arcu. Eget magna fermentum iaculis eu non diam phasellus. At lectus urna duis convallis. Et ligula ullamcorper malesuada proin libero nunc consequat interdum. Velit aliquet sagittis id consectetur purus ut faucibus pulvinar. Et ligula ullamcorper malesuada proin. Urna nunc id cursus metus. Sit amet dictum sit amet justo donec. Ac ut consequat semper viverra nam libero justo. Ultrices dui sapien eget mi proin. fin du lorem';
    //const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Iaculis eu non diam phasellus vestibulum lorem sed. Risus at ultrices mi tempus imperdiet. Ut etiam sit amet nisl purus in.';

    var reviewContent = [];

    if(content.length < 500){
        reviewContent.push(
            <div className="content">
                <p>
                    {content}
                </p>
            </div>
        );
    } else {
        reviewContent.push(
            <div className="content" style={{height: showMore? "100%" : "110px"}}>
                <p>
                    {content}
                </p>
            </div>
        );
        reviewContent.push(
            <div className="more">
                {showMore ? "" : "..."}
            </div>
        );
        reviewContent.push(
            <button className="showMore" onClick={() => setShowMore(!showMore)}>
                {showMore ? "Show less" : "Show more"}
            </button>
        );
    }

    return (
    <article className="review">
        <div className="infoBox">
            <div className="profilePicture">
                <Image
                src={"/images/login/background.jpg"}
                alt="profile picture"
                width={60}
                height={60}
                />
            </div>
            <div className="note">
                <svg viewBox="0 0 576 512"> 
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                </svg>
                <span> 8.5/10 </span>
            </div>
            <div className="rank">
                Moderator
            </div>
        </div>

        <div className="reviewBox">
            <h3 className="pseudo">
                Pseudo
            </h3>
            <h2 className="title">
                Review Title
            </h2>
            {reviewContent}
            <div className="infos">
                <div className="date">
                    The 11-11-2011
                </div>
            </div>
        </div>

    </article>
    )
}