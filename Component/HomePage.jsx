import React from "react";
import '../HomePage.css';
import homepageimg from "../assets/Homepage-Background.svg";
import homepageimgDARK from "../assets/Homepage-BackgroundDARK.svg";
import homepageimgM from "../assets/Homepage-BackgroundM.svg";
import logoleaf from "../assets/logoleaf.svg";
import homepageimgMDARK from "../assets/BackgroundMDARK.svg"
import logoleafDARK from "../assets/logoleafDARK.svg";
import Footer from "./Footer";
import { useEffect } from "react";
import { useState } from "react";

function HomePage(){

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
            }
            else if (theme == "dark") {
                store.style.setProperty('--text-color', 'white');
            }
        }

        setTheme();

      }, [setMode, mode]);

        return (
            <div className= "container">
                
                <div className= "text-box">
                    {mode == "light" && <img src = {logoleaf} className = "logoleaf" alt = "logo only leaf"></img>}
                    {mode == "dark" && <img src = {logoleafDARK} className = "logoleaf" alt = "logo only leaf"></img>}
                    <h1 className="title">It's your life, you decide!</h1>
                    <hr className="line2"></hr>
                    <p className="mission"> Welcome to MyLyfe! We offer a welcoming community to share and work towards your goals with others!</p>
                </div>

                {mode == "light" && <img src = {homepageimg} className="image" id = "homePage_background" alt = "backgroundIMG" />}
                {mode == "dark" && <img src = {homepageimgDARK} className="image" id = "homePage_background" alt = "backgroundIMG" />}
                {mode == "light" && <img src = {homepageimgM} className="image" id = "homePage_backgroundM" alt = "backgroundIMG"/>}
                {mode == "dark" && <img src = {homepageimgMDARK} className="image" id = "homePage_backgroundM" alt = "backgroundIMG"/>}

                <Footer/>
            </div>
        )
}

export default HomePage;


