import React from "react";
import '../../profilePage.css';
import message from '../../assets/msg.svg';

class SpanishMessageButton extends React.Component {

    render() {

        return (
            <button className = "message-button" value = "Message" id = "user-button2" onClick = {messageUser}>
                <img src = {message} alt = "message user" id = "msg"/>
                <h20>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Mensaje</h20>
            </button>
        )
    }
}

function messageUser() {
    alert('Esto abrirá un cuadro de mensaje.');
}

export default SpanishMessageButton