import React from "react";
import '../../styleGuide.css';
import write from '../../assets/write.svg';
import logo from '../../assets/logo.svg';
import logoDARK from '../../assets/logoDARK.svg';
import colorsDARK from '../../assets/colorsDARK.svg';
//import colors from '../../assets/colors.svg';
// import typeface from '../../assets/typeface.svg';
// import bestcombos from '../../assets/bestcombos.svg';
//import bestcombosDARK from '../../assets/best combosDARK.svg';
// import buttons from '../../assets/button-graphics.svg';
// import popup from '../../assets/popup.svg';
// import feedback from '../../assets/feedback.svg';
// import layout from '../../assets/layout.svg';
// import help from '../../assets/inline-help.svg';
import buttonspansh from '../../assets/buttonspanish.svg';
import bestcombospanish from '../../assets/bestcombospanish.svg';
import popupspanish from '../../assets/popupspanish.svg';
import feedbackspanish from '../../assets/feedbackspanish.svg';
import layoutspanish from '../../assets/layoutspanish.svg';
import helpspanish from '../../assets/blurspanish.svg';
import colorsspanish from '../../assets/colorslightspanish.svg';
import colorsDARKspanish from '../../assets/colorsDARKspanish.svg';
import typefacespanish from '../../assets/typefacespanish.svg';
import bestcombosDARKspanish from '../../assets/best_combosDARKspanish.svg';
import SpanishFooter from "./SpanishFooter";
import { useEffect } from "react";
import { useState } from "react";

