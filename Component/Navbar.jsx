
import  { React, useState, useRef } from "react";
import ProfilePicture from "./ProfilePicture"
import SearchBar from "./SearchBar.jsx"
import {useEffect} from "react";
import { matchPath, useLocation } from "react-router-dom";
import {
   Link
} from 'react-router-dom';
// pull in the images for the menu items
import logo from "../assets/mylyfe_logo.png";
import lightIcon from "../assets/light_mode.svg";
import darkIcon from "../assets/Moon.svg";
import logoDARK from "../assets/mylyfe_logoDARK.png";
import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom';




/* The Navbar class provides navigation through react router links.  Note the callback
   to the parent app class in the last entry... this is an example of calling a function
   passed in via props from a parent component */
function GetRegister({heading, props}){

  if (localStorage.getItem("mode") == "dark")
  {
    const boldStyle = {
      color: "#433FEA",
      textDecoration : "none",
      fontWeight : "bolder"
    };

    const boldTitleLight = {
      fontWeight : "bolder",
      color: "#34a853"
    }
    
    const boldTitleDark = {
      fontWeight : "bolder",
      color: "#443fea"
    }
    const isLoggedIn = localStorage.getItem("loggedIn");

    console.log("lang is",localStorage.getItem("language"))

    

    if(isLoggedIn=="true" && ("espanol"===localStorage.getItem("language"))){
      return <Link to="/mygoals">Metas</Link>;
    }
    const isRegister = props.register;
    if ((!isRegister || !isLoggedIn)  && ("espanol"===localStorage.getItem("language") )){
      return <Link to="/register">Registro</Link>;
    }

    if(isLoggedIn=="true"){
      if (window.location.pathname === "/hci/teams/aquafit/mygoals") {
        if (localStorage.getItem("mode") == "light") {
          return <Link to="/feed" style={boldTitleLight}>Goals</Link>;
        }
        else {
          return <Link to="/feed" style={boldTitleDark}>Goals</Link>;
        }
      }
      else {
        return <Link to="/mygoals">Goals</Link>;
      }
    }
    if (!isRegister || !isLoggedIn){
      if (window.location.pathname === "/hci/teams/aquafit/register") {
        if (localStorage.getItem("mode") == "light") {
          return <Link to="/register" style={boldTitleLight}>Register</Link>;
        }
        else {
          return <Link to="/register" style={boldTitleDark}>Register</Link>;
        }
      }
      else {
        return <Link to="/register">Register</Link>;
      };
    }
  }
  else {
      const boldStyle = {
        color: "#34a853",
        textDecoration : "none",
        fontWeight : "bolder"
      };

      const boldTitleLight = {
        fontWeight : "bolder",
        color: "#34a853"
      }
      
      const boldTitleDark = {
        fontWeight : "bolder",
        color: "#443fea"
      }

      const isLoggedIn = localStorage.getItem("loggedIn");
      if(isLoggedIn=="true" && ("espanol"===localStorage.getItem("language"))){
        return <Link to="/mygoals">Metas</Link>;
      }
      if(isLoggedIn=="true"){
        if (window.location.pathname === "/hci/teams/aquafit/mygoals") {
          if (localStorage.getItem("mode") == "light") {
            return <Link to="/feed" style={boldTitleLight}>Goals</Link>;
          }
          else {
            return <Link to="/feed" style={boldTitleDark}>Goals</Link>;
          }
        }
        else {
          return <Link to="/mygoals">Goals</Link>;
        }
      }
      
      const isRegister = props.register;
      
      if ((!isRegister || !isLoggedIn)  && ("espanol"===localStorage.getItem("language") )){
        return <Link to="/register">Registro</Link>;
      }
      if (!isRegister || !isLoggedIn){
        if (window.location.pathname === "/hci/teams/aquafit/register") {
          if (localStorage.getItem("mode") == "light") {
            return <Link to="/register" style={boldTitleLight}>Register</Link>;
          }
          else {
            return <Link to="/register" style={boldTitleDark}>Register</Link>;
          }
        }
        else {
          return <Link to="/register">Register</Link>;
        };
      }else{
        console.log("highlighting")
        return <Link to="/register" style= {boldStyle}>
        Register
      </Link>;
      }
  }
}

