import React from 'react';
import "../MyGoals.css";
import Alert from "./Alert";

export default class GoalDetailsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goalTitleInput: "",
      goalDateInput: "",
      goalDescriptionInput: "",
      alert: "",
      error: "",
      isError: false,
    }

    this.handleEditGoal = this.handleEditGoal.bind(this);
    this.handleGoalDelete = this.handleGoalDelete.bind(this);
    this.handleGoalTitleChange = this.handleGoalTitleChange.bind(this);
    this.handleGoalDateChange = this.handleGoalDateChange.bind(this);
    this.handleGoalDescriptionChange = this.handleGoalDescriptionChange.bind(this);
  }

  handleGoalTitleChange = (event) => {
    this.setState({
      goalTitleInput: event.target.value
    })
  }

  handleGoalDateChange = (event) => {
    console.log("EVENT TARGET DATE", event.target.value)
    this.setState({
      goalDateInput: event.target.value
    })
  }

  handleGoalDescriptionChange = (event) => {
    this.setState({
      goalDescriptionInput: event.target.value
    })
  }

  componentDidMount(){
    this.setState({
      goalTitleInput: this.props.goal.title,
      goalDateInput: this.props.goal.date,
      goalDescriptionInput: this.props.goal.description
    })
  }
  componentDidUpdate(prevProps) {
    if (prevProps.goal != this.props.goal) {
      this.forceUpdate()
    }
  }
  async handleGoalDelete() {
    console.log("Delete Goal")
    console.log("THIS IS POST ID", this.props.goal.postID)

    let res = await fetch(`https://webdev.cse.buffalo.edu/hci/api/api/aquafit/posts/${this.props.goal.postID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        });
      console.log("we received this as response " + res.status)
      if (res.status === 204) {
        console.log('Goal successfully deleted!');
        this.props.handleModalClose();
        this.props.handleGoalDelete(this.props.goal);
      } else {
        console.log('Error deleting goal:', res.status, res.statusText);
        // TODO: Display an error message to the user
      }
      window.location.reload(false);
    } 
    catch (error) {
      console.error('Error deleting goal:', error);
      // TODO: Display an error message to the user
    }
  

  async handleEditGoal() {
    if (this.state.goalTitleInput == "") {
      this.setState({isError: true});
      this.setState({error: "Please add a goal title."})
      return
    }
    if (this.state.goalDateInput == "") {
      this.setState({isError: true});
      this.setState({error: "Please add a date."});
      return
    }
    this.setState({isError: false});
      let status = null
      let goalDate = new Date(this.state.goalDateInput);
      let today = new Date();
      let diffTime = goalDate.getTime() - today.getTime();
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      console.log("status ******", diffDays, this.state.goalDate)
      if (diffDays >= 7) {
        status = 'upcoming';
      } else {
        status = 'inprogress';
      }

      let res = await fetch(`https://webdev.cse.buffalo.edu/hci/api/api/aquafit/posts/${this.props.goal.postID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          authorID: localStorage.getItem("user"),
          content: "goal",
          attributes: {
            title: this.state.goalTitleInput,
            date: this.state.goalDateInput,
            description: this.state.goalDescriptionInput,
            status: status
          }
        })
      });
      console.log("we received this as response " + res.status)
      if (res.status === 200) {
        console.log('Goal successfully updated!');
        this.props.handleModalClose();
      } else {
        console.log('Error updating goal:', res.status, res.statusText);
        // TODO: Display an error message to the user
      }
      window.location.reload(false);
    } catch (error) {
      console.error('Error updating goal:', error);
      // TODO: Display an error message to the user
    }

  render() {
    return (

            <div
            className="modal"
          >
            <div className="modal-content2">
            <div className="goal-err">
            <Alert id="error" color={this.state.isError ? "red" : ""} text={this.state.error}/>
        </div>
              <span className="close" onClick={this.props.handleModalClose}>  
                &times;
              </span>
              
              <div className="input-container">
              <label className="input-label">Goal Title:</label>
              <input
              
                className="input-field"
                type="text"

                value= {this.state.goalTitleInput}
                onChange={this.handleGoalTitleChange}
              />
            </div>
            <div className="input-container">
              <label className="input-label">Date:</label>
              <input
                className="input-field"
                type="date"
                value={this.state.goalDateInput}
                onChange={this.handleGoalDateChange}
              />
            </div>
            <div className="input-container">
            <label className="input-label">Description:</label>
              <textarea
                className="input-field textarea"
                placeholder="Tell us more..."
                value={this.state.goalDescriptionInput}
                onChange={this.handleGoalDescriptionChange}
              />
            </div>
            <div className = "buttonsmodal">
            <button className="addBtn" onClick={ () => this.handleEditGoal(this.props.goal)} >
              Save
            </button>
        
            <button className = "deleteBtn" id = "deleteBtn" onClick = {() => this.handleGoalDelete(this.props.goal)}>
                Delete
            </button>
            </div>
              </div>
            </div>
        )
  }
}
