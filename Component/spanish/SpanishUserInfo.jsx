import React, {useEffect, useState} from "react";
import '../../profilePage.css';
import '../../App.css';
//import UpdateProfile from "../Component/UpdateProfile.jsx"
import user_img from '../../assets/user_pic.svg';
import bio_img from '../../assets/bio.png';
import edit from '../../assets/customize.png';
import { useParams } from "react-router-dom";
import { func } from "prop-types";



function findUser(setUserData, userId){
    fetch("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/users/" + userId , {
      method: "GET",
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
            if (typeof data.id !== "undefined") {
                console.log("Hello data here: " + JSON.stringify(data))
                setUserData(data.attributes)
            }
        }
    )
}


function ProfilePicture(props){
    const [img, setImgData] = useState(user_img)
    const [imagePath, setImagePath] = useState(user_img)

    const [editing, setEditing] = useState(false)
    var url = new URL("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/file-uploads?")
    // const url2 = window.location.href;
    // const userIdFromUrl = url2.substring(url2.lastIndexOf('/') + 1);
    console.log("user is", props.userId)

    const handleEdit = () => {
        setEditing(true)
        window.location.href = `/hci/teams/aquafit/updateprofile/`;
    }


    url.searchParams.append('uploaderID', props.userId)
    url.searchParams.append('attributes', JSON.stringify({path: "isProfilePic", equals: true}))
    url.searchParams.append("skip", 0)
    url.searchParams.append("take", 100)

    useEffect(() => {

        fetch(url.toString(), {
            method: "GET",
            headers:{
            "Authorization":
            `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((response)=>response.json())
        // .catch(error => console.error(error))
        .then((result) => {
            console.log("result is ",result)
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
            setImgData("https://webdev.cse.buffalo.edu/" + imagePath); {
            console.log(img);
            }})

    })

    

    return (
        <img src = {img} alt = "profile pic" id = "user_image"/>
    )

}

export default function SpanishUserInfo(props) {

    const params = useParams()
    const [userId, setID] = useState(props.uploaderID)
    
    const bioPlaceholder = (
        <p1 className="user-bio">¡Establece tu biografía <a href={`/hci/teams/aquafit/updateprofile/`}> <b3>aqui</b3></a>! </p1>
    )


   
    console.log("INPUTS",userId, localStorage.getItem("user"))
    // const [uploaderID, setUploaderID] = useState(props.uploaderID)
    const [img, setImgData] = useState(user_img)
    const [imagePath, setImagePath] = useState(user_img)
    const [editing, setEditing] = useState(false)
    const [username, setUsername] = useState(userId)
    const [bio, setBio] = useState(bioPlaceholder)
    const [hasBio, putBio] = useState(false)
    const [userData, setUserData] = useState(null)
    const [mode, setMode] = useState(true);

    const handleEdit = () => {
        setEditing(true)
        window.location.href = "/hci/teams/aquafit/updateprofile/";
    }
    

    useEffect(() => {
        if (props.mode === false) {
            setMode(false);
        }
        if (userData === null) {
            findUser(setUserData, userId)
        }
        console.log("your user data " + JSON.stringify(userData))
        if (userData !== null) {
            if ("username" in userData) {
                if (userData.username === "") {
                    setUsername(userId)
                }
                else {
                    setUsername(userData.username)
                }
            }
            if ("bio" in userData && userData.bio != ""){
                console.log("bio is", userData.bio)
                const bioBody = <p1 className="user-bio">{userData.bio}</p1>
                setBio(bioBody)
                putBio(true)
            }
        }
    }, [userData])

        
        
    // const userName = localStorage.getItem("user")
    

    // })

    function getValue(value) {
        return value < 50 ? 50 : Math.ceil(value / 50) * 50;
    }
  
    function getLevel(value) {
        if (value <= 0) {
          return 0;
        } else {
          return Math.floor(value / 50);
        }
      }

    // async function add(p) {
    //     await fetch("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/users/" + userId,{
    //         method: "PATCH",
    //         headers:{
    //         "Authorization":`Bearer ${localStorage.getItem("token")}`,
    //         'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //         attributes: {
    //             username: username,
    //             points: Points + p,
    //             lastLogged: currentDate.toLocaleString()
    //         }
    //         })
    //     })
    // }
        
    // async function handlePoints() {
    //     if (typeof Points == "undefined") {
    //         fetch("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/users/"+userId,{
    //             method: "PATCH",
    //             headers:{
    //             "Authorization":`Bearer ${localStorage.getItem("token")}`,
    //             'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //               attributes: {
    //                 username: username,
    //                 points: 0
    //               }
    //             })
    //         })
    //     } 
        
    //     else {
    //         if (props.ismyprofile) {
    //             if (loggedDate !== null) {
    //                 if (typeof loggedDate === "undefined") {
    //                     fetch("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/users/" + userId,{
    //                         method: "PATCH",
    //                         headers:{
    //                         "Authorization":`Bearer ${localStorage.getItem("token")}`,
    //                         'Content-Type': 'application/json',
    //                         },
    //                         body: JSON.stringify({
    //                         attributes: {
    //                             username: username,
    //                             points: Points,
    //                             lastLogged: currentDate.toLocaleString()
    //                         }
    //                         })
    //                     })
    //                 }   
    //                 else {
    //                     const diffInMs = currentDate.getTime() - new Date(loggedDate).getTime();
    //                     const diffInHours = diffInMs / (1000 * 60 * 60);
            
    //                     if (diffInMs / (1000) >= 5) {
    //                         await add(10);
    //                         console.log("your points", Points);
    //                     }
    //                 }
        
    //             }

    //         }
    //     }
    // }

    const lvlElem = document.querySelector('.lvl');
    if (lvlElem !== null) {
        const percent = (props.points % 50 / 50) * 100;
        console.log("Percent:" + percent);
        const width = "" + percent + "%";
        lvlElem.style.width = width;
    }
    return (
        <div className="wrapper-prof">
        <div className = "container-prof">

            <div className = "circle">
                {/* <input type="file" className="imgbtn"/> */}
                { props.ismyprofile ? (
                    <button className="edit" onClick={handleEdit}>
                        <img src={edit} className="edit-img" ></img>
                    </button>

                ): null

                }
                <ProfilePicture userId={userId}/>
                
            </div>

            <div className = "info2">
                <h18>{username}</h18>
                <div className = "levelbar">
                    <div className = "lvl" ></div>
                </div>
                <h3>Nivel {getLevel(props.points)}</h3>
            </div>

        </div>

    {mode ? (
        <>
        {((parseInt(userId) == parseInt(localStorage.getItem("user"))) || hasBio == true) ? 
        <div className="bio-box">
            <img src = {bio_img} id="bio-bubble"></img>
        <div className="user-bio"></div>{bio}</div>: null}
        </>
    ):(<></>)}
    </div>
    )
}