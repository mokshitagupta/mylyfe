import React from "react";
import "../App.css";
import { Link } from 'react-router-dom';

export default class Footer extends React.Component {
    render() {
        return (

            <div>
                <footer className = "footer">
                    <Link to = "/aboutus" relative="path"><a className = "aboutus"> About us </a></Link>
                </footer>
                <footer className = "footer2">
                    <Link to = "/styleguide" relative="path"><a className = "styleguide"> Style Guide </a></Link>
                </footer>
            </div>

         )
    }
}