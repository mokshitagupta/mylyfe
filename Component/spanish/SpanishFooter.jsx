import React from "react";
import "../../App.css";
import { Link } from 'react-router-dom';

export default class Footer extends React.Component {
    render() {
        return (

            <div>
                <footer className = "footer">
                    <Link to = "/aboutus" relative="path"><a className = "aboutus"> Sobre nosotras </a></Link>
                </footer>
                <footer className = "footer2">
                    <Link to = "/styleguide" relative="path"><a className = "styleguide"> Guía de estilo </a></Link>
                </footer>
            </div>

         )
    }
}