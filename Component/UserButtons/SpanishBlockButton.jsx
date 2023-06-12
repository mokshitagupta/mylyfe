import React from "react";
import '../../profilePage.css';
import block from '../../assets/x.svg';

class SpanishBlockButton extends React.Component {

    state = { status: true }

    constructor(props) {
        super(props);

        this.state = {
            status: this.props.connectionData.blocked
        };
        this.handleBlock = this.handleBlock.bind(this);
        this.handleUnblock = this.handleUnblock.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (this.props.connectionData.blocked !== prevProps.connectionData.blocked) {
            this.setState({status: this.props.connectionData.blocked})
        }
    }

    handleBlock = () => {
        console.log("SENDING BLOCK REQUEST");
        const new_attributes = {
            ...this.props.connectionData,
            blocked: true
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
                this.props.reload();
                window.location.reload(true);
            }
        })
        this.props.getConnectionData();
        this.props.reload();
        console.log("Blocked");
    }

    handleUnblock = () => {
        console.log("SENDING UNBLOCK REQUEST")
        const new_attributes = {
            ...this.props.connectionData,
            blocked: false
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
        console.log("Unblocked");
    }

    render() {

        const { status } = this.state;
        return (
            <>
                {!status ? (
                    <button className = "block-button" id = "user-button2" onClick = {() => this.handleBlock()}>
                        <img src = {block} alt = "block user" id = "block"/>
                        {status ? <h20>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;Bloquear</h20> : <h20>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;Bloquear</h20>}
                    </button>
                ) : (
                    <button className = "block-button" id = "user-button2" onClick = {() => this.handleUnblock()}>
                        <img src = {block} alt = "block user" id = "block"/>
                        {status ? <h20>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;Desatascar</h20> : <h20>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;Desatascar</h20>}
                    </button>
                )
                }
            </>

        )
    }
}

export default SpanishBlockButton