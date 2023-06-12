import React from "react";
import '../aboutUs.css';
import '../App.css';
import aboutusimgM from "../assets/BackgroundM.svg";
import Footer from "./Footer";
import aboutusimg from "../assets/Aboutus-Background.svg";
import jelly from "../assets/jelly.svg";
import andrew from "../assets/andrew.svg";
import mokshita from "../assets/mokshita.svg";
import shafin from "../assets/shafin.svg";
import muhtasim from "../assets/muhtasim.svg";
import aboutusimgDARK from "../assets/Aboutus-BackgroundDARK.svg";
import { useEffect, useState } from "react";
import backgroundMDARK from "../assets/BackgroundMODARK.svg";

function AboutUs() {

    const [mode, setMode] = useState("");


    useEffect(() => {
  
    function setTheme() {
        const theme = localStorage.getItem('mode')
        var store = document.querySelector(':root');
        var value = getComputedStyle(store);
        if (theme) {
            setMode(theme)
        }
        console.log("hey it's", theme, "in here")
  
        if (theme == "light") {
          store.style.setProperty('--text-color', 'black');
          store.style.setProperty('--circle-border', 'white');
        }
        else if (theme == "dark") {
            store.style.setProperty('--text-color', 'white');
            store.style.setProperty('--circle-border', '#181826');
        }
    }
  
    setTheme();
  
  }, [setMode, mode]);

        return (

            <div className = "body">
                <h1 className = "head">Meet the developers!</h1>
                <h2>We appreciate your support!</h2>
                <div className = "rows-profile">

                    <div className = "circle3">
                        <a href = "https://webdev.cse.buffalo.edu/hci/teams/aquafit/taylor/taylor.html">
                        <img src = {jelly} alt = "profile pic" id = "user_image"/>
                        <h2>Taylor Evans</h2>
                        </a>
                    </div>

                    <div className = "circle4">
                        <a href = "https://webdev.cse.buffalo.edu/hci/teams/aquafit/Shafin/shafin.html">
                        <img src = {shafin} alt = "profile pic" id = "user_image"/>
                        <h2>Shafin Ahmad</h2>
                        </a>
                    </div>

                    <div className = "circle3">
                        <a href = "https://webdev.cse.buffalo.edu/hci/teams/aquafit/andrew/andrew.html">
                        <img src = {andrew} alt = "profile pic" id = "user_image"/>
                        <h2>Andrew Cao</h2>
                        </a>
                    </div>

                    <div className = "circle4">
                        <a href = "https://webdev.cse.buffalo.edu/hci/teams/aquafit/mokshita/mokshita.html">
                        <img src = {mokshita} alt = "profile pic" id = "user_image"/>
                        <h2>Mokshita Gupta</h2>
                        </a>
                    </div>

                    <div className = "circle3">
                        <a href = "https://webdev.cse.buffalo.edu/hci/teams/aquafit/muhtasim/muhtasim.html">
                        <img src = {muhtasim} alt = "profile pic" id = "user_image"/>
                        <h2>Muhtasim Mushfiq</h2>
                        </a>
                    </div>

                </div>

                {mode == "dark" && <img src = {aboutusimgDARK} className="about-image" id = "about-background" alt = "About us Background"/>}
                {mode == "light" && <img src = {aboutusimg} className="about-image" id = "about-background" alt = "About us Background"/>}
                {mode == "dark" && <img src= {backgroundMDARK} alt="background" className='backgroundM'/>}
                {mode == "light" && <img src = {aboutusimgM} className="about-imageM" id = "about-backgroundM" alt = "About us Background"/>}
                <Footer/>
            </div>
        )
}

export default AboutUs;