import React from "react";
import background from '../assets/background.svg'
import fimgM from "../assets/BackgroundM.svg";
import '../ForgotPassword.css';
import Footer from "./Footer";
import basic_eye from '../assets/X_Icon.svg';
import nobasic_eye from '../assets/NoX_Icon.svg';
import backgroundDARK from '../assets/backgroundDARK.svg'
import backgroundMDARK from "../assets/BackgroundMODARK.svg";

function getMode() {
    const theme = localStorage.getItem('mode')
    var store = document.querySelector(':root');
    var value = getComputedStyle(store);
    if (theme) {
  
      if (theme == "light") {
        store.style.setProperty( '--button-submit', '#34A853');
        store.style.setProperty('--submit-hover', '#2b7f41');
      }
      else if (theme == "dark") {
        store.style.setProperty( '--button-submit', '#443FEA');
        store.style.setProperty('--submit-hover', '#2825A0');
      }
      return theme;
    }
    console.log("hey it's", theme, "in here")
  }
  

class ForgotPassword extends React.Component {
    constructor(input){
        super(input);
        this.state = {
            token: '',
            newpass: "",
            confirm: "",
            error: "",
            passType: "password",
            isError: false
        };
        this.updatePass = this.updatePass.bind(this);
        this.updateConfirm = this.updateConfirm.bind(this);
        this.updateToken = this.updateToken.bind(this);
        this.doSubmit = this.doSubmit.bind(this);
        this.showPassword = this.showPassword.bind(this);
    }

    updatePass(e){
        this.setState({newpass: e.target.value})
    }

    updateConfirm(e){
        this.setState({confirm: e.target.value})
    }

    updateToken(e){
        this.setState({token: e.target.value})
    }
    validate = (data, confirm) => {

        //check len
        if((data.length > 20 || data.length < 8)){
          this.setState({isError: true});
          this.setState({error: "Your password must be between 8 and 20 characters."});
          return false;
        }
        //needs to have lowercase
        const lstring = data.toUpperCase();
        if (lstring === data){
          this.setState({isError: true});
          this.setState({error: "Your password must have an lowercase letter."});
          return false;
        }
        //needs to have uppercase
        const ustring = data.toLowerCase();
        if (ustring === data){
          this.setState({isError: true});
          this.setState({error: "Your password must have a uppercase letter."});
          return false;
        }
    
        //need to have numbers
        let num = data.match(/\d/g)
        if (!num){
          this.setState({isError: true});
          this.setState({error: "Your password must have numbers."});
          return false
        }
    
        //confirm and given should be same
        if (confirm !== data){
          this.setState({isError: true});
          this.setState({error: "\nYour password isn't the same!"});
          return false
        }
    
        this.setState({isError: false});
        this.setState({error: ""});
        return true
      }
    
    async doSubmit(e){
        e.preventDefault();
        if(!this.validate(this.state.newpass, this.state.confirm)){
            return;
        }
        let bod = JSON.stringify({password: this.state.newpass, token: this.state.token});
        console.log(bod);
        let result = await fetch("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/auth/reset-password", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {'Content-Type': 'application/json'},
            body: bod
        })
        console.log(result);
        if(result.status === 401){
            alert("invalid token");
        }
        else if(result.status === 400){
            alert("Bad Request");
        }
        else{
            window.location.href = "/hci/teams/aquafit/login";
        }
    }
    
    showPassword() {
        if (this.state.passType === "password") {
          this.setState({passType: "text"})
        } else if (this.state.passType === "text") {
          this.setState({passType: "password"})
        }
      }
    
    render() {
      const theme = getMode();
      let image;
      let image2;
      if (theme == "dark") {
        image = <img src={backgroundDARK} alt="Register Background" className='background'/> 
        image2 = <img src= {backgroundMDARK} alt="background" className='backgroundM'/> }
      else {
        image = <img src={background} alt="Register Background" className='background'/> 
        image2 = <img src = {fimgM} alt ="background" className="backgroundForgotM"/> }
        return (
            <div className = "forgot">
                {image}
                {image2}

                <form className = "email-form" onSubmit={this.doSubmit}>

                        {this.state.passType === "password"?( 
                    <img src={basic_eye} alt = 'eye' className = "eye" onClick={this.showPassword}></img>
                    ):(
                    <img src={nobasic_eye} alt = 'eye'className = "eye2" onClick={this.showPassword}></img>
                    )}
                    <input className="newPass2" required type = 'password' onChange = {this.updateToken}/>
                    <span className="newPass2-placeholder"> Enter Token </span>
                    
                    <input className="newPass" required type ={this.state.passType} onChange = {this.updatePass}/>
                    <span className="newPass-placeholder"> Enter New Password </span>

                    <input className ="confirmPass" required type ={this.state.passType} onChange = {this.updateConfirm}/>
                    <span className ="confirmPass-placeholder"> Confirm Password</span>

                    <button className = "resetPassBtn" > Reset Password </button>
                    <p id="error" style={{backgroundColor: this.state.isError ? 'red' : ''}}>{this.state.error}</p>

                    <p className='instructions2'> Password must be 8-20 characters long, and have at least one lower and uppercase letter and a number.</p>
                </form>

                <Footer />
            </div>


        )
    }
}

export default ForgotPassword;