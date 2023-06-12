import React from "react";
import '../profilePage.css';
import '../App.css';
import user_img from '../assets/user_pic.svg';
import flip from '../assets/circular-arows.png';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


function toggleModal(app) {
    app.setState({
      openModal: !app.state.openModal
    });
} 

function gotoProfile(){
    let id = localStorage.getItem("user")
    const lang = localStorage.getItem("language")
    return `/hci/teams/aquafit/profile/` + id
}


function ProfilePicture(props) {
    const [img, setImgData] = useState(user_img)
    const [imagePath, setImagePath] = useState(user_img)
    const [loggedIn, changeLogin] = useState(true)
    const [drop, toggle] = useState(false)

    const [loading, setLoading] = useState(true)
    let userId = localStorage.getItem("user")

    let [settings, changeSettings] = useState("Settings")
    let [myProfile, changeMyProfile] = useState("My Profile")
    let [logout, changeLogOut] =  useState("Logout")
    let [language, setLanguage] =  useState((localStorage.getItem("language") === "") ? "English" : "Español")
    const flipstyle = {
        width:"2vw",
        height: "2vw"
    }

    const flipdark = {
        filter:"invert(100%)",
        width:"2vw",
        height: "2vw"
    }
    // if (localStorage.getItem("language") === "espanol"){
    //     setLanguage("Espanol")
    // }


    useEffect(() => {

        if (loading == false){
            return
        }
        var url = new URL("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/file-uploads?")
        // const url2 = window.location.href;
        // const userIdFromUrl = url2.substring(url2.lastIndexOf('/') + 1);
        // console.log("user is", userId)
        
        url.searchParams.append('uploaderID', userId)
        console.log("ndjenwfjwknfr", userId)
        url.searchParams.append('attributes', JSON.stringify({path: "isProfilePic", equals: true}))
        url.searchParams.append("skip", 0)
        url.searchParams.append("take", 100)

        console.log(url.toString())
        fetch(url.toString(), {
            method: "GET",
            'Content-Type': 'application/json',
            headers:{
            "Authorization":
            `Bearer ${localStorage.getItem("token")}`
            }
        }) 
        .then((response)=>response.json())
        // .catch(error => console.error(error))
        .then((result) => {
            // console.log("result is ",result)
            // fetch(`https://webdev.cse.buffalo.edu/hci/api/api/aquafit/file-uploads/${result[0][0].id}`)
            // .then(response => response.json())
            // .then(data => {
            // console.log(data);
            if(result[1]==0){
                return
            }
            console.log(result)
            console.log("setting image to", result[0][0].path)
            setImagePath(result[0][0].path);
            setImgData((!(result[0][0].path === user_img)) ? "https://webdev.cse.buffalo.edu/" + imagePath : ""); 
            console.log(img);
            setLoading(false)
            })
        }
    )

    const [username, setUsername] = useState(localStorage.getItem("user"))

    useEffect(() => {
      changeMyProfile(localStorage.getItem("language") === "espanol" ? "Mi Perfil": "My Profile")
      changeLogOut(localStorage.getItem("language") === "espanol" ? "Cerrar sesión" : "Logout")
      changeSettings(localStorage.getItem("language") === "espanol" ? "Configuración" : "Settings")

        fetch("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/users/" + localStorage.getItem("user") , {
        method: "GET",
        // 'Content-Type': 'application/json',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token")
        }
    })
    .then(
        (result) => result.json()
    )
    .then(
        (data) => {
            setUsername(data.attributes.username)
        }
    )
    }, [])

    const getURL = () => {
        var lang = localStorage.getItem("language")

        if (!lang){
            lang = ""
        }
        const u = window.location.href
        // const u = "hci/teams/aquafit/login"
    
        const index = u.lastIndexOf("/")
        const exists  = u.lastIndexOf("espanol") 
    
        if (exists != -1 && lang === "espanol"){
          //dont change link if its the same one
          return window.location.href
        } else if (exists != -1 && lang === ""){
          //switch to the english link
          return window.location.href.replace("espanol/", "")
        } else if (exists == -1 && lang === ""){
          //dont change link if its the same one
          return window.location.href
        }
        return window.location.href
        // return u.substring(0, index) + "/espanol/" + u.substring(index + 1)
    
      }

    const handleLanguage = () => {
        var lang 
        if (language === "English"){
            lang = "espanol"
        } else {
            lang = ""
        }

        localStorage.setItem("language", lang)
        

        var url = window.location.href
        console.log(url)
        // return url

        window.location.href = url
        // props.setLang(lang)
    }
    
    const subMenu = (<ul className = "submenu">
    <li> <a href={gotoProfile()}>{myProfile}</a></li>
    <li><Link to={`/updateprofile`}>{settings}</Link></li>
    <li className = "lang-pfp" >
    <a onClick={() => handleLanguage()}> {language} </a>
    <img onClick={() => handleLanguage()} style={(localStorage.getItem("mode") === "dark") ? flipdark : flipstyle} src={flip}></img>
    </li>
    <div className = "mebold"><div onClick={props.logout_function}>{logout}</div></div>
</ul>)

    

    return (
        <ul className = "menu">
            <li>
                <button className = "circle6" onClick={() => toggle(!drop)}> 
                    <img src = {loading === true ? img : img} alt = "profile pic" id = "top-user_image"/>
                </button>
                {drop === true ? subMenu : null}
            </li>
        </ul>
    )
}


export default ProfilePicture;