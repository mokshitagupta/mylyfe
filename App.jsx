
/*
  App.js is the starting point for the application.   All of the components in your app should have this file as the root.
  This is the level that will handle the routing of requests, and also the one that will manage communication between
  sibling components at a lower level.  It holds the basic structural components of navigation, content, and a modal dialog.
*/

// import { matchPath, useEffect } from "react-router-dom";


import React from "react";
import "./App.css";
import PostForm from "./Component/PostForm.jsx";
import FriendList from "./Component/FriendList.jsx";
import GroupList from "./Component/GroupList.jsx";
import LoginForm from "./Component/LoginForm.jsx";
import Profile from "./Component/Profile.jsx";
import FriendForm from "./Component/FriendForm.jsx";
import Modal from "./Component/Modal.jsx";
import Upload from "./Component/Upload.jsx";
import Navbar from "./Component/Navbar.jsx";
import UpdateProfile from "./Component/UpdateProfile.jsx";
import FeedPage from "./Component/FeedPage.jsx";
// import FollowList from "./Component/FollowList.jsx";
import AboutUs from "./Component/AboutUs.jsx";
// import Promise from "./Component/Promise.jsx";
import Register from "./Component/Register.jsx"
import SpanishRegister from "./Component/spanish/SpanishRegister.jsx"
import ForgotPassword from "./Component/ForgotPassword";
import GetEmail from "./Component/getEmail.jsx";
import MyGoals from "./Component/MyGoals.jsx";
import Alert from "./Component/Alert.jsx";
// import EnterToken from "./Component/EnterToken.jsx";
import StyleGuide from "./Component/StyleGuide.jsx";
import HomePage from "./Component/HomePage.jsx";
import ProfilePage from "./Component/ProfilePage.jsx";
import LoginPage from "./Component/LoginPage.jsx";
import SpanishHomePage from "./Component/spanish/SpanishHomePage.jsx";
import SpanishLoginPage from "./Component/spanish/SpanishLoginPage";
import SpanishMyGoals from "./Component/spanish/SpanishMyGoals";
import SpanishForgotPassword from "./Component/spanish/SpanishForgotPassword";
import SpanishGetEmail from "./Component/spanish/SpanishGetEmail";
import SpanishProfilePage from "./Component/spanish/SpanishProfilePage";
import SpanishUpdateProfile from "./Component/spanish/SpanishUpdateProfile";
import SpanishFeedPage from "./Component/spanish/SpanishFeedPage";
import SpanishStyleGuide from "./Component/spanish/SpanishStyleGuide";

import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom';
import UserInfo from "./Component/UserInfo";
import FollowList from "./Component/FollowList";
import SpanishFollowList from "./Component/spanish/SpanishFollowList";
import SpanishAboutUs from "./Component/spanish/SpanishAboutUs";

// toggleModal will both show and hide the modal dialog, depending on current state.  Note that the
// contents of the modal dialog are set separately before calling toggle - this is just responsible
// for showing and hiding the component
function toggleModal(app) {
  app.setState({
    openModal: !app.state.openModal
  });
}

// function usePrevious(value) {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }


// the App class defines the main rendering method and state information for the app
class App extends React.Component {

