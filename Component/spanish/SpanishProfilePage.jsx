import React from "react";
import '../../profilePage.css';
import SpanishFollowButton from '../UserButtons/SpanishFollowButton.jsx';
import SpanishBlockButton from '../UserButtons/SpanishBlockButton.jsx';
//import MessageButton from './UserButtons/MessageButton.jsx';
//import FollowList from './FollowList.jsx';
import SpanishUserInfo from './SpanishUserInfo.jsx';
//import Goals from './Goals.jsx';
import Alert from "../Alert";
import sprout from "../../assets/3.svg";
//import bloom from "../assets/2.svg";
import flower from "../../assets/1.svg";
import "../../MyGoals.css";
import check from '../../assets/check.svg';
import no_check from '../../assets/nocheck.svg';

function toggleModal(app) {
    app.setState({
      openModal: !app.state.openModal
    });
} 



function getMode() {
  const img2 = new Image();
  const img1 = new Image();

  img1.src = "../assets/nightforest.svg";
  img2.src = "../assets/nightforest.svg";

  const theme = localStorage.getItem('mode')
  var store = document.querySelector(':root');
  var value = getComputedStyle(store);
  if (theme) {

    if (theme == "light") {
      store.style.setProperty( '--profile-background', 'white');
      store.style.setProperty('--goal-title', '#34A853');
      store.style.setProperty('--goal-box', '#efefef');
      store.style.setProperty('--button-color', 'white');
      store.style.setProperty('--button-hover', '#efefef');
      store.style.setProperty('--button-text', 'black');
    }
    else if (theme == "dark") {
      store.style.setProperty( '--profile-background', '#181826');
      store.style.setProperty('--goal-title', '#443FEA');
      store.style.setProperty('--goal-box', '#0f0f1a');
      store.style.setProperty('--button-color', '#0f0f1a');
      store.style.setProperty('--button-hover', '#070722');
      store.style.setProperty('--button-text', 'white');
    }
    return theme;
  }
  console.log("hey it's", theme, "in here")
}

