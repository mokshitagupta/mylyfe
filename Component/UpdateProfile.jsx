import React, { useState, useEffect, useRef } from 'react';
import '../UpdateProfile.css';
// import '../App.css';
import user_img from '../assets/user_pic.svg';
import edit from '../assets/customize.png';
import Upload from "./Upload.jsx";
import Delete from "./Delete.jsx";
import undo from '../assets/undo.svg';
import { useInRouterContext, useParams } from 'react-router-dom';


// function toggleModal(app) {
//     app.setState({
//       openModal: !app.state.openModal
//     });
// } 

const maxBio = 20

function BioBox(props){
  const [curr, setCurr] = useState(0)
  let field = document.getElementById('tell-us')

  const calcLen = () => {
    let newlen = field.value.length
    setCurr(newlen)
  }
  return(
  <div className="input-container" id = "minput" >
      <input maxlength={maxBio} id='tell-us' placeholder='Tell us about you . . .' onChange={calcLen}></input>
      <p id = "mparagraph">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{curr}/{maxBio}</p>
  </div>
  )
}


export default function UpdateProfile(props) {
  const params = useParams()
  const [openModal, setModal] = useState(false);
  const [openModal2, setModal2] = useState(false);
  const [uploadModal, setUpload] = useState(true)
  const [profilePicture, setProfilePicture] = useState(user_img);
  // const [username, setUsername] = useState(params.userId)
  const [userData, setUserData] = useState(null);
  let userId = localStorage.getItem("user")
  
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
        store.style.setProperty('--settings-color', 'white');
        store.style.setProperty('--button-text', 'black');

      }
      else if (theme == "dark") {
          store.style.setProperty('--settings-color', '#181826');
          store.style.setProperty('--button-text', 'white');
      }
  }

  setTheme();

}, [setMode, mode]);

  useEffect(() => {
    var url = new URL("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/file-uploads?")
    url.searchParams.append('uploaderID', localStorage.getItem("user"))
    console.log(localStorage.getItem("user"))
    url.searchParams.append('attributes', JSON.stringify({path: "isProfilePic", equals: true}))
    url.searchParams.append("skip", 0)
    url.searchParams.append("take", 100)


    console.log(url.toString())
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
        console.log("result is ",result[0][0].id)
        fetch(`https://webdev.cse.buffalo.edu/hci/api/api/aquafit/file-uploads/${result[0][0].id}`)
        .then(response => response.json())
        .then((data) => {
          setProfilePicture("https://webdev.cse.buffalo.edu/" + data.path); 
        })
    }
    )
    .catch(error => console.error(error));

})

useEffect(() => {
  if (userData === null) {
    getUserData();
  }
})

function getUserData() {
  console.log("we reached here!")
    //trying to get latest username
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
          console.log("Hello ", data.attributes)
          setUserData(data.attributes)
      }
  )
}


  const handleEdit = () => {
    console.log("trying to open modal")
    setModal2(true)
    setUpload(true)
  }

  const closeModal = () => {
    console.log("trying to close modal")
    setModal(false)
    setModal2(false)
  }

  const openDelete = () => {
    setModal(true)
    setUpload(false)
  }

  const changeState = (path) => setProfilePicture(path)

  const returnPopup = (upload) => {
    console.log(upload)
    return(
    upload ? <Upload openModal2={openModal2} closeModal={closeModal} onChangeName={(path)=>
    // console.log(`${path}`)
      setProfilePicture(`${path}`)
    } />: <Delete openModal={openModal} closeModal={closeModal}/>
    )
  }

  function handleSubmit(user){
    let usernameField = document.getElementById("change-username")
    let bioField = document.getElementById("tell-us")

    let uUser, uBio

    uUser = usernameField.value
    uBio = bioField.value


    if(uUser === "" && uBio === ""){
      //ineffectual
      return
    } else {
      const reg = new RegExp("^(?=.*[A-Za-z0-9_.]).{3,18}$")
      let valid = reg.test(uUser)
      if(valid ==false){
        console.log("your invalid input " + valid)
        //return username was bad 
        uUser = user
      }

      if (uBio === "") {
        uBio = userData.bio
      }
        //all 3 are good to go
        console.log("Jaaa " + uUser, uBio, localStorage.getItem("email"))
        fetch("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/users/"+userId,{
          method: "PATCH",
          headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email : localStorage.getItem("email"),
            attributes: {
              ...userData,
              username: uUser,
              bio: uBio
            },
          })
        })
        .then((response) => {
          if (response.status != 200){
            console.log(response)
          }
          else if(response.status == 200){
            console.log(response)
            window.location.href = "/hci/teams/aquafit/profile/" + localStorage.getItem("user");
          }
        })

      }
    

  }

  function back() {
    window.location.href = "/hci/teams/aquafit/profile/" + localStorage.getItem("user");
  }
  

  return(
    
    <div className="overlay-cont">
        {openModal == true ? returnPopup(uploadModal) : null}
        {openModal2 == true ? returnPopup(uploadModal) : null}
      <div className="heading-container">
      <img src= {undo} className="undo-img" onClick={back}/>
        <p>Hi, {!(userData === null) ? userData.username :"NaN"}! Let’s update your profile:</p>
      </div>
      <div className='header-update'>
        <div className="pfp-container" id='update-child'>
          {/* <div className="pfp" ></div> */}
          <div className = "circle-new">
                <img src = {profilePicture} onClick={handleEdit} alt = "profile pic" id = "user_image"/>
                <button className="edit-new" onClick={handleEdit}>
                <img src= {edit} className="edit-img"/>
            </button>
        </div>
      </div>
      <div className='updateform-container'>
        <div className="input-container" id = "minput">
            
            <input id = "change-username" placeholder='Change Username'></input>
            <p id = "mparagraph">&nbsp; &nbsp; &nbsp;Letters and numbers only!</p>
        </div>
        
        <BioBox/>

        <div>
            <button type="submit" className="submit-update" onClick={() => handleSubmit(userData.username)}>Save Changes!</button>
        </div>
        
        <div id = "delete-div" >
            <button className="delete-update" onClick={openDelete} placeholder='Change Username'>Delete Account</button>
        </div>
      </div>
    </div>
    </div>
  )



}