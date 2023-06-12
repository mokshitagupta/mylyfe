import React from "react";
import * as ReactDOM from 'react-dom';

import "../Alert.css";
import redAlert from "../assets/bad_alert.svg";
import greenAlert from "../assets/good-alert.svg";

//
export default function Alert(props) {
    let color = props.color;
    let text = props.text
    if (color === "red"){
        return(
            <div className="alert-container">
                <div className="alert-symbol">
                    <img className="alert-symbol-img" src={redAlert}></img>
                </div>
                <div className="red-message">
                    <h3 className="alert-text">{text}</h3>
                </div>
            </div>
        )
    }else if (color === "green"){
        return(
            <div className="alert-container">
                <div className="alert-symbol">
                    <img className="alert-symbol-img2" src={greenAlert}></img>
                </div>
                <div className="green-message">
                    <h3 className="alert-text">{text}</h3>
                </div>
            </div>
        )

    }else if (color === ""){
        return
    }
}