import React from "react";
import '../styleGuide.css';
import write from '../assets/write.svg';
import logo from '../assets/logo.svg';
import logoDARK from '../assets/mylyfe_logoDARK.svg';
import colorsDARK from '../assets/colorsDARK.svg';
import colors from '../assets/colors.svg';
import typeface from '../assets/typeface.svg';
import bestcombos from '../assets/bestcombos.svg';
import bestcombosDARK from '../assets/best combosDARK.svg';
import buttons from '../assets/button-graphics.svg';
import popup from '../assets/popup.svg';
import feedback from '../assets/feedback.svg';
import layout from '../assets/layout.svg';
import help from '../assets/inline-help.svg';
import Footer from "./Footer";
import { useEffect } from "react";
import { useState } from "react";

function StyleGuide() {

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
          store.style.setProperty('--background-color', 'white');
          store.style.setProperty('--button-color', '#efefef');
          store.style.setProperty('--button-hover', '#c2c2c2');
        }
        else if (theme == "dark") {
            store.style.setProperty('--text-color', 'white');
            store.style.setProperty('--background-color', '#181826');
            store.style.setProperty('--button-color', '#0f0f1a');
            store.style.setProperty('--button-hover', '#070722');
        }
    }

    setTheme();

  }, [setMode, mode]);

        return (
            <div className = "body2">

                <input className = "hideme" type = "text" value = "@import url(https://fonts.googleapis.com/css2?family=Poppins:wght@300;500&display=swap);" id = "myInput"></input>

                <div className = "info">

                    {mode == "light" && <h4>Light Theme</h4>}
                    {mode == "dark" && <h4>Dark Theme</h4>}
                    <br></br>
                    <h4>This is</h4>
                    {mode == "light" && <img src = {logo} className = "logo2" alt = "mylyfe logo" id = "logo2"/>}
                    {mode == "dark" && <img src = {logoDARK} className = "logo2" alt = "mylyfe logo" id = "logo2"/>}
                    
                    <div className = "row">
                        <div className = "new-topic">
                            <h4>
                                Font Guide
                            </h4>

                            <h2>
                                Poppins Light should be used for long sections of text and buttons. The size should be 2.2vmin.
                                Poppins Medium should be used for titles. The size should be 4.5vmin.
                            </h2>

                            <h2>
                                <br></br>
                                The only font used is 'Poppins', 
                                be sure to include it at the top 
                                of your css file. Click the button 
                                below to copy the import.
                            </h2>

                            <button className = "example-button" value = "example-button" id = "example-button" onClick = {copyImportFunction}>
                                    <img src = {write} alt = "example-button" id = "buttonex"/>
                                    <h1>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;Copy</h1>
                            </button>
                        </div>

                        <div className = "new-topic">
                            
                            <img src = {typeface} className = "typeface" alt = "typefaces" id = "typeface"/>
                            
                        </div>
                    </div>



                    <div className = "row">
                        <div className = "new-topic">
                            {mode ==  "light" && <img src = {colors} className = "colors" alt = "our colors" id = "colors"/>}
                            {mode ==  "dark" && <img src = {colorsDARK} className = "colors" alt = "our colors" id = "colors"/>}
                        </div>

                        <div className = "new-topic">
                            <h4>
                                Color Guide
                            </h4>

                            {mode == "light" && <h2>
                                These are our main colors with their corresponding color code. #FFFFFF 
                                should be used for the background and can be used for text on dark backgrounds.
                                #C2C2C2 should be used for hover effects on color #EFEFEF buttons. 
                                #EFEFEF should be used for text boxes and buttons on non-white backgrounds.
                                #000000 should be used for most text. #929292 should be used in text boxes and
                                for text in input fields. #34A853 should be used for backgrounds, 
                                buttons, and slide-out menus. #2B7F41 should be used for hover effects on
                                color #34A853 buttons and in slide-out menus.
                            </h2>}
                            {mode == "dark" && <h2>
                                These are our main colors with their corresponding color code. #181826 
                                should be used for the background and can be used for text on light backgrounds.
                                #EFEFEF should be used for text boxes. #433FEA should be used for buttons and in backgrounds.
                                #FFFFFF should be used for most text. #929292 should be used in text boxes and
                                for text in input fields. #D6971D should be used in backgrounds
                                and slide-out menus. #B17112 should be used in slide-out menus.
                            </h2>}
                        </div>
                    </div>



                    <div className = "row">
                        <div className = "new-topic">
                            
                            <h4>
                                Color Combination Guide
                            </h4>

                            <h2>
                                The first 
                                combination should be used for backgrounds. The second combination
                                should be used for slide-out menus, for example the following menu. The third combination 
                                should also be used for backgrounds, with the white being the text. The fourth combination should be used for most buttons.
                            </h2>
                        </div>

                        <div className = "new-topic">
                            {mode == "light" && <img src = {bestcombos} className = "bestcombos" alt = "best combos" id = "bestcombos"/>}
                            {mode == "dark" && <img src = {bestcombosDARK} className = "bestcombos" alt = "best combos" id = "bestcombos"/>}
                        </div>
                    </div>



                    <div className = "row">
                        <div className = "new-topic">
                                <img src = {popup} className = "popup" alt = "popup example" id = "popup"/>
                        </div>

                        <div className = "new-topic">

                            <h4>
                                Popup Guide
                            </h4>

                            <h2>
                                Popups should be centered in the middle of the page.
                                The background of the page behind the popup should be darkened to 50%.
                                Popups should have a max width of 60% and a max height of 70%.
                                Popups can be closed by clicking the "X" in the upper right corner.
                            </h2>
                        </div>

                    </div>



                    <div className = "row">

                        <div className = "new-topic">
                            <h4>
                                Feedback Guide
                            </h4>

                            <h2>
                                Negative feedback uses the color #EA4335 (red).
                                Examples of negative feedback are invalid passwords 
                                and login attempts.
                                Positive feedback uses the color #34A853 (green).
                                Examples of positive feedback are successful account
                                creations and logins.
                                Certain feedback, like the one on the profile page, will disappear after 2 seconds.
                                You can find the images in the assets folder.
                            </h2>
                        </div>

                        <div className = "new-topic">
                            <img src = {feedback} className = "feedback" alt = "feedback guide" id = "feedback"/>
                        </div>
                    </div>



                    <div className = "row">
                        <div className = "new-topic">
                        <img src = {buttons} className = "buttons" alt = "button graphics" id = "buttons"/>
                        </div>

                        <div className = "new-topic">
                            <h4>
                                <br></br>
                                Button Guide
                            </h4>

                            {mode == "light" &&<h2>
                                You can find the images in the assets folder.
                                Buttons (not including the nav bar and footer buttons)
                                should have the following properties 
                                (inspect the button to view the properties) and 
                                if possible, a related image on the left side.
                                <br></br>
                                If the button is on a non-white background, use 
                                the following background color: #FFFFFF and 
                                the following hover effect color: #EFEFEF
                                <br></br>
                                You could also use following background color: #34A853
                                and the following hover effect color: #2B7F41
                            </h2>}

                            {mode == "dark" &&<h2>
                                You can find the images in the assets folder.
                                Buttons (not including the nav bar and footer buttons)
                                should have the following properties 
                                (inspect the button to view the properties) and 
                                if possible, a related image on the left side.
                                <br></br>
                                If the button is on a non-white background, use 
                                the following background color: #0F0F1A; and 
                                the following hover effect color: #070722;
                                <br></br>
                                You could also use following background color: #443FEA;
                                and the following hover effect color: #2825A0;
                            </h2>}

                            <button className = "example-button" value = "example-button" id = "example-button">
                                <img src = {write} alt = "example-button" id = "buttonex"/>
                                <h1>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;Example</h1>
                            </button>
                        </div>
                    </div>


                    <div className = "row">

                        <div className = "new-topic">
                            <h4>
                                <br></br>
                                Layout Guide
                            </h4>

                            <h2>
                                The nav bar will appear on the top of the page. The width is 
                                100%, and the height is 8vh, so you will need to include a margin-top: 8vh;
                                <br></br>
                                The logo is in the upper left corner, and the main page buttons on the upper right 
                                side. Any optional page buttons will appear on the footer, such as the About us page.
                            </h2>
                        </div>

                        <div className = "new-topic">
                            <img src = {layout} className = "layout" alt = "layout for goal" id = "layout"/>
                        </div>
                    </div>



                    <div className = "row">

                        
                        <div className = "new-topic">
                            <img src = {help} className = "help" alt = "inline help" id = "help"/>
                        </div>

                        <div className = "new-topic">
                            <h4>
                                <br></br>
                                Inline Help Guide
                            </h4>

                            <h2>
                                Inline help will appear for first time users of the site.
                                They will have an option to "Skip" in the bottom right corner.
                                The background will blur, the only non-blurred items being the 
                                help box and item being explained.
                            </h2>
                        </div>

                    </div>
                    
                </div>
                <Footer />
            </div>
        )
}

function copyImportFunction() {

  var copyText = document.getElementById("myInput");

  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  navigator.clipboard.writeText(copyText.value);

  alert("Copied the text: " + copyText.value);
}

export default StyleGuide;