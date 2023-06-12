import React from "react";
import '../profilePage.css';
import check from '../assets/check.svg';
import no_check from '../assets/nocheck.svg';

class Goals extends React.Component {

    render() {
        return (
            <div className = "goals">

            <div className = "bigger-box" id = "bigger-box">
                <div className = "completed-goals" id = "title">
                    <h19>Completed Goals</h19>
                </div>

                <div className = "render-goals" id = "render-goals">
                    <div className = "goal-box" id = "goal-box"> 
                        <img src = {check} alt = "check mark" id = "check"/>
                        <h5>Read a book</h5>
                    </div>
                    <div className = "goal-box" id = "goal-box"> 
                        <img src = {check} alt = "check mark" id = "check"/>
                        <h5>Go for a walk</h5>
                    </div>
                    <div className = "goal-box" id = "goal-box"> 
                        <img src = {check} alt = "check mark" id = "check"/>
                        <h5>Drink water</h5>
                    </div>
                </div>
            </div>

            <div className = "bigger-box2" id = "bigger-box">

                <div className = "progress-goals" id = "title">
                    <h19>Goals in Progress</h19>
                </div>

                <div className = "render-goals2" id = "render-goals">
                    <div className = "goal-box2" id = "goal-box"> 
                        <img src = {no_check} alt = "check mark" id = "check"/>
                        <h5>Drink water</h5>
                    </div>
                    <div className = "goal-box2" id = "goal-box"> 
                        <img src = {no_check} alt = "check mark" id = "check"/>
                        <h5>Lift Weights</h5>
                    </div>
                    <div className = "goal-box2" id = "goal-box"> 
                        <img src = {no_check} alt = "check mark" id = "check"/>
                        <h5>CSE370 Homework</h5>
                    </div>
                </div>

            </div>
        </div>

        )
    }
}

export default Goals