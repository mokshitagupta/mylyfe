import React, { useEffect } from "react";
import "../../profilePage.css";
import '../../App.css';
import { Link } from 'react-router-dom';
import close from "../../assets/urfollowingicon.svg";
//import closeYou from "../assets/followingyou.svg";
import follow_user_img from '../../assets/user_pic.svg';
import { useState } from 'react'; 

export default function SpanishFollowList(props) {
    const [followData, setFollowData] = useState(null);
    const [followerData, setFollowerData] = useState(null);
    const [followList, setFollowlist] = useState([]);
    const [followList2, setFollowlist2] = useState([]);
    const [open, setOpen] = useState(false);
    const [following, setFollowing] = useState(false); 
    const [imageHash, setImageHash] = useState({});
    const [nameHash, setNameHash] = useState({});


    


    useEffect(() => {
      console.log("FollowList");
      if (followData == null) {
        setFollowData(props.followData);
      }
      
      else {
        setFollowData(props.followData);
        setImageHash(props.imageHash);
        if (followData[1] > 0) {
          for (let i = 0; i < followData[1]; i++) {
            if (followData[0][i].attributes.followed === true) {
              if (!followList.includes(followData[0][i].toUserID)) {
                // console.log("ADDING " + result[0][i].toUserID + " to " + followList);
                 addItem(followData[0][i].toUserID);
              } 
            }
          }
          if (followList.length == followData[1]) {
            for(let i = 0; i < followList.length; i++) {
              if (!(followList[i] in imageHash)) {
                findUser(followList[i]);
              }
            }
          }
        }
      }
    }, [followData, followList, props.imageHash, props.followData, props.reloadFollowList]);


    useEffect(() => { 
      console.log("FollowList");
      if (followerData == null) {
        setFollowerData(props.followerData);
      }
      else {
        setFollowerData(props.followerData);
        setImageHash(props.imageHash);
        if (followerData[1] > 0) {
          for (let i = 0; i < followerData[1]; i++) {
            if (followerData[0][i].attributes.followed === true) {
              if (!followList2.includes(followerData[0][i].fromUserID)) {
                 addItem2(followerData[0][i].fromUserID);
              } 
            }
          }
          if (followList2.length == followerData[1]) {
            for(let i = 0; i < followList2.length; i++) {
              if (!(followList2[i] in imageHash)) {
                findUser(followList2[i]);
              }
            }
          }
        }
      }
    }, [followerData, followList2, props.imageHash, props.followerData, props.reloadFollowList]);



    const addItem = (newItem) => {
      const itemSet = new Set(followList.map((item) => item));
      if (!itemSet.has(newItem)) {
        setFollowlist([...followList, newItem]);
      }
    };

    const addItem2 = (newItem2) => {
      const itemSet2 = new Set(followList2.map((item2) => item2));
      if (!itemSet2.has(newItem2)) {
        setFollowlist2([...followList2, newItem2]);
      }
    };

    const updateObject = (key, value) => {
      setNameHash(prevState => {
        return {...prevState, [key]: value};
      });
    };

    const body = JSON.stringify({
      path: "followed",
      equals: true
    
    })


async function findUser(userId){
  await fetch("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/users/" + userId , {
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
          if (typeof data.attributes["username"] !== 'undefined') {
            updateObject(userId, data.attributes["username"])
          }
      }
  )
}

    if (localStorage.getItem("loggedIn") === "true") {
      return (
        <div className = "close-list" id = "close-list">
  
          <button className = "close-button" id = "close-button" onClick = {() => {setOpen(true);}}>
            <img src = {close} className = {`close-icon${open == '1'? 'inactive' : 'active'}`}alt = "close-icon" id = "close"/>
          </button>
  
          {!following ? (
            <div className = {`follow-list${open == '1'? 'active' : 'inactive'}`}>
            <span className = {`close3${open == '1'? 'inactive' : 'active'}`} onClick = {() => setOpen(false)}>
              &times;
            </span>
            <div className = "following-title" id = "following-title">
            <div className="follow-1"onClick={() => {setFollowing(false)}}>Siguiente</div>
                <div className="follow-2" onClick={() => {setFollowing(true)}}>Seguidor</div>
            </div>
  
                <ul className = "side-menu-items" id = "side-menu-items">
                {followList
                  .sort((a, b) => {
                    const nameA = nameHash[a] ? nameHash[a] : ''; // If nameHash[a] is undefined, use an empty string instead
                    const nameB = nameHash[b] ? nameHash[b] : ''; // If nameHash[b] is undefined, use an empty string instead
                    return nameA.localeCompare(nameB); // Sort the array by name
                  })
                  .map((userId) => (
                    <li className="following" key={userId}>
                      <div className="circle2">
                        <Link to={`/profile/${userId}`} onClick={() => window.location = "/hci/teams/aquafit/profile/" + userId} relative="path">
                          <img src={imageHash[userId] ? imageHash[userId] : follow_user_img} alt="profile pic" id="follow_user_image" />
                        </Link>
                        <h6 className="followtext">
                          <Link to={`/profile/${userId}`} onClick={() => window.location = "/hci/teams/aquafit/profile/" + userId} relative="path">
                            {nameHash[userId] ? nameHash[userId] : userId}
                          </Link>
                        </h6>
                      </div>
                    </li>
                  ))}
                </ul>
  
            </div>
          )
          : (
            <div className = {`follow-list${open == '1'? 'active' : 'inactive'}`}>
            <span className = {`close3${open == '1'? 'inactive' : 'active'}`} onClick = {() => setOpen(false)}>
              &times;
            </span>
            <div className = "following-title" id = "following-title">
                <div className="follow-1"onClick={() => {setFollowing(false)}}>Siguiente</div>
                <div className="follow-2" onClick={() => {setFollowing(true)}}>Seguidor</div>
            </div>
  
  
                <ul className = "side-menu-items" id = "side-menu-items">
                {followList2
                  .sort((a, b) => {
                    const nameA = nameHash[a] ? nameHash[a] : ''; // If nameHash[a] is undefined, use an empty string instead
                    const nameB = nameHash[b] ? nameHash[b] : ''; // If nameHash[b] is undefined, use an empty string instead
                    return nameA.localeCompare(nameB); // Sort the array by name
                  })
                  .map((userId) => (
                    <li className="following" key={userId}>
                      <div className="circle2">
                        <Link to={`/profile/${userId}`} onClick={() => window.location = "/hci/teams/aquafit/profile/" + userId} relative="path">
                          <img src={imageHash[userId] ? imageHash[userId] : follow_user_img} alt="profile pic" id="follow_user_image" />
                        </Link>
                        <h6 className="followtext">
                          <Link to={`/profile/${userId}`} onClick={() => window.location = "/hci/teams/aquafit/profile/" + userId} relative="path">
                            {nameHash[userId] ? nameHash[userId] : userId}
                          </Link>
                        </h6>
                      </div>
                    </li>
                  ))}
                </ul>
  
            </div>
          )
          }
  
        </div>
    );

    }
  
}