function SpanishStyleGuide() {

    const [mode, setMode] = useState("");


    useEffect(() => {

    function setTheme() {
        const theme = localStorage.getItem('mode')
        var store = document.querySelector(':root');
        var value = getComputedStyle(store);
        if (theme) {
            setMode(theme)
        }
        console.log("hey it's", theme, "in here")

        if (theme == "light") {
          store.style.setProperty('--text-color', 'black');
          store.style.setProperty('--background-color', 'white');
          store.style.setProperty('--button-color', '#efefef');
          store.style.setProperty('--button-hover', '#c2c2c2');
        }
        else if (theme == "dark") {
            store.style.setProperty('--text-color', 'white');
            store.style.setProperty('--background-color', '#181826');
            store.style.setProperty('--button-color', '#0f0f1a');
            store.style.setProperty('--button-hover', '#070722');
        }
    }

    setTheme();

  }, [setMode, mode]);

        return (
            <div className = "body2">

                <input className = "hideme" type = "text" value = "@import url(https://fonts.googleapis.com/css2?family=Poppins:wght@300;500&display=swap);" id = "myInput"></input>

                <div className = "info">

                    {mode == "light" && <h4>Tema de luz</h4>}
                    {mode == "dark" && <h4>Tema oscuro</h4>}
                    <br></br>
                    <h4>Esto es</h4>
                    {mode == "light" && <img src = {logo} className = "logo2" alt = "mylyfe logo" id = "logo2"/>}
                    {mode == "dark" && <img src = {logoDARK} className = "logo2" alt = "mylyfe logo" id = "logo2"/>}
                    
                    <div className = "row">
                        <div className = "new-topic">
                            <h4>
                                Guía de fuentes

                            </h4>

                            <h2>
                                Poppins Light debe usarse para secciones largas de texto y botones. El tamaño debe ser 2.2vmin.
                                Poppins Medium debe usarse para títulos. El tamaño debe ser 4.5vmin.
                            </h2>

                            <h2>
                                <br></br>
                                La única fuente utilizada es 'Poppins',
                                asegúrese de incluirlo en la parte superior
                                de su archivo css. Clic en el botón
                                a continuación para copiar la importación.
                            </h2>

                            <button className = "example-button" value = "example-button" id = "example-button" onClick = {copyImportFunction}>
                                    <img src = {write} alt = "example-button" id = "buttonex"/>
                                    <h1>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;Copiar</h1>
                            </button>
                        </div>

                        <div className = "new-topic">
                            
                            <img src = {typefacespanish} className = "typeface" alt = "typefaces" id = "typeface"/>
                            
                        </div>
                    </div>



                    <div className = "row">
                        <div className = "new-topic">
                            {mode ==  "light" && <img src = {colorsspanish} className = "colors" alt = "our colors" id = "colors"/>}
                            {mode ==  "dark" && <img src = {colorsDARKspanish} className = "colors" alt = "our colors" id = "colors"/>}
                        </div>

                        <div className = "new-topic">
                            <h4>
                                Guía de colores
                            </h4>

                            {mode == "light" && <h2>
                                Estos son nuestros colores principales con su código de color correspondiente. #FFFFFF
                                debe usarse para el fondo y puede usarse para texto sobre fondos oscuros.
                                #C2C2C2 debe usarse para efectos de desplazamiento sobre los botones de color #EFEFEF.
                                #EFEFEF debe usarse para cuadros de texto y botones sobre fondos que no sean blancos.
                                #000000 debe usarse para la mayoría del texto. #929292 debe usarse en cuadros de texto y
                                para el texto en los campos de entrada. #34A853 debe usarse para fondos,
                                botones y menús deslizables. #2B7F41 debe usarse para efectos de desplazamiento en
                                los botones de color #34A853 y en los menús deslizables.
                            </h2>}
                            {mode == "dark" && <h2>
                                Estos son nuestros colores principales con su código de color correspondiente. #181826
                                debe usarse para el fondo y puede usarse para texto sobre fondos claros.
                                #EFEFEF debe usarse para cuadros de texto. #433FEA debe usarse para botones y fondos.
                                #FFFFFF debe usarse para la mayoría de los textos. #929292 debe usarse en cuadros de texto y
                                para el texto en los campos de entrada. #D6971D debe usarse en fondos
                                y menús deslizables. #B17112 debe usarse en menús deslizables.
                            </h2>}
                        </div>
                    </div>



                    <div className = "row">
                        <div className = "new-topic">
                            
                            <h4>
                                Guía de combinación de colores
                            </h4>

                            <h2>
                                La primera
                                la combinación se debe utilizar para los fondos. la segunda combinacion
                                debe usarse para menús deslizables, por ejemplo, el siguiente menú. La tercera combinación
                                también debe usarse para fondos, siendo el blanco el texto. La cuarta combinación debe usarse para la mayoría de los botones.
                            </h2>
                        </div>

                        <div className = "new-topic">
                            {mode == "light" && <img src = {bestcombospanish} className = "bestcombos" alt = "best combos" id = "bestcombos"/>}
                            {mode == "dark" && <img src = {bestcombosDARKspanish} className = "bestcombos" alt = "best combos" id = "bestcombos"/>}
                        </div>
                    </div>



                    <div className = "row">
                        <div className = "new-topic">
                                <img src = {popupspanish} className = "popup" alt = "popup example" id = "popup"/>
                        </div>

                        <div className = "new-topic">

                            <h4>
                                Guía emergente
                            </h4>

                            <h2>
                                Las ventanas emergentes deben estar centradas en el medio de la página.
                                El fondo de la página detrás de la ventana emergente debe oscurecerse al 50 %.
                                Las ventanas emergentes deben tener un ancho máximo del 60 % y una altura máxima del 70 %.
                                Las ventanas emergentes se pueden cerrar haciendo clic en la "X" en la esquina superior derecha.
                            </h2>
                        </div>

                    </div>



                    <div className = "row">

                        <div className = "new-topic">
                            <h4>
                                Guía de comentarios
                            </h4>

                            <h2>
                                La retroalimentación negativa usa el color #EA4335 (rojo).
                                Ejemplos de comentarios negativos son contraseñas no válidas
                                e intentos de inicio de sesión.
                                La retroalimentación positiva usa el color #34A853 (verde).
                                Ejemplos de comentarios positivos son cuenta exitosa
                                creaciones e inicios de sesión.
                                Ciertos comentarios, como el de la página de perfil, desaparecerán después de 2 segundos.
                                Puede encontrar las imágenes en la carpeta de activos.
                            </h2>
                        </div>

                        <div className = "new-topic">
                            <img src = {feedbackspanish} className = "feedback" alt = "feedback guide" id = "feedback"/>
                        </div>
                    </div>



                    <div className = "row">
                        <div className = "new-topic">
                        <img src = {buttonspansh} className = "buttons" alt = "button graphics" id = "buttons"/>
                        </div>

                        <div className = "new-topic">
                            <h4>
                                <br></br>
                                Guía de Botones
                            </h4>

                            {mode == "light" &&<h2>
                                Puede encontrar las imágenes en la carpeta de activos.
                                Botones (sin incluir la barra de navegación y los botones de pie de página)
                                debe tener las siguientes propiedades
                                (inspeccione el botón para ver las propiedades) y
                                si es posible, una imagen relacionada en el lado izquierdo.
                                <br></br>
                                Si el botón tiene un fondo no blanco, use
                                el siguiente color de fondo: #FFFFFF y
                                el siguiente color de efecto de desplazamiento: #EFEFEF
                                <br></br>
                                También puede usar el siguiente color de fondo: #34A853
                                y el siguiente color de efecto de desplazamiento: #2B7F41
                            </h2>}

                            {mode == "dark" &&<h2>
                                Puede encontrar las imágenes en la carpeta de activos.
                                Botones (sin incluir la barra de navegación y los botones de pie de página)
                                debe tener las siguientes propiedades
                                (inspeccione el botón para ver las propiedades) y
                                si es posible, una imagen relacionada en el lado izquierdo.
                                <br></br>
                                Si el botón tiene un fondo no blanco, use
                                el siguiente color de fondo: #0F0F1A; y
                                el siguiente color de efecto de desplazamiento: #070722;
                                <br></br>
                                También puede usar el siguiente color de fondo: #443FEA;
                                y el siguiente color de efecto de desplazamiento: #2825A0;
                            </h2>}

                            <button className = "example-button" value = "example-button" id = "example-button">
                                <img src = {write} alt = "example-button" id = "buttonex"/>
                                <h1>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                                Ejemplo</h1>
                            </button>
                        </div>
                    </div>


                    <div className = "row">

                        <div className = "new-topic">
                            <h4>
                                <br></br>
                                Guía de diseño
                            </h4>

                            <h2>
                                La barra de navegación aparecerá en la parte superior de la página. el ancho es
                                100% y la altura es 8vh, por lo que deberá incluir un margen superior: 8vh;
                                <br></br>
                                El logotipo está en la esquina superior izquierda y los botones de la página principal en la esquina superior derecha.
                                lado. Cualquier botón de página opcional aparecerá en el pie de página, como la página Acerca de nosotros.
                            </h2>
                        </div>

                        <div className = "new-topic">
                            <img src = {layoutspanish} className = "layout" alt = "layout for goal" id = "layout"/>
                        </div>
                    </div>



                    <div className = "row">

                        
                        <div className = "new-topic">
                            <img src = {helpspanish} className = "help" alt = "inline help" id = "help"/>
                        </div>

                        <div className = "new-topic">
                            <h4>
                                <br></br>
                                Guía de ayuda en línea
                            </h4>

                            <h2>
                                La ayuda en línea aparecerá para los usuarios que acceden al sitio por primera vez.
                                Tendrán una opción para "Omitir" en la esquina inferior derecha.
                                El fondo se desenfocará, los únicos elementos no desenfocados serán los
                                cuadro de ayuda y el elemento que se explica.
                            </h2>
                        </div>

                    </div>
                    
                </div>
                <SpanishFooter />
            </div>
        )
}

function copyImportFunction() {

  var copyText = document.getElementById("myInput");

  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  navigator.clipboard.writeText(copyText.value);

  alert("Copied the text: " + copyText.value);
}

export default SpanishStyleGuide;