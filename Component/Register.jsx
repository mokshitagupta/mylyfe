import React from 'react';
import background from '../assets/background.svg';
import '../Register.css';
import Footer from "./Footer";
import basic_eye from '../assets/X_Icon.svg';
import regimgM from "../assets/BackgroundM.svg";
import nobasic_eye from '../assets/NoX_Icon.svg';
import Alert from "./Alert";
import user_img from '../assets/user_pic.svg'
import backgroundDARK from '../assets/backgroundDARK.svg'
import backgroundMDARK from "../assets/BackgroundMODARK.svg";


function getMode() {
  const theme = localStorage.getItem('mode')
  var store = document.querySelector(':root');
  var value = getComputedStyle(store);
  if (theme) {

    if (theme == "light") {
      store.style.setProperty( '--button-reg', '#34A853');
      store.style.setProperty('--reg-hover', '#2b7f41;');
    }
    else if (theme == "dark") {
      store.style.setProperty( '--button-reg', '#443FEA');
      store.style.setProperty('--reg-hover', '#2825A0');
    }
    return theme;
  }
  console.log("hey it's", theme, "in here")
}

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', 
      password:'', 
      confirm: '', 
      passType: "password",
      error: '',
      isError: false,
      isActive: false
    };

    this.passwordProcessing = this.passwordProcessing.bind(this);
    this.setCookie = this.setCookie.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setConfirmPassword = this.setConfirmPassword.bind(this);
    this.showPassword = this.showPassword.bind(this);
    // this.setDefaultPic = this.setDefaultPic.bind(this);
  }

  setCookie(userID, token){
    console.log(userID);
    console.log(token);
    document.cookie = "userID=" + userID + ";max-age=86400";
    document.cookie = "token=" + token + ";max-age=86400";
  }


  validate = (email, data, confirm) => {

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)){
      this.setState({isError: true});
      this.setState({error: "Please enter a valid email!"});
      return false;
    }

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


  async passwordProcessing(){
        // alert('A name was submitted: ');
    console.log(this.state);

    //validate password
    if(!this.validate(this.state.email, this.state.password, this.state.confirm)){
      return;
    }
    // if (!valid){
    //   alert("Invalid password.")
    //   this.setState({isError: true});
    //   this.setState({error: "Your password must be "});
    // }


    let result = await fetch('https://webdev.cse.buffalo.edu/hci/api/api/aquafit/auth/signup', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: this.state.email, password:this.state.password, "attributes": {
        "username": this.state.email.split("@")[0],
      }})
    })
    let resultJson = result.json();
    // console.log(resultJson);
    resultJson.then((data) => {
        let userID = data.userID;
        let token = data.token;
        // console.log(data);
        //If this was sucessful, set cookies. In this function because data isn't saved outside of it
        if(result.status === 200){
            this.setCookie(userID, token)
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", data.userID);
            localStorage.setItem("email", this.state.email);
            localStorage.setItem("loggedIn", true)
            window.location.href = "/hci/teams/aquafit/profile/" + userID;
        }
        else{
          console.log(data)
        }
        // console.log(this.state.userID);
        // console.log(this.state.token);
    });

    // console.log(this.state);
    // console.log(result);

    if (result.status == 500){
      console.log("accnt exists")
      this.setState({isError: true});
      this.setState({error: "Account already exists! Please login"});
      return;
    }

    
  }

  setEmail(event){
    console.log("setting email");
    this.setState({email: event.target.value, isActive: true});
  }

  setPassword(event){
    console.log("setting password");
    this.setState({password: event.target.value});
  }

  setConfirmPassword(event){
    console.log("setting confirm password");
    this.setState({confirm: event.target.value});
  }

  showPassword() {
    if (this.state.passType === "password") {
      this.setState({passType: "text"})
    } else if (this.state.passType === "text") {
      this.setState({passType: "password"})
    }
  }


  render() {;
    const theme = getMode();
    let image;
    let image2;
    if (theme == "dark") {
      image2 = <img src= {backgroundMDARK} alt="background" className='backgroundM'/>
      image = <img src={backgroundDARK} alt="Register Background" className='background'/> }
    else {
      image = <img src={background} alt="Register Background" className='background'/> 
      image2 = <img src = {regimgM} className="reg-imageM" id = "reg-backgroundM" alt = "Register Background"/>
    }
  return ( <div className = 'backgroundContainer'>  
      {image}
      {image2}
      <div className='reg-error'>
      <Alert id="reg-error" color={this.state.isError ? "red" : ""} text={this.state.error}/>
      </div>
      
      <form className = "regbox">
          
          <input className='email' required type='email' value = {this.state.email} onChange={this.setEmail} name = "email"/>
          <span className='placeholder'>{this.state.isActive ? "" : "Enter Email"}</span>
          <input className='password' required type ={this.state.passType} value = {this.state.password} onChange={this.setPassword} name = "password"/>
          <span className='passwordholder'>Password</span> 
          {this.state.passType === "password"?( 
              <img src={basic_eye} alt = 'eye' className = "eye" onClick={this.showPassword}></img>
            ):(
              <img src={nobasic_eye} alt = 'eye'className = "eye2" onClick={this.showPassword}></img>
            )}
          <input className='confirmpassword' required type ={this.state.passType} value = {this.state.confirm} onChange={this.setConfirmPassword} name = "confirmpassword"/>
          <span className='confirmpasswordholder'>Confirm Password</span>
          <p className='instructions'> Password must be 8-20 characters long, and have at least one lower and uppercase letter and a number.</p>
          <div className = "forgotPass2"><a href = "/hci/teams/aquafit/login" id='forgotPassword'>Already have an account? Click here!</a></div>
      </form>
      
      <button className='regbtn' onClick={this.passwordProcessing}>Register</button>

      <Footer />
      </div>
  );
}
}

export default Register;
