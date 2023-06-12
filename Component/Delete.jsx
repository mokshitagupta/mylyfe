import React from "react";
import '../UpdateProfile.css';
import '../App.css';
import FollowButton from './UserButtons/FollowButton.jsx';
import BlockButton from './UserButtons/BlockButton.jsx';
import MessageButton from './UserButtons/MessageButton.jsx';
import FollowList from './FollowList.jsx';
import UserInfo from './UserInfo.jsx';
import Goals from './Goals.jsx';
import Alert from "./Alert";
import user_img from '../assets/user_pic.svg';
import edit from '../assets/customize.png';

export default class Delete extends React.Component {
    constructor(props) {
        
        super(props);
        console.log("new instance",this.props.openModal)
        this.state = {openModal: this.props.openModal, profilePicture: this.props.profilePicture}
        console.log("new inst",this.state )
        this.modalRef = React.createRef();
        this.handleModalClose = this.handleModalClose.bind(this)
        
        // this.handleClickOutside = this.handleClickOutside.bind(this);
        // this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    // componentDidMount() {
    //     document.addEventListener("mousedown", this.handleClickOutside);
    // }

    handleModalClose = () => {
        this.props.closeModal();
      };

    handleSubmit(){
        console.log(localStorage.getItem("token"))
        fetch("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/users/"+ localStorage.getItem("user") +"?relatedObjectsAction=delete", {
            method:"DELETE",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            }
        })
        .then(
            (response) => {
                if(response.status == 204){
                    localStorage.setItem("loggedIn", false)
                    window.location.href = "/hci/teams/aquafit/"
                }else{
                    console.log(response)
                }

            }
        )
    }

    // componentWillUnmount() {
    //     document.removeEventListener("mousedown", this.handleClickOutside);
    //     document.removeEventListener("keydown", this.handleKeyPress);
    // }
    
    // handleClickOutside(event) {
    //     console.log(this.modalRef);
    //     if (!this.modalRef.current.contains(event.target) && this.props.openModal == true) {
    //       this.props.closeModal();
    //     }
    // }

    // handleKeyPress = (event) => {
    //     if(event.key === 'Escape'){
    //       this.props.closeModal();
    //     }
    //   }
    
    render() {
        console.log("testing modal", this.state.openModal)
        if(this.state.openModal){
            return(
            <div className="upload-overlay">
                <div className="del-pop-up" ref={this.modalRef}>
                <span className="close3" onClick={() => {this.setState({openModal : false}); this.props.closeModal()}} >
                    &times;
                </span>
                    <p1 > We're so sad to see you go . . .</p1>
                    <p1 className="del-warning">This action can't be undone! Are you sure you want to continue?</p1>
                    <button className="delete-bttn" onClick={this.handleSubmit}>
                        Delete Account
                    </button>
                    </div>

            </div>
            )

        }else{
            return
        }
}

}
