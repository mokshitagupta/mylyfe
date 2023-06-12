import React from "react";
import "../../LoginPage.css";
import "../../App.css";
import background from "../../assets/Login-Background.svg";
import logimgM from "../../assets/BackgroundM.svg";
import SpanishFooter from "./SpanishFooter.jsx";
import Alert from "../Alert";
import backgroundDARK from "../../assets/Login-BackgroundDARK.svg"
import backgroundMDARK from "../../assets/BackgroundMODARK.svg";
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
  
class SpanishLoginPage extends React.Component {
    
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
            this.setState({error: "¡Por favor introduzca de correo electrónico válida!"});
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
                    this.setState({error: "Nombre de usuario/contraseña no válido. Inténtalo de nuevo."})
                    return null
                }
                else if (result.status === 400){
                    //Either email, password or both are incorrect
                    invalid = true
                    
                    console.log("HTTP Code 401: Invalid Account");
                    this.setState({isError: true});
                    this.setState({error: "No se pudo encontrar la cuenta. Inténtalo de nuevo."})
                    return null
                }
                else if(result.status != 200){
                    //Uncaught error
                    invalid = true
                    
                    console.log("Unknown error has occured. HTTP Code " + result.status);
                    this.setState({isError: true});
                    this.setState({error: "Error desconocido."})
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
                    <div className = "mebold2"><p>¡Bienvenido de Nuevo!</p></div>
                    <p>¡Hagamos hoy uno bueno!</p>
                    <br></br>
                    <p>Si no tienes una cuenta,</p>
                    <p>puedes crear uno <a href="/hci/teams/aquafit/register" className = "link">¡aquí!</a></p>
                </div>
                
                <div className = "login">
                <div className="login-err">
                    <Alert id="error" color={this.state.isError ? "red" : ""} text={this.state.error}/>
                </div>
                    <form className = "Login-form" onSubmit={this.doSubmit}>
                        <div className = "form-Content">
                            <input type = "text" 
                                placeholder = "Ingrese coreo eletrónico"
                                value = {this.state.email}
                                onChange = {this.updateEmail}
                            />
                        </div>
                        <div className = "form-Content">
                            <input type = "password" 
                                placeholder = "Ingrese la Contraseña"
                                value = {this.state.password}
                                onChange = {this.updatePassword}
                            />
                        </div>
                        <div className = "forgotPass">
                            <a href = "/hci/teams/aquafit/getEmail" id = "forgotPassword">¿Olvidó la contraseña?</a>
                        </div>
                        <br></br>
                        <button id = "user-button" >Iniciar sesión</button>
                        
                    </form>
                </div>
            </div>
            
            <SpanishFooter/>
            </div>
        )
    }
}
export default SpanishLoginPage