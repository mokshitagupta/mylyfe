import React from "react";
import background from '../assets/background.svg'
import eimgM from "../assets/BackgroundM.svg";
import '../getEmail.css';
import Footer from "./Footer";
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
  
class GetEmail extends React.Component {
    constructor(input){
        super(input);
        this.state = {
            email: "",
        };
        this.updateEmail = this.updateEmail.bind(this);
        this.doSubmit = this.doSubmit.bind(this);
    }

    updateEmail(e){
        this.setState({email: e.target.value})
    }

    async doSubmit(e){
        e.preventDefault();
        // Regular expression to validate email format
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(this.state.email)) {
            console.log("Invalid email format");
            // Show error message to user that email format is invalid
            return;
        }
        try{
            let url = "https://webdev.cse.buffalo.edu/hci/api/api/aquafit/users?email=" + this.state.email;
            let result = await fetch(url);
            const data = await result.json();
            if (result.status === 401){
                //Either user inputted email incorrectly, or account doesn't exist
                console.log("HTTP Code 401: Invalid Account");
                //let user know email incorrect/ doesn't exist
            }
            else if (result.status === 400){
                //Bad request somehow
                console.log("HTTP Code 400: Bad Request");
            }
            else if(result.status === 200){
                //Success!
                console.log("HTTP Code 200: Success!");
                //Send user to next page
                //let arr = JSON.parse(data);
                if (data[0].length === 0){
                    alert("Email does not exist")
                }
                else {
                    //email is ok! send user reset token
                    let url = "https://webdev.cse.buffalo.edu/hci/api/api/aquafit/auth/request-reset";
                    console.log(data[0][0].email)
        
                    let re = fetch(url, {
                        method: "POST", // *GET, POST, PUT, DELETE, etc.
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({email: this.state.email})
                    })
                    window.location.href = "/hci/teams/aquafit/forgotpassword";

                }
            }
            else{
                //Uncaught error
                console.log("Unknown error has occured. HTTP Code " + result.status);
            }
        }
        catch(error){
            console.log(error);
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
          image2 = <img src = {eimgM} alt ="background" className="backgroundGetEmailM"/> }
        return (
            <div className = "submitEmail">
                {image}
                {image2}
                
                <form className = "email-form" onSubmit={this.doSubmit}>
                    <input type = "email" className = "getEmail" placeholder = "Enter Email" value = {this.state.email} 
                    onChange = {this.updateEmail}/>          

                    <button className="enterEmailBtn">Submit</button>

                </form>

                <Footer />
                
            </div>
        )
    }
}

export default GetEmail;
