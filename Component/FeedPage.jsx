import React, { useState, useEffect, useRef } from "react";
import '../Feed.css';
import '../App.css';
import message from '../assets/msg.svg';
import write from '../assets/write.svg';
import img from '../assets/user_pic.svg';
import check from '../assets/check.svg';
import love from '../assets/unliked.png';
import heart_liked from '../assets/liked.png';
import no_check from '../assets/nocheck.svg';
import FollowList from './FollowList.jsx';
import UserInfo from './UserInfo.jsx';
import Goals from './Goals.jsx';
import Alert from "./Alert";
import heart from '../assets/small_heart.png'
//import { set } from "react-hook-form";

function toggleModal(app) {
    app.setState({
      openModal: !app.state.openModal
    });
} 

function Hearts(props){

  const [like, setStatus] = useState(false)
  const [likeImg, setImg] = useState(love)
  const [liked, setRepeat] = useState(true)
  const [style, setStyle] = useState({filter:"invert(100%)"})
  const [data, setData] = useState(null)
  const [By, setLikedBy] = useState([])
  const [counter, setCounter] = useState(null);


  useEffect(() => {
    console.log("Counter: " + counter)
    if (typeof props.goal.attributes.likedBy !== "undefined") {
      setCounter(props.goal.attributes.likedBy.length);
      if (!props.goal.attributes.likedBy.includes(localStorage.getItem("user"))) {
        setLikedBy([...props.goal.attributes.likedBy, localStorage.getItem("user")])
        setRepeat(true)
        setImg(love) 
      }
      else {  
        const newArr = props.goal.attributes.likedBy.filter(function (user) {
          return user !== localStorage.getItem("user")
        })
        setLikedBy([...newArr])
        setRepeat(false)
        setImg(heart_liked)
      }
    }
    setData(props.goal.attributes)

  }, [props.goal])
  
  
  const display = () => {

    if (liked == true){
      return
    }
    
    var len = "love-div-short" 
    if (props.long == true){
      len = "love-div-long"
    }
    // setLike(false)
    setTimeout(() => setRepeat(true), 600)
    const hearts = (
      <div className={len}>
      <img style={localStorage.getItem("mode") === "dark" ? style : null} id="heart1" src={heart}></img>
      <img style={localStorage.getItem("mode") === "dark" ? style : null} id="heart2" src={heart}></img>
      <img style={localStorage.getItem("mode") === "dark" ? style : null} id="heart3" src={heart}></img>
    </div>
    )

    
    return hearts
  }

  const setLikedEmpty = () => {
    console.log("resetting")
    
    let url = new URL("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/posts/" + props.goal.postID);
    fetch(url, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token")
      },
      body: JSON.stringify({
        attributes: { 
          ...data,
          likedBy: [localStorage.getItem("user")]
        }
      })
    }).then((res) => res.json()).then((response) => {
      console.log("Response " + JSON.stringify(response))
    })
    setRepeat(false);
    setImg(heart_liked);
    setCounter(counter + 1)

  }

  const setLiked = () => {
    console.log("resetting")
    
    let url = new URL("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/posts/" + props.goal.postID);
    fetch(url, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token")
      },
      body: JSON.stringify({
        attributes: { 
          ...data,
          likedBy: By
        }
      })
    }).then((res) => res.json()).then((response) => {
      console.log("Response " + JSON.stringify(response))
      if (likeImg === love) {
        setRepeat(false);
        setImg(heart_liked);
        setCounter(counter + 1)
      }
      else {
        setRepeat(true);
        setImg(love);
        setCounter(counter - 1)
      }
    })

  }

  const choose = () => {
    if (typeof props.goal.attributes.likedBy === "undefined") {
      setLikedEmpty()
    }
    else {
      setLikedBy(props.goal.attributes.likedBy);
      setLiked();
    }
  }
  
  return (
    <div className="heart-wrap" ref={props.abc}>
      <div className="likeCounter">{counter}</div>
    <button className="interaction-bttn" >
    <img src = {likeImg} style={localStorage.getItem("mode") === "dark" ? style : null} alt = "Love post" id = "love" onClick={ () => choose()}/></button>
    {(liked == false) ? display() : null}
    </div>
  )

}

function Comment(props){
  return (
    <div className="comment-div">
      <p><b>{props.comment.user}</b>{": "}{props.comment.title}</p>
    </div>
  )
}