  // the app holds a few state items : whether or not the modal dialog is open, whether or not we need to refresh 
  // the post list, and whether or not the login or logout actions have been triggered, which will change what the 
  // user can see (many features are only available when you are logged in)
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      openModal: false,
      refreshPosts: false,
      logout: false,
      login: false,
      homepage: true,
      register: false,
      followData: null,
      followerData: null,
      reloadFollowList: false,
      imageHash: {}
    };

    window.addEventListener('storage', (e) => this.storageChanged(e));
    
    // in the event we need a handle back to the parent from a child component,
    // we can create a reference to this and pass it down.
    this.mainContent = React.createRef();

    // since we are passing the following methods to a child component, we need to 
    // bind them, otherwise the value of "this" will mean the child, and not the app 
    this.doRefreshPosts = this.doRefreshPosts.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLoggedIn = this.handleLoggedIn.bind(this);
    this.reload = this.reload.bind(this);
    // this.homepage = this.homepage.bind(this);
    this.getFollowData = this.getFollowData.bind(this);
    this.getFollowersData = this.getFollowersData.bind(this);
    this.getImageFromUserID  = this.getImageFromUserID.bind(this);
    this.storageChanged = this.storageChanged.bind(this);
  }

  storageChanged(e) {
    if(e.key === 'language') {
      console.log("reloading")
      this.forceUpdate();
    }
  }   

  // on logout, pull the session token and user from session storage and update state

  async getFollowData() {
    const body = JSON.stringify({
      path: "followed",
      equals: true
    
    }) 
    var url = new URL("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/connections?");
    url.searchParams.append('fromUserID', parseInt(localStorage.getItem("user")));
    url.searchParams.append('attributes', body);
    await fetch(url.toString(), {
      method: "GET",
      headers:{
        "Authorization":
        `Bearer ${localStorage.getItem("token")}`
        },
    }).then (
      (res)=>res.json()
    ).then(result => {
      this.setState({
        followData: result
      })
      this.setState({reloadFollowList : !(this.state.reloadFollowList)});
    })
  }


  // Fetch all users you are following and stores their id in followList
  async getFollowersData() {
    const body = JSON.stringify({
      path: "followed",
      equals: true
    
    }) 
    var url = new URL("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/connections?");
    url.searchParams.append('toUserID', parseInt(localStorage.getItem("user")));
        url.searchParams.append('attributes', body);
        await fetch(url.toString(), {
          method: "GET",
          headers:{
            "Authorization":
            `Bearer ${localStorage.getItem("token")}`
            },
        }).then (
          (res)=>res.json()
        ).then(result => {
          this.setState({
            followerData: result
          })
          this.setState({reloadFollowList : !(this.state.reloadFollowList)});
        })
  }

  async getImageFromUserID(ID) {
    console.log("GETTING IMAGE FOR " + ID);
    var url = new URL("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/file-uploads?")
    url.searchParams.append('uploaderID', ID)
    url.searchParams.append('attributes', JSON.stringify({path: "isProfilePic", equals: true}))

    await fetch(url, {
        method: "GET",
        headers:{
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((response)=>{ 
        return response.json()
      })
      .then((result) => {
        if (result[1] === 1) {
          const ImagePath = "https://webdev.cse.buffalo.edu/"  + result[0][0].path;
          this.setState({
            imageHash: {...this.state.imageHash, [ID]: ImagePath}});
        } else {
          return
        }
        console.log("PEEP " + JSON.stringify(this.state.imageHash));
      })
      .catch(error => console.error(error));
}


  reload() {
    if (localStorage.getItem('loggedIn') === 'true') {
      this.getFollowData().then(() => {
        if (this.state.followData[1] > 0) {
          for (let i = 0; i < this.state.followData[1]; i++) {
            if (this.state.followData[0][i].attributes.followed === true) {
              if (!(this.state.followData[0][i].toUserID in this.state.imageHash)) {
                this.getImageFromUserID(this.state.followData[0][i].toUserID);
              } 
            }
          }
          this.setState({reloadFollowList : !(this.state.reloadFollowList)});
        }
        // this.setImageHash(this.state.imageHash)
      })
        this.getFollowersData().then(() => {
          if (this.state.followerData[1] > 0) {
            for (let i = 0; i < this.state.followerData[1]; i++) {
              if (this.state.followerData[0][i].attributes.followed === true) {
                if (!(this.state.followerData[0][i].fromUserID in this.state.imageHash)) {
                  this.getImageFromUserID(this.state.followerData[0][i].fromUserID);
                } 
              }
            }
            this.setState({reloadFollowList : !(this.state.reloadFollowList)});
          }
          // this.setImageHash(this.state.imageHash)
        })
    }

  }

  handleLoggedIn = (string) => {
    console.log("changing app state")
    this.setState({
      loggedIn: true,
    });
  }

  logout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      logout: true,
      login: false
    });
    
  }
  
  // on login, update state and refresh the posts
  login = () => {
    this.setState({
      login: true,
      logout: false,
      refreshPosts:true
    });  
  }
  
  // doRefreshPosts is called after the user logs in, to display relevant posts.
  // there are probably more elegant ways to solve this problem, but this is... a way
  doRefreshPosts = () => {
    console.log("CALLING DOREFRESHPOSTS IN APP");
    this.setState({
      refreshPosts:true
    });
  }

  componentDidMount(){
    if (!localStorage.getItem("language") || localStorage.getItem("language") ===""){
      localStorage.setItem("language", "")
    }
    this.reload()
  
  }

  render() {

    return (
      // the app is wrapped in a router component, that will render the
      // appropriate content based on the URL path.  Since this is a
      // single page app, it allows some degree of direct linking via the URL
      // rather than by parameters.  Note that the "empty" route "/", which has
      // the same effect as /posts, needs to go last, because it uses regular
      // expressions, and would otherwise capture all the routes.  Ask me how I
      // know this.
      <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <header className="App-header">
          
          {/* {console.log("navbar state is", this.state.loggedIn)} */}
          
          {/* <Navbar toggleModal={e => toggleModal(this, e)} logout={this.logout}/> */}
          {/* <Alert text="Login succesful! We're so happy to see you today!" color="red"/> */}
          {<FollowList imageHash={this.state.imageHash} toggleModal={e => toggleModal(this, e)} loggedIn={this.state.loggedIn} logout={this.logout} UserInfo = {UserInfo} reloadFollowList={this.state.reloadFollowList} reload = {this.reload} followData={this.state.followData} followerData={this.state.followerData}/>}
          <Navbar {...this.state} logout={this.logout}/>
          
          <div className="maincontent" id="mainContent">
            <Routes>

              {/* <Route path="/settings" element={<Settings login={this.login}  />} /> */}
              {/* <Route path="/friends" element={<Friends  login={this.login} />} />    */}
              {/* <Route path="/groups" element={<Groups  login={this.login} />} />      */}
              {/* <Route path="/posts" element={<Posts doRefreshPosts={this.doRefreshPosts} login={this.login} apprefresh={this.state.refreshPosts} />} /> */}
              {/* <Route path="/promise" element={<Promise />} /> */}
              <Route path="/aboutus" element={(localStorage.getItem("language") === "espanol") ? <SpanishAboutUs /> : <AboutUs />} />
              <Route path="/feed" element={(localStorage.getItem("language") === "espanol") ? <SpanishFeedPage login={this.login} /> : <FeedPage login={this.login} />} />
              {/* <Route path="/espanol/feed" element={} /> */}
              <Route path="/styleguide" element={(localStorage.getItem("language") === "espanol") ? <SpanishStyleGuide />:<StyleGuide />} />
              {/* <Route path="/espanol/styleguide" element={<SpanishStyleGuide />} /> */}
              <Route path="/profile/:userId" element={(localStorage.getItem("language") === "espanol") ? <SpanishProfilePage login={this.login}  reload={this.reload} /> : <ProfilePage login={this.login}  reload={this.reload} />} /> 
              {/* <Route path="/profile/espanol/:userId" element={<SpanishProfilePage login={this.login}  reload={this.reload} />} />  */}
              <Route path= "" element={(localStorage.getItem("language") === "espanol") ? <SpanishHomePage /> : <HomePage />} />
              {/* <Route path= "/espanol" element={<SpanishHomePage />} /> */}
              <Route path="/login" element={(localStorage.getItem("language") === "espanol") ? <SpanishLoginPage login={this.login} onSuccess={this.handleLoggedIn} />: <LoginPage login={this.login} onSuccess={this.handleLoggedIn} />} />
              {/* <Route path= "/espanol/login" element={<SpanishLoginPage login={this.login} onSuccess={this.handleLoggedIn} />} /> */}
              <Route path="/register" element={(localStorage.getItem("language") === "espanol") ? <SpanishRegister login={this.login} /> : <Register login={this.login} />} />
              {/* <Route path="/espanol/register" element={<SpanishRegister login={this.login} />} /> */}
              <Route path="/getEmail" element={(localStorage.getItem("language") === "espanol") ? <SpanishGetEmail login={this.login} />: <GetEmail login={this.login} />} />
              {/* <Route path="/espanol/getEmail" element={<SpanishGetEmail login={this.login} />} /> */}
              <Route path= "/myGoals" element={(localStorage.getItem("language") === "espanol") ? <SpanishMyGoals login={this.login} /> : <MyGoals login={this.login} />} />
              {/* <Route path= "/espanol/myGoals" element={<SpanishMyGoals login={this.login} />} /> */}
              <Route path="/forgotpassword" element={(localStorage.getItem("language") === "espanol") ? <SpanishForgotPassword login={this.login} />: <ForgotPassword login={this.login} />} />
              {/* <Route path="/espanol/forgotpassword" element={<SpanishForgotPassword login={this.login} />} /> */}
              <Route path="/updateprofile/" element={(localStorage.getItem("language") === "espanol") ?<SpanishUpdateProfile /> : <UpdateProfile />} />
              {/* <Route path="/updateprofile/espanol/:userId" element={<SpanishUpdateProfile />} /> */}
              <Route path="/upload" element={<Upload login={this.login} />} />
              {/* <Route path="/alert" element={<Alert color="green" text="" />} /> */}
              {/* <Route path="/" element={<Posts doRefreshPosts={this.doRefreshPosts} login={this.login} apprefresh={this.state.refreshPosts} />} /> */}

            </Routes>
          </div>
          
        </header>

        <Modal show={this.state.openModal} onClose={e => toggleModal(this, e)}>
          This is a modal dialog!
        </Modal>
      </div>
      </Router>
    );
  }
}