class SpanishProfilePage extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          userFound: false,
          uploaderID: null,
          username: null,
          ismyprofile: true,
          points: null,
          lastLogged: null,
          connectionData: {},
          connectionID: null,
          goals: [],
          loaded: false,
          blockedByVistor: false, //If the visitor to prof blocks this person
          blockedByHost: false, //If the profile user blocks the visitor 
          currentDate: null,
          addedPoints: false, 
          userData: null
        };
        this.getUserData = this.getUserData.bind(this);
        this.getConnectionData = this.getConnectionData.bind(this);
        this.constructConnectionData = this.constructConnectionData.bind(this);
        this.checkBlocked = this.checkBlocked.bind(this);
        this.loadingPosts = this.loadingPosts.bind(this);
        this.add = this.add.bind(this);
        this.handlePoints = this.handlePoints.bind(this);
      }

    componentDidMount() {
      console.log("In profile");
      this.setState({currentDate: new Date()})
      this.getUserData();
      this.getConnectionData();
      this.checkBlocked();
      this.loadingPosts();
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState != this.state) {
        this.forceUpdate();
      } 
    }

    add(p) {
      console.log(parseInt(this.state.points) + p)
      const x = JSON.stringify({
        attributes: {
            ...this.state.userData,
            points: this.state.points + p,
            lastLogged: this.state.currentDate.toLocaleString()
        }
        })
      fetch("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/users/" + this.state.uploaderID, {
          method: "PATCH",
          headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          attributes: {
              ...this.state.userData,
              points: this.state.points + p,
              lastLogged: this.state.currentDate.toLocaleString()
          }
          })
      }).then((res) => {
        console.log("hello response " + x)
        this.getUserData();
        this.setState({addedPoints: true});
      })
  }


  async handlePoints() {
    if (typeof this.state.points == "undefined") {
        fetch("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/users/"+ this.state.uploaderID,{
            method: "PATCH",
            headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              attributes: {
                ...this.state.userData,
                points: 10
              }
            })
        }).then(() => {
          window.location.reload(false);
        })
    } 
    
    else {
        if (this.state.ismyprofile) {
            if (this.state.lastLogged !== null) {
                if (typeof this.state.lastLogged === "undefined") {
                    fetch("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/users/" + this.state.uploaderID,{
                        method: "PATCH",
                        headers:{
                        "Authorization":`Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                        attributes: {
                            ...this.state.userData,
                            username: this.state.username,
                            points: this.state.points,
                            lastLogged: this.state.currentDate.toLocaleString()
                        }
                        })
                    })
                }   
                else {
                    const diffInMs = this.state.currentDate.getTime() - new Date(this.state.lastLogged).getTime();
                    const diffInHours = diffInMs / (1000 * 60 * 60);
                    if (diffInMs / (1000) >= 30) {
                      console.log("we are adding points")
                        this.add(10);
                    }
                }
    
            }

        }
    }
  }


    loadingPosts(){
      const u = window.location.href;
      const authorID = u.substring(u.lastIndexOf('/') + 1);
      var url = new URL("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/posts?");
      url.searchParams.append("authorID", authorID);
      url.searchParams.append("sort", "newest");
      console.log("The constructed url was: ", url);
      fetch(url, {
        method: "GET"
      })
      .then((res)=> {
        console.log("we received this as response " + res.status)
        return res.json()
      })
      .then((result) => {
        if (result[1] !== 0) {
          //If there are posts to load.
          for(let i = 0; i < result[1]; i++){
            let newGoal = {
              title: result[0][i].attributes.title,
              date: result[0][i].attributes.date,
              description: result[0][i].attributes.description,
              status: result[0][i].attributes.status,
              postID: result[0][i].id,
            };
            // console.log(newGoal);
            this.setState({
              goals: [...this.state.goals, newGoal],
            })
          }
        }
      })
    }

    checkBlocked() {
      const u = window.location.href;
      const hostID = u.substring(u.lastIndexOf('/') + 1);
      const userID = parseInt(localStorage.getItem("user"));
      //Check if the host blocks the visitor
      var url = new URL("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/connections?");
      url.searchParams.append('fromUserID', hostID);
      url.searchParams.append('toUserID', userID);
      url.searchParams.append('attributes', JSON.stringify({path: "info", equals: "Connection_Data"}))
      fetch(url, {
        method: "GET",
        headers:{
          "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
      })
      .then((res)=> {
        return res.json()
      })
      .then((result) => {
        if (result[1] !== 0) {
          // If the connection data exists
          this.setState({blockedByHost: result[0][0].attributes.blocked});
        }
      })
    }

    getConnectionData() {
      const u = window.location.href;
      const id = u.substring(u.lastIndexOf('/') + 1);
      console.log("GETTING CONN DATA");
      // check if the connection data exists
      var url = new URL("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/connections?");
      url.searchParams.append('fromUserID', parseInt(localStorage.getItem("user")));
      url.searchParams.append('toUserID', id);
      url.searchParams.append('attributes', JSON.stringify({path: "info", equals: "Connection_Data"}))
      fetch(url, {
        method: "GET",
        headers:{
          "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
      })
      .then((res)=> {
        console.log("we received this as response " + res.status)
        return res.json()
      } )
      // handle reponse code
      .then((result) => {
        if (result[1] === 0) {
      // If the connection data doesn't exist
          this.constructConnectionData();
        }
        else {
      // If connection data exists update state
          this.setState({connectionData: result[0][0].attributes, connectionID: result[0][0].id})
          this.setState({blockedByVistor: result[0][0].attributes.blocked})
        }
        console.log(this.state.connectionID)
      })
    }



    constructConnectionData() {
      let body = JSON.stringify(
        {
            fromUserID: parseInt(localStorage.getItem("user")), 
            toUserID: this.state.uploaderID, 
            attributes: {
                info: "Connection_Data",
                followed: false,
                blocked: false
            }
            
        });

      fetch("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/connections", {
        method: "POST",
        headers:{
        "Authorization":
        `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'
        },
        body: body
      }).then( result => {
          if (result.status === 201) {
            console.log("Successfully created Connection!");
            this.getConnectionData();
          }
      })

    }

      

    getUserData() {
      const url = window.location.href;
      const id = url.substring(url.lastIndexOf('/') + 1);
      this.setState({username : localStorage.getItem("name")});

      if (!(localStorage.getItem("user") === id)) {
        this.setState({ismyprofile: false});
        console.log("This is not my profile " + this.state.ismyprofile)
      }
  
      // fetch the user data, and extract out the attributes to load and display
      fetch("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/users/" + id,  {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ localStorage.getItem("token")
        }
      })
      .then(res => {
        if (res.status == 404 || res.status != 200){
          // alert("Error!")
          this.setState({loaded: true})
        }else{
          return res.json()
        }
      })
        .then(
          result => {
            if (result) {
              if (result.email !== "") {
                  this.setState({userFound: true, uploaderID: result.id, loaded: true, points: result.attributes.points, username: result.attributes.username, lastLogged: result.attributes.lastLogged, userData: result.attributes})
                  this.getConnectionData(); 
                  this.handlePoints();
              } 
              else {
                this.setState({loaded: true})
              }
              // else if (result.)
              if (result.attributes){
                this.setState({
                  // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
                  // try and make the form component uncontrolled, which plays havoc with react
                  username: result.attributes.username || "",
                  firstname: result.attributes.firstName || "",
                  lastname: result.attributes.lastName || "",
                  favoritecolor: result.attributes.favoritecolor || ""
                });
              }
              return 
            }
          })
    }
 

    render() {
      const theme = getMode();
      let image;
      if (theme == "dark") {
          image =  "profile2"
      }
      else {
          image = "profile"
      }
      if (this.state.blockedByHost){
        return (
          <div className = "body">

              <div className = "block">

                  <div id = {image} className = "profile"> 
                      <SpanishUserInfo points = {this.state.points} uploaderID={this.state.uploaderID} ismyprofile={this.state.ismyprofile}/>
                      <div className="profile-err-NotFound">
                          <Alert color="red" text="Acceso Prohibido"/>
                      </div>

                      { (this.state.ismyprofile) ?
    
                        (  
                          <> 
                          </>                     

                        ) : (
                        <div>
                          <div className="profile-err"></div>
                          <div className = "button-div">
                            {/* <FollowButton reload={this.props.reload} uploaderID={this.state.uploaderID} connectionData={this.state.connectionData} connectionID={this.state.connectionID} getConnectionData={this.getConnectionData}/> */}

                            {/* <MessageButton /> */}

                            <SpanishBlockButton reload={this.props.reload} uploaderID={this.state.uploaderID} connectionData={this.state.connectionData} connectionID={this.state.connectionID} getConnectionData={this.getConnectionData}/>
                          </div>
                        </div>
                        )
                      }

                  </div>

                  
              </div>
            </div>

            
      )
      }
      else if (this.state.blockedByVistor){
        return (
          <div className = "body">

              <div className = "block">

                  <div id = {image} className = "profile">
                      <SpanishUserInfo points = {this.state.points} uploaderID={this.state.uploaderID} ismyprofile={this.state.ismyprofile}/>
                      <div className="profile-err-NotFound">
                          <Alert color="red" text="Has bloqueado a este usuario!"/>
                      </div>

                      { (this.state.ismyprofile) ?
    
                        (   
                              null

                        ) : (
                        <div>
                          <div className="profile-err"></div>
                          <div className = "button-div">
                            {/* <FollowButton reload={this.props.reload} uploaderID={this.state.uploaderID} connectionData={this.state.connectionData} connectionID={this.state.connectionID} getConnectionData={this.getConnectionData}/> */}

                            {/* <MessageButton /> */}

                            <SpanishBlockButton reload={this.props.reload} uploaderID={this.state.uploaderID} connectionData={this.state.connectionData} connectionID={this.state.connectionID} getConnectionData={this.getConnectionData}/>
                          </div>
                        </div>
                        )
                      }

                  </div>

                  
              </div>
            </div>

            
      )
      }
      else if (this.state.userFound) {
        if (this.state.currentDate != null) {
          const nextDay = new Date(this.state.currentDate); // create a new date object with the current time
          nextDay.setHours(this.state.currentDate.getHours() + 24); // add 24 hours to the time object
        }
          return (
              <div className = "body">
  
                  <div className = "block">
  
                      <div id = {image} className = "profile">
                          <SpanishUserInfo points = {this.state.points} uploaderID={this.state.uploaderID} ismyprofile={this.state.ismyprofile}/>
                          

                          { (this.state.ismyprofile) ?
                            (   <>  
                                  {this.state.addedPoints ? (
                                      <div className="profile-err">
                                          <Alert color="green" text={"¡Has ganado 10xp! ¡Vuelve mañana a las " + new Date(this.state.currentDate.getTime() + (24 * 60 * 60 * 1000)) + " para más!"} />
                                      </div>
                              ) : (<>
                                  </>) }
                                </>

                            ) : (
                            <div>
                              <div className="profile-err"></div>
                              <div className = "button-div">
                                <SpanishFollowButton reload={this.props.reload} uploaderID={this.state.uploaderID} connectionData={this.state.connectionData} connectionID={this.state.connectionID} getConnectionData={this.getConnectionData}/>
    
                                {/*<MessageButton />*/}
    
                                <SpanishBlockButton reload={this.props.reload} uploaderID={this.state.uploaderID} connectionData={this.state.connectionData} connectionID={this.state.connectionID} getConnectionData={this.getConnectionData}/>
                              </div>
                            </div>
                            )
                          }
  
                      </div>
  
                      
      <div className = "mygoalsblock">

        <div className = "goals">

        <div className = "bigger-box2" id = "bigger-box">

          <div className = "progress-goals" id = "title">
            {console.log("GOALS " + this.state.goals)}
          <img src = {sprout} alt = "sprout icon" id = "sprout"/><h19>Metas en Progreso</h19>
          </div>
          <div className = "render-goals2" id = "render-goals">
            <ul className="goals-list"> 
              {this.state.goals
                  .filter((goal) => goal.status === "inprogress")
                  .map((goal) => (
                    <div className = "goal-box2" id = "goal-box" onClick={ () => this.handleGoalItemClick}> 
                      <img src = {no_check} alt = "check mark" id = "check" onClick={() => this.handleGoalCompleted(goal)}/>
                      <h5 key={goal.id}>{goal.title}</h5>
                    </div>
              ))}
            </ul>
          </div>
        </div>

        <div className = "bigger-box" id = "bigger-box">

            <div className = "completed-goals" id = "title">
            <img src = {flower} alt = "flower icon" id = "flower"/><h19>Completados Metas</h19>
            </div>
            <div className = "render-goals" id = "render-goals">
              <ul className="goals-list"> 
              {this.state.goals
              .filter((goal) => goal.status === "completed")
              .map((goal) => (
                <div className = "goal-box" id = "completed"> 
                  <img src = {check} alt = "check mark" id = "check"/>
                  <h5 id="text" key={goal.id}>{goal.title}</h5>
                </div>
              ))}
              </ul>

            </div>
        </div>
      </div>
  
      </div>
  
        </div>
        
    </div>
          )
      }
      else if (!this.state.userFound & localStorage.getItem("loggedIn") === "true" & this.state.loaded){
        return (
          <div className = "body">
              <div className = "block">
                  <div id = {image}  className = "profile">
                      <div className="profile-err-NotFound">
                        <Alert color="red" text="Usuario no Encontrado"/>
                      </div>
                      <div className = "button-div">
                        {
                        /*<FollowButton />

                        <MessageButton />

                        <BlockButton />*/
                        }
                      </div>
                  </div>
              </div>
          </div>
        )
      }
      else if (!(localStorage.getItem("loggedIn") === "true")){
        return (
          <div className = "body">
              <div className = "block">
                  <div id = {image}  className = "profile">
                      <div className="profile-err-NotFound">
                        <Alert color="red" text="Por favor inicie sesión para ver perfiles"/>
                      </div>
                      <div className = "button-div">
                        {
                        /*<FollowButton />

                        <MessageButton />

                        <BlockButton />*/
                        }
                      </div>
                  </div>
              </div>
          </div>
        )
      }
    }
}
export default SpanishProfilePage;