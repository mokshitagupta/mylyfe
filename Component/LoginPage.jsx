import React from "react";
import "../LoginPage.css";
import "../App.css";
import background from "../assets/Login-Background.svg";
import logimgM from "../assets/BackgroundM.svg";
import Footer from "./Footer";
import Alert from "./Alert";
import backgroundDARK from "../assets/Login-BackgroundDARK.svg"
import backgroundMDARK from "../assets/BackgroundMODARK.svg";
import {
    Link
 } from 'react-router-dom';

 function getMode() {
    const theme = localStorage.getItem('mode')
    var store = document.querySelector(':root');
    var value = getComputedStyle(store);
    if (theme) {
  
      if (theme == "light") {
        store.style.setProperty( '--button-login', '#34A853');
        store.style.setProperty('--login-hover', '#2b7f41');
        store.style.setProperty('--text-color', 'black');
        store.style.setProperty('--button-text', 'black');
      }
      else if (theme == "dark") {
        store.style.setProperty( '--button-login', '#443FEA');
        store.style.setProperty('--login-hover', '#2825A0');
        store.style.setProperty('--text-color', 'white');
        store.style.setProperty('--button-text', 'white');
      }
      return theme;
    }
    console.log("hey it's", theme, "in here")
  }
  
class LoginPage extends React.Component {
    
    constructor(input){
        console.log("input is", input)
        super(input);
        this.input = input
        this.state = {
            email: "",
            password: "",
            error: "",
            isError: false,
        };
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.doSubmit = this.doSubmit.bind(this);
        this.changeLogin = this.changeLogin.bind(this);
    }
    updateEmail(e){
        this.setState({email: e.target.value})
    }
    updatePassword(e){
        this.setState({password: e.target.value})
    }


    changeLogin = () => {
        console.log("new input is", this.input)
        this.input.onSuccess("")
    }
    async doSubmit(e){
        e.preventDefault();
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(this.state.email)){
            this.setState({isError: true});
            this.setState({error: "Please enter a valid email!"});
            return false;

    }

        try{
            let body = JSON.stringify({email: this.state.email, password: this.state.password});
            let invalid = false;
            const res = fetch("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/auth/login", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: body
            })
            .then((result) =>  {
                console.log(result)
                if (result.status === 401 || this.state.email === "" || this.state.password === ""){
                    invalid = true
                    
                    //Bad request somehow
                    console.log("HTTP Code 400: Bad Request");
                    this.setState({isError: true});
                    this.setState({error: "Invalid login/password. Please try again."})
                    return null
                }
                else if (result.status === 400){
                    //Either email, password or both are incorrect
                    invalid = true
                    
                    console.log("HTTP Code 401: Invalid Account");
                    this.setState({isError: true});
                    this.setState({error: "Account could not be found. Please try again."})
                    return null
                }
                else if(result.status != 200){
                    //Uncaught error
                    invalid = true
                    
                    console.log("Unknown error has occured. HTTP Code " + result.status);
                    this.setState({isError: true});
                    this.setState({error: "Unknown error."})
                    return null
                }
                return result
            })
            .then((response) =>  {
                if(response == null){
                    return null
                }
                return response.json()
            })
            .then((data) => {
                if(data == null){
                    console.log("Login Page: logged in but but data was null");
                }


                localStorage.setItem("token", data.token);
                console.log("new token", data.token)
                localStorage.setItem("user", data.userID);
                localStorage.setItem("email", this.state.email);
                this.setState({
                    sessiontoken: data.token,
                    userID: data.userID
                  });
                console.log(data)   
                this.changeLogin();
                // return <Link to="/homepage"></Link>
                localStorage.setItem("loggedIn", true);
                localStorage.setItem("name", this.state.email.split("@")[0]);
                this.props.login();
                window.location.href = "/hci/teams/aquafit/profile/" + data.userID;  
        //         
        }
        )
        }
        catch(error){
            console.log(error);
        }
        console.log(e)
    }

    const 
    
    render() {
        const theme = getMode();
        let image;
        let image2;
        if (theme == "dark") {
            image = <img src= {backgroundDARK} alt="background" className='background'/>
            image2 = <img src= {backgroundMDARK} alt="background" className='backgroundM'/>
        }
        else {
            image = <img src= {background} alt="background" className='background'/>
            image2 = <img src= {logimgM} alt="background" className='backgroundM'/>
        }
        return (
            <div className="login-container">
            <div className = "bg">
                {image}
                {image2}
                <div className = "welcome">
                    <div className = "mebold2"><p>Welcome Back!</p></div>
                    <p>Let's make today a good one!</p>
                    <br></br>
                    <p>If you don't have an account,</p>
                    <p>you can create one <a href="/hci/teams/aquafit/register" className = "link">here!</a></p>
                </div>
                
                <div className = "login">
                <div className="login-err">
                    <Alert id="error" color={this.state.isError ? "red" : ""} text={this.state.error}/>
                </div>
                    <form className = "Login-form" onSubmit={this.doSubmit}>
                        <div className = "form-Content">
                            <input type = "text" 
                                placeholder = "Enter Email"
                                value = {this.state.email}
                                onChange = {this.updateEmail}
                            />
                        </div>
                        <div className = "form-Content">
                            <input type = "password" 
                                placeholder = "Enter Password"
                                value = {this.state.password}
                                onChange = {this.updatePassword}
                            />
                        </div>
                        <div className = "forgotPass">
                            <a href = "/hci/teams/aquafit/getEmail" id = "forgotPassword">Forgot password?</a>
                        </div>
                        <br></br>
                        <button id = "user-button" >Sign in</button>
                        
                    </form>
                </div>
            </div>
            
            <Footer/>
            </div>
        )
    }
}
export default LoginPage