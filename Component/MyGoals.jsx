import React from "react";
import "../MyGoals.css";
import target from "../assets/target.svg";
import sprout from "../assets/3.svg";
import bloom from "../assets/2.svg";
import bloomD from "../assets/2DARK.svg"
import flowerD from "../assets/1DARK.svg"
import flower from "../assets/1.svg";
import FollowList from "./FollowList.jsx";
import Goals from "./Goals.jsx";
import '../profilePage.css';
import check from '../assets/check.svg';
import no_check from '../assets/nocheck.svg';
import Alert from "./Alert";
import targetDARK from "../assets/targetDARK.svg";
import "../Alert.css";
import GoalDetailsModal from "./GoalDetailsModal";
import UserInfo from "./UserInfo";
import help from "../assets/helpme.svg";
import examplego from "../assets/examplego.svg";
import examplego2 from "../assets/goalexa.svg"

function getMode() {
  const img2 = new Image();
  const img1 = new Image();

  img1.src = "./assets/nightforest.svg";
  img2.src = "./assets/nightforest.svg";

  const theme = localStorage.getItem('mode')
  var store = document.querySelector(':root');
  var value = getComputedStyle(store);
  if (theme) {

    if (theme == "light") {
      store.style.setProperty( '--profile-background', 'white');
      store.style.setProperty('--goal-title', '#34A853');
      store.style.setProperty('--goal-circle', '#34A853');
      store.style.setProperty('--button-color', 'white');
      store.style.setProperty('--button-hover', '#efefef');
      store.style.setProperty('--button-text', 'black');
      store.style.setProperty('--goal-box', '#efefef');
    }
    else if (theme == "dark") {
      store.style.setProperty( '--profile-background', '#181826');
      store.style.setProperty('--goal-title', '#443FEA');
      store.style.setProperty('--goal-circle', '#443FEA');
      store.style.setProperty('--button-color', '#0f0f1a');
      store.style.setProperty('--button-hover', '#070722');
      store.style.setProperty('--button-text', 'white');
      store.style.setProperty('--goal-box', '#0f0f1a');
    }
    return theme;
  }
  console.log("hey it's", theme, "in here")
}

function AddGoalModal(props){
return(
  <div
    className="modal"
  >
    <div className="modal-content2">
      <span className="close" onClick={props.handleModalClose}>  
        &times;
      </span>
      
      
      <div className="input-container">
      <label className="input-label">Goal Title:</label>
      <input
        className="input-field"
        type="text"
        value={props.goalTitle}
        onChange={props.handleGoalTitleChange}
      />
    </div>
    <div className="input-container">
      <label className="input-label">Date:</label>
      <input
        className="input-field"
        type="date"
        value={props.goalDate}
        onChange={props.handleGoalDateChange}
      />
    </div>
    <div className="input-container">
    <label className="input-label">Description:</label>
      <textarea
        className="input-field textarea"
        placeholder="Tell us more..."
        value={props.goalDescription}
        onChange={props.handleGoalDescriptionChange}
      />
    </div>
    <button className="addBtn2" onClick={props.handleGoalSubmit}>
      Add!
    </button>
  </div>
</div>
)
}

function HelpModal(props){
  return(
    <div
      className="modal"
    >
      <div className="modal-content2">
        <span className="close" onClick={props.handleModalClose}>  
          &times;
  </span>
        <h29>Goals that have a due date less than a week from the current date will be placed in-progress.
          Otherwise, they are placed in upcoming.
        </h29>
        <h29>To move a goal into completed, click the green circle on the goal you wish to move.</h29>
        <img src= {examplego} className="example1"/>

        <h29>To edit a goal, click the text on the goal you wish to edit.</h29>
        <img src= {examplego2} className="example1"/>
    </div>
  </div>
  )
  }