function GetLogin({heading, props}){

  if (localStorage.getItem("mode") == "dark")
  {
    let boldStyle = {
      color: "#433FEA",
      textDecoration : "none",
      fontWeight : "bolder"
    };

    const boldTitleLight = {
      fontWeight : "bolder",
      color: "#34a853"
    }
    
    const boldTitleDark = {
      fontWeight : "bolder",
      color: "#443fea"
    }
    
    const isLogin = props.login;
    console.log("Hello " + props.login)
    const isLoggedIn = localStorage.getItem("loggedIn");
    console.log("IMPORTANT***** ", isLoggedIn)

    if(isLoggedIn=="true" && ("espanol"===localStorage.getItem("language"))){
      console.log("going to feed")
      return <Link to="/feed">Explorar</Link>;
    }
    if ((!isLogin || !isLoggedIn) && ("espanol" === localStorage.getItem("language") )){
      console.log("going to spanish login")
      console.log("IMPORTANT***** ", localStorage.getItem("language"))
      return <Link to="/login">Acceso</Link>;
    }
    
    if(isLoggedIn=="true"){
      console.log("going to feed")
      if (window.location.pathname === "/hci/teams/aquafit/feed") {
        if (localStorage.getItem("mode") == "light") {
          return <Link to="/feed" style={boldTitleLight}>Feed</Link>;
        }
        else {
          return <Link to="/feed" style={boldTitleDark}>Feed</Link>;
        }
      }
      else {
        return <Link to="/feed">Feed</Link>;
      }
    }
    if (!isLogin || !isLoggedIn){
      console.log("going to login")
      if (window.location.pathname === "/hci/teams/aquafit/login") {
        if (localStorage.getItem("mode") == "light") {
          return <Link to="/login" style={boldTitleLight}>Login</Link>;
        }
        else {
          return <Link to="/login" style={boldTitleDark}>Login</Link>;
        }
      }
      else {
        return <Link to="/login">Login</Link>;
      };
    }else{
      console.log("highlighting")
      return <Link to="/login" style= {boldStyle}>
      Login
    </Link>;
    }
  }
  else {
    let boldStyle = {
      color: "#34a853",
      textDecoration : "none",
      fontWeight : "bolder"
    };
    const boldTitleLight = {
      fontWeight : "bolder",
      color: "#34a853"
    }
    
    const boldTitleDark = {
      fontWeight : "bolder",
      color: "#443fea"
    }

    const isLogin = props.login;
    const isLoggedIn = localStorage.getItem("loggedIn");
    console.log("IMPORTANT***** ", ""==="espanol")

    if(isLoggedIn=="true" && ("espanol"===localStorage.getItem("language"))){
      console.log("going to feed")
      return <Link to="/feed">Explorar</Link>;
    }
    if ((!isLogin || !isLoggedIn) && ("espanol" === localStorage.getItem("language") )){
      console.log("going to spanish login")
      console.log("IMPORTANT***** ", localStorage.getItem("language"))
      return <Link to="/login">Acceso</Link>;
    }
    
    if(isLoggedIn=="true"){
      console.log("going to feed")
      if (window.location.pathname === "/hci/teams/aquafit/feed") {
        if (localStorage.getItem("mode") == "light") {
          return <Link to="/feed" style={boldTitleLight}>Feed</Link>;
        }
        else {
          return <Link to="/feed" style={boldTitleDark}>Feed</Link>;
        }
      }
      else {
        return <Link to="/feed">Feed</Link>;
      }
    }
    if (!isLogin || !isLoggedIn){
      console.log("going to login")
      if (window.location.pathname === "/hci/teams/aquafit/login") {
        if (localStorage.getItem("mode") == "light") {
          return <Link to="/login" style={boldTitleLight}>Login</Link>;
        }
        else {
          return <Link to="/login" style={boldTitleDark}>Login</Link>;
        }
      }
      else {
        return <Link to="/login">Login</Link>;
      };
    }

  }
  }


