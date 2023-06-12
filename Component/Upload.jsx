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

 

export default class Upload extends React.Component {
    constructor(props) {
        
        super(props);
        console.log("new instance",this.props.openModal2)
        this.state = {openModal2: this.props.openModal2, profilePicture: this.props.profilePicture}
        console.log("new inst",this.state )
        this.modalRef = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this)
        // this.getProfilePictures = this.getProfilePictures.bind(this)
        this.deleteUpload = this.deleteUpload.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    deleteUpload(entry){
        var url = new URL(`https://webdev.cse.buffalo.edu/hci/api/api/aquafit/file-uploads/${entry.id}`)

        return (fetch(url.toString(), {
            method: "DELETE",
            headers:{
            "Authorization":
            `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((result) => result.json()))
     
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
        document.addEventListener("keydown", this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
        document.removeEventListener("keydown", this.handleKeyPress);
    }
    
    handleClickOutside(event) {
        console.log(this.modalRef);
        if (!this.modalRef.current.contains(event.target) && this.props.openModal2 == true) {
          this.props.closeModal();
        }
    }

    handleKeyPress = (event) => {
        if(event.key === 'Escape'){
          this.props.closeModal();
        }
      }
    
      
  handleModalClose = () => {
    this.props.closeModal();
  };
    
    
    handleSubmit() {

        const getProfilePictures = () =>{
            // const formData = new FormData();
            // formData.append("uploaderID", parseInt(localStorage.getItem("user")));
            // formData.append("attributes", JSON.stringify({path: "fileType", equals: "profile_picture"}));
            // formData.append("skip", 0)
            // formData.append("take", 100)
    
            var url = new URL("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/file-uploads?")
            url.searchParams.append('uploaderID', localStorage.getItem("user"))
            console.log(localStorage.getItem("user"))
            url.searchParams.append('attributes', JSON.stringify({path: "isProfilePic", equals: true}))
            url.searchParams.append("skip", 0)
            url.searchParams.append("take", 100)

            var ret
    
            console.log(url.toString())
            return fetch(url.toString(), {
                method: "GET",
                headers:{
                "Authorization":
                `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then((response)=>response.json())
            }

        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');
        var newId;

        formData.append("uploaderID", parseInt(localStorage.getItem("user")));
        formData.append("attributes", JSON.stringify({isProfilePic: true}));
        formData.append("file", fileField.files[0]);

        console.log(localStorage.getItem("token"), localStorage.getItem("user") )

        try {
            const response = fetch("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/file-uploads", {
              method: "POST",
              body: formData,
              headers:{
                "Authorization":
                `Bearer ${localStorage.getItem("token")}`
              }
            })
            .then((result) => {
                if(result.status == 400){
                    //user has not uploaded 
                }
                return result
            })
            .then((result) => result.json())
            .then((response) => {
                console.log("Success", response);
                newId = response.id
                
                console.log("changing modal", this.state.openModal2)
                this.setState({openModal2:false})

                var pfps = getProfilePictures()
                .then(
                    console.log("asynch hpromises: ", pfps)
                )
                console.log("promises: ", pfps)
                return pfps
                
            })
            .then( (pfps) => {
                console.log("got back",pfps)
                const len = pfps[1]
                for (let i = 0; i < len; i++){
                    let entry = pfps[0][i]
                    console.log("iterating over: ",entry)
                    console.log("id",localStorage.getItem("userID"))
                    if(entry.id == newId & (localStorage.getItem("user") == entry.uploaderID)){
                        console.log("found the profile picture")
                        this.getPicture(entry)
                        .then((result) => {
                            console.log("changing pictures")
                            this.setState({profilePicture: result.path})
                            this.props.onChangeName("https://webdev.cse.buffalo.edu/" + result.path)
                        })
                        continue
                    } else if(entry.id != newId & (localStorage.getItem("user") == entry.uploaderID)) {
                        this.deleteUpload(entry)
                    }
                    
                }
                this.props.closeModal();
                
            })
        
        
    }
    catch (error) {
        console.error("Error:", error);
      
    }
}
    
    getID(){
        return localStorage.getItem("user")
    }

    getPicture(entry){
        console.log("getting picture from:  ", entry)
        let id = entry.id
        var url = `https://webdev.cse.buffalo.edu/hci/api/api/aquafit/file-uploads/${id}`

        return fetch(url, {
            method: "GET",
            headers:{
            "Authorization":
            `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((result) => {
            if(result.status == 400){
                //user has not uploaded anything
            }
            return result
        })
        .then((result) => result.json())
    }
    render() {
        console.log("testing modal", this.state.openModal2)
        if(this.state.openModal2){
            return(
            <div className="upload-overlay">
                <div className="pop-up" ref={this.modalRef}>
                    <span className="close2" onClick={this.handleModalClose}>
                    &times;
                    </span>
                    <div className="input-area">
                        {/* <button className="close">x</button> */}
                        <input type="file" accept="png, jpg, jpeg, svg" className="upload-in"></input>
                    </div>
                    <button type="submit" className="upload-bttn" onClick={this.handleSubmit}>
                        Upload file
                    </button>

                </div>
            </div>
            )

        }else{
            return
        }
}

}