function CommentSection(props) {

  
  const [isLoading, setLoading] = useState(true)
  // console.log("reloading comments")

  const [comments, addComment] = useState([])
  var c_list = []

  useEffect(() => {
    // console.log("reloading comments")
    setLoading(true)
    var url = new URL("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/posts?");
  url.searchParams.append("parentID", props.goal.postID);
  url.searchParams.append("sort", "newest");
  url.searchParams.append("take", "5");
  url.searchParams.append("attributes",JSON.stringify({path: "type", equals: "comment"}));
  // console.log("The constructed url was: ", url);
  fetch(url, {
    method: "GET",
    headers:{
      "Authorization":`Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
  }
  }).then(
    (res) => {
      if (res.status == 200){
        return res.json()
      }else{
        console.log(res)
      }
    }
  ).then(
    (data) => {
      // console.log("san",data)
      addComment([])
      for(let i =0; i < data[0].length; i++){
        // console.log(data[0][i])
        let comment = {
          title:data[0][i].content,
          user: data[0][i].author.attributes.username,
        }
        // c_list = [...c_list, comment]
        addComment(comments => [...comments, comment])
        setLoading(false)
        // console.log("ideally: ", comments)
      }

      
    }
  )
    
  }, [props.state]);


  // console.log("list: ", c_list)
  return (
    <div className={`cs-wrapper ${props.state ? 'open' : ''}`}>
      {!(comments.length == 0) ? comments.map((comment) => <Comment comment={comment}/>) : <p> Be the first commenter ;) </p>}
      {console.log(comments)}

      {/* <Comment/> */}
      {/* <Comment/>
      <Comment/> */}

    </div>
  )
}

function Post(props) {
  const [commentDrop, toggleComment] = useState(false)
  const [postExpand, toggleExpand] = useState("inherit")
  const [myComments, setComments] = useState(null)
  const goalRef = useRef(null)
  const heartRef = useRef(null)
  const [isLoading, setLoading] = useState(true);
  const [isPosting, setPosting] = useState(true);
  

  const toggleDrop = () => {
    toggleComment(true)
    toggleExpand("60vh")
  }
  const toggleUp = () => {
    toggleComment(false)
    toggleExpand("inherit")
  }

  const submitComment = (ref, postID) => {

    setPosting(true)

    

    const text = ref.current.getElementsByClassName("comment-bar")[0].value
    console.log("selected text: ", text)

    if (text === ""){
      //empty comment
      return;
    }
  

    fetch("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/posts", {
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        parentID: postID,
        authorID: parseInt(localStorage.getItem("user")),
        content:text,
        attributes:{
          type:"comment",
        }
      })
    })
    .then(
      (response) => {
        if (response.status !== 201){
          console.log("failed", response)
        } else{
          console.log(response) 
          setPosting(false)
          toggleComment(false)
          toggleComment(true)
          ref.current.getElementsByClassName("comment-bar")[0].value = ""
        }
      }
    )
  }

  const [mode, setMode] = useState("");


  useEffect(() => {

    // window.addEventListener("click", function(event) {
    //   if (event.tar)
    // });
    

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
        store.style.setProperty('--feed-title', '#34A853');
        store.style.setProperty('--feed-background', '#efefef');
        store.style.setProperty('--button-text', 'black')
        store.style.setProperty('--border-color', 'rgb(211,211,211,0.7)');
        store.style.setProperty('--counter-color', 'black')

      }
      else if (theme == "dark") {
        store.style.setProperty('--text-color', 'white');
        store.style.setProperty('--feed-title', '#443FEA');
        store.style.setProperty('--border-color', '#0f0f1a');
        store.style.setProperty('--feed-background', '#0f0f1a');
        store.style.setProperty('--button-text', 'white');
        store.style.setProperty('--border-color', '#0f0f1a');
        store.style.setProperty('--counter-color', 'white')
      }
  }

  setTheme();

}, [setMode, mode]);

  function handleUnfocus(event) {
    if (goalRef !== null) {
      if (!goalRef.current.contains(event.target)) {
        window.removeEventListener('click', handleUnfocus);
        toggleComment(false);
      }
    }

  }
  function handleFocus(event) {
    if (!heartRef.current.contains(event.target)) {
      toggleComment(true);
      window.addEventListener("click", handleUnfocus);
    }
  }

  const feedElem = document.querySelector('.feed-box');
  if (feedElem !== null) {
  }

    return (
      <div className = "feed-box" ref={goalRef} onClick={(event) => handleFocus(event)}>
            <div className = "feed-title">
              <div className = "circle5">
                <img src = 
                {props.goal.postPicture} alt = "profile pic" id = "user_image"
                onClick = {() => window.location.href = "/hci/teams/aquafit/profile/" + props.goal.authorID}/>
              </div>
              <div className = "textgrid">
                <h15>{props.goal.author}</h15>
                <h16>{props.goal.date}</h16>
              </div>
            </div>
            <div className = "goal-box" id = "goal-box" style={{marginTop:"2vh"}}> 
              <img src = {check} alt = "check mark" id = "checkf"/>
              <h5>{props.goal.nTitle}</h5>
            </div>
            <CommentSection goal={props.goal} state={commentDrop} ctrl={toggleComment}/>
            <div className = "footbox">
              
              {/* <button className="interaction-bttn" onClick={commentDrop ? toggleUp : toggleDrop}> */}
              {/* <img src = {write} alt = "Write comments" id = "writecomments" /></button> */}

              
              
             
              <Hearts long={commentDrop} abc={heartRef} goal={props.goal}/>
              
              <div className="cin-wrapper">
                <input className="comment-bar" onClick={() => toggleComment(true)}placeholder="Write a comment . . ." type="text" onKeyDown={
                  (event) => {
                    if(event.key === 'Enter'){
                      submitComment(goalRef, props.goal.postID)
                    }
                    
                  }
                }></input>
              </div>

              <button className="interaction-bttn" onClick={() => {
                toggleComment(true)
                submitComment(goalRef, props.goal.postID)}}>
              <img src = {message} alt = "Read comments" id = "readcomments"/></button>
              {/*<h12>We are so proud!</h12>*/}
            </div>
        </div>
  )
}

class FeedPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      followingGoals: [],
      goals: [],
      blockedList: [],
      followList: [],
      isError: false,
      error: "",
      isPostError: false,
      postError: "",
      postDB: []
    };
    this.loadingPosts = this.loadingPosts.bind(this);
    this.checkForErrors = this.checkForErrors.bind(this);
    this.fetchBlocker = this.fetchBlocker.bind(this);
    this.fetchBlocked = this.fetchBlocked.bind(this);
    this.sleep = this.sleep.bind(this);
  }

 async componentDidMount(){
    await this.sleep(50);
    this.fetchBlocker();
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  checkForErrors() {
    if(this.state.followList.length === 0){
      console.log("Error: User not following anyone!");
      this.setState({isError: true});
      this.setState({error: "You are not following anyone!"});
    }
    else{
      this.setState({isError: false});
      this.setState({error: ""});
    }
    console.log("fhusdj" + this.state.followingGoals);
  }

  fetchBlocker() {
    const userID = localStorage.getItem('user');
    fetch("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/connections?toUserID=" + userID, {
      method: "GET",
      headers:{
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }).then ((res)=>res.json()).then(result => {
      for (let i = 0; i < result[0].length; i++) {
        if (result[0][i].attributes.info === "Connection_Data") {
          if (result[0][i].attributes.blocked === true) {
            this.setState({
              blockedList: [...this.state.blockedList, result[0][i].fromUserID]
            })
          }
        }
      }
    }).then(()=>{this.fetchBlocked();})
  }

  fetchBlocked() {
    const userID = localStorage.getItem('user');
    fetch("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/connections?fromUserID=" + userID, {
      method: "GET",
      headers:{
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }).then ((res)=>res.json()).then(result => {
      for (let i = 0; i < result[0].length; i++) {
        if (result[0][i].attributes.info === "Connection_Data") {
          if (result[0][i].attributes.blocked === true) {
            this.setState({
              blockedList: [...this.state.blockedList, result[0][i].toUserID]
            })
          }
          if (result[0][i].attributes.followed === true) {
            // This user is being followed
            console.log("this user is following!");
            this.setState({
              followList: [...this.state.followList, result[0][i].toUserID]
            })
          }
        }
      }
    }).then(()=>{
      console.log("POST BLOCKED FROM " + this.state.blockedList); 
      console.log("Users following " + this.state.followList);
      this.loadingPosts();
    })

  }

  loadingPosts() {
    let postsLoaded = 10; //How many posts per page
    var url = new URL("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/posts?");
    url.searchParams.append("take", postsLoaded);
    url.searchParams.append("attributes",JSON.stringify({path: "type", equals: "post"}));
    url.searchParams.append("sort", "newest");
    //Loading regular posts
    console.log("The constructed url was: ", url);
    fetch(url, {
      method: "GET"
    })
    .then((res)=> {
      console.log("we received this as response for loadingPosts" + res.status)
      return res.json()
    })
    .then((result) => {
      if (result[0].length !== 0) {
        //If there are posts to load.
        for(let i = 0; i < postsLoaded; i++){
          let newTitle = "";
          if (result[0][i].attributes.status === "completed"){
            newTitle = "Completed a new goal: " + result[0][i].attributes.title;
          }
          else{
            newTitle = "Started a new goal: " + result[0][i].attributes.title;
          }
          let pic = img;
          let userID = result[0][i].authorID;
          var url2 = new URL("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/file-uploads?");
          url2.searchParams.append("uploaderID", userID);
          // console.log("The constructed url was for findPicture was: ", url2);
          fetch(url2, {
            method: "GET"
          })
          .then((res)=> {
            // console.log("we received this as response for findUserPicture: " + res.status)
            return res.json()
          })
          .then((result) => {
            if (result[1] !== 0){
              for(let i = 0; i < result[1]; i++){
                if(result[0][i].attributes.isProfilePic === true){
                  // console.log(result[0][i].path);
                  pic = "https://webdev.cse.buffalo.edu/" + result[0][i].path;
                }
              }
            }
          })
          .then(() => {
            if (!(this.state.followList.includes(result[0][i].author.id) || this.state.blockedList.includes(result[0][i].author.id))) {
              let newGoal = {
                title: result[0][i].attributes.title,
                date: result[0][i].attributes.date,
                description: result[0][i].attributes.description,
                status: result[0][i].attributes.status,
                postID: result[0][i].id,
                author: result[0][i].author.attributes.username,
                authorID: result[0][i].authorID,
                nTitle: newTitle,
                postPicture: pic,
                attributes: result[0][i].attributes
              };


              this.setState({
                goals: [...this.state.goals, newGoal],
              });
            }

          })
        }
        console.log("anjd");
        console.log(this.state.goals);
      }
      else{
        // this.setState({isPostError: true});
        // this.setState({postError: "There are no posts to be loaded!"});
      }
    })
    //Loading Following posts
    if(this.state.followList.length === 0){
      this.checkForErrors();
      return;
    }
    for(let j = 0; j < this.state.followList.length; j++){
      url.searchParams.append("authorIDIn", this.state.followList[j]);
    }
    
    console.log("The constructed url for following was: ", url);
    fetch(url, {
      method: "GET"
    })
    .then((res)=> {
      console.log("we received this as response for loadingPosts" + res.status)
      return res.json()
    })
    .then((result) => {
      if (result[0].length !== 0) {
        //If there are posts to load.
        for(let i = 0; i < postsLoaded; i++){
          let newTitle = "";
          if (result[0][i].attributes.status === "completed"){
            newTitle = "Completed a new goal: " + result[0][i].attributes.title;
          }
          else{
            newTitle = "Started a new goal: " + result[0][i].attributes.title;
          }
          let pic = img;
          let userID = result[0][i].authorID;
          var url2 = new URL("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/file-uploads?");
          url2.searchParams.append("uploaderID", userID);
          console.log("The constructed url was for findPicture was: ", url2);
          fetch(url2, {
            method: "GET"
          })
          .then((res)=> {
            console.log("we received this as response for findUserPicture: " + res.status)
            return res.json()
          })
          .then((result) => {
            if (result[1] !== 0){
              for(let i = 0; i < result[1]; i++){
                if(result[0][i].attributes.isProfilePic === true){
                  // console.log(result[0][i].path);
                  pic = "https://webdev.cse.buffalo.edu/" + result[0][i].path;
                }
              }
            }
          })
          .then(() => {
            if (!(this.state.blockedList.includes(result[0][i].author.id))) {
              let newGoal = {
                title: result[0][i].attributes.title,
                date: result[0][i].attributes.date,
                description: result[0][i].attributes.description,
                status: result[0][i].attributes.status,
                postID: result[0][i].id,
                author: result[0][i].author.attributes.username,
                authorID: result[0][i].authorID,
                nTitle: newTitle,
                postPicture: pic,
                attributes: result[0][i].attributes
              };

  
              this.setState({
                followingGoals: [...this.state.followingGoals, newGoal],
              });
            }

          })
        }
        if(this.state.followingGoals.length !== 0){
          this.setState({isError: false});
          this.setState({error: ""});
        }
        else{
          // this.setState({isError: true});
          // this.setState({error: "There are no posts to be loaded!"});
        }
        console.log("anjd");
        console.log(this.state.followingGoals);
      }
      else{
        // this.setState({isError: true});
        // this.setState({error: "There are no posts to be loaded!"});
      }
    })
    this.checkForErrors();
  }

  render(){
    return (
      <div className = "bodyfeed">
        <p>Here's what your followers have been up to...</p>
        <Alert id="error2" color={this.state.isError ? "red" : ""} text={this.state.error}/>
        <div className = "feed-boxes">
          {this.state.followingGoals .map((goal)  => (<>
          <Post goal={goal} id={goal.postID}/>
          </>
          ))}
        </div>
        <br></br>
        <div className = "line4"></div>
        <p>You're all caught up!</p>
        <Alert id="error2" color={this.state.isPostError ? "red" : ""} text={this.state.postError}/>
        <div className = "feed-boxes">
          {this.state.goals.map((goal)  => (
          <Post goal={goal}/>
          ))}
        </div>
    </div>
    )
  }
}

export default FeedPage;