const Settings = (props) => {
   // if the user is not logged in, show the login form.  Otherwise, show the post form
   if (!localStorage.getItem("token")){
    console.log("LOGGED OUT");
    return(
      <div>
      <p>CSE 370 Social Media Test Harness</p>
      <LoginForm login={props.login}  />
      </div>
    );
  }
  return (
    <div className="settings">
    <p>Settings</p>
    <Profile userid={localStorage.getItem("user")} />
  </div>
  );
}

const Friends = (props) => {
   // if the user is not logged in, show the login form.  Otherwise, show the post form
   if (!localStorage.getItem("token")){
    console.log("LOGGED OUT");
    return(
      <div>
      <p>CSE 370 Social Media Test Harness</p>
      <LoginForm login={props.login}  />
      </div>
    );
  }
   return (
    <div>
      <p>Friends</p>
        <FriendForm userid={localStorage.getItem("user")} />
        <FriendList userid={localStorage.getItem("user")} />
    </div>
   );
}

const Groups = (props) => {
  // if the user is not logged in, show the login form.  Otherwise, show the post form
  if (!localStorage.getItem("token")){
   console.log("LOGGED OUT");
   return(
     <div>
     <p>CSE 370 Social Media Test Harness</p>
     <LoginForm login={props.login}  />
     </div>
   );
 }
  return (
   <div>
     <p>Join a Group!</p>
       <GroupList userid={localStorage.getItem("user")} />
   </div>
  );
}

const Posts = (props) => {
  console.log("RENDERING POSTS");
  console.log(typeof(props.doRefreshPosts));
  

  console.log ("TEST COMPLETE");

  // if the user is not logged in, show the login form.  Otherwise, show the post form
  if (!localStorage.getItem("token")){
    console.log("LOGGED OUT");
    return(
      <div>
      <p>CSE 370 Social Media Test Harness</p>
      <LoginForm login={props.login}  />
      </div>
    );
  }else{
    console.log("LOGGED IN");
    return (
      <div>
      <p>CSE 370 Social Media Test Harness</p>
      <PostForm refresh={props.apprefresh}/>
    </div>

    );
  }
}

// export the app for use in index.js
export default App;
