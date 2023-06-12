import React from "react";
import '../../profilePage.css';
import follow from '../../assets/follow.svg';

class FollowButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            status: this.props.connectionData.followed
        };
        this.handleFollow = this.handleFollow.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.connectionData.followed !== prevProps.connectionData.followed) {
            this.setState({status: this.props.connectionData.followed})
        }
    }
    
    handleFollow = () => {
        console.log("SENDING FOLLOW REQUEST");
        const new_attributes = {
            ...this.props.connectionData,
            followed: true
        }
        console.log("OLD DATA " + this.props.connectionData);
        const body = JSON.stringify({fromUserID: parseInt(localStorage.getItem("user")), toUserID: this.props.uploaderID, attributes: new_attributes});
        console.log("THIS IS WHAT IS SENT TO THE SERVER " + body);
        fetch("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/connections/" + this.props.connectionID.toString(), {
            method: "PATCH",
            headers:{
                "Authorization":
                `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
            body: body

        }).then( result => {
            if (result.status === 200) {
                this.props.getConnectionData();
                this.props.reload()
            }
        })
        this.props.getConnectionData();
        this.props.reload();
        console.log("Followed");
    }

    handleUnfollow = () => {
        console.log("SENDING UNFOLLOW REQUEST")
        const new_attributes = {
            ...this.props.connectionData,
            followed: false
        }
        const body = JSON.stringify({fromUserID: parseInt(localStorage.getItem("user")), toUserID: this.props.uploaderID, attributes: new_attributes});
        fetch("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/connections/" + this.props.connectionID, {
            method: "PATCH",
            headers:{
                "Authorization":
                `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
            body: body

        }).then( result => {
            if (result.status === 200) {
                this.props.getConnectionData();
                this.props.reload()
                window.location.reload(true);
            }
        })
        this.props.getConnectionData();
        this.props.reload();
        console.log("Unfollowed");

    }

    render() {

        const { status } = this.state;

        return (
            <>
                {!status ? (
                    <button className = "follow-button" id = "user-button2" onClick = {() => this.handleFollow()}>
                        <img src = {follow} alt = "follow user" id = "follow"/>
                        <h20>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;Follow</h20>
                    </button>
                ) : (
                    <button className = "follow-button" id = "user-button2" onClick = {() => this.handleUnfollow()}>
                        <img src = {follow} alt = "follow user" id = "follow"/>
                        <h20>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;Unfollow</h20>
                    </button>
                )
                }
            </>

        )
    }
}

export default FollowButton