function LangDrop(props){

  const myref = useRef(null)
  const [language, setLang] = useState("")

  const [eng, setEng] = useState(window.location.href) //create a link with just the spanish page
  const [spanish, setSpanish] = useState(window.location.href) //create a link with just the spanish page

  if (localStorage.getItem("loggedIn")  === "true" ){
    return null
  }

  //needs to be called after setting ssn storage only
  // const getURL = () => {
  //   var lang = localStorage.getItem("language")
  //   if (!lang){
  //     lang = ""
  // }
  //   const u = window.location.href
  //   // const u = "hci/teams/aquafit/login"

  //   const index = u.lastIndexOf("/")
  //   const exists  = u.lastIndexOf("espanol") 

  //   if (exists != -1 && lang === "espanol"){
  //     //dont change link if its the same one
  //     return window.location.href
  //   } else if (exists != -1 && lang === ""){
  //     //switch to the english link
  //     setEng(window.location.href.replace("espanol/", ""))
  //     return window.location.href.replace("espanol/", "")
  //   } else if (exists == -1 && lang === ""){
  //     //dont change link if its the same one
  //     return window.location.href
  //   }

  //   setSpanish(u.substring(0, index) + "/espanol/" + u.substring(index + 1))
  //   return window.location.href
  //   // return u.substring(0, index) + "/espanol/" + u.substring(index + 1)

  // }


  const handleLanguage = (e) => {
    const lang = e
    console.log(lang)
    setLang(lang)
    localStorage.setItem("language", lang)
    props.setLang(lang)

    window.location.reload(false);
    // const url = getURL()
    // console.log(url)
    // return url

    // window.location.href = url
  }

  return (
    <ul className = "menu">
        <li>
            <button style={{textDecoration:"none"}} className="top-links-login"> 
                {
                // console.log("language is : ", localStorage.getItem("language"))
                (localStorage.getItem("language") == "" || !localStorage.getItem("language")) ? "Language":"Idioma"}
            </button>

            <ul className="submenu2">
          <li className="lang"> <a onClick={()=>handleLanguage("")}>English</a></li>
          <li className="lang"><a onClick={()=>handleLanguage("espanol")}>Español</a></li>
        </ul>
            
        </li>
    </ul>
)
}

function Navbar(props) {

  useEffect(() => {
    //Runs on the first render
    //And any time any dependency value changes
    changeLoggedIn(localStorage.getItem("loggedIn"))
    console.log("logged in state is ******* ", localStorage.getItem("loggedIn"))
  },[localStorage.getItem("loggedIn")]);


  if (localStorage.getItem("mode") == null)
  {
    localStorage.setItem("mode", "light");
  }
  
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
        store.style.setProperty('--nav-color', 'white');
        store.style.setProperty('--border-color', 'rgb(211,211,211,0.7)');
        store.style.setProperty('--sub-menu', '#efefef');
        store.style.setProperty('--follow-title', '#267e3d');
        store.style.setProperty('--follow-menu', '#34a853;');
      }
      else if (theme == "dark") {
          store.style.setProperty('--text-color', 'white');
          store.style.setProperty('--nav-color', '#181826');
          store.style.setProperty('--border-color', '#0f0f1a');
          store.style.setProperty('--sub-menu', '#0f0f1a');
          store.style.setProperty('--follow-title', '#B17112');
          store.style.setProperty('--follow-menu', '#D6971D');
      }
  }

  setTheme();

}, [setMode, mode]);

