import React from "react";
import '../../profilePage.css';
import message from '../../assets/msg.svg';

class MessageButton extends React.Component {

    render() {

        return (
            <button className = "message-button" value = "Message" id = "user-button2" onClick = {messageUser}>
                <img src = {message} alt = "message user" id = "msg"/>
                <h20>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Message</h20>
            </button>
        )
    }
}

function messageUser() {
    alert('This will open up a message box.');
}

export default MessageButton