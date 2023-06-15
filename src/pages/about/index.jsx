import React from "react";
import './about.scss';
import Layout from "@/components/layouts/layout";
import '@/app/globals.css';

export default function About (){
  return (
    <Layout>
      <div className="about">
        <div className="about-section">
          <h1>What about us</h1>
          <p>
            We are a team of 3 french students passionate about computer
            science. We liked developing this website as part of our end of year
            IT 3 license project at Istic of Rennes. We hope you enjoy spending
            time on our site.
          </p>
        </div>

        <h2 className="title-team">Our Team</h2>
        <div className="row">
          <div className="column">
            <div className="card">
              <img className="PP" src="/images/about/PP_LB.jpg" alt="Louis" />
              <div className="container-card">
                <h2>Louis BARBIER</h2>
                <p className="title">Student L3 IT</p>
                <p>
                  Like web development, I would like to integrate a master in
                  this field.
                </p>
                <p>louis.barbier@etudiant.univ-rennes.fr</p>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <img className="PP" src="/w3images/team2.jpg" alt="Nicolas" />
              <div className="container-card">
                <h2>Nicolas BUCHIN</h2>
                <p className="title">Student L3 IT</p>
                <p>Problem solver and AI aficionado.</p>
                <p>nicolas.buchin@etudiant.univ-rennes.fr</p>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="card">
              <img className="PP" src="/images/about/PP_HM.jpg" alt="Hilan" />
              <div className="container-card">
                <h2>Hilan MEYRAN</h2>
                <p className="title">Student L3 IT</p>
                <p>A 21 year old cybersecurity enthusiast</p>
                <p>hilanmeyran@protonmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