//setting theme through localstorage, change on click
  function darkmode() {
      var store = document.querySelector(':root');
      var value = getComputedStyle(store);

      console.log("hi")

      if (localStorage.getItem("mode") == null)
      {
        localStorage.setItem("mode", "light");
      }
      // dark mode on
      else if (localStorage.getItem("mode") == "light") {
          localStorage.setItem("mode", "dark");
          window.location.reload(true);
      }
      else {
        // off
          localStorage.setItem("mode", "light");
          window.location.reload(true);
      }
}

  const [register, changeRegister] = useState(props.register);
  const [homepage, changeHomepage] = useState(props.homepage);
  const [login, changeLogin] = useState(props.login);
  const [loggedIn, changeLoggedIn] = useState(props.loggedIn);
  const [myGoals, changeMyGoals] = useState(false);
  const [feed, changeFeed] = useState(false)
  const [theme, setdarkmode] = useState(false)
  const [language, setLang] = useState(localStorage.getItem("language")? localStorage.getItem("language") : "")

  useEffect(() => {
    //Runs on the first render
    //And any time any dependency value changes
    changeLoggedIn(localStorage.getItem("loggedIn"))
    console.log("logged in state is ******* ", localStorage.getItem("loggedIn"))
  },[localStorage.getItem("loggedIn")]);

  const location = useLocation()

  const logout = () => {
    localStorage.setItem("loggedIn", false);
    localStorage.removeItem("token");
    const lang = localStorage.getItem("language")
    window.location.href = `/hci/teams/aquafit/`
    // changeLoggedIn(false)
  }


  useEffect(() => {
    console.log("You are on this page: " + window.location.pathname)

  }, [window.location.pathname])
    

  let data = localStorage.getItem("loggedIn");
  console.log("logged in =", typeof data)
    return (

    <div id="topnav" className="topnav">
      <ul id="top-menu">

        <li id="top-menu-items" className="logo">

          <Link to="/">
          {mode == "light" &&
          <button type="button" className="logo">
          <img src={logo}
              className="nav-logo"
              alt="Branding"
              title="Logo"></img></button>}
          </Link>

          <Link to="/">
          {mode == "dark" &&
          <button type="button" className="logo">
          <img src={logoDARK}
              className="nav-logo"
              alt="Branding"
              title="Logo"></img></button>}
          </Link>
        </li>

        <li>
        {(loggedIn==="true") ?<div className = "SearchDiv">
              <SearchBar></SearchBar>
        </div>: <div className = "SearchDiv2"></div>}
        </li>
        
        <div className = "box1">
        <li>
        {mode == "light" &&<button id = "top-menu-items" onClick ={() => {darkmode(); setdarkmode(!theme)}}>
        <img src={lightIcon}
              className="mode-switch"
              id = "mode-switch"
              alt="Mode"
              title="Mode"></img>
        </button>}

        {mode == "dark" &&<button  id = "top-menu-items" onClick ={() => {darkmode(); setdarkmode(!theme)}}>
        <img src={darkIcon}
              className="mode-switch2"
              id = "mode-switch"
              alt="Mode"
              title="Mode"></img>
        </button>}
        </li>

        <li>
          <LangDrop setLang={setLang}/>
        </li>

          <li id="top-menu-items" className="top-links-reg">
            <GetRegister {...{lang: {language},heading:"Register", props:{login: login,register: register, homepage: homepage, loggedIn: loggedIn}}}  />
          </li>

          <li id="top-menu-items" className="top-links-login">
            <Link to="/login">
            <GetLogin {...{lang: {language}, heading:"Login", props:{login: login,register: register, homepage: homepage}}}  />
            </Link> 
            
          </li>


            <li>
            {(loggedIn==="true") ? <ProfilePicture logout_function={logout}  /> : <div className = "hiddencircle"></div>}
            </li>

        </div>
      </ul>
    </div>
  );
  }
export default Navbar;
