import React from "react";
import './about.scss';
import Layout from "@/components/layouts/layout";
import '@/app/globals.css';

export default function About (){
  return (
    <Layout>

        <div className="about-section">
        <h1>About Us Page</h1>
        <p>Some text about who we are and what we do.</p>
        <p>Resize the browser window to see that this page is responsive by the way.</p>
        </div>

        <h2 className="title-team">Our Team</h2>
        <div className="row">
        <div className="column">
            <div className="card">
            <img className="PP" src="/images" alt="Louis"/>
            <div className="container">
                <h2>Louis BARBIER</h2>
                <p className="title">Student L3 IT</p>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p>jane@example.com</p>
            </div>
            </div>
        </div>

        <div className="column">
            <div className="card">
            <img className="PP" src="/w3images/team2.jpg" alt="Nicolas"/>
            <div className="container">
                <h2>Nicolas BUCHIN</h2>
                <p className="title">Student L3 IT</p>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p>mike@example.com</p>
            </div>
            </div>
        </div>
        
        <div className="column">
            <div className="card">
            <img className="PP" src="/w3images/team3.jpg" alt="Hilan"/>
            <div className="container">
                <h2>Hilan MEYRAN</h2>
                <p className="title">Student L3 IT</p>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p>john@example.com</p>
            </div>
            </div>
        </div>
        </div>

            </Layout>
  )
}