export default class MyGoals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showModal5: false,
      goalTitle: "",
      goalDate: "",
      goalDescription: "",
      goals: [],
      selectedGoal: null,
      editModal: false,
      userData: null,
      points: null,
      alert: "",
      error: "",
      isError: false,
    };

    this.handleGoalSubmit = this.handleGoalSubmit.bind(this)
    this.loadingPosts = this.loadingPosts.bind(this)
    this.handleAddGoalClick = this.handleAddGoalClick.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleGoalTitleChange = this.handleGoalTitleChange.bind(this)
    this.handleGoalDateChange = this.handleGoalDateChange.bind(this)
    this.handleGoalDescriptionChange = this.handleGoalDescriptionChange.bind(this)
    this.handleGoalItemClick = this.handleGoalItemClick.bind(this)
    this.handleGoalCompleted = this.handleGoalCompleted.bind(this)
    this.handleDeleteGoal = this.handleDeleteGoal.bind(this)
    this.getUserData = this.getUserData.bind(this);
    this.add = this.add.bind(this);
    this.alert = this.alert.bind(this);
    // this.getLevel = this.getLevel.bind(this);
  }

  componentDidMount(){
    this.loadingPosts();
    this.getUserData();
  }

  alert(message) {
    this.setState({alert: message})
    setTimeout(() => {
      this.setState({alert: ""});
    }, 2500);
  }

  loadingPosts(){
    const authorID = localStorage.getItem("user");
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
          });
        }
      }
    })
  }



  getUserData() {
    const authorID = localStorage.getItem("user");
    // fetch the user data, and extract out the attributes to load and display
    fetch("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/users/" + authorID,  {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem("token")
      }
    })
    .then(res => {
      if (res.status == 404 || res.status != 200){
        // alert("Error!")
      }else{
        return res.json()
      }
    })
      .then(
        result => {
          if (result) {
            console.log("YOUR RES " + JSON.stringify(result.attributes))
            if (result.email !== "") {
                this.setState({userData: result.attributes})
                this.setState({points: this.state.userData.points})
                console.log("YOUR USER DATA " + JSON.stringify(this.state.userData));
                // this.add(5)
            } 
          }
        })
  }




  add(p) {
    const authorID = localStorage.getItem("user");
    console.log("ADDED POINTS YOU ARE: " + authorID)
    console.log("ADDED POINTS BEFORE: " + this.state.userData.points)
    fetch("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/users/" + authorID, {
        method: "PATCH",
        headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        attributes: {
            ...this.state.userData,
            points: this.state.userData.points + p,
        }
        })
    }).then((res) => {
      if (res.status === 200) {
        this.alert("You gained " + p + " points!")
      }
      this.getUserData();
      res.json().then((res) => {
        console.log("ADDED POINTS AFTER: " + JSON.stringify(res.attributes.points))
      })
    })
}


  handleAddGoalClick = () => {
    this.setState({ showModal: true,
    selectedGoal: null,
    })
  };

  handlehelp = () => {
    this.setState({ showModal5: true,
    })
  };

  handleModalClose = () => {
    this.setState({ showModal: false, 
      showModal5: false,
      isError: false,
      editModal: false,
      selectedGoal: null,
      goalTitle: '',
      goalDate: '',
      goalDescription: '',
   });
  };

  handleGoalTitleChange = (event) => {
    this.setState({ goalTitle: event.target.value });
  };

  handleGoalDateChange = (event) => {
    this.setState({ goalDate: event.target.value });
  };

  handleGoalDescriptionChange = (event) => {
    this.setState({ goalDescription: event.target.value });
  };

  handleGoalCompleted = (goal) => {
    this.add(5);
    let newGoals = this.state.goals.filter((g) => g !== goal);
    let completedGoal = {...goal, status: "completed"};
    console.log(newGoals);
    console.log(completedGoal);
    fetch("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/posts/"+completedGoal.postID, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem("token")
      },
      body: JSON.stringify({
        attributes: {
          type: "post", 
          title: completedGoal.title,
          date: completedGoal.date,
          description: completedGoal.description,
          status: "completed"
        }
      })
    })
    .then((res)=> {
      console.log("PATCH: we received this as response " + res.status)
      return res.json()
    })
    .then((result) => {
      console.log("Completed PATCH result", result);
    })

    this.setState({
      goals: [...newGoals, completedGoal],
    });
  };

  handleGoalItemClick(goal) {
    console.log('Goal is clicked');
    this.setState({
      selectedGoal: goal,
      editModal: true,
      goalTitle: goal.title,
      goalDate: goal.date,
      goalDescription: goal.description,
    })
    console.log(this.state)
  }

  handleDeleteGoal = (goal) => {
    // Remove the goal from the list of goals
    const newGoals = this.state.goals.filter(g => g.postID !== goal.postID);
    this.setState({ goals: newGoals });
  }

  async handleGoalSubmit() {
    // TODO: handle goal submission
    console.log("Goal submitted");
  
    // Make the API call
    // TODO: Update the UI to reflect the new goal
    if (this.state.goalTitle == "") {
      this.setState({isError: true});
      this.setState({error: "Please add a goal title."})
      return
    }
    if (this.state.goalDate == "") {
      this.setState({isError: true});
      this.setState({error: "Please add a date."});
      return
    }
    this.setState({isError: false});
    let newGoal = {
      title: this.state.goalTitle,
      date: this.state.goalDate,
      description: this.state.goalDescription,
    };
    // Check if the new goal should also be in the upcoming list
    let goalDate = new Date(this.state.goalDate);
    let today = new Date();
    let diffTime = goalDate.getTime() - today.getTime();
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log("status ******", diffDays, this.state.goalDate)
    if (diffDays >= 7) {
      newGoal.status = 'upcoming';
    } else {
      newGoal.status = 'inprogress';
    }

    console.log("status ******", newGoal.status)
    await fetch('https://webdev.cse.buffalo.edu/hci/api/api/aquafit/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("token")
      },
      body: JSON.stringify({
        authorID: localStorage.getItem("user"),
        content: "goal",
        attributes :
        {type:"post",
        title: this.state.goalTitle,
        date: this.state.goalDate,
        description: this.state.goalDescription,
        status: newGoal.status,
        likedBy: []
        }
      })
    })
    .then((res)=> {
      console.log("we received this as response " + res.status)
      if (res.status === 201) {
        console.log('Goal successfully added!');
      } 
      else if (res.status === 400){
        alert("Invalid Post!");
      }
      else {
        console.log('Error adding goal:', res.status, res.statusText);
        // TODO: Display an error message to the user
      }
      return res.json()
    })
    .then((result) => {
      console.log("Return value of create new post was ", result);
      newGoal.postID = result.id
      this.setState({
        goals: [...this.state.goals, newGoal],
      });
    })
  
    
    // Reset the form fields and close the modal
    this.setState({
      showModal: false,
      goalTitle: '',
      goalDate: '',
      goalDescription: '',
    });
    return this.state.isError;
  }
  
  render() {
    const theme = getMode();
    let image;
    let targetimg;
    let flowerimg;
    //let bloom;
    if (theme == "dark") {
        image =  "topborder2"
        targetimg = <img src = {targetDARK} alt = "target icon" id = "target"/> 
        flowerimg = <img src = {flowerD} alt = "flower icon" id = "flower"/>
        //flower = flowerD
        //bloom = bloomD
    }
    else {
        image = "topborder"
        targetimg = <img src = {target} alt = "target icon" id = "target"/>
        flowerimg = <img src = {flower} alt = "flower icon" id = "flower"/>
        //flower = flower
        //bloom = bloom
    }
    
    console.log(this.state.isError)
    let inProgressGoals = this.state.goals.filter(goal => goal.status === "inprogress");
    let upcomingGoals = this.state.goals.filter(goal => goal.status === "upcoming");
    let completedGoals = this.state.goals.filter(goal => goal.status === "completed");
    let numGoalsToAcheive = inProgressGoals.length + upcomingGoals.length;
    let numGoalsCompleted = completedGoals.length
    return (
      <div className="goalsbody">
      <div className="myGoals">
        {!(this.state.alert === "") ? (<>
        </>):
        (<></>)
        }
        {this.state.editModal == true ?           
        <GoalDetailsModal
            x = {console.log("THIS IS SELECTED GOAL", this.state.selectedGoal)}
            goal = {this.state.selectedGoal}
            handleModalClose = {this.handleModalClose}
            handleGoalDelete = {this.handleDeleteGoal}
          /> : null}

       <img src= {help} className="undo-img2" onClick = {() => this.handlehelp()}/>
        <div className = {image}>
        
        <div className = "goalblock" id="achieve">
          <h18 className="currentNum-text">Goals to Achieve</h18>
          <h1 className="currentNum-number">{numGoalsToAcheive}</h1>
          </div>
          <div className="user-info-goals">
            <UserInfo points = {parseInt(this.state.points)} uploaderID={localStorage.getItem("user")} ismyprofile={this.state.ismyprofile} mode={false}/>
            <button className = "addGoalBtn" id = "user-button4" onClick={this.handleAddGoalClick}>
            {targetimg}
            <h22>Add Goal</h22>
            </button>
          </div>
          

          <div className = "goalblock" id="completed">
            <h18 className="completedNum-text">Goals Accomplished</h18>
            <h1 className="completedNum-number">{numGoalsCompleted}</h1>
          </div>

        </div>

        <div className = "mygoalsblock">
          <div className = "goals">

          <div className = "bigger-box2" id = "bigger-box">

              <div className = "progress-goals" id = "title">
              <img src = {sprout} alt = "sprout icon" id = "sprout"/><h19>Goals in Progress</h19>
              </div>
              <div className = "render-goals2" id = "inprogress" >
                <ul className="goals-list"> 
                  {this.state.goals
                  .filter((goal) => goal.status === "inprogress")
                  .map((goal) => (
                    <div className = "goal-box2" id = "goal-box"> 
                      <img src = {no_check} alt = "check mark" id = "check" onClick={() => this.handleGoalCompleted(goal)}/>
                      <h5 onClick = {() => this.handleGoalItemClick(goal)} key={goal.id} >{goal.title}</h5>
                    </div>
                  ))}
                </ul>
              </div>
          </div>

          <div className = "bigger-box2" id = "bigger-box">

          <div className = "progress-goals" id = "title">
          <img src = {bloom} alt = "blooming icon" id = "bloom"/><h19>Upcoming Goals</h19>
          </div>
          <div className = "render-goals2" id = "upcoming">
            <ul className="goals-list">
              {this.state.goals
              .filter((goal) => goal.status === "upcoming")
              .map((goal) => (
                <div className = "goal-box2" id = "goal-box"> 
                  <img src = {no_check} alt = "check mark" id = "check" onClick={() => this.handleGoalCompleted(goal)}/>
                  <h5 onClick = {() => this.handleGoalItemClick(goal)} key={goal.id}>{goal.title}</h5>
              </div>
            ))}  
            </ul>
        </div>
      </div> 

        <div className = "bigger-box" id = "bigger-box">

          <div className = "completed-goals" id = "title">
          <img src = {flower} alt = "flower icon" id = "flower"/><h19>Completed Goals</h19>
          </div>
          <div className = "render-goals" id = "completed">
            <ul className="goals-list">
              {this.state.goals
              .filter((goal) => goal.status === "completed")
              .map((goal) => (
                <div className = "goal-box2" id = "goal-box"> 
                  <h5 onClick = {() => this.handleGoalItemClick(goal)} key={goal.id}>{goal.title}</h5>
                  <img src = {check} alt = "check mark" id = "check"/>
                </div>
            ))}
              </ul>
            </div>
          </div>
        </div>
    
        </div>

        <div className="goal-err">
            <Alert id="error" color={this.state.isError ? "red" : ""} text={this.state.error}/>
        </div>
        {this.state.showModal == true ? <AddGoalModal
        handleModalClose = {this.handleModalClose}
        goalTitle = {this.state.goalTitle}
        handleGoalTitleChange = {this.handleGoalTitleChange}
        goalDate={this.state.goalDate}
        handleGoalDateChange = {this.handleGoalDateChange}
        goalDescription={this.state.goalDescription}
        handleGoalDescriptionChange = {this.handleGoalDescriptionChange}
        handleGoalSubmit = {this.handleGoalSubmit}/>
         : null}
        {this.state.showModal5 == true ? <HelpModal        
        handleModalClose = {this.handleModalClose}
        /> : null}
      </div>

    </div>
  );
}
}