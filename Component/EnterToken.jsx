import React from "react";
import backgroundimg from '../assets/background.svg'
import '../enterToken.css';


class EnterToken extends React.Component {
render() {
    return (
        <div className = "token">
            <img src = {backgroundimg} alt ="background" className="backgroundToken"/>

            <input className="tokenInput" required type = 'text'/>
            <span className="token-placeholder"> Enter Token</span>

            <button className = "tokenBtn" > Submit </button>


        </div>
        )
    }
}
export default EnterToken;